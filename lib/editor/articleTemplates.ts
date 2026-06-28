import type { Editor } from 'grapesjs'

const F  = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const AH1 = `font-size:clamp(26px,5vw,38px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 20px;color:#0f172a;${F}`
const AH2 = `font-size:clamp(20px,3.5vw,26px);font-weight:800;letter-spacing:-0.02em;line-height:1.3;margin:40px 0 14px;color:#0f172a;padding-bottom:10px;border-bottom:2px solid #e0e7ff;${F}`
const AH3 = `font-size:19px;font-weight:700;line-height:1.35;margin:28px 0 10px;color:#1e293b;${F}`
const AP  = `font-size:16px;color:#475569;line-height:1.8;margin:0 0 16px;${F}`
const CAT = { id: 'content-templates', label: 'Content Templates', order: 9 }

// Shared fragments
const BREADCRUMB = `<nav aria-label="Breadcrumb" style="margin-bottom:20px;">
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px;">
    <li><a href="/" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${F}">Home</a></li>
    <li style="color:#94a3b8;font-size:13px;margin:0 2px;">/</li>
    <li><a href="#" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${F}">Blog</a></li>
    <li style="color:#94a3b8;font-size:13px;margin:0 2px;">/</li>
    <li style="font-size:13px;color:#64748b;${F}" aria-current="page">Article</li>
  </ol>
</nav>`

const META = (cat = 'SEO', time = '7') => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
  <span style="padding:4px 12px;background:#ede9fe;color:#7c3aed;font-size:12px;font-weight:700;border-radius:9999px;${F}">${cat}</span>
  <span style="font-size:13px;color:#94a3b8;">•</span>
  <span style="font-size:13px;color:#94a3b8;${F}">${time} min read</span>
  <span style="font-size:13px;color:#94a3b8;">•</span>
  <span style="font-size:13px;color:#94a3b8;${F}">06/01/2025</span>
</div>`

const AUTHOR = `<div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;margin-bottom:28px;">
  <img src="https://placehold.co/44x44/4f46e5/fff?text=A" alt="" style="width:44px;height:44px;border-radius:50%;flex-shrink:0;"/>
  <div>
    <div style="font-weight:600;font-size:14px;color:#0f172a;${F}">Alex Johnson</div>
    <div style="font-size:12px;color:#94a3b8;${F}">Content Marketing Expert</div>
  </div>
</div>`

const COVER = (text = 'Article+Cover+Image') => `<img src="https://placehold.co/740x400/e0e7ff/4f46e5?text=${text}" alt="Cover image" style="width:100%;height:auto;border-radius:14px;margin-bottom:32px;display:block;"/>`

const CTA_BOX = `<div style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%);border:1.5px solid #c4b5fd;border-radius:16px;padding:24px 28px;margin-top:32px;display:flex;flex-wrap:wrap;align-items:center;gap:16px;${F}">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7c3aed;margin:0 0 6px;">Related Articles</p>
    <p style="font-size:15px;font-weight:600;color:#0f172a;margin:0 0 4px;">Want to learn more?</p>
    <p style="font-size:13px;color:#64748b;margin:0;">Explore more in-depth articles</p>
  </div>
  <a href="#" style="padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;white-space:nowrap;box-shadow:0 4px 12px rgba(79,70,229,0.3);">View now →</a>
</div>`

const CHECKLIST = (items: string[]) => `<ul style="list-style:none;padding:0;margin:16px 0 24px;${F}">
  ${items.map((t, i) => `<li style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;font-size:15px;color:#334155;line-height:1.65;${i < items.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
    <span style="width:22px;height:22px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>${t}</li>`).join('')}
</ul>`

const TOC_WIDGET = (items: { href: string; text: string }[]) => `<nav data-toc style="background:#f8fafc;border:1.5px solid #e0e7ff;border-radius:14px;padding:20px 24px;margin:32px 0 36px;${F}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
    <span style="font-size:15px;">📋</span>
    <span style="font-size:14px;font-weight:700;color:#0f172a;${F}">Table of Contents</span>
  </div>
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;">
    ${items.map((item, i) => `<li><a href="${item.href}" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${F}">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">${i + 1}</span>${item.text}</a></li>`).join('')}
  </ol>
