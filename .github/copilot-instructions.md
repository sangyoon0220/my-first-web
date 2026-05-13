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