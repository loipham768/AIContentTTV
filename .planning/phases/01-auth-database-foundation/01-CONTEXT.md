# Phase 1: Auth + Database Foundation - Context

**Gathered:** 2026-05-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the complete authentication infrastructure: a Next.js 15 project scaffolded from scratch, a MongoDB User model, and three auth flows (register, login, logout). By the end of this phase, a user can create an account, stay logged in across browser refreshes, and log out from any page. All subsequent phases build on this foundation.

</domain>

<decisions>
## Implementation Decisions

### Project Scaffold
- **D-01:** Start from scratch with `npx create-next-app` (Next.js 15, TypeScript, App Router, Tailwind CSS). No existing scaffold exists — Phase 1 initializes the full project.

### Auth Page Structure
- **D-02:** Single `/login` route with a Login/Register tab toggle. One page, two tabs. `NextAuth.pages.signIn` points to `/login`.
- **D-03:** After successful login or registration, redirect to `/editor` (the main workspace).
- **D-04:** Already-authenticated users visiting `/login` are redirected to `/editor` immediately.
- **D-05:** Visual style: centered card, minimal — Tailwind utility classes only. No brand colors or logo in Phase 1 (that's Phase 6).

### Route Protection
- **D-06:** Belt-and-suspenders protection: `middleware.ts` with `config.matcher` covers `/editor` and `/api/*`; each protected Server Component also calls `await auth()` to access session data.
- **D-07:** Middleware matcher scope: `/editor` (the only protected page in v1) and `/api/:path*` (all API routes).
- **D-08:** Preserve `callbackUrl` — users redirected to `/login` land on their original destination after authenticating.
- **D-09:** API routes return `{ error: 'Unauthorized' }` with HTTP 401 for unauthenticated requests. Pages redirect to `/login`. Never return HTML to API callers.

### Error Messages (Vietnamese)
- **D-10:** Login failure (wrong email or wrong password): generic `"Email hoặc mật khẩu không đúng"`. Prevents email enumeration — no distinction between "email not found" vs "wrong password".
- **D-11:** Duplicate email on registration: `"Email này đã được sử dụng"`.
- **D-12:** Validation errors (empty field, invalid email format, password too short): inline under each form field, not a top-level banner.
- **D-13:** Validation runs on both sides: client-side (instant feedback before submit) + server-side Zod (source of truth). Server always validates regardless of client state.

### User Model (Mongoose)
- **D-14:** Minimal schema — `email` (string, required, unique, lowercase) + `passwordHash` (string, required) + `createdAt` / `updatedAt` (via `{ timestamps: true }`). No display name in v1.
- **D-15:** Unique index on `email` at the database level — enforces no duplicate accounts even under concurrent registrations. `{ unique: true }` in schema definition.
- **D-16:** JWT payload carries `id` (user `_id` as string) + `email` only. No role field in v1.
- **D-17:** Model guard pattern to prevent `OverwriteModelError` on Next.js hot reload: `const User = mongoose.models.User || mongoose.model('User', UserSchema)`.

### Architecture Constraints (Inherited — Must Follow)
- **D-18:** Use `auth()` from `@/auth` everywhere — never `getServerSession()` (Pages Router pattern).
- **D-19:** All Route Handlers that call `dbConnect()` must declare `export const runtime = 'nodejs'`.
- **D-20:** Always use `dbConnect()` from `lib/mongodb.ts` — never call `mongoose.connect()` directly in a route handler.
- **D-21:** `bcryptjs` with salt rounds ≥ 12 for password hashing. Never log or store raw passwords.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Success Criteria
- `.planning/REQUIREMENTS.md` — AUTH-01, AUTH-02, AUTH-03 with detailed acceptance criteria (the canonical checklist for what Phase 1 must deliver)
- `.planning/ROADMAP.md` §Phase 1 — Goal, success criteria, and depends-on (nothing — foundation phase)

### Stack & Patterns
- `.planning/research/STACK.md` — Full stack decisions: NextAuth v5 `auth()` pattern, MongoDB singleton implementation, bcryptjs config, `@grapesjs/react` dynamic import pattern (for later phases — don't introduce GrapesJS in Phase 1)
- `.planning/research/PITFALLS.md` — Critical pitfalls for this phase: P7 (MongoDB connection pool exhaustion), P8 (NextAuth plain-text password risk), P10 (OverwriteModelError on hot reload), P15 (getServerSession returns null in App Router)

### Architecture Rules
- `CLAUDE.md` — Architecture constraints that override all defaults: `auth()` vs `getServerSession()`, `export const runtime = 'nodejs'` on DB routes, `dbConnect()` singleton rule, `dynamic({ ssr: false })` for GrapesJS (Phase 2+ only)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — this is a green-field project initialized from scratch in Phase 1. All patterns established here become the baseline for subsequent phases.

### Established Patterns
- All patterns for this phase are defined in `.planning/research/STACK.md` (code snippets for MongoDB singleton, NextAuth v5 config, Mongoose model guard). Use those as implementation reference — don't invent alternatives.

### Integration Points
- `lib/mongodb.ts` — established in this phase; imported by every subsequent API route
- `auth.ts` — established in this phase; imported by middleware, Server Components, and Route Handlers in all future phases
- `models/User.ts` — established in this phase; referenced by history/project models in Phase 5

</code_context>

<specifics>
## Specific Ideas

- Login/register UI: "centered card, minimal" — no visual brand decisions in Phase 1. Plain white card, neutral background. Typography and color palette are Phase 6 work.
- Password field: standard `<input type="password">` with show/hide toggle is acceptable but not required in Phase 1.
- No `<Link>` navigation to a separate register page — tab toggle handles both forms at `/login`.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Auth + Database Foundation*
*Context gathered: 2026-05-18*
