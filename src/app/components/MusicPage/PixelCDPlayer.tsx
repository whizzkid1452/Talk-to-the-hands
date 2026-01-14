import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import cdImage from "@/assets/cd.png";

export function PixelCDPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const bgmUrl = `${import.meta.env.BASE_URL}music.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false);
        }
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={bgmUrl} 
        loop
      />
      
      <div className="fixed top-6 right-6 z-50 select-none cursor-pointer">
        <motion.div
          className="relative"
          onClick={togglePlay}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={
            isPlaying
              ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {}
          }
          whileHover={{ scale: 1.05 }}
          style={{
            filter: `drop-shadow(0 0 ${isPlaying ? 20 : 12}px rgba(255, 105, 180, ${isPlaying ? 0.8 : 0.5}))`
          }}
        >
          <img 
            src={cdImage} 
            alt="CD" 
            className="w-[120px] h-[120px] pointer-events-none"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-black drop-shadow-lg" fill="white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}