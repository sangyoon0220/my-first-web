import type { Post } from "@/lib/posts";

const LOCAL_POSTS_KEY = "my-first-web.local-posts";

export function getLocalPosts(): Post[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_POSTS_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Post[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalPosts(posts: Post[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(posts));
}

export function createLocalPostId(): number {
  return Date.now();
}
