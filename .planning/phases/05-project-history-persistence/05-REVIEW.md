---
phase: 05-project-history-persistence
reviewed: 2026-05-22T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - models/Project.ts
  - app/api/projects/route.ts
  - app/api/generate/route.ts
  - app/api/projects/[id]/route.ts
  - components/editor/HistoryPanel.tsx
  - components/editor/PromptBar.tsx
  - components/editor/EditorClientWrapper.tsx
findings:
  critical: 3
  warning: 4
  info: 3
  total: 10
status: fixed
---

# Phase 05: Code Review Report

**Reviewed:** 2026-05-22T00:00:00Z
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Seven files covering the project history persistence phase were reviewed: the Mongoose model, three API route handlers, two React UI components, and the client wrapper. Auth patterns, runtime declarations, and CLAUDE.md constraints are generally respected. However, three critical issues were identified: unvalidated data from MongoDB is loaded directly into GrapesJS in the HistoryPanel, a race condition in the rate-limit logic allows concurrent requests to bypass the limit, and a debug `console.log` leaks raw user credentials server-side. Four warnings cover a missing `prompt` length constraint in the Project schema, an unbounded `blockData` payload stored to MongoDB, silent swallowing of the delete-error response in the UI, and a missing `maxlength` attribute on the Project `prompt` field. Three info items cover typing shortcuts, a magic number, and inconsistent quote style.

---

## Critical Issues

### CR-01: `loadProjectData` called on unvalidated MongoDB data in HistoryPanel

**File:** `components/editor/HistoryPanel.tsx:40`

**Issue:** CLAUDE.md mandates "Validate AI output before loading into GrapesJS — never call `editor.loadProjectData()` on unvalidated Claude output." `handleOpen` casts `project.blockData` with a TypeScript `as` assertion and passes it directly to `editor.loadProjectData()`. The data was originally stored by `app/api/generate/route.ts` which did validate it, but the retrieval path (`GET /api/projects`) returns it as a raw MongoDB `Mixed` field — any document tampered with at the DB level, any schema migration artefact, or any manually inserted document will be loaded without Zod validation. A malformed `blockData` can crash the GrapesJS canvas or, if a future GrapesJS version evaluates component-level scripts, introduce XSS.

**Fix:**
```typescript
import { GrapesBlockSchema } from '@/lib/ai/generate-block'

function handleOpen(project: Project) {
  const editor = editorRef.current
  if (!editor) return

  // Validate before loading — CLAUDE.md requirement
  const parsed = GrapesBlockSchema.safeParse(project.blockData)
  if (!parsed.success) {
    console.error('[HistoryPanel] invalid blockData, refusing to load', parsed.error)
    alert('Khối dữ liệu không hợp lệ, không thể mở.')
    return
  }

  if (editor.getDirtyCount() > 0) {
    if (!window.confirm('Thay thế nội dung hiện tại?')) return
  }

  editor.loadProjectData(parsed.data as Parameters<typeof editor.loadProjectData>[0])
}
```

---

### CR-02: Race condition allows rate-limit bypass on concurrent requests

**File:** `app/api/generate/route.ts:41-47`

**Issue:** The rate-limit check is a non-atomic read-then-write sequence:

```
1. findOne({ userId })   — reads existing doc
2. ... await generateBlock(prompt) ...   — ~2-4s elapsed
3. findOneAndUpdate(..., { upsert: true }) — writes new doc
```

Two simultaneous POST requests from the same user will both execute step 1 before either reaches step 3. Both find no existing document and both proceed to call Claude, doubling API cost and bypassing the intended one-request-at-a-time limit. `RateLimit.findOneAndUpdate` with `upsert: true` should be moved **before** calling `generateBlock`, and the upsert itself should use `$setOnInsert` combined with an `insertedId` check (or rely on the unique index rejection) to act as an atomic test-and-set.

