# Architecture Research — AI Content Booster

## Confidence: HIGH

---

## Key Findings

1. **GrapesJS has no built-in "inline all CSS" export.** `editor.getHtml()` returns HTML with class attributes; `editor.getCss()` returns a separate string. The CSS Isolation Engine must be built manually using a CSS parser (postcss) + HTML parser (DOMParser). This is the single most non-trivial custom component in the system.

2. **GrapesJS must be mounted as an uncontrolled React component via imperative ref.** Storing editor state in React state causes re-mounts and destroys undo history. Use `forwardRef` + `useImperativeHandle` to expose `loadData(json)` and `getData()` handles. Call `editor.loadProjectData()` when new AI output arrives — no page reload needed.

3. **Anthropic SDK v5 supports native structured JSON output via `client.messages.parse()` with `jsonSchemaOutputFormat`.** This enforces the GrapesJS JSON schema at the SDK level. If Claude returns malformed JSON, `parsed_output` is null — use this as the error boundary. Far more reliable than parsing raw text.

4. **Instruct Claude to output CSS as inline `style` objects on each component node** (not in the top-level `styles` array). This keeps initial AI-generated content free of class-based CSS, minimizing what the CSS Isolation Engine must process on export. Post-edit Style Manager changes still create class-based CSS — the engine handles that as a secondary path.

5. **GrapesJS Storage Manager `type: 'remote'` with `onStore`/`onLoad` hooks** is the correct auto-save mechanism. `stepsBeforeSave: 20` provides debouncing. The `onStore` hook injects the `projectId` (from React state) into the save payload. New project creation must happen via an immediate POST before the first auto-save fires.

---

## Component Boundaries

```
Browser
  PromptBar ──POST /api/generate──► Anthropic API
                                         │
                                    GrapesJS JSON
                                         │
  GrapesEditorWrapper ◄──loadProjectData()─┘
  (uncontrolled, imperative ref)
         │ getHtml() + getCss()
         ▼
  CSSIsolationEngine ──► navigator.clipboard (inline HTML)
         │
  ProjectHistoryPanel ◄──► GET/POST /api/projects ◄──► MongoDB

  NextAuth.js (/api/auth/[...nextauth]) ◄──► MongoDB users
```

---

## Data Flow: Prompt → AI JSON → GrapesJS → Inline HTML Export

**Stage 1 — User Input:** Vietnamese prompt typed in `PromptBar`.

**Stage 2 — Frontend → API:** `POST /api/generate` with `{ prompt }`. Session cookie authorizes via `auth()`.

**Stage 3 — API → Claude:** `lib/promptBuilder.ts` assembles messages array with system context (GrapesJS JSON schema rules) + few-shot examples (Vietnamese prompt → correct GrapesJS JSON pairs). Calls `client.messages.parse()` with `jsonSchemaOutputFormat(GrapesJSSchema)`. Returns `{ projectData }` or 422 on schema violation.

**Stage 4 — API Response → GrapesJS:** Client receives `projectData`. Calls `editorRef.current.loadData(projectData)` via imperative handle. GrapesJS re-renders canvas in place — no page reload, no React re-mount.

**Stage 5 — User Edits (Optional):** GrapesJS drag-drop + Style Manager. Auto-save fires after 20 changes via Storage Manager remote store → `PUT /api/projects/:id`.

**Stage 6 — Export:** "Copy HTML" button triggers `CSSIsolationEngine`:
1. `rawHtml = editor.getHtml()` → HTML with class attributes
2. `rawCss = editor.getCss()` → CSS string with `.selector { rules }` blocks
3. Parse CSS → `Map<selector, CSSProperties>`
4. Traverse HTML DOM (DOMParser in browser)
5. Per element: collect matching selectors by specificity order, merge rules, merge with existing inline styles, write to `style=""`, remove `class=""`
6. Strip `@media` rules (static export), strip `:hover`/`:focus`, strip GrapesJS auto-IDs
7. Serialize → `navigator.clipboard.writeText(cleanHtml)`

---

## CSS Isolation Engine — Implementation Approach

Run **client-side** (no extra round-trip). Use browser `DOMParser` for HTML traversal. For CSS parsing, use a lightweight CSS tokenizer or port `postcss` to the browser bundle (postcss is browser-compatible).

