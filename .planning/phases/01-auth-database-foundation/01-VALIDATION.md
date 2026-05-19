---
phase: 1
slug: auth-database-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-19
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest |
| **Config file** | `vitest.config.ts` — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=dot` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds (integration tests hit real DB) |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=dot`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| register-valid | register | 1 | AUTH-01 | P8 | passwordHash starts with `$2b$` | integration | `npx vitest run tests/api/register.test.ts` | ❌ W0 | ⬜ pending |
| register-duplicate | register | 1 | AUTH-01 | — | 409 + `"Email này đã được sử dụng"` | integration | `npx vitest run tests/api/register.test.ts` | ❌ W0 | ⬜ pending |
| register-invalid-email | register | 1 | AUTH-01 | — | 400 on invalid email format | integration | `npx vitest run tests/api/register.test.ts` | ❌ W0 | ⬜ pending |
| register-short-password | register | 1 | AUTH-01 | — | 400 on password < 8 chars | integration | `npx vitest run tests/api/register.test.ts` | ❌ W0 | ⬜ pending |
| login-success | signin | 1 | AUTH-02 | — | signIn returns non-null, no result.error | integration | `npx vitest run tests/auth/signin.test.ts` | ❌ W0 | ⬜ pending |
| login-wrong-password | signin | 1 | AUTH-02 | T-enum | result.error = 'CredentialsSignin' (no enumeration) | integration | `npx vitest run tests/auth/signin.test.ts` | ❌ W0 | ⬜ pending |
| session-persists | session | 1 | AUTH-02 | — | auth() in Server Component returns session after login | integration | `npx vitest run tests/auth/session.test.ts` | ❌ W0 | ⬜ pending |
| logout-clears | signout | 1 | AUTH-03 | — | signOut() + subsequent auth() returns null | integration | `npx vitest run tests/auth/signout.test.ts` | ❌ W0 | ⬜ pending |
| user-model-hash | user-model | 1 | AUTH-01 | P8 | passwordHash field starts with `$2b$` | unit | `npx vitest run tests/unit/user-model.test.ts` | ❌ W0 | ⬜ pending |
| dbconnect-singleton | mongodb | 1 | — | P7 | dbConnect() returns same connection on repeated calls | unit | `npx vitest run tests/unit/mongodb.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install -D vitest @vitest/coverage-v8` — install test framework
- [ ] `vitest.config.ts` — test framework config
- [ ] `tests/api/register.test.ts` — covers AUTH-01 (registration: valid, duplicate, invalid email, short password)
- [ ] `tests/auth/signin.test.ts` — covers AUTH-02 (login: success, wrong password)
- [ ] `tests/auth/session.test.ts` — covers AUTH-02 (session persistence after login)
- [ ] `tests/auth/signout.test.ts` — covers AUTH-03 (logout clears session)
- [ ] `tests/unit/user-model.test.ts` — covers AUTH-01 (bcrypt `$2b$` prefix, model guard)
- [ ] `tests/unit/mongodb.test.ts` — covers infrastructure (singleton returns same connection)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Vietnamese error message renders on wrong login | AUTH-02 | UI string render requires browser | 1. Go to /login. 2. Enter wrong password. 3. Verify "Email hoặc mật khẩu không đúng" appears inline |
| Already-authenticated redirect from /login | AUTH-02 | Session + redirect is browser flow | 1. Log in. 2. Navigate to /login. 3. Verify immediate redirect to /editor |
| callbackUrl preserved after redirect | AUTH-02 | Requires full browser navigation flow | 1. Visit /editor unauthenticated. 2. Log in. 3. Verify redirect lands on /editor (not default /login) |
| Session persists across browser refresh | AUTH-02 | Requires actual cookie + browser refresh | 1. Log in. 2. Refresh page. 3. Verify still authenticated (no redirect to /login) |
| Logout from any page redirects to /login | AUTH-03 | Browser navigation flow | 1. Log in and navigate to /editor. 2. Click logout. 3. Verify redirect to /login |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
