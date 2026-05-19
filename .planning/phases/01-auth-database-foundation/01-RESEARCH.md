# Phase 1: Auth + Database Foundation - Research

**Researched:** 2026-05-19
**Domain:** Next.js 16 App Router · NextAuth.js v5 (beta) · MongoDB Atlas · Mongoose 9 · bcryptjs
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Start from scratch with `npx create-next-app` (Next.js 15, TypeScript, App Router, Tailwind CSS). No existing scaffold exists — Phase 1 initializes the full project.
- **D-02:** Single `/login` route with a Login/Register tab toggle. One page, two tabs. `NextAuth.pages.signIn` points to `/login`.
- **D-03:** After successful login or registration, redirect to `/editor` (the main workspace).
- **D-04:** Already-authenticated users visiting `/login` are redirected to `/editor` immediately.
- **D-05:** Visual style: centered card, minimal — Tailwind utility classes only. No brand colors or logo in Phase 1 (that's Phase 6).
- **D-06:** Belt-and-suspenders protection: `proxy.ts` (Next.js 16) / `middleware.ts` (Next.js 15) with `config.matcher` covers `/editor` and `/api/*`; each protected Server Component also calls `await auth()` to access session data.
- **D-07:** Matcher scope: `/editor` (the only protected page in v1) and `/api/:path*` (all API routes).
- **D-08:** Preserve `callbackUrl` — users redirected to `/login` land on their original destination after authenticating.
- **D-09:** API routes return `{ error: 'Unauthorized' }` with HTTP 401 for unauthenticated requests. Pages redirect to `/login`. Never return HTML to API callers.
- **D-10:** Login failure: `"Email hoặc mật khẩu không đúng"` (generic). Prevents email enumeration.
- **D-11:** Duplicate email on registration: `"Email này đã được sử dụng"`.
- **D-12:** Validation errors: inline under each form field (not a top-level banner).
- **D-13:** Client-side validation (instant feedback) + server-side Zod (source of truth).
- **D-14:** Minimal schema: `email` + `passwordHash` + timestamps. No display name in v1.
- **D-15:** Unique index on `email` at DB level. `{ unique: true }` in schema.
- **D-16:** JWT payload: `id` (user._id as string) + `email` only.
- **D-17:** Model guard: `mongoose.models.User || mongoose.model('User', UserSchema)`.
- **D-18:** Use `auth()` from `@/auth` everywhere — never `getServerSession()`.
- **D-19:** All Route Handlers calling `dbConnect()` must declare `export const runtime = 'nodejs'`.
- **D-20:** Always use `dbConnect()` from `lib/mongodb.ts` — never call `mongoose.connect()` directly.
- **D-21:** `bcryptjs` with salt rounds ≥ 12. Never log or store raw passwords.

### Claude's Discretion
- None specified — all key decisions are locked.

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUTH-01 | User can register with email + password. Accepts valid email + password (min 8 chars). Password stored as bcrypt hash (salt rounds ≥ 12). Duplicate email returns a clear error. | Registration API route, bcryptjs hashing, Zod validation, duplicate-email error (D-11) |
| AUTH-02 | User can log in and stay logged in across sessions. JWT session persists across browser refreshes. Invalid credentials return a Vietnamese-language error. | NextAuth v5 Credentials provider, JWT strategy, `session: { strategy: 'jwt' }`, D-10 |
| AUTH-03 | User can log out from any page. Session is cleared on logout. Redirects to login page. | `signOut()` from `next-auth/react` in client components, `pages.signIn` redirect |
</phase_requirements>

---

## Summary

Phase 1 is a green-field full-stack foundation: scaffold a Next.js project, connect it to MongoDB Atlas, implement a User Mongoose model, and deliver three auth flows (register, login, logout) behind a single `/login` page with tab-toggle UX.

**Critical version finding:** `npx create-next-app` now scaffolds **Next.js 16** (latest = 16.2.6), not 15. Next.js 16 renamed `middleware.ts` to `proxy.ts` (deprecated since v16.0.0). The decision to install Next.js 15 explicitly (`npm install next@15`) is the safest path to match the stack declared in CONTEXT.md and CLAUDE.md. If the team wants to use Next.js 16, the proxy filename changes from `middleware.ts` to `proxy.ts` and the export name changes from `middleware` to `proxy` — but NextAuth v5's auth config (`auth.ts`) remains identical. This decision must be made before scaffolding.

NextAuth v5 (5.0.0-beta.31) is confirmed on npm and is the App Router-native version. Its `auth()` export replaces `getServerSession()` completely. The Credentials provider handles both login flow AND can be called from the registration endpoint indirectly (or separately via a dedicated `/api/auth/register` route that hashes and creates the user, then signals the client to call `signIn()`).

**Primary recommendation:** Scaffold with `npx create-next-app@next-15-3` to pin Next.js 15 (stable 15.3.9), use `middleware.ts` (not `proxy.ts`), then install `next-auth@beta bcryptjs mongoose@9`. This gives a known-stable surface matching all locked decisions.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| User registration (hash + store) | API / Backend (`/api/auth/register`) | — | Password hashing must happen server-side; never in the browser |
| Credential verification (login) | API / Backend (`NextAuth authorize()`) | — | `bcrypt.compare()` must run server-side in the Credentials `authorize` function |
| Session token issuance | API / Backend (NextAuth JWT strategy) | — | NextAuth signs and issues JWT on the server |
| Session persistence (browser refresh) | Browser (JWT cookie) | — | NextAuth stores JWT in an HttpOnly cookie that survives refresh |
| Route protection | Proxy/Middleware layer (`middleware.ts` / `proxy.ts`) | Frontend Server (Server Components via `auth()`) | Belt-and-suspenders: middleware at the edge, `auth()` in Server Components near data |
| Login/Register UI tab toggle | Browser / Client Component | — | Tab state is client-only; `'use client'` directive required |
| Form validation (instant) | Browser / Client Component | — | React state + client-side Zod for immediate feedback |
| Form validation (authoritative) | API / Backend | — | Server-side Zod in `authorize()` and `/api/auth/register` |
| Logout | Browser (`signOut()` call) | API / Backend (NextAuth clears cookie) | `signOut()` from `next-auth/react` triggers server-side cookie clearance |
| MongoDB connection management | API / Backend (`lib/mongodb.ts` singleton) | — | Must be Node.js runtime; never Edge |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 15.3.9 (`next-15-3` tag) | Full-stack React framework | Pin to Next.js 15 to match locked decisions and avoid middleware→proxy rename in Next.js 16 |
| `react` / `react-dom` | 19.x (bundled with Next.js 15) | UI rendering | Bundled with Next.js 15; concurrent features stable |
| `typescript` | 5.x | Type safety | Required for Zod schema inference and Mongoose `InferSchemaType` |
| `tailwindcss` | 4.3.0 | Utility CSS for app shell UI | v4 uses CSS-first config; no `tailwind.config.js` needed |
| `next-auth@beta` | 5.0.0-beta.31 | Email + password auth for App Router | Only NextAuth version with native `auth()` for App Router; `next-auth@4` is incompatible |
| `bcryptjs` | 3.0.3 | Password hashing (pure JS, no native bindings) | Works in all Node.js environments without build toolchain; salt rounds ≥ 12 |
| `@types/bcryptjs` | 3.0.0 | TypeScript types for bcryptjs | Required for typed `hash()` and `compare()` calls |
| `mongoose` | 9.6.2 | MongoDB ODM + schema validation | `InferSchemaType` gives TypeScript inference; v9 is current stable major |
| `zod` | 4.4.3 | Server-side schema validation | Validates registration input and login credentials before DB operations |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@types/node` | latest | Node.js type definitions | Required for `global` augmentation in `lib/mongodb.ts` singleton |
| `@types/react` / `@types/react-dom` | latest | React type definitions | Required for JSX and component typing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next@15.3.9` (pinned) | `next@latest` (16.2.6) | Next.js 16 renames `middleware.ts` → `proxy.ts`; requires export rename `middleware` → `proxy`; NextAuth v5 adapts cleanly but adds scaffolding gotcha |
| `bcryptjs` | `argon2` | `argon2` requires native bindings and `--openssl-legacy-provider` on some systems; `bcryptjs` is zero-native, simpler to use |
| `next-auth@beta` | `Clerk` | Clerk is a managed SaaS with cost at scale; no benefit for single-provider email+password with no social OAuth in v1 |
| `mongoose@9` | Native MongoDB Driver | Mongoose adds TypeScript schema inference and built-in validators; less boilerplate for simple schemas |

**Installation (pinned to stable Next.js 15):**
```bash
npx create-next-app@next-15-3 . --typescript --app --tailwind --src-dir --import-alias "@/*"
npm install next-auth@beta bcryptjs mongoose@9
npm install -D @types/bcryptjs
```

**Version verification (confirmed 2026-05-19):**
```
next@next-15-3     → 15.3.9  (npm view next@next-15-3 version)
next-auth@beta     → 5.0.0-beta.31
bcryptjs           → 3.0.3
@types/bcryptjs    → 3.0.0
mongoose           → 9.6.2
zod                → 4.4.3
tailwindcss        → 4.3.0
```

---

## Package Legitimacy Audit

> slopcheck ran against PyPI (wrong ecosystem — produces false SLOP for Node-only packages like `next-auth` and `bcryptjs`). All packages verified against npm registry directly with source repository confirmation.

| Package | Registry | Source Repo | npm version | postinstall script | Disposition |
|---------|----------|-------------|-------------|-------------------|-------------|
| `next-auth@beta` | npm | github.com/nextauthjs/next-auth | 5.0.0-beta.31 | none | Approved |
| `bcryptjs` | npm | github.com/dcodeIO/bcrypt.js | 3.0.3 | none | Approved |
| `mongoose` | npm | github.com/Automattic/mongoose | 9.6.2 | none | Approved |
| `zod` | npm | github.com/colinhacks/zod | 4.4.3 | none | Approved |
| `tailwindcss` | npm | github.com/tailwindlabs/tailwindcss | 4.3.0 | none | Approved |
| `@types/bcryptjs` | npm | DefinitelyTyped | 3.0.0 | none | Approved |

**Packages removed due to slopcheck [SLOP] verdict:** none  
**Packages flagged as suspicious [SUS]:** none  

*Note: slopcheck falsely flagged `next-auth` and `bcryptjs` as [SLOP] because it checked PyPI, not npm. All packages confirmed legitimate via direct npm registry verification with authoritative source repos.*

---

## Architecture Patterns

### System Architecture Diagram

```
Browser
  |
  ├── GET /login  ──────────────────────────────────────►  app/login/page.tsx (Server Component)
  │                                                          └── checks auth() → redirect /editor if session exists
  │
  ├── POST /api/auth/register ────────────────────────►  app/api/auth/register/route.ts
  │      { email, password }                               ├── runtime = 'nodejs'
  │                                                         ├── Zod validate
  │                                                         ├── dbConnect()
  │                                                         ├── User.findOne({ email }) → 409 if exists
  │                                                         ├── bcrypt.hash(password, 12)
  │                                                         └── User.create({ email, passwordHash })
  │
  ├── POST /api/auth/[...nextauth]  ──────────────────►  NextAuth Credentials authorize()
  │      { email, password }                               ├── Zod validate
  │      (via signIn("credentials"))                        ├── dbConnect()
  │                                                         ├── User.findOne({ email })
  │                                                         ├── bcrypt.compare(password, passwordHash)
  │                                                         └── returns { id, email } or null
  │
  ├── POST /api/auth/[...nextauth]?action=signout ───►  NextAuth clears JWT cookie
  │      (via signOut())
  │
  └── GET /editor  ──────────────────────────────────►  middleware.ts (proxy layer)
                                                          └── req.auth null? redirect /login?callbackUrl=...
                                                               else NextResponse.next()

MongoDB Atlas
  └── users collection
        { _id, email (unique), passwordHash, createdAt, updatedAt }
```

### Recommended Project Structure
```
/
├── auth.ts                          # NextAuth v5 config — exports { handlers, auth, signIn, signOut }
├── middleware.ts                    # Route protection — export { auth as middleware } + config.matcher
├── .env.local                       # MONGODB_URI, AUTH_SECRET, NEXTAUTH_URL
├── app/
│   ├── layout.tsx                   # Root layout (Server Component)
│   ├── page.tsx                     # Root page → redirect to /login or /editor
│   ├── login/
│   │   └── page.tsx                 # Login/Register tab-toggle page (Server Component shell)
│   ├── editor/
│   │   └── page.tsx                 # Protected editor page stub (Server Component, calls auth())
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/
│       │   │   └── route.ts         # NextAuth handler: export { handlers as GET, handlers as POST }
│       │   └── register/
│       │       └── route.ts         # Custom registration endpoint
├── components/
│   └── auth/
│       └── LoginRegisterCard.tsx    # 'use client' — tab toggle, form state, signIn/signOut calls
├── lib/
│   └── mongodb.ts                   # dbConnect() singleton
├── models/
│   └── User.ts                      # Mongoose schema + model guard
└── types/
    └── next-auth.d.ts               # Module augmentation for session.user.id
```

### Pattern 1: MongoDB Connection Singleton

**What:** Cache the Mongoose connection on the Node.js `global` object across hot reloads and serverless invocations.
**When to use:** In every Route Handler that touches the database.

```typescript
// lib/mongodb.ts
// Source: .planning/research/STACK.md (verified against Mongoose docs)
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

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

### Pattern 2: Mongoose Model Guard

**What:** Prevent `OverwriteModelError` on Next.js hot reload by checking `mongoose.models` before calling `mongoose.model()`.
**When to use:** Every Mongoose model definition.

```typescript
// models/User.ts
// Source: .planning/research/PITFALLS.md P10
import mongoose, { InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
```

### Pattern 3: NextAuth v5 Config with Credentials Provider

**What:** Full `auth.ts` config with JWT strategy, Credentials provider, and JWT/session callbacks to expose `user.id`.
**When to use:** Single config file; everything exports from here.

```typescript
// auth.ts
// Source: authjs.dev/getting-started/authentication/credentials [CITED]
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});
```

### Pattern 4: Route Handler for User Registration

**What:** Dedicated POST endpoint that hashes password and creates User document. Separate from NextAuth's built-in `authorize()` — registration is not a NextAuth flow.
**When to use:** `POST /api/auth/register`.

```typescript
// app/api/auth/register/route.ts
// Source: CONTEXT.md D-19, D-20, D-21 + CLAUDE.md architecture rules
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }
    const { email, password } = parsed.data;
    await dbConnect();
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { error: 'Email này đã được sử dụng' },  // D-11
        { status: 409 }
      );
    }
    const passwordHash = await bcrypt.hash(password, 12);  // D-21: rounds ≥ 12
    await User.create({ email, passwordHash });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}
