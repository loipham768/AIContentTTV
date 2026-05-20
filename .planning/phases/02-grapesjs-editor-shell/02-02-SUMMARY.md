---
phase: 02-grapesjs-editor-shell
plan: 02
subsystem: ui
tags: [grapesjs, react, typescript, client-component, device-manager]

# Dependency graph
requires:
  - phase: 02-grapesjs-editor-shell
    provides: grapesjs@0.22.x + @grapesjs/react@2.x installed; lib/mockBlock.ts MOCK_BLOCK constant

provides:
  - components/editor/GrapesEditor.tsx — 'use client' GrapesJS canvas component
  - GrapesJS canvas mounted via @grapesjs/react Editor with storageManager disabled and all panels hidden
  - deviceManager configured with Desktop (no width) and Mobile (390px / widthMedia 480px)
  - onEditor callback pattern: loadProjectData(MOCK_BLOCK) then forwards editor instance to parent
  - Default export for Next.js dynamic() import with ssr: false

affects:
  - 02-03-topbar-component
  - 02-04-editor-client-wrapper
  - 03-ai-generation-pipeline

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "@grapesjs/react v2 Editor component requires 'grapesjs' prop (the library itself, not a string) — pass imported grapesjs directly"
    - "styleManager: { sectors: [] } disables GrapesJS style panels (false is not valid for EditorConfig.styleManager)"
    - "Hidden divs for blockManager/layerManager appendTo must be rendered OUTSIDE GjsReactEditor to avoid shadow DOM conflicts"
    - "MOCK_BLOCK as const requires cast: editor.loadProjectData(MOCK_BLOCK as Parameters<typeof editor.loadProjectData>[0])"

key-files:
  created:
    - components/editor/GrapesEditor.tsx
  modified: []

key-decisions:
  - "Used 'grapesjs' prop on @grapesjs/react Editor (required by EditorProps interface in v2 — discovered from EditorInstance.d.ts)"
  - "styleManager: { sectors: [] } instead of styleManager: false — EditorConfig types styleManager as StyleManagerConfig, not boolean"
  - "Aliased import: import { Editor as GjsReactEditor } from '@grapesjs/react' to avoid name collision with 'import type { Editor } from grapesjs'"
  - "Hidden manager divs rendered as siblings before GjsReactEditor (not inside it) per plan note 6"

patterns-established:
  - "Pattern: GrapesEditor is a pure canvas shell — all panel UI is hidden; custom React UI wraps it via EditorClientWrapper"
  - "Pattern: onEditor callback is the seam between GrapesEditor (canvas) and parent (state/toolbar)"

requirements-completed:
  - ED-01
  - ED-02
  - ED-03
  - ED-04

# Metrics
duration: 10min
completed: 2026-05-20
---

# Phase 2 Plan 02: GrapesEditor Client Component Summary

**GrapesJS canvas client component (`'use client'`) mounted via @grapesjs/react with storageManager off, all built-in panels hidden, Desktop + Mobile device manager, and Vietnamese mock banner pre-loaded via onEditor callback**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-05-20T16:30:00Z
- **Completed:** 2026-05-20T16:40:00Z
- **Tasks:** 1 of 1
- **Files modified:** 1 (components/editor/GrapesEditor.tsx created)

## Accomplishments

- Created `components/editor/GrapesEditor.tsx` with `'use client'` directive and full GrapesJS configuration
- Discovered and applied the required `grapesjs` prop for `@grapesjs/react` v2 `Editor` component (not documented in plan)
- Used `styleManager: { sectors: [] }` as the correct way to disable GrapesJS style panels (not `false`)
- All acceptance criteria met; `npm run build` exits 0 with clean TypeScript compilation

## Task Commits

1. **Task 1: Create components/editor/GrapesEditor.tsx** - `0a2cdb7` (feat)

## Files Created/Modified

- `components/editor/GrapesEditor.tsx` — `'use client'` GrapesJS canvas component; imports CSS from `grapesjs/dist/css/grapes.min.css`; uses `Editor` from `@grapesjs/react` (aliased as `GjsReactEditor`); passes `grapesjs` library as prop; all panels/storage/style hidden; deviceManager with Desktop + Mobile; hidden sibling divs for block/layer manager appendTo targets; `loadProjectData(MOCK_BLOCK)` in `handleEditor` then forwards to parent; default export

## Decisions Made

- Aliased `{ Editor as GjsReactEditor }` from `@grapesjs/react` to prevent name collision with `import type { Editor } from 'grapesjs'` — cleaner than using a local type alias
- Cast `MOCK_BLOCK` to `Parameters<typeof editor.loadProjectData>[0]` as planned — required because `as const` produces a readonly type incompatible with `ProjectData`'s index signature
- Verified CSS path `grapesjs/dist/css/grapes.min.css` by checking `node_modules/grapesjs/dist/css/` directory — file confirmed present

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added required `grapesjs` prop to @grapesjs/react Editor component**
- **Found during:** Task 1 (reviewing EditorInstance.d.ts before writing component)
- **Issue:** The plan's code template omits the required `grapesjs` prop. Without it, TypeScript would error and the editor would not initialize. `EditorProps` declares `grapesjs: string | typeof gjs` as a non-optional field.
- **Fix:** Added `import grapesjs from 'grapesjs'` and passed it as `grapesjs={grapesjs}` prop to the Editor component
- **Files modified:** components/editor/GrapesEditor.tsx
- **Verification:** npm run build exits 0; no TypeScript errors
- **Committed in:** 0a2cdb7 (Task 1 commit)

**2. [Rule 1 - Bug] Changed `styleManager: false` to `styleManager: { sectors: [] }`**
- **Found during:** Task 1 (checking GrapesJS EditorConfig type)
- **Issue:** `EditorConfig.styleManager` is typed as `StyleManagerConfig | undefined` — `false` is not a valid value and would cause a TypeScript compile error
- **Fix:** Used `styleManager: { sectors: [] }` which is valid and achieves the same result (no style sectors visible)
- **Files modified:** components/editor/GrapesEditor.tsx
- **Verification:** npm run build exits 0; no TypeScript errors
- **Committed in:** 0a2cdb7 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 bugs — type-checking discoveries before writing)
**Impact on plan:** Both fixes necessary for TypeScript compilation correctness. No scope creep. Behavior matches plan intent exactly.

## Issues Encountered

None beyond the two auto-fixed deviations above. The plan's implementation notes pre-warned about the `styleManager: false` fallback and the `MOCK_BLOCK` cast, which made those straightforward to handle.

## Known Stubs

None. `GrapesEditor.tsx` wires directly to `MOCK_BLOCK` (a real constant with Vietnamese content) via `loadProjectData()`. No placeholder data or empty props. The component is ready for a parent to pass `onEditor` and receive the editor instance.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. `GrapesEditor.tsx` is a pure client-side component with no server interaction. T-02-02 (GrapesJS SSR) mitigation (`ssr: false`) is enforced in `EditorClientWrapper.tsx` (02-04) as planned — this component just carries the `'use client'` directive. T-02-03 (MOCK_BLOCK injection) — `MOCK_BLOCK` is a static developer-authored constant, no user input flows through it; accept disposition confirmed.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Wave 3 (02-03-PLAN.md) can now:
- Import `GrapesEditor` from `@/components/editor/GrapesEditor` using dynamic() with ssr: false
- Pass `onEditor` callback to receive the GrapesJS editor instance
- Use `import type { Editor } from 'grapesjs'` for state typing

No blockers. Component is TypeScript-clean and build-verified.

---
*Phase: 02-grapesjs-editor-shell*
*Completed: 2026-05-20*
