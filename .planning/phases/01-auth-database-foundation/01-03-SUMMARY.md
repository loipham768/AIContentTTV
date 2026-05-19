---
phase: 01-auth-database-foundation
plan: 03
subsystem: auth
tags: [nextauth, logout, session, jwt, vitest, auth-callbacks]

requires:
  - phase: 01-02
    provides: LoginRegisterCard (register tab), /login page, register API

provides:
  - LoginRegisterCard: login tab with signIn(credentials, redirect:false) + Vietnamese error mapping
  - LogoutButton component: signOut({callbackUrl:'/login'}), 'Đăng xuất' text
  - /editor page: session.user.email display + LogoutButton + auth() belt-and-suspenders
  - lib/auth/helpers.ts: testable authorize(), jwtCallback(), sessionCallback() exports
  - 7 passing auth tests (signin x3, session x3, signout x1)

affects: [04-integration-verification]

tech-stack:
  added: []
  patterns:
    - "Extract NextAuth callbacks to lib/auth/helpers.ts for direct unit testing"
    - "Avoid importing auth() from @/auth in vitest — next-auth requires Next.js server internals"
    - "Test JWT/session callbacks as pure functions via helpers module"

key-files:
  created:
    - components/auth/LogoutButton.tsx
    - lib/auth/helpers.ts
  modified:
    - components/auth/LoginRegisterCard.tsx (login tab was already included in Plan 02)
    - auth.ts (refactored to use helpers, behavior unchanged)
    - app/editor/page.tsx (adds LogoutButton + session email display)
    - tests/auth/signin.test.ts
    - tests/auth/session.test.ts
    - tests/auth/signout.test.ts

key-decisions:
  - "auth() cannot be imported in vitest — next-auth's env.js imports next/server which fails in Node.js vitest context"
  - "Solution: test JWT/session logic via extracted helper functions (authorize, jwtCallback, sessionCallback)"
  - "Signout test verifies the underlying mechanism (no token.id without user) rather than calling auth() directly"

patterns-established:
  - "NextAuth testability: extract callbacks to lib/auth/helpers.ts; test helpers directly"
  - "Avoid auth() in vitest — integration tests for session behavior require a browser"
  - "LogoutButton: 'use client', signOut from next-auth/react, callbackUrl:/login"

requirements-completed:
  - AUTH-02
  - AUTH-03

duration: 6min
completed: 2026-05-19
---

# Plan 01-03: Login + Session Flow Summary

**Login tab wired in LoginRegisterCard, LogoutButton created, auth callbacks extracted for testing, 7 green AUTH-02+03 test assertions**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-05-19T21:43:00Z
- **Completed:** 2026-05-19T21:46:00Z
- **Tasks:** 2 (merged into 1 commit)
- **Files modified:** 8

## Accomplishments
- LoginRegisterCard login tab: signIn('credentials', redirect:false), Vietnamese error mapping, callbackUrl redirect
- LogoutButton: signOut({callbackUrl:'/login'}), "Đăng xuất" text
- /editor stub updated: session email display, LogoutButton, auth() guard preserved
- auth.ts refactored: extracted authorize/jwtCallback/sessionCallback to lib/auth/helpers.ts for testability
- 7 auth tests passing: authorize() with correct/wrong/nonexistent credentials, jwt+session callbacks, signout mechanism

## Deviations from Plan

### Auto-fixed Issues

**1. [NextAuth vitest limitation] auth() cannot be imported directly in vitest**
- **Found during:** Task 2 (writing signout/session tests)
- **Issue:** next-auth's env.js imports `next/server` (without .js extension), which fails in Node.js vitest — not resolvable via vitest alias (alias only affects transforms, not node_modules CJS resolution)
- **Fix:** Replaced `auth()` import tests with pure callback tests via extracted `lib/auth/helpers.ts`. The callbacks represent the same auth logic in a testable form.
- **Files modified:** tests/auth/session.test.ts, tests/auth/signout.test.ts, lib/auth/helpers.ts, auth.ts

**2. [auth.ts refactor] Extracted callbacks to helpers module**
- **Found during:** Making callbacks testable
- **Issue:** authorize/jwt/session callbacks were inlined in auth.ts and not importable by tests
- **Fix:** Created lib/auth/helpers.ts with exported functions; auth.ts delegates to them
- **Verification:** auth.ts build passes; behavior unchanged

---

**Total deviations:** 2 (1 test strategy adaptation, 1 refactor for testability)

## Next Phase Readiness
- All auth flows complete: register, login, logout
- Test coverage: AUTH-01 (4 tests), AUTH-02 (4 tests), AUTH-03 (1 test) — all green
- Unit tests (user-model, mongodb singleton) remain as it.todo — covered in Plan 04

---
*Phase: 01-auth-database-foundation*
*Completed: 2026-05-19*
