import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";

interface CategoryTagsProps {
  tags: string[];
  tagCounts: Record<string, number>;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  variant?: 'sidebar' | 'page';
}

export function CategoryTags({
  tags,
  tagCounts,
  selectedTags,
  onTagClick,
  variant = 'page',
}: CategoryTagsProps) {
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // 검색어로 태그 필터링
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  // 보여줄 태그 슬라이싱
  const displayedTags = filteredTags.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev: number) => prev + 4);
  };

  const handleSearchChange = (query: string) => {
    setTagSearchQuery(query);
  };

  // variant에 따른 스타일 설정
  const isSidebar = variant === 'sidebar';
  const containerClass = isSidebar
    ? "max-h-48 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar"
    : "";
  const gridClass = isSidebar
    ? "grid grid-cols-2 gap-1.5 max-w-full"
    : "grid grid-cols-2 gap-2 md:gap-3";
  const buttonClass = isSidebar
    ? "px-2 py-1.5"
    : "p-2 md:p-3";
  const tagTextClass = isSidebar
    ? "text-[12px]"
    : "text-sm md:text-base";
  const countTextClass = isSidebar
    ? "text-[10px]"
    : "text-[11px] md:text-xs";
  const searchInputClass = isSidebar
    ? "w-full max-w-full pl-7 pr-2 py-1.5 border-2 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-[10px]"
    : "w-full pl-10 pr-3 py-2 border-3 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-xs md:text-sm";
  const searchIconClass = isSidebar
    ? "absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#e91e63] flex-shrink-0"
    : "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e91e63]";
  const searchPlaceholder = isSidebar
    ? "Search..."
    : "태그 검색 • Search tags...";
  const noResultTextClass = isSidebar
    ? "text-center py-3 text-[#9c27b0] text-[9px] max-w-full"
    : "text-center py-6 text-[#9c27b0] text-xs md:text-sm";

  return (
    <>
      {/* 검색 Input */}
      <div className={isSidebar ? "mb-3 relative max-w-full" : "mb-4 relative"}>
        <div className="relative">
          <Search className={searchIconClass} />
          <input
            type="text"
            value={tagSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={`${searchInputClass} focus:outline-none focus:border-[#e91e63]`}
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          />
        </div>
      </div>

      {/* 태그 그리드 */}
      {filteredTags.length > 0 ? (
        <div className={containerClass}>
          <div className={gridClass}>
            {displayedTags.map((tag, i) => {
              const isSelected = selectedTags.includes(tag);
              const count = tagCounts[tag] || 0;
              return (
                <motion.button
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: isSidebar ? i * 0.02 : 2 + i * 0.1,
                    type: "spring"
                  }}
                  whileHover={{ scale: isSidebar ? 1.05 : 1.1, rotate: isSidebar ? 0 : 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTagClick(tag)}
                  className={`${buttonClass} border-2 shadow-[${isSidebar ? '2px_2px' : '3px_3px'}_0px_0px_rgba(0,0,0,0.2)] text-center ${isSidebar ? 'min-w-0' : ''} ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#e91e63] to-[#f06292] border-black'
                      : 'bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-[#ec407a]'
                  }`}
                >
                  <div className={`flex items-center justify-center gap-1 ${isSidebar ? 'min-w-0' : ''}`}>
                    <span
                      className={`${tagTextClass} ${isSidebar ? 'truncate' : ''} ${
                        isSelected ? 'text-white' : 'text-[#e91e63]'
                      }`}
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {tag}
                    </span>
                    <span
                      className={`${countTextClass} flex-shrink-0 ${
                        isSelected ? 'text-white/80' : 'text-[#9c27b0]'
                      }`}
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      ({count})
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* 더 보기 버튼 */}
          {visibleCount < filteredTags.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadMore}
                className={`flex items-center gap-2 px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  isSidebar ? 'text-[10px] px-3 py-1.5' : 'text-xs md:text-sm'
                } bg-white text-[#e91e63]`}
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                더 보기 • Load More
              </motion.button>
            </motion.div>
          )}
        </div>
      ) : (
        <div
          className={noResultTextClass}
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          {isSidebar ? "결과 없음" : "검색 결과가 없습니다 • No results found"}
        </div>
      )}
    </>
  );
}
