---
phase: 03-ai-generation-pipeline
reviewed: 2026-05-21T00:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - models/RateLimit.ts
  - lib/ai/generate-block.ts
  - app/api/generate/route.ts
  - tests/api/generate.test.ts
  - vitest.config.ts
  - components/editor/PromptBar.tsx
  - tests/unit/prompt-bar.test.ts
  - components/editor/EditorClientWrapper.tsx
findings:
  critical: 3
  warning: 5
  info: 3
  total: 11
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-05-21T00:00:00Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Reviewed the full AI generation pipeline: Anthropic Claude integration (`generate-block.ts`), the API route (`route.ts`), MongoDB rate limit model, Vitest configuration, the `PromptBar` React component, its file-based test suite, and `EditorClientWrapper`. The auth plumbing correctly uses `auth()` from `@/auth`, the `runtime = 'nodejs'` export is present, and Zod validation runs before `loadProjectData()`. However, three critical issues were found: a credentials leak via `console.log` in production auth code, a silent race condition in rate limiting that renders the control ineffective under concurrent requests, and unvalidated AI output loaded directly into the GrapesJS editor without Zod verification at the call site. Five additional warnings cover TTL misconfiguration, missing 401-redirect handling in the client, test-suite design defects that undermine reliability, a fragile `require.resolve` in the Vitest config, and a missing prompt-injection boundary in the system prompt.

---

## Critical Issues

### CR-01: Credentials logged to stdout in production auth path

**File:** `lib/auth/helpers.ts:16`
**Issue:** `console.log("credentials", credentials)` runs in the `authorize` function on every sign-in attempt. The `credentials` object carries the raw password string supplied by the user. In any hosted environment (Vercel, Railway, etc.) this line writes the plaintext password to the server log stream, where it is retained by the platform and visible to anyone with log access. This is a direct credential-exposure vulnerability.
**Fix:**
```typescript
// Remove line 16 entirely.
// If debugging is needed during development, gate it:
if (process.env.NODE_ENV === 'development') {
  console.log('authorize called for:', credentials?.email)
}
```

---

### CR-02: Rate-limit check has a TOCTOU race — concurrent requests bypass it entirely

**File:** `app/api/generate/route.ts:40-46`
**Issue:** The guard is a read-then-write pattern with no atomicity:
```
findOne({ userId })   // step A — reads
...
generateBlock(prompt) // step B — network call (can take 3-10 s)
...
findOneAndUpdate(...)  // step C — writes
```
If a user fires two requests within the same window, both pass step A (no document exists yet), both call Claude concurrently, and both write the TTL document after success. The rate limit is silently bypassed on every parallel request. The `unique: true` constraint on `userId` in `RateLimit.ts` should cause step C to throw a duplicate-key error on the second concurrent completion, but that error is caught by the outer `catch` block and returned as a 500 — meaning the duplicate-key error is misreported to the user as a generic server error.

**Fix:** Replace the optimistic read with an atomic upsert-or-fail **before** calling Claude. Use `{ upsert: true }` with a sparse unique index so only the first inserter succeeds:
```typescript
// Step 3 — atomic "claim or reject" before calling Claude
try {
  await RateLimit.create({ userId })   // throws duplicate-key (E11000) if doc exists
} catch (e: any) {
  if (e.code === 11000) {
    return NextResponse.json(
      { error: 'Vui lòng đợi vài giây trước khi tạo nội dung mới.' },
      { status: 429 }
    )
  }
  throw e
}
// Step 4 — call Claude (rate limit doc is already written)
const block = await generateBlock(prompt)
// Remove the findOneAndUpdate after success — no longer needed
```

---

### CR-03: AI output loaded into GrapesJS without Zod validation at the call site

