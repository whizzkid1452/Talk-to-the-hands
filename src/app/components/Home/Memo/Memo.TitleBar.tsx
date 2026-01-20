import { motion } from "motion/react";
import { StickyNote, X, Minimize2, Maximize2 } from "lucide-react";
import { windowButtonStyle } from "./Memo.styles";

type MemoTitleBarProps = {
  onMinimizeToggle: () => void;
};

export function MemoTitleBar({ onMinimizeToggle }: MemoTitleBarProps) {
  return (
    <div className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF69B4] px-2 py-1 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <StickyNote className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
        <span
          className="text-white text-xs"
          style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
        >
          NOTEPAD.EXE
        </span>
      </div>
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ backgroundColor: "#ffa500" }}
          whileTap={{ scale: 0.9 }}
          onClick={onMinimizeToggle}
          className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
          style={windowButtonStyle}
        >
          <Minimize2 className="w-3 h-3" />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#ffa500" }}
          className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
          style={windowButtonStyle}
        >
          <Maximize2 className="w-3 h-3" />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#ff1493" }}
          className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
          style={windowButtonStyle}
        >
          <X className="w-3 h-3" />
        </motion.button>
      </div>
    </div>
  );
}
