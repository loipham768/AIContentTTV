---
phase: "06"
plan: "02"
subsystem: ui-polish
tags: [confirm-modal, history-panel, vietnamese-localization, window-confirm-removal, fetch-error]
dependency_graph:
  requires: [06-01]
  provides: [ConfirmModal-component, HistoryPanel-modal-ux, HistoryPanel-fetch-error]
  affects: [components/ui/ConfirmModal.tsx, components/editor/HistoryPanel.tsx]
tech_stack:
  added: []
  patterns: [discriminated-union-modal-state, Tailwind-only-modal, conditional-fetch-error-state]
key_files:
  created:
    - components/ui/ConfirmModal.tsx
  modified:
    - components/editor/HistoryPanel.tsx
decisions:
  - "ConfirmModal renders null when isOpen=false — no portal needed, renders at end of HistoryPanel JSX"
  - "Discriminated union ModalState (none/reopen/delete) keeps modal type and target project co-located"
  - "handleOpen sets modalState for reopen only when canvas is dirty; clean canvas loads directly"
  - "handleConfirmDelete clears modal before awaiting fetch to avoid stale modal on slow network"
  - "fetchError state replaces silent empty state on API failure with Vietnamese red error message"
metrics:
  duration_minutes: 8
  completed_date: "2026-05-22"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 6 Plan 02: ConfirmModal + HistoryPanel window.confirm Removal Summary

**One-liner:** Reusable ConfirmModal (Tailwind-only, two variants) replaces both window.confirm() calls in HistoryPanel via a discriminated union state, plus a fetchError state for Vietnamese API error feedback.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Create ConfirmModal.tsx | 77bcc80 | components/ui/ConfirmModal.tsx |
| 2 | Rewrite HistoryPanel.tsx — ConfirmModal integration + fetchError state | 42df384 | components/editor/HistoryPanel.tsx |

## What Was Built

### Task 1 — ConfirmModal.tsx (D-10, D-13)

- New `components/ui/ConfirmModal.tsx` with props: `isOpen`, `title`, `subText?`, `confirmLabel`, `confirmVariant ('primary' | 'danger')`, `onConfirm`, `onCancel`
- Returns `null` when `isOpen` is false — no DOM node rendered when hidden
- Backdrop: `fixed inset-0 z-50 bg-black/50 flex items-center justify-center` — clicking backdrop calls `onCancel`
- Inner card: `bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4` — `stopPropagation()` prevents backdrop click from firing through card
- Confirm button: `bg-blue-600` for `primary` variant, `bg-red-600` for `danger` variant
- Cancel button: `bg-gray-100 text-gray-700` with `Hủy` label
- Tailwind-only, no external library, marked `'use client'`

### Task 2 — HistoryPanel.tsx (D-11, D-12, D-17)

- `ConfirmModal` imported from `@/components/ui/ConfirmModal`
- Discriminated union `ModalState`: `{ type: 'none' } | { type: 'reopen'; project: Project } | { type: 'delete'; project: Project }`
- `modalState` state initialized to `{ type: 'none' }`
- `fetchError: boolean` state added (default false); `useEffect` resets it to false on each refresh
- `useEffect` fetch: `!res.ok` branch sets `setFetchError(true)` and returns `{ projects: [] }`; `.catch()` sets `setFetchError(true)` and `setProjects([])`
- `handleOpen`: when canvas is dirty (`getDirtyCount() > 0`) sets `modalState` to reopen instead of `window.confirm`; clean canvas loads directly
- `handleConfirmReopen`: validates blockData, calls `loadProjectData`, resets modal state
- `handleDelete`: sets `modalState` to delete (was: `window.confirm` + immediate fetch)
- `handleConfirmDelete`: clears modal state first, then awaits DELETE fetch, updates project list or shows alert
- JSX render guards: `!fetchError` gates both empty state and project list render
- Error message: `Đã xảy ra lỗi khi tải lịch sử. Vui lòng làm mới trang.` in `text-red-500` when `fetchError` is true
- Two `ConfirmModal` instances at end of JSX: reopen (primary/blue, `Thay thế`) and delete (danger/red, `Xóa`)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all UI state is fully wired with real handlers.

## Threat Flags

None — this plan modifies only front-end UI components; no new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Verification Results

All 8 plan verification criteria passed:

1. `npx tsc --noEmit` — zero errors (TSC OK)
2. `grep -n "window.confirm" HistoryPanel.tsx` — no matches (PASS)
3. `grep -n "ConfirmModal" HistoryPanel.tsx` — 3 occurrences (import + 2 usages at lines 5, 96, 106)
4. `grep -n "fetchError|Đã xảy ra lỗi" HistoryPanel.tsx` — both present (lines 18, 75, 77, 80, 83)
5. `grep -n "ModalState|type: 'reopen'|type: 'delete'" HistoryPanel.tsx` — discriminated union present
6. `grep -n "Thay thế nội dung|Xóa khối này" HistoryPanel.tsx` — both modal titles present (lines 98, 108)
7. `test -f components/ui/ConfirmModal.tsx` — FILE EXISTS
8. `grep -n "bg-red-600|bg-blue-600" components/ui/ConfirmModal.tsx` — both variants styled (lines 38, 39)

## Self-Check: PASSED

- components/ui/ConfirmModal.tsx — FOUND
- components/editor/HistoryPanel.tsx — FOUND
- commit 77bcc80 — FOUND
- commit 42df384 — FOUND
