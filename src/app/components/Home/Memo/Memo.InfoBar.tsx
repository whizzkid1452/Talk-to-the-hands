import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import { fontPressStart2P, fontDungGeunMo } from "./Memo.styles";

export function MemoInfoBar() {
  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-2 border-2 border-pink-200"
      style={{ imageRendering: "pixelated" }}
    >
      <div className={`flex items-center gap-4 text-[8px]`} style={fontPressStart2P}>
        <span className="text-purple-600">Ln 1, Col 1</span>
        <span className="text-pink-500">UTF-8</span>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart
            className="w-3 h-3 fill-pink-400 text-pink-500"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
        <span className="text-[8px] text-pink-600" style={fontDungGeunMo}>
          메모장 • NOTEPAD
        </span>
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star
            className="w-3 h-3 fill-yellow-300 text-yellow-400"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