Key operations:
- Build selector→rules map from `getCss()` output
- Resolve which selectors match each DOM element (class + tag + descendant selectors only)
- Merge into `style=""` attribute using specificity order (tag < class < inline)
- Strip: `@media`, `:hover`/`:focus` pseudo-classes, `!important`, GrapesJS-generated `data-gjs-*` attributes
- Do NOT strip `src`, `href`, `alt` attributes

---

## MongoDB Schema

```typescript
// Project document
{
  _id: ObjectId,
  userId: ObjectId,    // ref: User, indexed
  name: String,        // auto from prompt first 50 chars
  prompt: String,      // full original Vietnamese prompt
  data: Mixed,         // editor.getProjectData() JSON blob
  createdAt: Date,
  updatedAt: Date,     // index: { userId, updatedAt: -1 }
}

// User document
{
  _id: ObjectId,
  email: String,       // unique, lowercase
  password: String,    // bcrypt hash
  createdAt: Date,
}
```

---

## Suggested Build Order (Phase Dependencies)

1. **Auth + DB layer** — `lib/db.ts` Mongoose singleton, User model, NextAuth Credentials route. Blocks everything else.
2. **GrapesJS Editor wrapper** — Mount/destroy lifecycle, imperative ref handle. Develop with hardcoded mock JSON before Claude is connected.
3. **Prompt builder + Claude API route** — `lib/promptBuilder.ts` few-shot examples, `POST /api/generate`, Zod schema for GrapesJS JSON. Validate output quality in isolation.
4. **CSS Isolation Engine** — `lib/cssIsolation.ts`, test against real GrapesJS `getHtml()`/`getCss()` output with sample projects before wiring to UI.
5. **Project persistence** — `/api/projects` CRUD, Storage Manager auto-save config, `ProjectHistoryPanel`.
6. **UI polish + error states** — Loading indicators, Vietnamese copy, error boundaries.

---

## Key Technical Decisions

| Decision | Rationale | Implication |
|----------|-----------|-------------|
| GrapesJS as uncontrolled React component via imperative ref | Re-mount destroys undo stack and cursor position | React state holds only metadata (projectId, name, isLoading); editor state is GrapesJS-internal |
| Claude outputs inline `style` objects in component JSON | Minimizes CSS Isolation Engine complexity on AI-generated content | Few-shot examples must enforce this pattern consistently |
| CSS Isolation runs client-side | No extra API round-trip on clipboard export | Must use browser-safe parsing (DOMParser + custom selector resolver) |
| `client.messages.parse()` with `jsonSchemaOutputFormat` | Enforces output schema at SDK level | GrapesJS JSON Zod schema must be defined upfront and maintained as the API contract |
| GrapesJS Storage Manager `type: remote` + `onStore` hook | Built-in debounced auto-save | projectId must be in React state before first save; new project creation is immediate on generation |
| MongoDB stores GrapesJS project JSON, not rendered HTML | Enables re-editing | HTML is always computed on demand at export time |

---

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| GrapesJS API (loadProjectData, getHtml, getCss, Storage Manager) | HIGH | Verified via official docs |
| Anthropic SDK structured output | HIGH | Verified via official docs |
| NextAuth.js Credentials + JWT | HIGH | Verified via official docs |
| Next.js App Router API routes | HIGH | Verified via official docs |
| Mongoose singleton for Next.js serverless | HIGH | Verified via official docs |
| CSS Isolation Engine (no native GrapesJS option) | MEDIUM | Confirmed absence from all official docs; custom implementation required |
| GrapesJS-React integration pattern | HIGH | Verified React patterns against GrapesJS component lifecycle docs |

---

## Open Questions

- **CSS specificity resolver complexity:** GrapesJS Style Manager primarily generates single-class selectors (`.gjs-comp-xyz`) — a simplified resolver covering tag + class selectors is likely sufficient for MVP. Needs validation against real GrapesJS output.
- **Relative units in AI-generated styles:** Claude may output `em`/`rem` units that render differently across CMS host pages. MVP can leave as-is; conversion is v2.
- **GrapesJS React wrapper (`@grapesjs/react`):** Official wrapper has thin docs. Recommend initializing GrapesJS manually in `useEffect` for full lifecycle control.
- **Per-user rate limiting for Claude API calls:** Required to prevent runaway billing. Mechanism (in-memory, Redis, or MongoDB counter) should be decided in the generate API route phase.
