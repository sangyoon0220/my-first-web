"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { posts as seedPosts } from "@/lib/posts";
import {
  getLocalPostEdits,
  getLocalPosts,
  getMergedPosts,
  saveLocalPostEdits,
  saveLocalPosts,
} from "@/lib/local-posts";

type EditPostClientProps = {
  id: string;
};

export default function EditPostClient({ id }: EditPostClientProps) {
  const router = useRouter();
  const [warning, setWarning] = useState("");

  const post = useMemo(() => {
    const postId = Number(id);

    if (!Number.isFinite(postId)) {
      return undefined;
    }

    return getMergedPosts(seedPosts).find((item) => item.id === postId);
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!post) {
      setWarning("수정할 게시글을 찾을 수 없습니다.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    if (!title) {
      setWarning("제목을 입력해주세요.");
      return;
    }

    setWarning("");

    const postId = post.id;
    const nextDate = new Date().toISOString().slice(0, 10);

    const edits = getLocalPostEdits();
    edits[String(postId)] = {
      title,
      content,
      date: nextDate,
    };
    saveLocalPostEdits(edits);

    const localPosts = getLocalPosts();

    if (localPosts.some((item) => item.id === postId)) {
      const nextLocalPosts = localPosts.map((item) => {
        if (item.id !== postId) {
          return item;
        }

        return {
          ...item,
          title,
          content,
          date: nextDate,
        };
      });

      saveLocalPosts(nextLocalPosts);
    }

    router.push(`/posts/${postId}`);
    router.refresh();
  };

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto py-8">
        <div className="rounded-2xl border border-lime-300 bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-blue-950 mb-3">게시글을 찾을 수 없습니다</h1>
          <Link href="/posts" className="text-sm text-blue-700 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 md:p-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-2">게시글 수정</h1>
        <p className="text-blue-900/75 mb-6">관리자 권한으로 제목과 내용을 수정할 수 있습니다.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-blue-950 mb-2">
              제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={post.title}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-blue-950 mb-2">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={post.content}
              rows={8}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {warning && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {warning}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-950 px-5 py-2.5 text-lime-100 font-semibold hover:bg-blue-900 transition-colors"
            >
              수정 저장
            </button>
            <Link href="/posts" className="text-sm text-blue-700 hover:underline">
              취소
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
