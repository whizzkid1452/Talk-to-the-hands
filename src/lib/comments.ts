import { supabase } from './supabase'

/**
 * 댓글 타입 정의
 */
export interface Comment {
  id: string
  post_id: string
  author_name: string
  comment_text: string
  created_at: string
  updated_at: string
}

/**
 * 댓글 작성 요청 타입
 */
export interface CreateCommentRequest {
  post_id: string
  author_name: string
  comment_text: string
}

/**
 * 특정 포스트의 모든 댓글 가져오기
 */
export async function fetchCommentsByPostId(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('댓글 불러오기 실패:', error)
    throw error
  }

  return data || []
}

/**
 * 새 댓글 작성
 */
export async function createComment(
  commentData: CreateCommentRequest
): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert([commentData])
    .select()
    .single()

  if (error) {
    console.error('댓글 작성 실패:', error)
    throw error
  }

  return data
}

/**
 * 특정 포스트의 댓글 개수 가져오기
 */
export async function getCommentCount(postId: string): Promise<number> {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId)

  if (error) {
    console.error('댓글 개수 조회 실패:', error)
    return 0
  }

  return count || 0
}

/**
 * 댓글 실시간 구독
 */
export function subscribeToComments(
  postId: string,
  onNewComment: (comment: Comment) => void
) {
  const channel = supabase
    .channel(`comments:${postId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `post_id=eq.${postId}`,
      },
      (payload) => {
        onNewComment(payload.new as Comment)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
