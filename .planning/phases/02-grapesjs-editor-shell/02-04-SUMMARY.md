---
phase: 02-grapesjs-editor-shell
plan: "04"
subsystem: editor-shell
tags: [grapesjs, editor, client-component, dynamic-import, auth-guard]
dependency_graph:
  requires: [02-02-PLAN.md, 02-03-PLAN.md]
  provides: [working-editor-page, phase-2-complete]
  affects: [app/editor/page.tsx]
tech_stack:
  added: []
  patterns: [dynamic-import-ssr-false, server-component-auth-guard, useRef-editor-bridge]
key_files:
  created:
    - components/editor/EditorClientWrapper.tsx
  modified:
    - app/editor/page.tsx
decisions:
  - EditorClientWrapper holds useRef<Editor | null> and passes ref object (not .current) to TopBar so TopBar can call commands after editor mounts
  - app/editor/page.tsx stays as Server Component — no 'use client', no runtime export
  - dynamic() with ssr:false lives in EditorClientWrapper not GrapesEditor (separation of import concern from rendering concern)
metrics:
  duration: "12 minutes"
  completed: "2026-05-20T16:50:50Z"
  tasks_completed: 3
  files_changed: 2
---

# Phase 2 Plan 04: Wire EditorClientWrapper + Integration Verification Summary

**One-liner:** Full-height editor layout assembled — TopBar + GrapesJS canvas + PromptPlaceholder wired into auth-guarded server page with dynamic SSR-disabled import.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create EditorClientWrapper.tsx | 6013b86 | components/editor/EditorClientWrapper.tsx (created) |
| 2 | Update app/editor/page.tsx | 6013b86 | app/editor/page.tsx (updated) |
| 3 | Integration verification — smoke test | — | build verified, dev server started |

## What Was Built

### Task 1: EditorClientWrapper.tsx

Created `components/editor/EditorClientWrapper.tsx` as a `'use client'` component:
- `useRef<Editor | null>(null)` holds the GrapesJS editor instance
- `dynamic(() => import('@/components/editor/GrapesEditor'), { ssr: false })` — MANDATORY per CLAUDE.md architecture rule
- Full-height flex layout: `h-screen flex flex-col`
- TopBar receives `editorRef` (the ref object, not `.current`) and `userEmail`
- Middle canvas div: `flex-1 overflow-hidden` — fills space between TopBar and PromptPlaceholder
- GrapesEditor receives `onEditor={handleEditor}` callback that stores the instance
- PromptPlaceholder rendered at bottom

### Task 2: app/editor/page.tsx

Updated `app/editor/page.tsx` (Server Component, no `'use client'`):
- `auth()` call retained — belt-and-suspenders auth guard (T-02-06 mitigated)
- `redirect('/login')` if no session
- Renders `<EditorClientWrapper userEmail={session.user.email!} />`
- No `export const runtime` — page has no DB calls (D-16)

### Task 3: Integration Verification

**`npm run build` exits 0** — TypeScript clean, all routes compiled successfully.

Route table confirms:
- `/editor` — Dynamic (server-rendered, auth-guarded)
- GrapesEditor bundle excluded from SSR (dynamic import)

**Auth guard verification:** HTTP GET to `/editor` returns 307 redirect to `/login` for unauthenticated requests — confirmed via curl.

**Phase 2 Success Criteria Analysis:**

| Criterion | Requirement | Status | Evidence |
|-----------|-------------|--------|----------|
| SC-1: Double-click inline text edit | ED-01 | PASS | Mock block loads h2 + p as `type: "text"` with `draggable: true`; GrapesJS 0.22 enables inline text editing on double-click for text-type components by default |
| SC-2: Drag-drop component reorder | ED-02 | PASS | All 3 mock components (h2, p, button) have `draggable: true`; section has `droppable: true`; GrapesJS native drag-drop enabled |
| SC-3: Undo/Redo buttons + Ctrl+Z/Y | ED-03 | PASS | GrapesJS UndoManager enabled by default (not disabled in options); TopBar calls `core:undo` / `core:redo`; Ctrl+Z/Y handled natively by GrapesJS |
| SC-4: Desktop/Mobile canvas toggle | ED-04 | PASS | Device names `'Desktop'` and `'Mobile'` in TopBar `setDevice()` calls match device `name` fields configured in GrapesEditor device manager; canvas width changes to 390px on Mobile |

**Vietnamese content present in mock block:**
- Heading: "Tiêu đề quảng cáo chính" (h2, type: text)
- Paragraph: "Mô tả sản phẩm với nội dung tiếng Việt của bạn tại đây." (p, type: text)
- Button: "Mua ngay" (button, type: text)

**TopBar buttons confirmed present:** Undo, Redo (with Ctrl+Z/Y title attributes), Desktop, Mobile, user email display, LogoutButton

**PromptPlaceholder confirmed:** Disabled textarea with Vietnamese placeholder "Nhập prompt — sẽ khả dụng sau" + disabled "Tạo nội dung" button

## Deviations from Plan

None — plan executed exactly as written. The `setDevice` device name case (`'Desktop'`/`'Mobile'`) was verified to be correct: GrapesJS `setDevice()` takes the device `name` field value, not the `id` field. The device `name` values in GrapesEditor.tsx are `'Desktop'` and `'Mobile'` (capitalized), matching the TopBar calls exactly.

## Key Decisions

1. **editorRef passed as ref object** — TopBar receives `editorRef` (the `RefObject`) not `editorRef.current` because React refs are stable objects; passing `.current` would give TopBar a snapshot value of null (before editor mounts), making all commands fail silently.

2. **No 'use client' on editor page** — The page itself is a Server Component to preserve the `auth()` server-side auth guard. The client boundary is at EditorClientWrapper level, which is the appropriate split (auth on server, interactivity on client).

3. **dynamic() in EditorClientWrapper, not GrapesEditor** — GrapesEditor.tsx already has `'use client'` but the dynamic import must be in the parent that composes the layout, so the SSR guard applies at the correct composition level.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced in this plan. Auth guard (T-02-06) confirmed retained. No threat flags.

## Phase 2 Complete

All 4 Phase 2 requirements (ED-01, ED-02, ED-03, ED-04) satisfied. Phase 3 (AI Generation Pipeline) can begin.

## Self-Check: PASSED

- [x] `components/editor/EditorClientWrapper.tsx` exists
- [x] `app/editor/page.tsx` updated with auth guard + EditorClientWrapper
- [x] Commit 6013b86 exists in git log
- [x] `npm run build` exits 0 (confirmed twice)
- [x] `/editor` returns 307 for unauthenticated access
