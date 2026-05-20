# Phase 2: GrapesJS Editor Shell - Context

**Gathered:** 2026-05-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 delivers a fully functional visual editor canvas at `/editor` with hardcoded Vietnamese mock content. A user can double-click text to edit it inline, drag components to reorder, undo/redo edits via keyboard shortcuts and toolbar buttons, and toggle between Desktop and Mobile preview modes. No AI integration, no save/load — just the canvas shell that Phases 3–6 build on.

</domain>

<decisions>
## Implementation Decisions

### Editor Page Layout
- **D-01:** Page structure: fixed top bar + full-height GrapesJS canvas + fixed bottom prompt bar placeholder.
  ```
  +--------------------------------------------+
  | TOOLBAR (email, Undo, Redo, Desktop, Mobile, Logout) |
  +--------------------------------------------+
  |           GrapesJS Canvas (full width)     |
  +--------------------------------------------+
  |  [Prompt input placeholder - Phase 3]      |
  +--------------------------------------------+
  ```
- **D-02:** The prompt input area is a Phase 3 placeholder — render a disabled textarea + greyed-out "Generate" button in Phase 2 so the layout slot is reserved and the structure doesn't change in Phase 3.
- **D-03:** Top toolbar is a custom React component (`components/editor/TopBar.tsx`) using Tailwind. It receives an `editorRef` and calls GrapesJS commands via the imperative ref. No GrapesJS built-in panel HTML in the page.

### GrapesJS Integration
- **D-04:** Use `@grapesjs/react` (official React wrapper). Mount via `<GjsEditor>` component with `onEditor` callback to capture the editor instance into a React ref.
- **D-05:** GrapesJS canvas only — all built-in panels disabled:
  - `storageManager: false` (no auto-save, no REST storage)
  - `blockManager: { appendTo: '#gjs-hidden-blocks' }` (block panel hidden)
  - `layerManager: { appendTo: '#gjs-hidden-layers' }` (layer panel hidden)
  - `styleManager: false` (style panel hidden)
  - `panels: { defaults: [] }` (no GrapesJS built-in panel buttons)
- **D-06:** No GrapesJS plugins in Phase 2. `grapesjs-blocks-basic` and other plugins are deferred to v2 or Phase 6.
- **D-07:** GrapesJS component is dynamically imported with `ssr: false` (CLAUDE.md mandatory rule). File: `components/editor/GrapesEditor.tsx` — marked `'use client'`.

### Mock Content
- **D-08:** Load a Vietnamese marketing banner with 3 draggable components: heading (`h2`), paragraph, and a button. All three must be individually selectable and draggable to verify ED-02 (drag to reorder).
- **D-09:** Mock content loaded via `editor.loadProjectData(MOCK_BLOCK)` in the `onEditor` callback. The mock JSON is a constant exported from `lib/mockBlock.ts`. This matches the pattern Phase 3 will use when AI-generated JSON replaces mock JSON.
- **D-10:** Vietnamese content for the mock block:
  - Heading: `"Tiêu đề quảng cáo chính"`
  - Paragraph: `"Mô tả sản phẩm với nội dung tiếng Việt của bạn tại đây."`
  - Button: `"Mua ngay"`

### Responsive Preview
- **D-11:** Desktop/Mobile toggle: two buttons in `TopBar` calling `editor.setDevice('Desktop')` / `editor.setDevice('Mobile')` via the editor ref. React `useState` tracks active device for button highlight.
- **D-12:** Mobile preview width: `390px` (iPhone 14 standard — most common Vietnamese mobile viewport in 2025–2026).
- **D-13:** GrapesJS device manager configured with exactly two devices: `Desktop` (no width constraint, default) and `Mobile` (390px, `widthMedia: '480px'` breakpoint).

### Undo / Redo
- **D-14:** Both toolbar buttons AND keyboard shortcuts. Ctrl+Z / Ctrl+Y are wired automatically by GrapesJS's built-in UndoManager. Toolbar buttons in `TopBar` call `editor.runCommand('core:undo')` / `editor.runCommand('core:redo')` explicitly — visible and discoverable.

