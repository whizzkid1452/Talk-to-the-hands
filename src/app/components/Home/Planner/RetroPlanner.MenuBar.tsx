import { motion } from "motion/react";
import { containerStyles, buttonStyles, getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerMenuBarProps {
  viewMode: "today" | "week" | "month";
  onViewModeChange: (mode: "today" | "week" | "month") => void;
}

export function RetroPlannerMenuBar({ viewMode, onViewModeChange }: RetroPlannerMenuBarProps) {
  return (
    <div className={containerStyles.menuBar} style={{ ...getFontStyle("'Press Start 2P'"), borderBottomColor: "#808080" }}>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("today")}
        className={buttonStyles.menuItem}
        style={viewMode === "today" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Today
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("week")}
        className={buttonStyles.menuItem}
        style={viewMode === "week" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Week
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("month")}
        className={buttonStyles.menuItem}
        style={viewMode === "month" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Month
      </motion.button>
    </div>
  );
}
