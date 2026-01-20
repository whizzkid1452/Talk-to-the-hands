import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { FLOATING_HEART_COUNT, FLOATING_SPARKLE_COUNT } from "./Memo.constants";

export function MemoFloatingDecorations() {
  return (
    <>
      {[...Array(FLOATING_HEART_COUNT)].map((_, i) => (
        <motion.div
          key={`note-heart-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${10 + (i * 15)}%`,
            left: i % 2 === 0 ? "auto" : `${5 + (i * 4)}%`,
            right: i % 2 === 0 ? `${5 + (i * 4)}%` : "auto",
          }}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2 + (i % 2),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart
            className="w-3 h-3 md:w-4 md:h-4 fill-pink-300 text-pink-400 drop-shadow-[0_2px_4px_rgba(236,72,153,0.4)]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}

      {[...Array(FLOATING_SPARKLE_COUNT)].map((_, i) => (
        <motion.div
          key={`note-sparkle-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${20 + (i * 20)}%`,
            left: `${15 + (i * 20)}%`,
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.7, 1.2, 0.7],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.5 + (i % 2),
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          <Sparkles
            className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </>
  );
}
