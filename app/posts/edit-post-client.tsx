"use client";

import { updatePost } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditPostClientProps = {
  post: Post;
};

export default function EditPostClient({ post }: EditPostClientProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto py-8">
        <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 md:p-8 shadow-md text-center">
          <p className="text-blue-900">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (!user || user.id !== post.user_id) {
    return (
      <section className="max-w-3xl mx-auto py-8">
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-6 md:p-8 shadow-md">
          <h1 className="text-2xl font-bold text-red-900 mb-2">접근 불가</h1>
          <p className="text-red-800 mb-4">작성자 본인만 수정할 수 있습니다.</p>
        </div>
      </section>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPost = await updatePost(post.id, title.trim(), content.trim());

      if (updatedPost) {
        router.push(`/posts/${post.id}`);
      } else {
        setError("글 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("Update post error:", err);
      setError("글 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 md:p-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-2">글 수정</h1>
        <p className="text-blue-900/75 mb-6">게시글을 수정하세요.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-blue-950 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="제목을 입력하세요"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-blue-950 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={8}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="내용을 입력하세요"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-950 px-5 py-2.5 text-lime-100 font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-blue-950 px-5 py-2.5 text-blue-950 font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
