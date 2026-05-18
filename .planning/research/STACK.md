# Technology Stack

**Project:** AI Content Booster
**Researched:** 2026-05-18
**Confidence:** HIGH (all versions verified from npm registry; patterns verified via Context7 official docs)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest stable) | Full-stack React framework | App Router is the stable 2025 standard; Server Components + Route Handlers eliminate a separate API server. |
| React | 19.x (bundled with Next.js 15) | UI rendering | Required by Next.js 15; concurrent features are stable. |
| TypeScript | 5.x | Type safety | Non-negotiable for a schema-heavy project where GrapesJS JSON, Mongoose documents, and Claude API responses all need typed contracts. |
| Tailwind CSS | 4.x | Utility CSS for the app shell UI | v4 uses a CSS-first config. Use only for the Next.js application shell — never inside GrapesJS canvas output. |

### Database

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| MongoDB Atlas | Managed cloud | Document storage | GrapesJS JSON (blocks, components, styles) is a nested document — fits MongoDB naturally without schema migrations. |
| Mongoose | 9.x | ODM / schema layer | `InferSchemaType` gives TypeScript inference directly from schema definition. Mongoose 9 is the current stable major. |

### AI Integration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@anthropic-ai/sdk` | 0.96.x | Claude API client | Official SDK. Use `client.messages.parse()` with `zodOutputFormat()` for schema-validated GrapesJS JSON output. |
| Zod | 4.x | Schema validation | Validates Claude's output against the GrapesJS JSON schema before it reaches the editor. Required for the `zodOutputFormat` helper. |

### Authentication

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| NextAuth.js | 5.0.0-beta.31 (`next-auth@beta`) | Email + password auth | v5 (Auth.js) is the App Router-native version. Exposes `auth()` as a server function callable in Route Handlers and Server Components. |
| `bcryptjs` | 3.x | Password hashing | Pure-JS bcrypt — no native bindings, works everywhere. |

### Visual Editor

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GrapesJS | 0.22.x | Drag-and-drop visual block editor | Only mature open-source visual builder with JSON-based state and programmable CSS output. |
| `@grapesjs/react` | 2.x | React wrapper for GrapesJS | Official React wrapper. Avoids double-initialization under React StrictMode. Mark as `'use client'`. |
| `grapesjs-preset-webpage` | 1.x | Block presets | Standard layout blocks (columns, text, image, link). Use as baseline. |

### Supporting Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `juice` | latest | CSS inliner — merges `editor.getCss()` rules into `style=""` attributes for the Copy HTML export pipeline |
| `lucide-react` | latest | App shell icons |
| `sonner` | latest | Toast notifications ("Copied!", generation status) |

---

## Architecture-Critical Patterns

### GrapesJS: Inline-CSS-Only Output (CSS Isolation Engine)

GrapesJS natively stores styles as CSS rules with class selectors. The default output has HTML with class attributes + a separate CSS string. CMS platforms strip `<style>` tags via XSS filters.

**Two-step approach:**

**Step 1 — `selectorManager.componentFirst: true` at init:**

```typescript
// lib/grapes-config.ts
export function createEditor(containerId: string) {
  return grapesjs.init({
    container: `#${containerId}`,
    storageManager: false,
    plugins: [grapesjsPresetWebpage],
    selectorManager: {
      componentFirst: true,  // styles go on component.style, not CSS classes
    },
  });
}
```

**Step 2 — Post-process with `juice` at export:**

```typescript
// lib/css-isolation.ts
import juice from 'juice';

