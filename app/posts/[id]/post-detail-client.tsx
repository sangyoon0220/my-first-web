"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/posts";
import { deletePost } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PostDetailClientProps = {
  post: Post;
};

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = !!user && user.id === post.user_id;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deletePost(post.id);

      if (success) {
        setDeleteDialogOpen(false);
        router.push("/posts");
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
    <main className="p-6">
      <article className="max-w-3xl mx-auto bg-white rounded-xl border border-lime-300 shadow p-8">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">{post.title}</h1>
        <div className="text-sm text-blue-900/70 mb-6">{formatDate(post.created_at)}</div>
        <div className="whitespace-pre-wrap text-blue-950/90 mb-6">{post.content}</div>

        <div className="flex flex-wrap gap-3 mb-6 border-t pt-6">
          <Link href="/posts" className="inline-block text-sm text-blue-700 hover:underline">
            목록으로 돌아가기
          </Link>
          {isOwner && (
            <>
              <Link
                href={`/posts/edit/${post.id}`}
                className="inline-block text-sm text-blue-700 hover:underline"
              >
                수정
              </Link>
              <button
                onClick={() => setDeleteDialogOpen(true)}
                className="inline-block text-sm text-red-600 hover:underline"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </article>

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
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