```

### Pattern 5: NextAuth Route Handler

```typescript
// app/api/auth/[...nextauth]/route.ts
// Source: authjs.dev/getting-started/installation [CITED]
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

### Pattern 6: Middleware (Next.js 15 — `middleware.ts`)

```typescript
// middleware.ts (Next.js 15)
// Source: authjs.dev/getting-started/session-management/protecting [CITED]
export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/editor', '/api/:path*'],  // D-07
};
```

> **CRITICAL — Next.js 16 variant:** If scaffolding with Next.js 16 (`latest`), rename file to `proxy.ts` and export as:
> ```typescript
> // proxy.ts (Next.js 16)
> export { auth as proxy } from '@/auth';
> export const config = { matcher: ['/editor', '/api/:path*'] };
> ```

### Pattern 7: TypeScript Session Augmentation

```typescript
// types/next-auth.d.ts
// Source: authjs.dev/guides/extending-the-session [CITED]
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}
```

### Pattern 8: Login/Register Client Component (Tab Toggle)

**What:** A single `'use client'` card component with React tab state. Calls `signIn("credentials", ...)` for login and `fetch("/api/auth/register")` + then `signIn()` for registration.

```typescript
// components/auth/LoginRegisterCard.tsx  ('use client')
// Source: CONTEXT.md D-02, D-03, D-10, D-11, D-12, D-13
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export function LoginRegisterCard() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  // Client-side validation state per field...

  async function handleLogin(formData: FormData) {
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,  // handle redirect manually after checking result.error
    });
    if (result?.error) {
      setError('Email hoặc mật khẩu không đúng');  // D-10: generic, no enumeration
    } else {
      window.location.href = '/editor';  // D-03
    }
  }

  async function handleRegister(formData: FormData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);  // D-11: "Email này đã được sử dụng"
      return;
    }
    // Auto-login after successful registration (D-03)
    await handleLogin(formData);
  }
  // Render: tab bar + form fields + inline field errors (D-12)
}
```

