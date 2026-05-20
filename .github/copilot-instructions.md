# Copilot Instructions — my-first-web

## Project Overview

- This project uses Next.js 16.2.1 with the App Router only.
- Use React 19.2.4, TypeScript, Tailwind CSS 4, and shadcn/ui.
- Treat `AGENT.md` and `AGENTS.md` as the shared source of truth for workflow rules.

## General Rules

- Prefer Server Components by default.
- Add `"use client"` only when interactivity or browser APIs are required.
- Use `next/navigation` instead of `next/router`.
- Keep route files inside `app/`.
- Write simple, easy-to-verify components.

## Styling Rules

- Use Tailwind CSS utilities for layout and spacing.
- Use the CSS variables defined in `app/globals.css` for color and radius.
- Do not hardcode Tailwind palette colors when a design token exists.
- Keep main content width around `max-w-4xl mx-auto` unless the page needs a wider layout.

## Design Tokens

- Background: `bg-background`
- Foreground text: `text-foreground`
- Primary actions: `bg-primary` and `text-primary-foreground`
- Borders and inputs: `border-border` and `border-input`
- Cards: `bg-card`, `text-card-foreground`, `rounded-lg`, `shadow-sm`
- Spacing: use `space-y-6` for page sections and `p-6` for card content when possible

## Component Rules

- Prefer shadcn/ui components from `components/ui/`.
- Use `Button`, `Card`, `Input`, and `Dialog` before building custom controls.
- Put reusable custom components in the `components/` root.
- Verify the actual import path before using a component.

## Known AI Mistakes

- Do not use `pages/` router files.
- Do not use `next/router`.
- Do not invent shadcn/ui component paths that do not exist.
- Do not use raw color classes like `bg-blue-500` when a token-based class is available.
- Do not add client components everywhere; keep server rendering as the default.
- The current admin-auth flow uses `/admin/login` and `/api/admin/session`; the blog design docs also plan `/login`, `/signup`, and `/mypage` routes.
## Chapter 9: Supabase Authentication Rules (Ch9)

- Use **email/password authentication only** — no social login (Google, Kakao, Naver).
- Use `signInWithPassword()` for login — do NOT use the deprecated `auth.signIn()`.
- Use `signUp()` for user registration with metadata: `options: { data: { name } }`.
- Use `signOut()` for logout.
- Use `@supabase/ssr` for session management with Next.js App Router.
- Use `lib/supabase/client.ts` for browser-side Supabase client creation.
- Never expose `service_role` keys or server-only keys to the client.
- Middleware (`middleware.ts`) protects public routes — use it for `/posts/new` redirect to `/login`.
- Authorization (who can edit/delete) is handled in Ch11 RLS, not in Ch9 authentication.

## Chapter 10: Posts CRUD Rules (Ch10)

### Data Schema (Ch8 Basis)

- Posts table schema: `id`, `user_id`, `title`, `content`, `created_at`
- User reference: `posts.user_id` → `profiles.id`
- Never add columns like `summary`, `status`, `updated_at` without explicit request (schema stability)

### Read Operations (R) — No Auth Required

- `getPosts()`: Fetch all posts with no login check — use as server component
- `getPostById(id)`: Fetch single post with no login check — use as server component
- Pages: `app/posts/page.tsx` and `app/posts/[id]/page.tsx` are Server Components (default)
- No `"use client"` directive for read-only pages

### Create Operations (C) — Login Required

- `createPost(title, content, user_id)`: Server action or API route `POST /api/posts`
- Page: `app/posts/new/page.tsx` (protected by middleware)
- Middleware matcher: `/posts/new` and `/posts/new/:path*`
- Extract `user_id` from `useAuth()` or session context before insert
- Redirect to `/posts/[id]` on success

### Update Operations (U) — Login Required + UX Only (Auth), RLS Later (Ch11)

- `updatePost(id, title, content)`: Server action or API route `PATCH /api/posts/[id]`
- Page: `app/posts/edit/[id]/page.tsx` (protected by middleware)
- Middleware matcher: `/posts/edit/:path*`
- UI: Show "Edit" button only if `user !== null` (UX check, not security)
- Do NOT validate `user_id` match in Ch10 code — Ch11 RLS will enforce it
- Redirect to `/posts/[id]` on success

### Delete Operations (D) — Login Required + UX Only (Auth), RLS Later (Ch11)

- `deletePost(id)`: Server action or API route `DELETE /api/posts/[id]`
- UI: Show "Delete" button only if `user !== null` and render Dialog for confirmation
- Do NOT validate `user_id` match in Ch10 code — Ch11 RLS will enforce it
- Redirect to `/posts` on success

### API Routes vs Server Actions

- Prefer Server Actions (`"use server"`) for simplicity when form submission is the trigger
- Use API routes (`/api/posts`, `/api/posts/[id]`) if client-side fetch is needed (e.g., AJAX)
- Both are acceptable; choose based on component design

### TypeScript & Type Safety

- Define `interface Post { id: string; user_id: string; title: string; content: string; created_at: string; }`
- Export from `lib/posts.ts` or a `types.ts` file
- All Supabase query results should be typed with `as Post` if needed

### Common Pitfalls

- Do NOT use `getUser()` in server components — use `getSession()` or server-only auth APIs
- Do NOT expose `service_role` key in client-side code
- Do NOT skip middleware protection for `/posts/new` and `/posts/edit/[id]`
- Do NOT hard-code user check in CRUD operations — let RLS enforce permissions in Ch11
- Do NOT query `auth.users` directly from client — use Supabase Auth SDK or session context