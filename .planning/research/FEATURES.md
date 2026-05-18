# Feature Landscape: AI Content Booster

**Domain:** AI-powered HTML content block generator for legacy CMS editors (Vietnamese market)
**Researched:** 2026-05-18
**Confidence:** HIGH (GrapesJS via Context7 official docs, Claude API via official docs, Next.js via official docs; market patterns from training data cross-checked against project context)

---

## Table Stakes

Features users expect from a tool in this category. Missing any of these = product feels incomplete or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Vietnamese-language prompt input | Core audience is Vietnamese content creators — English-first UI is a blocker | Low | Single textarea, accepts Vietnamese UTF-8; labeling/placeholder copy must be in Vietnamese |
| Real-time AI generation feedback | Users expect visual feedback that "something is happening" during a 3-10s API call | Low-Medium | Streaming SSE from Claude API or at minimum a progress spinner; blank wait state causes abandonment |
| WYSIWYG canvas preview | Users must see what they'll get before copying; blind HTML output is unacceptable | Medium | GrapesJS canvas with `editor.loadProjectData()` renders JSON without page reload — confirmed by official docs |
| Inline text editing on canvas | Click-to-edit typography is baseline expectation from any drag-and-drop tool | Low | GrapesJS component double-click edit is built-in; must be surfaced, not hidden |
| One-click "Copy HTML" | The entire value prop is in one clipboard action; any multi-step export adds friction | Low | `editor.getHtml()` + manual CSS inlining pipeline; clipboard API is well-supported |
| Inline CSS output (no `<style>` tags) | Required for CKEditor/TinyMCE XSS filters on Haravan, Sapo, WordPress — CSS classes in `<style>` tags are stripped | High | GrapesJS outputs class-based CSS by default; a CSS Isolation Engine must traverse the component tree and inline all `style=` attributes — this is the hardest table-stakes feature |
| Zero JavaScript in exported HTML | CMS sanitizers (Haravan especially) remove `<script>` tags; exported block must be static | Medium | GrapesJS default output includes JS for scripted components; config must disable all JS components and strip any remaining script nodes at export |
| Email + password auth | Any personal history requires an account; users expect basic auth as minimum | Medium | Next.js + JWT or NextAuth credentials provider; Google OAuth is explicitly deferred in PROJECT.md |
| Saved block history | Users re-use blocks across pages, come back days later, iterate on prior work | Medium | MongoDB document per block, keyed to user; auto-named from prompt text (confirmed out-of-scope for manual naming in v1) |
| Re-open / reload saved block | History is useless unless a saved block can be restored into the editor | Low | `editor.loadProjectData(savedJSON)` — documented API, straightforward |
| Responsive preview toggle | Vietnamese shop owners check mobile view; Haravan/Sapo storefronts are mobile-heavy | Low | GrapesJS `editor.setDevice()` with Desktop/Mobile presets — confirmed by docs; toggle button in toolbar |
| Undo/Redo | Any editor without Ctrl+Z feels broken to content creators | Low | GrapesJS `um.undo()` / `um.redo()` built-in; expose keyboard shortcut |
| Error state on generation failure | Claude API returns 429/5xx; user must know why generation failed, not see a blank canvas | Low | Catch API errors (rate limit, overload), show Vietnamese-language error message with retry option |
| Clean minimal HTML output (SEO-safe) | Exported HTML will contain article/product content that gets indexed | Medium | Avoid unnecessary div nesting; GrapesJS default output is reasonably clean but needs audit; no data-gjs-* attributes in output |

---

## Differentiators

