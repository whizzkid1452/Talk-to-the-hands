import { useNavigate, useLocation } from "react-router-dom";
import { loadPosts } from "../../../posts/loadPosts";

export function useTagFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTags = searchParams.getAll("tag");

  // posts에서 실제 사용된 태그들 추출 및 개수 계산
  const posts = loadPosts();
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const usedTags = Object.keys(tagCounts).sort();

  // 태그 클릭 핸들러 (토글 방식)
  const handleTagClick = (tag: string) => {
    const currentTags = new Set(searchParams.getAll("tag"));
    
    if (currentTags.has(tag)) {
      currentTags.delete(tag);
    } else {
      currentTags.add(tag);
    }

    // 기존 쿼리 파라미터 유지하면서 tag만 업데이트
    // URLSearchParams를 새로 구성하여 tag 파라미터를 재설정
    const newParams = new URLSearchParams(location.search);
    newParams.delete("tag");
    currentTags.forEach(t => newParams.append("tag", t));

    navigate(`/post?${newParams.toString()}`);
  };

  // 태그 필터 제거 핸들러
  const clearTagFilter = () => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete("tag");
    navigate(`/post?${newParams.toString()}`);
  };

  return {
    selectedTags,
    usedTags,
    tagCounts,
    handleTagClick,
    clearTagFilter,
  };
}
