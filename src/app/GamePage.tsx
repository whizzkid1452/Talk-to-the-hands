import React, { Suspense, lazy } from "react";

// 게임 컴포넌트들을 lazy loading으로 로드
const RetroMiniGame = lazy(() => import("./components/RetroMiniGame").then(module => ({ default: module.RetroMiniGame })));
const PrincessRunnerGame = lazy(() => import("./components/PrincessRunnerGame").then(module => ({ default: module.PrincessRunnerGame })));
const RetroTVGame = lazy(() => import("./components/RetroTVGame").then(module => ({ default: module.RetroTVGame })));

export function GamePage() {
  return (
    <div className="w-full">
      {/* 게임 컴포넌트들을 lazy loading으로 로드 */}
      <Suspense fallback={
        <div className="w-full max-w-4xl mx-auto my-8 md:my-12 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-pink-500 font-mono text-sm">게임 로딩 중...</p>
          </div>
        </div>
      }>
        <RetroMiniGame />
        <PrincessRunnerGame />
        <RetroTVGame />
      </Suspense>
    </div>
  );
}