Features that set AI Content Booster apart. Not baseline-expected, but competitive advantage when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Vietnamese copywriting in generated content | AI generates the actual headline, body text, and CTA copy in natural Vietnamese, not placeholder Lorem Ipsum | Medium | Claude 3.5 Sonnet has strong Vietnamese language capability; few-shot prompts must include Vietnamese example outputs to anchor language and tone |
| Prompt to layout in < 60 seconds | The speed benchmark is a brand promise — if a user can go from idea to paste-ready in one minute, it replaces a 30-minute Figma + dev handoff | High | Achievable only if GrapesJS JSON schema is tight, prompts are well-engineered with few-shot examples, and the inline CSS pipeline is fast; latency budget: ~5s Claude API + ~1s CSS inlining |
| Context-aware block types | "Tạo một banner khuyến mãi cho shop thời trang" should produce a different layout skeleton than "Viết giới thiệu sản phẩm cho đồ gia dụng" | High | Requires prompt classification layer (detect block intent: hero, product card, testimonial, CTA strip, etc.) and type-specific few-shot examples |
| AI regenerate / refine prompt | User generates a block, sees it, types "make it more minimal" or "đổi màu nền sang xanh navy" to refine without starting over | Medium | Stateful generation: keep previous GrapesJS JSON context in follow-up Claude request; UI needs a secondary prompt input that appears after first generation |
| Style preset injection ("Nhã, Bold, Minimal") | User can pick a visual personality before generating; less prompt engineering required from non-designer users | Medium | Pre-defined system prompt suffixes appended to user prompt based on style selection; 3-4 presets are enough |
| Block composition (multi-section page) | Users often want a full landing page, not just one block; ability to stack multiple AI-generated blocks into a page | High | Requires multi-page/multi-block model in GrapesJS + a concatenated HTML export; significant UX and data model complexity; defer to post-MVP |
| Generation history with prompt visible | Show what prompt produced each block in history; helps users refine prompts over time | Low | Already implied by auto-naming from prompt; surface full prompt text in history card tooltip |
| Block naming / rename | Auto-naming from prompt is good; user rename makes long-term library management feasible | Low | Simple MongoDB field update; explicitly out of scope for v1 but very low cost |
| Vietnamese UI throughout | Competitors targeting global markets have English-first UI; Vietnamese-first signals "built for you" | Low | All labels, placeholders, tooltips, error messages in Vietnamese; high trust signal for target demographic |

---

## Anti-Features

