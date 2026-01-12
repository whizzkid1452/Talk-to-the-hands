import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RetroPlannerTask } from "./RetroPlannerTask";
import { RetroPlannerEditor } from "./RetroPlannerEditor";
import { 
  ChevronLeft, ChevronRight, CheckCircle2, Star, Grid3x3, List,
  Image as ImageIcon,
  Heart, X, Minimize2, Maximize2, Sparkles
} from "lucide-react";
import type { Task } from "./RetroPlanner.types";
import { 
  paletteColors, 
  tools, 
  tasksPerPage, 
  weekdays, 
  menuItems 
} from "./RetroPlanner.constants";
import {
  formatDate,
  formatDisplayDate,
  getWeekDates,
  getMonthDates,
  getMonthYearDisplay,
} from "./RetroPlanner.utils";
import {
  containerStyles,
  buttonStyles,
  textStyles,
  borderStyles,
  decorationStyles,
  calendarStyles,
  taskStyles,
  tooltipStyles,
  getWindowBorderStyle,
  getCanvasGradient,
  getPixelGridPattern,
  getProgressPattern,
  getFontStyle,
  getViewModeButtonStyle,
  getWeekDayStyle,
  getMonthDayStyle,
  getTaskPriorityStyle,
} from "./RetroPlanner.styles";

