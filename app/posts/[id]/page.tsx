import PostDetailClient from "./post-detail-client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  // 요청대로 params를 await하여 id를 추출
  const { id } = await params;

  return <PostDetailClient id={id} />;
}
