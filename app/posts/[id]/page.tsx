import Link from "next/link";
import { posts } from "../../../lib/posts";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  // 요청대로 params를 await하여 id를 추출
  const { id } = await params;

  const postId = parseInt(id, 10);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-md shadow p-8">
          <h1 className="text-2xl font-semibold mb-4">게시글을 찾을 수 없습니다</h1>
          <p className="text-sm text-gray-600 mb-6">요청하신 게시글이 존재하지 않습니다.</p>
          <Link href="/posts" className="text-sm text-blue-600 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <article className="max-w-3xl mx-auto bg-white rounded-md shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          <span className="mr-4">작성자: {post.author}</span>
          <span>작성일: {post.date}</span>
        </div>
        <div className="prose prose-sm prose-stone mb-6">{post.content}</div>
        <Link href="/posts" className="inline-block text-sm text-blue-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </article>
    </main>
  );
}
