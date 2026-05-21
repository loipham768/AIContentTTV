---
phase: 03-ai-generation-pipeline
plan: 01
subsystem: api
tags: [anthropic, claude, zod, mongoose, rate-limiting, ai-generation]

# Dependency graph
requires:
  - phase: 01-auth-database-foundation
    provides: MongoDB connection singleton (dbConnect), User model pattern, auth() helper
  - phase: 02-grapesjs-editor-shell
    provides: MOCK_BLOCK reference shape, loadProjectData() integration point

provides:
  - "@anthropic-ai/sdk installed as production dependency"
  - "models/RateLimit.ts — Mongoose model with 10-second TTL index for per-user rate limiting"
  - "lib/ai/generate-block.ts — generateBlock() async function with GrapesBlockSchema Zod validation"
  - "GrapesBlockSchema Zod schema exported for reuse by API route handler"
  - "GrapesBlock TypeScript type exported for type-safe integration"

affects:
  - 03-02-api-route (consumes generateBlock and RateLimit directly)
  - 03-03-prompt-bar (uses /api/generate endpoint wired to generateBlock)
  - 04-css-isolation (exports from generate-block flow to CSS isolation)

# Tech tracking
tech-stack:
  added:
    - "@anthropic-ai/sdk ^0.97.1 — Anthropic Claude API client with zodOutputFormat helper"
  patterns:
    - "zodOutputFormat(schema) — structured JSON output enforcement before loadProjectData()"
    - "z.lazy() with ZodType<any,any,any> annotation — recursive Zod schema for GrapesJS component tree"
    - "Module-level Anthropic client singleton — one instance per process, not per request"
    - "MOCK_BLOCK embedded verbatim as few-shot JSON in Vietnamese system prompt"
    - "Error propagation — no try/catch in generateBlock; route handler maps errors to HTTP responses"
    - "Zod v4 API: z.record(keyType, valueType) requires both key and value types (breaking change from v3)"
    - "Zod v4 API: zodOutputFormat(schema) accepts only 1 argument (no name argument)"

key-files:
  created:
    - "models/RateLimit.ts — Mongoose TTL model for per-user 10-second generation cooldown"
    - "lib/ai/generate-block.ts — Claude API integration with GrapesBlockSchema and generateBlock()"
    - "tests/unit/generate-block.test.ts — 9 TDD unit tests (GrapesBlockSchema + generateBlock behavior)"
  modified:
    - "package.json — @anthropic-ai/sdk added to dependencies"
    - ".env.local — ANTHROPIC_API_KEY placeholder added"

key-decisions:
  - "zodOutputFormat accepts 1 argument in @anthropic-ai/sdk 0.97+ (plan showed 2 args — fixed per actual SDK API)"
  - "z.record requires 2 args in Zod v4 (z.record(z.string(), z.string())) — plan used Zod v3 syntax"
  - "z.lazy() recursive type uses ZodType<any,any,any> annotation to avoid TypeScript circular reference errors"
  - "generateBlock has no try/catch — errors propagate to route handler (per plan design D-05)"
  - "MOCK_BLOCK embedded via JSON.stringify(MOCK_BLOCK, null, 2) in template literal — verbatim few-shot example"

patterns-established:
  - "TDD RED-GREEN: failing test committed before implementation; all 9 tests green after implementation"
  - "vi.hoisted() pattern: required to use shared mock reference inside vi.mock() factory in Vitest"

requirements-completed: [AI-01, AI-02, AI-03]

# Metrics
duration: 20min
completed: 2026-05-21
---

# Phase 3 Plan 01: AI Foundation — Anthropic SDK + RateLimit + generateBlock Summary

**Anthropic SDK installed with GrapesBlockSchema Zod validation and generateBlock() wired to MOCK_BLOCK few-shot prompt — Wave 2 API route can now be built.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-21T12:00:00Z
- **Completed:** 2026-05-21T12:22:01Z
- **Tasks:** 3/3
- **Files modified:** 6

## Accomplishments

- Installed `@anthropic-ai/sdk` ^0.97.1 and verified `require('@anthropic-ai/sdk')` succeeds
- Created `models/RateLimit.ts` with MongoDB TTL index (`expires: 10`) using Mongoose model guard pattern from User.ts
- Created `lib/ai/generate-block.ts` with `GrapesBlockSchema` (recursive Zod schema), `generateBlock()`, and MOCK_BLOCK embedded verbatim as Vietnamese few-shot example
- All 9 TDD unit tests pass; full TypeScript compiles clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Install @anthropic-ai/sdk** — `85371f4` (feat)
2. **Task 2: Create models/RateLimit.ts** — `719de7c` (feat)
3. **Task 3: TDD RED — failing tests** — `21b2e27` (test)
4. **Task 3: TDD GREEN — implement generate-block.ts** — `3dca5e3` (feat)

