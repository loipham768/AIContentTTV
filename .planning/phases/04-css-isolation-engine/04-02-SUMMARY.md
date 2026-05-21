---
phase: 04-css-isolation-engine
plan: "02"
subsystem: editor-ui
tags: [copy-html, clipboard, toast, topbar, css-isolation]
dependency_graph:
  requires:
    - 04-01  # lib/cssIsolation.ts must exist
  provides:
    - Copy HTML button wired to CSS Isolation Engine
    - Toast notification on successful clipboard write
  affects:
    - components/editor/TopBar.tsx
tech_stack:
  added: []
  patterns:
    - React useState for copied flag
    - navigator.clipboard.writeText async API
    - React fragment for sibling root nodes
key_files:
  created: []
  modified:
    - components/editor/TopBar.tsx
decisions:
  - "editor.getCss() returns string|undefined in GrapesJS types — coerce with ?? '' before passing to isolateCss (which requires string)"
metrics:
  duration: "~5 minutes"
  completed: "2026-05-21"
---

# Phase 4 Plan 02: Copy HTML Button and Toast — Summary

**One-liner:** TopBar wired with "Copy HTML" button that runs isolateCss then writes to clipboard, showing a Vietnamese toast on success.

---

## What Was Done

Updated `components/editor/TopBar.tsx` — single file modification — adding the user-facing clipboard export action:

1. Added `import { isolateCss } from '@/lib/cssIsolation'`
2. Added `copied` state variable (`useState(false)`)
3. Added `handleCopyHtml` async function: calls `isolateCss(editor.getHtml(), editor.getCss() ?? '')`, writes to `navigator.clipboard`, sets `copied=true` for 3 seconds
4. Added "Copy HTML" green button in the right section of the TopBar (before user email)
5. Wrapped the `return` in a React fragment `<>…</>` to render both the bar div and the fixed-position toast as siblings
6. Toast: `role="status"` ARIA live region, "Sao chép thành công!", fixed bottom center, auto-dismisses after 3 s

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript TS2345: `editor.getCss()` returns `string | undefined`**
- **Found during:** Task 1 (first `npx tsc --noEmit` run)
- **Issue:** `isolateCss(html: string, css: string)` requires two `string` arguments, but GrapesJS types declare `getCss()` as returning `string | undefined`
- **Fix:** Changed `editor.getCss()` to `editor.getCss() ?? ''` — empty string fallback is correct (no CSS → inline styles are empty, which is valid)
- **Files modified:** `components/editor/TopBar.tsx` line 21
- **Commit:** 8c9c1ce (same task commit)

---

## Verification Results

All 7 checks passed:

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` exits 0 | PASS |
| `grep isolateCss TopBar.tsx` | PASS — line 6 (import) and line 21 (call) |
| `grep handleCopyHtml TopBar.tsx` | PASS — line 17 (definition) and line 88 (onClick) |
| `grep navigator.clipboard TopBar.tsx` | PASS — line 22 |
| `grep "Sao chép thành công" TopBar.tsx` | PASS — line 104 |
| `grep "Copy HTML" TopBar.tsx` | PASS — lines 85, 92 |
| `grep setCopied TopBar.tsx` | PASS — lines 15, 23, 24 (3 matches) |

---

## Self-Check: PASSED

- `components/editor/TopBar.tsx` exists and contains all required patterns
- Commit 8c9c1ce exists in git log
- No new files created (plan specified single-file modification)
- No regressions to Undo/Redo/Device toggle behavior (all preserved)
- No stubs — all behavior fully wired to real isolateCss + real clipboard API

---

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced.
The clipboard write is client-side only. Threat model T-04-03 (HTML on clipboard) is mitigated
by `isolateCss` stripping scripts before `writeText` — as designed in the plan's threat register.
