import type { Post } from "@/lib/posts";

const LOCAL_POSTS_KEY = "my-first-web.local-posts";
const LOCAL_POST_EDITS_KEY = "my-first-web.local-post-edits";
const LOCAL_DELETED_POST_IDS_KEY = "my-first-web.local-deleted-post-ids";
const LOCAL_POSTS_CHANGED_EVENT = "my-first-web.local-posts-changed";
let localPostsVersion = 0;

function bumpLocalPostsVersion() {
  localPostsVersion += 1;
}

export function getLocalPostsVersion(): number {
  return localPostsVersion;
}

export type LocalPostEdit = Pick<Post, "title" | "content" | "date">;

export type LocalPostEditMap = Record<string, LocalPostEdit>;

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
  bumpLocalPostsVersion();
  window.dispatchEvent(new Event(LOCAL_POSTS_CHANGED_EVENT));
}

export function getLocalPostEdits(): LocalPostEditMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_POST_EDITS_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as LocalPostEditMap;

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

export function saveLocalPostEdits(edits: LocalPostEditMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_POST_EDITS_KEY, JSON.stringify(edits));
  bumpLocalPostsVersion();
  window.dispatchEvent(new Event(LOCAL_POSTS_CHANGED_EVENT));
}

export function removeLocalPostEdit(id: number) {
  const nextEdits = { ...getLocalPostEdits() };

  delete nextEdits[String(id)];

  saveLocalPostEdits(nextEdits);
}

export function getDeletedPostIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_DELETED_POST_IDS_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as number[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is number => Number.isFinite(value));
  } catch {
    return [];
  }
}

export function saveDeletedPostIds(ids: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_DELETED_POST_IDS_KEY, JSON.stringify(ids));
  bumpLocalPostsVersion();
  window.dispatchEvent(new Event(LOCAL_POSTS_CHANGED_EVENT));
}

export function addDeletedPostId(id: number) {
  const currentIds = getDeletedPostIds();

  if (currentIds.includes(id)) {
    return;
  }

  saveDeletedPostIds([...currentIds, id]);
}

function applyPostEdits(posts: Post[], edits: LocalPostEditMap): Post[] {
  return posts.map((post) => {
    const edited = edits[String(post.id)];

    if (!edited) {
      return post;
    }

    return {
      ...post,
      ...edited,
    };
  });
}

export function getMergedPosts(seedPosts: Post[]): Post[] {
  const localPosts = getLocalPosts();
  const edits = getLocalPostEdits();
  const deletedIdSet = new Set(getDeletedPostIds());
  const localIds = new Set(localPosts.map((post) => post.id));

  const mergedLocalPosts = applyPostEdits(localPosts, edits).filter((post) => !deletedIdSet.has(post.id));
  const mergedSeedPosts = applyPostEdits(seedPosts, edits).filter(
    (post) => !localIds.has(post.id) && !deletedIdSet.has(post.id),
  );

  return [...mergedLocalPosts, ...mergedSeedPosts];
}

export function subscribeLocalPosts(listener: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => {
    bumpLocalPostsVersion();
    listener();
  };

  window.addEventListener(LOCAL_POSTS_CHANGED_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  queueMicrotask(handleChange);

  return () => {
    window.removeEventListener(LOCAL_POSTS_CHANGED_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function createLocalPostId(): number {
  return Date.now();
}
