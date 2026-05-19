---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Ready to execute
last_updated: "2026-05-19T00:00:00.000Z"
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 4
  completed_plans: 0
  percent: 0
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
| Phase | 1 — Auth + Database Foundation |
| Plan | Ready to execute (4 plans, 3 waves) |
| Status | Planned |
| Mode | mvp + Walking Skeleton |

**Progress:**

```
Phase 1 [ ] → Phase 2 [ ] → Phase 3 [ ] → Phase 4 [ ] → Phase 5 [ ] → Phase 6 [ ]
0%                                                                              100%
```

---

## Phase Checklist

- [~] Phase 1: Auth + Database Foundation (Planned — 4 plans ready)
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
| Phases complete | 0 |
| Requirements total | 17 |
| Requirements complete | 0 |
| Plans created | 0 |
| Plans complete | 0 |

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

### Research Flags (Open)

- **Phase 3 gate:** Must capture real `getProjectData()` output from a live GrapesJS instance for common block types before writing few-shot prompt examples. Cannot be guessed.
- **Phase 4 gate:** Must validate CSS Isolation Engine output against a real Haravan/Sapo staging environment. XSS filter specifics unknown until tested.
- **Rate limiting:** Decide per-user Claude API rate-limiting mechanism before Phase 3 ships (MongoDB TTL document recommended).
- **Relative CSS units:** Claude may output `em`/`rem` values that render differently in CMS host pages — document as v1 known limitation.

### Todos

- [ ] Set up Next.js 15 App Router project scaffold
- [ ] Configure MongoDB Atlas connection
- [ ] Install and configure NextAuth v5 with bcryptjs
- [ ] Scaffold GrapesJS with `@grapesjs/react` using `dynamic({ ssr: false })`
- [ ] Integrate `@anthropic-ai/sdk` with Zod schema validation
- [ ] Build CSS Isolation Engine (juice-based client-side transform)

### Blockers

*(None at project start)*

---

## Session Continuity

**Last session:** 2026-05-18T14:52:14.996Z
**Next action:** Run `/gsd:plan-phase 1` to create an executable plan for Phase 1

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

*Last updated: 2026-05-18 — initial STATE creation*