export function toInlineCssHtml(editor: any): string {
  const html = editor.getHtml({ cleanId: true });
  const css = editor.getCss({ keepUnusedStyles: false });
  const merged = juice(`<style>${css}</style>${html}`);
  return merged
    .replace(/ class="[^"]*"/g, '')
    .replace(/ id="[^"]*"/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
```

### MongoDB + Next.js: Connection Singleton

```typescript
// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
let cached = (global as any).mongoose ?? { conn: null, promise: null };
(global as any).mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { maxPoolSize: 10 });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```

Add `export const runtime = 'nodejs'` to every Route Handler that calls `dbConnect()`.

### Anthropic SDK: Structured GrapesJS JSON Generation

```typescript
// lib/ai/generate-block.ts
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod/v4';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GrapesComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    tagName: z.string().optional(),
    type: z.string().optional(),
    attributes: z.record(z.string()).optional(),
    style: z.record(z.string()).optional(),
    components: z.array(GrapesComponentSchema).optional(),
    content: z.string().optional(),
  })
);

const GrapesBlockSchema = z.object({
  components: z.array(GrapesComponentSchema),
});

export async function generateBlock(vietnamesePrompt: string) {
  const message = await client.messages.parse({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    system: `You are a GrapesJS JSON generator for Vietnamese content marketing blocks.
Output ONLY valid GrapesJS project data JSON. All styles MUST be in the "style" object
on each component — never use CSS class names. Vietnamese copywriting only.
[INSERT_FEW_SHOT_EXAMPLES_HERE]`,
    messages: [{ role: 'user', content: vietnamesePrompt }],
    output_config: { format: zodOutputFormat(GrapesBlockSchema) },
  });
  return message.parsed_output;
}
```

For streaming UX, use `messages.stream()` and emit SSE from a Route Handler. Parse the final accumulated text with Zod once streaming completes.

### NextAuth v5: Email + Password

```typescript
// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import { z } from 'zod/v4';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials);
        await dbConnect();
        const user = await User.findOne({ email }).lean();
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
});
```

---

## Installation

```bash
# Core framework
npm install next@15 react react-dom typescript

# Database
npm install mongoose@9

# Authentication
npm install next-auth@beta bcryptjs
npm install -D @types/bcryptjs

# AI integration
npm install @anthropic-ai/sdk zod

# Visual editor
npm install grapesjs @grapesjs/react grapesjs-preset-webpage

# CSS isolation
npm install juice

# UI
npm install tailwindcss lucide-react sonner

# Dev
npm install -D @types/node @types/react @types/react-dom
```

---

## Environment Variables

```bash
# .env.local
MONGODB_URI=mongodb+srv://...
ANTHROPIC_API_KEY=sk-ant-...
AUTH_SECRET=<random 32+ char string>
NEXTAUTH_URL=http://localhost:3000
```

---

## What NOT to Use

| Rejected | Reason |
|----------|--------|
| `pages/` directory routing | App Router is current standard; mixing breaks NextAuth v5 |
| Edge Runtime for Mongoose routes | Mongoose requires Node.js runtime — always `export const runtime = 'nodejs'` |
| GrapesJS `storageManager` autosave | Fires on every change; disable it and implement explicit save |
| `next-auth@4` (stable release) | Requires Pages Router-style API routes — wrong for App Router |
| Inline `<script>` in AI-generated blocks | Explicitly prohibited in system prompt; CMS XSS filters strip them |
| CSS-in-JS inside GrapesJS canvas | React rendering cycles don't work inside GrapesJS's directly-managed DOM |
| MongoDB transactions for block saves | Single-document upserts — transactions add latency with no benefit at v1 scale |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Auth | NextAuth v5 | Clerk | Managed service cost; no social auth in v1 makes Clerk's value minimal |
| ODM | Mongoose 9 | Native MongoDB Driver | Mongoose adds TypeScript schema inference and validation with less boilerplate |
| AI SDK | `@anthropic-ai/sdk` direct | Vercel AI SDK | Direct SDK is simpler when Claude is the only model in scope |
| CSS Inliner | `juice` | `inline-css` | `juice` has broader CSS support and better maintenance |
| GrapesJS React | `@grapesjs/react` | Manual `useEffect` mount | Manual mounting is fragile under StrictMode's double-invoke |