### Architecture Constraints (Inherited)
- **D-15:** `auth()` from `@/auth` guards `/editor` server component — existing pattern from Phase 1.
- **D-16:** No `export const runtime = 'nodejs'` needed for Phase 2 (no new API routes with DB access).
- **D-17:** GrapesJS editor instance stored in a `useRef<grapesjs.Editor | null>` in the parent `EditorPage` (or a `'use client'` wrapper component), passed down to `TopBar` as `editorRef`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Success Criteria
- `.planning/REQUIREMENTS.md` — ED-01, ED-02, ED-03, ED-04 with detailed acceptance criteria (the canonical checklist for what Phase 2 must deliver)
- `.planning/ROADMAP.md` §Phase 2 — Goal, success criteria, depends-on Phase 1

### Architecture Rules
- `CLAUDE.md` — Architecture constraints: `dynamic({ ssr: false })` for GrapesJS (MANDATORY), `auth()` vs `getServerSession()`, MongoDB singleton pattern (no new DB routes in Phase 2 but patterns must be consistent)

### Prior Phase Decisions
- `.planning/phases/01-auth-database-foundation/01-CONTEXT.md` — Auth patterns established in Phase 1: `auth()` usage, `/editor` as the protected workspace, `LogoutButton` component location

### Stack Decisions (if docs exist)
- `.planning/research/STACK.md` — Full stack decisions including `@grapesjs/react` dynamic import pattern (read before implementing GrapesJS wrapper)
- `.planning/research/PITFALLS.md` — Critical pitfalls including GrapesJS SSR crash (P-GJS-01 or equivalent)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/auth/LogoutButton.tsx` — Already exists; render it in `TopBar` next to user email
- `app/editor/page.tsx` — Stub page with auth guard (`auth()` + `redirect('/login')`) and user email display. Phase 2 replaces the stub content, keeps the auth guard pattern.
- `app/layout.tsx` — Root layout with Geist font + Tailwind. No changes needed — editor page renders within it.

### Established Patterns
- Server Component auth guard: `const session = await auth(); if (!session) redirect('/login')` — use this in `EditorPage`.
- `'use client'` boundary: GrapesJS component must be client-only. The page itself is a Server Component; the editor wrapper is a Client Component.
- Tailwind CSS 4 utility classes — Phase 1 uses minimal styling; Phase 2 adds only what's needed for layout (flexbox, full-height canvas).

### Integration Points
- `app/editor/page.tsx` is the Phase 2 target — replace stub with real layout
- Phase 3 will call a new API route (`/api/generate`) and inject returned JSON via `editor.loadProjectData()` — Phase 2's `onEditor` callback pattern must be designed to accept this injection
- `lib/mockBlock.ts` (new in Phase 2) becomes `lib/aiBlock.ts` equivalent in Phase 3

### New Files This Phase
- `components/editor/GrapesEditor.tsx` — `'use client'`, dynamically imports grapesjs, exposes `onEditor` callback
- `components/editor/TopBar.tsx` — Custom React toolbar with undo/redo + device toggle + user email + LogoutButton
- `lib/mockBlock.ts` — Hardcoded Vietnamese banner JSON for GrapesJS `loadProjectData()`

</code_context>

<specifics>
## Specific Ideas

- The bottom prompt bar placeholder should visually look like the real thing (textarea + button) but be disabled/greyed out with a label like `"Nhập prompt — sẽ khả dụng sau"` so designers reviewing Phase 2 can see the full layout intent.
- Mobile preview (390px) should be visually obvious — perhaps the canvas area shows a phone-frame outline or the canvas constrains within a centered 390px container with grey space on either side.
- The mock Vietnamese banner is deliberately simple — no images. This avoids BSON base64 concerns (Phase 5) and keeps Phase 2 focused on canvas mechanics.

</specifics>

<deferred>
## Deferred Ideas

- **Block manager sidebar** — drag-in blocks panel deferred to v2. Phase 2 canvas only.
- **Style manager panel** — color/font editing via GrapesJS panel deferred to Phase 6 polish.
- **grapesjs-blocks-basic plugin** — adds default block types; not needed until Phase 3+ when AI output defines the block structure.
- **Right-click context menu** — GrapesJS has one by default; Phase 6 to decide whether to keep or remove.

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-GrapesJS Editor Shell*
*Context gathered: 2026-05-20*