### Anti-Patterns to Avoid

- **`getServerSession()` in App Router:** Always returns null in Next.js 13+ App Router. Use `auth()` from `@/auth`.
- **`mongoose.connect()` directly in route handlers:** Creates a new connection pool on every invocation. Always use the `dbConnect()` singleton from `lib/mongodb.ts`.
- **`mongoose.model('User', UserSchema)` without model guard:** Throws `OverwriteModelError` on every hot reload. Always use `mongoose.models.User || mongoose.model(...)`.
- **Calling `loadProjectData()` without Zod validation:** Silently produces blank canvas (Phase 2+ concern, but establishes the pattern).
- **Importing from `next-auth` server-side in client components:** `signIn`/`signOut` for client-side use come from `next-auth/react`, not `next-auth` directly.
- **`export const runtime = 'edge'` on any DB route:** Mongoose requires Node.js runtime. Edge runtime will crash.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Password hashing | Manual crypto.createHash, SHA-256 | `bcryptjs` with `hash(password, 12)` | SHA-256 is reversible with rainbow tables; bcrypt has adaptive cost factor |
| JWT signing + cookie management | Manual `jsonwebtoken` + cookie set/parse | NextAuth v5 JWT strategy | NextAuth handles token rotation, httpOnly cookie, CSRF protection |
| Session reading in Server Components | Cookies API + JWT verify | `auth()` from `@/auth` | `auth()` is the official App Router session accessor; manual reads break on token rotation |
| Mongoose connection per-invocation | `mongoose.connect()` in route handlers | `dbConnect()` singleton | Next.js serverless invocations would exhaust MongoDB Atlas connection pool |
| Email format validation | Regex | `zod.string().email()` | Zod handles edge cases (IDN, plus-addressing) that naive regexes miss |

