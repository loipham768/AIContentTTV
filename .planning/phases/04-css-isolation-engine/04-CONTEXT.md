# Phase 4: CSS Isolation Engine + Copy HTML — Context

**Gathered:** 2026-05-21
**Status:** Ready for planning (skip-research mode — Phase 3 artifacts sufficient)

<domain>
## Phase Boundary

Phase 4 adds the "Copy HTML" button that converts the live GrapesJS canvas into a production-ready, zero-JS HTML string on the user's clipboard. The critical path is: `editor.getHtml()` + `editor.getCss()` → `juice.inlineContent()` → DOM scrubbing (strip scripts, strip class/data-gjs attrs) → `navigator.clipboard.writeText()` → toast notification. No API routes, no database, no authentication changes. Everything is client-side.

The phase covers three requirements: EX-01 (copy with inline CSS), EX-02 (auto-strip scripts), EX-03 (toast after copy). Phase 5 adds auto-save to history; Phase 6 adds full Vietnamese localization (including translating "Copy HTML" to "Sao chép HTML" if desired).

</domain>

<decisions>
## Implementation Decisions

### CSS Isolation Strategy
- **D-01:** Use `juice.inlineContent(html, css)` to merge class-based CSS from `editor.getCss()` into `style=""` attributes. Our current blocks are mostly inline-style already, but juice handles the general case as required by CLAUDE.md.
- **D-02:** After juice inlining, use DOMParser to walk all elements and remove: `class` attributes, all `data-*` attributes (GrapesJS internal). DOMParser is browser-native — no extra dependency needed for this step.
- **D-03:** Snapshot `el.attributes` with `Array.from()` before iterating to avoid NamedNodeMap mutation bugs when removing attributes in-place.
- **D-04:** `lib/cssIsolation.ts` uses DOMParser — browser-only. Do not import from Server Components or API routes. A single top-level comment warns developers.

### Script Stripping
- **D-05:** Use `doc.querySelectorAll('script').forEach(el => el.remove())` — runs before clipboard write on every export. Zero-JS guarantee is unconditional, not dependent on what GrapesJS generates (EX-02).

### Copy + Toast Integration
- **D-06:** Add `copied: boolean` state and `handleCopyHtml` async function to `TopBar.tsx`. Toast and button are colocated — no new component file needed.
- **D-07:** Use `navigator.clipboard.writeText()` wrapped in try/catch. Silent fail in v1 (clipboard may be unavailable in some browser contexts). Phase 6 can add a visible fallback.
- **D-08:** Toast uses `position: fixed` rendered as a sibling to the TopBar `<div>` via a `<>…</>` fragment — appears over the GrapesJS canvas without disrupting layout.
- **D-09:** Toast message: `"Sao chép thành công!"` (Vietnamese, per EX-03). Auto-dismisses after 3 s via `setTimeout(() => setCopied(false), 3000)`.
- **D-10:** "Copy HTML" button label stays English for Phase 4. Phase 6 localization sprint will translate all UI strings.

### Where the Button Lives
- **D-11:** "Copy HTML" button goes in the right section of TopBar, before the user email. No layout restructuring needed — right flex container already has `gap-3`.

</decisions>

<canonical_refs>
## Canonical References

### Requirements & Success Criteria
- `.planning/REQUIREMENTS.md` — EX-01, EX-02, EX-03 with detailed acceptance criteria
- `.planning/ROADMAP.md` §Phase 4 — Goal, 4 success criteria, depends-on Phase 3

### Architecture Rules
- `CLAUDE.md` — Mandatory: never use `editor.getHtml()` alone; always run through `lib/cssIsolation.ts` via `juice`; zero-JS output constraint; no `<style>` blocks in export

### Existing Files Phase 4 Modifies
- `components/editor/TopBar.tsx` — adds `handleCopyHtml`, `copied` state, Copy HTML button, toast JSX
- `package.json` — adds `juice` dependency, `@types/juice` devDependency

### New File Phase 4 Creates
- `lib/cssIsolation.ts` — CSS Isolation Engine (juice inlining + DOM scrubbing)

</canonical_refs>

<code_context>
## Existing Code Insights

### TopBar.tsx (current state — Phase 4 modifies this file)
- Already `'use client'` with `useState`
- `editorRef: React.RefObject<Editor | null>` prop gives access to `editor.getHtml()` / `editor.getCss()`
- Right section: `<div className="flex items-center gap-3">` — Copy HTML button slots in before `userEmail` span

### GrapesJS getHtml / getCss
- `editor.getHtml()` → inner body HTML, already has inline `style="..."` attributes for style-object components
- `editor.getCss()` → any class-based CSS rules GrapesJS generated; may be empty for our inline-style blocks
- Both return `string` — safe to pass directly to `juice.inlineContent(html, css)`

### juice package
- `juice.inlineContent(html: string, css: string): string` — merges CSS rules into style attributes; works in browser via webpack/Turbopack package.json `browser` field resolution
- Install: `npm install juice && npm install -D @types/juice`

### No New API Routes
Phase 4 is 100% client-side. No `export const runtime`, no `dbConnect()`, no `auth()` changes.

</code_context>

<deferred>
## Deferred

- Vietnamese label "Sao chép HTML" for the button → Phase 6 localization
- Clipboard failure toast / fallback textarea → Phase 6 polish
- "Copy and close" or direct CMS integration → v2 requirements
- CSS `em`/`rem` unit rendering warning for CMS host page differences → documented v1 known limitation

</deferred>

---

*Phase: 4 — CSS Isolation Engine + Copy HTML*
*Context: synthesized from ROADMAP.md, REQUIREMENTS.md, and Phase 3 code state*
*Date: 2026-05-21*
