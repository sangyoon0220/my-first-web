# Project Rules for my-first-web

## Project Type

- **Framework**: Next.js 16.2.1 with App Router only (no pages/ directory)
- **Language**: TypeScript 5+
- **Runtime**: Node.js (Vercel deployment)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (email/OTP)

## Technology Stack

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.1 | Web framework (App Router) |
| react | 19.2.4 | UI library |
| typescript | ^5 | Type safety |
| tailwindcss | 4 | Styling |
| shadcn/ui | 4.5.0 | Component library |
| @supabase/ssr | 0.5.2 | Server-side session (cookies) |
| @supabase/supabase-js | 2.105.4 | Supabase client library |

## Project Structure

```
my-first-web/
├── .github/
│   └── copilot-instructions.md      # Copilot rules
├── .agent/
│   └── rules/
│       └── project.md              # This file
├── app/                             # Next.js App Router
│   ├── layout.tsx                  # Root layout + AuthProvider
│   ├── page.tsx                    # Home page
│   ├── posts/
│   │   ├── page.tsx                # Posts list (server component)
│   │   ├── [id]/
│   │   │   └── page.tsx            # Post detail (server component)
│   │   ├── new/
│   │   │   └── page.tsx            # Create post (protected)
│   │   └── edit/
│   │       └── [id]/
│   │           └── page.tsx        # Edit post (protected)
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── signup/
│   │   └── page.tsx                # Signup page (email OTP)
│   └── api/                         # API routes
│       ├── posts/
│       │   ├── route.ts            # GET, POST /api/posts
│       │   └── [id]/
│       │       └── route.ts        # PATCH, DELETE /api/posts/[id]
│       └── ...
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── dialog.tsx
│   └── ...                          # Custom reusable components
├── contexts/
│   └── AuthContext.tsx              # Global auth state + useAuth hook
├── lib/
│   ├── auth.ts                      # Auth functions (login, signup, logout)
│   ├── posts.ts                     # CRUD functions for posts
│   ├── supabase/
│   │   └── client.ts                # Supabase client singleton
│   └── utils.ts                     # Helper functions
├── supabase/
│   ├── migrations/
│   │   └── 20260511043614_create_tables.sql  # Database schema (source of truth)
│   └── config.toml                  # Supabase local config
├── middleware.ts                    # Next.js middleware (protected routes)
├── context.md                       # Project state & progress
├── todo.md                          # Checklist
├── ARCHITECTURE.md                  # System design & data model
├── AGENTS.md                        # Shared rules for all AI tools
├── CLAUDE.md                        # Claude-specific rules
└── package.json                     # Dependencies
```

## General Rules

### Routing & Navigation

- Use Next.js App Router only (no pages/ directory)
- All routes live in `app/` directory
- Use `next/navigation` (useRouter, usePathname) — never `next/router`
- Dynamic routes use `[id]` bracket notation

### Components

- **Default**: Server Components (no `"use client"`)
- **Use `"use client"` only when**: Interactivity, hooks (useState, useEffect), browser APIs
- Prefer shadcn/ui components from `components/ui/`
- Reusable custom components go in `components/` root (not in routes)

### Styling

- Use Tailwind CSS utility classes for layout & spacing
- Define colors as CSS variables in `app/globals.css`
- Use design tokens: `bg-background`, `text-foreground`, `bg-primary`, etc.
- Keep main content width around `max-w-4xl mx-auto`
- No hardcoded color classes like `bg-blue-500`

### TypeScript & Type Safety

- Always use explicit types (avoid `any`)
- Define interfaces in separate `types.ts` or co-located with usage
- Export types from `lib/` for reusable types
- Example: `interface Post { id: string; user_id: string; title: string; content: string; created_at: string; }`

## Ch8: Supabase Connection

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Client Setup

- Browser client: `lib/supabase/client.ts` → `createBrowserClient()` from `@supabase/ssr`
- Never expose `service_role` key to client
- Use `NEXT_PUBLIC_` prefix only for public keys

### Server-Side Session

- Use `@supabase/ssr` for App Router
- Create server client with `createServerClient()` in middleware or server components
- Session stored in cookies (managed automatically by @supabase/ssr)

## Ch9: Authentication

### Flow

1. **Signup**: Email OTP
   - `sendEmailCode(email)` → Supabase sends OTP
   - `verifyEmailCode(email, code)` → Auto-login on verify
2. **Login**: Email + Password
   - `signInWithEmail(email, password)` → Supabase auth
3. **Logout**: `signOut()`
   - Clears session cookie

### Rules

- **Email/OTP only** — no social login (Google, Kakao, etc.)
- Use `signInWithPassword()` or `signInWithOtp()` — never `auth.signIn()`
- Global state: `contexts/AuthContext.tsx` with `useAuth()` hook
- Middleware protects routes: Check `getSession()` before rendering
- Never use `getUser()` in server components (throws "Auth session missing" error)