**Key insight:** Auth is one of the highest-risk domains for custom solutions. Every component (hashing, JWT, CSRF, session) has well-documented attack vectors. Using `nextauth@beta` + `bcryptjs` gives you a tested, maintained surface area with minimal custom code.

---

## Common Pitfalls

### Pitfall 1: Scaffolding with the Wrong Next.js Version

**What goes wrong:** Running `npx create-next-app@latest` in May 2026 installs Next.js 16.2.6, not 15. Next.js 16 uses `proxy.ts` instead of `middleware.ts`. The auth export name changes from `middleware` to `proxy`. CONTEXT.md and CLAUDE.md reference "Next.js 15".
**Why it happens:** `npm view next version` returns `16.2.6` (the `latest` tag). `create-next-app@latest` follows `latest`.
**How to avoid:** Use `npx create-next-app@next-15-3` to explicitly pin to 15.3.9, OR make a deliberate team decision to use Next.js 16 and update `proxy.ts` accordingly.
**Warning signs:** Build output says `next 16.x.x`; creating `middleware.ts` produces a deprecation warning.

### Pitfall 2: NextAuth `authorize()` Returns `null` Silently

**What goes wrong:** When `authorize()` returns `null`, NextAuth maps this to a generic error. The client-side `signIn()` result has `result.error = 'CredentialsSignin'`, not a human-readable Vietnamese message. The error must be caught client-side and mapped to `"Email hoặc mật khẩu không đúng"` (D-10).
**Why it happens:** NextAuth Credentials provider does not forward custom error messages from `authorize()` to the client for security reasons.
**How to avoid:** In `LoginRegisterCard.tsx`, intercept `result.error` on the client and display the Vietnamese string — never try to pass the Vietnamese string from `authorize()`.
**Warning signs:** Generic "CredentialsSignin" text leaking to the UI.

