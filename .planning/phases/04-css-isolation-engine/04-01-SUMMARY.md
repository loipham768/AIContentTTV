---
phase: 04-css-isolation-engine
plan: "01"
subsystem: ui
tags: [juice, css-inliner, html-sanitizer, domparser, typescript]

# Dependency graph
requires: []
provides:
  - "juice@11.1.1 installed as production dependency with bundled TypeScript types"
  - "lib/cssIsolation.ts: isolateCss(html, css) — CSS Isolation Engine core function"
affects:
  - 04-02-copy-button
  - any plan wiring the 'Copy HTML' button or exporting HTML from GrapesJS

# Tech tracking
tech-stack:
  added:
    - "juice@11.1.1 — CSS inliner (Automattic origin, 4M weekly downloads, bundles own .d.ts)"
  patterns:
    - "CSS Isolation pattern: juice.inlineContent → DOMParser scrub → innerHTML return"
    - "Browser-only library file: imports DOMParser, no 'use client' directive (not a React component)"

key-files:
  created:
    - "lib/cssIsolation.ts — exports isolateCss(html, css); strips scripts, class, data-* attrs"
  modified:
    - "package.json — juice added to dependencies"
    - "package-lock.json — lockfile updated"

key-decisions:
  - "@types/juice not installed — package does not exist on npm; juice v11 bundles own TypeScript types at juice.d.ts (declared in package.json 'types' field)"
  - "import juice from 'juice' works correctly with esModuleInterop:true and moduleResolution:bundler despite the CJS export= pattern in juice.d.ts"
  - "No try/catch in isolateCss — errors propagate to caller (TopBar) per plan specification"

patterns-established:
  - "CSS Isolation Engine pattern: always call isolateCss(editor.getHtml(), editor.getCss()) — never editor.getHtml() alone"

requirements-completed:
  - EX-01
  - EX-02

# Metrics
duration: 8min
completed: 2026-05-21
---

# Phase 4 Plan 01: CSS Isolation Engine — juice install + isolateCss Summary

**juice@11.1.1 installed and lib/cssIsolation.ts created: DOMParser-based scrubber strips scripts, class, and data-* attributes after juice inlines class-based CSS rules into style= attributes**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-21T14:35:00Z
- **Completed:** 2026-05-21T14:43:00Z
- **Tasks:** 2
- **Files modified:** 3 (package.json, package-lock.json, lib/cssIsolation.ts)

## Accomplishments

- juice@11.1.1 installed as production dependency (bundles its own TypeScript types — no separate @types/juice needed)
- lib/cssIsolation.ts created with isolateCss(html, css): inlines CSS via juice.inlineContent, removes all script elements, strips class and data-* attributes via DOMParser
- Full project TypeScript compiles clean (npx tsc --noEmit exits 0)

## Task Commits

Each task was committed atomically:

1. **Task 1 + Task 2: Install juice + create lib/cssIsolation.ts** - `f3553ab` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `lib/cssIsolation.ts` — CSS Isolation Engine: exports isolateCss(html, css); uses juice.inlineContent to merge class-based CSS; strips scripts, class attrs, data-* attrs via DOMParser
- `package.json` — juice@11.1.1 added to dependencies
- `package-lock.json` — lockfile updated with juice and its 33 transitive dependencies

## Decisions Made

- **@types/juice not installed:** The package `@types/juice` does not exist on npm (404 from registry). juice v11 ships its own TypeScript definitions at `juice.d.ts` declared in its `package.json` `"types"` field. TypeScript resolves types natively — no separate @types package needed.
- **import juice from 'juice' confirmed working:** Despite juice.d.ts using `export = juice` (CommonJS pattern), TypeScript with `esModuleInterop: true` and `moduleResolution: "bundler"` correctly resolves the default import. Zero TS errors confirmed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] @types/juice does not exist on npm**
- **Found during:** Task 1 (Install juice and @types/juice)
- **Issue:** Plan specified `npm install -D @types/juice` but this package returns HTTP 404 from the npm registry. juice@11.1.1 bundles its own TypeScript definitions at `node_modules/juice/juice.d.ts` (declared via `"types": "juice.d.ts"` in juice's package.json).
- **Fix:** Skipped @types/juice install. TypeScript resolves juice types natively from the bundled .d.ts. Zero TypeScript errors confirmed with `npx tsc --noEmit`.
- **Files modified:** None (no install performed, no package.json entry added)
- **Verification:** `npx tsc --noEmit` exits 0; juice types fully resolve (inlineContent method typed correctly)
- **Committed in:** f3553ab (combined task commit)

---

**Total deviations:** 1 auto-handled (package does not exist on npm; types bundled natively)
**Impact on plan:** No scope change. juice types resolve correctly without a separate @types package. TypeScript is clean.

## Issues Encountered

- `@types/juice` returned HTTP 404 from npm registry — juice ships its own types; the plan's reference to this package was incorrect. Resolved automatically by confirming bundled types satisfy the TypeScript compiler.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `isolateCss(html, css)` is ready to wire into the Copy HTML button in Phase 4 Plan 02
- Import path: `import { isolateCss } from '@/lib/cssIsolation'`
- Call pattern: `isolateCss(editor.getHtml(), editor.getCss())`
- No blockers.

---
*Phase: 04-css-isolation-engine*
*Completed: 2026-05-21*
