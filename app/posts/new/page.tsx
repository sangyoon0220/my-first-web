"use client";

import type { Post } from "@/lib/posts";
import { createLocalPostId, getLocalPosts, saveLocalPosts } from "@/lib/local-posts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const checkAdminSession = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });

      if (!response.ok) {
        return false;
      }

      const data = (await response.json()) as { isAdmin?: boolean };
      return Boolean(data.isAdmin);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAdmin = await checkAdminSession();

    if (!isAdmin) {
      router.push("/admin/login?redirect=/posts/new");
      return;
    }

    if (!title.trim()) {
      setWarning("제목을 입력해주세요.");
      setSubmitted(false);
      return;
    }

    setWarning("");
    setSubmitted(true);

    const localPosts = getLocalPosts();
    const nextPost: Post = {
      id: createLocalPostId(),
      title: title.trim(),
      content: content.trim(),
      author: "이상윤",
      date: new Date().toISOString().slice(0, 10),
    };

    saveLocalPosts([nextPost, ...localPosts]);

    setTitle("");
    setContent("");

    router.push("/posts");
    router.refresh();
  };

  return (
    <section className="max-w-3xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 md:p-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-2">새 글 쓰기</h1>
        <p className="text-blue-900/75 mb-6">제어 컴포넌트로 게시글을 작성해보세요.</p>

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
            />
          </div>

          {warning && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {warning}
            </p>
          )}

          {submitted && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              게시글 작성이 완료되었습니다.
            </p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-blue-950 px-5 py-2.5 text-lime-100 font-semibold hover:bg-blue-900 transition-colors"
          >
            작성하기
          </button>
        </form>
      </div>
    </section>
  );
}
