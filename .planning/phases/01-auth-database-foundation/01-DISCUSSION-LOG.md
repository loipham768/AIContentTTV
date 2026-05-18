# Phase 1: Auth + Database Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-18
**Phase:** 1-Auth + Database Foundation
**Areas discussed:** Auth page structure, Route protection strategy, Error message specificity, User model scope

---

## Auth Page Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Combined page with tab toggle | Single /login route with Login/Register tab switch. Cleaner URL, NextAuth pages.signIn points to /login. | ✓ |
| Separate /login and /register routes | Two distinct pages with links between them. Clearer URL intent, more straightforward routing. | |
| Login-first with slide-in register | Login as primary page; register as secondary slide-in panel. | |

**User's choice:** Combined page with tab toggle

| Option | Description | Selected |
|--------|-------------|----------|
| /editor (main workspace) | Send users directly to the editor — fastest path to core value. | ✓ |
| /dashboard (separate landing screen) | Dashboard before editor. Adds a page that doesn't exist yet. | |

**User's choice:** /editor after auth

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — redirect to /editor if already logged in | Prevents confusion if logged-in user visits /login bookmark. | ✓ |
| No — show login form regardless | Simpler but confusing UX. | |

**User's choice:** Yes — auto-redirect already-authenticated users

| Option | Description | Selected |
|--------|-------------|----------|
| Centered card, minimal | White/light card centered on neutral background. Tailwind only. | ✓ |
| Branded with logo and color | Requires finalizing brand colors — Phase 6 work. | |
| Full-width split layout | Left side marketing, right side form. More layout work. | |

**User's choice:** Centered card, minimal

**Notes:** No brand colors or logo in Phase 1. Visual polish deferred to Phase 6.

---

## Route Protection Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| NextAuth middleware + per-page auth() | Belt-and-suspenders: middleware redirects + auth() for session data access. | ✓ |
| Middleware only | Single enforcement point. Server Components still call auth() for data. | |
| Per-page auth() only | No middleware config. Every future page must add the guard manually. | |

**User's choice:** NextAuth middleware + per-page auth()

| Option | Description | Selected |
|--------|-------------|----------|
| /editor and /api/* | Protect the editor page and all API routes. Minimal and clean for v1. | ✓ |
| Everything except /login | Deny-by-default. Requires whitelisting _next/ and static assets. | |

**User's choice:** /editor and /api/*

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — preserve callbackUrl | Standard NextAuth behavior. User lands on original destination after login. | ✓ |
| No — always redirect to /editor | Simpler; functionally identical for v1's single protected route. | |

**User's choice:** Yes — preserve callbackUrl

| Option | Description | Selected |
|--------|-------------|----------|
| 401 JSON for /api/*, redirect for pages | REST-standard: API callers get JSON, pages get redirect. | ✓ |
| Redirect everything to /login | Simpler config but API callers receive HTML on 401. | |

**User's choice:** 401 JSON for /api/*, redirect for pages

**Notes:** No unusual choices — all recommended options selected. Follows standard NextAuth v5 App Router patterns.

---

## Error Message Specificity

| Option | Description | Selected |
|--------|-------------|----------|
| Generic: 'Email hoặc mật khẩu không đúng' | Prevents email enumeration. Security best practice. | ✓ |
| Specific: distinguish wrong email vs wrong password | 'Email chưa được đăng ký' vs 'Mật khẩu không đúng'. Clearer UX but exposes valid emails. | |

**User's choice:** Generic message on login failure

| Option | Description | Selected |
|--------|-------------|----------|
| 'Email này đã được sử dụng' | Clear, direct. Registration context makes email enumeration less of a concern. | ✓ |
| 'Tài khoản đã tồn tại, vui lòng đăng nhập' | More actionable — directs user to log in instead. | |

**User's choice:** 'Email này đã được sử dụng' for duplicate registration

| Option | Description | Selected |
|--------|-------------|----------|
| Inline under each field | Standard form UX. Error appears below the problematic input. | ✓ |
| Top-level banner | Single message at top. Less precise about which field is wrong. | |

**User's choice:** Inline under each field

| Option | Description | Selected |
|--------|-------------|----------|
| Both client-side + server-side (Zod) | Client for instant feedback; server as source of truth. | ✓ |
| Server-side only | Simpler but sends invalid input to server before user gets feedback. | |

**User's choice:** Both client-side and server-side validation

**Notes:** No deviations from security best practices for auth error messaging.

---

## User Model Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: email + passwordHash + timestamps | Exactly what AUTH-01/02/03 requires. 2-field register form. | ✓ |
| With optional name field | Adds display name to header/history. 3-field form. Out of Phase 1 scope. | |

**User's choice:** Minimal schema

| Option | Description | Selected |
|--------|-------------|----------|
| Unique index on email only | Enforces no duplicates at DB level. Speeds up login lookups. | ✓ |
| No extra indexes | Simpler schema but race condition risk on concurrent registrations. | |

**User's choice:** Unique index on email

| Option | Description | Selected |
|--------|-------------|----------|
| id + email only in JWT payload | Minimal token. Sufficient for all v1 use cases. | ✓ |
| id + email + role field | Future-proofing for RBAC. Out of scope for v1. | |

**User's choice:** id + email only

| Option | Description | Selected |
|--------|-------------|----------|
| Start from scratch (npx create-next-app) | Phase 1 initializes the full project. No existing scaffold. | ✓ |
| Already have a scaffold | Pick up from existing files. | |

**User's choice:** Start from scratch

**Notes:** All recommended minimal options selected. Keeps Phase 1 focused on the 3 auth requirements.

---

## Claude's Discretion

None — user selected all recommended options without deferring to Claude.

## Deferred Ideas

None — discussion stayed within phase scope.
