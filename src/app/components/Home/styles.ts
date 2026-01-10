/**
 * Home 페이지 스타일 상수 및 스타일 객체
 */

// 타이틀 텍스트 스타일
export const titleTextStyles = {
  pressStart2P: {
    fontFamily: "'Press Start 2P', monospace",
  },
  dungGeunMo: {
    fontFamily: "'DungGeunMo', monospace",
  },
} as const;

// 타이틀 박스 스타일
export const titleBoxStyles = {
  talk: {
    fontFamily: "'Press Start 2P', monospace",
    textShadow: "3px 3px 0px rgba(255, 105, 180, 0.5)",
  },
  to: {
    fontFamily: "'Press Start 2P', monospace",
    textShadow: "3px 3px 0px rgba(147, 112, 219, 0.5)",
  },
  the: {
    fontFamily: "'Press Start 2P', monospace",
    textShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)",
  },
  hand: {
    fontFamily: "'Press Start 2P', monospace",
    textShadow: "3px 3px 0px rgba(255, 20, 147, 0.3)",
  },
  emoji: {
    fontFamily: "'DungGeunMo', monospace",
  },
} as const;

// 스티커 타입 정의
type StickerType = "star" | "heart" | "sparkle" | "cd";

interface StickerPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface StickerConfig {
  type: StickerType;
  size: number;
  rotation: number;
  position: StickerPosition;
}

// 스티커 위치 및 설정
export const stickerConfig: {
  floating: StickerConfig[];
  decorative: StickerConfig[];
} = {
  floating: [
    { type: "star", size: 80, rotation: -15, position: { top: "-top-8", left: "-left-4 md:-left-8" } },
    { type: "heart", size: 60, rotation: 20, position: { top: "-top-4", right: "-right-4 md:-right-8" } },
    { type: "sparkle", size: 40, rotation: 45, position: { top: "top-20", left: "left-4" } },
  ],
  decorative: [
    { type: "cd", size: 70, rotation: 15, position: { bottom: "bottom-0", right: "right-8 md:right-20" } },
    { type: "sparkle", size: 35, rotation: -30, position: { bottom: "bottom-4", left: "left-1/3" } },
  ],
};
