import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calendarStyles, buttonStyles, textStyles, borderStyles, getFontStyle, getMonthDayStyle } from "./RetroPlanner.styles";
import { weekdays, monthNames, monthNamesEn } from "./RetroPlanner.constants";
import { formatDate, getMonthDates } from "./RetroPlanner.utils";
import type { MonthDate } from "./RetroPlanner.types";

interface RetroPlannerDatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

export function RetroPlannerDatePicker({ selectedDate, onDateSelect, onClose }: RetroPlannerDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const selectedDateStr = formatDate(selectedDate);
  const monthDates = useMemo(() => {
    return getMonthDates(currentMonth, [], selectedDateStr);
  }, [currentMonth, selectedDateStr]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const handleDateClick = (day: MonthDate) => {
    if (day.isCurrentMonth) {
      onDateSelect(day.date);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 z-50 mt-1"
        style={{ imageRendering: "pixelated" }}
      >
        <div className={calendarStyles.dateNavigatorBox} style={{ imageRendering: "pixelated", maxWidth: "400px", minWidth: "300px" }}>
          <div className="flex items-center justify-between mb-3">
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth}
              className={buttonStyles.navButton}
              style={borderStyles.pinkBorder}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>

            <div className="text-center">
              <p className={textStyles.dateDisplay} style={getFontStyle("'Press Start 2P'")}>
                {year}.{String(month + 1).padStart(2, "0")}
              </p>
              <p className={textStyles.dateSubtext} style={getFontStyle("'DungGeunMo'")}>
                {monthNames[month]} • {monthNamesEn[month]}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className={buttonStyles.navButton}
              style={borderStyles.pinkBorder}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className={calendarStyles.monthHeader}>
            {weekdays.map((day, i) => (
              <div
                key={i}
                className={`p-1 text-center text-[10px] bg-[#FFB6C1] border-2 border-[#FF1493] ${
                  i === 0 ? "text-red-600" : i === 6 ? "text-blue-600" : "text-[#C2185B]"
                }`}
                style={{ ...getFontStyle("'DungGeunMo'"), imageRendering: "pixelated" }}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={calendarStyles.monthGrid}>
            {monthDates.map((day, index) => (
              <motion.button
                key={index}
                whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(day)}
                className={`${calendarStyles.monthDay} ${getMonthDayStyle(day)}`}
                style={getFontStyle("'DungGeunMo'")}
                disabled={!day.isCurrentMonth}
              >
                {day.day}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
