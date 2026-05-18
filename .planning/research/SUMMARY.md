# Research Summary — AI Content Booster

**Project:** AI Content Booster
**Domain:** AI-powered visual HTML content block generator for Vietnamese CMS platforms
**Researched:** 2026-05-18
**Confidence:** HIGH

---

## Executive Summary

AI Content Booster takes a Vietnamese-language natural-language prompt, calls Claude to generate a GrapesJS-compatible JSON block, renders it live in a WYSIWYG canvas, then exports a single chunk of inline-CSS HTML the user pastes into a legacy CMS (Haravan, Sapo, WordPress Classic Editor). The stack is a Next.js 15 App Router monolith with GrapesJS mounted client-side, MongoDB Atlas for document storage, and the Anthropic SDK with structured JSON output enforcing the GrapesJS schema before it reaches the editor.

**The hardest non-trivial technical problem is the CSS Isolation Engine.** GrapesJS exports HTML with class attributes and a separate CSS string. Every target CMS strips `<style>` blocks via XSS filters, so a custom client-side transform must parse the CSS output, resolve selectors, and merge rules into `style=""` attributes before the clipboard copy. This must be built and validated against a real CMS staging environment before the product can be called shippable.

---

## Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js App Router | 15.x |
| UI | React + Tailwind CSS (app shell only) | 19.x / 4.x |
| Visual Editor | GrapesJS + `@grapesjs/react` | 0.22.x / 2.x |
| AI | `@anthropic-ai/sdk` + Zod | 0.96.x / 4.x |
| Database | MongoDB Atlas + Mongoose | 9.x |
| Auth | NextAuth.js v5 + `bcryptjs` | beta / 3.x |
| CSS Inliner | `juice` | latest |

**Do not use:** GrapesJS default `storageManager`, Edge Runtime for DB routes, `next-auth@4`, `<script>` components in AI-generated blocks.

---

## Table-Stakes Features (v1)

- Vietnamese-language prompt input
- Real-time AI generation feedback (SSE streaming or spinner)
- WYSIWYG GrapesJS canvas with inline text editing
- **CSS Isolation Engine + "Copy HTML"** — the entire value prop
- Zero JavaScript in exported HTML (CMS XSS safe)
- Email + password auth
- Saved block history with re-open
- Responsive preview toggle (GrapesJS built-in)
- Undo/Redo (GrapesJS UndoManager built-in)
- Vietnamese UI and error messages throughout

## Defer to v2+

Multi-block page composition, image upload/CDN, social OAuth, monetization, template library.

---

## Architecture Highlights

```
Vietnamese prompt
    → POST /api/generate
        → lib/promptBuilder.ts (few-shot examples)
        → client.messages.parse() + zodOutputFormat(GrapesBlockSchema)
        → Zod validation (MANDATORY before loadProjectData)
    → editor.loadProjectData() on imperative ref (no React re-mount)
    → User edits in GrapesJS canvas
    → "Copy HTML" → CSS Isolation Engine (browser-side, juice)
        → navigator.clipboard (inline CSS only, zero JS, zero class attrs)
    → ProjectHistoryPanel ↔ /api/projects ↔ MongoDB
```

**Key rules:**
- Store GrapesJS project JSON in MongoDB — never rendered HTML. HTML is computed on demand at export.
- GrapesJS must be `dynamic({ ssr: false })` — it accesses `window` at module load.
- React state holds only metadata (`projectId`, `name`, `isLoading`). Editor state is GrapesJS-internal.
- All API routes touching MongoDB need `export const runtime = 'nodejs'`.

---

## Top 5 Pitfalls

1. **GrapesJS SSR crash** — Fix: `dynamic(() => import('@/components/GrapesEditor'), { ssr: false })`. Day-one requirement.

2. **Silent blank canvas from invalid AI JSON** — `loadProjectData()` does not throw. Fix: Zod validate Claude output against `GrapesBlockSchema` + check `stop_reason === 'end_turn'` + log component count after load.

3. **CSS not inlined → block pastes naked into CMS** — `getHtml()` returns class-based HTML; CMS strips `<style>` tags. Fix: `juice`-based CSS Isolation Engine is non-optional. Validate with real Haravan/Sapo staging.

4. **React StrictMode double-mount of GrapesJS** — Fix: `@grapesjs/react` wrapper or ref guard (`if (editorRef.current) return`) with `destroy()` in cleanup.

5. **MongoDB connection pool exhaustion** — Fix: connection singleton in `lib/mongodb.ts` using `(global as any).mongoose` cache.

---

## Suggested Build Order

| Phase | Scope | Research needed? |
|-------|-------|-----------------|
| 1 | Auth + Database Foundation | No — standard patterns |
| 2 | GrapesJS Editor Shell (mock JSON only, no AI) | No — isolate init pitfalls first |
| 3 | AI Generation Pipeline | **Yes** — need live GrapesJS schema capture for few-shot examples |
| 4 | CSS Isolation Engine + Copy HTML | **Yes** — need real CMS staging validation |
| 5 | Project Persistence + History | No — standard CRUD |
| 6 | UI Polish + Vietnamese Localization | No — no new technical risk |

---

## Open Questions

- **GrapesJS project JSON schema:** Must capture `getProjectData()` output from a live instance for common block types before writing few-shot examples. Cannot be guessed.
- **Haravan/Sapo XSS filter specifics:** Real staging test required before Phase 4 is done.
- **Per-user Claude rate limiting:** Decide mechanism before Phase 3 ships — MongoDB TTL document is simplest.
- **Relative CSS units:** Claude may output `em`/`rem` values that render differently in CMS host pages. Document as v1 known limitation.
