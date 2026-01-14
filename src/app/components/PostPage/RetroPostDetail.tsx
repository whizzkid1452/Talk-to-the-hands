import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Share2, Clock, User, Tag, Eye, Code, Link as LinkIcon, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { RetroMarkdownRenderer } from "./MarkdownPosts/RetroMarkdownRenderer";
import { fetchCommentsByPostId, createComment, subscribeToComments, type Comment } from "../../../lib/comments";

interface PostDetailProps {
  title: string;
  titleKo?: string;
  author: string;
  date: string;
  description?: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  color: string;
  onBack: () => void;
}

export function RetroPostDetail({
  title,
  titleKo,
  author,
  date,
  description,
  content,
  tags,
  likes: initialLikes,
  comments: initialComments,
  views,
  color,
  onBack,
}: PostDetailProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // 포스트 ID 생성 (title을 slug로 변환)
  const postId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // 댓글 불러오기
  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoadingComments(true);
        const comments = await fetchCommentsByPostId(postId);
        setCommentList(comments);
      } catch (error) {
        console.error('댓글 로딩 실패:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();

    // 실시간 댓글 구독 (다른 사용자의 댓글을 위해)
    const unsubscribe = subscribeToComments(postId, (newComment) => {
      // 중복 방지: 이미 존재하는 댓글이면 추가하지 않음
      setCommentList((prev) => {
        const exists = prev.some(comment => comment.id === newComment.id);
        if (exists) return prev;
        return [...prev, newComment];
      });
    });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      alert('댓글 내용을 입력해주세요!');
      return;
    }

    if (!authorName.trim()) {
      alert('작성자 이름을 입력해주세요!');
      return;
    }

    // 낙관적 업데이트를 위한 임시 댓글 객체 생성
    const tempComment: Comment = {
      id: `temp-${Date.now()}`, // 임시 ID
      post_id: postId,
      author_name: authorName.trim(),
      comment_text: commentText.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      setIsSubmittingComment(true);
      
      // 즉시 UI에 댓글 추가 (낙관적 업데이트)
      setCommentList((prev) => [...prev, tempComment]);
      
      // 입력 필드 초기화
      setCommentText("");
      
      // 실제 데이터베이스에 저장
      const savedComment = await createComment({
        post_id: postId,
        author_name: authorName.trim(),
        comment_text: commentText.trim(),
      });

      // 임시 댓글을 실제 댓글로 교체
      setCommentList((prev) =>
        prev.map((comment) =>
          comment.id === tempComment.id ? savedComment : comment
        )
      );
      
      // 작성자 이름은 유지 (같은 사람이 여러 댓글 작성 가능)
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      
      // 실패 시 임시 댓글 제거
      setCommentList((prev) =>
        prev.filter((comment) => comment.id !== tempComment.id)
      );
      
      // 실패한 댓글 내용 복원
      setCommentText(commentText);
      
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto pt-16 md:pt-20"
    >
      {/* Back Button - Fixed */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="fixed top-4 left-4 md:left-6 lg:left-[280px] z-50 flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#e91e63]"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        <span
          className="text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          목록으로 • Back to List
        </span>
      </motion.button>

      {/* Main Post Container */}
      <motion.article
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${color} p-4 md:p-6 border-b-4 border-black`}
        >
          <h1
            className="text-white text-sm md:text-lg lg:text-xl mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {title}
          </h1>
          {titleKo && (
            <h2
              className="text-white/90 text-base md:text-xl"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {titleKo}
            </h2>
          )}
        </div>

        {/* Meta Info */}
        <div className="bg-[#fce4ec] p-3 md:p-4 border-b-2 border-[#ec407a] flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 md:w-5 md:h-5 text-[#e91e63]" />
            <span style={{ fontFamily: "'DungGeunMo', monospace" }}>
              {author}
            </span>
          </div>
          <div className="flex items-center gap-[0.25rem]">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
            <span style={{ fontFamily: "'VT323', monospace" }}>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#00bcd4]" />
            <span style={{ fontFamily: "'VT323', monospace" }}>
              {views} views
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-12">
          <RetroMarkdownRenderer content={content} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t-2 border-[#fce4ec]">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="inline-flex items-center gap-1 px-3 py-2 bg-[#f8bbd0] border-2 border-[#ec407a] text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                <Tag className="w-3 h-3 md:w-4 md:h-4" />
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 md:p-6 border-t-4 border-[#fce4ec] bg-gradient-to-r from-[#fce4ec] to-white">
          <div className="flex gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                isLiked
                  ? "bg-[#e91e63] text-white"
                  : "bg-white text-[#e91e63] hover:bg-[#fce4ec]"
              }`}
            >
              <Heart
                className={`w-5 h-5 md:w-6 md:h-6 ${isLiked ? "fill-current" : ""}`}
              />
              <span
                className="text-sm md:text-base"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {likes}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0] hover:bg-[#fce4ec] transition-colors"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              <span
                className="text-sm md:text-base"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {commentList.length}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#00bcd4] hover:bg-[#fce4ec] transition-colors ml-auto"
            >
              <Share2 className="w-5 h-5 md:w-6 md:h-6" />
              <span
                className="text-sm md:text-base hidden md:inline"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                공유 • Share
              </span>
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
      >
        <div className="bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] p-3 md:p-4 border-b-4 border-black">
          <h3
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            COMMENTS • 댓글 ({commentList.length})
          </h3>
        </div>

        {/* Comment Input */}
        <div className="p-4 md:p-6 border-b-4 border-[#fce4ec]">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="작성자 이름 • Your name..."
            className="w-full p-3 md:p-4 border-4 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-xs md:text-sm mb-3"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
            maxLength={30}
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요 • Write a comment..."
            className="w-full p-3 md:p-4 border-4 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-xs md:text-sm mb-3 resize-none"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
            rows={3}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCommentSubmit}
            disabled={isSubmittingComment}
            className="px-4 md:px-6 py-2 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {isSubmittingComment ? '작성 중... • Posting...' : '댓글 작성 • Post Comment'}
            </span>
          </motion.button>
        </div>

        {/* Comment List */}
        <div className="divide-y-2 divide-[#fce4ec]">
          {isLoadingComments ? (
            <div className="p-8 text-center">
              <div
                className="text-[#9c27b0] text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                댓글 불러오는 중... • Loading comments...
              </div>
            </div>
          ) : commentList.length === 0 ? (
            <div className="p-8 text-center">
              <div
                className="text-[#9c27b0] text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요! • No comments yet. Be the first!
              </div>
            </div>
          ) : (
            commentList.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-4 md:p-6 hover:bg-[#fce4ec]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#e91e63] to-[#9c27b0] border-2 border-black flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[#e91e63] text-xs md:text-sm"
                        style={{ fontFamily: "'DungGeunMo', monospace" }}
                      >
                        {comment.author_name}
                      </span>
                      <span
                        className="text-[#9c27b0] text-[10px] md:text-xs"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {new Date(comment.created_at).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p
                      className="text-[#1a0033] text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {comment.comment_text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}