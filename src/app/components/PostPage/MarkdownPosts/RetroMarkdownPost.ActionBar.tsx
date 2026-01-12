import { motion } from "motion/react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { actionBarStyles, fontStyles, commonStyles } from "./RetroMarkdownPost.styles";

interface ActionBarProps {
  likes: number;
  isLiked: boolean;
  commentCount: number;
  onLike: () => void;
}

export function ActionBar({ likes, isLiked, commentCount, onLike }: ActionBarProps) {
  return (
    <div className={actionBarStyles.container}>
      <div className="flex gap-3 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLike}
          className={`${actionBarStyles.button.base} ${
            isLiked
              ? actionBarStyles.button.liked
              : actionBarStyles.button.default
          }`}
          style={commonStyles.pixelated}
        >
          <Heart
            className={`w-5 h-5 md:w-6 md:h-6 ${isLiked ? "fill-current" : ""}`}
          />
          <span className="text-sm md:text-base" style={fontStyles.dungGeunMo}>
            {likes}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${actionBarStyles.button.base} ${actionBarStyles.button.comment}`}
          style={commonStyles.pixelated}
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base" style={fontStyles.dungGeunMo}>
            {commentCount}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${actionBarStyles.button.base} ${actionBarStyles.button.share}`}
          style={commonStyles.pixelated}
        >
          <Share2 className="w-5 h-5 md:w-6 md:h-6" />
          <span
            className="text-sm md:text-base hidden md:inline"
            style={fontStyles.dungGeunMo}
          >
            공유 • Share
          </span>
        </motion.button>
      </div>
    </div>
  );
}