</nav>`

const NOTE_BOX = (icon: string, color: string, bg: string, border: string, content: string) =>
  `<div style="background:${bg};border:1.5px solid ${border};border-radius:12px;padding:16px 20px;margin:20px 0 24px;display:flex;gap:12px;align-items:flex-start;${F}">
    <span style="font-size:20px;flex-shrink:0;">${icon}</span>
    <p style="font-size:15px;color:${color};line-height:1.7;margin:0;">${content}</p>
  </div>`

// ─────────────────────────────────────────────────────────────────────────────

export function registerArticleTemplates(editor: Editor) {
  const bm = editor.BlockManager

  // ── 1. Simple Article ─────────────────────────────────────────────────────
  bm.add('tpl-article-basic', {
    label: 'Simple Article',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="7" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="13" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="17" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="21" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="27" width="10" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('Marketing', '6')}
<h1 style="${AH1}">Main Article Headline — Clear, Concise, and SEO-Keyword-Rich</h1>
${AUTHOR}
${COVER()}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 24px;${F}">This is the introduction paragraph. Summarize the main topic in 2–3 sentences, state the problem the reader is facing, and let them know how this article will help.</p>

<h2 id="section-1" style="${AH2}">1. First Section Heading</h2>
<p style="${AP}">Content for the first section. Provide context, define key concepts, or supply background information that readers need to understand the following sections.</p>
<p style="${AP}">Continue developing the main idea. Use concrete data, real-world examples, or stories to make the argument more persuasive.</p>
<h3 style="${AH3}">1.1. Subsection Heading (H3)</h3>
<p style="${AP}">Detailed content for the subsection. H3 headings improve the chances of appearing in featured snippets and enhance the article's overall structure.</p>

<h2 id="section-2" style="${AH2}">2. Second Section Heading</h2>
<p style="${AP}">Second section content — typically the most important part, presenting the solution or the core information of the article.</p>
${CHECKLIST(['First key point you should act on right away', 'Second key point that leads to better results', 'Third key point to round out your strategy'])}

<h2 id="conclusion" style="${AH2}">Conclusion</h2>
<p style="${AP}">Briefly summarize the main takeaways. Remind readers of the core value and encourage them to take action now.</p>
${CTA_BOX}
</article>`,
  })

  // ── 2. Article with Images ────────────────────────────────────────────────
  bm.add('tpl-article-photo', {
    label: 'Article with Images',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="7" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="13" width="8" height="7" rx="2" fill="#bfdbfe"/><rect x="17" y="13" width="8" height="2" rx="1" fill="#94a3b8"/><rect x="17" y="17" width="6" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="23" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="27" width="13" height="2" rx="1" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${META('Content', '8')}
<h1 style="${AH1}">Detailed Guide — Combining Text and Illustrative Images</h1>
${AUTHOR}
${COVER('Article+Cover+Image')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 32px;${F}">A brief, engaging introduction. Let readers know what they will learn after reading this article.</p>

<h2 id="section-1" style="${AH2}">1. First Section Heading</h2>
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;margin-bottom:24px;">
  <img src="https://placehold.co/300x200/e0e7ff/4f46e5?text=Illustration" alt="Illustration" style="flex:0 0 auto;width:280px;max-width:100%;border-radius:12px;object-fit:cover;"/>
  <div style="flex:1;min-width:220px;">
    <p style="${AP}margin-top:0;">Content paired with the illustration on the side. Combining images and text helps readers visualize the topic and increases time spent on the page.</p>
    <p style="${AP}">Continue with more detail about the image or add related information to clarify the point being made.</p>
  </div>
</div>

<h2 id="section-2" style="${AH2}">2. In-Depth Analysis</h2>
<p style="${AP}">Analysis content. This section dives into the core issue with evidence, data, and concrete examples.</p>
${CHECKLIST(['First argument supported by specific evidence', 'Second argument with data and real-world examples', 'Third argument reinforcing the central point'])}

<blockquote style="margin:24px 0;padding:20px 24px;border-left:4px solid #4f46e5;background:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:17px;font-style:italic;color:#3730a3;line-height:1.75;margin:0 0 10px;${F}">"An important quote from an expert or reputable research to boost the article's credibility."</p>
  <footer style="font-size:14px;color:#6d28d9;font-weight:600;${F}">— Source, Year Published</footer>
</blockquote>

<h2 id="section-3" style="${AH2}">3. Practical Application</h2>
<p style="${AP}">Guide readers on how to apply this knowledge in practice. This section adds value to the article and keeps readers engaged.</p>
<img src="https://placehold.co/700x320/ede9fe/7c3aed?text=Real-World+Illustration" alt="Real-world illustration" style="width:100%;height:auto;border-radius:12px;margin:16px 0 20px;display:block;"/>
<p style="${AP}">Explain the illustration above and connect it to the content covered in previous sections.</p>

<h2 id="conclusion" style="${AH2}">Conclusion</h2>
<p style="${AP}">Summarize the entire article. Highlight the main benefits and call readers to action.</p>
${CTA_BOX}
</article>`,
  })

  // ── 3. Article with Table of Contents ────────────────────────────────────
  bm.add('tpl-article-toc', {
    label: 'Article with TOC',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="6" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="12" width="18" height="5" rx="2" fill="#e0e7ff" stroke="#818cf8" stroke-width="1"/><rect x="9" y="13.5" width="5" height="1.5" rx="0.75" fill="#4f46e5"/><rect x="9" y="15" width="3" height="1" rx="0.5" fill="#818cf8"/><rect x="7" y="20" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="24" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="28" width="16" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('SEO', '10')}
<h1 style="${AH1}">Article Headline — SEO-Optimized with Full Structure</h1>
${AUTHOR}
${COVER()}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">The article introduction. Present the central problem, explain why this topic matters, and tell readers what they will gain from this article.</p>
${TOC_WIDGET([
  { href: '#section-1', text: 'Overview of the topic' },
  { href: '#section-2', text: 'Detailed analysis and data' },
  { href: '#section-3', text: 'Practical solutions and step-by-step guide' },
  { href: '#conclusion', text: 'Conclusion and next steps' },
])}

<h2 id="section-1" style="${AH2}">1. Overview of the Topic</h2>
<p style="${AP}">Overview content. This section provides context and defines any specialist terminology readers need to follow along with the rest of the article.</p>
<p style="${AP}">Continue expanding, adding compelling statistics or data to underscore the importance of the topic.</p>
<h3 style="${AH3}">1.1. Basic Concepts</h3>
<p style="${AP}">Definition and detailed explanation. Use plain language and avoid unnecessary jargon to ensure the article is accessible to a wide audience.</p>

<h2 id="section-2" style="${AH2}">2. Detailed Analysis and Data</h2>
<p style="${AP}">This is the core of the article. Present analysis, data, comparison tables, or case studies to support the main argument.</p>
${CHECKLIST([
  'Statistics or research relevant to the topic',
  'Comparison of different methods or solutions',
  'Pros and cons of each option',
])}
<h3 style="${AH3}">2.1. In-Depth Analysis</h3>
<p style="${AP}">Go deeper into each point. Use specific real-world examples or study results to strengthen the argument.</p>

<h2 id="section-3" style="${AH2}">3. Practical Solutions and Step-by-Step Guide</h2>
<p style="${AP}">The action section. Guide readers through specific steps to apply the knowledge in practice. This is the most value-creating part.</p>
${NOTE_BOX('💡', '#92400e', '#fffbeb', '#fcd34d', '<strong>Quick tip:</strong> Add a fast shortcut or hack that saves readers time during implementation.')}
<p style="${AP}">Continue with detailed instructions. Break them into clear, specific steps that are easy to follow.</p>

<h2 id="conclusion" style="${AH2}">Conclusion</h2>
<p style="${AP}">Summarize the whole article, highlight the key points, and encourage readers to start taking action today.</p>
${CTA_BOX}
</article>`,
  })

  // ── 4. Step-by-Step Guide with TOC ───────────────────────────────────────
  bm.add('tpl-howto-toc', {
    label: 'Step-by-Step Guide',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="6" width="18" height="3" rx="1.5" fill="#4f46e5"/><circle cx="9.5" cy="15" r="2.5" fill="#4f46e5"/><rect x="14" y="13.5" width="11" height="2" rx="1" fill="#94a3b8"/><rect x="14" y="16.5" width="8" height="1.5" rx="0.75" fill="#e2e8f0"/><circle cx="9.5" cy="22" r="2.5" fill="#818cf8"/><rect x="14" y="20.5" width="11" height="2" rx="1" fill="#94a3b8"/><rect x="14" y="23.5" width="7" height="1.5" rx="0.75" fill="#e2e8f0"/><circle cx="9.5" cy="29" r="2.5" fill="#c4b5fd"/><rect x="14" y="27.5" width="9" height="2" rx="1" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('Guide', '12')}
<h1 style="${AH1}">How to [Topic] Step by Step — Complete Beginner's Guide</h1>
${AUTHOR}
${COVER('Guide+Cover+Image')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">In this guide, you will learn how to [do something] step by step — from basics to advanced. Just follow the steps in order and you will achieve the desired result.</p>
${NOTE_BOX('⏱', '#1e40af', '#eff6ff', '#bfdbfe', '<strong>Time required:</strong> Approximately 30–60 minutes. <strong>Requirements:</strong> No prior experience needed.')}
${TOC_WIDGET([
  { href: '#step-1', text: 'Step 1: Prepare and gather resources' },
  { href: '#step-2', text: 'Step 2: Set up your working environment' },
  { href: '#step-3', text: 'Step 3: Execute the main process' },
  { href: '#step-4', text: 'Step 4: Review and optimize results' },
  { href: '#conclusion', text: 'Conclusion and next steps' },
])}

<h2 id="step-1" style="${AH2}">Step 1: Prepare and Gather Resources</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(79,70,229,0.35);${F}">1</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Before starting, make sure you have all the necessary tools and resources in place. Thorough preparation will make the implementation process run much more smoothly.</p>
  </div>
</div>
${CHECKLIST(['First required tool / resource', 'Second required tool / resource', 'Account or access needed beforehand'])}

<h2 id="step-2" style="${AH2}">Step 2: Set Up Your Working Environment</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#9333ea);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(124,58,237,0.35);${F}">2</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Instructions for installing, configuring, or setting up the environment. Explain why each setting matters so readers don't skip this step.</p>
  </div>
</div>
<p style="${AP}">Describe in detail each action required in this step. Add screenshots or illustrations if needed.</p>
${NOTE_BOX('⚠️', '#92400e', '#fffbeb', '#fcd34d', '<strong>Important note:</strong> This is the step where most mistakes happen. Double-check everything before moving on to Step 3.')}

<h2 id="step-3" style="${AH2}">Step 3: Execute the Main Process</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#9333ea,#db2777);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(147,51,234,0.35);${F}">3</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">This is the most important step — where most of the actual work happens. Follow each sub-instruction below in the correct order.</p>
  </div>
</div>
<h3 style="${AH3}">3.1. First Sub-Step</h3>
<p style="${AP}">Describe the specific action in detail. Include illustrations, code snippets, or real-world examples where necessary.</p>
<h3 style="${AH3}">3.2. Second Sub-Step</h3>
<p style="${AP}">Continue with the guide. If there are multiple ways to do this, choose and recommend the best one, explaining why.</p>

<h2 id="step-4" style="${AH2}">Step 4: Review and Optimize Results</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#db2777,#f59e0b);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(219,39,119,0.3);${F}">4</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">After completing the steps above, check the results to make sure everything is working as expected.</p>
  </div>
</div>
${NOTE_BOX('✅', '#065f46', '#ecfdf5', '#6ee7b7', '<strong>Success check:</strong> If you see [specific result], you have done it correctly. If you encounter an error, see the troubleshooting section below.')}

<h2 id="conclusion" style="${AH2}">Conclusion</h2>
<p style="${AP}">Congratulations! You have completed the entire process. Quickly recap what was accomplished and suggest next steps to achieve even better results.</p>
${CTA_BOX}
</article>`,
  })

  // ── 5. Advanced Full Article ──────────────────────────────────────────────
  bm.add('tpl-article-advanced', {
    label: 'Advanced Article (Full)',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="5" width="18" height="3.5" rx="1.75" fill="#4f46e5"/><rect x="7" y="11" width="18" height="4" rx="1.5" fill="#e0e7ff" stroke="#818cf8" stroke-width="1"/><rect x="9" y="12" width="10" height="1.5" rx="0.75" fill="#4f46e5"/><rect x="9" y="13.5" width="6" height="1" rx="0.5" fill="#818cf8"/><rect x="7" y="18" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="22" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="22" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="26" width="10" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="30" width="15" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('In-Depth', '15')}
<h1 style="${AH1}">In-Depth Article Headline — The Complete A-to-Z Guide</h1>
${AUTHOR}
${COVER('In-Depth+Article+Cover')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">This is an in-depth article covering everything you need to know about [topic]. By the end, you will have the knowledge and tools to successfully implement it yourself.</p>
${TOC_WIDGET([
  { href: '#overview', text: 'Overview and why it matters' },
  { href: '#analysis', text: 'Detailed analysis — Data and evidence' },
  { href: '#solution', text: 'Practical solution — Step by step' },
  { href: '#tools', text: 'Tools and supporting resources' },
  { href: '#mistakes', text: 'Common mistakes to avoid' },
  { href: '#conclusion', text: 'Conclusion and roadmap' },
])}

<h2 id="overview" style="${AH2}">1. Overview and Why It Matters</h2>
<p style="${AP}">The overview gives a big-picture look at the topic. Explain why this is worth paying attention to and how it impacts your target audience.</p>
<p style="${AP}">Provide compelling statistics or data. For example: <em>"According to a 2024 study, 78% of businesses struggle with this issue..."</em></p>
<h3 style="${AH3}">1.1. Definition and Scope</h3>
<p style="${AP}">Clarify the definition and distinguish it from related concepts. This avoids misunderstanding and ensures all readers are on the same page.</p>

<h2 id="analysis" style="${AH2}">2. Detailed Analysis — Data and Evidence</h2>
<p style="${AP}">In-depth analysis section. Present data, research, case studies, and real-world evidence to build a solid argument.</p>
${CHECKLIST([
  'Evidence #1 — Specific research or statistics supporting the argument',
  'Evidence #2 — Real-world case study or well-known example',
  'Evidence #3 — Before-and-after comparison of applying the solution',
])}
<blockquote style="margin:24px 0;padding:20px 24px;border-left:4px solid #4f46e5;background:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:17px;font-style:italic;color:#3730a3;line-height:1.75;margin:0 0 10px;${F}">"A quote from a leading expert in the field to boost credibility and authority for your article."</p>
  <footer style="font-size:14px;color:#6d28d9;font-weight:600;${F}">— Expert Name, Title at Company ABC</footer>
</blockquote>

<h2 id="solution" style="${AH2}">3. Practical Solution — Step by Step</h2>
<p style="${AP}">This is the most valuable section. Actionable, detailed instructions with clear, measurable steps.</p>
<h3 style="${AH3}">3.1. First Step — Foundation</h3>
<p style="${AP}">Describe the first step in detail. Include examples, illustrations, or sample templates where possible. This step lays the foundation for the entire process.</p>
<h3 style="${AH3}">3.2. Second Step — Implementation</h3>
<p style="${AP}">Details of the main implementation step. This is usually the most effort-intensive but produces the most visible results.</p>
${NOTE_BOX('💡', '#92400e', '#fffbeb', '#fcd34d', '<strong>Quick tip:</strong> A shortcut that saves you 50% of the time at this step — [describe the specific shortcut].')}
<h3 style="${AH3}">3.3. Third Step — Optimization</h3>
<p style="${AP}">Guide for optimizing results. Distinguish between a basic level (good enough) vs. advanced level (excellent) so readers can adjust to their own goals.</p>

<h2 id="tools" style="${AH2}">4. Tools and Supporting Resources</h2>
<p style="${AP}">A list of recommended tools, software, or resources, along with a brief evaluation of pros and cons.</p>
<div style="display:flex;flex-wrap:wrap;gap:12px;margin:16px 0 24px;">
  ${[['⭐ Free', 'Tool A', '#dcfce7', '#15803d'], ['💎 Premium', 'Tool B', '#ede9fe', '#7c3aed'], ['🔧 Open Source', 'Tool C', '#fff7ed', '#c2410c']].map(([badge, name, bg, color]) =>
    `<div style="flex:1;min-width:180px;background:${bg};border-radius:12px;padding:16px;"><div style="font-size:12px;font-weight:700;color:${color};margin-bottom:6px;${F}">${badge}</div><div style="font-size:15px;font-weight:600;color:#0f172a;${F}">${name}</div><p style="font-size:13px;color:#475569;margin:4px 0 0;${F}">Brief description of features and best use cases.</p></div>`
  ).join('')}
</div>

<h2 id="mistakes" style="${AH2}">5. Common Mistakes to Avoid</h2>
<p style="${AP}">This section is especially important — it helps readers avoid common pitfalls that have tripped up many others.</p>
${NOTE_BOX('❌', '#991b1b', '#fef2f2', '#fca5a5', '<strong>Mistake #1:</strong> [Describe the most common mistake]. Consequence: [explain why this is harmful]. How to avoid it: [specific solution].')}
${NOTE_BOX('❌', '#991b1b', '#fef2f2', '#fca5a5', '<strong>Mistake #2:</strong> [Second common mistake]. Many people skip this step because [reason], but it is actually the deciding factor between success and failure.')}

<h2 id="conclusion" style="${AH2}">Conclusion</h2>
<p style="${AP}">You have just completed the comprehensive guide on [topic]. Start with the simplest step today rather than waiting until you feel "perfectly ready."</p>
<p style="${AP}">If you found this article helpful, please share it with others and leave any questions below — we will reply as soon as possible.</p>
${CTA_BOX}
</article>`,
  })

  // ── Listicle / Top-N Article ──────────────────────────────────────────────
  bm.add('tpl-article-listicle', {
    label: 'Listicle Top-N',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="2" width="28" height="32" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="5" y="6" width="22" height="3" rx="1.5" fill="#1e1b4b"/><rect x="5" y="11" width="10" height="2" rx="1" fill="#94a3b8"/><rect x="5" y="15" width="4" height="4" rx="1" fill="#4f46e5"/><rect x="11" y="15.5" width="16" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="18" width="11" height="1.5" rx=".75" fill="#94a3b8"/><rect x="5" y="21" width="4" height="4" rx="1" fill="#7c3aed"/><rect x="11" y="21.5" width="16" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="24" width="13" height="1.5" rx=".75" fill="#94a3b8"/><rect x="5" y="28" width="4" height="4" rx="1" fill="#059669"/><rect x="11" y="28.5" width="14" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="31" width="9" height="1.5" rx=".75" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:720px;margin:0 auto;padding:40px 24px;${F}">
${BREADCRUMB}
${META('Guide', '12')}
<h1 style="${AH1}">10 [Tips/Ways/Secrets] to Help You [Achieve Result] Faster</h1>
<p style="${AP}">Brief description: this article compiles the [X] most important [tips/ways/secrets], distilled from [source/real experience]. Whether you are a beginner or already experienced, this is a list you need to read.</p>
${AUTHOR}

<!-- Intro benefits -->
<div style="background:linear-gradient(135deg,#ede9fe,#e0e7ff);border-radius:16px;padding:24px;margin-bottom:36px;">
  <p style="font-size:15px;font-weight:600;color:#3730a3;margin:0 0 10px;${F}">📌 This article helps you:</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
    ${['Understand [core concept] in a practical way','Avoid the [X] most common mistakes','Save [time/money] right from the start','Apply it immediately — no prior experience required'].map(t=>`<li style="font-size:14px;color:#4338ca;display:flex;align-items:flex-start;gap:8px;${F}"><span style="color:#4f46e5;font-weight:700;flex-shrink:0;">✓</span>${t}</li>`).join('')}
  </ul>
</div>

<!-- Items 1–3 -->
${[
  ['1','First Tip/Way — Short and Impactful','#4f46e5','#ede9fe','Clearly explain why this matters. Provide evidence, concrete examples, or data to make it more persuasive. End with a specific action the reader can take right now.','💡 Quick tip: The simplest way to apply this is [specific action] — takes only [X minutes] but delivers [result].'],
  ['2','Second Tip/Way — Clear Benefit','#7c3aed','#f5f3ff','Describe how to do it in detail. Break it into steps if necessary. Use plain language and avoid unnecessary technical jargon when explaining to beginners.','⚡ Real example: [Name/Brand] applied this method and achieved [specific result] in [timeframe].'],
  ['3','Third Tip/Way — Measurable Outcome','#059669','#f0fdf4','This is often the point most people overlook but it creates the biggest difference. Explain the mechanism and why it works better than other approaches.','📊 Stats: According to [source], [X]% of people who applied this method saw a [Y]% improvement in [metric] within [timeframe].'],
].map(([num, title, color, bg, body, tip]) =>
  `<div style="margin-bottom:32px;padding:28px;background:#fff;border-radius:18px;border:1.5px solid #e0e7ff;box-shadow:0 2px 10px rgba(79,70,229,0.06);">
    <div style="display:flex;align-items:flex-start;gap:18px;">
      <div style="width:52px;height:52px;background:${bg};border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:${color};flex-shrink:0;border:2px solid ${color}22;">${num}</div>
      <div style="flex:1;">
        <h2 style="font-size:19px;font-weight:800;color:#0f172a;margin:0 0 10px;${F}">${title}</h2>
        <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 14px;${F}">${body}</p>
        <div style="padding:12px 16px;background:${bg};border-radius:10px;font-size:13px;color:${color};font-weight:600;${F}">${tip}</div>
      </div>
    </div>
  </div>`
).join('')}

<!-- Items 4–6 (compact layout) -->
<h2 style="${AH2}">Continued: Tips #4 to #6</h2>
${[
  ['4','Fourth Tip/Way','Brief description — focus on the achievable result and how to start right now.'],
  ['5','Fifth Tip/Way','Brief description — highlight what sets this apart from the usual approach and why this method is superior.'],
  ['6','Sixth Tip/Way','Brief description — emphasize how simple it is to implement and include a concrete real-world example.'],
].map(([num, title, body]) =>
  `<div style="display:flex;align-items:flex-start;gap:14px;padding:20px;background:#f8fafc;border-radius:14px;margin-bottom:14px;">
    <div style="width:38px;height:38px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:#fff;flex-shrink:0;">${num}</div>
    <div><h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">${title}</h3><p style="font-size:14px;color:#64748b;line-height:1.7;margin:0;${F}">${body}</p></div>
  </div>`
).join('')}

${NOTE_BOX('🎯','#1e40af','#eff6ff','#bfdbfe','<strong>Key takeaway:</strong> If you can only apply 1 tip from this list, choose <strong>#[X]</strong> — it creates the biggest impact with the least effort.')}

<!-- Items 7–10 -->
<h2 style="${AH2}">Advanced: Tips #7 to #10</h2>
${[
  ['7','Advanced #7 — For experienced practitioners'],
  ['8','Advanced #8 — Once you have mastered the basics'],
  ['9','Advanced #9 — Long-term result optimization'],
  ['10','Advanced #10 — Secrets of top performers'],
].map(([num, title]) =>
  `<div style="display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #f1f5f9;">
    <span style="width:32px;height:32px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;">${num}</span>
    <span style="font-size:15px;font-weight:600;color:#0f172a;${F}">${title}</span>
    <span style="margin-left:auto;font-size:13px;color:#4f46e5;font-weight:600;${F}">Details →</span>
  </div>`
).join('')}

<!-- Conclusion -->
<h2 style="${AH2}">Summary — Where to Start?</h2>
<p style="${AP}">You have just discovered the 10 most important [tips/ways/secrets] about [topic]. Don't try to apply them all at once — start with <strong>#1</strong> and <strong>#2</strong>, master those first, then move on to the next step.</p>
<p style="${AP}">Which of these are you already using? Share your experience in the comments below!</p>
${CTA_BOX}
</article>`,
  })
}
