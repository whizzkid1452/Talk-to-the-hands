/**
 * 마크다운 파일에서 frontmatter를 파싱하는 함수
 */
export function parseFrontmatter(content: string): {
  frontmatter: Record<string, any>;
  body: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];

  // YAML 파싱 (간단한 버전)
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterText.split('\n');
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // 배열 항목인지 확인 (들여쓰기와 - 로 시작)
    if (trimmedLine.startsWith('-') && currentArray !== null) {
      const item = trimmedLine.substring(1).trim();
      currentArray.push(item.replace(/^["']|["']$/g, ''));
      continue;
    }

    // 이전 배열이 있었다면 저장
    if (currentKey && currentArray !== null) {
      frontmatter[currentKey] = currentArray;
      currentKey = null;
      currentArray = null;
    }

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    // 따옴표 제거
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // 빈 값이면 배열 시작 가능성 확인
    if (!value) {
      // 다음 줄이 배열 항목인지 확인
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('-')) {
        currentKey = key;
        currentArray = [];
        continue;
      }
    }

    // 배열 파싱 (간단한 버전)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      frontmatter[key] = arrayContent
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(item => item);
    } else if (value === 'true') {
      frontmatter[key] = true;
    } else if (value === 'false') {
      frontmatter[key] = false;
    } else if (!isNaN(Number(value)) && value.trim() !== '') {
      frontmatter[key] = Number(value);
    } else {
      frontmatter[key] = value;
    }
  }

  // 마지막 배열 저장
  if (currentKey && currentArray !== null) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

/**
 * Post 타입 정의
 */
export interface Post {
  title: string;
  titleKo?: string;
  author: string;
  date: string;
  description?: string;
  tag?: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  color: string;
}

/**
 * 마크다운 파일을 Post 객체로 변환
 */
export function markdownToPost(
  markdownContent: string,
  filename: string
): Post {
  const { frontmatter, body } = parseFrontmatter(markdownContent);

  return {
    title: frontmatter.title || '',
    titleKo: frontmatter.titleKo,
    author: frontmatter.author || '',
    date: frontmatter.date || '',
    description: frontmatter.description,
    tag: frontmatter.tag,
    content: body.trim(),
    tags: frontmatter.tags || [],
    likes: frontmatter.likes || 0,
    comments: frontmatter.comments || 0,
    views: frontmatter.views || 0,
    color: frontmatter.color || 'from-[#ff1493] to-[#ff69b4]',
  };
}
