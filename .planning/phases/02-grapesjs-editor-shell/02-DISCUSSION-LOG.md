# Phase 2: GrapesJS Editor Shell - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-20
**Phase:** 2-GrapesJS Editor Shell
**Areas discussed:** Editor page layout, GrapesJS panels & plugins, Mock content design, Responsive toggle UX

---

## Editor page layout

### Q1: Overall page structure

| Option | Description | Selected |
|--------|-------------|----------|
| Top bar + full-width canvas | Fixed header row (toolbar) + full-height canvas + bottom prompt area | ✓ |
| Left sidebar + canvas | GrapesJS panels in left sidebar (~280px), canvas takes remaining space | |
| Split: left sidebar + canvas + right panel | Three-column full IDE layout | |

**User's choice:** Top bar + full-width canvas
**Notes:** Chosen for clean SaaS feel, similar to Canva/GrapesJS demo.

---

### Q2: Prompt input placement

| Option | Description | Selected |
|--------|-------------|----------|
| Below the canvas (bottom bar) | Fixed bottom strip with textarea + Generate button | ✓ |
| Above the canvas (top section) | Prompt area between toolbar and canvas | |

**User's choice:** Below the canvas
**Notes:** Natural flow: generate → see result above in canvas.

---

### Q3: Toolbar implementation

| Option | Description | Selected |
|--------|-------------|----------|
| Custom React toolbar (Recommended) | Custom Tailwind component calling editor commands via imperative ref | ✓ |
| GrapesJS built-in panels | GrapesJS panel system for undo/redo/device buttons | |

**User's choice:** Custom React toolbar
**Notes:** Full control over styling, easy to extend in Phase 6.

---

## GrapesJS panels & plugins

### Q1: GrapesJS package

| Option | Description | Selected |
|--------|-------------|----------|
| @grapesjs/react (Recommended) | Official React wrapper with GjsEditor + onEditor callback | ✓ |
| grapesjs vanilla | Mount directly via useEffect into a div ref | |

**User's choice:** @grapesjs/react
**Notes:** Matches CLAUDE.md / STACK.md planned approach.

---

### Q2: Built-in panels visibility

| Option | Description | Selected |
|--------|-------------|----------|
| Canvas only — no GrapesJS panels (Recommended) | Disable all built-in panels; custom React toolbar handles everything | ✓ |
| Show style manager panel | Keep GrapesJS right-side style panel for color/font editing | |

**User's choice:** Canvas only — no GrapesJS panels
**Notes:** Keeps UI clean for a SaaS tool, not a full page builder.

---

### Q3: Block manager

| Option | Description | Selected |
|--------|-------------|----------|
| No — disable block manager (Recommended) | Block panel hidden; AI replaces it in Phase 3 | ✓ |
| Enable basic blocks manager | grapesjs-blocks-basic plugin with drag-in sidebar | |

**User's choice:** Disable block manager
**Notes:** Block manager is a v2 feature; AI is the block source in this product.

---

## Mock content design

### Q1: Mock content shape

| Option | Description | Selected |
|--------|-------------|----------|
| Vietnamese banner: heading + paragraph + button (Recommended) | 3 draggable components, tests all 4 success criteria | ✓ |
| Simple single text block | One text element — doesn't test drag-to-reorder | |
| Two-column layout: image placeholder + text | Complex, image needs src URL | |

**User's choice:** Vietnamese banner with heading + paragraph + button
**Notes:** Realistic use case; 3 separate components needed for ED-02 (drag reorder) to be testable.

---

### Q2: Content loading method

| Option | Description | Selected |
|--------|-------------|----------|
| GrapesJS project JSON via editor.loadProjectData() (Recommended) | Constant in lib/mockBlock.ts, loaded in onEditor callback | ✓ |
| HTML string via editor.setComponents() | Raw HTML string — inconsistent with Phase 3 AI output format | |

**User's choice:** editor.loadProjectData() with GrapesJS project JSON
**Notes:** Phase 3 AI output will also be GrapesJS JSON — consistent loading pattern.

---

## Responsive toggle UX

### Q1: Toggle implementation

| Option | Description | Selected |
|--------|-------------|----------|
| Two buttons in top toolbar calling editor.setDevice() (Recommended) | Custom React buttons, editor ref, React state for active highlight | ✓ |
| GrapesJS built-in device manager panel | Contradicts 'no built-in panels' decision | |

**User's choice:** Two custom React buttons calling editor.setDevice()
**Notes:** Consistent with canvas-only panel decision.

---

### Q2: Mobile canvas width

| Option | Description | Selected |
|--------|-------------|----------|
| 390px (iPhone 14 standard, Recommended) | Most common Vietnamese mobile viewport | ✓ |
| 375px (iPhone SE / older standard) | Less representative of current traffic | |
| 480px (small tablet / wide phone) | Too loose for realistic phone CMS preview | |

**User's choice:** 390px
**Notes:** Target audience uses current-gen iPhones / modern Android equivalents.

---

### Q3: Undo/Redo

| Option | Description | Selected |
|--------|-------------|----------|
| Both keyboard shortcuts AND toolbar buttons (Recommended) | Ctrl+Z/Y + visible toolbar buttons in TopBar | ✓ |
| Keyboard shortcuts only | Less discoverable; Phase 6 can add buttons | |

**User's choice:** Both keyboard AND toolbar buttons
**Notes:** ED-03 success criteria explicitly mentions "Ctrl+Z / Ctrl+Y or toolbar buttons" — both satisfies it clearly.

---

## Claude's Discretion

- Prompt bar placeholder styling (disabled textarea + greyed-out button) — exact label text `"Nhập prompt — sẽ khả dụng sau"` suggested by Claude, user accepted.
- Mobile preview visual indicator (centered 390px canvas with grey space) — implementation detail left to Claude.

## Deferred Ideas

- Block manager sidebar — drag-in blocks panel → v2
- Style manager panel — color/font editing → Phase 6
- grapesjs-blocks-basic plugin → Phase 3+
- Right-click context menu keep/remove decision → Phase 6
