import { motion } from "motion/react";
import { Heart, Star, Sparkles } from "lucide-react";

const PIXELATED = { imageRendering: "pixelated" as const };

const STICKERS = [
  {
    position: "absolute -top-3 -left-3 z-10",
    Icon: Star,
    iconClass: "w-6 h-6 md:w-8 md:h-8 fill-yellow-300 text-yellow-400 drop-shadow-[0_2px_6px_rgba(255,215,0,0.8)]",
    animate: { rotate: [0, -5, 0], scale: [1, 1.1, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
  {
    position: "absolute -top-3 -right-3 z-10",
    Icon: Heart,
    iconClass: "w-6 h-6 md:w-8 md:h-8 fill-pink-400 text-pink-500 drop-shadow-[0_2px_6px_rgba(255,105,180,0.8)]",
    animate: { rotate: [0, 5, 0], scale: [1, 1.15, 1] },
    transition: { duration: 1.8, repeat: Infinity, delay: 0.2 },
  },
  {
    position: "absolute -bottom-3 -left-3 z-10",
    Icon: Sparkles,
    iconClass: "w-6 h-6 md:w-8 md:h-8 text-purple-400 fill-purple-300 drop-shadow-[0_2px_6px_rgba(147,112,219,0.8)]",
    animate: { rotate: [0, -10, 0], scale: [1, 1.2, 1] },
    transition: { duration: 2.2, repeat: Infinity, delay: 0.4 },
  },
  {
    position: "absolute -bottom-3 -right-3 z-10",
    Icon: Heart,
    iconClass: "w-6 h-6 md:w-8 md:h-8 fill-pink-300 text-pink-400 drop-shadow-[0_2px_6px_rgba(255,182,193,0.8)]",
    animate: { rotate: [0, 10, 0], scale: [1, 1.1, 1] },
    transition: { duration: 2.4, repeat: Infinity, delay: 0.6 },
  },
] as const;

export function MemoCornerStickers() {
  return (
    <>
      {STICKERS.map(({ position, Icon, iconClass, animate, transition }, i) => (
        <div key={i} className={position}>
          <motion.div animate={animate} transition={transition}>
            <Icon className={iconClass} style={PIXELATED} />
          </motion.div>
        </div>
      ))}
    </>
  );
}
