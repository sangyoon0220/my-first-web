# AGENTS — Shared AI Tool Rules

## Version Policy for All AI Tools

This project uses specific **educational versions** of dependencies that may differ from your training data. Always follow these pinned versions:

### Fixed Versions (Ch7–Ch10 Textbook Basis)

| Package | Version | Reason |
|---------|---------|--------|
| `next` | 16.2.1 | App Router only |
| `@supabase/supabase-js` | **textbook: 2.47.12** / **actual: 2.105.4** | Newer version is compatible; use actual for now |
| `@supabase/ssr` | 0.5.2 | Cookie-based session for App Router |
| `react` | 19.2.4 | Latest React, used with Next.js 16 |
| `tailwindcss` | 4 | Latest Tailwind |
| `typescript` | ^5 | Latest TypeScript |

### Supabase Dashboard Guidance

- **Supabase menu paths**: May be updated for 2026-05, not textbook basis.
- **Code examples**: All code follows Ch7–Ch10 textbook patterns, not Supabase docs.
- **Environment variable names**: Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Ch8 convention).
- **Database schema**: Use actual migrations in `supabase/migrations/` as source of truth, not textbook if they differ.

## Ch8: Supabase Connection Rules (All AI Tools)

- Use `lib/supabase/client.ts` for browser-side client (already implemented).
- Use `@supabase/ssr` for server-side session management with App Router.
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never expose `service_role` or server-only keys to the client.

## Ch9: Authentication Rules (All AI Tools)

- Use **email/password authentication only** — no social login.
- `signInWithPassword()`, `signUp()`, `signOut()` only.
- Never use deprecated `auth.signIn()`.
- `@supabase/ssr` for session management.
- `middleware.ts` at project root for protected routes.
- Never expose `service_role` keys to the client.

## Ch10: Posts CRUD Rules (All AI Tools)

- **Schema**: Use actual migration `supabase/migrations/20260511043614_create_tables.sql` as source of truth.
- **Tables**: `profiles` (extends auth.users), `posts` (user_id references profiles.id).
- **Columns**: posts table has `id`, `user_id`, `title`, `content`, `created_at` — add no other columns without explicit request.
- **Read (R)**: No auth required, use as Server Components (no "use client").
- **Create (C)**: Login required, protect `/posts/new` with middleware, extract user_id from session.
- **Update (U)**: Login required, protect `/posts/edit/[id]` with middleware, no owner validation in Ch10 (deferred to Ch11 RLS).
- **Delete (D)**: Login required, no owner validation in Ch10 (deferred to Ch11 RLS).
- **Middleware**: Extend `middleware.ts` matcher to include `/posts/edit/:path*`.
- **Type Safety**: Define `interface Post` with all schema columns, export from `lib/posts.ts`.
- **API Route Priority**: Use server actions when form-based, API routes when client-side fetch is needed.
- **No Hard-Coded Checks**: Let RLS in Ch11 enforce permissions; Ch10 is UX-driven.

## Copilot-Specific Guidance

See `.github/copilot-instructions.md` for detailed Copilot rules (includes Ch10 CRUD rules).

## Claude-Specific Guidance

See `CLAUDE.md` for additional Claude rules when used.