Things to deliberately NOT build. Each one is a trap that wastes build time, adds complexity, or dilutes the product.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Template library (pre-built blocks to browse) | Competes with the AI-first narrative; a template gallery makes it feel like a static block picker, not an AI tool; high curation maintenance cost | Trust the AI; if generation quality is good, templates are redundant. Defer forever unless user research proves otherwise |
| Google / social OAuth in v1 | Adds OAuth provider complexity, callback URL configuration per CMS, token refresh logic; doubles auth surface; zero PMF evidence yet | Email + password is sufficient to validate the product; OAuth is a Phase 2 quality-of-life feature |
| Direct Gutenberg / shortcode export | Gutenberg uses React components and FSE; shortcode output requires per-plugin knowledge; scope is unbounded | Clipboard paste of raw HTML works universally across all CMS versions; keep one export mechanism |
| Image upload and CDN management | Uploaded images need storage (S3/Cloudflare R2), CDN invalidation, referencing in GrapesJS Asset Manager, and URL rewriting on export; high ops cost | Use absolute external URLs in AI-generated placeholders (Unsplash, or user's own URLs typed into trait); defer CDN to post-MVP |
| Team collaboration / multi-user workspaces | Vietnamese small-business content teams are typically 1-3 people; real-time collaboration (Figma-style) is complex and not the pain being solved | Personal history per user account is sufficient; shared links or export to file are cheaper collaborations |
| Monetization / credit system in v1 | Adding a paywall before PMF is validated increases signup friction, kills conversion, and adds Stripe/payment gateway complexity | Free in v1; instrument usage (blocks generated per user, active days) to inform pricing model before charging |
| Mobile-native app | Target users sit at a desktop editing CMS content; a native app adds React Native or Flutter scope with zero core value gain | Web app responsive enough for tablet review; full mobile editing is out of scope |
| AI-generated images (Stable Diffusion, DALL-E integration) | Image generation is a separate product domain with its own latency, cost, and content moderation requirements; blocks have placeholder image slots | Let users provide image URLs; image generation is a future integration, not a founding feature |
| Multi-language support beyond Vietnamese | Internationalisation (i18n) at launch dilutes the "built for Vietnamese creators" positioning; adds string management overhead | Vietnamese-first; English can follow once market fit is confirmed |
| Version history / diff view for blocks | Full version control (multiple saved states per block) is a developer IDE concept; content creators do not mental-model their work this way | One current state per block; undo/redo in-session is sufficient; auto-save overwrites on re-edit |
| Drag-and-drop multi-block canvas (full page builder) | A full-page builder (Webflow, Elementor) is a 12-month product; this tool's value is single-block speed | Scope: one block per session; multi-block composition is a post-PMF differentiator, not a launch feature |
| Custom font management | Font loading in inline-CSS HTML is complex (base64 encoding or external font links that CMS may strip); font management UI is a rabbit hole | Use system fonts + web-safe fonts (Arial, Georgia) for generated blocks; Vietnamese content is readable on system fonts |

---

## Feature Dependencies

```
Auth (email + password)
  └─> Block history (requires user identity)
        └─> Re-open saved block (requires saved JSON)
              └─> AI regenerate / refine (requires loaded block state)

Prompt input (Vietnamese)
  └─> AI generation (Claude API call)
        └─> GrapesJS JSON load (editor.loadProjectData)
              └─> WYSIWYG canvas preview
                    ├─> Inline text edit
                    ├─> Responsive preview toggle (editor.setDevice)
                    ├─> Style Manager (property editing)
                    └─> Copy HTML
                          └─> CSS Isolation Engine (inline CSS transform)
                                └─> Zero-JS export validator

Real-time generation feedback (SSE streaming)
  └─> Error state handling (rate limit, overload)

Undo/Redo
  └─> (depends on GrapesJS UndoManager — built-in, zero custom code)
```

---

## MVP Recommendation

### Prioritize (ship to validate)

1. **Auth** — email + password; needed for any persistence
2. **Vietnamese prompt input + AI generation** — the core value prop; without this nothing else matters
3. **GrapesJS canvas with real-time JSON load** — visual proof of generation quality
4. **Inline text editing** — minimum viable editing; users will fix AI copy mistakes
5. **CSS Isolation Engine + Copy HTML** — the exit; without working export, the whole tool is useless
6. **Saved block history with re-open** — retention; without history, every session is a one-shot use
7. **Responsive preview toggle** — single-line feature using GrapesJS built-in; high perceived value in Vietnamese mobile-heavy market
8. **Undo/Redo** — single keyboard shortcut; GrapesJS built-in; removes the "fragile editor" impression
9. **Vietnamese UI + Vietnamese error messages** — trust signal; costs near-zero to implement if done from day one

### Defer (post-PMF)

- AI regenerate / refine prompt — compelling but complex; validate generation quality first
- Style presets ("Bold", "Minimal") — useful but not blocking; can be added in Phase 2
- Block naming / rename — low cost but adds scope; auto-naming is enough for v1
- Context-aware block types — requires usage data to know which block types users actually request
- CDN image handling — architectural pre-planning already done in PROJECT.md; implement when users complain about image placeholders

---

## Vietnamese Market Context

**Haravan and Sapo CMS specifics:**
- Both platforms use CKEditor 4.x for rich content editing (not Gutenberg, not TinyMCE 6); their XSS sanitizers are conservative — class-based CSS in `<style>` blocks is stripped; inline `style=` attributes survive
- Vietnamese e-commerce shop owners are the primary Haravan/Sapo users; they are non-technical, heavily mobile-browsing, and generate high-volume product and promotional content
- Content refresh cycles are fast (seasonal promotions, TikTok-driven flash sales); the 60-second promise maps directly to this need
- WordPress in Vietnam is commonly deployed on shared hosting with outdated themes and Classic Editor (not Gutenberg) — the same inline-CSS HTML paste works here

**Competitive gap:**
- No Vietnamese-language AI content block tool exists at this specificity (as of training data cutoff)
- Global tools (Beefree, Unlayer, GrapesJS Studio) target email marketing or are developer-facing; none target Vietnamese CMS pasting
- The combination of Vietnamese language AI + inline-CSS CMS export is the specific, defensible niche

---

## Sources

- GrapesJS Official Docs (Context7 `/grapesjs/grapesjs`): `editor.getHtml()`, `editor.getCss()`, `editor.loadProjectData()`, `editor.setDevice()`, UndoManager API, Block Manager events, Style Manager API, Canvas zoom/scroll API — HIGH confidence
- Anthropic Claude Platform Docs (Context7 `/websites/platform_claude_en`): structured JSON output, streaming SSE, rate limit error handling — HIGH confidence
- Next.js Official Docs (Context7 `/vercel/next.js`): App Router streaming route handlers, SSE pattern — HIGH confidence
- PROJECT.md (AIContentBooster): product constraints, out-of-scope decisions, Vietnamese market context — primary source
- Vietnamese CMS platform characteristics (Haravan, Sapo, WordPress Classic Editor behavior): MEDIUM confidence — based on training data; should be validated with a real Haravan/Sapo test account in Phase 1