**File:** `components/editor/PromptBar.tsx:41`
**Issue:** `editorRef.current?.loadProjectData(data.block)` loads whatever the server returns into GrapesJS with no client-side schema check. CLAUDE.md explicitly requires: "Validate AI output before loading into GrapesJS — `client.messages.parse()` with `zodOutputFormat(GrapesBlockSchema)` is mandatory; never call `editor.loadProjectData()` on unvalidated Claude output." The server does validate via `generateBlock`, but a network proxy, a CDN edge function, or a future route-handler change could strip or mutate `data.block`. The client should be a second line of defence.
**Fix:**
```typescript
import { GrapesBlockSchema } from '@/lib/ai/generate-block'

// inside handleSubmit, after receiving a successful response:
const parsed = GrapesBlockSchema.safeParse(data.block)
if (!parsed.success) {
  setError('Dữ liệu nhận được không hợp lệ. Vui lòng thử lại.')
  return
}
editorRef.current?.loadProjectData(parsed.data)
```

---

## Warnings

### WR-01: RateLimit TTL is 10 seconds — far too short for meaningful rate limiting

**File:** `models/RateLimit.ts:5`
**Issue:** `expires: 10` sets the MongoDB TTL to **10 seconds**. MongoDB's TTL daemon runs every 60 seconds by default, so the actual expiry is anywhere from 10 to 70 seconds in practice. A 10-second server-side TTL combined with a UI that shows "Vui lòng đợi vài giây..." is misleading and trivially bypassable with direct API calls. The system prompt comment says "vài giây" (a few seconds) but 10 s is an unusually weak rate-limit window for an AI generation endpoint that incurs real API cost.
**Fix:** Raise the TTL to match the intended UX window. For a 30-second cooldown:
```typescript
createdAt: { type: Date, default: Date.now, expires: 30 },
```
Document the chosen value in a comment so future maintainers know it is intentional.

---

### WR-02: PromptBar silently ignores 401 responses — session expiry causes invisible failure

**File:** `components/editor/PromptBar.tsx:32-39`
**Issue:** The error-handling block only branches on `res.status === 429`; all other non-2xx statuses fall through to the generic Vietnamese error message. A 401 (expired JWT / signed-out session) is indistinguishable from a 500. The user sees "Đã xảy ra lỗi. Vui lòng thử lại." and retries repeatedly, never knowing they need to log in again. Since the `authorized` callback in `auth.config.ts` redirects unauthenticated requests away from `/editor`, a 401 from the API is a sign of session expiry mid-session.
**Fix:**
```typescript
if (res.status === 429) {
  setError('Vui lòng đợi vài giây trước khi tạo nội dung mới.')
} else if (res.status === 401) {
  // Session expired; redirect to login
  window.location.href = '/login'
} else {
  setError('Đã xảy ra lỗi. Vui lòng thử lại.')
}
```

---

### WR-03: PromptBar test suite tests source text, not runtime behaviour

**File:** `tests/unit/prompt-bar.test.ts:22-104`
**Issue:** Every single test in this file uses `fs.readFileSync` to examine the raw `.tsx` source text with `toContain()`/`toMatch()` string checks. This approach does not test component behaviour — it tests that certain string literals exist in the file. A developer could rename `isLoading` to `loading`, swap the fetch URL to a constant, change the 429 check to a helper, or restructure error handling and all tests would pass while the component was broken. The test suite provides a false sense of coverage and will not catch any regression that preserves the exact strings.

This is distinct from the API integration tests (`tests/api/generate.test.ts`) which correctly mock and invoke the real handler. No rendering or behavioural tests exist for `PromptBar`.

**Fix:** Replace with React Testing Library tests that mount the component and assert on rendered output and network calls:
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PromptBar from '@/components/editor/PromptBar'

