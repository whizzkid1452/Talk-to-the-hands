import React from "react";
import { Y2KTextBox } from "../layouts/stickers/Y2KTextBox";
import { Y2KSticker } from "../layouts/stickers/Y2KSticker";
import { titleBoxStyles, stickerConfig } from "./styles";

/**
 * HeroSection 컴포넌트
 * 
 * 홈 페이지의 메인 타이틀 섹션을 렌더링합니다.
 * Y2K 스타일의 타이틀 박스와 장식용 스티커들을 포함합니다.
 */
export function HeroSection() {
  return (
    <div className="relative mb-12">
      {/* Floating stickers decoration */}
      {stickerConfig.floating.map((sticker, index) => {
        const positionClasses = [
          sticker.position.top,
          sticker.position.bottom,
          sticker.position.left,
          sticker.position.right,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={index} className={`absolute ${positionClasses}`}>
            <Y2KSticker
              type={sticker.type}
              size={sticker.size}
              rotation={sticker.rotation}
            />
          </div>
        );
      })}

      {/* Main Title in Y2K style boxes */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        <Y2KTextBox variant="pink" rotation={-3}>
          <span
            className="text-2xl md:text-4xl font-bold text-purple-900"
            style={titleBoxStyles.talk}
          >
            TALK
          </span>
        </Y2KTextBox>

        <Y2KTextBox variant="purple" rotation={2}>
          <span
            className="text-2xl md:text-4xl font-bold text-pink-600"
            style={titleBoxStyles.to}
          >
            TO
          </span>
        </Y2KTextBox>

        <Y2KTextBox variant="gradient" rotation={-2}>
          <span
            className="text-2xl md:text-4xl font-bold text-white"
            style={titleBoxStyles.the}
          >
            THE
          </span>
        </Y2KTextBox>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <Y2KTextBox variant="white" rotation={3}>
          <span
            className="text-2xl md:text-4xl font-bold text-pink-500"
            style={titleBoxStyles.hand}
          >
            HAND
          </span>
        </Y2KTextBox>

        <Y2KTextBox variant="pink" rotation={-1}>
          <span
            className="text-xl md:text-2xl text-purple-700"
            style={titleBoxStyles.emoji}
          >
            💕✨
          </span>
        </Y2KTextBox>
      </div>

      {/* More decorative stickers */}
      {stickerConfig.decorative.map((sticker, index) => {
        const positionClasses = [
          sticker.position.top,
          sticker.position.bottom,
          sticker.position.left,
          sticker.position.right,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={index} className={`absolute ${positionClasses}`}>
            <Y2KSticker
              type={sticker.type}
              size={sticker.size}
              rotation={sticker.rotation}
            />
          </div>
        );
      })}
    </div>
  );
}
