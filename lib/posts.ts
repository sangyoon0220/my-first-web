import { createClient } from "./supabase/client";

/**
 * Ch8 데이터 모델: posts 테이블
 * - id: UUID (기본 키)
 * - user_id: UUID (profiles.id 참조)
 * - title: TEXT (제목)
 * - content: TEXT (본문)
 * - created_at: TIMESTAMPTZ (생성 시간)
 */
export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

/**
 * 모든 글 조회
 * @returns 글 목록
 */
export async function getPosts(): Promise<Post[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getPosts error:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("getPosts exception:", err);
    return [];
  }
}

/**
 * 특정 글 조회
 * @param id 글 ID
 * @returns 글 데이터 또는 null
 */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("getPostById error:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("getPostById exception:", err);
    return null;
  }
}

/**
 * 글 생성
 * @param title 제목
 * @param content 본문
 * @param user_id 작성자 ID
 * @returns 생성된 글 데이터
 */
export async function createPost(
  title: string,
  content: string,
  user_id: string
): Promise<Post | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, user_id }])
      .select()
      .single();

    if (error) {
      console.error("createPost error:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("createPost exception:", err);
    return null;
  }
}

/**
 * 글 수정
 * @param id 글 ID
 * @param title 수정된 제목
 * @param content 수정된 본문
 * @returns 수정된 글 데이터
 */
export async function updatePost(
  id: string,
  title: string,
  content: string
): Promise<Post | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("updatePost error:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("updatePost exception:", err);
    return null;
  }
}

/**
 * 글 삭제
 * @param id 글 ID
 */
export async function deletePost(id: string): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("deletePost error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("deletePost exception:", err);
    return false;
  }
}