export function RetroPlanner() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "픽셀 아트 작업 완료하기 • Complete pixel art work",
      time: "09:00",
      category: "업무 Work",
      priority: "high",
      completed: false,
      date: "2026-01-02",
    },
    {
      id: 2,
      title: "React 공부하기 • Study React",
      time: "14:00",
      category: "공부 Study",
      priority: "medium",
      completed: false,
      date: "2026-01-02",
    },
    {
      id: 3,
      title: "운동 30분 • Exercise 30min",
      time: "18:00",
      category: "운동 Exercise",
      priority: "medium",
      completed: true,
      date: "2026-01-02",
    },
    {
      id: 4,
      title: "일기 쓰기 • Write diary",
      time: "21:00",
      category: "개인 Personal",
      priority: "low",
      completed: false,
      date: "2026-01-02",
    },
  ]);


  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleSaveTask = (taskData: {
    title: string;
    time: string;
    category: string;
    priority: "high" | "medium" | "low";
  }) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      date: formatDate(selectedDate),
    };
    setTasks([...tasks, newTask]);
    setCurrentPage(1); // Reset to first page when adding new task
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectedDateStr = formatDate(selectedDate);
  const todayTasks = tasks.filter((task) => task.date === selectedDateStr);
  const sortedTasks = todayTasks.sort((a, b) => a.time.localeCompare(b.time));
  const completedCount = todayTasks.filter((task) => task.completed).length;
  const totalCount = todayTasks.length;
  const displayDate = formatDisplayDate(selectedDate);

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when date changes
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const weekDates = getWeekDates(selectedDate, tasks, selectedDateStr);

  const monthDates = getMonthDates(selectedDate, tasks, selectedDateStr);

  const handlePrevPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    handleDateChange(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    handleDateChange(newDate);
  };

  const monthDisplay = getMonthYearDisplay(selectedDate);

  return (
    <div className={containerStyles.wrapper}>
      {/* Floating pixel hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-deco-${i}`}
          className={decorationStyles.floatingHeart}
          style={{
            top: `${10 + (i * 10)}%`,
            left: i % 2 === 0 ? "auto" : `${5 + (i * 3)}%`,
            right: i % 2 === 0 ? `${5 + (i * 3)}%` : "auto",
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart className="w-3 h-3 md:w-4 md:h-4 fill-pink-400 text-pink-500 drop-shadow-[0_2px_4px_rgba(236,72,153,0.5)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      {/* Floating pixel stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-deco-${i}`}
          className={decorationStyles.floatingStar}
          style={{
            top: `${15 + (i * 15)}%`,
            left: `${10 + (i * 15)}%`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={containerStyles.mainContainer}
        style={getWindowBorderStyle()}
      >
        {/* Title Bar - Pink Pixel Style */}
        <div className={containerStyles.titleBar}>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
            <span className={textStyles.title} style={getFontStyle("'Press Start 2P'")}>
              PINK PLANNER.EXE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: "#ff69b4" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className={buttonStyles.windowControl}
              style={getWindowBorderStyle()}
            >
              <Minimize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff69b4" }}
              className={buttonStyles.windowControl}
              style={getWindowBorderStyle()}
            >
              <Maximize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff1493" }}
              className={buttonStyles.windowControl}
              style={getWindowBorderStyle()}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {/* Menu Bar */}
              <div className={containerStyles.menuBar} style={{ ...getFontStyle("'Press Start 2P'"), borderBottomColor: "#808080" }}>
                {menuItems.map((menu) => (
                  <motion.button
                    key={menu}
                    whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
                    className={buttonStyles.menuItem}
                  >
                    {menu}
                  </motion.button>
                ))}
              </div>

              {/* Main Area with Toolbox */}
              <div className="flex">
                {/* Toolbox */}
                <div className={containerStyles.toolbox} style={{ borderRightColor: "#808080" }}>
                  {tools.map((tool, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, backgroundColor: tool.color }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => tool.label === "Add Task" && setShowEditor(true)}
                      className={buttonStyles.toolButton}
                      style={getWindowBorderStyle()}
                      title={tool.label}
                    >
                      <tool.icon className="w-5 h-5 text-gray-700" style={{ imageRendering: "pixelated" }} />
                    </motion.button>
                  ))}
                  
                  {/* Color Preview - Pink Theme */}
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="w-10 h-5 border-2 border-black bg-[#FF1493]" style={{ imageRendering: "pixelated" }} />
                    <div className="w-10 h-5 border-2 border-black bg-[#FFB6C1]" style={{ imageRendering: "pixelated" }} />
                  </div>

                  {/* Pixel Heart Decoration */}
                  <motion.div
                    className="mt-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-10 h-10 fill-pink-400 text-pink-500" style={{ imageRendering: "pixelated" }} />
                  </motion.div>
                </div>

                {/* Canvas Area */}
                <div className={containerStyles.canvas}>
                  {/* Canvas with pink gradient background */}
                  <div className={containerStyles.canvasArea} style={{ borderColor: "#808080" }}>
                    <div 
                      className="w-full h-full relative"
                      style={getCanvasGradient()}
                    >
                      {/* Pixel Grid Pattern Overlay */}
                      <div 
                        className={decorationStyles.pixelGrid}
                        style={getPixelGridPattern()}
                      />

                      {/* Floating pixel hearts in canvas */}
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={`canvas-heart-${i}`}
                          className={decorationStyles.canvasHeart}
                          style={{
                            top: `${5 + (i * 6)}%`,
                            left: `${3 + (i * 7)}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            x: [0, Math.sin(i) * 10, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + (i % 4),
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        >
                          <Heart className="w-4 h-4 md:w-6 md:h-6 fill-white/60 text-white/80" style={{ imageRendering: "pixelated" }} />
                        </motion.div>
                      ))}

                      {/* Pixel stars decoration */}
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={`canvas-star-${i}`}
                          className={decorationStyles.canvasStar}
                          style={{
                            top: `${10 + (i * 9)}%`,
                            right: `${5 + (i * 8)}%`,
                          }}
                          animate={{
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0.2, 1, 0.2],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2.5 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-200 text-yellow-300" style={{ imageRendering: "pixelated" }} />
                        </motion.div>
                      ))}

                      {/* Content wrapper with padding for decorations */}
                      <div className="relative z-10 p-4 min-h-[400px]">
                        {/* Date Navigator */}
                        <div className={calendarStyles.dateNavigator}>
                          <div className={calendarStyles.dateNavigatorBox} style={{ imageRendering: "pixelated" }}>
                            <div className="flex items-center justify-between mb-3">
                              <motion.button
                                whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrevPeriod}
                                className={buttonStyles.navButton}
                                style={borderStyles.pinkBorder}
                              >
                                <ChevronLeft className="w-5 h-5 text-white" />
                              </motion.button>

                              <div className="text-center">
                                <p
                                  className={textStyles.dateDisplay}
                                  style={getFontStyle("'Press Start 2P'")}
                                 >
                                  {viewMode === "week" ? displayDate.full : monthDisplay.full}
                                </p>
                                <p
                                  className={textStyles.dateSubtext}
                                  style={getFontStyle("'DungGeunMo'")}
                                >
                                  {viewMode === "week" ? `${displayDate.weekdayKo}요일 • ${displayDate.weekdayEn}` : `${monthDisplay.monthKo} • ${monthDisplay.monthEn}`}
                                </p>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNextPeriod}
                                className={buttonStyles.navButton}
                                style={borderStyles.pinkBorder}
                              >
                                <ChevronRight className="w-5 h-5 text-white" />
                              </motion.button>
                            </div>

                            <div className="grid grid-cols-3 gap-1">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToday}
                                className={buttonStyles.todayButton}
                                style={getFontStyle("'Press Start 2P'")}
                              >
                                TODAY
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("week")}
                                className={`${buttonStyles.viewModeButton} ${getViewModeButtonStyle(viewMode === "week")}`}
                                style={getFontStyle("'Press Start 2P'")}
                              >
                                <List className="w-3 h-3" />
                                WEEK
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("month")}
                                className={`${buttonStyles.viewModeButton} ${getViewModeButtonStyle(viewMode === "month")}`}
                                style={getFontStyle("'Press Start 2P'")}
                              >
                                <Grid3x3 className="w-3 h-3" />
                                MONTH
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Week View */}
                        {viewMode === "week" && (
                          <div className={calendarStyles.weekView}>
                            {weekDates.map((day, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDateChange(day.date)}
                                className={`p-2 border-3 transition-colors ${getWeekDayStyle(day)}`}
                                style={{ imageRendering: "pixelated" }}
                              >
                                <div
                                  className={`text-[10px] mb-1 ${day.isSelected ? "text-white" : "text-[#C2185B]"}`}
                                  style={getFontStyle("'Press Start 2P'")}
                                >
                                  {day.day}
                                </div>
                                {day.taskCount > 0 && (
                                  <div className="flex justify-center">
                                    <div
                                      className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 ${
                                        day.isSelected
                                          ? "bg-white text-[#FF1493] border-white"
                                          : "bg-[#FF69B4] text-white border-[#FF1493]"
                                      }`}
                                      style={{ imageRendering: "pixelated" }}
                                    >
                                      <span className="text-[8px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                                        {day.taskCount}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {/* Month View */}
                        {viewMode === "month" && (
                          <div className={calendarStyles.monthView}>
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
                              {monthDates.map((day, index) => {
                                const dayTasks = tasks.filter((t) => t.date === day.dateStr).sort((a, b) => a.time.localeCompare(b.time));
                                return (
                                  <div key={index} className="relative">
                                    <motion.button
                                      whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                                      whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                                      onClick={() => {
                                        if (day.isCurrentMonth) {
                                          handleDateChange(day.date);
                                          if (dayTasks.length > 0) {
                                            setShowTaskDetail(true);
                                          }
                                        }
                                      }}
                                      onMouseEnter={() => day.isCurrentMonth && setHoveredDate(day.dateStr)}
                                      onMouseLeave={() => setHoveredDate(null)}
                                      className={`${calendarStyles.monthDay} ${getMonthDayStyle(day)}`}
                                      style={{ imageRendering: "pixelated" }}
                                      disabled={!day.isCurrentMonth}
                                    >
                                      <div className="flex flex-col items-start justify-start h-full overflow-hidden">
                                        <div
                                          className={`text-[9px] mb-0.5 ${
                                            day.isSelected && day.isCurrentMonth
                                              ? "text-white"
                                              : !day.isCurrentMonth
                                              ? "text-gray-400"
                                              : index % 7 === 0
                                              ? "text-red-500"
                                              : index % 7 === 6
                                              ? "text-blue-500"
                                              : "text-[#C2185B]"
                                          }`}
                                          style={getFontStyle("'Press Start 2P'")}
                                        >
                                          {day.day}
                                        </div>
                                        
                                        {/* Show mini task list */}
                                        {day.isCurrentMonth && dayTasks.length > 0 && (
                                          <div className="w-full space-y-0.5 mt-1">
                                            {dayTasks.slice(0, 2).map((task) => (
                                              <div
                                                key={task.id}
                                                className={`text-[6px] px-1 py-0.5 truncate border ${getTaskPriorityStyle(task.priority, task.completed)} ${day.isSelected ? "opacity-90" : ""}`}
                                                style={{ ...getFontStyle("'DungGeunMo'"), imageRendering: "pixelated" }}
                                                title={task.title}
                                              >
                                                {task.time} {task.title.length > 8 ? task.title.substring(0, 8) + "..." : task.title}
                                              </div>
                                            ))}
                                            {dayTasks.length > 2 && (
                                              <div
                                                className={`text-[6px] px-1 text-center ${
                                                  day.isSelected ? "text-white" : "text-[#FF1493]"
                                                }`}
                                                style={getFontStyle("'Press Start 2P'")}
                                              >
                                                +{dayTasks.length - 2}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </motion.button>

                                    {/* Hover Tooltip */}
                                    <AnimatePresence>
                                      {hoveredDate === day.dateStr && dayTasks.length > 0 && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                          animate={{ opacity: 1, scale: 1, y: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                          transition={{ duration: 0.2 }}
                                          className={tooltipStyles.hoverTooltip}
                                          style={{ imageRendering: "pixelated", pointerEvents: "none" }}
                                        >
                                          <div className={tooltipStyles.tooltipContent}>
                                            {dayTasks.map((task) => (
                                              <div
                                                key={task.id}
                                                className="flex items-start gap-2"
                                              >
                                                {task.completed ? (
                                                  <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                                ) : task.priority === "high" ? (
                                                  <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                                                ) : task.priority === "medium" ? (
                                                  <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                                                ) : (
                                                  <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                  <p
                                                    className={`text-[10px] ${task.completed ? "line-through text-gray-500" : "text-gray-800"} truncate`}
                                                    style={getFontStyle("'DungGeunMo'")}
                                                  >
                                                    <span className="text-[#FF1493]" style={getFontStyle("'Press Start 2P'")}>
                                                      {task.time}
                                                    </span>
                                                    {" "}{task.title}
                                                  </p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Stats - Pink Pixel Style */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className={`${taskStyles.statsCard} from-pink-100 to-pink-200 border-pink-400`} style={{ imageRendering: "pixelated" }}>
                            <div
                              className={textStyles.statsNumber}
                              style={getFontStyle("'Press Start 2P'")}
                            >
                              {totalCount}
                            </div>
                            <div className={textStyles.statsLabel} style={getFontStyle("'DungGeunMo'")}>
                              전체 • Total
                            </div>
                          </div>
                          <div className={`${taskStyles.statsCard} from-green-100 to-green-200 border-green-400`} style={{ imageRendering: "pixelated" }}>
                            <div
                              className="text-green-600 text-lg mb-0.5"
                              style={getFontStyle("'Press Start 2P'")}
                            >
                              {completedCount}
                            </div>
                            <div className="text-green-700 text-[9px]" style={getFontStyle("'DungGeunMo'")}>
                              완료 • Done
                            </div>
                          </div>
                          <div className={`${taskStyles.statsCard} from-yellow-100 to-yellow-200 border-yellow-400`} style={{ imageRendering: "pixelated" }}>
                            <div
                              className="text-yellow-600 text-lg mb-0.5"
                              style={getFontStyle("'Press Start 2P'")}
                            >
                              {totalCount - completedCount}
                            </div>
                            <div className="text-yellow-700 text-[9px]" style={getFontStyle("'DungGeunMo'")}>
                              남음 • Left
                            </div>
                          </div>
                        </div>

                        {/* Task List */}
                        <div className="space-y-2">
                          {currentTasks.length > 0 ? (
                            currentTasks.map((task, index) => (
                              <RetroPlannerTask
                                key={task.id}
                                {...task}
                                delay={index * 0.1}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                              />
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={taskStyles.emptyState}
                              style={{ imageRendering: "pixelated" }}
                            >
                              <Star className="w-10 h-10 text-pink-400 mx-auto mb-3 fill-pink-200" style={{ imageRendering: "pixelated" }} />
                              <p
                                className={textStyles.emptyStateTitle}
                                style={getFontStyle("'Press Start 2P'")}
                              >
                                NO TASKS
                              </p>
                              <p className={textStyles.emptyStateSubtext} style={getFontStyle("'DungGeunMo'")}>
                                할 일을 추가해보세요! • Add your first task!
                              </p>
                            </motion.div>
                          )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                          <div className="flex justify-center mt-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handlePrevPage}
                              className={buttonStyles.paginationButton}
                              style={borderStyles.pinkBorder}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="w-5 h-5 text-white" />
                            </motion.button>
                            <div className="mx-2 text-pink-600 text-[10px]" style={getFontStyle("'DungGeunMo'")}>
                              {currentPage} / {totalPages}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleNextPage}
                              className={buttonStyles.paginationButton}
                              style={borderStyles.pinkBorder}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="w-5 h-5 text-white" />
                            </motion.button>
                          </div>
                        )}

                        {/* Progress Bar - Pixel Style */}
                        {totalCount > 0 && (
                          <div className="mt-4 pt-3 border-t-3 border-pink-300">
                            <div className="flex items-center justify-between mb-2">
                              <span className={textStyles.progressLabel} style={getFontStyle("'DungGeunMo'")}>
                                진행률 • Progress
                              </span>
                              <span className={textStyles.progressPercent} style={getFontStyle("'Press Start 2P'")}>
                                {Math.round((completedCount / totalCount) * 100)}%
                              </span>
                            </div>
                            <div className={taskStyles.progressBar} style={{ imageRendering: "pixelated" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className={taskStyles.progressFill}
                              >
                                {/* Pixel pattern overlay */}
                                <div 
                                  className={taskStyles.progressPattern}
                                  style={getProgressPattern()}
                                />
                                {completedCount > 0 && <Heart className="w-4 h-4 text-white fill-white relative z-10" style={{ imageRendering: "pixelated" }} />}
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Color Palette - Pink Themed */}
        <div className={containerStyles.colorPalette} style={{ borderTopColor: "#808080" }}>
          <div className="grid grid-cols-15 gap-0.5 max-w-xl">
            {paletteColors.map((color, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.3, zIndex: 10, boxShadow: "0 0 8px rgba(255,20,147,0.8)" }}
                whileTap={{ scale: 0.9 }}
                className="w-4 h-4 border-2 border-pink-600"
                style={{ backgroundColor: color, imageRendering: "pixelated" }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Status Bar - Pixel Style */}
        <div className={containerStyles.statusBar} style={{ ...getFontStyle("'Press Start 2P'"), borderTopColor: "#ffffff" }}>
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 fill-pink-600 text-pink-600" style={{ imageRendering: "pixelated" }} />
            <span className={textStyles.statusBarText}>PINK PIXEL PLANNER v1.0</span>
          </div>
          <div className={`flex gap-4 ${textStyles.statusBarText}`}>
            <span>{displayDate.full}</span>
            <span>{todayTasks.length} TASKS</span>
          </div>
        </div>
      </motion.div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <RetroPlannerEditor onClose={() => setShowEditor(false)} onSave={handleSaveTask} />
        )}
      </AnimatePresence>
    </div>
  );
}