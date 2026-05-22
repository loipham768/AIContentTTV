---
phase: 05-project-history-persistence
plan: "02"
subsystem: api
tags: [mongoose, next.js, app-router, delete-route, ownership-check]

requires:
  - phase: 05-01
    provides: [models/Project.ts, dbConnect, auth pattern]
provides:
  - DELETE /api/projects/:id with auth + ObjectId validation + ownership-scoped findOneAndDelete
affects: [05-03-HistoryPanel, app/api/projects]

tech-stack:
  added: []
  patterns: [dynamic-segment-route, objectid-validation-guard, ownership-scoped-delete]

key-files:
  created:
    - app/api/projects/[id]/route.ts
  modified: []

key-decisions:
  - "Returns 404 (not 403) for not-found-or-not-owned — prevents information leakage about whether a project exists"
  - "mongoose.Types.ObjectId.isValid() guard before DB call — prevents CastError on malformed id params"
  - "findOneAndDelete with _id AND userId is atomic ownership check — no TOCTOU race condition"
  - "Next.js 15 App Router dynamic params are a Promise — must await params before destructuring"

patterns-established:
  - "Dynamic segment route: { params }: { params: Promise<{ id: string }> } with await params"
  - "ObjectId guard: mongoose.Types.ObjectId.isValid(id) before any DB operation"
  - "Ownership-scoped delete: findOneAndDelete({ _id, userId }) — one atomic DB call"

requirements-completed:
  - HIS-04

duration: ~5min
completed: 2026-05-22
---

# Phase 5 Plan 02: DELETE /api/projects/[id] Summary

**DELETE endpoint at /api/projects/:id with JWT auth, ObjectId guard, and atomic ownership-scoped findOneAndDelete — malformed IDs and cross-user deletes both return 404.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-05-22T00:00:00Z
- **Completed:** 2026-05-22T00:05:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `app/api/projects/[id]/route.ts` with DELETE handler
- ObjectId validation guard prevents Mongoose CastError on malformed id values
- Ownership-scoped `findOneAndDelete` atomically checks auth and deletes in one DB call
- 404 (not 403) returned for any not-found-or-not-owned case — no info leakage
- TypeScript compiles clean (`npx tsc --noEmit` exits 0)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create app/api/projects/[id]/route.ts** - `efc6082` (feat)

## Files Created/Modified

- `app/api/projects/[id]/route.ts` — DELETE /api/projects/:id handler with auth check, ObjectId guard, ownership-scoped delete

## Decisions Made

- `export const runtime = 'nodejs'` — required per CLAUDE.md for all MongoDB routes
- `await params` before destructuring — Next.js 15 App Router dynamic params are async Promises
- ObjectId guard returns 404, not 400 — consistent with the "not found" response shape used throughout the API

## Deviations from Plan

None — plan executed exactly as written.

---

## Threat Model Compliance

All three STRIDE mitigations from the plan's threat register are implemented:

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-05-05 Tampering cross-user delete | `findOneAndDelete({ _id, userId })` — both fields required | Applied |
| T-05-06 Info Disclosure 403 vs 404 | Always returns 404 for not-found-or-not-owned | Applied |
| T-05-07 Tampering malformed ObjectId | `mongoose.Types.ObjectId.isValid()` guard before DB call | Applied |

## Known Stubs

None — no placeholder data or hardcoded values.

## Threat Flags

None — no new network endpoints or auth paths beyond what the plan specified.

## Verification Results

1. `npx tsc --noEmit` exits 0 — PASSED
2. `grep "findOneAndDelete" app/api/projects/[id]/route.ts` — line 26 — PASSED
3. `grep "userId: session.user.id" app/api/projects/[id]/route.ts` — line 28 — PASSED
4. `grep "ObjectId.isValid" app/api/projects/[id]/route.ts` — line 20 — PASSED
5. `grep "export const runtime" app/api/projects/[id]/route.ts` — line 7 — PASSED

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- DELETE /api/projects/:id is complete and ready for HistoryPanel (05-03) to wire the delete button
- 05-03 can proceed in parallel — the endpoint contract (DELETE → 404 or { ok: true }) is stable

---
*Phase: 05-project-history-persistence*
*Completed: 2026-05-22*

## Self-Check: PASSED

- app/api/projects/[id]/route.ts — FOUND (created, committed efc6082)
- Commit efc6082 present in git log
