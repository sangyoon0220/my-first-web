"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import { deletePost } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "./search-bar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PostsClientProps = {
  initialPosts: Post[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [keyword, setKeyword] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return posts;
    }

    return posts.filter((post) => post.title.toLowerCase().includes(normalizedKeyword));
  }, [keyword, posts]);

  const handleDeleteClick = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPostId(postId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPostId) return;

    setIsDeleting(true);
    try {
      const success = await deletePost(selectedPostId);

      if (success) {
        setPosts(posts.filter((post) => post.id !== selectedPostId));
        setDeleteDialogOpen(false);
        setSelectedPostId(null);
      } else {
        alert("글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-black text-blue-950">자유게시판</h1>
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
                <p className="text-sm text-blue-900/70">{formatDate(post.created_at)}</p>
                <p className="mt-3 text-blue-900/85 line-clamp-3">{post.content}</p>
              </Link>
              {user && user.id === post.user_id && (
                <button
                  onClick={(e) => handleDeleteClick(post.id, e)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                  title="삭제"
                  disabled={isDeleting}
                >
                  ✕
                </button>
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>글을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
