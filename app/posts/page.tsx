import { posts } from "@/lib/posts";
import PostsClient from "./posts-client";

export default async function PostsPage() {
  return <PostsClient initialPosts={posts} />;
}
