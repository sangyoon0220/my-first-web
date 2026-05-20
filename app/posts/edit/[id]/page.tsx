import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
  import EditPostClient from "../../edit-post-client";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPostClient post={post} />;
}
