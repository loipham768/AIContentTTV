# Phase 3: AI Generation Pipeline - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-21
**Phase:** 3-AI Generation Pipeline
**Areas discussed:** Loading feedback style, AI output schema, Error message placement, Rate limiting

---

## Loading Feedback Style

| Option | Description | Selected |
|--------|-------------|----------|
| Simple spinner | Boolean isLoading state. Prompt bar shows spinner, button disables. Single POST to /api/generate, await response. | ✓ |
| Faux-progress via SSE | Server-Sent Events streams status strings. Gives illusion of progress but adds streaming endpoint complexity. | |
| Canvas skeleton | Canvas shows grey placeholder skeleton while loading. Same simple POST, different visual. | |

**User's choice:** Simple spinner

**Notes:** None.

### Loading — Lock behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Lock textarea + disable button | Prevents double-submit. Textarea becomes read-only, button shows spinner. Re-enable on success or error. | ✓ |
| Keep editable, only disable button | User can change prompt while waiting but can't resubmit. Potentially confusing. | |
| You decide | Leave to planner. | |

**User's choice:** Lock textarea + disable button

---

## AI Output Schema

### Structure flexibility

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed structure, varied content | Always section → h2 + p + button. Only content and styles vary. Strict Zod schema. | ✓ |
| Flexible components, bounded depth | Claude can vary components within a section at depth ≤ 2. More expressive but harder to validate. | |
| Fully flexible | Claude decides full component tree. Maximum expressiveness, highest schema mismatch risk. | |

**User's choice:** Fixed structure, varied content

### Validation failure behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Return 500 + Vietnamese error, keep current canvas | Treat Zod failure same as API error. Log raw output server-side. Canvas unchanged. | ✓ |
| Retry once silently, then error | One automatic retry before surfacing error. Adds 5-10s to failure cases, doubles API cost. | |
| You decide | Leave to planner. | |

**User's choice:** Return 500 + Vietnamese error, keep current canvas

### Few-shot example source

| Option | Description | Selected |
|--------|-------------|----------|
| Use MOCK_BLOCK as few-shot example | MOCK_BLOCK is real GrapesJS JSON from the working canvas — correct schema reference. | ✓ |
| Capture fresh getProjectData() sample | Run dev server, add components, call getProjectData() for exact serialized schema. | |
| You decide | Leave few-shot strategy to researcher. | |

**User's choice:** Yes, use MOCK_BLOCK as the few-shot example

---

## Error Message Placement

### Error location

| Option | Description | Selected |
|--------|-------------|----------|
| Inline below the prompt bar | Red error text below textarea. Stays visible until user edits or succeeds. No extra toast component. | ✓ |
| Toast notification | Auto-dismissing overlay. Phase 4 plans a toast — reusing it here is consistent but adds toast infrastructure to Phase 3. | |
| Both: inline for errors, toast for success | Errors inline, success toast. More states to manage. | |

**User's choice:** Inline below the prompt bar

### Error clear behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — clear on any keystroke | Clears on onChange. Error no longer relevant once user starts editing. | ✓ |
| Clear only on next submit | Error stays visible while editing. | |
| You decide | Leave to planner. | |

**User's choice:** Yes — clear on any keystroke

---

## Rate Limiting

### Mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| MongoDB TTL document, 10s cooldown | Upsert TTL doc per userId. Check before each generation, return 429 if active. Auto-expires. | ✓ |
| No rate limiting (skip for MVP) | Rely on Claude API's own 429s. Simpler but risk of rapid-click cost spikes. | |
| Simple in-memory cooldown | Map per userId in server module. Resets on cold start. Zero extra DB writes. | |

**User's choice:** Yes — MongoDB TTL document, 10s cooldown

### 429 message copy

| Option | Description | Selected |
|--------|-------------|----------|
| "Vui lòng đợi vài giây trước khi tạo nội dung mới." | Simple, friendly. No countdown required. | ✓ |
| "Bạn đang tạo nội dung quá nhanh. Vui lòng đợi 10 giây." | Explicit duration. Requires reading remaining TTL from doc. | |
| You decide | Leave exact copy to planner. | |

**User's choice:** "Vui lòng đợi vài giây trước khi tạo nội dung mới."

---

## Claude's Discretion

- **Prompt bar component architecture:** Whether to convert `PromptPlaceholder` into `PromptBar` with internal state or elevate state to `EditorClientWrapper`. Planner decides.
- **`lib/ai/generate-block.ts` extraction:** Whether Claude API call logic lives in a separate file or inline in the route handler. Planner decides (CLAUDE.md lists it as a key file, which leans toward extraction).

## Deferred Ideas

- Success toast on generation — belongs with Phase 4 toast infrastructure.
- Prompt refinement / AI regeneration — v2 per REQUIREMENTS.md.
- Style presets (Nhã / Bold / Minimal) — v2 per REQUIREMENTS.md.
- Streaming partial JSON — not useful for structured GrapesJS JSON output.
