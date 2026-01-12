import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { fontStyles, commonStyles } from "./RetroMarkdownPost.styles";

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onBack}
      className="fixed top-4 left-4 md:left-6 lg:left-[280px] z-50 flex items-center gap-2 px-4 py-2 bg-white border-4 border-[#FF1493] shadow-[4px_4px_0px_0px_rgba(255,20,147,0.5)] text-[#e91e63]"
      style={commonStyles.pixelated}
    >
      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      <span className="text-xs md:text-sm" style={fontStyles.dungGeunMo}>
        목록으로 • Back to List
      </span>
    </motion.button>
  );
}