### Pitfall 3: MongoDB Connection Pool Exhaustion (P7)

**What goes wrong:** Each Next.js serverless invocation creates a new `mongoose.connect()`, exhausting Atlas's connection limit.
**How to avoid:** Use the `dbConnect()` singleton that caches on `global.mongoose`. Verify: MongoDB Atlas should show ≤ 10 connections even under concurrent requests.

### Pitfall 4: Mongoose `OverwriteModelError` on Hot Reload (P10)

**What goes wrong:** `mongoose.model('User', UserSchema)` throws on every `next dev` hot reload.
**How to avoid:** Always use the model guard: `mongoose.models.User || mongoose.model('User', UserSchema)`.

### Pitfall 5: Plain-Text Password Storage (P8)

**What goes wrong:** Forgetting bcrypt means passwords stored as plain text.
**How to avoid:** Hash in the registration route before `User.create()`. Verify: every `passwordHash` in MongoDB must start with `$2b$` (bcryptjs identifier).

### Pitfall 6: `callbackUrl` Not Preserved on Redirect

**What goes wrong:** After login, user is sent to `/editor` regardless of where they were trying to go (D-08).
**How to avoid:** Pass `callbackUrl` from the URL params to `signIn()`:
```typescript
const callbackUrl = searchParams.get('callbackUrl') ?? '/editor';
await signIn('credentials', { ..., redirectTo: callbackUrl });
```

