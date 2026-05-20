import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import PostDetailClient from "./post-detail-client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostDetailClient post={post} />;
}
