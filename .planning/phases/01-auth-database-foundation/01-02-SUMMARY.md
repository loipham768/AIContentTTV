---
phase: 01-auth-database-foundation
plan: 02
subsystem: auth
tags: [nextjs, nextauth, mongodb, bcryptjs, zod, vitest, registration, login-page]

requires:
  - phase: 01-01
    provides: dbConnect singleton, User model, auth.ts handlers, NextAuth v5 config

provides:
  - POST /api/auth/register endpoint with Zod validation + bcrypt.hash(12) + duplicate guard
  - /login page Server Component (auth() redirect for authed users, passes callbackUrl)
  - LoginRegisterCard client component with register tab (tab state, field validation, auto-signIn)
  - 4 passing AUTH-01 integration tests against real MongoDB

affects: [03-login-session, 04-integration-verification]

tech-stack:
  added: []
  patterns:
    - "next-auth/react signIn with redirect:false (not next-auth)"
    - "Zod v4 uses .issues not .errors on safeParse failure"
    - "vitest env: parse .env.local in vitest.config.ts, inject via test.env (worker-safe)"
    - "Route handler: export const runtime = 'nodejs' as first export"

key-files:
  created:
    - app/api/auth/register/route.ts
    - components/auth/LoginRegisterCard.tsx
    - app/login/page.tsx
    - tests/setup.ts
  modified:
    - tests/api/register.test.ts
    - lib/mongodb.ts
    - vitest.config.ts

key-decisions:
  - "Zod v4 API: .issues not .errors — critical fix applied to register route"
  - "MONGODB_URI check moved inside dbConnect() to avoid module-load crash in test context"
  - "vitest env injection: parse .env.local directly in vitest.config.ts (envDir failed in workers)"
  - "LoginRegisterCard register flow: fetch POST /register → on 201 call handleLogin → redirect"

patterns-established:
  - "Zod v4: use parsed.error.issues[0].message (not parsed.error.errors)"
  - "vitest MongoDB tests: beforeAll dbConnect, afterAll connection.close, afterEach cleanup"
  - "Next.js 15 searchParams: async Promise<{callbackUrl?}> prop on Server Component"

requirements-completed:
  - AUTH-01

duration: 8min
completed: 2026-05-19
---

# Plan 01-02: Registration Flow Summary

**POST /api/auth/register with bcrypt+Zod+duplicate guard, /login page with tab-toggle LoginRegisterCard, and 4 green AUTH-01 integration tests**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-19T21:35:00Z
- **Completed:** 2026-05-19T21:40:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Registration API route: `export const runtime = 'nodejs'`, Zod validate → dbConnect → bcrypt.hash(12) → User.create
- Login page Server Component: auth() redirect for already-authenticated users, callbackUrl propagation
- LoginRegisterCard: tab toggle (login/register), inline field validation, register → auto-signIn flow
- Full AUTH-01 test coverage: 201, 409+Vietnamese, 400 bad email, 400 short password — all green

## Task Commits

1. **Task 1: Registration API + AUTH-01 tests** - `699b47a` (feat)
2. **Task 2: /login page + LoginRegisterCard** - `d6ff633` (feat)

## Files Created/Modified
- `app/api/auth/register/route.ts` — POST endpoint with runtime=nodejs, Zod, bcrypt, Vietnamese errors
- `components/auth/LoginRegisterCard.tsx` — 'use client', tab toggle, register form, signIn from next-auth/react
- `app/login/page.tsx` — Server Component, auth() redirect, callbackUrl from searchParams
- `tests/api/register.test.ts` — 4 real integration assertions (was it.todo stubs)
- `lib/mongodb.ts` — MONGODB_URI check moved inside dbConnect() (lazy, test-safe)
- `vitest.config.ts` — .env.local injection via parseEnvFile + test.env config option
- `tests/setup.ts` — @next/env setup file (created but superseded by vitest.config.ts env injection)

## Deviations from Plan

### Auto-fixed Issues

**1. [Zod v4 API] `.errors` renamed to `.issues`**
- **Found during:** Task 1 (register tests returning 500 instead of 400)
- **Issue:** Zod v4 broke backward compat: `ZodError.errors` is `undefined`, replaced by `.issues`
- **Fix:** Changed `parsed.error.errors[0].message` → `parsed.error.issues[0].message` in register route
- **Files modified:** `app/api/auth/register/route.ts`
- **Verification:** All 4 register tests green

**2. [vitest env loading] `envDir` option does not inject into worker threads**
- **Found during:** Task 1 (all tests failing with MONGODB_URI undefined)
- **Issue:** vitest's `envDir` and `setupFiles` methods of loading env vars don't propagate to worker threads in this Node.js/vitest version combination
- **Fix:** Parse `.env.local` directly in `vitest.config.ts` and inject via `test.env` option (which vitest merges into `process.env` before spawning workers)
- **Files modified:** `vitest.config.ts`
- **Verification:** MongoDB connected, 4/4 tests pass

**3. [MongoDB singleton] Module-level MONGODB_URI check**
- **Found during:** Task 1 (vitest crashing during import)
- **Issue:** `lib/mongodb.ts` threw at module load time — before env was injected
- **Fix:** Moved `if (!MONGODB_URI) throw` inside `dbConnect()` function (lazy check)
- **Files modified:** `lib/mongodb.ts`
- **Verification:** Import no longer crashes; dbConnect throws correctly when called without env var

---

**Total deviations:** 3 auto-fixed (Zod v4 API change, vitest env loading, MongoDB lazy check)
**Impact:** All fixes necessary for correctness. No scope creep.

## Issues Encountered
- Zod v4 is a breaking change from v3; `.errors` → `.issues` is a silent runtime failure (no TypeScript error) — checked all Zod usages in the codebase. `auth.ts` safeParse result is only checked for `!parsed.success`, so not affected.

## Next Phase Readiness
- Plan 01-03 can now extend `LoginRegisterCard.tsx` with the login tab
- Registration is fully functional end-to-end
- AUTH-01 requirements complete

---
*Phase: 01-auth-database-foundation*
*Completed: 2026-05-19*
