# Phase 6: UI Polish + Vietnamese Localization — Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 6 is a polish-only pass across the complete user journey. It does not add new features or API routes. Scope is: (1) translate all remaining English UI strings to Vietnamese, (2) improve visual consistency and login page branding, (3) replace native window.confirm() dialogs with a reusable modal component, and (4) add explicit loading/disabled/error states where they are currently missing or misleading. Every change is front-end only — no new models, no new API routes, no auth changes.

</domain>

<decisions>
## Implementation Decisions

### Vietnamese String Translations
- **D-01:** `Undo` → `Hoàn tác`, `Redo` → `Làm lại` in TopBar. Standard Vietnamese terms used by Google Docs and Office.
- **D-02:** `Desktop` → `Máy tính`, `Mobile` → `Di động` in TopBar device toggle buttons.
- **D-03:** `Copy HTML` button → `Sao chép HTML`. Consistent with the existing success toast text "Sao chép thành công!".
- **D-04:** App name `AI Content Booster` stays English in the TopBar (product brand name — not translated).
- **D-05:** All `title` tooltip attributes on TopBar buttons translated to Vietnamese: `Hoàn tác (Ctrl+Z)`, `Làm lại (Ctrl+Y)`, `Xem trước màn hình máy tính`, `Xem trước màn hình di động (390px)`, `Sao chép mã HTML đã chuẩn hóa CSS`.

### Visual Design
- **D-06:** Login page: add `AI Content Booster` heading (text-2xl font-bold) + tagline above the existing white card. Keep the same card layout — no structural changes.
- **D-07:** Login page tagline: `Tạo khối nội dung HTML chuẩn chất từ mô tả tiếng Việt` (describes the tool in one sentence).
- **D-08:** Color palette stays neutral blue/gray (blue-600 primary, gray-600 secondary). Phase 6 focuses on *consistency*: unify border radius (use `rounded-lg` throughout), normalize spacing, improve typography weight/sizing.
- **D-09:** TopBar app name: increase font size from `text-sm` to `text-base` and weight from `font-semibold` to `font-bold`. No icon or logo asset needed.

### Confirmation Dialogs
- **D-10:** Replace both `window.confirm()` calls in HistoryPanel with a single reusable `ConfirmModal` component (`components/ui/ConfirmModal.tsx`). Tailwind-only (no library). Semi-transparent backdrop, centered white card, two buttons.
- **D-11:** Re-open modal (triggered when canvas is dirty): title `Thay thế nội dung hiện tại?`, sub-text `Thay đổi chưa lưu sẽ bị mất.`, confirm button `Thay thế` (blue, primary), cancel button `Hủy` (gray).
- **D-12:** Delete modal: title `Xóa khối này?`, sub-text `Hành động này không thể hoàn tác.`, confirm button `Xóa` (red, destructive `bg-red-600`), cancel button `Hủy` (gray).
- **D-13:** ConfirmModal accepts props: `isOpen: boolean`, `title: string`, `subText?: string`, `confirmLabel: string`, `confirmVariant: 'primary' | 'danger'`, `onConfirm: () => void`, `onCancel: () => void`. Backdrop click triggers `onCancel`. No portal needed — render at end of HistoryPanel JSX.

### Loading & Disabled States
- **D-14:** Canvas loading state: `GrapesEditor` (`dynamic(() => import(...), { ssr: false, loading: () => <LoadingCanvas /> })`) or the EditorClientWrapper passes a `loading` prop to show a centered spinner with text `Đang tải trình soạn thảo...` while the dynamic component resolves.
- **D-15:** Undo/Redo disabled state: after editor mounts, subscribe to `editor.on('undo redo', ...)` (or `editor.UndoManager` change event) to track `canUndo`/`canRedo` state in TopBar. Disable buttons and apply `opacity-40 cursor-not-allowed` when stack is empty.
- **D-16:** Clipboard error feedback: add `copyError: boolean` state to TopBar alongside existing `copied: boolean`. When `navigator.clipboard.writeText()` throws, set `copyError(true)` and clear after 3s. Show red error toast: `Không thể sao chép. Vui lòng thử lại.` (same position/style as success toast, red variant).
- **D-17:** HistoryPanel fetch error state: add `fetchError: boolean` state. When `fetch('/api/projects')` throws or returns non-ok, set `fetchError(true)`. Show error message `Đã xảy ra lỗi khi tải lịch sử. Vui lòng làm mới trang.` in place of the empty-state message.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Success Criteria
- `.planning/ROADMAP.md` §Phase 6 — 4 success criteria (all user-facing strings Vietnamese; consistent visual style; all loading/error/empty states have Vietnamese feedback; editor layout coherent at 1280px+)
- `CLAUDE.md` — Zero-JS output constraint, no new API routes or DB changes in this phase

