import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPlannerMemo, savePlannerMemo } from "@/lib/plannerMemo";
import { DEBOUNCE_MS } from "./Memo.constants";

export function useMemoData() {
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      setContent(v);
      contentRef.current = v;
      scheduleSave();
    },
    [scheduleSave]
  );

  const handleBlur = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    persist();
  }, [persist]);

  return {
    content,
    isLoading,
    error,
    handleChange,
    handleBlur,
  };
}