### Pitfall 7: `redirect: false` vs `redirect: true` in `signIn()`

**What goes wrong:** Using `redirect: true` (default) causes a full page reload and loses error state. Using `redirect: false` lets you handle the result in JS and show the Vietnamese error message.
**How to avoid:** Always pass `redirect: false` when calling `signIn('credentials', ...)` from a client component. Handle the redirect manually after checking `result.error`.

### Pitfall 8: Next.js 16 `export const runtime` in proxy.ts Throws Error

**What goes wrong:** Next.js 16 docs explicitly state: "The `runtime` config option is not available in Proxy files. Setting the `runtime` config option in Proxy will throw an error."
**How to avoid:** Never add `export const runtime = 'nodejs'` to `middleware.ts` or `proxy.ts`. The runtime declaration belongs only in Route Handlers (`app/api/...`).

---

## Code Examples

### Checking Session in a Server Component

```typescript
// app/editor/page.tsx
// Source: authjs.dev/getting-started/session-management/protecting [CITED]
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function EditorPage() {
  const session = await auth();
  if (!session) redirect('/login');
  // session.user.id and session.user.email are available (from JWT callback)
  return <div>Editor for {session.user.email}</div>;
}
```

### Logout Button in a Client Component

```typescript
'use client';
import { signOut } from 'next-auth/react';  // Note: react subpath, not 'next-auth'

export function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/login' })}>
      Đăng xuất
    </button>
  );
}
```

### API Route Auth Check (D-09)

```typescript
// In any protected API route handler
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... handler logic
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-auth@4` with `pages/api/auth/[...nextauth].ts` | `next-auth@beta` (v5) with `app/api/auth/[...nextauth]/route.ts` | ~2023 | v4 is incompatible with App Router; v5 is the only supported path |
| `getServerSession(authOptions)` | `auth()` from `@/auth` | NextAuth v5 | `getServerSession()` returns null in App Router Server Components |
| `middleware.ts` exporting `middleware` | `proxy.ts` exporting `proxy` | Next.js 16.0 | File convention rename; v15 still uses `middleware.ts` |
| `bcrypt` (native bindings) | `bcryptjs` (pure JS) | Stable ecosystem choice | `bcryptjs` works without native build tools; identical API |
| Mongoose per-request connection | `dbConnect()` singleton on `global` | Established pattern for serverless | Prevents Atlas connection pool exhaustion |

**Deprecated/outdated:**
- `getServerSession()`: Returns null in App Router — replaced by `auth()`.
- `next-auth@4` / `pages/api/auth/[...nextauth].ts`: Pages Router only — not compatible with App Router.
- `middleware.ts` (in Next.js 16): Deprecated in v16, renamed to `proxy.ts`. Still works in Next.js 15.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `create-next-app@next-15-3` installs Next.js 15.3.9 with App Router, TypeScript, and Tailwind configured correctly | Standard Stack / Installation | If wrong, developer must configure manually; low risk since `create-next-app` is stable |
| A2 | NextAuth v5 `5.0.0-beta.31` is the latest beta and is stable enough for MVP use | Standard Stack | If a newer beta introduces breaking changes, auth.ts may need updates; monitor nextauthjs/next-auth releases |
| A3 | MongoDB Atlas free tier supports 100 connections; `maxPoolSize: 10` is safe under development load | Standard Stack | If Atlas plan has lower limits, reduce `maxPoolSize` |
| A4 | `signIn('credentials', { redirect: false })` returns `result.error = 'CredentialsSignin'` on failure in v5 | Architecture Patterns P2 | If error code changes in a future beta, the client-side Vietnamese error mapping breaks |

---

## Open Questions

1. **Next.js 15 vs 16 decision**
   - What we know: `npx create-next-app@latest` scaffolds Next.js 16; `create-next-app@next-15-3` scaffolds 15.3.9. The only user-visible difference in Phase 1 is `middleware.ts` → `proxy.ts` and export rename.
   - What's unclear: Whether the team wants to start on Next.js 16 (latest) and own the rename, or pin to 15 (stable) for now.
   - Recommendation: **Pin to Next.js 15** (`create-next-app@next-15-3`) to match CONTEXT.md and CLAUDE.md decisions. Phase 2 or later can upgrade to 16 with the provided codemod (`npx @next/codemod@canary middleware-to-proxy .`).

