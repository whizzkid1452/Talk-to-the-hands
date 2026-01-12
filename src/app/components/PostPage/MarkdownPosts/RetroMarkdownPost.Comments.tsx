import { motion } from "motion/react";
import { User } from "lucide-react";
import { commentStyles, fontStyles, commonStyles } from "./RetroMarkdownPost.styles";

interface Comment {
  author: string;
  text: string;
  date: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  commentText: string;
  onCommentTextChange: (text: string) => void;
  onCommentSubmit: () => void;
}

export function CommentsSection({
  comments,
  commentText,
  onCommentTextChange,
  onCommentSubmit,
}: CommentsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={commentStyles.container}
      style={commonStyles.pixelated}
    >
      <div className={commentStyles.header}>
        <h3 className="text-white text-xs md:text-sm" style={fontStyles.pressStart2P}>
          COMMENTS • 댓글 ({comments.length})
        </h3>
      </div>

      {/* Comment Input */}
      <div className={commentStyles.input.container}>
        <textarea
          value={commentText}
          onChange={(e) => onCommentTextChange(e.target.value)}
          placeholder="댓글을 입력하세요 • Write a comment..."
          className={commentStyles.input.textarea}
          style={{ ...fontStyles.dungGeunMo, ...commonStyles.pixelated }}
          rows={3}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCommentSubmit}
          className={commentStyles.input.button}
          style={commonStyles.pixelated}
        >
          <span className="text-xs md:text-sm" style={fontStyles.dungGeunMo}>
            댓글 작성 • Post Comment
          </span>
        </motion.button>
      </div>

      {/* Comment List */}
      <div className="divide-y-2 divide-[#f3e5f5]">
        {comments.map((comment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className={commentStyles.item.container}
          >
            <div className="flex items-start gap-3">
              <div className={commentStyles.item.avatar}>
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={commentStyles.item.author} style={fontStyles.dungGeunMo}>
                    {comment.author}
                  </span>
                  <span className={commentStyles.item.date} style={fontStyles.vt323}>
                    {comment.date}
                  </span>
                </div>
                <p className={commentStyles.item.text} style={fontStyles.dungGeunMo}>
                  {comment.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
