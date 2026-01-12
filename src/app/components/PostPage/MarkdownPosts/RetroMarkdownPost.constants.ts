/**
 * RetroMarkdownPost 컴포넌트 상수
 */

// 색상 상수
export const COLORS = {
  primary: "#FF1493",
  primaryDark: "#C2185B",
  primaryLight: "#FF69B4",
  secondary: "#9c27b0",
  secondaryDark: "#7b1fa2",
  secondaryLight: "#ba68c8",
  accent: "#00bcd4",
  text: "#1a0033",
  background: "#FFE4E1",
  backgroundLight: "#FFB6C1",
  backgroundPale: "#FFF0F5",
  white: "#ffffff",
  gray: "#c0c0c0",
  grayDark: "#808080",
  black: "#000000",
} as const;

// 폰트 상수
export const FONTS = {
  pressStart2P: "'Press Start 2P', monospace",
  dungGeunMo: "'DungGeunMo', monospace",
  vt323: "'VT323', monospace",
} as const;

// 코드 블록 색상
export const CODE_COLORS = {
  background: "#1a0033",
  backgroundSecondary: "#2d0a4e",
  border: "#ff69b4",
  comment: "#bd93f9",
  function: "#ff79c6",
  import: "#8be9fd",
  return: "#50fa7b",
  string: "#f1fa8c",
  jsx: "#ffb86c",
  default: "#f8f8f2",
} as const;

// 기본 스타일 속성
export const COMMON_STYLES = {
  pixelated: {
    imageRendering: "pixelated" as const,
  },
  windowShadow: {
    boxShadow: "inset -1px -1px 0 0 rgba(0,0,0,0.5), inset 1px 1px 0 0 rgba(255,255,255,0.5)",
  },
} as const;

// commonStyles 별칭 (하위 호환성)
export const commonStyles = COMMON_STYLES;
