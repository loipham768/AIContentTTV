# Roadmap — AI Content Booster

**Milestone:** MVP
**Mode:** mvp (Vertical MVP slices)
**Granularity:** Standard
**Requirements:** 17 v1 requirements across 6 phases
**Coverage:** 17/17 ✓
**Created:** 2026-05-18

---

## Phases

- [ ] **Phase 1: Auth + Database Foundation** - Users can register, log in, and stay logged in securely
- [ ] **Phase 2: GrapesJS Editor Shell** - Users can see and interact with a working visual editor canvas using mock content
- [ ] **Phase 3: AI Generation Pipeline** - Users can enter a Vietnamese prompt and receive a rendered content block
- [ ] **Phase 4: CSS Isolation Engine + Copy HTML** - Users can copy a zero-JS inline-CSS HTML string to their clipboard
- [ ] **Phase 5: Project History + Persistence** - Users can save, browse, re-open, and delete their content blocks
- [ ] **Phase 6: UI Polish + Vietnamese Localization** - The full user journey feels polished and communicates in Vietnamese throughout

---

## Phase Details

### Phase 1: Auth + Database Foundation
**Goal**: Users can securely register, log in, and maintain sessions
**Mode:** mvp
**Depends on**: Nothing (foundation phase)
**Requirements**: AUTH-01, AUTH-02, AUTH-03
**Success Criteria** (what must be TRUE):
  1. A new user can register with an email and password and immediately access the app
  2. A returning user can log in and stay logged in after browser refresh without re-entering credentials
  3. A logged-in user can log out from any page and is redirected to the login page
  4. Attempting to register with an already-used email shows a clear error message
  5. Entering wrong credentials at login shows a Vietnamese-language error message
**Plans**: TBD

### Phase 2: GrapesJS Editor Shell
**Goal**: Users can interact with a fully functional visual editor canvas with mock content
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: ED-01, ED-02, ED-03, ED-04
**Success Criteria** (what must be TRUE):
  1. A user can double-click any text element on the canvas and edit it in place
  2. A user can drag a block to a new position within the canvas and the layout updates immediately
  3. A user can undo and redo edits using Ctrl+Z / Ctrl+Y or toolbar buttons
  4. A user can switch between Desktop and Mobile preview modes and see the canvas resize accordingly
**Plans**: TBD
**UI hint**: yes

### Phase 3: AI Generation Pipeline
**Goal**: Users can submit a Vietnamese prompt and receive a live-rendered content block in the editor
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: AI-01, AI-02, AI-03
**Success Criteria** (what must be TRUE):
  1. A user types a Vietnamese prompt and clicks generate — a content block appears on the GrapesJS canvas without a page reload
  2. A loading indicator or progress feedback is visible from the moment the user submits the prompt until the block appears
  3. When the AI API returns a rate-limit or server error, the user sees a Vietnamese-language message describing what happened
  4. A generated block contains Vietnamese-language copy that matches the intent of the prompt
**Plans**: TBD

### Phase 4: CSS Isolation Engine + Copy HTML
**Goal**: Users can export a production-ready, zero-JS inline-CSS HTML string to their clipboard
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: EX-01, EX-02, EX-03
**Success Criteria** (what must be TRUE):
  1. Clicking "Copy HTML" places a valid HTML string on the clipboard with all CSS inlined as `style=""` attributes — no `<style>` blocks, no `<script>` tags, no `class=` or `data-gjs-*` attributes
  2. The copied HTML can be pasted into a CKEditor or TinyMCE on Haravan/Sapo and renders visually correctly
  3. Any `<script>` blocks that GrapesJS may produce are automatically stripped before the clipboard write — zero-JS output is guaranteed
  4. A "Sao chép thành công!" toast notification appears immediately after copying and auto-dismisses after 3 seconds
**Plans**: TBD
**UI hint**: yes

### Phase 5: Project History + Persistence
**Goal**: Users can save, revisit, and manage their previously generated content blocks
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: HIS-01, HIS-02, HIS-03, HIS-04
**Success Criteria** (what must be TRUE):
  1. A newly generated block automatically appears in the user's history list, named from the first 50 characters of the prompt, without any manual save action
  2. A user can open the history panel and see all their saved blocks sorted by most recent first, each showing a name, creation date, and prompt text
  3. A user can click a history entry to re-open that block in the editor; if the canvas has unsaved changes a confirmation prompt ("Replace current block?") appears first
  4. A user can delete a saved block via a confirmation dialog ("Xoá khối này?") and the block is permanently removed from the list
**Plans**: TBD
**UI hint**: yes

### Phase 6: UI Polish + Vietnamese Localization
**Goal**: The complete user journey is polished, visually consistent, and communicates entirely in Vietnamese
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: (cross-cutting polish — no new v1 requirements; refines delivery of all prior phases)
**Success Criteria** (what must be TRUE):
  1. Every user-facing string, label, placeholder, button, and error message is in Vietnamese
  2. The app shell (navigation, layout, typography) has a consistent visual style using the Tailwind design system
  3. All loading, error, and empty states have explicit Vietnamese-language feedback — no blank screens or untranslated strings
  4. The editor page layout — prompt input, canvas, history panel, toolbar — is usable and visually coherent on a 1280px+ desktop viewport
**Plans**: TBD
**UI hint**: yes

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Auth + Database Foundation | 0/? | Not started | - |
| 2. GrapesJS Editor Shell | 0/? | Not started | - |
| 3. AI Generation Pipeline | 0/? | Not started | - |
| 4. CSS Isolation Engine + Copy HTML | 0/? | Not started | - |
| 5. Project History + Persistence | 0/? | Not started | - |
| 6. UI Polish + Vietnamese Localization | 0/? | Not started | - |

---

## Coverage Map

| Requirement | Phase | Category |
|-------------|-------|----------|
| AUTH-01 | Phase 1 | Authentication |
| AUTH-02 | Phase 1 | Authentication |
| AUTH-03 | Phase 1 | Authentication |
| ED-01 | Phase 2 | Editor |
| ED-02 | Phase 2 | Editor |
| ED-03 | Phase 2 | Editor |
| ED-04 | Phase 2 | Editor |
| AI-01 | Phase 3 | AI Generation |
| AI-02 | Phase 3 | AI Generation |
| AI-03 | Phase 3 | AI Generation |
| EX-01 | Phase 4 | Export |
| EX-02 | Phase 4 | Export |
| EX-03 | Phase 4 | Export |
| HIS-01 | Phase 5 | History |
| HIS-02 | Phase 5 | History |
| HIS-03 | Phase 5 | History |
| HIS-04 | Phase 5 | History |

**Total mapped: 17/17 ✓**

---

## Research Flags

| Phase | Research Required | Reason |
|-------|------------------|--------|
| Phase 3 | Yes — capture live GrapesJS JSON schema | Few-shot examples cannot be written without real `getProjectData()` output |
| Phase 4 | Yes — validate against real Haravan/Sapo staging | CMS XSS filter behavior cannot be assumed; inline CSS approach must be verified in a live environment |

---

*Last updated: 2026-05-18 — initial roadmap creation*