**Fix:**
```typescript
// Step 3 (rate limit) — atomic test-and-set BEFORE calling Claude
try {
  await RateLimit.create({ userId, createdAt: new Date() })
} catch (dupErr: any) {
  if (dupErr?.code === 11000) {
    // unique index violation: document already exists → still rate-limited
    return NextResponse.json(
      { error: 'Vui lòng đợi vài giây trước khi tạo nội dung mới.' },
      { status: 429 }
    )
  }
  throw dupErr
}

// Step 4 — Claude call (rate limit doc now committed before this starts)
try {
  const block = await generateBlock(prompt)
  // ... auto-save ...
  return NextResponse.json({ block }, { status: 200 })
} catch (err) {
  // On Claude failure, remove rate limit so user can retry immediately
  await RateLimit.deleteOne({ userId }).catch(() => {})
  console.error('[/api/generate] generateBlock error:', err)
  return NextResponse.json(
    { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
    { status: 500 }
  )
}
```

---

### CR-03: Raw credentials logged to server stdout in `authorize`

**File:** `lib/auth/helpers.ts:16`

**Issue:**
```typescript
console.log("credentials", credentials);
```
`credentials` contains the user's plaintext password as submitted via the login form. This line logs it to stdout on every login attempt. In any hosted environment (Vercel, Railway, etc.) application logs are retained and may be accessible to team members or support staff. This is a textbook credential-leak vulnerability.

**Fix:** Remove the line entirely. If debug logging of auth flow is needed, log only the email and a redacted marker:
```typescript
// Remove: console.log("credentials", credentials)
// If needed: console.debug('[authorize] attempt for', parsed.data?.email)
```

---

## Warnings

### WR-01: `prompt` field has no `maxlength` in Project schema — allows unbounded storage

**File:** `models/Project.ts:7`

**Issue:** `prompt: { type: String, required: true }` has no `maxlength` constraint. The generate endpoint accepts prompts up to 500 characters (enforced by `generateSchema`), and the auto-save in `generate/route.ts` stores the full prompt. However, the `POST /api/projects` route accepts arbitrary prompts via `createSchema` which also has no server-enforced upper bound beyond Zod's `z.string().min(1)`. A client that bypasses `PromptBar`'s 500-char `maxLength` attribute could store prompts of arbitrary size.

**Fix:**
```typescript
// models/Project.ts
prompt: { type: String, required: true, maxlength: 500 },
```
And in `app/api/projects/route.ts` line 26:
```typescript
prompt: z.string().min(1).max(500),
```

---

### WR-02: `blockData` stored as `Mixed` with no size guard — BSON 16 MB document limit risk

**File:** `models/Project.ts:8` and `app/api/projects/route.ts:27`

**Issue:** `blockData` is `mongoose.Schema.Types.Mixed` with no size validation at the application layer. The Zod schema in `createSchema` uses `z.record(z.string(), z.unknown())` which accepts any object of any depth or size. GrapesJS project data including large embedded asset objects could grow to megabytes. MongoDB enforces a 16 MB BSON document limit and will throw a write error, which the POST handler does not specifically handle, resulting in an unhandled 500. Additionally, CLAUDE.md prohibits base64 images in stored documents; this constraint is not enforced at the API layer.

**Fix:** Add a payload-size guard before the DB write and validate that no `assets` array entry contains a `base64`-style `src`:
```typescript
// In POST handler, after Zod parse:
const raw = JSON.stringify(parsed.data.blockData)
if (raw.length > 500_000) {
  return NextResponse.json({ error: 'blockData exceeds size limit' }, { status: 413 })
}
```

---

### WR-03: `handleDelete` in HistoryPanel silently ignores non-OK server errors

**File:** `components/editor/HistoryPanel.tsx:43-49`

