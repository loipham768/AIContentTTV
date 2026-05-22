# Requirements — AI Content Booster

**Version:** v1 (MVP)
**Defined:** 2026-05-18

---

## v1 Requirements

### Authentication

- [x] **AUTH-01**: User can register with email + password
  - Accepts valid email + password (min 8 chars)
  - Password stored as bcrypt hash (salt rounds ≥ 12)
  - Duplicate email returns a clear error

- [x] **AUTH-02**: User can log in and stay logged in across sessions
  - JWT session persists across browser refreshes
  - Invalid credentials return a Vietnamese-language error

- [x] **AUTH-03**: User can log out from any page
  - Session is cleared on log out
  - Redirects to login page

### AI Generation

- [ ] **AI-01**: User can enter a Vietnamese prompt and trigger content block generation
  - Prompt input accepts Vietnamese text (max 500 chars)
  - Submitting the prompt calls the AI generation API
  - Generated block renders in the GrapesJS canvas without page reload

- [ ] **AI-02**: AI generation shows streaming progress feedback during the 3-10s wait
  - Loading indicator visible immediately after prompt submission
  - SSE streaming or spinner keeps the user informed during generation

- [ ] **AI-03**: API failures surface Vietnamese-language error messages
  - Rate limit (429): Vietnamese message explaining to wait
  - Server error (5xx): Vietnamese message to try again
  - No silent failures — user always knows what happened

### Editor

- [x] **ED-01**: User can edit text inline in the GrapesJS canvas
  - Double-click any text element to edit it directly
  - Changes are reflected in the canvas immediately

- [x] **ED-02**: User can drag and drop components to reorder them
  - Drag handles visible on component hover
  - Components can be moved within the canvas layout

- [x] **ED-03**: User can undo and redo canvas changes
  - Undo/Redo buttons or keyboard shortcut (Ctrl+Z / Ctrl+Y)
  - Works for text edits and drag-drop reorders

- [x] **ED-04**: User can toggle desktop/mobile responsive preview
  - Desktop and Mobile toggle buttons visible in editor toolbar
  - Canvas resizes to reflect each breakpoint

### Export

- [x] **EX-01**: User can copy inline-CSS HTML to clipboard (zero JS, no `<style>` tags)
  - "Copy HTML" button compiles the entire canvas
  - All CSS merged into `style=""` attributes (inline only)
  - No `<script>` tags, no `<style>` blocks, no JavaScript
  - No GrapesJS internal `class=` or `data-gjs-*` attributes in output
  - Output is a valid, self-contained HTML string

- [x] **EX-02**: Export auto-strips any script tags before copy
  - Any `<script>` blocks in GrapesJS output are removed automatically
  - Zero-JS output guaranteed regardless of component configuration

- [x] **EX-03**: User sees a "Sao chép thành công!" toast after copying
  - Success toast appears immediately after clipboard write
  - Toast auto-dismisses after 3 seconds

### History

- [x] **HIS-01**: Generated blocks auto-save to user history, named from prompt text
  - Block saved automatically after successful AI generation
  - Name derived from first 50 characters of the original prompt
  - Full prompt stored for display in history

- [ ] **HIS-02**: User can view their list of saved blocks
  - History panel or page shows all saved blocks for the authenticated user
  - Each entry shows name, creation date, and a preview or prompt text
  - Sorted by most recent first

- [ ] **HIS-03**: User can re-open a saved block in the editor
  - Clicking a history entry loads the block's GrapesJS project data
  - Confirmation prompt if editor has unsaved changes ("Replace current block?")

- [x] **HIS-04**: User can delete a saved block from history
  - Delete action with confirmation ("Xoá khối này?")
  - Deleted blocks are permanently removed from the user's history

---

## v2 Requirements (Deferred)

These were scoped but explicitly deferred to a future milestone:

- AI regeneration / prompt refinement ("Make it more modern", "Change color to red")
- Style preset injection (Nhã, Bold, Minimal themes)
- Block renaming / custom naming
- Google / social OAuth login
- Monetization / credit system
- CDN image upload and hosting
- Tags or folder organization for saved blocks
- Direct Gutenberg/shortcode export for new WordPress

---

## Out of Scope

Items explicitly excluded from v1 with reasoning:

- **Multi-block page composition** — full page builder is a separate product scope; increases complexity 10x with no PMF signal yet
- **Template library** — AI-only approach is the product's value proposition; templates dilute it and add curation cost
- **Direct Haravan/Sapo API integration** — clipboard paste is sufficient for v1; direct API requires per-platform auth and approval processes
- **Image upload** — requires CDN infrastructure; use external URL images in v1 to keep scope contained
- **Real-time collaboration** — single-user tool for v1

---

## Traceability

| Req ID | Phase | Status |
|--------|-------|--------|
| AUTH-01 | Phase 1 | Complete |
| AUTH-02 | Phase 1 | Complete |
| AUTH-03 | Phase 1 | Complete |
| ED-01 | Phase 2 | Complete |
| ED-02 | Phase 2 | Complete |
| ED-03 | Phase 2 | Complete |
| ED-04 | Phase 2 | Complete |
| AI-01 | Phase 3 | Pending |
| AI-02 | Phase 3 | Pending |
| AI-03 | Phase 3 | Pending |
| EX-01 | Phase 4 | Complete |
| EX-02 | Phase 4 | Complete |
| EX-03 | Phase 4 | Complete |
| HIS-01 | Phase 5 | Complete |
| HIS-02 | Phase 5 | Pending |
| HIS-03 | Phase 5 | Pending |
| HIS-04 | Phase 5 | Complete |

*Confirmed by roadmap agent — 2026-05-18. 17/17 v1 requirements mapped.*
