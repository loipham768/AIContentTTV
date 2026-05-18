# AI Content Booster

## What This Is

AI Content Booster is a Vietnamese-market SaaS tool that lets content creators (SEO writers, Content Marketers, online shop owners) generate professional-grade HTML content blocks using an AI prompt. Users describe the block they want in Vietnamese, the AI generates it as a GrapesJS visual layout, they tweak it inline, then copy a single paste-ready HTML string with fully-inlined CSS directly into CKEditor or TinyMCE on any CMS (WordPress, Haravan, Sapo, Magento).

## Core Value

A Vietnamese content creator can go from a text prompt to a production-ready, zero-JS HTML content block — ready to paste into any CMS — in under 60 seconds.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can register and log in with email + password
- [ ] User can enter a Vietnamese prompt and trigger AI content generation
- [ ] AI generates a GrapesJS-compatible JSON layout with Vietnamese copywriting content
- [ ] GrapesJS renders the generated JSON visually in real-time (no page reload)
- [ ] User can edit content inline (text, colors, drag-drop blocks) within GrapesJS
- [ ] User can click "Copy HTML" to get a fully inline-CSS HTML string (zero JS, no `<style>` tags) on their clipboard
- [ ] Exported HTML is safe for CMS XSS filters — no dynamic JavaScript
- [ ] Exported HTML has clean, minimal structure (no unnecessary nesting) suitable for SEO
- [ ] Generated blocks are auto-saved to a project history, auto-named from the prompt text
- [ ] User can view and re-open previously saved blocks from their history

### Out of Scope

- CDN image handling — planned but deferred to post-MVP (absolute URL paths pre-planned in architecture)
- Template library — no pre-built blocks in v1; AI-only approach
- Google / social OAuth — email + password only for v1
- Tags, folders, or campaign organization — auto-name only in v1
- Monetization / credit system — free in v1, validate before charging
- Direct Gutenberg/shortcode export for newer WordPress — clipboard HTML paste only

## Context

- Target market: Vietnamese SaaS, small-to-mid content teams on legacy CMS platforms
- The core pain is that legacy editors (CKEditor/TinyMCE) on platforms like Haravan and Sapo support rich HTML but not modern visual builders — there is no native way to get landing-page-quality blocks into them
- Key technical challenge: GrapesJS natively outputs HTML with external CSS classes and possible inline JavaScript. The CSS Isolation Engine must strip all of this and reduce to purely inlined `style=` attributes so the output survives CMS security filters
- Claude API must output valid GrapesJS JSON (not just HTML) — Few-Shot Prompting is the approach; the prompt system design is critical to output quality
- Real-time rendering means the frontend loads the GrapesJS JSON and calls `editor.loadData()` without re-mounting the component

## Constraints

- **Tech Stack**: Next.js App Router, Tailwind CSS, Node.js, MongoDB, GrapesJS — established by PRD; no swap
- **AI Model**: Claude 3.5 Sonnet (Anthropic API) — optimized for structured JSON output; primary cost driver
- **Output Format**: Inline CSS only (no `<style>` tag, no JavaScript) — required by CMS XSS filters
- **Platform**: Web app only — no mobile-native, no desktop app
- **Language**: Vietnamese content output and Vietnamese UI

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GrapesJS as drag-and-drop engine in Static HTML / Pure Inline CSS mode | Industry-grade editor with JSON-based state, supports inline CSS output natively | — Pending |
| Inline CSS output (no scoped `<style>` tag) | `<style>` tags are often stripped by CMS XSS filters; inline survives universally | — Pending |
| Claude 3.5 Sonnet for AI generation | Optimized for structured JSON output vs. generic text models | — Pending |
| Few-Shot Prompting for GrapesJS JSON | Reliable JSON schema adherence requires example-based prompting | — Pending |
| Auto-name blocks from prompt text | Reduces friction at save time; users can rename later if needed | — Pending |
| Free in v1 | Validate product-market fit before introducing payment friction | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-18 after initialization*
