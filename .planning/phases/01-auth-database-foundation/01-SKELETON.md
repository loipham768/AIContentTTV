---
phase: 01-auth-database-foundation
created: 2026-05-19
walking_skeleton_complete: false
---

# Walking Skeleton — AI Content Booster

## What the Skeleton Proves

The full stack works end-to-end: browser request reaches a Next.js 15 App Router page, the route is protected by `middleware.ts`, the Server Component calls `auth()` to read the session, and the `dbConnect()` singleton opens a real connection to MongoDB Atlas. One complete auth round-trip (register → login → `/editor` → logout) closes the entire vertical circuit before any feature work begins.

## Walking Skeleton Definition

> A user can visit `/login`, register a new account, authenticate, land on a protected `/editor` page that shows their email, and log out back to `/login` — using real MongoDB Atlas storage and real NextAuth v5 JWT sessions.

This is the thinnest deliverable that exercises every layer:

| Layer | Component | Thin Slice Representation |
|-------|-----------|--------------------------|
| Browser | `components/auth/LoginRegisterCard.tsx` | Tab-toggle form, `signIn()`, `fetch /api/auth/register` |
| Routing / Middleware | `middleware.ts` | `export { auth as middleware }` + matcher for `/editor`, `/api/:path*` |
| Server Component | `app/editor/page.tsx` | Calls `auth()`, redirects if no session, renders `session.user.email` |
| API — Auth | `app/api/auth/[...nextauth]/route.ts` | NextAuth handlers; Credentials `authorize()` calls `dbConnect()` |
| API — Register | `app/api/auth/register/route.ts` | Zod validate → bcrypt.hash(12) → `User.create()` |
| ORM | `models/User.ts` | Mongoose schema + model guard |
| DB Connection | `lib/mongodb.ts` | `dbConnect()` singleton on `global.mongoose` |
| Database | MongoDB Atlas | `users` collection with `email` (unique) + `passwordHash` |
| Auth Config | `auth.ts` | NextAuth v5: Credentials provider, JWT strategy, jwt/session callbacks |

## Thin Slice Sequence

```
Browser
  → GET /editor (unauthenticated)
      → middleware.ts: no session → redirect /login?callbackUrl=/editor
  → GET /login
      → app/login/page.tsx (Server Component): auth() returns null → render LoginRegisterCard
  → [Register tab] POST /api/auth/register { email, password }
      → Zod validate → dbConnect() → bcrypt.hash(password,12) → User.create()
      → 201 OK
  → LoginRegisterCard calls signIn('credentials', { redirect:false })
      → NextAuth authorize(): dbConnect() → User.findOne() → bcrypt.compare() → { id, email }
      → JWT issued in HttpOnly cookie
  → window.location.href = '/editor'  (callbackUrl restored per D-08)
  → GET /editor (authenticated)
      → middleware.ts: session present → NextResponse.next()
      → app/editor/page.tsx: auth() → session → renders email ✓
  → [Logout] signOut({ callbackUrl: '/login' })
      → NextAuth clears cookie → redirect /login
```

## Integration Points Proved

1. **MongoDB Atlas connection** — `dbConnect()` singleton opens real Atlas connection; `users` collection written and read.
2. **bcryptjs hashing** — password stored as `$2b$12$...` hash; `bcrypt.compare()` returns true on valid password.
3. **NextAuth JWT cookie** — `session: { strategy: 'jwt' }` issues HttpOnly cookie; persists across browser refresh.
4. **Middleware redirect** — `middleware.ts` intercepts `/editor` without session → `/login?callbackUrl=/editor`.
5. **Server Component `auth()` call** — `app/editor/page.tsx` calls `auth()` from `@/auth`; session hydrated from JWT.
6. **TypeScript session augmentation** — `session.user.id` typed via `types/next-auth.d.ts`.
7. **`export const runtime = 'nodejs'`** — both `/api/auth/register` and `auth.ts` `authorize()` run in Node.js; no Edge Runtime crash.

## Architectural Decisions Established (carry into all phases)

| Decision | Value | Source |
|----------|-------|--------|
| Framework | Next.js 15.3.9 (`create-next-app@next-15-3`) | D-01, RESEARCH Pitfall 1 |
| Auth library | `next-auth@beta` (5.0.0-beta.31) | D-18, CLAUDE.md |
| Session accessor | `auth()` from `@/auth` — never `getServerSession()` | D-18, CLAUDE.md |
| Route protection | `middleware.ts` + `auth()` belt-and-suspenders | D-06 |
| DB connection | `dbConnect()` singleton in `lib/mongodb.ts` | D-20, CLAUDE.md |
| Password hashing | `bcryptjs` salt rounds ≥ 12 | D-21, ASVS V6 |
| Validation | Zod client-side + Zod server-side | D-13 |
| Runtime declaration | `export const runtime = 'nodejs'` on all DB route handlers | D-19, CLAUDE.md |
| Mongoose model guard | `mongoose.models.X \|\| mongoose.model('X', Schema)` | D-17 |
| JWT payload | `{ id: user._id.toString(), email }` | D-16 |
| Auth page | Single `/login` route, tab toggle | D-02 |
| Post-auth destination | `/editor` | D-03 |
| Vietnamese error — login | `"Email hoặc mật khẩu không đúng"` | D-10 |
| Vietnamese error — dupe | `"Email này đã được sử dụng"` | D-11 |
| Tailwind | 4.3.0, CSS-first config (no `tailwind.config.js`) | RESEARCH Standard Stack |

## Directory Layout (established by skeleton)

```
/
├── auth.ts
├── middleware.ts
├── .env.local                  (gitignored)
├── app/
│   ├── layout.tsx
│   ├── page.tsx                (redirects to /login)
│   ├── login/
│   │   └── page.tsx
│   ├── editor/
│   │   └── page.tsx
│   └── api/
│       └── auth/
│           ├── [...nextauth]/
│           │   └── route.ts
│           └── register/
│               └── route.ts
├── components/
│   └── auth/
│       └── LoginRegisterCard.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   └── User.ts
├── types/
│   └── next-auth.d.ts
└── tests/
    ├── api/
    │   └── register.test.ts
    ├── auth/
    │   ├── signin.test.ts
    │   ├── session.test.ts
    │   └── signout.test.ts
    └── unit/
        ├── user-model.test.ts
        └── mongodb.test.ts
```

## Skeleton Completion Criteria

- [ ] `npm run build` exits 0 (no TypeScript errors, no missing modules)
- [ ] `npx vitest run` exits 0 (all stubs pass their placeholder assertions)
- [ ] MongoDB Atlas shows a real connection when `dbConnect()` is called
- [ ] GET /editor without session redirects to /login
- [ ] GET /login with active session redirects to /editor
- [ ] POST /api/auth/register with valid body returns 201 and stores `$2b$12$` hash
- [ ] POST /api/auth/[...nextauth] with valid credentials issues JWT cookie
- [ ] signOut() clears cookie and redirects to /login
