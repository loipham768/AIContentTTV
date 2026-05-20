---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: In Progress
stopped_at: Completed 02-03-PLAN.md — TopBar toolbar + PromptPlaceholder components created
last_updated: "2026-05-20T16:35:00Z"
progress:
  total_phases: 6
  completed_phases: 1
  total_plans: 8
  completed_plans: 7
  percent: 17
---

# STATE — AI Content Booster

*Project memory. Updated at each phase transition and plan completion.*

---

## Project Reference

**Core Value:** A Vietnamese content creator can go from a text prompt to a production-ready, zero-JS HTML content block — ready to paste into any CMS — in under 60 seconds.

**Current Focus:** Phase 1 — Auth + Database Foundation

**Milestone:** MVP (v1)

---

## Current Position

| Field | Value |
|-------|-------|
| Phase | 2 — GrapesJS Editor Shell |
| Plan | 4 plans written — ready to execute |
| Status | Phase 2 planned — execute next |
| Mode | mvp |

**Progress:**

[████████░░] 75%
[██░░░░░░░░░] 17%
Phase 1 [✓] → Phase 2 [ ] → Phase 3 [ ] → Phase 4 [ ] → Phase 5 [ ] → Phase 6 [ ]
0%                                                                              100%

```

---

## Phase Checklist

- [x] Phase 1: Auth + Database Foundation ✓ (2026-05-19 — 15/15 tests, smoke test approved)
- [ ] Phase 2: GrapesJS Editor Shell
- [ ] Phase 3: AI Generation Pipeline
- [ ] Phase 4: CSS Isolation Engine + Copy HTML
- [ ] Phase 5: Project History + Persistence
- [ ] Phase 6: UI Polish + Vietnamese Localization

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases total | 6 |
| Phases complete | 1 |
| Requirements total | 17 |
| Requirements complete | 3 |
| Plans created | 8 |
| Plans complete | 4 |

---

## Accumulated Context

### Key Decisions Logged

| Decision | Rationale |
|----------|-----------|
| GrapesJS mounted with `dynamic({ ssr: false })` | GrapesJS accesses `window` at module load — SSR crash on day one without this |
| CSS Isolation Engine uses `juice` library | GrapesJS exports class-based CSS; `juice` merges into `style=""` attributes — CMS XSS filters strip `<style>` tags |
| Claude 3.5 Sonnet with Zod + `zodOutputFormat` | Structured JSON output enforced before `loadProjectData()` — silent blank canvas otherwise |
| Store GrapesJS project JSON in MongoDB (never HTML) | HTML is computed on demand at export; storing HTML would be stale after edits |
| MongoDB connection singleton in `lib/mongodb.ts` | Prevents connection pool exhaustion in Next.js serverless context |
| `export const runtime = 'nodejs'` on all DB API routes | Edge Runtime cannot connect to MongoDB |
| `auth.config.ts` Edge split pattern | NextAuth v5 with Credentials provider requires splitting config: auth.config.ts (no DB, Edge-safe) used by middleware.ts; auth.ts (full config with mongoose) used by route handlers and Server Components |
| `@grapesjs/react` v2 export is `Editor` not `GjsEditor` | Confirmed from installed package index.d.ts — Wave 2 must import `{ Editor }` from `@grapesjs/react`; context doc D-04 had an outdated component name |
| GrapesJS 0.22 ships built-in TypeScript types | @types/grapesjs must NOT be installed — targets older GrapesJS and conflicts with built-in types |
| `LogoutButton` is a named export | `{ LogoutButton }` destructuring required — not a default export; confirmed from components/auth/LogoutButton.tsx |
| TopBar uses optional chaining for editorRef | `editorRef.current?.runCommand(...)` and `editorRef.current?.setDevice(...)` — safe before editor mounts |
| No keyboard listeners in TopBar | GrapesJS UndoManager handles Ctrl+Z/Y natively; toolbar buttons are additive not replacements |

### Research Flags (Open)

- **Phase 3 gate:** Must capture real `getProjectData()` output from a live GrapesJS instance for common block types before writing few-shot prompt examples. Cannot be guessed.
- **Phase 4 gate:** Must validate CSS Isolation Engine output against a real Haravan/Sapo staging environment. XSS filter specifics unknown until tested.
- **Rate limiting:** Decide per-user Claude API rate-limiting mechanism before Phase 3 ships (MongoDB TTL document recommended).
- **Relative CSS units:** Claude may output `em`/`rem` values that render differently in CMS host pages — document as v1 known limitation.

### Todos

- [x] Set up Next.js 15 App Router project scaffold
- [ ] Configure MongoDB Atlas connection (MONGODB_URI placeholder — developer must replace with real Atlas URI)
- [x] Install and configure NextAuth v5 with bcryptjs
- [ ] Scaffold GrapesJS with `@grapesjs/react` using `dynamic({ ssr: false })`
- [ ] Integrate `@anthropic-ai/sdk` with Zod schema validation
- [ ] Build CSS Isolation Engine (juice-based client-side transform)

### Blockers

*(None at project start)*

---

## Session Continuity

**Last session:** 2026-05-20T16:35:00Z
**Stopped at:** Completed 02-03-PLAN.md — TopBar toolbar + PromptPlaceholder components created
**Next action:** Execute 02-04-PLAN.md (EditorClientWrapper + editor page assembly)

---

## Tech Stack Reference

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js App Router | 15.x |
| UI | React + Tailwind CSS | 19.x / 4.x |
| Visual Editor | GrapesJS + `@grapesjs/react` | 0.22.x / 2.x |
| AI | `@anthropic-ai/sdk` + Zod | 0.96.x / 4.x |
| Database | MongoDB Atlas + Mongoose | 9.x |
| Auth | NextAuth.js v5 + `bcryptjs` | beta / 3.x |
| CSS Inliner | `juice` | latest |

**Do NOT use:** GrapesJS default `storageManager`, Edge Runtime for DB routes, `next-auth@4`, `<script>` components in AI-generated blocks.

---

*Last updated: 2026-05-20 — Plan 02-03 complete: TopBar.tsx + PromptPlaceholder.tsx created; build clean*
