---
phase: 05-project-history-persistence
plan: "03"
subsystem: ui
tags: [history-panel, grapesjs, client-component, vietnamese-ui]
dependency_graph:
  requires: [05-01, 05-02]
  provides: [components/editor/HistoryPanel.tsx]
  affects: [components/editor/EditorClientWrapper.tsx]
tech_stack:
  added: []
  patterns: [use-client-component, useEffect-fetch, optimistic-state-update]
key_files:
  created:
    - components/editor/HistoryPanel.tsx
  modified: []
decisions:
  - "refreshKey as useEffect dependency triggers re-fetch after each generation (D-14/D-15)"
  - "getDirtyCount() > 0 check before loadProjectData prevents unsaved canvas clobber (D-11)"
  - "Optimistic state filter after DELETE — no full re-fetch needed on success"
  - "window.confirm for both open and delete confirmations — modal polish deferred to Phase 6 (D-11/D-12)"
  - "Type cast Record<string,unknown> to loadProjectData param via Parameters<typeof editor.loadProjectData>[0] — avoids importing GrapesJS internal type"
metrics:
  duration: "~5 minutes"
  completed: "2026-05-22"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 5 Plan 03: HistoryPanel Sidebar Component Summary

**One-liner:** 'use client' HistoryPanel sidebar that fetches, renders, opens (with dirty-canvas guard), and deletes saved GrapesJS blocks with Vietnamese UI strings.

---

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create components/editor/HistoryPanel.tsx | 7a34ee4 | components/editor/HistoryPanel.tsx |

---

## What Was Built

### components/editor/HistoryPanel.tsx

Fixed-width (`w-72`) right sidebar component with:

- **Fetch on refreshKey**: `useEffect` with `[refreshKey]` dependency calls `GET /api/projects`, stores result in local state. Re-fires whenever `EditorClientWrapper` increments `historyKey` after generation.
- **Loading state**: Shows "Đang tải..." while fetch is in flight.
- **Empty state**: Shows "Chưa có nội dung nào." when no projects returned.
- **Project list**: Each entry shows truncated name, vi-VN formatted date, and two action buttons.
- **Open handler** (T-05-08 mitigated): Calls `editor.getDirtyCount() > 0` before `loadProjectData`. If dirty, shows `window.confirm('Thay thế nội dung hiện tại?')`. Aborts if user cancels.
- **Delete handler** (T-05-09 mitigated): `window.confirm('Xoá khối này?')` then `DELETE /api/projects/:id`. On 200 OK, filters project from local state optimistically.
- **Type safety**: `project.blockData as Parameters<typeof editor.loadProjectData>[0]` casts `Record<string, unknown>` to GrapesJS's expected project data type without importing internal types.

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Threat Model Compliance

All three STRIDE mitigations from the plan's threat register are implemented:

| Threat | Mitigation | Status |
|--------|-----------|--------|
| T-05-08 Tampering (open without confirmation) | getDirtyCount() check + window.confirm before loadProjectData | Applied |
| T-05-09 Tampering (delete without confirmation) | window.confirm('Xoá khối này?') before DELETE fetch | Applied |
| T-05-10 Info Disclosure (blockData shape mismatch) | Type cast mirrors GrapesJS API contract; schema validated at generation time | Applied |

---

## Known Stubs

None — component renders real data from `/api/projects`. No hardcoded empty values that flow to UI rendering.

---

## Threat Flags

None — no new network endpoints. Component only consumes existing GET `/api/projects` and DELETE `/api/projects/:id` endpoints built in 05-01 and 05-02.

---

## Verification Results

1. `npx tsc --noEmit` exits 0 — PASSED
2. `grep -n "refreshKey" components/editor/HistoryPanel.tsx` — useEffect dep on line 30 — PASSED
3. `grep -n "getDirtyCount" components/editor/HistoryPanel.tsx` — line 36 — PASSED
4. `grep -n "Lịch sử" components/editor/HistoryPanel.tsx` — line 55 — PASSED
5. `grep -n "vi-VN" components/editor/HistoryPanel.tsx` — line 78 — PASSED

---

## Self-Check: PASSED

- components/editor/HistoryPanel.tsx — FOUND (created, committed 7a34ee4)
- Commit 7a34ee4 present in git log