2. **`AUTH_SECRET` generation**
   - What we know: NextAuth v5 requires `AUTH_SECRET` (min 32 characters) in `.env.local`.
   - What's unclear: Who generates this secret and how it gets into the developer's environment.
   - Recommendation: Add a task step: `npx auth secret >> .env.local` during scaffold setup.

3. **MongoDB Atlas connection string**
   - What we know: `MONGODB_URI` must be in `.env.local`. Format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`.
   - What's unclear: Whether a MongoDB Atlas cluster and user already exist or need to be created as part of this phase.
   - Recommendation: Add an explicit task step for MongoDB Atlas setup (create cluster → create database user → allowlist IP → copy connection string).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All npm installs, `next dev` | Yes | v22.13.1 | — |
| npm | Package installation | Yes | 10.9.2 | — |
| MongoDB Atlas | `MONGODB_URI` connection | Unknown | — | Use local MongoDB via `mongodb://localhost:27017` for development |
| `create-next-app` | Project scaffold | Available via npx | 16.2.6 (latest), use `@next-15-3` tag | — |

**Missing dependencies with no fallback:** None identified.

**Missing dependencies with fallback:**
- MongoDB Atlas: Can use local MongoDB (`mongodb://localhost:27017`) for development. Atlas is required for production and staging testing.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (recommended) or Jest — neither installed yet; Wave 0 must add one |
| Config file | `vitest.config.ts` — Wave 0 gap |
| Quick run command | `npx vitest run --reporter=dot` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTH-01 | `POST /api/auth/register` with valid email+password returns 201 and creates user with `$2b$` hash | integration | `npx vitest run tests/api/register.test.ts` | ❌ Wave 0 |
| AUTH-01 | `POST /api/auth/register` with duplicate email returns 409 + `"Email này đã được sử dụng"` | integration | `npx vitest run tests/api/register.test.ts` | ❌ Wave 0 |
| AUTH-01 | `POST /api/auth/register` with invalid email returns 400 | integration | `npx vitest run tests/api/register.test.ts` | ❌ Wave 0 |
| AUTH-01 | `POST /api/auth/register` with password < 8 chars returns 400 | integration | `npx vitest run tests/api/register.test.ts` | ❌ Wave 0 |
| AUTH-02 | `signIn('credentials')` with correct credentials returns non-null session | integration | `npx vitest run tests/auth/signin.test.ts` | ❌ Wave 0 |
| AUTH-02 | `signIn('credentials')` with wrong password returns `result.error` | integration | `npx vitest run tests/auth/signin.test.ts` | ❌ Wave 0 |
| AUTH-02 | `auth()` in Server Component returns session after login | integration | `npx vitest run tests/auth/session.test.ts` | ❌ Wave 0 |
| AUTH-03 | `signOut()` clears session and subsequent `auth()` returns null | integration | `npx vitest run tests/auth/signout.test.ts` | ❌ Wave 0 |
| AUTH-01 | `User.passwordHash` field starts with `$2b$` (bcryptjs identifier) | unit | `npx vitest run tests/unit/user-model.test.ts` | ❌ Wave 0 |
| AUTH-01 | `dbConnect()` singleton returns same connection on repeated calls | unit | `npx vitest run tests/unit/mongodb.test.ts` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=dot` (all unit tests, < 5s)
- **Per wave merge:** `npx vitest run` (full suite including integration)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/api/register.test.ts` — covers AUTH-01 (registration flow)
- [ ] `tests/auth/signin.test.ts` — covers AUTH-02 (login flow)
- [ ] `tests/auth/session.test.ts` — covers AUTH-02 (session persistence)
- [ ] `tests/auth/signout.test.ts` — covers AUTH-03 (logout flow)
- [ ] `tests/unit/user-model.test.ts` — covers AUTH-01 (bcrypt hash format, model guard)
- [ ] `tests/unit/mongodb.test.ts` — covers infrastructure (singleton pattern)
- [ ] `vitest.config.ts` — test framework config
- [ ] Framework install: `npm install -D vitest @vitest/coverage-v8`

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Yes | NextAuth v5 Credentials provider + bcryptjs (rounds ≥ 12) |
| V3 Session Management | Yes | NextAuth JWT in HttpOnly cookie; `session: { strategy: 'jwt' }` |
| V4 Access Control | Yes | `middleware.ts` matcher on `/editor` + `auth()` in Server Components |
| V5 Input Validation | Yes | Zod on both client and server for email + password fields |
| V6 Cryptography | Yes | bcryptjs — never hand-roll; salt rounds ≥ 12 per D-21 |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Email enumeration | Information Disclosure | Generic error message D-10: `"Email hoặc mật khẩu không đúng"` for all login failures |
| Brute-force login | Elevation of Privilege | bcrypt cost factor + (v2 concern: rate limiting) |
| Plaintext password storage | Information Disclosure | bcryptjs `hash(password, 12)` — verify `$2b$` prefix in DB |
| Session fixation | Elevation of Privilege | NextAuth regenerates JWT on every sign-in |
| MongoDB injection via `findOne({ email })` | Tampering | Mongoose + Zod validation sanitize the input; string-typed schema rejects operators |
| Missing auth on API routes | Elevation of Privilege | `export const runtime = 'nodejs'` + `auth()` check at route level; middleware as outer defense |
| XSS via Vietnamese error messages | XSS | Error strings are static constants, not user-controlled; React escapes render output |

