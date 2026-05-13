# CLAUDE — Claude AI Tool Rules

When working with Claude (Claude Code or Chat), apply the shared rules from `AGENTS.md` **and** these Claude-specific guidelines:

## Version Handling

- Read `AGENTS.md` for fixed versions and version policy.
- When Claude suggests code from Supabase docs, recheck against Ch7–Ch9 textbook patterns.
- If package.json differs from textbook versions, document both "textbook basis" and "current installation".

## Ch9 Authentication for Claude

- Use the same rules as `copilot-instructions.md` Chapter 9.
- Email/password only, `signInWithPassword()`, `signUp()`, `signOut()`.
- `@supabase/ssr` for session management.
- App Router middleware for protected routes.
- No social login, no `auth.signIn()`.

## When Claude Differs from Copilot

- Copilot reads `.github/copilot-instructions.md` automatically.
- Claude needs explicit instruction via prompt or this file.
- If Claude and Copilot give conflicting guidance, trust textbook examples first.