**Plan metadata:** *(docs commit to follow)*

_TDD task 3 has two commits: test (RED gate) then feat (GREEN gate)._

## Files Created/Modified

- `models/RateLimit.ts` — Mongoose model with `userId` (unique) and `createdAt` (TTL expires: 10s)
- `lib/ai/generate-block.ts` — `GrapesBlockSchema`, `GrapesBlock` type, `generateBlock(prompt)` async function
- `tests/unit/generate-block.test.ts` — 9 Vitest unit tests for schema validation and generateBlock behavior
- `package.json` — `@anthropic-ai/sdk ^0.97.1` added to production dependencies
- `package-lock.json` — updated lock file
- `.env.local` — `ANTHROPIC_API_KEY=your-anthropic-api-key-here` placeholder added

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Zod v4 API breaking changes from plan's v3 syntax**
- **Found during:** Task 3 (TypeScript compilation)
- **Issue:** Plan used `z.record(z.string())` (Zod v3 single-arg) and `zodOutputFormat(GrapesBlockSchema, 'grapesBlock')` (2-arg) — both fail in Zod v4 and `@anthropic-ai/sdk` 0.97+
- **Fix:** Changed to `z.record(z.string(), z.string())` for Zod v4; changed to `zodOutputFormat(GrapesBlockSchema)` (1 arg per actual SDK type declaration)
- **Files modified:** `lib/ai/generate-block.ts`
- **Commit:** `3dca5e3`

**2. [Rule 1 - Bug] `z.ZodType<any>` type annotation incompatible with z.lazy() in Zod v4**
- **Found during:** Task 3 (TypeScript compilation)
- **Issue:** Plan specified `const GrapesComponentSchema: z.ZodType<any> = z.lazy(...)` but Zod v4 `ZodType` has 3 generic parameters required for constructor compatibility
- **Fix:** Changed annotation to `z.ZodType<any, any, any>` — all three type params explicit
- **Files modified:** `lib/ai/generate-block.ts`
- **Commit:** `3dca5e3`

**3. [Rule 1 - Bug] Vitest vi.mock hoisting — mock reference unavailable in factory**
- **Found during:** Task 3 TDD (test execution)
- **Issue:** `const mockParseFn = vi.fn()` defined before `vi.mock()` call, but Vitest hoists `vi.mock()` calls — variable is undefined at factory execution time
- **Fix:** Used `vi.hoisted(() => vi.fn())` to create the mock reference with hoisting semantics
- **Files modified:** `tests/unit/generate-block.test.ts`
- **Commit:** `3dca5e3`

## TDD Gate Compliance

- RED gate: `21b2e27` — `test(03-01): add failing tests for generate-block TDD RED phase` (9 tests, module not found error confirmed)
- GREEN gate: `3dca5e3` — `feat(03-01): implement generate-block.ts with GrapesBlockSchema and generateBlock` (9 tests pass)
- REFACTOR gate: Not required — implementation is clean with no refactoring needed

## Known Stubs

None — all files deliver real functionality. `ANTHROPIC_API_KEY=your-anthropic-api-key-here` is an intentional placeholder that the developer must replace with a real API key before Phase 3 can call the Claude API live.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: information-disclosure | `.env.local` | ANTHROPIC_API_KEY placeholder added — developer must replace with real key; .env.local is gitignored |

*T-03-01 (ANTHROPIC_API_KEY exposure) mitigated: key lives only in .env.local (gitignored); confirmed not hardcoded in any source file.*

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| models/RateLimit.ts exists | FOUND |
| lib/ai/generate-block.ts exists | FOUND |
| tests/unit/generate-block.test.ts exists | FOUND |
| 03-01-SUMMARY.md exists | FOUND |
| Commit 85371f4 (Task 1 - install SDK) | FOUND |
| Commit 719de7c (Task 2 - RateLimit model) | FOUND |
| Commit 21b2e27 (Task 3 - TDD RED) | FOUND |
| Commit 3dca5e3 (Task 3 - TDD GREEN) | FOUND |
