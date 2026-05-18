# AI Content Booster — Project Guide

## What This Is

Vietnamese-market SaaS tool. Users enter a Vietnamese prompt, AI generates a GrapesJS visual content block, they edit inline, then copy a zero-JS inline-CSS HTML string to paste into CKEditor/TinyMCE on any CMS (Haravan, Sapo, WordPress).

**Stack:** Next.js 15 App Router · GrapesJS 0.22 · Claude API (`@anthropic-ai/sdk`) · MongoDB Atlas · NextAuth.js v5 · Tailwind CSS 4

**Core value:** Vietnamese prompt → production-ready zero-JS HTML block in under 60 seconds.

## GSD Workflow

This project uses the GSD (Get Shit Done) planning system. All planning artifacts live in `.planning/`.

**Current state:** See `.planning/STATE.md`
**Roadmap:** See `.planning/ROADMAP.md`
**Requirements:** See `.planning/REQUIREMENTS.md`

### Standard commands

```
/gsd:discuss-phase N    # Gather context before planning
/gsd:plan-phase N       # Create PLAN.md for a phase
/gsd:execute-phase N    # Execute all plans in a phase
/gsd:verify-work N      # Verify phase goals were met
/gsd:progress           # Check current state and advance
```

## Architecture Rules

**GrapesJS must always be dynamically imported with `ssr: false`:**
```typescript
const GrapesEditor = dynamic(() => import('@/components/GrapesEditor'), { ssr: false })
```

**All MongoDB route handlers must declare Node.js runtime:**
```typescript
export const runtime = 'nodejs'
```

**CSS Isolation Engine is required for every HTML export** — never use `editor.getHtml()` alone; always run through `lib/cssIsolation.ts` which inlines all CSS via `juice` and strips class/script/data-gjs attributes.

**Validate AI output before loading into GrapesJS** — `client.messages.parse()` with `zodOutputFormat(GrapesBlockSchema)` is mandatory; never call `editor.loadProjectData()` on unvalidated Claude output.

**MongoDB connection singleton** — always use `dbConnect()` from `lib/mongodb.ts`; never call `mongoose.connect()` directly in a route handler.

**Auth in App Router** — use `auth()` from `@/auth`, never `getServerSession()` (Pages Router pattern).

## Critical Constraints

- **Zero-JS output**: Exported HTML must never contain `<script>` tags or dynamic JavaScript — CMS XSS filters will strip them silently
- **Inline CSS only**: No `<style>` tag in exported HTML — only `style=""` attributes on each element
- **Vietnamese content**: AI-generated copy must be in Vietnamese — enforce via system prompt
- **No base64 images**: Use absolute URL images only — BSON 16 MB limit

## Key Files (once built)

- `lib/cssIsolation.ts` — CSS Isolation Engine (core export logic)
- `lib/ai/generate-block.ts` — Claude API integration with Zod schema validation
- `lib/mongodb.ts` — Mongoose connection singleton
- `lib/promptBuilder.ts` — Few-shot prompt assembly for Vietnamese content
- `components/GrapesEditor.tsx` — GrapesJS wrapper (`'use client'`, imperative ref)
- `auth.ts` — NextAuth v5 Credentials config
- `app/api/generate/route.ts` — AI generation endpoint
- `app/api/projects/route.ts` — Project CRUD endpoint

## Do Not

- Mount GrapesJS in a Server Component or without `ssr: false`
- Use `getServerSession()` — use `auth()` instead
- Use `next-auth@4` or `pages/` directory patterns
- Store base64 image data in MongoDB documents
- Export HTML without running it through the CSS Isolation Engine
- Call `loadProjectData()` without Zod validation
- Use Edge Runtime on any route that touches Mongoose
