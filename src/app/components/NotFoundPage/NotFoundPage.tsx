import React from "react";
import { Link } from "react-router-dom";
import { Y2KSticker } from "../layouts/stickers/Y2KSticker";
import { Y2KTextBox } from "../layouts/stickers/Y2KTextBox";

export function NotFoundPage() {
  return (
    <>
      {/* Y2K Hero Section with Stickers */}
      <div className="relative mb-12">
        {/* Floating stickers decoration */}
        <div className="absolute -top-8 -left-4 md:-left-8">
          <Y2KSticker type="star" size={80} rotation={-15} />
        </div>
        <div className="absolute -top-4 -right-4 md:-right-8">
          <Y2KSticker type="heart" size={60} rotation={20} />
        </div>
        <div className="absolute top-20 left-4">
          <Y2KSticker type="sparkle" size={40} rotation={45} />
        </div>
        
        {/* Main Title in Y2K style boxes */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          <Y2KTextBox variant="pink" rotation={-3}>
            <span 
              className="text-4xl md:text-6xl font-bold text-purple-900"
              style={{ 
                fontFamily: "'Press Start 2P', monospace",
                textShadow: "3px 3px 0px rgba(255, 105, 180, 0.5)"
              }}
            >
              404
            </span>
          </Y2KTextBox>
        </div>

        {/* More decorative stickers */}
        <div className="absolute bottom-0 right-8 md:right-20">
          <Y2KSticker type="cd" size={70} rotation={15} />
        </div>
        <div className="absolute bottom-4 left-1/3">
          <Y2KSticker type="sparkle" size={35} rotation={-30} />
        </div>
      </div>
      
      {/* Error Message */}
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
        <Y2KTextBox variant="gradient" className="max-w-2xl">
          <div className="text-center space-y-4 p-6">
            <h2 
              className="text-2xl md:text-3xl font-bold text-purple-900 mb-4"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              PAGE NOT FOUND
            </h2>
            <p 
              className="text-lg md:text-xl text-pink-600 mb-6"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              요청하신 페이지를 찾을 수 없습니다.
            </p>
            <p 
              className="text-base md:text-lg text-purple-700"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              The page you're looking for doesn't exist.
            </p>
          </div>
        </Y2KTextBox>

        {/* Back to Home Button */}
        <Link to="/">
          <Y2KTextBox variant="pink" className="cursor-pointer hover:scale-105 transition-transform">
            <span 
              className="text-lg md:text-xl font-bold text-purple-900 px-6 py-3"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ← 홈으로 돌아가기
            </span>
          </Y2KTextBox>
        </Link>
      </div>
    </>
  );
}
