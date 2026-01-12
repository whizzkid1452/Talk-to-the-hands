import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useBackButton } from "../../../contexts/BackButtonContext";
import { BackButton } from "./RetroMarkdownPost.BackButton";
import { PostHeader } from "./RetroMarkdownPost.Header";
import { MetaInfo } from "./RetroMarkdownPost.MetaInfo";
import { MarkdownContent } from "./RetroMarkdownPost.Content";
import { ActionBar } from "./RetroMarkdownPost.ActionBar";
import { CommentsSection } from "./RetroMarkdownPost.Comments";
import { containerStyles, commonStyles } from "./RetroMarkdownPost.styles";

interface RetroMarkdownPostProps {
  onBack: () => void;
}

interface Comment {
  author: string;
  text: string;
  date: string;
}

export function RetroMarkdownPost({ onBack }: RetroMarkdownPostProps) {
  const { setHasBackButton } = useBackButton();

  useEffect(() => {
    setHasBackButton(true);
    return () => {
      setHasBackButton(false);
    };
  }, [setHasBackButton]);

  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([
    {
      author: "DevPixel90",
      text: "마크다운 예제 정말 유용하네요! 감사합니다 😊",
      date: "2026-01-03 10:30",
    },
    {
      author: "RetroWebDev",
      text: "테이블 스타일링이 특히 예쁘네요! Great work!",
      date: "2026-01-03 11:15",
    },
  ]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setCommentList([
        ...commentList,
        {
          author: "Guest User",
          text: commentText,
          date: new Date().toLocaleString("ko-KR"),
        },
      ]);
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerStyles.main}
    >
      <BackButton onBack={onBack} />

      {/* Main Post Container */}
      <motion.article
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className={containerStyles.article}
        style={commonStyles.pixelated}
      >
        <PostHeader />
        <MetaInfo />
        <MarkdownContent />
        <ActionBar
          likes={likes}
          isLiked={isLiked}
          commentCount={commentList.length}
          onLike={handleLike}
        />
      </motion.article>

      <CommentsSection
        comments={commentList}
        commentText={commentText}
        onCommentTextChange={setCommentText}
        onCommentSubmit={handleCommentSubmit}
      />
    </motion.div>
  );
}
