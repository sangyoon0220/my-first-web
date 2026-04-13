import EditPostClient from "../edit-post-client";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  return <EditPostClient id={id} />;
}