**Issue:**
```typescript
const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' })
if (res.ok) {
  setProjects(prev => prev.filter(p => p._id !== project._id))
}
```
When the DELETE returns a non-2xx status (network error caught by `try/catch` would surface, but a 403/404/500 from the server is silently discarded — the `catch` block is missing entirely). The user sees nothing happen; they may not know whether the delete succeeded or failed. There is also no `try/catch` around the `fetch` call, so a network failure will surface as an unhandled rejection in the browser console.

**Fix:**
```typescript
async function handleDelete(project: Project) {
  if (!window.confirm('Xoá khối này?')) return
  try {
    const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects(prev => prev.filter(p => p._id !== project._id))
    } else {
      alert('Xoá thất bại. Vui lòng thử lại.')
    }
  } catch {
    alert('Lỗi kết nối. Vui lòng thử lại.')
  }
}
```

---

### WR-04: `PromptBar` loads `data.block` into GrapesJS without Zod validation

**File:** `components/editor/PromptBar.tsx:42`

**Issue:**
```typescript
editorRef.current?.loadProjectData(data.block)
```
`data.block` is the raw JSON value parsed from the API response. Although the server runs Zod validation before returning, the client-side code trusts the network payload without re-validating. A man-in-the-middle proxy, a corrupted CDN cache, or a future server regression could return an unexpected shape that crashes GrapesJS. CLAUDE.md states "never call `loadProjectData()` on unvalidated Claude output." While this is one step removed from Claude output (it passed through the server), the constraint's spirit applies to any load call.

**Fix:**
```typescript
import { GrapesBlockSchema } from '@/lib/ai/generate-block'

const parsed = GrapesBlockSchema.safeParse(data.block)
if (!parsed.success) {
  setError('Dữ liệu nhận được không hợp lệ. Vui lòng thử lại.')
  return
}
editorRef.current?.loadProjectData(parsed.data as Parameters<typeof editorRef.current.loadProjectData>[0])
```

---

## Info

### IN-01: `as any` cast in `auth.ts` callbacks suppresses type safety

**File:** `auth.ts:11,14`

**Issue:**
```typescript
async jwt(params) { return jwtCallback(params as any) }
async session(params) { return sessionCallback(params as any) }
```
Both callbacks cast their params to `any`, bypassing TypeScript's ability to catch signature mismatches between the NextAuth v5 callback shape and the helper functions. If NextAuth upgrades its callback contract, the error will surface at runtime rather than compile time.

**Fix:** Align the helper signatures with NextAuth v5's exported types (`JWT`, `Session` etc.) and remove the `as any` casts, or import the exact callback parameter types from `next-auth`.

---

### IN-02: Magic number `10` for TTL in `RateLimit` schema is undocumented

**File:** `models/RateLimit.ts:5`

**Issue:**
```typescript
createdAt: { type: Date, default: Date.now, expires: 10 },
```
`expires: 10` (seconds) is a bare magic number with no comment. Its intent is not immediately apparent to a new reader — is it 10 seconds, 10 minutes, or 10 ms? MongoDB TTL `expires` is in seconds, so this is a 10-second window, which is very short.

**Fix:**
```typescript
const RATE_LIMIT_TTL_SECONDS = 10 // 10-second cooldown between generations
// ...
createdAt: { type: Date, default: Date.now, expires: RATE_LIMIT_TTL_SECONDS },
```

---

### IN-03: Inconsistent quote style across server and client files

**File:** `lib/auth/helpers.ts` (double quotes), `models/Project.ts` (single quotes), `app/api/projects/route.ts` (single quotes), `components/editor/EditorClientWrapper.tsx` (double quotes)

**Issue:** The codebase mixes single and double quote string delimiters across files with no apparent pattern. This is a minor quality signal but suggests the project lacks a consistent ESLint/Prettier configuration enforcing a single style, which increases cognitive friction in diffs.

**Fix:** Add or enforce a Prettier rule (`"singleQuote": true` or `false`) and run `prettier --write` across the project.

---

_Reviewed: 2026-05-22T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
