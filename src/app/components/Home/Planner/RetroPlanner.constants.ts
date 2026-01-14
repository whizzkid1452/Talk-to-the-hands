import { 
  Pencil, Brush, Square, Circle as CircleIcon, Eraser, 
  Droplet, Type, Plus, Code, Palette, Briefcase, Activity, Target, Grid3x3
} from "lucide-react";
import { Tool, PlannerModeOption } from "./RetroPlanner.types";

export const paletteColors = [
  "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1", 
  "#FADADD", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A",
  "#E91E63", "#C2185B", "#AD1457", "#880E4F", "#FF4081",
  "#F50057", "#C51162", "#D5006D", "#E91E8C", "#FF6EC7",
  "#FF85D7", "#FF9CE7", "#FFB3F7", "#FFC9FF", "#FFE0FF",
  "#EE82EE", "#DA70D6", "#DDA0DD", "#EE82EE", "#FF00FF",
] as const;

export const tools: Tool[] = [
  { icon: Pencil, label: "Pencil", color: "#FF69B4" },
  { icon: Brush, label: "Brush", color: "#FF1493" },
  { icon: Eraser, label: "Eraser", color: "#FFB6C1" },
  { icon: Droplet, label: "Fill", color: "#F06292" },
  { icon: Type, label: "Text", color: "#E91E63" },
  { icon: Square, label: "Rectangle", color: "#EC407A" },
  { icon: CircleIcon, label: "Circle", color: "#FF4081" },
  { icon: Plus, label: "Add Task", color: "#C2185B" },
] as const;

export const tasksPerPage = 4;

export const MAX_MONTH_VIEW_TASKS = 4;

export const MAX_TASK_TITLE_LENGTH_IN_MONTH = 10;

export const DAYS_IN_WEEK = 7;

export const CALENDAR_GRID_TOTAL_CELLS = 42;

export const LAST_DAY_OF_WEEK_INDEX = 6;

export const categoryColors: Record<string, string> = {
  "업무 Work": "bg-[#e91e63]",
  "공부 Study": "bg-[#9c27b0]",
  "개인 Personal": "bg-[#00bcd4]",
  "운동 Exercise": "bg-[#4caf50]",
  "기타 Other": "bg-[#ff9800]",
} as const;

export const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;
export const weekdaysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

export const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] as const;
export const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

export const menuItems = ["File", "Edit", "View", "Image", "Colors", "Help"] as const;

export const plannerModes: PlannerModeOption[] = [
  { mode: "All", label: "All", icon: Grid3x3, color: "#FFB6C1" },
  { mode: "Dev", label: "Dev", icon: Code, color: "#3B82F6" },
  { mode: "Art", label: "Art", icon: Palette, color: "#EC4899" },
  { mode: "CEO", label: "CEO", icon: Briefcase, color: "#8B5CF6" },
  { mode: "Act", label: "Act", icon: Activity, color: "#10B981" },
  { mode: "Exc", label: "Exc", icon: Target, color: "#F59E0B" },
] as const;
