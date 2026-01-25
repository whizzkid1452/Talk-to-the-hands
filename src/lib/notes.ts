import { supabase } from './supabase'

export interface NoteRecord {
  id: string
  title: string
  content: string
  color: string
  is_expanded: boolean
  created_at: string
  updated_at: string
}

const TABLE = 'notes'

/**
 * 모든 노트 조회 (최신순)
 */
export async function fetchNotes(): Promise<NoteRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('노트 조회 실패:', error)
    throw error
  }

  return data ?? []
}

/**
 * 노트 생성
 */
export async function createNote(note: {
  title: string
  content: string
  color: string
  is_expanded: boolean
}): Promise<NoteRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([note])
    .select()
    .single()

  if (error) {
    console.error('노트 생성 실패:', error)
    throw error
  }

  return data
}

/**
 * 노트 수정
 */
export async function updateNote(
  id: string,
  updates: Partial<Pick<NoteRecord, 'title' | 'content' | 'color' | 'is_expanded'>>
): Promise<NoteRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('노트 수정 실패:', error)
    throw error
  }

  return data
}

/**
 * 노트 삭제
 */
export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) {
    console.error('노트 삭제 실패:', error)
    throw error
  }
}

/**
 * 모든 노트 펼침/접힘 상태 변경
 */
export async function updateAllNotesExpanded(isExpanded: boolean): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ is_expanded: isExpanded, updated_at: new Date().toISOString() })
    .neq('id', '') // 모든 레코드 업데이트

  if (error) {
    console.error('노트 전체 상태 변경 실패:', error)
    throw error
  }
}
