# Domain Pitfalls

**Domain:** AI-powered SaaS content builder — GrapesJS + Claude API + Next.js App Router + MongoDB
**Researched:** 2026-05-18
**Confidence:** HIGH (GrapesJS, Next.js, NextAuth sourced from Context7 official docs; MongoDB from official Mongoose docs)

---

## Critical Pitfalls

### Pitfall 1: GrapesJS Instantiates on the Server and Crashes Next.js

**What goes wrong:** GrapesJS accesses `window`, `document`, and `iframe` at module load time. Importing it without `ssr: false` throws `ReferenceError: window is not defined`.

**Prevention:**
```typescript
// app/editor/page.tsx
import dynamic from 'next/dynamic'
const GrapesEditor = dynamic(() => import('@/components/GrapesEditor'), { ssr: false })
```

**Detection:** `ReferenceError: window is not defined` in server logs or build output.

**Phase:** Must be resolved in the very first phase that introduces GrapesJS.

---

### Pitfall 2: React Strict Mode Double-Mounts the GrapesJS Editor

**What goes wrong:** React 18 Strict Mode mounts and remounts every component in development. `grapesjs.init()` called twice creates a corrupt second editor instance — double toolbars, duplicate panels, or blank canvas.

**Prevention:** Use `@grapesjs/react` wrapper, or add a ref guard:
```typescript
const editorRef = useRef<Editor | null>(null)
useEffect(() => {
  if (editorRef.current) return
  editorRef.current = grapesjs.init({ container: '#gjs', ... })
  return () => { editorRef.current?.destroy(); editorRef.current = null }
}, [])
```

**Phase:** Establish correct initialization pattern before any feature work.

---

### Pitfall 3: GrapesJS Script Tags Survive getHtml() and Break CMS XSS Filters

**What goes wrong:** Components with a `script` property generate `<script>` blocks in HTML output. CMS XSS filters strip these silently.

**Prevention:**
- Never use components with a `script` property in AI-generated JSON. Enforce via few-shot examples.
- Post-process `getHtml()` to strip all `<script>` tags before clipboard copy.

**Detection:** Paste exported HTML into a real CMS staging environment and compare rendering.

**Phase:** CSS Isolation Engine phase.

---

### Pitfall 4: getHtml() Returns External CSS Classes, Not Inline Styles

**What goes wrong:** `editor.getHtml()` returns HTML with class names; `editor.getCss()` returns the stylesheet separately. Pasting only the HTML produces an unstyled block. CMS XSS filters strip `<style>` tags.

**Prevention:** CSS Isolation Engine must:
1. Parse `getCss()` rules into a selector-to-declarations map.
2. Walk the HTML DOM and apply matching rules as `style=""` attributes.
3. Remove all `class=""` attributes from final output.

**Phase:** CSS Isolation Engine phase. This is the core technical challenge.

---

### Pitfall 5: AI-Generated JSON Fails loadProjectData() Silently

**What goes wrong:** `editor.loadProjectData()` does not throw on invalid JSON — it silently ignores invalid parts or renders a blank canvas.

**Prevention:**
- Validate Claude output against a Zod schema before calling `loadProjectData`.
- Few-shot examples must use only safe structures: `tagName`, `attributes`, `style`, `components`, `content`.
- If validation fails, surface a human-readable error.
- Check `stop_reason === 'end_turn'` — if `'max_tokens'`, output was truncated.

**Detection:** Log component count after `loadProjectData()`. Zero components after successful generation = silent failure.

**Phase:** AI Generation phase.

---

### Pitfall 6: MongoDB Document Size Exceeds 16 MB BSON Limit

**What goes wrong:** GrapesJS project JSON for complex blocks with many components or base64 images can exceed MongoDB's hard 16 MB BSON document limit.

**Prevention:**
- Store `projectData` with a size guard: warn if `JSON.stringify(projectData).length > 12_000_000`.
- Prohibit base64 image data — URL-only images.
- Index only metadata fields (`userId`, `createdAt`, `name`), never the blob.

**Phase:** MongoDB schema design phase.

---

## Moderate Pitfalls

### Pitfall 7: MongoDB Connection Pool Exhaustion in Next.js App Router

**What goes wrong:** Each route handler calling `mongoose.connect()` without caching creates a new connection, exhausting Atlas limits.

**Prevention:** Always use the connection singleton pattern:
```typescript
// lib/dbConnect.ts
const cached = (global as any).mongoose || { conn: null, promise: null }
export async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI!)
  cached.conn = await cached.promise
  return cached.conn
}
```

