import { getPosts } from "@/lib/posts";
import PostsClient from "./posts-client";

export default async function PostsPage() {
  const posts = await getPosts();

  return <PostsClient initialPosts={posts} />;
}
