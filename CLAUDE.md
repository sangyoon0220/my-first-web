# CLAUDE — Claude AI Tool Rules

When working with Claude (Claude Code or Chat), apply the shared rules from `AGENTS.md` **and** these Claude-specific guidelines:

## Version Handling

- Read `AGENTS.md` for fixed versions and version policy.
- When Claude suggests code from Supabase docs, recheck against Ch7–Ch10 textbook patterns.
- If package.json differs from textbook versions, document both "textbook basis" and "current installation".
- For Ch10 posts CRUD, reference actual migration file (`supabase/migrations/20260511043614_create_tables.sql`) instead of textbook schema.

## Ch8 Connection for Claude

- Use the same rules as `copilot-instructions.md` Chapter 8 (implicit in AGENTS.md).
- `lib/supabase/client.ts` for browser client (already implemented).
- `@supabase/ssr` for server-side session (already implemented).

## Ch9 Authentication for Claude

- Use the same rules as `copilot-instructions.md` Chapter 9.
- Email/password only, `signInWithPassword()`, `signUp()`, `signOut()`.
- `@supabase/ssr` for session management.
- App Router middleware for protected routes.
- No social login, no `auth.signIn()`.

## Ch10 CRUD for Claude

- Use the same rules as `copilot-instructions.md` Chapter 10.
- Read operations (R): No auth required, server components.
- Create (C): Login required, `/posts/new` protected by middleware, server action or API route.
- Update (U): Login required, `/posts/edit/[id]` protected by middleware, no owner check in Ch10 (defer to Ch11 RLS).
- Delete (D): Login required, no owner check in Ch10 (defer to Ch11 RLS).
- Schema: Use actual migrations as source of truth; posts table has exactly: `id`, `user_id`, `title`, `content`, `created_at`.
- Type definitions: Define `interface Post` in `lib/posts.ts` matching schema.
- No hard-coded permission checks in CRUD functions — RLS will enforce in Ch11.

## When Claude Differs from Copilot

- Copilot reads `.github/copilot-instructions.md` automatically.
- Claude needs explicit instruction via prompt or this file.
- If Claude and Copilot give conflicting guidance, trust textbook examples first, then actual migration schema second.
