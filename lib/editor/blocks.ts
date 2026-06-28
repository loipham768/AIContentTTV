import type { Editor } from 'grapesjs'
import { registerArticleTemplates } from './articleTemplates'
import { registerReportTemplates } from './reportTemplates'

const FONT = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`

const CAT_BASIC    = { id: 'co-ban',     label: 'Basic',       order: 1 }
const CAT_LAYOUT   = { id: 'bo-cuc',     label: 'Layout',      order: 2 }
const CAT_MARKET   = { id: 'marketing',  label: 'Marketing',   order: 3 }
const CAT_SEO      = { id: 'seo',        label: 'SEO',         order: 4 }
const CAT_MEDIA    = { id: 'media',      label: 'Media',       order: 5 }
const CAT_NAV      = { id: 'dieu-huong', label: 'Navigation',  order: 6 }
const CAT_CONTACT  = { id: 'lien-he',    label: 'Contact',     order: 7 }
const H1   = `font-size:clamp(32px,7vw,52px);font-weight:800;letter-spacing:-0.025em;line-height:1.15;margin:0;color:#0f172a;${FONT}`
const H2   = `font-size:clamp(26px,5vw,36px);font-weight:800;letter-spacing:-0.02em;line-height:1.2;margin:0;color:#0f172a;${FONT}`
const H3   = `font-size:20px;font-weight:700;line-height:1.3;margin:0;color:#0f172a;${FONT}`
const BODY = `font-size:15px;color:#475569;line-height:1.7;margin:0;${FONT}`
const COL  = `flex:1;min-width:160px;padding:20px;min-height:72px;background-color:rgba(241,245,249,0.8);border-radius:10px;border-width:1.5px;border-style:dashed;border-color:#cbd5e1;box-sizing:border-box;`

