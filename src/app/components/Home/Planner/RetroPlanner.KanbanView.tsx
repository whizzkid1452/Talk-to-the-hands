import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Task, TaskStatus } from "./RetroPlanner.types";
import { kanbanColumns, categoryColors } from "./RetroPlanner.constants";
import { getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerKanbanViewProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

interface KanbanColumnProps {
  columnId: TaskStatus;
  label: string;
  color: string;
  tasks: Task[];
  onDrop: (taskId: number, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: number) => void;
}

function KanbanCard({ 
  task, 
  onDragStart,
  onDelete,
}: { 
  task: Task; 
  onDragStart: (e: React.DragEvent, taskId: number) => void;
  onDelete: (taskId: number) => void;
}) {
  const priorityColors = {
    high: { bg: "bg-red-100", border: "border-red-400", dot: "bg-red-500" },
    medium: { bg: "bg-yellow-100", border: "border-yellow-400", dot: "bg-yellow-500" },
    low: { bg: "bg-blue-100", border: "border-blue-400", dot: "bg-blue-500" },
  };

  const priorityStyle = priorityColors[task.priority];
  const categoryColor = categoryColors[task.category] || categoryColors["기타 Other"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, task.id)}
      className={`
        ${priorityStyle.bg} ${priorityStyle.border}
        border-3 p-3 cursor-grab active:cursor-grabbing
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]
        transition-shadow
        ${task.status === "done" ? "opacity-70" : ""}
      `}
      style={{ fontFamily: "'DungGeunMo', monospace" }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className={`text-xs font-bold flex-1 ${task.status === "done" ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="w-5 h-5 bg-white border-2 border-gray-400 text-[10px] hover:bg-red-200 hover:border-red-400 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center gap-2 text-[10px]">
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 ${priorityStyle.dot}`} />
          {task.priority === "high" ? "높음" : task.priority === "medium" ? "보통" : "낮음"}
        </span>
        <span className="text-gray-400">|</span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 ${categoryColor}`} />
          {task.category.split(" ")[0]}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2 text-[9px] text-gray-500">
        <span>⏰ {task.time}</span>
        <span>📅 {task.date}</span>
      </div>
    </motion.div>
  );
}

function KanbanColumn({ columnId, label, color, tasks, onDrop, onDeleteTask }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    if (!isNaN(taskId)) {
      onDrop(taskId, columnId);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  return (
    <div 
      className={`
        flex-1 min-w-[280px] max-w-[400px]
        bg-white border-4 border-black
        shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]
        flex flex-col
        transition-all duration-200
        ${isDragOver ? "border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)]" : ""}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div 
        className="px-4 py-3 border-b-4 border-black flex items-center justify-between"
        style={{ backgroundColor: color }}
      >
        <h3 
          className="text-sm font-bold text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
          style={getFontStyle("'Press Start 2P'")}
        >
          {label.split(" • ")[0]}
        </h3>
        <span 
          className="bg-white text-black px-2 py-1 text-xs font-bold border-2 border-black"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Column Content */}
      <div 
        className={`
          flex-1 p-3 overflow-y-auto space-y-3 min-h-[300px]
          ${isDragOver ? "bg-pink-50" : "bg-gray-50"}
          transition-colors duration-200
        `}
      >
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-400"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="text-xs">태스크를 드래그해서</p>
              <p className="text-xs">여기에 놓으세요</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function RetroPlannerKanbanView({
  tasks,
  onStatusChange,
  onDeleteTask,
}: RetroPlannerKanbanViewProps) {
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => {
      // 기존 태스크 중 status가 없는 경우 completed 기반으로 처리
      const taskStatus = task.status || (task.completed ? "done" : "todo");
      return taskStatus === status;
    });
  };

  const handleDrop = (taskId: number, newStatus: TaskStatus) => {
    onStatusChange(taskId, newStatus);
  };

  return (
    <div className="p-4">
      {/* Kanban Header */}
      <div 
        className="text-center mb-6"
        style={getFontStyle("'Press Start 2P'")}
      >
        <h2 className="text-lg text-[#FF1493] mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          ✨ Kanban Board ✨
        </h2>
        <p 
          className="text-xs text-gray-600"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          드래그앤드롭으로 태스크 상태를 변경하세요
        </p>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            columnId={column.id as TaskStatus}
            label={column.label}
            color={column.color}
            tasks={getTasksByStatus(column.id as TaskStatus)}
            onDrop={handleDrop}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      {/* Stats */}
      <div 
        className="mt-6 flex justify-center gap-4"
        style={{ fontFamily: "'DungGeunMo', monospace" }}
      >
        {kanbanColumns.map((column) => {
          const count = getTasksByStatus(column.id as TaskStatus).length;
          return (
            <div
              key={column.id}
              className="bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              <span 
                className="inline-block w-3 h-3 mr-2"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-xs">{column.label.split(" • ")[0]}: </span>
              <span className="font-bold text-sm">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
