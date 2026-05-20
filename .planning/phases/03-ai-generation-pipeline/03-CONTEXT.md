# Phase 3: AI Generation Pipeline - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 activates the prompt bar and wires it to the Claude API. A user types a Vietnamese prompt, clicks "Tạo nội dung", and a generated GrapesJS content block replaces the current canvas — all without a page reload. The phase covers the full request/response cycle: prompt input → `/api/generate` endpoint → Claude API → Zod validation → `editor.loadProjectData()`. Loading feedback, Vietnamese error messages, and per-user rate limiting are all in scope. No auto-save, no project history (Phase 5).

</domain>

<decisions>
## Implementation Decisions

### Loading Feedback
- **D-01:** Simple spinner loading state — single `isLoading: boolean` in the prompt bar. No SSE endpoint. Single POST to `/api/generate`, await response. During loading, a spinner icon replaces the button text.
- **D-02:** Lock textarea + disable button during loading. `textarea` becomes `disabled`, button shows spinner. Re-enable on success or error. Prevents double-submit.

### AI Output Schema
- **D-03:** Fixed structure — Claude always outputs `section → [h2, p, button]`, matching MOCK_BLOCK's shape exactly. Only text content and inline CSS styles vary per prompt. Zod schema is strict.
- **D-04:** Zod schema validates the full GrapesJS project data shape: `{ pages: [{ frames: [{ component: { type: "wrapper", components: [{ tagName: "section", components: [h2, p, button] }] } }] }], styles: [], assets: [] }`. Use `zodOutputFormat(GrapesBlockSchema)` with `client.messages.parse()` as required by CLAUDE.md.
- **D-05:** Zod validation failure → treat as 500 server error. Log the raw Claude output server-side for debugging. Return Vietnamese error to client. Canvas unchanged. No silent failures, no auto-retry.
- **D-06:** Use `MOCK_BLOCK` from `lib/mockBlock.ts` as the primary few-shot example in the Claude system prompt. It is real GrapesJS JSON from the live canvas — the correct schema reference.

### Error Messages
- **D-07:** Errors appear **inline below the prompt textarea** — a conditional `<p>` element with red text. Stays visible until the user edits the prompt or generates successfully. No toast for Phase 3 errors (toast infrastructure built in Phase 4).
- **D-08:** Error clears on any keystroke (`onChange` on the textarea). Once the user starts editing, the previous error is no longer relevant.
- **D-09:** Error copy (Vietnamese):
  - Rate limit (429): `"Vui lòng đợi vài giây trước khi tạo nội dung mới."`
  - Server error / Zod failure (5xx): `"Đã xảy ra lỗi. Vui lòng thử lại."`
  - No silent failures — every error path shows a message.

### Rate Limiting
- **D-10:** Per-user MongoDB TTL document. On each generation request, upsert a `RateLimit` document keyed by `userId` with a 10-second TTL index. Before calling Claude, check if an active rate-limit doc exists for this user — return 429 immediately if so. After a successful generation (or error), the TTL doc auto-expires; no manual cleanup needed.
- **D-11:** 10-second cooldown per user. This prevents accidental double-submits and runaway Claude API costs without being too restrictive for real usage.
- **D-12:** The `RateLimit` model must use `export const runtime = 'nodejs'` on the route (MongoDB access) and `dbConnect()` singleton — consistent with Phase 1 patterns.

### Claude's Discretion
- **Prompt bar component architecture:** The planner can decide whether to convert `PromptPlaceholder` into a `PromptBar` component with internal state (`isLoading`, `error`, `prompt`), or elevate state to `EditorClientWrapper` and pass props down. Either approach is acceptable — the `editorRef` is in `EditorClientWrapper` and must be accessible to call `loadProjectData()` on success.
- **`lib/ai/generate-block.ts` vs inline route handler:** Whether to extract the Claude API call into a separate file (CLAUDE.md lists `lib/ai/generate-block.ts` as a key file) or keep it inline in the route handler is left to the planner.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Success Criteria
- `.planning/REQUIREMENTS.md` — AI-01, AI-02, AI-03 with detailed acceptance criteria (canonical checklist for Phase 3)
- `.planning/ROADMAP.md` §Phase 3 — Goal, success criteria, depends-on Phase 2

### Architecture Rules
- `CLAUDE.md` — Mandatory constraints: `zodOutputFormat(GrapesBlockSchema)` + `client.messages.parse()` before `loadProjectData()`; `export const runtime = 'nodejs'` on `/api/generate`; `dbConnect()` singleton; `auth()` from `@/auth` to get userId for rate limiting; zero-JS output constraint (relevant here because AI output must not contain scripts)
- `.planning/phases/01-auth-database-foundation/01-CONTEXT.md` — Auth patterns: `auth()` usage, MongoDB connection pattern, `export const runtime = 'nodejs'`
- `.planning/phases/02-grapesjs-editor-shell/02-CONTEXT.md` — Editor integration patterns: `EditorClientWrapper`, `PromptPlaceholder` (Phase 3 activates this), `editor.loadProjectData()` call pattern, `editorRef` access

