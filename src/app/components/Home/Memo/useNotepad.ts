import { useState, useEffect, useCallback, useRef } from "react";
import type { Note } from "./Memo.types";
import {
  fetchNotes,
  createNote as apiCreateNote,
  updateNote as apiUpdateNote,
  deleteNote as apiDeleteNote,
  type NoteRecord,
} from "@/lib/notes";

const NOTE_COLORS = [
  "#FFE4E1", // Misty Rose
  "#E0BBE4", // Light Purple
  "#FFDFD3", // Peach
  "#D5F4E6", // Light Green
  "#FFF9C4", // Light Yellow
  "#E3F2FD", // Light Blue
  "#FCE4EC", // Light Pink
  "#F3E5F5", // Light Lavender
] as const;

const DEBOUNCE_MS = 1000;

function getRandomColor(): string {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
}

function recordToNote(record: NoteRecord): Note {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    color: record.color,
    isExpanded: record.is_expanded,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export function useNotepad() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 디바운스 타이머 저장용
  const updateTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // 노트 불러오기
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const records = await fetchNotes();
        if (cancelled) return;
        setNotes(records.map(recordToNote));
        setError(null);
      } catch (err) {
        if (!cancelled) {
          console.error("노트 불러오기 실패:", err);
          setError("노트 불러오기 실패");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      // 모든 타이머 정리
      updateTimersRef.current.forEach((timer) => clearTimeout(timer));
      updateTimersRef.current.clear();
    };
  }, []);

  const createNote = useCallback(async () => {
    try {
      const newRecord = await apiCreateNote({
        title: "새 노트",
        content: "",
        color: getRandomColor(),
        is_expanded: true,
      });
      const newNote = recordToNote(newRecord);
      setNotes((prev) => [newNote, ...prev]);
      setError(null);
      return newNote.id;
    } catch (err) {
      console.error("노트 생성 실패:", err);
      setError("노트 생성 실패");
      return null;
    }
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Pick<Note, "title" | "content">>) => {
    // 즉시 로컬 상태 업데이트
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );

    // 기존 타이머 취소
    const existingTimer = updateTimersRef.current.get(id);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // 디바운스된 API 호출
    const timer = setTimeout(async () => {
      try {
        await apiUpdateNote(id, updates);
        updateTimersRef.current.delete(id);
        setError(null);
      } catch (err) {
        console.error("노트 수정 실패:", err);
        setError("노트 수정 실패");
      }
    }, DEBOUNCE_MS);

    updateTimersRef.current.set(id, timer);
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    // 타이머 취소
    const existingTimer = updateTimersRef.current.get(id);
    if (existingTimer) {
      clearTimeout(existingTimer);
      updateTimersRef.current.delete(id);
    }

    // 즉시 로컬 상태 업데이트
    setNotes((prev) => prev.filter((note) => note.id !== id));

    try {
      await apiDeleteNote(id);
      setError(null);
    } catch (err) {
      console.error("노트 삭제 실패:", err);
      setError("노트 삭제 실패");
      // 실패시 다시 불러오기
      const records = await fetchNotes();
      setNotes(records.map(recordToNote));
    }
  }, []);

  const toggleNoteExpanded = useCallback(async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const newExpanded = !note.isExpanded;

    // 즉시 로컬 상태 업데이트
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isExpanded: newExpanded } : n))
    );

    try {
      await apiUpdateNote(id, { is_expanded: newExpanded });
      setError(null);
    } catch (err) {
      console.error("노트 상태 변경 실패:", err);
    }
  }, [notes]);

  const expandAllNotes = useCallback(async () => {
    // 즉시 로컬 상태 업데이트
    setNotes((prev) => prev.map((note) => ({ ...note, isExpanded: true })));

    // 각 노트를 개별 업데이트 (bulk update가 복잡하므로)
    try {
      await Promise.all(
        notes.map((note) => apiUpdateNote(note.id, { is_expanded: true }))
      );
      setError(null);
    } catch (err) {
      console.error("노트 전체 펼치기 실패:", err);
    }
  }, [notes]);

  const collapseAllNotes = useCallback(async () => {
    // 즉시 로컬 상태 업데이트
    setNotes((prev) => prev.map((note) => ({ ...note, isExpanded: false })));

    // 각 노트를 개별 업데이트
    try {
      await Promise.all(
        notes.map((note) => apiUpdateNote(note.id, { is_expanded: false }))
      );
      setError(null);
    } catch (err) {
      console.error("노트 전체 접기 실패:", err);
    }
  }, [notes]);

  const changeNoteColor = useCallback(async (id: string) => {
    const newColor = getRandomColor();

    // 즉시 로컬 상태 업데이트
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, color: newColor } : note))
    );

    try {
      await apiUpdateNote(id, { color: newColor });
      setError(null);
    } catch (err) {
      console.error("노트 색상 변경 실패:", err);
    }
  }, []);

  return {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote,
    toggleNoteExpanded,
    expandAllNotes,
    collapseAllNotes,
    changeNoteColor,
  };
}
