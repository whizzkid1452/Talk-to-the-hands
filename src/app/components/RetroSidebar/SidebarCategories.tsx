import { useState } from "react";
import { motion } from "motion/react";
import { Search, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { loadPosts } from "../../../../posts/loadPosts";

export function SidebarCategories() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  // posts에서 실제 사용된 태그들 추출 (중복 제거)
  const posts = loadPosts();
  const usedTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // 검색어로 태그 필터링
  const filteredTags = usedTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  // 검색어가 변경되면 표시 개수 초기화
  const handleSearchChange = (query: string) => {
    setTagSearchQuery(query);
    setVisibleCount(4);
  };

  // 표시할 태그 결정
  const displayedTags = filteredTags.slice(0, visibleCount);
  const hasMore = filteredTags.length > visibleCount;
  const remainingCount = filteredTags.length - visibleCount;

  // 더 보기 버튼 핸들러
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  // 접기 버튼 핸들러
  const handleShowLess = () => {
    setVisibleCount(4);
  };

  return (
    <div className="px-2 pb-2 overflow-x-hidden">
      <div className="bg-white border-4 border-[#ec407a] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] p-3 max-w-full">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#fce4ec]">
          <Tag className="w-3 h-3 text-[#e91e63] flex-shrink-0" />
          <h3
            className="text-[#e91e63] text-[10px] truncate"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            CATEGORIES
          </h3>
        </div>

        {/* 검색 Input */}
        <div className="mb-3 relative max-w-full">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#e91e63] flex-shrink-0" />
            <input
              type="text"
              value={tagSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full max-w-full pl-7 pr-2 py-1.5 border-2 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-[10px] focus:outline-none focus:border-[#e91e63]"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            />
          </div>
        </div>

        {/* 태그 그리드 */}
        {filteredTags.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-1.5 max-w-full">
              {displayedTags.map((tag, i) => (
                <motion.button
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 py-1.5 bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-2 border-[#ec407a] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] text-center min-w-0"
                >
                  <div
                    className="text-[9px] text-[#e91e63] truncate"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    {tag}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 더 보기/접기 버튼 */}
            {filteredTags.length > 4 && (
              <div className="mt-2 flex gap-1">
                {hasMore && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShowMore}
                    className="flex-1 max-w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span
                      className="text-[9px] truncate"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      +8 ({remainingCount > 8 ? '8' : remainingCount}개)
                    </span>
                    <ChevronDown className="w-3 h-3 flex-shrink-0" />
                  </motion.button>
                )}
                {visibleCount > 4 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShowLess}
                    className={`${hasMore ? 'w-auto' : 'flex-1'} max-w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    <span
                      className="text-[9px] truncate"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      접기
                    </span>
                    <ChevronUp className="w-3 h-3 flex-shrink-0" />
                  </motion.button>
                )}
              </div>
            )}
          </>
        ) : (
          <div
            className="text-center py-3 text-[#9c27b0] text-[9px] max-w-full"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            결과 없음
          </div>
        )}
      </div>
    </div>
  );
}
