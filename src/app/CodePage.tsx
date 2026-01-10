import React from "react";
import { RetroImage } from "./components/RetroImage";
import { KoreanPixelGallery } from "./components/KoreanPixelGallery";
import { PixelGrid } from "./components/PixelGrid";

export function CodePage() {
  return (
    <div className="w-full">
      <RetroImage />
      <KoreanPixelGallery />
      <PixelGrid />
    </div>
  );
}