### Protected Routes

- Middleware location: `middleware.ts` (project root, not in app/)
- Matcher: `['/posts/new', '/posts/new/:path*', '/posts/edit/:path*']`
- Action: If no session → redirect to `/login`

## Ch10: Posts CRUD

### Data Schema (Source of Truth)

**Migration**: `supabase/migrations/20260511043614_create_tables.sql`

**Tables**:
- `profiles` (extends `auth.users`)
  - id, username, avatar_url, role, created_at
- `posts`
  - id, user_id (→ profiles.id), title, content, created_at

**Important**: Never add columns like `updated_at`, `summary`, `status` without explicit request.

### CRUD Operations

#### Read (R) — Public, No Auth Required

```typescript
// lib/posts.ts
export async function getPosts(): Promise<Post[]>
export async function getPostById(id: string): Promise<Post | null>
```

- Pages: `app/posts/page.tsx`, `app/posts/[id]/page.tsx` (server components)
- No login check needed
- No middleware protection

#### Create (C) — Login Required

```typescript
// lib/posts.ts
export async function createPost(
  title: string,
  content: string,
  user_id: string
): Promise<Post>
```

- Page: `app/posts/new/page.tsx` (protected by middleware)
- Middleware redirects non-logged-in users to `/login`
- Extract `user_id` from `useAuth()` hook before calling `createPost`
- Return type: POST `/api/posts` or server action

#### Update (U) — Login Required (Ch10), Owner Check (Ch11 RLS)

```typescript
// lib/posts.ts
export async function updatePost(
  id: string,
  title: string,
  content: string
): Promise<Post>
```

- Page: `app/posts/edit/[id]/page.tsx` (protected by middleware)
- UI: Show "Edit" button only if logged in (UX, not security)
- **Do NOT validate owner in Ch10** — Ch11 RLS will enforce
- Return type: PATCH `/api/posts/[id]` or server action

#### Delete (D) — Login Required (Ch10), Owner Check (Ch11 RLS)

```typescript
// lib/posts.ts
export async function deletePost(id: string): Promise<void>
```

- UI: Show "Delete" button only if logged in + Dialog confirmation
- **Do NOT validate owner in Ch10** — Ch11 RLS will enforce
- Return type: DELETE `/api/posts/[id]` or server action
- Redirect to `/posts` after delete

### API Routes vs Server Actions

- **Server Actions** (`"use server"`): Prefer for form submissions (simpler)
- **API Routes**: Use when client-side fetch is needed (e.g., AJAX, dynamic requests)
- Both are acceptable; choose based on UX needs

### Middleware Matcher

**Current**:
```typescript
export const config = {
  matcher: ['/posts/new', '/posts/new/:path*', '/posts/edit/:path*']
}
```

## Ch11: Row-Level Security (RLS) — Future

- **Deferred to Ch11**: Owner validation, permission checks
- **Ch10 only**: UX-based show/hide (no security enforcement)
- **Ch11 plan**: Add RLS policies to posts table
  - SELECT: Anyone can read
  - INSERT: Must be logged in
  - UPDATE/DELETE: Only own posts (user_id = auth.uid())

## Common Mistakes to Avoid

- ❌ Do NOT use `pages/` directory (App Router only)
- ❌ Do NOT use `next/router`
- ❌ Do NOT expose `service_role` key to client
- ❌ Do NOT use `getUser()` in server components
- ❌ Do NOT use deprecated `auth.signIn()` (use `signInWithPassword`)
- ❌ Do NOT skip middleware for `/posts/new` and `/posts/edit/[id]`
- ❌ Do NOT add hardcoded permission checks in CRUD (defer to RLS)
- ❌ Do NOT add extra columns to posts (stability)
- ❌ Do NOT invent shadcn/ui components that don't exist

## Supabase Project Reference

- **Project ID**: vetapmsgbewwvvelzpwe
- **Region**: [Check Supabase dashboard]
- **Auth**: Email/OTP + Email/Password
- **Database**: PostgreSQL 15+

## Deployment

- **Platform**: Vercel
- **Environment Variables**: Sync `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Node Version**: 20+ (Vercel default)

## Testing Checklist

- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts without errors
- [ ] Signup → email OTP flow works
- [ ] Login → password flow works
- [ ] Logout clears session
- [ ] `/posts/new` redirects non-logged-in to `/login`
- [ ] `/posts/edit/[id]` redirects non-logged-in to `/login`
- [ ] Create post → appears in list
- [ ] Edit post → changes reflected
- [ ] Delete post → removed from list
- [ ] No `service_role` keys in client code
- [ ] No `auth.signIn()` calls
- [ ] No `pages/` directory used
- [ ] ESLint clean (`npm run lint`)