export function registerBlocks(editor: Editor) {
  const bm = editor.BlockManager
  console.log('[DEBUG] registerBlocks called — version 3')
  registerReportTemplates(editor)
  registerArticleTemplates(editor)

  // ── SEO ─────────────────────────────────────────────────────────────────
  bm.add('toc', {
    label: 'Table of Contents',
    category: CAT_SEO,
    media: `<svg viewBox="0 0 32 28" fill="none"><rect x="1" y="2" width="30" height="24" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="5" y="6" width="22" height="2.5" rx="1.25" fill="#4f46e5"/><rect x="5" y="11" width="18" height="2" rx="1" fill="#818cf8" opacity="0.7"/><rect x="7" y="15" width="16" height="2" rx="1" fill="#818cf8" opacity="0.5"/><rect x="7" y="19" width="14" height="2" rx="1" fill="#818cf8" opacity="0.35"/></svg>`,
    content: `<nav data-toc style="background-color:#f8fafc;border-width:1.5px;border-style:solid;border-color:#e0e7ff;border-radius:14px;padding:20px 24px;max-width:680px;box-sizing:border-box;${FONT}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
    <span style="font-size:16px;">📋</span>
    <span style="font-size:14px;font-weight:700;color:#0f172a;${FONT}">Article Table of Contents</span>
  </div>
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;">
    <li><a href="#section-1" data-toc-link style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${FONT}"><span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">1</span>Introduction</a></li>
    <li><a href="#section-2" data-toc-link style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${FONT}"><span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">2</span>Main Content</a></li>
    <li><a href="#section-3" data-toc-link style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${FONT}"><span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">3</span>Real Examples</a></li>
    <li><a href="#section-4" data-toc-link style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${FONT}"><span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">4</span>Conclusion</a></li>
  </ol>
</nav>
<script>(function(){
  var s=document.currentScript||document.scripts[document.scripts.length-1];
  var nav=s.previousElementSibling;
  if(!nav)return;
  var links=Array.from(nav.querySelectorAll('[data-toc-link]'));
  links.forEach(function(a){
    a.addEventListener('mouseenter',function(){a.style.background='#ede9fe';a.style.color='#4f46e5';});
    a.addEventListener('mouseleave',function(){a.style.background='';a.style.color='#374151';});
    a.addEventListener('click',function(e){
      var href=a.getAttribute('href');
      if(!href||href==='#')return;
      var target=document.querySelector(href);
      if(target){e.preventDefault();var top=target.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:top,behavior:'smooth'});}
    });
  });
  window.addEventListener('scroll',function(){
    var y=window.pageYOffset+120,active=null;
    links.forEach(function(a){var t=document.querySelector(a.getAttribute('href'));if(t&&t.getBoundingClientRect().top+window.pageYOffset<=y)active=a;});
    links.forEach(function(a){a.style.background=a===active?'#ede9fe':'';a.style.color=a===active?'#4f46e5':'#374151';});
  },{passive:true});
})();</script>`,
  })

  bm.add('article-cta', {
    label: 'Article CTA',
    category: CAT_SEO,
    media: `<svg viewBox="0 0 32 22" fill="none"><rect x="1" y="1" width="30" height="20" rx="3" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/><rect x="5" y="5" width="14" height="3" rx="1.5" fill="#4f46e5"/><rect x="5" y="10" width="22" height="2" rx="1" fill="#818cf8" opacity="0.5"/><rect x="5" y="14" width="18" height="2" rx="1" fill="#818cf8" opacity="0.35"/><rect x="20" y="5" width="7" height="9" rx="2" fill="#4f46e5"/></svg>`,
    content: `<div style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%);border-width:1.5px;border-style:solid;border-color:#c4b5fd;border-radius:16px;padding:28px 32px;display:flex;flex-wrap:wrap;align-items:center;gap:20px;${FONT}">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7c3aed;margin:0 0 8px;${FONT}">Related Articles</p>
    <h3 style="${H3}font-size:18px;margin-bottom:8px;">Looking for a Better Solution?</h3>
    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;${FONT}">Discover more useful content and practical tips to help you achieve results faster.</p>
  </div>
  <div style="flex-shrink:0;">
    <a href="#" style="display:inline-block;padding:12px 24px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;box-shadow:0 4px 12px rgba(79,70,229,0.35);white-space:nowrap;${FONT}">Learn More →</a>
  </div>
</div>`,
  })

  // ── Điều hướng ──────────────────────────────────────────────────────────
  bm.add('navbar', {
    label: 'Menu',
    category: CAT_NAV,
    media: `≡`,
    content: (() => {
      const LINK = `font-size:15px;font-weight:500;color:#334155;text-decoration:none;padding:6px 14px;border-radius:8px;transition:background 0.18s,color 0.18s;cursor:pointer;${FONT}`
      const LINK_CTA = `font-size:15px;font-weight:600;color:#fff;text-decoration:none;padding:8px 20px;border-radius:10px;background-color:#4f46e5;cursor:pointer;${FONT}`
      // Use data attributes instead of IDs so multiple navbars don't conflict
      return `<style>@media(max-width:767px){[data-nav-menu]{display:none!important;}[data-nav-toggle]{display:flex!important;}}</style>
<nav style="width:100%;background-color:#ffffff;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e8f0;box-shadow:0 1px 8px rgba(0,0,0,0.05);position:sticky;top:0;z-index:100;box-sizing:border-box;">
  <div style="max-width:1200px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
    <a href="#" style="display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;min-width:0;">
      <img src="https://placehold.co/120x36/4f46e5/ffffff?text=Logo" alt="Logo" style="height:36px;width:auto;max-width:140px;object-fit:contain;display:block;flex-shrink:0;"/>
      <span style="font-size:20px;font-weight:800;color:#0f172a;white-space:nowrap;${FONT}">Brand</span>
    </a>
    <ul data-nav-menu style="display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0;flex-wrap:nowrap;">
      <li><a href="#about" style="${LINK}">About</a></li>
      <li><a href="#services" style="${LINK}">Services</a></li>
      <li><a href="#pricing" style="${LINK}">Pricing</a></li>
      <li><a href="#contact" style="${LINK}">Contact</a></li>
      <li style="margin-left:8px;"><a href="#contact" style="${LINK_CTA}">Get Started</a></li>
    </ul>
    <button data-nav-toggle aria-label="Menu" style="display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px;flex-shrink:0;">
      <span style="display:block;width:22px;height:2px;background-color:#334155;border-radius:2px;"></span>
      <span style="display:block;width:22px;height:2px;background-color:#334155;border-radius:2px;"></span>
      <span style="display:block;width:22px;height:2px;background-color:#334155;border-radius:2px;"></span>
    </button>
  </div>
  <div data-nav-mobile style="display:none;border-top-width:1px;border-top-style:solid;border-top-color:#f1f5f9;padding:12px 24px 16px;">
    <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;">
      <li><a href="#about" style="${LINK}display:block;">About</a></li>
      <li><a href="#services" style="${LINK}display:block;">Services</a></li>
      <li><a href="#pricing" style="${LINK}display:block;">Pricing</a></li>
      <li><a href="#contact" style="${LINK}display:block;">Contact</a></li>
      <li style="margin-top:8px;"><a href="#contact" style="${LINK_CTA}display:block;text-align:center;">Get Started</a></li>
    </ul>
  </div>
</nav>
<script>(function(){
  var s=document.currentScript||document.scripts[document.scripts.length-1];
  var nav=s.previousElementSibling;
  if(!nav)return;
  var toggle=nav.querySelector('[data-nav-toggle]');
  var mobile=nav.querySelector('[data-nav-mobile]');
  var menu=nav.querySelector('[data-nav-menu]');
  nav.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var href=a.getAttribute('href');
      if(!href||href==='#')return;
      var target=document.querySelector(href);
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
      if(mobile&&mobile.style.display!=='none'){mobile.style.display='none';}
    });
    a.addEventListener('mouseenter',function(){a.style.background='#f1f5f9';a.style.color='#4f46e5';});
    a.addEventListener('mouseleave',function(){a.style.background='';a.style.color='';});
  });
  function checkBreak(){
    var sm=window.innerWidth<768;
    if(toggle)toggle.style.display=sm?'flex':'none';
    if(menu)menu.style.display=sm?'none':'flex';
    if(mobile&&!sm)mobile.style.display='none';
  }
  toggle&&toggle.addEventListener('click',function(){
    mobile.style.display=mobile.style.display==='none'?'block':'none';
  });
  checkBreak();
  window.addEventListener('resize',checkBreak);
  var links=Array.from(nav.querySelectorAll('a[href^="#"]'));
  window.addEventListener('scroll',function(){
    var scrollY=window.scrollY+80;
    var active=null;
    links.forEach(function(a){
      var t=document.querySelector(a.getAttribute('href'));
      if(t&&t.offsetTop<=scrollY)active=a;
    });
    links.forEach(function(a){
      a.style.color=a===active?'#4f46e5':'';
      a.style.fontWeight=a===active?'700':'';
    });
  },{passive:true});
})();</script>`
    })(),
  })

  // ── Bố cục ──────────────────────────────────────────────────────────────
  bm.add('section', {
    label: 'Section',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="1" width="30" height="22" rx="3" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/><rect x="5" y="6" width="22" height="3" rx="1" fill="#7c3aed" opacity="0.7"/><rect x="5" y="11" width="16" height="2" rx="1" fill="#7c3aed" opacity="0.4"/><rect x="5" y="15" width="11" height="2" rx="1" fill="#7c3aed" opacity="0.25"/></svg>`,
    content: `<section style="padding:56px 24px;width:100%;box-sizing:border-box;background-color:#ffffff;"><div style="max-width:1200px;margin:0 auto;min-height:48px;"></div></section>`,
  })

  bm.add('1-col', {
    label: '1 Column',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="2" y="2" width="28" height="20" rx="3" fill="#818cf8"/></svg>`,
    content: `<div style="${COL}"></div>`,
  })

  bm.add('2-col', {
    label: '2 Columns',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="2" width="13" height="20" rx="2.5" fill="#818cf8"/><rect x="16" y="2" width="15" height="20" rx="2.5" fill="#c4b5fd"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('3-col', {
    label: '3 Columns',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="2" width="8.5" height="20" rx="2" fill="#818cf8"/><rect x="11.5" y="2" width="9" height="20" rx="2" fill="#a5b4fc"/><rect x="22.5" y="2" width="8.5" height="20" rx="2" fill="#c4b5fd"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('4-col', {
    label: '4 Columns',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="2" width="6" height="20" rx="1.5" fill="#818cf8"/><rect x="9" y="2" width="6" height="20" rx="1.5" fill="#a5b4fc"/><rect x="17" y="2" width="6" height="20" rx="1.5" fill="#c4b5fd"/><rect x="25" y="2" width="6" height="20" rx="1.5" fill="#ddd6fe"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:12px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('col-70-30', {
    label: '70/30',
    category: CAT_LAYOUT,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="2" width="19" height="20" rx="2.5" fill="#818cf8"/><rect x="22" y="2" width="9" height="20" rx="2.5" fill="#c4b5fd"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:7;min-width:240px;padding:20px;min-height:72px;background-color:rgba(241,245,249,0.8);border-radius:10px;border-width:1.5px;border-style:dashed;border-color:#cbd5e1;box-sizing:border-box;"></div>
  <div style="flex:3;min-width:140px;padding:20px;min-height:72px;background-color:rgba(241,245,249,0.8);border-radius:10px;border-width:1.5px;border-style:dashed;border-color:#cbd5e1;box-sizing:border-box;"></div>
</div>`,
  })

  // ── Cơ bản ──────────────────────────────────────────────────────────────
  bm.add('text', {
    label: 'Text',
    category: CAT_BASIC,
    media: `¶`,
    content: `<p style="${BODY}margin:0;">Enter your text here. Click to edit content.</p>`,
  })

  bm.add('heading', {
    label: 'Heading',
    category: CAT_BASIC,
    media: `𝐓`,
    content: `<h2 style="${H2}">Your Heading</h2>`,
  })

  bm.add('heading-sm', {
    label: 'Subheading',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 22" fill="none"><rect x="2" y="2" width="18" height="4.5" rx="2" fill="#1d4ed8"/><rect x="2" y="9.5" width="28" height="3" rx="1.5" fill="#94a3b8"/><rect x="2" y="15" width="22" height="3" rx="1.5" fill="#e2e8f0"/></svg>`,
    content: `<h3 style="${H3}">Subheading</h3>`,
  })

  bm.add('image', {
    label: 'Image',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 26" fill="none"><rect x="1" y="1" width="30" height="24" rx="3" fill="#bfdbfe"/><rect x="1" y="1" width="30" height="24" rx="3" stroke="#60a5fa" stroke-width="1.5"/><circle cx="9" cy="8.5" r="3.5" fill="#fbbf24"/><path d="M1 19L10 12L17 17L22 13L31 19" fill="#38bdf8"/><rect x="1" y="17" width="30" height="8" rx="0" fill="#38bdf8"/></svg>`,
    content: `<img src="https://placehold.co/800x420/e0e7ff/6366f1?text=Image" alt="Image" style="max-width:100%;height:auto;display:block;border-radius:14px;"/>`,
    attributes: { class: 'gjs-block-image' },
  })

  bm.add('button', {
    label: 'Button',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 18" fill="none"><rect x="1" y="2" width="30" height="14" rx="7" fill="#4f46e5"/><rect x="9" y="6.5" width="14" height="3" rx="1.5" fill="white" opacity="0.85"/></svg>`,
    content: `<a href="#" style="display:inline-block;padding:13px 30px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;letter-spacing:0.01em;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Click Me</a>`,
  })

  bm.add('divider', {
    label: 'Divider',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 12" fill="none"><rect x="1" y="5.25" width="12" height="2" rx="1" fill="#cbd5e1"/><circle cx="16" cy="6.25" r="3" fill="#4f46e5"/><rect x="19" y="5.25" width="12" height="2" rx="1" fill="#cbd5e1"/></svg>`,
    content: `<hr style="border:none;border-top-width:1.5px;border-top-style:solid;border-top-color:#e2e8f0;margin:32px 0;"/>`,
  })

  bm.add('spacer', {
    label: 'Spacer',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 22" fill="none"><rect x="3" y="1" width="26" height="4.5" rx="2" fill="#94a3b8" opacity="0.45"/><path d="M13 9.5L16 7L19 9.5" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="7.5" x2="16" y2="14.5" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2 1.5" stroke-linecap="round"/><path d="M13 12.5L16 15L19 12.5" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="16.5" width="26" height="4.5" rx="2" fill="#94a3b8" opacity="0.45"/></svg>`,
    content: `<div style="height:56px;"></div>`,
  })

  bm.add('list', {
    label: 'List',
    category: CAT_BASIC,
    media: `📋`,
    content: `<ul style="list-style:none;padding:0;margin:0;${FONT}">
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    First key highlight
  </li>
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    Second key highlight
  </li>
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    Third key highlight
  </li>
</ul>`,
  })

  bm.add('announcement', {
    label: 'Announcement',
    category: CAT_MARKET,
    media: `📢`,
    content: `<div style="background-color:#4f46e5;padding:12px 24px;width:100%;box-sizing:border-box;${FONT}">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;">
    <span style="color:rgba(255,255,255,0.9);font-size:14px;text-align:center;">🎉 Special Offer — Get <strong style="color:#fff;">20%</strong> off for new customers. Ends Dec 31!</span>
    <a href="#" style="display:inline-block;padding:4px 14px;background-color:rgba(255,255,255,0.18);color:#fff;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:600;border-width:1px;border-style:solid;border-color:rgba(255,255,255,0.35);white-space:nowrap;">Order Now →</a>
  </div>
</div>`,
  })

  // ── Marketing ───────────────────────────────────────────────────────────
  bm.add('hero', {
    label: 'Hero',
    category: CAT_MARKET,
    media: `🏠`,
    content: `<section style="background-color:#1e1b4b;padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(255,255,255,0.14) 0%,transparent 65%);pointer-events:none;"></div>
  <div style="position:absolute;top:10%;right:8%;width:180px;height:180px;background-color:rgba(167,139,250,0.15);border-radius:50%;filter:blur(48px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:10%;left:6%;width:140px;height:140px;background-color:rgba(99,102,241,0.2);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;max-width:680px;margin:0 auto;">
    <span style="display:inline-block;padding:6px 18px;background-color:rgba(255,255,255,0.12);border-width:1px;border-style:solid;border-color:rgba(255,255,255,0.22);border-radius:9999px;font-size:13px;font-weight:500;margin-bottom:24px;letter-spacing:0.04em;">🚀 New Version Launch</span>
    <h1 style="${H1}color:#fff;margin:0 0 20px;">Impressive Headline</h1>
    <p style="font-size:clamp(15px,3vw,18px);line-height:1.75;color:rgba(255,255,255,0.82);margin:0 0 40px;max-width:520px;margin-left:auto;margin-right:auto;${FONT}">A brief and compelling description of your product or service to attract customers</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="#" style="display:inline-block;padding:14px 34px;background-color:#fff;color:#4f46e5;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 6px 20px rgba(0,0,0,0.2);${FONT}">Get Started</a>
      <a href="#" style="display:inline-block;padding:14px 34px;border-width:2px;border-style:solid;border-color:rgba(255,255,255,0.45);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;${FONT}">Learn More →</a>
    </div>
  </div>
</section>`,
  })

  bm.add('features', {
    label: 'Features',
    category: CAT_MARKET,
    media: `⚡`,
    content: `<section style="padding:80px 24px;background-color:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:56px;">
      <span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Features</span>
      <h2 style="${H2}margin-bottom:14px;">Why Choose Us?</h2>
      <p style="${BODY}max-width:460px;margin:0 auto;">Features designed to help you work more efficiently and achieve the best results</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background-color:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">⚡</div>
        <h3 style="${H3}margin-bottom:10px;">Fast</h3>
        <p style="${BODY}font-size:14px;">A brief and concise description of your first feature so users understand it immediately</p>
      </div>
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background-color:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#e0e7ff,#c7d2fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">🎯</div>
        <h3 style="${H3}margin-bottom:10px;">Accurate</h3>
        <p style="${BODY}font-size:14px;">A brief and concise description of your second feature so users understand it immediately</p>
      </div>
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background-color:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">🔒</div>
        <h3 style="${H3}margin-bottom:10px;">Secure</h3>
        <p style="${BODY}font-size:14px;">A brief and concise description of your third feature so users understand it immediately</p>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('cta', {
    label: 'CTA',
    category: CAT_MARKET,
    media: `📣`,
    content: `<section style="background-color:#312e81;padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(167,139,250,0.25) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:relative;max-width:580px;margin:0 auto;">
    <h2 style="font-size:clamp(28px,6vw,40px);font-weight:800;margin:0 0 16px;line-height:1.2;letter-spacing:-0.02em;${FONT}">Ready to Get Started?</h2>
    <p style="font-size:17px;margin:0 0 40px;color:rgba(255,255,255,0.8);line-height:1.7;${FONT}">Sign up for free today and experience the difference we bring</p>
    <a href="#" style="display:inline-block;padding:15px 42px;background-color:#fff;color:#4f46e5;text-decoration:none;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 6px 20px rgba(0,0,0,0.2);${FONT}">Sign Up Free</a>
  </div>
</section>`,
  })

  bm.add('card', {
    label: 'Product Card',
    category: CAT_MARKET,
    media: `<svg viewBox="0 0 32 26" fill="none"><rect x="1" y="1" width="30" height="24" rx="3" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/><rect x="1" y="1" width="30" height="9" rx="3" fill="#0891b2"/><rect x="1" y="7" width="30" height="3" fill="#0891b2"/><rect x="5" y="14" width="14" height="2.5" rx="1.25" fill="#334155"/><rect x="5" y="19" width="10" height="2" rx="1" fill="#94a3b8"/></svg>`,
    content: `<div style="background-color:#fff;border-radius:18px;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 12px 32px rgba(79,70,229,0.09);overflow:hidden;max-width:320px;${FONT}">
  <div style="position:relative;overflow:hidden;">
    <img src="https://placehold.co/320x200/e0e7ff/6366f1?text=Product+Image" alt="" style="width:100%;height:200px;object-fit:cover;display:block;"/>
    <span style="position:absolute;top:12px;left:12px;padding:4px 12px;background-color:#4f46e5;color:#fff;border-radius:9999px;font-size:12px;font-weight:600;">New</span>
  </div>
  <div style="padding:22px;">
    <h3 style="${H3}margin-bottom:8px;font-size:17px;">Product Name</h3>
    <p style="${BODY}font-size:14px;margin-bottom:18px;">A compelling short description of your product or service</p>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <span style="font-size:22px;font-weight:800;color:#4f46e5;${FONT}">$29.99</span>
      <a href="#" style="padding:9px 20px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;${FONT}">Buy Now</a>
    </div>
  </div>
</div>`,
  })

  bm.add('testimonial', {
    label: 'Testimonial',
    category: CAT_MARKET,
    media: `💬`,
    content: `<div style="background-color:#fff;border-radius:18px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 32px rgba(79,70,229,0.08);max-width:600px;position:relative;${FONT}">
  <div style="position:absolute;top:28px;right:28px;font-size:48px;line-height:1;color:#e0e7ff;font-family:Georgia,serif;">"</div>
  <div style="display:flex;gap:4px;margin-bottom:16px;">
    <span style="color:#f59e0b;font-size:18px;">★★★★★</span>
  </div>
  <p style="font-size:16px;color:#334155;line-height:1.8;margin:0 0 24px;font-style:italic;">"Amazing product! It has saved me so much time. I am completely satisfied and will definitely continue using it."</p>
  <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
    <div style="width:48px;height:48px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-block;line-height:48px;text-align:center;font-weight:700;font-size:18px;flex-shrink:0;">A</div>
    <div>
      <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:2px;${FONT}">Alex Johnson</div>
      <div style="font-size:13px;color:#94a3b8;${FONT}">Director, ABC Company</div>
    </div>
  </div>
</div>`,
  })

  bm.add('pricing', {
    label: 'Pricing',
    category: CAT_MARKET,
    media: `💳`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:20px;max-width:860px;margin:0 auto;padding:24px;box-sizing:border-box;${FONT}">
  <div style="flex:1;min-width:260px;border-width:1.5px;border-style:solid;border-color:#e2e8f0;border-radius:18px;padding:32px 24px;text-align:center;background-color:#fff;">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 12px;">Basic</p>
    <div style="font-size:42px;font-weight:800;color:#0f172a;margin:0 0 4px;letter-spacing:-0.02em;${FONT}">$9</div>
    <p style="font-size:14px;color:#94a3b8;margin:0 0 24px;">/month</p>
    <a href="#" style="display:block;padding:12px;background-color:#f1f5f9;color:#475569;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;margin-bottom:28px;${FONT}">Get Started</a>
    <ul style="list-style:none;padding:0;margin:0;text-align:left;font-size:14px;color:#475569;line-height:1;">
      <li style="padding:9px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Feature A</li>
      <li style="padding:9px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Feature B</li>
      <li style="padding:9px 0;display:flex;align-items:center;gap:8px;"><span style="color:#cbd5e1;font-size:16px;">✗</span> <span style="color:#cbd5e1;">Feature C</span></li>
    </ul>
  </div>
  <div style="flex:1;min-width:260px;border-width:2px;border-style:solid;border-color:#4f46e5;border-radius:18px;padding:32px 24px;text-align:center;background-color:#faf5ff;position:relative;">
    <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 16px;background-color:#f59e0b;color:#fff;border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.05em;white-space:nowrap;${FONT}">★ Most Popular</span>
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6d28d9;margin:0 0 12px;">Pro</p>
    <div style="font-size:42px;font-weight:800;color:#0f172a;margin:0 0 4px;letter-spacing:-0.02em;${FONT}">$29</div>
    <p style="font-size:14px;color:#94a3b8;margin:0 0 24px;">/month</p>
    <a href="#" style="display:block;padding:12px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin-bottom:28px;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Choose Now</a>
    <ul style="list-style:none;padding:0;margin:0;text-align:left;font-size:14px;color:#475569;line-height:1;">
      <li style="padding:9px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Feature A</li>
      <li style="padding:9px 0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Feature B</li>
      <li style="padding:9px 0;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Feature C</li>
    </ul>
  </div>
</div>`,
  })

  bm.add('service-table', {
    label: 'Service Table',
    category: CAT_MARKET,
    media: `📊`,
    content: `<div style="width:100%;box-sizing:border-box;padding:40px 24px;background-color:#f8fafc;${FONT}">
  <div style="max-width:900px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:36px;">
      <span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;">Services</span>
      <h2 style="${H2}margin-bottom:10px;">Service Pricing Table</h2>
      <p style="${BODY}max-width:440px;margin:0 auto;">Choose the service package that best suits your needs</p>
    </div>
    <div style="background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.08);">
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
        <table style="width:100%;min-width:560px;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);">
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:left;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Package</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:left;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Includes</th>
              <th style="background:transparent;color:rgba(255,255,255,0.85);padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Duration</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Price</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Book Now</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;background-color:#fff;">
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Basic Plan</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">For individuals</div>
              </td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;background-color:#fff;color:#475569;font-size:13px;line-height:1.6;">1 consultation · Email support · Documentation</td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;background-color:#fff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">1–3 days</td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;background-color:#fff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">$49</div>
                <div style="font-size:11px;color:#94a3b8;">/session</div>
              </td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;background-color:#fff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background-color:#f1f5f9;color:#475569;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;${FONT}">Select</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;background-color:#faf5ff;position:relative;">
                <div style="display:inline-block;padding:2px 10px;background-color:#f59e0b;color:#fff;border-radius:9999px;font-size:10px;font-weight:700;letter-spacing:0.05em;margin-bottom:6px;${FONT}">★ Popular</div>
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Professional Plan</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">For SME businesses</div>
              </td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;background-color:#faf5ff;color:#475569;font-size:13px;line-height:1.6;">Unlimited consultations · Priority support · Monthly reports · Continuous optimization</td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;background-color:#faf5ff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">3–7 days</td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;background-color:#faf5ff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">$129</div>
                <div style="font-size:11px;color:#94a3b8;">/month</div>
              </td>
              <td style="padding:18px 20px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#ede9fe;background-color:#faf5ff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 3px 10px rgba(79,70,229,0.35);white-space:nowrap;${FONT}">Select</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;background-color:#fff;">
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Enterprise Plan</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">Comprehensive solution</div>
              </td>
              <td style="padding:18px 20px;background-color:#fff;color:#475569;font-size:13px;line-height:1.6;">All Pro features · Dedicated account manager · SLA commitment · Custom solutions</td>
              <td style="padding:18px 20px;background-color:#fff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">Custom</td>
              <td style="padding:18px 20px;background-color:#fff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">Contact</div>
                <div style="font-size:11px;color:#94a3b8;">based on needs</div>
              </td>
              <td style="padding:18px 20px;background-color:#fff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background-color:#f1f5f9;color:#475569;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;${FONT}">Contact Us</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`,
  })

  // ── Media ───────────────────────────────────────────────────────────────
  bm.add('video', {
    label: 'Video',
    category: CAT_MEDIA,
    media: `▶`,
    content: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:100%;border-radius:14px;background-color:#0f172a;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>`,
  })

  bm.add('badge', {
    label: 'Badge',
    category: CAT_BASIC,
    media: `🏷`,
    content: `<span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#5b21b6;border-radius:9999px;font-size:13px;font-weight:600;${FONT}">✨ New Label</span>`,
  })

  bm.add('icon-text', {
    label: 'Icon + Content',
    category: CAT_MARKET,
    media: `<svg viewBox="0 0 32 24" fill="none"><rect x="1" y="4" width="11" height="11" rx="2.5" fill="#4f46e5"/><rect x="15" y="5" width="16" height="3" rx="1.5" fill="#334155"/><rect x="15" y="11" width="11" height="2.5" rx="1.25" fill="#94a3b8"/><rect x="1" y="19" width="30" height="2.5" rx="1.25" fill="#e2e8f0"/></svg>`,
    content: `<div style="display:flex;align-items:flex-start;gap:18px;padding:20px;${FONT}">
  <div style="width:52px;height:52px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;color:#fff;display:inline-block;line-height:52px;text-align:center;font-size:24px;flex-shrink:0;">✓</div>
  <div>
    <h4 style="${H3}font-size:16px;margin-bottom:6px;">Feature Highlight Title</h4>
    <p style="${BODY}font-size:14px;">A brief description of this product or service feature highlight</p>
  </div>
</div>`,
  })

  // ── Landing page essentials ─────────────────────────────────────────────
  bm.add('stats', {
    label: 'Stats',
    category: CAT_MARKET,
    media: `📈`,
    content: `<section style="padding:64px 24px;background-color:#fff;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:880px;margin:0 auto;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#f0f4ff,#e8f0fe);border-width:1.5px;border-style:solid;border-color:#c7d2fe;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#4f46e5;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">10,000+</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Trusted Customers</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#fdf4ff,#fce7ff);border-width:1.5px;border-style:solid;border-color:#e9d5ff;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#7c3aed;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">98%</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Satisfaction Rate</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#f0fdf4,#dcfce7);border-width:1.5px;border-style:solid;border-color:#a7f3d0;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#059669;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">5 Years</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">In Operation</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#fff7ed,#ffedd5);border-width:1.5px;border-style:solid;border-color:#fed7aa;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#ea580c;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">24/7</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Customer Support</div>
    </div>
  </div>
</section>`,
  })

  bm.add('steps', {
    label: 'Process Steps',
    category: CAT_MARKET,
    media: `<svg viewBox="0 0 32 26" fill="none"><circle cx="8" cy="6" r="4.5" fill="#4f46e5"/><circle cx="17" cy="6" r="4.5" fill="#818cf8"/><circle cx="26" cy="6" r="4.5" fill="#c4b5fd"/><rect x="3.5" y="11.5" width="5" height="2" rx="1" fill="#4f46e5" opacity="0.5"/><rect x="3.5" y="16" width="5" height="2" rx="1" fill="#4f46e5" opacity="0.3"/><rect x="3.5" y="20.5" width="5" height="2" rx="1" fill="#4f46e5" opacity="0.2"/></svg>`,
    content: `<section style="padding:80px 24px;background-color:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:56px;">
      <span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Process</span>
      <h2 style="${H2}margin-bottom:12px;">Just 4 Simple Steps</h2>
      <p style="${BODY}max-width:460px;margin:0 auto;">From registration to results — fast and easy</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:0;">
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(79,70,229,0.35);${FONT}">1</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Create Account</h3>
        <p style="${BODY}font-size:13px;">Create a free account in just 30 seconds</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#7c3aed,#9333ea);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(124,58,237,0.35);${FONT}">2</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Enter Information</h3>
        <p style="${BODY}font-size:13px;">Fill in your details following the instructions</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#9333ea,#db2777);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(147,51,234,0.35);${FONT}">3</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Confirm Order</h3>
        <p style="${BODY}font-size:13px;">Review and confirm your information</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#db2777,#f59e0b);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(219,39,119,0.3);${FONT}">4</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Get Results</h3>
        <p style="${BODY}font-size:13px;">Enjoy the service immediately after completion</p>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('faq', {
    label: 'FAQ',
    category: CAT_MARKET,
    media: `❓`,
    content: `<section style="padding:80px 24px;background-color:#fff;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:720px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:48px;">
      <span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">FAQ</span>
      <h2 style="${H2}margin-bottom:12px;">Frequently Asked Questions</h2>
      <p style="${BODY}">Answers to the most common questions from our customers</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="border-width:1.5px;border-style:solid;border-color:#e2e8f0;border-radius:14px;overflow:hidden;background-color:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Is your service suitable for small businesses?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Yes, we design our services to fit businesses of all sizes. The Basic Plan is specially optimized for individuals and startups at the most affordable price.</div>
      </div>
      <div style="border-width:1.5px;border-style:solid;border-color:#e2e8f0;border-radius:14px;overflow:hidden;background-color:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Can I cancel my subscription at any time?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Absolutely. There are no long-term contracts. You can cancel at any time before your renewal date without any additional charges.</div>
      </div>
      <div style="border-width:1.5px;border-style:solid;border-color:#e2e8f0;border-radius:14px;overflow:hidden;background-color:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">How long does implementation take?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Usually 1 to 3 business days depending on the service package. Enterprise plans with custom requirements may take additional time by agreement.</div>
      </div>
      <div style="border-width:1.5px;border-style:solid;border-color:#e2e8f0;border-radius:14px;overflow:hidden;background-color:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Is there a free trial?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Yes! We offer a 14-day free trial with full features. No credit card required.</div>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('team', {
    label: 'Team',
    category: CAT_MARKET,
    media: `👥`,
    content: `<section style="padding:80px 24px;background-color:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Team</span>
      <h2 style="${H2}margin-bottom:12px;">Meet Our Team</h2>
      <p style="${BODY}max-width:440px;margin:0 auto;">Dedicated experts always ready to support you</p>
    </div>
    <div style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center;">
      <div style="flex:1;min-width:240px;max-width:300px;background-color:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#e0e7ff,#ede9fe);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border-width:4px;border-style:solid;border-color:#fff;box-shadow:0 4px 16px rgba(79,70,229,0.3);${FONT}">A</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Alex Johnson</div>
          <div style="font-size:13px;color:#7c3aed;font-weight:600;margin-bottom:10px;${FONT}">Chief Executive Officer</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">10 years of experience in technology and product development</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
      <div style="flex:1;min-width:240px;max-width:300px;background-color:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#fce7ff,#fdf4ff);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border-width:4px;border-style:solid;border-color:#fff;box-shadow:0 4px 16px rgba(124,58,237,0.3);${FONT}">S</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Sarah Chen</div>
          <div style="font-size:13px;color:#7c3aed;font-weight:600;margin-bottom:10px;${FONT}">Head of Marketing</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">Digital marketing expert with over 8 years of brand building experience</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
      <div style="flex:1;min-width:240px;max-width:300px;background-color:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#dcfce7,#f0fdf4);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#059669,#10b981);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border-width:4px;border-style:solid;border-color:#fff;box-shadow:0 4px 16px rgba(5,150,105,0.3);${FONT}">M</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Michael Park</div>
          <div style="font-size:13px;color:#059669;font-weight:600;margin-bottom:10px;${FONT}">Engineering Lead</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">Software engineer with a passion for building useful products</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background-color:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('gallery', {
    label: 'Gallery',
    category: CAT_MEDIA,
    media: `🎞`,
    content: `<div style="padding:16px;background-color:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
    <img src="https://placehold.co/400x300/e0e7ff/6366f1?text=Photo+1" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/ede9fe/7c3aed?text=Photo+2" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/fce7ff/db2777?text=Photo+3" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/dcfce7/059669?text=Photo+4" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/fff7ed/ea580c?text=Photo+5" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/f0f9ff/0284c7?text=Photo+6" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
  </div>
</div>`,
  })

  bm.add('slider', {
    label: 'Slider',
    category: CAT_MEDIA,
    media: `<svg viewBox="0 0 32 22" fill="none"><rect x="1" y="3" width="30" height="16" rx="2.5" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="1" y="3" width="12" height="16" rx="2" fill="#818cf8" opacity="0.6"/><path d="M28 9L24 11L28 13" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    content: (() => {
      // Use data attributes instead of IDs so multiple sliders don't conflict
      const SLIDE = `flex:0 0 100%;min-width:100%;scroll-snap-align:start;position:relative;overflow:hidden;`
      const OVERLAY = `position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);pointer-events:none;`
      const CAPTION = `position:absolute;bottom:52px;left:0;right:0;padding:0 32px;`
      const SH3 = `font-size:clamp(18px,4vw,26px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.25;${FONT}`
      const P = `font-size:15px;color:rgba(255,255,255,0.82);margin:0;line-height:1.6;${FONT}`
      const DOT_BASE = `display:inline-block;height:7px;border-radius:9999px;cursor:pointer;transition:width 0.3s,background 0.3s;border:none;padding:0;`
      return `<style>[data-slide-track]::-webkit-scrollbar{display:none}</style>
<div data-slider-wrap style="width:100%;position:relative;border-radius:0;background-color:#0f172a;${FONT}">
  <div data-slide-track style="display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;">
    <div style="${SLIDE}">
      <img src="https://placehold.co/900x480/e0e7ff/4f46e5?text=Slide+1" alt="" style="width:100%;height:420px;object-fit:cover;display:block;border-radius:0;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${SH3}">Slide 1 Title</h3>
        <p style="${P}">A captivating short description of this slide's content to attract viewers</p>
      </div>
    </div>
    <div style="${SLIDE}">
      <img src="https://placehold.co/900x480/ede9fe/7c3aed?text=Slide+2" alt="" style="width:100%;height:420px;object-fit:cover;display:block;border-radius:0;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${SH3}">Slide 2 Title</h3>
        <p style="${P}">A captivating short description of this slide's content to attract viewers</p>
      </div>
    </div>
    <div style="${SLIDE}">
      <img src="https://placehold.co/900x480/dcfce7/059669?text=Slide+3" alt="" style="width:100%;height:420px;object-fit:cover;display:block;border-radius:0;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${SH3}">Slide 3 Title</h3>
        <p style="${P}">A captivating short description of this slide's content to attract viewers</p>
      </div>
    </div>
  </div>
  <div data-slide-dots style="position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:6px;z-index:10;">
    <button style="${DOT_BASE}width:28px;background-color:rgba(255,255,255,0.95);"></button>
    <button style="${DOT_BASE}width:7px;background-color:rgba(255,255,255,0.45);"></button>
    <button style="${DOT_BASE}width:7px;background-color:rgba(255,255,255,0.45);"></button>
  </div>
</div>
<script>(function(){
  var s=document.currentScript||document.scripts[document.scripts.length-1];
  var wrap=s.previousElementSibling;
  if(!wrap)return;
  var track=wrap.querySelector('[data-slide-track]');
  var dotsEl=wrap.querySelector('[data-slide-dots]');
  var dots=dotsEl?Array.from(dotsEl.querySelectorAll('button')):[];
  var cur=0,total=3,timer=null;
  function goTo(n){
    cur=(n%total+total)%total;
    track.scrollTo({left:cur*track.offsetWidth,behavior:'smooth'});
    dots.forEach(function(d,i){
      d.style.width=i===cur?'28px':'7px';
      d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';
    });
  }
  dots.forEach(function(d,i){d.addEventListener('click',function(e){e.stopPropagation();goTo(i);resetTimer();});});
  function startTimer(){timer=setInterval(function(){goTo(cur+1);},4000);}
  function resetTimer(){clearInterval(timer);startTimer();}
  wrap.addEventListener('mouseenter',function(){clearInterval(timer);});
  wrap.addEventListener('mouseleave',startTimer);
  startTimer();
  track.addEventListener('scroll',function(){
    var idx=Math.round(track.scrollLeft/track.offsetWidth);
    if(idx!==cur){cur=idx;dots.forEach(function(d,i){d.style.width=i===cur?'28px':'7px';d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';});}
  },{passive:true});
})();</script>`
    })(),
  })

  bm.add('table', {
    label: 'Data Table',
    category: CAT_BASIC,
    media: `<svg viewBox="0 0 32 22" fill="none"><rect x="1" y="1" width="30" height="20" rx="2.5" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/><rect x="1" y="1" width="30" height="6.5" rx="2.5" fill="#4f46e5"/><rect x="1" y="5.5" width="30" height="2" fill="#4f46e5"/><line x1="11" y1="7.5" x2="11" y2="21" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="7.5" x2="22" y2="21" stroke="#e2e8f0" stroke-width="1"/><line x1="1" y1="14" x2="31" y2="14" stroke="#e2e8f0" stroke-width="1"/></svg>`,
    content: `<div style="width:100%;box-sizing:border-box;${FONT}">
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:14px;border-width:1.5px;border-style:solid;border-color:#e2e8f0;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
    <table style="width:100%;min-width:400px;border-collapse:collapse;font-size:14px;background-color:#fff;">
      <thead>
        <tr>
          <th style="padding:12px 16px;text-align:left;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background-color:#f8fafc;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#e2e8f0;white-space:nowrap;">No.</th>
          <th style="padding:12px 16px;text-align:left;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background-color:#f8fafc;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#e2e8f0;">Product Name</th>
          <th style="padding:12px 16px;text-align:center;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background-color:#f8fafc;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#e2e8f0;white-space:nowrap;">Quantity</th>
          <th style="padding:12px 16px;text-align:right;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background-color:#f8fafc;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#e2e8f0;white-space:nowrap;">Unit Price</th>
          <th style="padding:12px 16px;text-align:right;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background-color:#f8fafc;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#e2e8f0;white-space:nowrap;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">1</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">Product A</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">2</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$25.00</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$50.00</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">2</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">Product B</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">1</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$48.00</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;background-color:#f8fafc;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$48.00</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">3</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">Product C</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">3</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$12.00</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#f1f5f9;">$36.00</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;text-align:right;font-weight:700;color:#0f172a;font-size:14px;background-color:#f8fafc;border-top-width:2px;border-top-style:solid;border-top-color:#e2e8f0;">Total</td>
          <td style="padding:13px 16px;background-color:#f8fafc;border-top-width:2px;border-top-style:solid;border-top-color:#e2e8f0;"></td>
          <td style="padding:13px 16px;background-color:#f8fafc;border-top-width:2px;border-top-style:solid;border-top-color:#e2e8f0;"></td>
          <td style="padding:13px 16px;background-color:#f8fafc;border-top-width:2px;border-top-style:solid;border-top-color:#e2e8f0;"></td>
          <td style="padding:13px 16px;text-align:right;font-weight:800;font-size:16px;color:#4f46e5;background-color:#f8fafc;border-top-width:2px;border-top-style:solid;border-top-color:#e2e8f0;">$134.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
  })

  bm.add('map', {
    label: 'Map',
    category: CAT_CONTACT,
    media: `<svg viewBox="0 0 32 32" fill="none"><path d="M16 2C10.5 2 6 6.8 6 12.6C6 20.2 16 30 16 30C16 30 26 20.2 26 12.6C26 6.8 21.5 2 16 2Z" fill="#e11d48"/><circle cx="16" cy="12.5" r="4.5" fill="white" opacity="0.9"/></svg>`,
    content: `<div style="width:100%;height:360px;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125418.4534827254!2d106.62873!3d10.8230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVHAuIEhDTQ!5e0!3m2!1svi!2svn!4v1635000000000" style="width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>
</div>`,
  })

  // ── SEO & Content ────────────────────────────────────────────────────────

  bm.add('h1-heading', {
    label: 'H1 Heading',
    category: CAT_SEO,
    media: `𝐇`,
    content: `<h1 style="${H1}padding:8px 0;">Main Page Heading (H1 — Important for SEO)</h1>`,
  })

  bm.add('blockquote', {
    label: 'Blockquote',
    category: CAT_BASIC,
    media: `❝`,
    content: `<blockquote style="margin:0;padding:24px 28px;border-left-width:4px;border-left-style:solid;border-left-color:#4f46e5;background-color:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:18px;font-style:italic;color:#3730a3;line-height:1.7;margin:0 0 12px;${FONT}">"This product has completely changed the way we work. The results exceeded every expectation."</p>
  <footer style="${FONT}font-size:14px;color:#6d28d9;font-weight:600;">— Alex Johnson, CEO at XYZ Company</footer>
</blockquote>`,
  })

  bm.add('logo-cloud', {
    label: 'Partner Logos',
    category: CAT_MARKET,
    media: `🏢`,
    content: `<div style="padding:40px 24px;text-align:center;${FONT}">
  <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 28px;">Trusted by</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:32px 40px;">
    <div style="padding:10px 20px;background-color:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND A</div>
    <div style="padding:10px 20px;background-color:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND B</div>
    <div style="padding:10px 20px;background-color:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND C</div>
    <div style="padding:10px 20px;background-color:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND D</div>
    <div style="padding:10px 20px;background-color:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND E</div>
  </div>
</div>`,
  })

  bm.add('image-text', {
    label: 'Image + Content',
    category: CAT_MARKET,
    media: `📸`,
    content: `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:40px;padding:48px 24px;${FONT}">
  <div style="flex:1;min-width:280px;">
    <img src="https://placehold.co/520x380/e0e7ff/4f46e5?text=Image" alt="" style="width:100%;border-radius:16px;object-fit:cover;display:block;"/>
  </div>
  <div style="flex:1;min-width:280px;">
    <span style="display:inline-block;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin-bottom:14px;${FONT}">Key Feature</span>
    <h2 style="${H2}margin-bottom:16px;">Main Benefit Heading</h2>
    <p style="${BODY}margin-bottom:20px;">Detailed description of the product/service feature. Focus on the real value customers receive.</p>
    <ul style="list-style:none;padding:0;margin:0 0 28px;display:flex;flex-direction:column;gap:10px;">
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background-color:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>First key benefit clearly stated</li>
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background-color:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>Second key benefit clearly stated</li>
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background-color:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>Third key benefit clearly stated</li>
    </ul>
    <a href="#" style="display:inline-block;padding:13px 28px;background-color:#4f46e5;color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;${FONT}">Learn More →</a>
  </div>
</div>`,
  })

  bm.add('contact-info', {
    label: 'Contact Info',
    category: CAT_CONTACT,
    media: `📞`,
    content: `<div style="padding:48px 24px;background-color:#f8fafc;${FONT}">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="${H2}text-align:center;margin-bottom:40px;">Contact Us</h2>
    <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">
      <div style="flex:1;min-width:200px;background-color:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">📍</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Address</div>
        <div style="${BODY}text-align:center;">123 Main Street, Suite 1<br>New York, NY 10001</div>
      </div>
      <div style="flex:1;min-width:200px;background-color:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">📞</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Phone</div>
        <a href="tel:+12125551234" style="color:#4f46e5;text-decoration:none;font-weight:600;font-size:15px;${FONT}">(212) 555-1234</a>
      </div>
      <div style="flex:1;min-width:200px;background-color:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">✉️</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Email</div>
        <a href="mailto:hello@brand.com" style="color:#4f46e5;text-decoration:none;font-weight:600;font-size:15px;${FONT}">hello@brand.com</a>
      </div>
      <div style="flex:1;min-width:200px;background-color:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">🕐</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Business Hours</div>
        <div style="${BODY}text-align:center;">Mon–Fri: 8:00 – 5:30 PM<br>Sat: 8:00 – 12:00 PM</div>
      </div>
    </div>
  </div>
</div>`,
  })

  bm.add('newsletter', {
    label: 'Newsletter',
    category: CAT_MARKET,
    media: `📧`,
    content: `<div style="padding:56px 24px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);text-align:center;${FONT}">
  <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin:0 0 12px;">Newsletter</p>
  <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#fff;margin:0 0 12px;line-height:1.2;${FONT}">Get the Latest Deals & Updates</h2>
  <p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0 0 32px;line-height:1.6;max-width:480px;display:inline-block;${FONT}">Subscribe to receive product updates, promotions, and useful content weekly.</p>
  <form action="#" method="post" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:480px;margin:0 auto;">
    <input type="email" name="email" placeholder="Enter your email..." required style="flex:1;min-width:220px;padding:14px 18px;border-radius:10px;border:none;font-size:14px;outline:none;${FONT}"/>
    <button type="submit" style="padding:14px 24px;background-color:#fff;color:#4f46e5;font-weight:700;font-size:14px;border:none;border-radius:10px;cursor:pointer;white-space:nowrap;${FONT}">Subscribe Now</button>
  </form>
  <p style="font-size:12px;color:rgba(255,255,255,0.55);margin:16px 0 0;${FONT}">No spam. Unsubscribe at any time.</p>
</div>`,
  })

  bm.add('social-links', {
    label: 'Social Links',
    category: CAT_CONTACT,
    media: `<svg viewBox="0 0 32 26" fill="none"><circle cx="6" cy="13" r="5" fill="#1877f2"/><circle cx="16" cy="13" r="5" fill="#e1306c"/><circle cx="26" cy="13" r="5" fill="#000"/><text x="6" y="17" text-anchor="middle" font-size="6" font-weight="900" fill="white" font-family="Arial">f</text><text x="16" y="17" text-anchor="middle" font-size="5.5" font-weight="700" fill="white" font-family="Arial">ig</text><text x="26" y="17" text-anchor="middle" font-size="6" font-weight="900" fill="white" font-family="Arial">𝕏</text></svg>`,
    content: `<div style="padding:32px 24px;text-align:center;${FONT}">
  <p style="${BODY}margin-bottom:20px;">Follow us on social media</p>
  <div style="display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;">
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background-color:#1877f2;border-radius:50%;text-decoration:none;font-size:18px;color:#fff;font-weight:800;${FONT}">f</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background-color:#e1306c;border-radius:50%;text-decoration:none;font-size:13px;color:#fff;font-weight:700;${FONT}">ig</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background-color:#000000;border-radius:50%;text-decoration:none;font-size:16px;color:#fff;font-weight:800;${FONT}">𝕏</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background-color:#ff0000;border-radius:50%;text-decoration:none;font-size:16px;color:#fff;font-weight:700;${FONT}">▶</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background-color:#0a66c2;border-radius:50%;text-decoration:none;font-size:13px;color:#fff;font-weight:700;${FONT}">in</a>
  </div>
</div>`,
  })

  bm.add('timeline', {
    label: 'Timeline',
    category: CAT_MARKET,
    media: `📅`,
    content: `<div style="padding:48px 24px;${FONT}">
  <h2 style="${H2}text-align:center;margin-bottom:40px;">Our Journey</h2>
  <div style="max-width:640px;margin:0 auto;position:relative;">
    <div style="position:absolute;left:20px;top:0;bottom:0;width:2px;background-color:#e2e8f0;"></div>
    ${['2020 — Founded the company with a team of 5 people and a breakthrough idea','2021 — Launched first product, reached 1,000 customers in 6 months','2022 — Expanded team to 30 people, received Series A funding','2023 — Serving over 50,000 customers nationwide'].map((item, i) => {
      const [year, ...rest] = item.split(' — ')
      return `<div style="display:flex;gap:20px;margin-bottom:28px;position:relative;">
      <div style="width:40px;height:40px;background-color:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1;box-shadow:0 0 0 4px #fff;">
        <span style="color:#fff;font-size:11px;font-weight:800;">${year}</span>
      </div>
      <div style="background-color:#f8fafc;border-radius:12px;padding:16px 20px;flex:1;border-width:1px;border-style:solid;border-color:#e2e8f0;">
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.6;${FONT}">${rest.join(' — ')}</p>
      </div>
    </div>`}).join('')}
  </div>
</div>`,
  })

  bm.add('breadcrumb', {
    label: 'Breadcrumb',
    category: CAT_NAV,
    media: `<svg viewBox="0 0 32 16" fill="none"><rect x="1" y="5" width="7" height="6" rx="1.5" fill="#e0e7ff"/><path d="M9.5 8h2M10.5 6.5L13 8l-2.5 1.5" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="5" width="7" height="6" rx="1.5" fill="#c7d2fe"/><path d="M22.5 8h2M23.5 6.5L26 8l-2.5 1.5" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="27" y="5" width="4" height="6" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<nav aria-label="Breadcrumb" style="padding:12px 24px;${FONT}">
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px;">
    <li><a href="/" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${FONT}">Home</a></li>
    <li style="color:#94a3b8;font-size:13px;">/</li>
    <li><a href="#" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${FONT}">Category</a></li>
    <li style="color:#94a3b8;font-size:13px;">/</li>
    <li style="font-size:13px;color:#64748b;font-weight:500;${FONT}" aria-current="page">Current Page</li>
  </ol>
</nav>`,
  })

  bm.add('blog-header', {
    label: 'Blog Header',
    category: CAT_SEO,
    media: `📝`,
    content: `<header style="padding:48px 24px 32px;max-width:800px;margin:0 auto;${FONT}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
    <span style="display:inline-block;padding:4px 12px;background-color:#ede9fe;color:#7c3aed;font-size:12px;font-weight:700;border-radius:9999px;${FONT}">Marketing</span>
    <span style="font-size:13px;color:#94a3b8;${FONT}">•</span>
    <span style="font-size:13px;color:#94a3b8;${FONT}">5 min read</span>
  </div>
  <h1 style="${H1}margin-bottom:16px;font-size:clamp(26px,5vw,40px);">Main Article Title — Most Important for SEO</h1>
  <p style="font-size:17px;color:#475569;line-height:1.7;margin:0 0 24px;${FONT}">A brief summary of the article content, appearing in the meta description and helping readers decide whether to continue reading.</p>
  <div style="display:flex;align-items:center;gap:12px;padding-top:20px;border-top-width:1px;border-top-style:solid;border-top-color:#e2e8f0;">
    <img src="https://placehold.co/44x44/4f46e5/fff?text=A" alt="" style="width:44px;height:44px;border-radius:50%;object-fit:cover;"/>
    <div>
      <div style="font-weight:600;font-size:14px;color:#0f172a;${FONT}">Alex Johnson</div>
      <div style="font-size:12px;color:#94a3b8;${FONT}">May 27, 2025</div>
    </div>
  </div>
</header>`,
  })

  bm.add('countdown', {
    label: 'Countdown',
    category: CAT_MARKET,
    media: `⏱`,
    content: `<div style="padding:40px 24px;text-align:center;background-color:#0f172a;border-radius:16px;${FONT}">
  <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 16px;">Offer ends in</p>
  <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
    ${[['02','Days'],['18','Hours'],['45','Min'],['30','Sec']].map(([n,l]) =>
      `<div style="text-align:center;">
        <div style="width:72px;height:72px;background-color:rgba(255,255,255,0.08);border-width:1px;border-style:solid;border-color:rgba(255,255,255,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;${FONT}">${n}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:6px;font-weight:500;${FONT}">${l}</div>
      </div>`).join('')}
  </div>
  <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:20px 0 0;${FONT}">* Replace the numbers above with your actual campaign countdown</p>
</div>`,
  })

  

  bm.add('footer', {
    label: 'Footer',
    category: CAT_NAV,
    media: `<svg viewBox="0 0 32 26" fill="none"><rect x="1" y="1" width="30" height="14" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/><rect x="4" y="4" width="6" height="8" rx="1" fill="#cbd5e1"/><rect x="13" y="4" width="6" height="8" rx="1" fill="#cbd5e1"/><rect x="22" y="4" width="6" height="8" rx="1" fill="#cbd5e1"/><rect x="1" y="18" width="30" height="7" rx="2" fill="#0f172a"/><rect x="5" y="21" width="10" height="1.5" rx="0.75" fill="#334155"/><rect x="20" y="21" width="7" height="1.5" rx="0.75" fill="#334155"/></svg>`,
    content: `<footer style="background-color:#0f172a;padding:48px 24px 24px;${FONT}">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="display:flex;flex-wrap:wrap;gap:40px;padding-bottom:40px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(255,255,255,0.08);">
      <div style="flex:2;min-width:200px;">
        <div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:12px;${FONT}">Brand Name</div>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 20px;max-width:260px;${FONT}">A short description of your brand and its mission.</p>
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Product</div>
        ${['Features','Pricing','Support'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Company</div>
        ${['About Us','Blog','Contact'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Legal</div>
        ${['Terms','Privacy','Cookies'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:24px;">
      <p style="font-size:13px;color:rgba(255,255,255,0.3);margin:0;${FONT}">© 2025 Brand Name. All rights reserved.</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.3);margin:0;${FONT}">Made with ❤️</p>
    </div>
  </div>
</footer>`,
  })
}