### Files Phase 6 Modifies
- `components/editor/TopBar.tsx` — button labels, tooltips, app name size, Undo/Redo disabled state, clipboard error toast
- `components/editor/HistoryPanel.tsx` — replace window.confirm() with ConfirmModal, add fetch error state
- `components/editor/GrapesEditor.tsx` — add canvas loading state (or via next/dynamic loading prop)
- `components/editor/EditorClientWrapper.tsx` — wire canvas loading state if needed
- `components/auth/LoginRegisterCard.tsx` — add app name heading + tagline above card

### New Files Phase 6 Creates
- `components/ui/ConfirmModal.tsx` — reusable confirm modal (Tailwind-only, no library)

### Prior Phase Decisions That Phase 6 Fulfills
- Phase 4 `D-10`: "Copy HTML" button stays English for Phase 4; Phase 6 translates → **"Sao chép HTML"**
- Phase 4 `D-07`: Clipboard failure silent in v1; Phase 6 adds error toast → **D-16**
- Phase 5 `D-11`: window.confirm for re-open; Phase 6 replaces → **D-10, D-11**
- Phase 5 `D-12`: window.confirm for delete; Phase 6 replaces → **D-10, D-12**
- Phase 5 `D-13`: Phase 6 audits and finalizes all Vietnamese strings → **D-01 through D-05**

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/editor/TopBar.tsx:copied` state + toast JSX — pattern to follow for `copyError` toast (D-16)
- `components/editor/HistoryPanel.tsx:loading` state pattern — extend to `fetchError` state (D-17)
- GrapesJS `editor.UndoManager` — has `.hasUndo()` and `.hasRedo()` methods; listen on `editor.on('change:undoManager', cb)` or the `undo`/`redo` events for reactivity

### Established Patterns
- Toast pattern: `fixed bottom-6 left-1/2 -translate-x-1/2` with `role="status"` — already in TopBar; reuse for error toast with red variant
- Dynamic import loading: `next/dynamic` accepts `loading: () => <JSX />` as third option — use for canvas loading placeholder
- All `'use client'` components use local `useState` for UI state — no global store

### Integration Points
- `ConfirmModal` renders inside `HistoryPanel` at end of JSX — no portal, simple conditional render
- Canvas loading state: managed via `next/dynamic`'s built-in `loading` prop in `EditorClientWrapper.tsx`
- Undo/Redo state: TopBar receives `editorRef` — call `editorRef.current?.UndoManager.hasUndo()` after `onEditor` fires; subscribe to change events to keep in sync

</code_context>

<specifics>
## Specific Ideas

- Login page branding: heading `AI Content Booster` (text-2xl font-bold text-gray-900), tagline `Tạo khối nội dung HTML chuẩn chất từ mô tả tiếng Việt` (text-sm text-gray-500), both centered above the white card
- Canvas loading placeholder: keep it simple — a centered `<div>` with a `Loader2` spinner (already used in PromptBar) + `Đang tải trình soạn thảo...` text in gray-400
- Toast variants (success vs error): success stays `bg-green-600`, error uses `bg-red-600`

</specifics>

<deferred>
## Deferred Ideas

- Split-layout login page (brand panel + form) → v2 visual refresh
- Brand accent color change (indigo/violet swap) → v2 if user testing shows need
- Fallback textarea for clipboard when HTTPS unavailable → v2
- Undo/Redo keyboard shortcut hints in tooltips beyond Ctrl+Z/Y → v2

</deferred>

---

*Phase: 6 — UI Polish + Vietnamese Localization*
*Context gathered: 2026-05-22*
