---
phase: 02-grapesjs-editor-shell
plan: 01
subsystem: ui
tags: [grapesjs, react, typescript, vietnamese, mock-data]

# Dependency graph
requires:
  - phase: 01-auth-database-foundation
    provides: Next.js 15 App Router scaffold, TypeScript config, Tailwind CSS 4 setup
provides:
  - grapesjs@0.22.x installed with built-in TypeScript types
  - "@grapesjs/react@2.x installed — exports: Editor (named+default), Canvas, useEditor, WithEditor"
  - lib/mockBlock.ts — MOCK_BLOCK constant for GrapesJS loadProjectData()
  - Vietnamese marketing banner data (h2 + p + button) for ED-02 drag-reorder testing
affects:
  - 02-02-grapesjs-editor-component
  - 02-03-topbar-component
  - 03-ai-generation-pipeline

# Tech tracking
tech-stack:
  added:
    - grapesjs@^0.22.16 (ships own TypeScript types — do NOT install @types/grapesjs)
    - "@grapesjs/react@^2.0.0 (official React wrapper)"
  patterns:
    - "GrapesJS project data format: { assets, styles, pages: [{ frames: [{ component: { type: 'wrapper', components: [...] } }] }] }"
    - "loadProjectData() pattern: editor.loadProjectData(MOCK_BLOCK) in onEditor callback"
    - "kebab-case CSS property names required in GrapesJS style objects"
    - "draggable: true on each child component for ED-02 drag-reorder"

key-files:
  created:
    - lib/mockBlock.ts
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "@grapesjs/react named export is 'Editor' (not 'GjsEditor') — import { Editor } from '@grapesjs/react' OR use default import"
  - "GrapesJS 0.22 ships built-in TypeScript types — @types/grapesjs must NOT be installed (targets older GrapesJS, conflicts)"
  - "as const on MOCK_BLOCK allows TypeScript to infer the shape without an explicit GrapesJS type import"

patterns-established:
  - "Pattern 1: Mock data as named export constant from lib/ — Phase 3 replaces lib/mockBlock.ts pattern with lib/aiBlock.ts"
  - "Pattern 2: Three sibling draggable children under section (not nested) — required for ED-02 testability"

requirements-completed:
  - ED-01
  - ED-02

# Metrics
duration: 8min
completed: 2026-05-20
---

# Phase 2 Plan 01: GrapesJS Packages + Vietnamese Mock Data Summary

**grapesjs@0.22.x and @grapesjs/react@2.x installed; lib/mockBlock.ts exports a three-component Vietnamese marketing banner (h2 + p + button) for GrapesJS loadProjectData()**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-20T16:15:00Z
- **Completed:** 2026-05-20T16:23:36Z
- **Tasks:** 2 of 2
- **Files modified:** 3 (package.json, package-lock.json, lib/mockBlock.ts)

## Accomplishments

- Installed grapesjs@^0.22.16 and @grapesjs/react@^2.0.0 — both use built-in TypeScript types (no @types/grapesjs needed or installed)
- Discovered and documented @grapesjs/react's actual export API for Wave 2 executors (see "Key Finding" below)
- Created lib/mockBlock.ts with valid GrapesJS 0.22 project data format — three draggable Vietnamese-text siblings for ED-02 testing
- npm run build exits 0 after both tasks

## Key Finding for Wave 2 Executors (02-02-PLAN.md)

**@grapesjs/react export name:** The component is exported as `Editor` (named export) AND as the default export.

```typescript
// Option A: Named import
import { Editor } from '@grapesjs/react'

// Option B: Default import  
import Editor from '@grapesjs/react'
```

The context file (02-CONTEXT.md, D-04) mentions `<GjsEditor>` — **this is incorrect for @grapesjs/react v2**. The actual component name is `Editor`. Wave 2 must use `Editor` not `GjsEditor`.

Additional exports from @grapesjs/react v2:
- `Canvas` — standalone canvas component
- `useEditor` — hook to access editor instance from child components
- `WithEditor` — HOC for editor access
- `useEditorMaybe` — hook that returns null if no editor in context

The `Editor` component accepts an `onEditor` callback prop (from `EditorProps` in `EditorInstance.d.ts`).

## Task Commits

Each task was committed atomically:

1. **Task 1: Install grapesjs and @grapesjs/react** - `29e725c` (chore)
2. **Task 2: Create lib/mockBlock.ts** - `52abc62` (feat)

## Files Created/Modified

- `lib/mockBlock.ts` — GrapesJS project data constant; exports MOCK_BLOCK with wrapper → section → [h2, p, button] structure; Vietnamese copy hardcoded per D-10; no images; `as const` typed
- `package.json` — Added grapesjs and @grapesjs/react to dependencies
- `package-lock.json` — Updated with 12 new packages added by the install

## Decisions Made

- Used `as const` on MOCK_BLOCK (TypeScript infers shape without needing GrapesJS type imports — cleaner, avoids import dependency before GrapesEditor.tsx exists)
- Vietnamese text matches D-10 exactly: h2="Tiêu đề quảng cáo chính", p="Mô tả sản phẩm với nội dung tiếng Việt của bạn tại đây.", button="Mua ngay"
- kebab-case property names used throughout style objects (required by GrapesJS, not camelCase like React styles)
- Three children are direct siblings inside section (not nested) — this is the critical structural requirement for ED-02 drag-reorder testability

## Deviations from Plan

None — plan executed exactly as written. The context file (D-04) mentioned `GjsEditor` component name but this is a documentation artifact from an earlier draft; the actual installed v2 package exports `Editor`. This is documented as a key finding, not a deviation requiring a fix (no code changes were affected — lib/mockBlock.ts has no component imports).

## Issues Encountered

None. npm install completed cleanly (12 packages added). `backbone-undo@0.2.6` deprecation warning appeared but is a transitive dependency of grapesjs with no alternative — acceptable for Phase 2.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced in this plan. lib/mockBlock.ts is a static constant — no user input flows through it (T-02-01: accept disposition confirmed). Packages installed from well-known GrapesJS GitHub org (T-02-SC: mitigate disposition confirmed).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Wave 2 (02-02-PLAN.md) can now:
- Import `{ Editor }` from `@grapesjs/react` (not `GjsEditor`)
- Import `{ MOCK_BLOCK }` from `@/lib/mockBlock` for `editor.loadProjectData(MOCK_BLOCK)`
- Use `import type { Editor as GrapesEditor } from 'grapesjs'` for the `useRef` type
- All TypeScript types from grapesjs are available via the package's built-in definitions

No blockers. GrapesJS type definitions are available for Wave 2 components to import.

---
*Phase: 02-grapesjs-editor-shell*
*Completed: 2026-05-20*
