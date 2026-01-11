import { markdownToPost, Post } from './utils';

// Vite의 import.meta.glob을 사용하여 모든 마크다운 파일을 동적으로 로드
const markdownModules = import.meta.glob('./*.md', { as: 'raw', eager: true });

/**
 * 모든 마크다운 파일을 로드하여 Post 배열로 변환
 */
export function loadPosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, content] of Object.entries(markdownModules)) {
    if (typeof content === 'string') {
      // 파일명에서 확장자 제거
      const filename = path.replace('./', '').replace('.md', '');
      const post = markdownToPost(content, filename);
      posts.push(post);
    }
  }

  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}
