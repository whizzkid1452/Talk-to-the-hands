import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StickyNote, X, Minimize2, Maximize2, Heart, Star, Sparkles } from "lucide-react";
import { fetchPlannerMemo, savePlannerMemo } from "@/lib/plannerMemo";

const DEBOUNCE_MS = 600;

export function RetroPlannerMemo() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const contentRef = useRef("");
  const memoIdRef = useRef<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(async () => {
    try {
      const saved = await savePlannerMemo(contentRef.current, memoIdRef.current);
      if (!memoIdRef.current) memoIdRef.current = saved.id;
      setError(null);
    } catch {
      setError("저장 실패");
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null;
      persist();
    }, DEBOUNCE_MS);
  }, [persist]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const memo = await fetchPlannerMemo();
        if (cancelled) return;
        setContent(memo?.content ?? "");
        contentRef.current = memo?.content ?? "";
        memoIdRef.current = memo?.id ?? null;
      } catch {
        if (!cancelled) setError("불러오기 실패");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setContent(v);
    contentRef.current = v;
    scheduleSave();
  };

  const handleBlur = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    persist();
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 md:mb-8 relative">
      {/* Floating decorations */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`note-heart-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${10 + (i * 15)}%`,
            left: i % 2 === 0 ? "auto" : `${5 + (i * 4)}%`,
            right: i % 2 === 0 ? `${5 + (i * 4)}%` : "auto",
          }}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2 + (i % 2),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart className="w-3 h-3 md:w-4 md:h-4 fill-pink-300 text-pink-400 drop-shadow-[0_2px_4px_rgba(236,72,153,0.4)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`note-star-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${20 + (i * 20)}%`,
            left: `${15 + (i * 20)}%`,
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.7, 1.2, 0.7],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.5 + (i % 2),
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative"
        style={{
          borderTopColor: "#ffffff",
          borderLeftColor: "#ffffff",
          borderRightColor: "#808080",
          borderBottomColor: "#808080",
          imageRendering: "pixelated",
        }}
      >
        {/* Title Bar - Yellow/Pink Gradient Style */}
        <div className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF69B4] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
            <span className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
              NOTEPAD.EXE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: "#ffa500" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <Minimize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ffa500" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <Maximize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff1493" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {/* Menu Bar */}
              <div className="bg-white px-2 py-1 flex gap-3 text-[11px] border-b" style={{ fontFamily: "'Press Start 2P', monospace", borderBottomColor: "#808080", imageRendering: "pixelated" }}>
                {["File", "Edit", "Format", "View", "Help"].map((menu) => (
                  <motion.button
                    key={menu}
                    whileHover={{ backgroundColor: "#FFE4A0", color: "#C2185B" }}
                    className="hover:bg-yellow-100 px-1 text-[9px]"
                  >
                    {menu}
                  </motion.button>
                ))}
              </div>

              {/* Notepad Content Area */}
              <div className="p-4">
                <div
                  className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 border-4 border-[#FFB6C1] shadow-[6px_6px_0px_0px_rgba(255,105,180,0.4)]"
                  style={{ imageRendering: "pixelated" }}
                >
                  {/* Decorative corner stickers */}
                  <div className="absolute -top-3 -left-3 z-10">
                    <motion.div
                      animate={{
                        rotate: [0, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-300 text-yellow-400 drop-shadow-[0_2px_6px_rgba(255,215,0,0.8)]" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                  </div>

                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 5, 0],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    >
                      <Heart className="w-6 h-6 md:w-8 md:h-8 fill-pink-400 text-pink-500 drop-shadow-[0_2px_6px_rgba(255,105,180,0.8)]" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                  </div>

                  <div className="absolute -bottom-3 -left-3 z-10">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    >
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400 fill-purple-300 drop-shadow-[0_2px_6px_rgba(147,112,219,0.8)]" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                  </div>

                  <div className="absolute -bottom-3 -right-3 z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: 0.6,
                      }}
                    >
                      <Heart className="w-6 h-6 md:w-8 md:h-8 fill-pink-300 text-pink-400 drop-shadow-[0_2px_6px_rgba(255,182,193,0.8)]" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                  </div>

                  {/* Lined paper effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, #FFB6C1 28px, #FFB6C1 29px)",
                    }}
                  />

                  {/* Left margin line */}
                  <div
                    className="absolute top-0 bottom-0 left-12 w-[2px] bg-pink-300 opacity-50 pointer-events-none"
                    style={{ imageRendering: "pixelated" }}
                  />

                  {/* Textarea */}
                  <textarea
                    value={content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className="relative z-0 w-full h-64 md:h-80 p-4 pl-16 bg-transparent resize-none focus:outline-none text-gray-800 leading-[29px]"
                    style={{
                      fontFamily: "'DungGeunMo', monospace",
                      fontSize: "14px",
                      imageRendering: "pixelated",
                    }}
                    placeholder={isLoading ? "불러오는 중..." : "여기에 메모를 작성하세요... ♡"}
                  />

                  {/* Character count / Error */}
                  <div
                    className={`absolute bottom-2 right-4 text-[9px] bg-white/70 px-2 py-1 border ${error ? "text-red-500 border-red-300" : "text-pink-400 border-pink-300"}`}
                    style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
                  >
                    {error ?? `${content.length} chars`}
                  </div>
                </div>

                {/* Bottom info bar */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-2 border-2 border-pink-200" style={{ imageRendering: "pixelated" }}>
                  <div className="flex items-center gap-4 text-[8px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                    <span className="text-purple-600">Ln 1, Col 1</span>
                    <span className="text-pink-500">UTF-8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <Heart className="w-3 h-3 fill-pink-400 text-pink-500" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                    <span className="text-[8px] text-pink-600" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                      메모장 • NOTEPAD
                    </span>
                    <motion.div
                      animate={{
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Star className="w-3 h-3 fill-yellow-300 text-yellow-400" style={{ imageRendering: "pixelated" }} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
