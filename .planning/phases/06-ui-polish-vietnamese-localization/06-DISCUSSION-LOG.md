# Phase 6: UI Polish + Vietnamese Localization — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-22
**Phase:** 6 — UI Polish + Vietnamese Localization
**Areas discussed:** Vietnamese string audit, Visual design direction, Confirmation dialogs, Loading & disabled states

---

## Vietnamese String Audit

### Undo / Redo translation

| Option | Description | Selected |
|--------|-------------|----------|
| Hoàn tác / Làm lại | Standard Vietnamese tech terms used by Google Docs, Word, and most software | ✓ |
| Hủy / Redo | Vietnamese only for Undo, keep Redo in English | |
| Keep English (Undo / Redo) | Familiar standard software terms | |

**User's choice:** Hoàn tác / Làm lại
**Notes:** Standard terms, widely understood.

---

### Desktop / Mobile translation

| Option | Description | Selected |
|--------|-------------|----------|
| Máy tính / Di động | Standard Vietnamese — 'Máy tính' means computer/desktop, 'Di động' means mobile | ✓ |
| Desktop / Mobile | Keep English — recognizable tech terms | |
| PC / Điện thoại | Colloquial Vietnamese, informal | |

**User's choice:** Máy tính / Di động

---

### Copy HTML translation + App name

| Option | Description | Selected |
|--------|-------------|----------|
| Sao chép HTML + keep app name English | Consistent with existing toast text; app name stays as product brand | ✓ |
| Sao chép mã HTML + keep app name English | More descriptive — 'mã HTML' clarifies it's markup being copied | |
| Copy HTML + keep app name English | Keep as technical term | |

**User's choice:** Sao chép HTML; app name "AI Content Booster" stays English.

---

### Tooltip translation

| Option | Description | Selected |
|--------|-------------|----------|
| Translate tooltips to Vietnamese too | Consistent experience matching button labels | ✓ |
| Keep English tooltips | Developer-familiar Ctrl+Z wording is clear regardless | |

**User's choice:** Translate all title tooltips to Vietnamese.

---

## Visual Design Direction

### Login page structure

| Option | Description | Selected |
|--------|-------------|----------|
| Add app name + tagline above the card | Keep card layout, add heading + one-line Vietnamese tagline above. Minimal lift. | ✓ |
| Split-layout (left brand panel, right form) | Left panel with brand color + value prop; more work | |
| Keep minimal — just polish the card styling | No new layout — focus on polish | |

**User's choice:** Add "AI Content Booster" heading + tagline above the card.

---

### Tagline text

| Option | Description | Selected |
|--------|-------------|----------|
| Tạo khối nội dung HTML chuẩn chất từ mô tả tiếng Việt | Direct and practical, describes exactly what the tool does | ✓ |
| Công cụ tạo nội dung thương mại bằng AI | Broader brand positioning | |
| Let Claude write during planning | Skip — planner drafts options | |

**User's choice:** "Tạo khối nội dung HTML chuẩn chất từ mô tả tiếng Việt"

---

### Color palette

| Option | Description | Selected |
|--------|-------------|----------|
| Stay neutral blue/gray — just improve consistency | Professional CMS-tool-appropriate palette; unify border radius, spacing, typography | ✓ |
| Adopt indigo or violet as brand accent | More distinctive than generic blue | |
| Let Claude decide during planning | Skip this decision | |

**User's choice:** Stay neutral blue/gray; improve consistency.

---

### TopBar branding

| Option | Description | Selected |
|--------|-------------|----------|
| Keep 'AI Content Booster' as plain text, improve font weight/size | Semibold → bold, slightly larger. No logo asset needed. | ✓ |
| Add simple icon/emoji prefix | Unicode icon as visual anchor | |
| Leave it exactly as-is | Focus effort elsewhere | |

**User's choice:** Improve font weight/size (text-base font-bold).

---

## Confirmation Dialogs

### Dialog type to replace window.confirm()

| Option | Description | Selected |
|--------|-------------|----------|
| Simple inline modal overlay | Centered dialog, dark backdrop, Tailwind-only, one reusable ConfirmModal component | ✓ |
| Inline confirmation in panel row | Expand item row to show confirm/cancel inline | |
| Keep window.confirm() | Native dialog already works with Vietnamese text | |

**User's choice:** Reusable ConfirmModal component with backdrop overlay.

---

### Re-open modal text

| Option | Description | Selected |
|--------|-------------|----------|
| Thay thế nội dung hiện tại? + sub-text: Thay đổi chưa lưu sẽ bị mất. Buttons: Thay thế (blue) + Hủy (gray) | Clear data-loss warning | ✓ |
| Mở khối này sẽ xóa thay đổi hiện tại. Tiếp tục? | Single sentence, direct | |

**User's choice:** "Thay thế nội dung hiện tại?" / "Thay đổi chưa lưu sẽ bị mất." / buttons: "Thay thế" (blue) + "Hủy" (gray)

---

### Delete modal text

| Option | Description | Selected |
|--------|-------------|----------|
| Xóa khối này? + sub-text: Hành động này không thể hoàn tác. Buttons: Xóa (red) + Hủy (gray) | Red destructive button signals irreversibility | ✓ |
| Bạn có chắc muốn xóa khối này? Buttons: Xác nhận (red) + Không (gray) | Conversational phrasing | |

**User's choice:** "Xóa khối này?" / "Hành động này không thể hoàn tác." / buttons: "Xóa" (red) + "Hủy" (gray)

---

## Loading & Disabled States

### Canvas loading state

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — centered spinner + 'Đang tải trình soạn thảo...' while GrapesJS initializes | Removes blank-screen state, improves perceived performance | ✓ |
| No — GrapesJS mounts fast enough in practice | Skip | |

**User's choice:** Add canvas loading state.

---

### Undo/Redo disabled state

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — check UndoManager and disable buttons when stack is empty | Standard editor behavior; uses editor.UndoManager.hasUndo()/hasRedo() | ✓ |
| No — keep always clickable (silently no-ops) | Simpler code, no event subscription | |

**User's choice:** Add disabled state using UndoManager subscription.

---

### Clipboard error feedback

| Option | Description | Selected |
|--------|-------------|----------|
| Show error toast: 'Không thể sao chép. Vui lòng thử lại.' | Consistent with success toast pattern already in place | ✓ |
| Show fallback textarea with HTML | Fully functional but complex | |
| Keep silent fail | Clipboard failure is rare on modern browsers | |

**User's choice:** Red error toast on clipboard failure.

---

### HistoryPanel fetch error state

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — show 'Đã xảy ra lỗi khi tải lịch sử. Vui lòng làm mới trang.' | Prevents misleading empty-state message on actual error | ✓ |
| Keep current behavior — empty list on error | Errors rare in production | |

**User's choice:** Add explicit error state to HistoryPanel fetch.

---

## Claude's Discretion

- None — all gray areas were decided by the user.

## Deferred Ideas

- Split-layout login page (brand panel + form) → v2 visual refresh
- Brand accent color change (indigo/violet) → v2 if user testing suggests need
- Clipboard fallback textarea for non-HTTPS contexts → v2
- Undo/Redo tooltip keyboard shortcut hints beyond Ctrl+Z/Y → v2
