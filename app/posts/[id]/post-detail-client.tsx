"use client";

import Link from "next/link";
import { useMemo } from "react";
import { posts as seedPosts } from "@/lib/posts";
import { getLocalPosts } from "@/lib/local-posts";

type PostDetailClientProps = {
  id: string;
};

export default function PostDetailClient({ id }: PostDetailClientProps) {
  const post = useMemo(() => {
    const postId = Number(id);

    if (!Number.isFinite(postId)) {
      return undefined;
    }

    const localPosts = getLocalPosts();
    const mergedPosts = [...localPosts, ...seedPosts];

    return mergedPosts.find((item) => item.id === postId);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-xl border border-lime-300 shadow p-8">
          <h1 className="text-2xl font-semibold text-blue-950 mb-4">게시글을 찾을 수 없습니다</h1>
          <p className="text-sm text-blue-900/75 mb-6">요청하신 게시글이 존재하지 않습니다.</p>
          <Link href="/posts" className="text-sm text-blue-700 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <article className="max-w-3xl mx-auto bg-white rounded-xl border border-lime-300 shadow p-8">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">{post.title}</h1>
        <div className="text-sm text-blue-900/70 mb-6">
          <span className="mr-4">작성자: {post.author}</span>
          <span>작성일: {post.date}</span>
        </div>
        <div className="whitespace-pre-wrap text-blue-950/90 mb-6">{post.content}</div>
        <Link href="/posts" className="inline-block text-sm text-blue-700 hover:underline">
          목록으로 돌아가기
        </Link>
      </article>
    </main>
  );
}
