-- Migration: add_posts_rls
-- Adds Row Level Security policies to the posts table

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- SELECT: 누구나 읽기 허용
CREATE POLICY posts_select_public
  ON public.posts
  FOR SELECT
  USING (true);

-- INSERT: 로그인 사용자만, 삽입된 user_id는 auth.uid()와 같아야 함
CREATE POLICY posts_insert_auth_user
  ON public.posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 작성자만 수정 가능, 변경 후의 user_id도 auth.uid()여야 함
CREATE POLICY posts_update_owner_only
  ON public.posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 작성자만 삭제 가능
CREATE POLICY posts_delete_owner_only
  ON public.posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- 주의: 동일한 정책명이 이미 존재하면 마이그레이션이 실패합니다.
-- 필요시 정책명 조정 또는 정책 존재 체크 로직을 사용하세요.