it('shows rate-limit message on 429', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({}) })
  const editorRef = { current: null }
  render(<PromptBar editorRef={editorRef} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
  fireEvent.click(screen.getByRole('button', { name: /tạo nội dung/i }))
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Vui lòng đợi'))
})
```

---

### WR-04: `require.resolve` in vitest.config.ts is CJS-only — breaks under ESM

**File:** `vitest.config.ts:27`
**Issue:** `require.resolve('next/server', { paths: [...] })` is a CommonJS API. If the project ever adds `"type": "module"` to `package.json` (which Next.js 15 may encourage), this call will throw `ReferenceError: require is not defined` at config parse time, silently breaking all tests. The path `../../..` (three levels up from the AIContentBooster directory) also assumes a specific monorepo depth that may not hold.
**Fix:** Use a Vitest-idiomatic approach that does not depend on `require`:
```typescript
// vitest.config.ts
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// ...
'next/server': require.resolve('next/server'),
```
Or use `import.meta.resolve` if the environment supports it.

---

### WR-05: `parseEnvFile` in vitest.config.ts does not strip `\r` on Windows line endings

**File:** `vitest.config.ts:8-10`
**Issue:** The regex `line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)` with `.split('\n')` on a Windows-format `.env.local` file (CRLF line endings) will include a trailing `\r` in `match[2]`. The subsequent `replace(/^['"]|['"]$/g, '')` strips only leading/trailing quotes, not `\r`. As a result, environment variables like `ANTHROPIC_API_KEY` would contain a trailing carriage-return character, causing API calls to fail with an authentication error that is very hard to diagnose. Given the project runs on Windows (as indicated by the environment), this is a likely active defect.
**Fix:**
```typescript
const match = line.trimEnd().match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
```
Adding `.trimEnd()` before the match removes both `\r` and trailing whitespace.

---

## Info

### IN-01: `GrapesComponentSchema` uses `z.any()` for `styles` and `assets` arrays — weakens validation

**File:** `lib/ai/generate-block.ts:23-24`
**Issue:** `assets: z.array(z.any())` and `styles: z.array(z.any())` accept any array content without validation. If Claude returns malformed style objects or asset entries containing absolute URLs pointing to external resources (which could later be exploited for data exfiltration in a SSRF-adjacent scenario via server-side rendering), no schema check will catch it. This is particularly notable given the CLAUDE.md constraint "No base64 images".
**Fix:** At minimum, add a `z.array(z.object({ ... }).passthrough())` shape for styles, and a schema for assets that explicitly rejects `data:` URIs:
```typescript
assets: z.array(
  z.object({ src: z.string().url().refine(s => !s.startsWith('data:'), 'No base64 images') })
    .passthrough()
),
```

---

### IN-02: `EditorClientWrapper` is a Client Component with `userEmail` prop — unnecessary re-render surface

**File:** `components/editor/EditorClientWrapper.tsx:18-20`
**Issue:** `userEmail` is passed as a prop to `EditorClientWrapper` (a `'use client'` component) but is only forwarded to `TopBar`. If `userEmail` changes (e.g., after a session refresh), the entire editor tree — including the GrapesJS iframe — will re-render. The `userEmail` prop is an architectural coupling that is not needed: `TopBar` could call `useSession()` directly to read the email without threading it through the wrapper. This is a quality / maintainability concern rather than an active bug.
**Fix:** Remove the `userEmail` prop from `EditorClientWrapper` and have `TopBar` fetch the session directly via `useSession()` from `next-auth/react`.

---

### IN-03: `data.block` used without null-guard in PromptBar happy path

**File:** `components/editor/PromptBar.tsx:41`
**Issue:** After a successful `res.ok` check, the code calls `editorRef.current?.loadProjectData(data.block)` but never checks that `data.block` is truthy. If the server returns `{ block: null }` or an empty body due to a middleware transform, this silently loads `null` into GrapesJS, which may reset the canvas without any user-visible error.
**Fix:**
```typescript
if (!data.block) {
  setError('Dữ liệu nhận được không hợp lệ. Vui lòng thử lại.')
  return
}
editorRef.current?.loadProjectData(data.block)
```
(This partially overlaps with CR-03's Zod validation fix — both issues are resolved by the same schema parse guard.)

---

_Reviewed: 2026-05-21T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
