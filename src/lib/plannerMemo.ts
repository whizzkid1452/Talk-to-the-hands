import { supabase } from './supabase'

export interface PlannerMemo {
  id: string
  content: string
  updated_at: string
}

const TABLE = 'planner_memos'

/**
 * 플래너 메모 1건 조회 (가장 최근)
 */
export async function fetchPlannerMemo(): Promise<PlannerMemo | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, content, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('플래너 메모 조회 실패:', error)
    throw error
  }

  return data
}

/**
 * 플래너 메모 저장 (없으면 insert, 있으면 update)
 */
export async function savePlannerMemo(
  content: string,
  existingId: string | null
): Promise<PlannerMemo> {
  if (existingId) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', existingId)
      .select()
      .single()

    if (error) {
      console.error('플래너 메모 수정 실패:', error)
      throw error
    }
    return data
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ content }])
    .select()
    .single()

  if (error) {
    console.error('플래너 메모 저장 실패:', error)
    throw error
  }
  return data
}