### GrapesJS JSON Schema Reference
- `lib/mockBlock.ts` — **Primary few-shot example for Claude system prompt.** This is the exact GrapesJS project data shape the AI must output. The Zod schema must validate to this structure.

### Stack Research
- `.planning/research/STACK.md` — Stack decisions including `@anthropic-ai/sdk` usage pattern
- `.planning/research/PITFALLS.md` — Critical pitfalls relevant to AI integration

### Existing Integration Points
- `components/editor/EditorClientWrapper.tsx` — Orchestrates TopBar + GrapesEditor + PromptPlaceholder. Phase 3 upgrades `PromptPlaceholder` and adds `editorRef`-based `loadProjectData()` call on success.
- `components/editor/PromptPlaceholder.tsx` — Currently a disabled stub. Phase 3 replaces or upgrades this into a live `PromptBar` component.
- `components/editor/GrapesEditor.tsx` — `editor.loadProjectData()` is the injection point for AI-generated JSON.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/editor/EditorClientWrapper.tsx` — Already has `editorRef`, `handleEditor`, and renders `PromptPlaceholder`. Phase 3 passes the editor ref down to the prompt bar for `loadProjectData()` on success.
- `components/editor/PromptPlaceholder.tsx` — Disabled stub with correct layout (textarea + button, bottom bar). Phase 3 converts this to a live component.
- `lib/mockBlock.ts` — GrapesJS project JSON reference — the Zod schema target and few-shot example source.
- `lib/mongodb.ts` — `dbConnect()` singleton — used by the new `RateLimit` model.
- `auth.ts` / `auth.config.ts` — `auth()` from `@/auth` — used in `/api/generate` route handler to get `session.user.id` for rate limiting.

### Established Patterns
- Route handler pattern: `export const runtime = 'nodejs'` + `await dbConnect()` + `const session = await auth()` — see `app/api/auth/register/route.ts`.
- Mongoose model guard: `mongoose.models.X || mongoose.model('X', XSchema)` — prevents OverwriteModelError.
- `'use client'` boundary: `EditorClientWrapper` is already the client boundary; new prompt bar component stays within it.

### Integration Points
- `app/api/generate/route.ts` — **New file.** POST endpoint: auth check → rate limit check → Claude API call → Zod validation → return JSON. `export const runtime = 'nodejs'`.
- `components/editor/PromptBar.tsx` (or upgraded `PromptPlaceholder`) — **New/upgraded.** Calls `/api/generate`, manages `isLoading`/`error` state, calls `editor.loadProjectData()` on success via `editorRef` prop.
- `models/RateLimit.ts` — **New file.** Mongoose model with TTL index for per-user cooldown.
- `lib/ai/generate-block.ts` — **New file (optional — planner decides).** Claude API call + Zod validation extracted here per CLAUDE.md key files list.

### Package Gap
- `@anthropic-ai/sdk` is **NOT yet installed** — Phase 3 must add it as a dependency.

</code_context>

<specifics>
## Specific Ideas

- The `PromptPlaceholder` placeholder text `"Nhập prompt — sẽ khả dụng sau"` should change to something actionable: `"Nhập nội dung bạn muốn tạo (tối đa 500 ký tự)..."` when activated.
- The 10-second rate limit cooldown is deliberately simple — the TTL auto-expires so no cleanup needed and no countdown timer needs to be displayed.
- MOCK_BLOCK as few-shot example means the system prompt shows Claude: "output JSON in exactly this shape — here's an example" and then asks it to produce a new block with different content and styles matching the Vietnamese prompt. Keep the few-shot example verbatim in the system prompt (not summarized).
- The `RateLimit` collection is single-purpose — `{ userId: ObjectId, createdAt: Date }` with a TTL index on `createdAt` set to 10 seconds. One document per user; upsert on each request.

</specifics>

<deferred>
## Deferred Ideas

- **Success toast on generation** — "Nội dung đã được tạo!" toast after successful generation. This belongs with Phase 4's toast infrastructure (EX-03) to keep toast system consistent. Phase 3 canvas update is visually obvious enough without a toast.
- **Prompt refinement / AI regeneration** — "Make it more modern", "Change color to red" iterative prompts. Explicitly deferred to v2 in REQUIREMENTS.md.
- **Style presets** — Nhã / Bold / Minimal themes injected into the prompt. v2 deferred.
- **Streaming partial JSON** — Real token-level streaming of the GrapesJS JSON. Not useful for this structured output since `loadProjectData()` needs the complete JSON. Deferred indefinitely.

None of these came up during discussion — listed from prior phase deferred list and REQUIREMENTS.md v2 section.

</deferred>

---

*Phase: 3-AI Generation Pipeline*
*Context gathered: 2026-05-21*