**Phase:** First API route touching the database.

---

### Pitfall 8: NextAuth Credentials Provider Does Not Hash Passwords by Default

**What goes wrong:** Forgetting to implement bcrypt hashing stores plain-text passwords.

**Prevention:** Use `bcryptjs` with salt rounds of 12 minimum. Add a Mongoose `pre('save')` hook. Never store or log raw passwords. Verify: MongoDB password fields must start with `$2b$`.

**Phase:** Auth phase, before any user registration endpoint ships.

---

### Pitfall 9: loadProjectData() Triggers a Full Canvas Reset

**What goes wrong:** Calling `editor.loadProjectData()` on an initialized editor replaces the canvas, losing undo history and scroll position. Feels like a page reload.

**Prevention:** Only call `loadProjectData` on initial editor mount. Offer a "Replace block" confirmation for subsequent AI generations.

**Phase:** AI Generation + Editor integration phase.

---

### Pitfall 10: Mongoose OverwriteModelError on Next.js Hot Reload

**What goes wrong:** `mongoose.model('User', UserSchema)` throws `OverwriteModelError` on every hot reload.

**Prevention:**
```typescript
const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
```

**Phase:** First model definition.

---

### Pitfall 11: Exported HTML Contains GrapesJS Internal Data Attributes

**What goes wrong:** `editor.getHtml()` includes `data-gjs-type`, `data-gjs-*` attributes that confuse TinyMCE/CKEditor parsers.

**Prevention:** Use `getHtml({ cleanId: true })` and strip `data-gjs-*` attributes via regex in the export pipeline.

**Phase:** CSS Isolation Engine phase.

---

## Minor Pitfalls

### Pitfall 12: Default storageManager Writes to localStorage and Corrupts Multi-Block State

**What goes wrong:** GrapesJS auto-saves to `localStorage` under `gjsProject`. All blocks share this key and overwrite each other.

**Prevention:** Always set `storageManager: false` in `grapesjs.init()`. Implement explicit save via API.

---

### Pitfall 13: Claude Token Limit Exceeded by Long Prompts Plus Few-Shot Examples

**What goes wrong:** Long few-shot system prompts + verbose user prompts cause truncated mid-JSON output. Zod validation then fails.

**Prevention:**
- Keep system prompt under 3,000 tokens.
- Cap user prompt input at 500 characters in the UI.
- Check `stop_reason === 'end_turn'` after every generation.

---

### Pitfall 14: CMS Theme !important Overrides Inline Styles

**What goes wrong:** Some CMS themes use `!important`, overriding inline `style=` attributes. Block renders differently in CMS vs GrapesJS preview.

**Prevention:** Add `!important` to all critical inlined values. Document as known limitation. Validate in real Haravan/Sapo staging before phase complete.

---

### Pitfall 15: NextAuth getServerSession() Returns Null in App Router

**What goes wrong:** `getServerSession()` (Pages Router pattern) returns `null` in App Router Server Components.

**Prevention:** Use exclusively:
```typescript
import { auth } from "@/auth"
const session = await auth()
if (!session) redirect('/login')
```

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| GrapesJS editor integration | SSR crash (P1), Strict Mode double-mount (P2) | `dynamic({ ssr: false })` + destroy in cleanup |
| AI generation | Malformed JSON silently fails (P5), truncated response (P13) | Zod schema validation + `stop_reason` check before render |
| CSS Isolation Engine | External CSS not inlined (P4), JS tags in output (P3), data attributes (P11), CMS specificity (P14) | Validate paste in real CMS before shipping |
| MongoDB schema design | BSON 16 MB limit (P6), connection exhaustion (P7), hot-reload overwrite (P10) | Singleton + model guard pattern first |
| Auth | Plain-text passwords (P8), wrong session API (P15) | bcrypt rounds 12; App Router `auth()` pattern only |
| Editor UX and save flow | localStorage conflicts (P12), loadProjectData flash (P9) | Disable default storageManager; debounce explicit save |

---

## Open Questions

- What is the exact GrapesJS project JSON schema from `getProjectData()` for common components? Must be captured as the Zod schema — requires running a live GrapesJS instance.
- What are the specific XSS filter rules on Haravan and Sapo? Needs a direct staging test to validate the CSS Isolation Engine output.
- Should CSS-to-inline transform run browser-side (before copy) or server-side (in the API)? Browser-side is simpler; server-side enables quality logging.
