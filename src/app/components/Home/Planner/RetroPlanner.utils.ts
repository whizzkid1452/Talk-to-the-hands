import { Task, WeekDate, MonthDate, DisplayDate, MonthDisplay } from "./RetroPlanner.types";
import { weekdays, weekdaysEn, monthNames, monthNamesEn, DAYS_IN_WEEK, CALENDAR_GRID_TOTAL_CELLS, LAST_DAY_OF_WEEK_INDEX } from "./RetroPlanner.constants";
import type { GoogleCalendarEvent } from "../../../../lib/googleCalendar";

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(date: Date): DisplayDate {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = date.getDay();

  return {
    full: `${year}.${month}.${day}`,
    weekdayKo: weekdays[dayOfWeek],
    weekdayEn: weekdaysEn[dayOfWeek],
  };
}

export function getWeekDates(selectedDate: Date, tasks: Task[], selectedDateStr: string): WeekDate[] {
  const week: WeekDate[] = [];
  const today = new Date(selectedDate);
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = formatDate(date);
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    week.push({
      date,
      dateStr,
      day: date.getDate(),
      isToday: dateStr === formatDate(new Date()),
      isSelected: dateStr === selectedDateStr,
      taskCount: dayTasks.length,
    });
  }
  return week;
}

export function getMonthDates(selectedDate: Date, tasks: Task[], selectedDateStr: string): MonthDate[] {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const dates: MonthDate[] = [];
  
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    dates.push({
      date,
      dateStr: formatDate(date),
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: formatDate(date) === formatDate(new Date()),
      isSelected: formatDate(date) === selectedDateStr,
      taskCount: 0,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    dates.push({
      date,
      dateStr,
      day,
      isCurrentMonth: true,
      isToday: dateStr === formatDate(new Date()),
      isSelected: dateStr === selectedDateStr,
      taskCount: dayTasks.length,
    });
  }

  const remainingDays = CALENDAR_GRID_TOTAL_CELLS - dates.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    dates.push({
      date,
      dateStr: formatDate(date),
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: formatDate(date) === formatDate(new Date()),
      isSelected: formatDate(date) === selectedDateStr,
      taskCount: 0,
    });
  }

  return dates;
}

export function getMonthYearDisplay(selectedDate: Date): MonthDisplay {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  return {
    full: `${year}.${String(month).padStart(2, "0")}`,
    monthKo: monthNames[selectedDate.getMonth()],
    monthEn: monthNamesEn[selectedDate.getMonth()],
  };
}

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function extractTimeFromDateTime(dateTime: string | undefined, date: string | undefined): string {
  if (dateTime) {
    const dateObj = new Date(dateTime);
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return "00:00";
}

function extractDateFromEvent(event: GoogleCalendarEvent): string {
  if (event.start.dateTime) {
    const dateObj = new Date(event.start.dateTime);
    return formatDate(dateObj);
  }
  if (event.start.date) {
    return event.start.date;
  }
  return formatDate(new Date());
}

function parseTitleMetadata(summary: string): { title: string; category: string; priority: "high" | "medium" | "low"; completed: boolean } {
  const metadataPattern = /^(.+?)\s*\(([^)]+)\)\(([123])\)(\(✓\))?$/;
  const match = summary.match(metadataPattern);
  
  if (match) {
    const [, title, categoryShort, priorityNum, completedMark] = match;
    const categoryMap: Record<string, string> = {
      "업무": "업무 Work",
      "공부": "공부 Study",
      "개인": "개인 Personal",
      "운동": "운동 Exercise",
      "기타": "기타 Other",
    };
    const priorityMap: Record<string, "high" | "medium" | "low"> = {
      "3": "high",
      "2": "medium",
      "1": "low",
    };
    
    return {
      title: title.trim(),
      category: categoryMap[categoryShort] || categoryShort,
      priority: priorityMap[priorityNum] || "medium",
      completed: completedMark === "(✓)",
    };
  }
  
  return {
    title: summary,
    category: "기타 Other",
    priority: "medium",
    completed: false,
  };
}

export function convertGoogleCalendarEventToTask(event: GoogleCalendarEvent): Task {
  const eventDate = extractDateFromEvent(event);
  const eventTime = extractTimeFromDateTime(event.start.dateTime, event.start.date);
  const eventId = hashStringToNumber(event.id);
  const { title, category, priority, completed } = parseTitleMetadata(event.summary || "제목 없음");

  return {
    id: -eventId,
    title,
    time: eventTime,
    category,
    priority,
    completed,
    date: eventDate,
    googleEventId: event.id,
  };
}

export function getDateRangeForViewMode(selectedDate: Date, viewMode: "today" | "week" | "month"): { timeMin: string; timeMax: string } {
  const now = new Date(selectedDate);
  
  if (viewMode === "today") {
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return {
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
    };
  }
  
  if (viewMode === "week") {
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + LAST_DAY_OF_WEEK_INDEX);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return {
      timeMin: startOfWeek.toISOString(),
      timeMax: endOfWeek.toISOString(),
    };
  }
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const startOfMonth = new Date(year, month, 1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const endOfMonth = new Date(year, month + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  
  return {
    timeMin: startOfMonth.toISOString(),
    timeMax: endOfMonth.toISOString(),
  };
}

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 } as const;

export function sortTasksByPriorityAndTime(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.priority !== b.priority) {
      return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    }
    return a.time.localeCompare(b.time);
  });
}

export function getPriorityNumber(priority: "high" | "medium" | "low"): number {
  return PRIORITY_ORDER[priority];
}

export function getCategoryShortName(category: string): string {
  return category.split(" ")[0];
}