---

## Project Constraints (from CLAUDE.md)

All directives from `CLAUDE.md` that apply to Phase 1:

1. **Stack:** Next.js 15 App Router · MongoDB Atlas · NextAuth.js v5 · Tailwind CSS 4 — do not deviate
2. **`auth()` from `@/auth`** — never `getServerSession()` (Pages Router pattern, returns null in App Router)
3. **`export const runtime = 'nodejs'`** on all Route Handlers that call `dbConnect()` (including `/api/auth/register`)
4. **`dbConnect()` from `lib/mongodb.ts`** — never call `mongoose.connect()` directly in a route handler
5. **GrapesJS dynamic import** — not Phase 1 scope, but the pattern is established in CLAUDE.md for reference in later phases
6. **No `next-auth@4`** — must use `next-auth@beta` (v5)
7. **No `pages/` directory** — all routes under `app/`
8. **No Edge Runtime** on any route touching Mongoose

---

## Sources

### Primary (HIGH confidence)
- `authjs.dev/getting-started/authentication/credentials` — Credentials provider `authorize()` pattern, signIn server action, client component `signIn('credentials', { redirect: false })` pattern
- `authjs.dev/getting-started/installation` — Package name (`next-auth@beta`), required env var (`AUTH_SECRET`), files to create
- `authjs.dev/getting-started/session-management/protecting` — middleware.ts (Next.js 15) vs proxy.ts (Next.js 16) with `export { auth as middleware }` pattern and `config.matcher`
- `authjs.dev/guides/extending-the-session` — JWT and session callbacks for adding `user.id`, TypeScript module augmentation pattern
- `nextjs.org/docs/app/api-reference/file-conventions/proxy` — Confirmed Next.js 16 renamed `middleware.ts` → `proxy.ts`; version history showing v16.0.0 as the change point; runtime config not available in proxy files
- `.planning/research/STACK.md` — MongoDB singleton pattern with `maxPoolSize`, NextAuth v5 full `auth.ts` example, installation commands
- `.planning/research/PITFALLS.md` — P7 (connection pool), P8 (plaintext passwords), P10 (OverwriteModelError), P15 (getServerSession null)
- npm registry — verified all package versions and source repos via `npm view`

### Secondary (MEDIUM confidence)
- `npm view next dist-tags` — Confirmed `next@latest = 16.2.6`, `next@next-15-3 = 15.3.9`
- `npm view create-next-app version` — Confirmed `create-next-app@latest = 16.2.6`

### Tertiary (LOW confidence)
- NextAuth v5 beta stability for production use — beta status means breaking changes are possible; v5 has been in beta for ~1.5 years with wide adoption

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified on npm with authoritative source repos; versions confirmed 2026-05-19
- Architecture: HIGH — patterns sourced from official authjs.dev and nextjs.org docs
- Pitfalls: HIGH — most sourced from official docs; P7/P8/P10/P15 confirmed in `.planning/research/PITFALLS.md`
- Next.js 15 vs 16 version decision: MEDIUM — the distinction is confirmed but the project decision (which to use) is an open question

**Research date:** 2026-05-19
**Valid until:** 2026-06-18 (30 days; `next-auth@beta` moves faster than stable — re-verify if > 2 weeks old)
