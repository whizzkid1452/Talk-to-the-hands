/**
 * RetroMarkdownPost 컴포넌트 스타일
 */
import { COLORS, FONTS, COMMON_STYLES } from "./MarkdownPosts/RetroMarkdownPost.constants";

// 컨테이너 스타일
export const containerStyles = {
  main: "w-full max-w-5xl mx-auto pt-16 md:pt-20",
  article: "bg-white border-4 border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.4)]",
} as const;

// 헤더 스타일
export const headerStyles = {
  container: "bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493] p-4 md:p-6 border-b-4 border-[#C2185B]",
  title: "text-white text-sm md:text-lg lg:text-xl",
  subtitle: "text-white/90 text-xs md:text-sm",
} as const;

// 메타 정보 스타일
export const metaStyles = {
  container: "bg-[#FFE4E1] p-3 md:p-4 border-b-3 border-[#FFB6C1] flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm",
  tag: "px-2 py-1 bg-[#FFB6C1] border-2 border-[#FF1493] text-xs md:text-sm",
} as const;

// 콘텐츠 스타일
export const contentStyles = {
  container: "p-6 md:p-8 lg:p-12",
  section: "mb-8",
  heading: {
    h1: "text-[#FF1493] text-xl md:text-2xl lg:text-3xl mb-3",
    h2: "text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]",
    h3: "text-[#FF69B4] text-base md:text-lg mb-3",
    h4: "text-[#FF1493] text-sm md:text-base mb-2",
    h5: "text-[#C2185B] text-xs md:text-sm mb-2",
    h6: "text-[#880E4F] text-xs mb-2",
  },
  text: "text-[#1a0033] text-sm md:text-base",
} as const;

// 블록quote 스타일
export const blockquoteStyles = {
  container: "bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB] border-l-4 border-[#FF1493] p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]",
  text: "text-[#C2185B] text-sm md:text-base",
} as const;

// 리스트 스타일
export const listStyles = {
  unordered: {
    container: "bg-[#FFF0F5] border-3 border-[#FFB6C1] p-4 shadow-[4px_4px_0px_0px_rgba(255,182,193,0.5)]",
    item: "flex items-start gap-2",
    bullet: "text-[#FF1493] mt-1",
  },
  ordered: {
    container: "bg-[#F0F8FF] border-3 border-[#00bcd4] p-4 shadow-[4px_4px_0px_0px_rgba(0,188,212,0.5)]",
    item: "flex items-start gap-2",
    number: "text-[#00bcd4]",
  },
} as const;

// 테이블 스타일
export const tableStyles = {
  container: "w-full border-4 border-[#FF1493] shadow-[6px_6px_0px_0px_rgba(255,20,147,0.3)]",
  header: "bg-gradient-to-r from-[#FF1493] to-[#FF69B4]",
  headerCell: "border-2 border-[#C2185B] px-4 py-3 text-left text-white text-xs md:text-sm",
  row: {
    even: "bg-[#FFE4E1] hover:bg-[#FFB6C1] transition-colors",
    odd: "bg-white hover:bg-[#FFB6C1] transition-colors",
  },
  cell: "border-2 border-[#FFB6C1] px-4 py-3 text-xs md:text-sm",
} as const;

// 링크 스타일
export const linkStyles = {
  container: "flex items-center gap-2 w-fit px-4 py-2 bg-[#FFE4E1] border-3 border-[#FF1493] hover:bg-[#FFB6C1] transition-colors shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]",
  text: "text-[#FF1493] text-sm",
} as const;

// 액션 바 스타일
export const actionBarStyles = {
  container: "p-4 md:p-6 border-t-4 border-[#FFB6C1] bg-gradient-to-r from-[#FFE4E1] to-white",
  button: {
    base: "flex items-center gap-2 px-4 md:px-6 py-3 border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors",
    liked: "bg-[#FF1493] text-white border-[#C2185B]",
    default: "bg-white text-[#FF1493] hover:bg-[#FFE4E1] border-[#FF1493]",
    comment: "bg-white border-[#9c27b0] text-[#9c27b0] hover:bg-[#f3e5f5]",
    share: "bg-white border-[#00bcd4] text-[#00bcd4] hover:bg-[#e0f7fa] ml-auto",
  },
} as const;

// 댓글 섹션 스타일
export const commentStyles = {
  container: "mt-6 bg-white border-4 border-[#9c27b0] shadow-[8px_8px_0px_0px_rgba(156,39,176,0.4)]",
  header: "bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] p-3 md:p-4 border-b-4 border-[#7b1fa2]",
  input: {
    container: "p-4 md:p-6 border-b-4 border-[#f3e5f5]",
    textarea: "w-full p-3 md:p-4 border-4 border-[#9c27b0] bg-[#f3e5f5] text-[#1a0033] text-xs md:text-sm mb-3 resize-none",
    button: "px-4 md:px-6 py-2 bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] text-white border-4 border-[#7b1fa2] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  },
  item: {
    container: "p-4 md:p-6 hover:bg-[#f3e5f5]/30 transition-colors",
    avatar: "w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FF1493] to-[#9c27b0] border-2 border-black flex items-center justify-center flex-shrink-0",
    author: "text-[#9c27b0] text-xs md:text-sm",
    date: "text-[#FF69B4] text-[10px] md:text-xs",
    text: "text-[#1a0033] text-xs md:text-sm leading-relaxed",
  },
} as const;

// 폰트 스타일 객체
export const fontStyles = {
  pressStart2P: { fontFamily: FONTS.pressStart2P },
  dungGeunMo: { fontFamily: FONTS.dungGeunMo },
  vt323: { fontFamily: FONTS.vt323 },
} as const;

// 공통 스타일 객체
export const commonStyles = COMMON_STYLES;
