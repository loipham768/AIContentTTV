---
phase: "06"
plan: "01"
subsystem: ui-polish
tags: [vietnamese-localization, topbar, login-page, loading-state, undo-redo]
dependency_graph:
  requires: []
  provides: [translated-topbar, login-branding, canvas-loading-placeholder, undo-redo-disabled-state, clipboard-error-toast]
  affects: [components/editor/TopBar.tsx, components/editor/EditorClientWrapper.tsx, components/auth/LoginRegisterCard.tsx]
tech_stack:
  added: []
  patterns: [lucide-react Loader2 spinner reuse, UndoManager event subscription, next/dynamic loading prop]
key_files:
  modified:
    - components/editor/TopBar.tsx
    - components/editor/EditorClientWrapper.tsx
    - components/auth/LoginRegisterCard.tsx
decisions:
  - "TopBar buttons translated to Vietnamese: Hoàn tác, Làm lại, Máy tính, Di động, Sao chép HTML"
  - "UndoManager event subscription via editor.on('undo redo update') keeps canUndo/canRedo in sync"
  - "Canvas loading placeholder reuses Loader2 from lucide-react (already a dependency via PromptBar)"
  - "editorInstance state in EditorClientWrapper passes mounted editor instance to TopBar as prop"
  - "Login page flex-col wrapper moves max-w-md to outer container so heading and card stay aligned"
metrics:
  duration_minutes: 12
  completed_date: "2026-05-22"
  tasks_completed: 3
  tasks_total: 3
---

# Phase 6 Plan 01: Wave 1 UI Polish — Vietnamese Labels, Disabled States, Login Branding Summary

**One-liner:** Vietnamese UI translations, Undo/Redo disabled state via UndoManager events, clipboard error toast, canvas loading spinner, and login page branding heading — all in three files with zero new dependencies.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Rewrite TopBar.tsx — translations, typography, Undo/Redo disabled state, clipboard error toast | 25ca9ed | components/editor/TopBar.tsx |
| 2 | Rewrite EditorClientWrapper.tsx — editorInstance state + canvas loading placeholder | e2ded9d | components/editor/EditorClientWrapper.tsx |
| 3 | Update LoginRegisterCard.tsx — add app name heading and tagline above card | b16c742 | components/auth/LoginRegisterCard.tsx |

## What Was Built

### Task 1 — TopBar.tsx (D-01 through D-05, D-09, D-15, D-16)

- Button labels translated: `Undo` → `Hoàn tác`, `Redo` → `Làm lại`, `Desktop` → `Máy tính`, `Mobile` → `Di động`, `Copy HTML` → `Sao chép HTML`
- All `title` tooltip attributes translated to Vietnamese
- App name typography changed from `text-sm font-semibold` to `text-base font-bold`
- `canUndo` / `canRedo` boolean state added, subscribed to `editor.on('undo redo update', cb)` with cleanup on unmount
- Undo/Redo buttons have `disabled={!canUndo/canRedo}` and `opacity-40 cursor-not-allowed` when stack is empty
- `copyError` state added; catch block in `handleCopyHtml` now triggers a red Vietnamese toast instead of silently failing
- Local variable in `handleCopyHtml` renamed from `editor` to `ed` to avoid shadowing the `editor` prop

### Task 2 — EditorClientWrapper.tsx (D-14, D-15)

- `editorInstance` state (`useState<Editor | null>(null)`) added
- `handleEditor` now calls both `editorRef.current = editor` and `setEditorInstance(editor)`
- `editor={editorInstance}` prop passed to TopBar so UndoManager subscription fires after mount
- `Loader2` from `lucide-react` imported; `GrapesEditor` dynamic import gains a `loading` prop rendering a centered spinner with `Đang tải trình soạn thảo...` text in gray-400

### Task 3 — LoginRegisterCard.tsx (D-06, D-07, D-08)

- Outer wrapper changed from single `max-w-md` card to `flex flex-col items-center gap-6 w-full max-w-md px-4` container
- `<div class="text-center">` added above white card: `<h1>` with `text-2xl font-bold text-gray-900` containing "AI Content Booster" and `<p>` with `text-sm text-gray-500` containing tagline "Tạo khối nội dung HTML chuẩn chất từ mô tả tiếng Việt"
- White card becomes `w-full` (fills the container); all form logic unchanged
- Email placeholder changed from `you@example.com` to `email@example.com`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all changes are complete UI updates with no placeholder data.

## Threat Flags

None — this plan modifies only front-end UI components; no new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Verification Results

All 8 plan verification criteria passed:

1. `npx tsc --noEmit` — zero errors
2. `grep` — all five translated labels present in TopBar.tsx
3. `grep` — `text-base font-bold` present in TopBar.tsx
4. `grep` — `canUndo`, `canRedo`, `UndoManager` present in TopBar.tsx
5. `grep` — `copyError`, `Không thể sao chép` present in TopBar.tsx
6. `grep` — `editorInstance`, `setEditorInstance` present in EditorClientWrapper.tsx
7. `grep` — `Đang tải trình soạn thảo` present in EditorClientWrapper.tsx
8. `grep` — `AI Content Booster`, `Tạo khối nội dung` present in LoginRegisterCard.tsx

## Self-Check: PASSED

- components/editor/TopBar.tsx — FOUND
- components/editor/EditorClientWrapper.tsx — FOUND
- components/auth/LoginRegisterCard.tsx — FOUND
- commit 25ca9ed — FOUND
- commit e2ded9d — FOUND
- commit b16c742 — FOUND
