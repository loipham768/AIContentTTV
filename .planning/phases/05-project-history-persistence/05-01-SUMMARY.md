---
phase: 05-project-history-persistence
plan: "01"
subsystem: persistence
tags: [mongoose, api-routes, auto-save, project-history]
dependency_graph:
  requires: []
  provides: [models/Project.ts, GET /api/projects, POST /api/projects, auto-save in /api/generate]
  affects: [app/api/generate/route.ts]
tech_stack:
  added: []
  patterns: [mongoose-model-guard, nodejs-runtime-route, inner-try-catch-non-blocking]
key_files:
  created:
    - models/Project.ts
    - app/api/projects/route.ts
  modified:
    - app/api/generate/route.ts
decisions:
  - "Project.blockData uses Schema.Types.Mixed to store full GrapesJS project JSON (never HTML per CLAUDE.md)"
  - "userId index on ProjectSchema for efficient per-user queries"
  - "Auto-save wrapped in inner try/catch so MongoDB write failure never blocks user from receiving generated block"
  - "name computed server-side as prompt.slice(0,50) — client cannot supply arbitrary name (D-02)"
metrics:
  duration: "~10 minutes"
  completed: "2026-05-22"
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 1
---

# Phase 5 Plan 01: Project Model + API Routes + Auto-Save Summary

**One-liner:** Mongoose Project model with userId index, GET/POST /api/projects endpoints, and non-blocking auto-save wired into the generate route.

---

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create models/Project.ts | eb0d480 | models/Project.ts |
| 2 | Create app/api/projects/route.ts (GET + POST) | 591821c | app/api/projects/route.ts |
| 3 | Wire auto-save into app/api/generate/route.ts | 7396f4a | app/api/generate/route.ts |

---

## What Was Built

### models/Project.ts
Mongoose model with fields `userId` (String, indexed), `name` (String, max 50), `prompt` (String), `blockData` (Mixed), and `timestamps: true`. Uses model guard (`mongoose.models.Project || mongoose.model(...)`) to prevent OverwriteModelError in Next.js serverless. Exports `Project` (default) and `ProjectDocument` (TypeScript type).

### app/api/projects/route.ts
- `GET /api/projects` — auth-gated, returns `{ projects }` sorted by `createdAt` desc, `.lean()` for performance, selects only `_id name prompt blockData createdAt`
- `POST /api/projects` — auth-gated, validates body with Zod (`z.record(z.string(), z.unknown())` for blockData), creates and returns `{ project }` with 201 status
- `export const runtime = 'nodejs'` declared per CLAUDE.md rule

### app/api/generate/route.ts (modified)
Added `import Project from '@/models/Project'` and an inner `try/catch` block that calls `Project.create({ userId, name: prompt.slice(0, 50), prompt, blockData: block })` after the rate limit upsert. Auto-save failure logs to console but never interrupts the response — user always receives `{ block }` even if MongoDB write fails.

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Threat Model Compliance

All four STRIDE mitigations from the plan's threat register are implemented:

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-05-01 Spoofing on GET | `auth()` check before `dbConnect()` | Applied |
| T-05-02 Tampering on blockData | `z.record(z.string(), z.unknown())` validation | Applied |
| T-05-03 Info Disclosure cross-user | GET filters by `session.user.id` | Applied |
| T-05-04 Elevation via name | `name` computed server-side from `prompt.slice(0,50)` | Applied |

---

## Known Stubs

None — no placeholder data, no hardcoded empty values introduced. `blockData` stores real GrapesJS JSON when auto-save fires at generation time.

---

## Threat Flags

None — no new network endpoints or auth paths beyond what the plan specified.

---

## Verification Results

1. `npx tsc --noEmit` exits 0 — PASSED
2. `grep "Project" app/api/generate/route.ts` — returns import (line 6) + create (line 63) — PASSED
3. `grep "auto-save" app/api/generate/route.ts` — returns match (line 65 console.error) — PASSED
4. `grep "sort.*createdAt" app/api/projects/route.ts` — returns match (line 17) — PASSED
5. `grep "export const runtime" app/api/projects/route.ts` — returns match (line 7) — PASSED

---

## Self-Check: PASSED

- models/Project.ts — FOUND (created, committed eb0d480)
- app/api/projects/route.ts — FOUND (created, committed 591821c)
- app/api/generate/route.ts — FOUND (modified, committed 7396f4a)
- All commits present in git log
