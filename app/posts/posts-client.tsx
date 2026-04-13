"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Post } from "@/lib/posts";
import {
  addDeletedPostId,
  getLocalPostsVersion,
  getLocalPosts,
  getMergedPosts,
  removeLocalPostEdit,
  saveLocalPosts,
  subscribeLocalPosts,
} from "@/lib/local-posts";
import SearchBar from "./search-bar";

type PostsClientProps = {
  initialPosts: Post[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [keyword, setKeyword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    let mounted = true;

    async function syncAdminSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { isAdmin?: boolean };

        if (mounted) {
          setIsAdmin(Boolean(data.isAdmin));
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
        }
      }
    }

    void syncAdminSession();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return mergedPosts;
    }

    return mergedPosts.filter((post) => post.title.toLowerCase().includes(normalizedKeyword));
  }, [keyword, mergedPosts]);

  const handleDelete = (id: number) => {
    if (!isAdmin) {
      window.alert("관리자만 삭제할 수 있습니다.");
      return;
    }

    const shouldDelete = window.confirm("정말 이 게시글을 삭제할까요?");

    if (!shouldDelete) {
      return;
    }

    const nextLocalPosts = getLocalPosts().filter((post) => post.id !== id);

    saveLocalPosts(nextLocalPosts);
    removeLocalPostEdit(id);
    addDeletedPostId(id);
  };

  const handleAdminLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAdmin(false);
      window.location.href = "/posts";
    } catch {
      window.alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950">블로그</h1>
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <>
              <Link
                href="/posts/new"
                className="px-4 py-2 rounded-lg bg-lime-400 text-blue-950 font-semibold hover:bg-lime-300 transition-colors"
              >
                새 글 쓰기
              </Link>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-4 py-2 rounded-lg border border-blue-300 text-blue-900 hover:bg-blue-50 transition-colors"
              >
                관리자 로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/admin/login?redirect=/posts"
              className="px-4 py-2 rounded-lg border border-blue-300 text-blue-900 font-semibold hover:bg-blue-50 transition-colors"
            >
              관리자 로그인
            </Link>
          )}
        </div>
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
                className="shrink-0 px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!isAdmin}
              >
                삭제
              </button>
              {isAdmin && (
                <Link
                  href={`/posts/edit/${post.id}`}
                  className="shrink-0 px-3 py-1.5 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  수정
                </Link>
              )}
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
