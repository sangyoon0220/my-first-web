"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import { getLocalPosts, saveLocalPosts } from "@/lib/local-posts";
import SearchBar from "./search-bar";

type PostsClientProps = {
  initialPosts: Post[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [postList, setPostList] = useState<Post[]>(() => {
    const localPosts = getLocalPosts();

    if (localPosts.length === 0) {
      return initialPosts;
    }

    const existingIds = new Set(initialPosts.map((post) => post.id));
    const mergedLocalPosts = localPosts.filter((post) => !existingIds.has(post.id));

    return [...mergedLocalPosts, ...initialPosts];
  });
  const [keyword, setKeyword] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return postList;
    }

    return postList.filter((post) => post.title.toLowerCase().includes(normalizedKeyword));
  }, [keyword, postList]);

  const handleDelete = (id: number) => {
    const shouldDelete = window.confirm("정말 이 게시글을 삭제할까요?");

    if (!shouldDelete) {
      return;
    }

    setPostList((currentPosts) => {
      const nextPosts = currentPosts.filter((post) => post.id !== id);
      const nextLocalPosts = getLocalPosts().filter((post) => post.id !== id);

      saveLocalPosts(nextLocalPosts);

      return nextPosts;
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950">블로그</h1>
        <Link
          href="/posts/new"
          className="px-4 py-2 rounded-lg bg-lime-400 text-blue-950 font-semibold hover:bg-lime-300 transition-colors"
        >
          새 글 쓰기
        </Link>
      </div>

      <div className="mb-6 rounded-xl border border-lime-300 bg-lime-50 p-4">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-lime-300 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <Link href={`/posts/${post.id}`} className="block flex-1">
                <h2 className="font-bold text-lg text-blue-950 mb-1 line-clamp-1">{post.title}</h2>
                <p className="text-sm text-blue-900/70">
                  {post.author} · {post.date}
                </p>
                <p className="mt-3 text-blue-900/85 line-clamp-3">{post.content}</p>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                className="shrink-0 px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                삭제
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5 text-blue-900">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
