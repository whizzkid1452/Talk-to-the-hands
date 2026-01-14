import { useNavigate, useLocation } from "react-router-dom";
import { loadPosts } from "../../../posts/loadPosts";

export function useTagFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTag = searchParams.get("tag");

  // posts에서 실제 사용된 태그들 추출 및 개수 계산
  const posts = loadPosts();
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const usedTags = Object.keys(tagCounts).sort();

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    // 항상 /post 페이지로 이동하며 태그 쿼리 파라미터 전달
    navigate(`/post?tag=${encodeURIComponent(tag)}`);
  };

  // 태그 필터 제거 핸들러
  const clearTagFilter = () => {
    // 필터 제거 시에도 /post 페이지에 머물거나 이동
    navigate("/post");
  };

  return {
    selectedTag,
    usedTags,
    tagCounts,
    handleTagClick,
    clearTagFilter,
  };
}
