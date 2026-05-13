# AGENTS — Shared AI Tool Rules

## Version Policy for All AI Tools

This project uses specific **educational versions** of dependencies that may differ from your training data. Always follow these pinned versions:

### Fixed Versions (Ch7–Ch9 Textbook Basis)

| Package | Version | Reason |
|---------|---------|--------|
| `next` | 16.2.1 | App Router only |
| `@supabase/supabase-js` | 2.47.12 (textbook) | 2.105.4 in package.json is compatible |
| `@supabase/ssr` | 0.5.2 | Cookie-based session for App Router |

### Supabase Dashboard Guidance

- **Supabase menu paths**: May be updated for 2026-05, not textbook basis.
- **Code examples**: All code follows Ch7–Ch9 textbook patterns, not Supabase docs.
- **Environment variable names**: Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Ch8 convention).

## Ch9 Authentication Rules (All AI Tools)

- Use **email/password authentication only** — no social login.
- `signInWithPassword()`, `signUp()`, `signOut()` only.
- Never use deprecated `auth.signIn()`.
- `@supabase/ssr` for session management.
- `middleware.ts` at project root for protected routes.
- Never expose `service_role` keys to the client.

## Copilot-Specific Guidance

See `.github/copilot-instructions.md` for detailed Copilot rules.

## Claude-Specific Guidance

See `CLAUDE.md` for additional Claude rules when used.
