"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Post } from "@/lib/posts";
import {
  getLocalPostsVersion,
  getMergedPosts,
  subscribeLocalPosts,
} from "@/lib/local-posts";
import SearchBar from "./search-bar";

type PostsClientProps = {
  initialPosts: Post[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [keyword, setKeyword] = useState("");

  const postsVersion = useSyncExternalStore(
    subscribeLocalPosts,
    getLocalPostsVersion,
    () => 0,
  );

  const mergedPosts = useMemo(() => {
    if (postsVersion === 0) {
      return initialPosts;
    }

    return getMergedPosts(initialPosts);
  }, [initialPosts, postsVersion]);

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return mergedPosts;
    }

    return mergedPosts.filter((post) => post.title.toLowerCase().includes(normalizedKeyword));
  }, [keyword, mergedPosts]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950">블로그</h1>
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
