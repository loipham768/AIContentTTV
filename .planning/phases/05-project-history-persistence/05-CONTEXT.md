# Phase 5: Project History + Persistence — Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 5 adds auto-save and a history sidebar to the editor. Every successful AI generation automatically saves the GrapesJS block JSON to MongoDB under the user's account. A HistoryPanel sidebar on the right of the editor lets users see their history, re-open any saved block, and delete entries. No manual save button — it happens transparently after each generation. Phase 6 will polish the visual design and fully translate all strings.

</domain>

<decisions>
## Implementation Decisions

### Data Model
- **D-01:** New `models/Project.ts` Mongoose model: `{ userId: String, name: String (50 chars), prompt: String, blockData: Mixed, timestamps: true }`. Index on `userId` for efficient per-user queries. Store GrapesJS project JSON in `blockData` — never HTML (CLAUDE.md rule).
- **D-02:** `name` = `prompt.slice(0, 50)` — computed server-side at save time, never client-supplied. Prevents prompt injection through name field.

### Auto-Save
- **D-03:** Auto-save happens inside `/api/generate` route after successful `generateBlock()`. Wrapped in its own try/catch so save failure does not block the generation response — user gets the block even if MongoDB write fails.
- **D-04:** Save with `await Project.create({ userId, name: prompt.slice(0, 50), prompt, blockData: block })`. The `block` is the already-validated GrapesBlock object — safe to store as Mixed.

### API Routes
- **D-05:** `GET /api/projects` — returns `{ projects: [...] }` sorted by `createdAt` desc, using `.lean()` for performance. Returns only `_id, name, prompt, blockData, createdAt` per document.
- **D-06:** `POST /api/projects` — explicit create endpoint (not used by auto-save, but available for future use). Returns `{ project }`.
- **D-07:** `DELETE /api/projects/[id]` — deletes by `_id` AND `userId` (ownership check). Returns 404 if not found or not owned. Returns `{ ok: true }` on success.
- **D-08:** All project routes: `export const runtime = 'nodejs'`, `await dbConnect()`, `auth()` from `@/auth`.

### History Panel UI
- **D-09:** `HistoryPanel.tsx` is a `'use client'` component. Accepts `editorRef: React.RefObject<Editor | null>` and `refreshKey: number`. Re-fetches projects whenever `refreshKey` changes (useEffect dependency).
- **D-10:** Panel placement: right sidebar. EditorClientWrapper's middle section becomes `<div className="flex flex-1 overflow-hidden">` (flex row) with GrapesEditor on the left (flex-1) and HistoryPanel on the right (fixed width `w-72`).
- **D-11:** "Replace current block?" confirmation uses native `window.confirm()` — checks `editor.getDirtyCount() > 0`. If dirty AND user cancels → abort open. Phase 6 can replace with a modal.
- **D-12:** "Xoá khối này?" confirmation also uses `window.confirm()`. Simple and consistent with Phase 6 polish plan.
- **D-13:** Vietnamese labels in Phase 5: "Lịch sử" (title), "Mở" (open button), "Xoá" (delete button), "Chưa có nội dung nào." (empty state). Phase 6 will audit and finalize all strings.

### History Refresh After Generation
- **D-14:** `EditorClientWrapper` holds `historyKey` state (integer, starts 0). Passed to `HistoryPanel` as `refreshKey`. Incremented when generation succeeds.
- **D-15:** `PromptBar` gets an optional `onSuccess?: () => void` prop. Called after `editor.loadProjectData(data.block)` succeeds. EditorClientWrapper passes `() => setHistoryKey(k => k + 1)`.

### Date Display
- **D-16:** Format `createdAt` with `new Date(project.createdAt).toLocaleDateString('vi-VN')` for Vietnamese date format.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/REQUIREMENTS.md` — HIS-01, HIS-02, HIS-03, HIS-04
- `.planning/ROADMAP.md` §Phase 5 — 4 success criteria
- `CLAUDE.md` — Store GrapesJS JSON not HTML · `export const runtime = 'nodejs'` · `dbConnect()` · `auth()` from `@/auth` · no base64 images
- `models/User.ts` — Mongoose model guard pattern to follow
- `app/api/generate/route.ts` — route pattern (auth → dbConnect → logic) + where to add auto-save
- `components/editor/PromptBar.tsx` — add `onSuccess` callback prop
- `components/editor/EditorClientWrapper.tsx` — add historyKey state + wire HistoryPanel + pass onSuccess to PromptBar

</canonical_refs>

<code_context>
## Existing Patterns to Follow

### Mongoose model guard (from models/User.ts):
```typescript
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
export default Project
```

### Route handler pattern (from app/api/generate/route.ts):
```typescript
export const runtime = 'nodejs'
export async function GET/POST/DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  // ... logic
}
```

### Dynamic segment route (new pattern for [id]):
```typescript
// app/api/projects/[id]/route.ts
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // ...
}
```

### PromptBar current interface:
```typescript
interface PromptBarProps {
  editorRef: React.RefObject<Editor | null>
}
// Phase 5 adds:
interface PromptBarProps {
  editorRef: React.RefObject<Editor | null>
  onSuccess?: () => void  // called after loadProjectData on success
}
```

</code_context>

<deferred>
## Deferred

- Manual "Save" button — auto-save is sufficient for v1
- Block renaming — v2 requirement
- Pagination of history list — v2 (users unlikely to have >50 blocks in MVP)
- Re-open confirmation modal (instead of window.confirm) — Phase 6 polish
- Delete confirmation modal — Phase 6 polish

</deferred>

---

*Phase: 5 — Project History + Persistence*
*Date: 2026-05-22*
