-- posts 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 게시글 조회 가능
CREATE POLICY "posts_select_policy"
ON posts FOR SELECT
USING (true);

-- 로그인한 사용자만 게시글 작성 가능
CREATE POLICY "posts_insert_policy"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 작성자만 게시글 수정 가능
CREATE POLICY "posts_update_policy"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

-- 작성자만 게시글 삭제 가능
CREATE POLICY "posts_delete_policy"
ON posts FOR DELETE
USING (auth.uid() = user_id);