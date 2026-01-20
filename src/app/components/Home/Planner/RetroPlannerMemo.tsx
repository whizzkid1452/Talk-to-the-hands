import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { containerStyles, textStyles, getWindowBorderStyle, getFontStyle } from "./RetroPlanner.styles";
import { fetchPlannerMemo, savePlannerMemo } from "@/lib/plannerMemo";

const DEBOUNCE_MS = 600;

export function RetroPlannerMemo() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto mb-4"
    >
      <div
        className="bg-[#c0c0c0] border-2 border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] relative"
        style={getWindowBorderStyle()}
      >
        <div className={containerStyles.titleBar}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
            <span className={textStyles.title} style={getFontStyle("'Press Start 2P'")}>
              MEMO.TXT
            </span>
          </div>
        </div>

        <div className="bg-[#FFE4E1] border-t-2 border-[#FFB6C1] p-2">
          <textarea
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            placeholder={isLoading ? "불러오는 중..." : "메모를 입력하세요"}
            className="w-full min-h-[88px] max-h-[180px] resize-y bg-white border-2 border-[#FFB6C1] p-3 text-[#1a0033] text-xs md:text-sm placeholder:text-pink-300 focus:outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/30"
            style={getFontStyle("'DungGeunMo'")}
            rows={4}
          />
          <div className="flex justify-between items-center mt-1 px-1">
            <span className={`text-[9px] ${error ? "text-red-600" : "text-pink-600"}`} style={getFontStyle("'DungGeunMo'")}>
              {error ?? "Supabase에 자동 저장됩니다"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
