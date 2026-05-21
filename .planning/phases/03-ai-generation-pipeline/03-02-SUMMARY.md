---
phase: 03-ai-generation-pipeline
plan: 02
subsystem: api
tags: [nextjs, api-route, auth, rate-limiting, mongodb, zod, tdd]

# Dependency graph
requires:
  - phase: 01-auth-database-foundation
    provides: auth() helper, dbConnect() singleton
  - phase: 03-01
    provides: generateBlock() function, RateLimit model, GrapesBlockSchema

provides:
  - "app/api/generate/route.ts — POST endpoint for AI block generation with auth + rate limiting"
  - "tests/api/generate.test.ts — 11 unit tests covering all behavior branches"

affects:
  - 03-03-prompt-bar (calls POST /api/generate endpoint)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "auth() called before dbConnect() — avoids unnecessary DB connection on unauthenticated requests"
    - "RateLimit.findOne().lean() — lightweight read check without Mongoose document overhead"
    - "findOneAndUpdate upsert only on success — user can retry immediately after server error"
    - "Vietnamese error strings returned to client; raw error logged server-side only (D-05, T-03-05)"

key-files:
  created:
    - "app/api/generate/route.ts — POST /api/generate: auth check → Zod validation → rate limit → generateBlock → upsert RateLimit"
    - "tests/api/generate.test.ts — 11 TDD unit tests covering all behavior branches"
  modified:
    - "vitest.config.ts — fixed next/server alias to resolve from main repo node_modules (worktree isolation fix)"

key-decisions:
  - "RateLimit mock uses .lean() chainable wrapper — matches route's findOne().lean() pattern without real Mongoose"
  - "vitest.config.ts next/server alias updated to resolve via require.resolve() from main project directory — worktree node_modules is empty by design"

# Metrics
duration: 10min
completed: 2026-05-21
---

# Phase 3 Plan 02: API Route — POST /api/generate Summary

**POST /api/generate route handler with auth, Zod validation, MongoDB rate limiting, and Vietnamese error messages — all 11 TDD tests pass, TypeScript clean.**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-05-21
- **Tasks:** 1/1
- **Files modified:** 3

## Accomplishments

- Created `app/api/generate/route.ts` — the server-side POST endpoint that PromptBar (03-03) calls
- Auth check runs first (before any DB connection) — 401 for unauthenticated requests (T-03-03)
- Zod validation enforces `prompt: z.string().min(1).max(500)` — returns 400 with validation message
- Per-user MongoDB TTL rate limit check via `RateLimit.findOne({ userId }).lean()` — returns 429 with Vietnamese message `"Vui lòng đợi vài giây trước khi tạo nội dung mới."` (T-03-04)
- Calls `generateBlock(prompt)` from 03-01; wraps in try/catch to return Vietnamese 500 message on any Claude or Zod failure (T-03-05)
- RateLimit doc upserted ONLY on success — user can retry immediately after server error (intentional D-10)
- All 11 TDD unit tests pass; TypeScript compiles clean with zero errors

## Task Commits

1. **TDD RED — failing tests:** `1748132` — `test(03-02): add failing tests for generate route TDD RED phase`
2. **TDD GREEN — implementation:** `a22b566` — `feat(03-02): implement POST /api/generate route handler`

## Files Created/Modified

- `app/api/generate/route.ts` — POST endpoint (new file)
- `tests/api/generate.test.ts` — 11 unit tests (new file, updated with .lean() mock fix)
- `vitest.config.ts` — fixed next/server alias for worktree isolation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Vitest next/server alias resolved to empty worktree node_modules**
- **Found during:** Task 1 TDD GREEN (test execution)
- **Issue:** `vitest.config.ts` alias `'next/server': path.resolve(__dirname, 'node_modules/next/server.js')` pointed to the worktree's empty `node_modules/` directory. The worktree does not have its own installed packages — they live in the main project directory.
- **Fix:** Updated alias to `require.resolve('next/server', { paths: [path.resolve(__dirname, '../../..')] })` which resolves from the main project directory (`AIContentBooster/`) where `node_modules/next` is installed.
- **Files modified:** `vitest.config.ts`
- **Commit:** `a22b566`

**2. [Rule 1 - Bug] RateLimit.findOne mock missing .lean() chaining support**
- **Found during:** Task 1 TDD GREEN (5 tests failing with `TypeError: default.findOne(...).lean is not a function`)
- **Issue:** Mock was `mockRateLimitFindOne.mockResolvedValue(null)` — a plain promise. Route calls `RateLimit.findOne({ userId }).lean()` which chains `.lean()` on the result of `findOne()`.
- **Fix:** Changed mock factory to return a chainable object `{ lean: () => mockRateLimitFindOne(...args) }` matching Mongoose's query builder pattern.
- **Files modified:** `tests/api/generate.test.ts`
- **Commit:** `a22b566`

## TDD Gate Compliance

- RED gate: `1748132` — `test(03-02): add failing tests for generate route TDD RED phase` (11 tests, module not found error confirmed)
- GREEN gate: `a22b566` — `feat(03-02): implement POST /api/generate route handler` (11 tests pass)
- REFACTOR gate: Not required — implementation matches plan exactly with no cleanup needed

## Known Stubs

None — route is fully implemented with real logic. No placeholder returns.

## Threat Flags

No new threat surface beyond what was already in the plan's threat model. All four STRIDE threats (T-03-03 through T-03-06) are mitigated in the implementation:

| Threat | Mitigation | Verified |
|--------|------------|---------|
| T-03-03 Spoofing | `auth()` called first; 401 before any DB/Claude access | Yes — test confirms DB not called on 401 |
| T-03-04 DoS | MongoDB TTL rate limit 10s per user; Zod max(500) | Yes — 429 test passes |
| T-03-05 Info Disclosure | Vietnamese string to client; raw error console.error only | Yes — 500 test confirms message |
| T-03-06 EoP | userId sourced from `session.user.id` (NextAuth) not request body | Yes — session mock controls userId |

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| app/api/generate/route.ts exists | FOUND |
| tests/api/generate.test.ts exists | FOUND |
| 03-02-SUMMARY.md exists | FOUND |
| export const runtime = 'nodejs' present | FOUND |
| await auth() present | FOUND |
| RateLimit.findOne present | FOUND |
| generateBlock present | FOUND |
| 429 Vietnamese message present | FOUND |
| 500 Vietnamese message present | FOUND |
| Commit 1748132 (TDD RED) | FOUND |
| Commit a22b566 (TDD GREEN) | FOUND |
| All 11 tests pass | PASS |
| TypeScript clean | PASS |
