# Roadmap — AI Content Booster

**Milestone:** MVP
**Mode:** mvp (Vertical MVP slices)
**Granularity:** Standard
**Requirements:** 17 v1 requirements across 6 phases
**Coverage:** 17/17 ✓
**Created:** 2026-05-18

---

## Phases

- [x] **Phase 1: Auth + Database Foundation** - Users can register, log in, and stay logged in securely
- [x] **Phase 2: GrapesJS Editor Shell** - Users can see and interact with a working visual editor canvas using mock content
- [x] **Phase 3: AI Generation Pipeline** - Users can enter a Vietnamese prompt and receive a rendered content block
- [x] **Phase 4: CSS Isolation Engine + Copy HTML** - Users can copy a zero-JS inline-CSS HTML string to their clipboard
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
**Plans**: 4 plans

Plans:

**Wave 1:**
- [x] 01-01-PLAN.md — Walking Skeleton: scaffold Next.js 15.3.9, wire auth infrastructure, install Wave 0 test stubs

**Wave 2** *(blocked on Wave 1 completion)*:
- [ ] 01-02-PLAN.md — Registration flow: POST /api/auth/register + /login page + LoginRegisterCard register tab (AUTH-01)
- [ ] 01-03-PLAN.md — Login + Session flow: login tab + LogoutButton + editor stub + auth tests (AUTH-02, AUTH-03)

**Wave 3** *(blocked on Wave 2 completion)*:
- [ ] 01-04-PLAN.md — Integration + Verification: unit tests green, full suite green, manual smoke test sign-off

**Cross-cutting constraints:** `auth()` not `getServerSession()` · `export const runtime = 'nodejs'` on all DB routes · `dbConnect()` singleton · bcryptjs ≥ 12 rounds

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
**Plans**: 4 plans
**UI hint**: yes

Plans:

**Wave 1:**
- [x] 02-01-PLAN.md — GrapesJS setup: install grapesjs + @grapesjs/react, create lib/mockBlock.ts with Vietnamese banner JSON

**Wave 2** *(blocked on Wave 1 completion)*:
- [x] 02-02-PLAN.md — GrapesEditor component: 'use client', @grapesjs/react canvas, device manager, panel-free config, load MOCK_BLOCK (ED-01, ED-02, ED-03, ED-04)
- [x] 02-03-PLAN.md — TopBar + PromptPlaceholder: undo/redo buttons, device toggle buttons, user email, LogoutButton, disabled Phase-3 prompt bar (ED-03, ED-04)

**Wave 3** *(blocked on Wave 2 completion)*:
- [x] 02-04-PLAN.md — Wire EditorClientWrapper + update editor page + integration smoke test all 4 success criteria (ED-01, ED-02, ED-03, ED-04)

**Cross-cutting constraints:** `dynamic({ ssr: false })` on GrapesEditor · `auth()` guard kept on editor page · no new API routes · no `export const runtime` on editor page

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
**Plans**: 4 plans

Plans:

**Wave 1:**
- [x] 03-01-PLAN.md — Foundation: install @anthropic-ai/sdk, create RateLimit TTL model, create lib/ai/generate-block.ts with GrapesBlockSchema + generateBlock()

**Wave 2** *(blocked on Wave 1 completion)*:
- [x] 03-02-PLAN.md — API Route: POST /api/generate with auth, rate-limit, Claude call, error mapping (AI-01, AI-03)
- [x] 03-03-PLAN.md — PromptBar component: replaces PromptPlaceholder stub, manages isLoading/error state, calls loadProjectData() on success (AI-01, AI-02, AI-03)

**Wave 3** *(blocked on Wave 2 completion)*:
- [x] 03-04-PLAN.md — Wire EditorClientWrapper + build check + human verification of all 4 success criteria (AI-01, AI-02, AI-03)

**Cross-cutting constraints:** `zodOutputFormat(GrapesBlockSchema)` + `client.messages.parse()` before `loadProjectData()` · `export const runtime = 'nodejs'` on /api/generate · `dbConnect()` singleton · `auth()` from `@/auth` for userId · inline error display (no toast — Phase 4)

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
**Plans**: 3 plans
**UI hint**: yes

Plans:

**Wave 1:**
- [x] 04-01-PLAN.md — CSS Isolation Engine: install juice + create lib/cssIsolation.ts (EX-01, EX-02)

**Wave 2** *(blocked on Wave 1 completion)*:
- [x] 04-02-PLAN.md — Copy HTML button + Toast: update TopBar with handleCopyHtml, copied state, toast notification (EX-01, EX-03)

**Wave 3** *(blocked on Wave 2 completion)*:
- [x] 04-03-PLAN.md — Build check + human verification of all 4 success criteria (EX-01, EX-02, EX-03)

**Cross-cutting constraints:** `lib/cssIsolation.ts` browser-only (DOMParser) — import only from client components · `juice.inlineContent()` for CSS inlining · strip `<script>`, `class=`, `data-*` attrs before clipboard write · no new API routes · no database changes

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
**Plans**: 4 planned
**UI hint**: yes

Plans:

**Wave 1:**
- [x] 05-01-PLAN.md — Project model + /api/projects GET+POST + auto-save in /api/generate (HIS-01, HIS-02)

**Wave 2** *(blocked on Wave 1 completion)*:
- [x] 05-02-PLAN.md — DELETE /api/projects/[id] endpoint (HIS-04)
- [x] 05-03-PLAN.md — HistoryPanel component: fetch, display, re-open, delete (HIS-02, HIS-03, HIS-04)

**Wave 3** *(blocked on Wave 2 completion)*:
- [ ] 05-04-PLAN.md — Wire EditorClientWrapper + historyKey refresh + human verification of all 4 success criteria (HIS-01, HIS-02, HIS-03, HIS-04)

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
| 1. Auth + Database Foundation | 4/4 | Complete | 2026-05-19 |
| 2. GrapesJS Editor Shell | 4/4 | Complete | 2026-05-20 |
| 3. AI Generation Pipeline | 4/4 | Complete | 2026-05-21 |
| 4. CSS Isolation Engine + Copy HTML | 3/3 | Complete | 2026-05-21 |
| 5. Project History + Persistence | 3/4 | In Progress|  |
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

*Last updated: 2026-05-22 — Phase 5 plan 05-02 complete: DELETE /api/projects/[id] with auth + ObjectId guard + ownership-scoped delete. Phase 5 plan 05-03 (HistoryPanel component) is next.*
