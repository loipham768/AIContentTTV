import type { Editor } from 'grapesjs'

const F   = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const LP  = { id: 'landing-templates', label: 'Landing Page Templates', order: 9 }
const ADS = { id: 'ad-templates',      label: 'Ad Templates',           order: 10 }

// ─── Shared helpers ────────────────────────────────────────────────────────

const BADGE = (text: string) =>
  `<span style="display:inline-block;padding:5px 16px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:9999px;font-size:13px;font-weight:600;letter-spacing:0.04em;margin-bottom:20px;${F}">${text}</span>`

const FEATURE_CARD = (icon: string, title: string, desc: string, accent = '#4f46e5') =>
  `<div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 28px rgba(79,70,229,0.08);">
    <div style="width:60px;height:60px;background:linear-gradient(135deg,${accent}22,${accent}44);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px;">${icon}</div>
    <h3 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 10px;${F}">${title}</h3>
    <p style="font-size:14px;color:#64748b;line-height:1.7;margin:0;${F}">${desc}</p>
  </div>`

const STEP_ITEM = (num: number, title: string, desc: string, grad: string, shadow: string) =>
  `<div style="flex:1;min-width:200px;text-align:center;padding:0 16px 32px;">
    <div style="width:54px;height:54px;background:${grad};border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:16px;box-shadow:${shadow};${F}">${num}</div>
    <h4 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px;${F}">${title}</h4>
    <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p>
  </div>`

const TICK_ITEM = (text: string) =>
  `<li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;padding:8px 0;border-bottom:1px solid #f1f5f9;${F}">
    <span style="width:22px;height:22px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">✓</span>${text}</li>`

// ═══════════════════════════════════════════════════════════════════════════
//  LANDING PAGE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

export function registerLandingTemplates(editor: Editor) {
  const bm = editor.BlockManager

  // ── LP 1: Simple ──────────────────────────────────────────────────────────
  bm.add('tpl-lp-simple', {
    label: 'LP Simple',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="8" rx="2" fill="#1e1b4b"/><rect x="7" y="3" width="12" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="21" y="3" width="6" height="2" rx="1" fill="#818cf8"/><rect x="2" y="11" width="28" height="12" rx="2" fill="#312e81"/><rect x="8" y="14" width="16" height="3" rx="1.5" fill="#fff"/><rect x="10" y="19" width="12" height="2" rx="1" fill="#818cf8" opacity=".7"/><rect x="2" y="25" width="28" height="10" rx="2" fill="#f0f4ff"/><rect x="5" y="27.5" width="8" height="5" rx="2" fill="#e0e7ff"/><rect x="15" y="27.5" width="8" height="5" rx="2" fill="#e0e7ff"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- NAVBAR -->
<nav style="width:100%;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 6px rgba(0,0,0,0.05);position:sticky;top:0;z-index:100;box-sizing:border-box;">
  <div style="max-width:1100px;margin:0 auto;padding:0 24px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
    <span style="font-size:20px;font-weight:800;color:#0f172a;${F}">Brand Name</span>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <a href="#features" style="font-size:14px;font-weight:500;color:#475569;text-decoration:none;padding:6px 12px;border-radius:8px;${F}">Features</a>
      <a href="#pricing" style="font-size:14px;font-weight:500;color:#475569;text-decoration:none;padding:6px 12px;border-radius:8px;${F}">Pricing</a>
      <a href="#signup" style="padding:9px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:9px;font-size:14px;font-weight:700;${F}">Try for free</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section style="background:linear-gradient(160deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%);padding:96px 24px 80px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -10%,rgba(255,255,255,0.12) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:relative;max-width:660px;margin:0 auto;">
    ${BADGE('🚀 New version launched — Sign up today')}
    <h1 style="font-size:clamp(30px,6vw,52px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 20px;color:#fff;${F}">Your Main Headline<br/>Short and Impactful</h1>
    <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.8);line-height:1.75;margin:0 0 40px;${F}">Describe your core benefit in 1–2 sentences. Focus on the outcome customers get, not the features.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a id="signup" href="#" style="padding:15px 36px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 20px rgba(0,0,0,0.2);${F}">Get started free</a>
      <a href="#" style="padding:15px 28px;border:2px solid rgba(255,255,255,0.4);color:#fff;text-decoration:none;border-radius:11px;font-size:15px;font-weight:600;${F}">Watch demo →</a>
    </div>
    <p style="font-size:12px;color:rgba(255,255,255,0.45);margin:18px 0 0;${F}">No credit card required · Free 14 days · Cancel anytime</p>
  </div>
</section>

<!-- FEATURES -->
<section id="features" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Features</span>
      <h2 style="font-size:clamp(24px,4vw,34px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Why choose us?</h2>
      <p style="font-size:16px;color:#64748b;max-width:480px;margin:0 auto;line-height:1.7;${F}">Features designed to help you get results faster</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      ${FEATURE_CARD('⚡','Fast','Save hours of manual work every week with smart automation.','#4f46e5')}
      ${FEATURE_CARD('🎯','Accurate','Results optimized from real data, not guesswork.','#7c3aed')}
      ${FEATURE_CARD('🔒','Secure','Enterprise-grade security — your data is always fully protected.','#059669')}
    </div>
  </div>
</section>

<!-- SOCIAL PROOF -->
<section style="padding:56px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:880px;margin:0 auto;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
    ${[['10,000+','Happy customers','#4f46e5','#f0f4ff','#c7d2fe'],['98%','Satisfaction rate','#7c3aed','#fdf4ff','#e9d5ff'],['3×','Productivity boost','#059669','#f0fdf4','#a7f3d0']].map(([n,l,c,bg,b])=>
      `<div style="flex:1;min-width:160px;text-align:center;padding:28px 20px;border-radius:18px;background:${bg};border:1.5px solid ${b};">
        <div style="font-size:clamp(28px,5vw,40px);font-weight:800;color:${c};line-height:1;margin-bottom:8px;${F}">${n}</div>
        <div style="font-size:14px;font-weight:600;color:#475569;${F}">${l}</div>
      </div>`).join('')}
  </div>
</section>

<!-- FINAL CTA -->
<section style="background:linear-gradient(135deg,#312e81 0%,#4c1d95 100%);padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 110%,rgba(167,139,250,0.3) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:relative;max-width:560px;margin:0 auto;">
    <h2 style="font-size:clamp(26px,5vw,38px);font-weight:800;margin:0 0 14px;line-height:1.2;${F}">Ready to get started?</h2>
    <p style="font-size:17px;color:rgba(255,255,255,0.8);margin:0 0 36px;line-height:1.7;${F}">Join thousands of customers already using our product successfully</p>
    <a href="#" style="display:inline-block;padding:16px 44px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 20px rgba(0,0,0,0.2);${F}">Sign up for free now</a>
  </div>
</section>

</div>`,
  })

  // ── LP 2: Product / Service ───────────────────────────────────────────────
  bm.add('tpl-lp-product', {
    label: 'LP Product & Service',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="8" rx="2" fill="#0f172a"/><rect x="2" y="11" width="28" height="9" rx="2" fill="#312e81"/><rect x="5" y="13" width="10" height="5" rx="2" fill="#4f46e5" opacity=".5"/><rect x="17" y="14" width="10" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="17" y="17" width="7" height="1.5" rx=".75" fill="#818cf8"/><rect x="2" y="22" width="28" height="8" rx="2" fill="#f8fafc"/><rect x="4" y="24" width="7" height="4" rx="1.5" fill="#e0e7ff"/><rect x="13" y="24" width="7" height="4" rx="1.5" fill="#ede9fe"/><rect x="22" y="24" width="7" height="4" rx="1.5" fill="#ddd6fe"/><rect x="2" y="32" width="28" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO split: text left / image right -->
<section style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);padding:80px 24px;width:100%;box-sizing:border-box;">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:48px;">
    <div style="flex:1;min-width:280px;color:#fff;">
      ${BADGE('✨ The #1 solution for modern businesses')}
      <h1 style="font-size:clamp(28px,5vw,46px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 18px;color:#fff;${F}">Product Name —<br/>The Complete Solution</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 32px;max-width:460px;${F}">Clearly describe what your product/service delivers and what problem it solves for your target customer.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;">
        <a href="#" style="padding:14px 32px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Try it now</a>
        <a href="#" style="padding:14px 24px;border:1.5px solid rgba(255,255,255,0.35);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Learn more</a>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        ${['✅ Free 14 days','✅ No credit card','✅ Cancel anytime'].map(t=>`<span style="font-size:13px;color:rgba(255,255,255,0.65);${F}">${t}</span>`).join('')}
      </div>
    </div>
    <div style="flex:1;min-width:280px;">
      <img src="https://placehold.co/520x380/4f46e5/ffffff?text=Product+Image" alt="Product" style="width:100%;border-radius:18px;box-shadow:0 24px 60px rgba(0,0,0,0.35);display:block;"/>
    </div>
  </div>
</section>

<!-- LOGO CLOUD -->
<div style="padding:32px 24px;background:#fff;border-bottom:1px solid #f1f5f9;">
  <p style="text-align:center;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 20px;${F}">Trusted by over 10,000 businesses</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:24px 36px;max-width:900px;margin:0 auto;">
    ${['BRAND A','BRAND B','BRAND C','BRAND D','BRAND E'].map(b=>`<div style="padding:8px 18px;background:#f1f5f9;border-radius:8px;font-size:13px;font-weight:800;color:#64748b;letter-spacing:-0.01em;${F}">${b}</div>`).join('')}
  </div>
</div>

<!-- FEATURES detailed 2 columns -->
<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Key Features</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Everything you need in one place</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
      ${[['⚡','Smart Automation','Cut 80% of manual work with personalized automated workflows.'],['📊','Real-time Reporting','Visual dashboard showing all key metrics — no waiting until end of month.'],['🔗','Easy Integrations','Connect with 50+ popular tools in just a few clicks, no coding needed.'],['🛡️','Enterprise Security','End-to-end encryption, GDPR compliant, auto backup every 6h — always safe.']].map(([icon,title,desc])=>
        `<div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,0.04),0 6px 20px rgba(79,70,229,0.07);">
          <div style="font-size:28px;margin-bottom:14px;">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px;${F}">${title}</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- 4-STEP PROCESS -->
<section style="padding:80px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:960px;margin:0 auto;text-align:center;">
    <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Process</span>
    <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 48px;${F}">Get started in just 4 steps</h2>
    <div style="display:flex;flex-wrap:wrap;gap:0;">
      ${STEP_ITEM(1,'Create an account','Set up your free account in 30 seconds','linear-gradient(135deg,#4f46e5,#7c3aed)','0 6px 18px rgba(79,70,229,0.35)')}
      ${STEP_ITEM(2,'Configure','Set it up to match your needs','linear-gradient(135deg,#7c3aed,#9333ea)','0 6px 18px rgba(124,58,237,0.35)')}
      ${STEP_ITEM(3,'Integrate','Connect with your existing tools','linear-gradient(135deg,#9333ea,#db2777)','0 6px 18px rgba(147,51,234,0.35)')}
      ${STEP_ITEM(4,'Enjoy','Get results right away','linear-gradient(135deg,#db2777,#f59e0b)','0 6px 18px rgba(219,39,119,0.3)')}
    </div>
  </div>
</section>

<!-- TESTIMONIAL -->
<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">What our customers say</h2>
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      ${[['J','James Miller','CEO, ABC Corp','This product completely changed how we operate. We save 20 hours every week!','#4f46e5'],['S','Sarah Johnson','Marketing Manager','Easy to use, clear results. This is the tool I\'ve always been looking for.','#7c3aed'],['T','Tom Anderson','Founder, StartupXYZ','Excellent support, full-featured. Absolutely worth the price.','#059669']].map(([letter,name,title,quote,color])=>
        `<div style="flex:1;min-width:260px;background:#fff;border-radius:18px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 28px rgba(79,70,229,0.07);">
          <div style="display:flex;gap:4px;margin-bottom:14px;"><span style="color:#f59e0b;font-size:16px;">★★★★★</span></div>
          <p style="font-size:15px;font-style:italic;color:#334155;line-height:1.75;margin:0 0 20px;${F}">"${quote}"</p>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:17px;color:#fff;flex-shrink:0;">${letter}</div>
            <div><div style="font-weight:700;font-size:14px;color:#0f172a;${F}">${name}</div><div style="font-size:12px;color:#94a3b8;${F}">${title}</div></div>
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:72px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h2 style="font-size:clamp(24px,5vw,38px);font-weight:800;margin:0 0 14px;line-height:1.2;${F}">Start your free trial today</h2>
  <p style="font-size:17px;color:rgba(255,255,255,0.8);margin:0 0 36px;${F}">No credit card required. Cancel anytime.</p>
  <a href="#" style="display:inline-block;padding:16px 48px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 24px rgba(0,0,0,0.2);${F}">Sign up for free</a>
</section>

</div>`,
  })

  // ── LP 3: Email capture / Lead gen ────────────────────────────────────────
  bm.add('tpl-lp-leadgen', {
    label: 'LP Email Capture',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="14" rx="2" fill="#312e81"/><rect x="7" y="5" width="18" height="3" rx="1.5" fill="#fff"/><rect x="9" y="10" width="14" height="2" rx="1" fill="#818cf8" opacity=".7"/><rect x="2" y="17" width="28" height="10" rx="2" fill="#f0f4ff"/><rect x="4" y="19.5" width="8" height="5" rx="1.5" fill="#e0e7ff"/><rect x="14" y="19.5" width="8" height="5" rx="1.5" fill="#ede9fe"/><rect x="24" y="19.5" width="5" height="5" rx="1.5" fill="#c4b5fd"/><rect x="2" y="29" width="28" height="6" rx="2" fill="#fff" stroke="#e0e7ff" stroke-width="1"/><rect x="4" y="31" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="22" y="31" width="6" height="2" rx="1" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO email capture -->
<section style="background:linear-gradient(160deg,#0f172a 0%,#1e1b4b 100%);padding:100px 24px 80px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;top:5%;right:8%;width:200px;height:200px;background:rgba(167,139,250,0.12);border-radius:50%;filter:blur(52px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:5%;left:5%;width:160px;height:160px;background:rgba(99,102,241,0.15);border-radius:50%;filter:blur(44px);pointer-events:none;"></div>
  <div style="position:relative;max-width:620px;margin:0 auto;">
    <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9999px;font-size:13px;margin-bottom:24px;${F}">
      <span style="width:8px;height:8px;background:#4ade80;border-radius:50%;display:inline-block;animation:pulse 2s infinite;"></span>
      🎁 Free gift — only 48 hours left
    </div>
    <h1 style="font-size:clamp(28px,6vw,48px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 18px;${F}">Get [Resource Name] completely free today</h1>
    <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 40px;${F}">A brief description of the resource's value: what readers will learn, how much time they'll save.</p>
    <!-- FORM -->
    <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:32px;max-width:480px;margin:0 auto;text-align:left;">
      <p style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.6);margin:0 0 20px;text-align:center;letter-spacing:0.04em;${F}">GET IT NOW — COMPLETELY FREE</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input type="text" placeholder="Your full name" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="email" placeholder="Your email (required)" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <button style="width:100%;padding:15px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Get it now — Free 🎁</button>
      </div>
      <p style="font-size:12px;color:rgba(255,255,255,0.4);text-align:center;margin:14px 0 0;${F}">🔒 We never spam. Unsubscribe anytime.</p>
    </div>
  </div>
</section>

<!-- BENEFITS -->
<section style="padding:72px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:880px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">What will you get?</h2>
    <div style="display:flex;flex-wrap:wrap;gap:16px;">
      ${[['📚','In-depth Knowledge','Condensed from hundreds of hours of research and real-world practice — learn it in 30 minutes.'],['🛠','Practical Tools','Ready-to-use templates, checklists and frameworks — apply immediately, no customization needed.'],['💡','Exclusive Insights','Little-known tips from top industry experts.'],['⏱','Save Time','Clear results in 7 days — no costly trial and error.']].map(([icon,title,desc])=>
        `<div style="flex:1;min-width:220px;display:flex;gap:14px;padding:20px;background:#f8fafc;border-radius:14px;align-items:flex-start;">
          <div style="font-size:26px;flex-shrink:0;">${icon}</div>
          <div><h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">${title}</h4><p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p></div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- SOCIAL PROOF + CTA repeat -->
<section style="padding:60px 24px;background:#f8fafc;width:100%;box-sizing:border-box;text-align:center;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="display:flex;justify-content:center;gap:4px;margin-bottom:10px;"><span style="color:#f59e0b;font-size:20px;">★★★★★</span></div>
    <p style="font-size:14px;color:#64748b;margin:0 0 28px;${F}">Rated 4.9/5 by <strong style="color:#0f172a;">2,400+ people</strong> who downloaded</p>
    <div style="display:flex;flex-direction:column;gap:10px;max-width:400px;margin:0 auto;">
      <input type="email" placeholder="Enter your email..." style="width:100%;padding:14px 18px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
      <button style="width:100%;padding:15px;background:#4f46e5;color:#fff;font-size:15px;font-weight:700;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 12px rgba(79,70,229,0.35);${F}">Get the free resource →</button>
    </div>
  </div>
</section>

</div>`,
  })

  // ═══════════════════════════════════════════════════════════════════════════
  //  ADS TEMPLATES
  // ═══════════════════════════════════════════════════════════════════════════

  // ── LP 4: Webinar / Event ─────────────────────────────────────────────────
  bm.add('tpl-lp-webinar', {
    label: 'LP Webinar / Event',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="2" y="1" width="28" height="11" rx="3" fill="#0f172a"/><rect x="6" y="4" width="14" height="2.5" rx="1.25" fill="#fff"/><rect x="6" y="8" width="9" height="1.5" rx=".75" fill="#818cf8"/><rect x="22" y="5" width="5" height="4" rx="1" fill="#ef4444"/><rect x="4" y="14" width="24" height="6" rx="2" fill="#ede9fe"/><rect x="6" y="22" width="8" height="6" rx="1.5" fill="#e0e7ff"/><rect x="16" y="22" width="8" height="6" rx="1.5" fill="#e0e7ff"/><rect x="6" y="30" width="20" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO Webinar -->
<section style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#2d1b69 100%);padding:80px 24px;color:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:1050px;margin:0 auto;display:flex;flex-wrap:wrap;gap:48px;align-items:center;">
    <!-- Left: info -->
    <div style="flex:1;min-width:280px;">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:#ef4444;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:20px;${F}">
        🔴 LIVE · Free registration
      </div>
      <h1 style="font-size:clamp(26px,5vw,42px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 16px;${F}">Webinar Title:<br/>Compelling and Specific Topic</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 28px;${F}">Brief description of webinar content — what you'll learn, why you should join and the value you'll get.</p>
      <!-- Date / location -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
        ${[['📅','Saturday, Feb 15 2025'],['🕐','7:00 PM – 9:00 PM (Your local time)'],['🌐','Zoom — Link sent via email after registration']].map(([icon,text])=>
          `<div style="display:flex;align-items:center;gap:10px;font-size:15px;color:rgba(255,255,255,0.85);${F}"><span style="font-size:18px;">${icon}</span>${text}</div>`).join('')}
      </div>
      <!-- Speakers -->
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        ${[['A','Alex Johnson','SEO Expert','#4f46e5'],['B','Beth Williams','Content Strategist','#7c3aed']].map(([letter,name,title,color])=>
          `<div style="display:flex;align-items:center;gap:10px;">
            <div style="width:46px;height:46px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:18px;border:2px solid rgba(255,255,255,0.3);">${letter}</div>
            <div><div style="font-size:14px;font-weight:700;color:#fff;${F}">${name}</div><div style="font-size:12px;color:rgba(255,255,255,0.55);${F}">${title}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <!-- Right: registration form -->
    <div style="flex-shrink:0;width:100%;max-width:360px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:32px;box-sizing:border-box;">
      <p style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 6px;${F}">Register to attend</p>
      <p style="font-size:18px;font-weight:800;color:#fff;text-align:center;margin:0 0 6px;${F}">100% Free</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 22px;${F}">Only <strong style="color:#fbbf24;">47 spots</strong> left — register before it's full!</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input type="text" placeholder="Full name" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="email" placeholder="Your email" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="tel" placeholder="Phone number (optional)" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <button style="width:100%;padding:15px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Register now — Free</button>
      </div>
      <p style="font-size:12px;color:rgba(255,255,255,0.35);text-align:center;margin:12px 0 0;${F}">Confirmed by email · No spam</p>
    </div>
  </div>
</section>

<!-- WHAT YOU'LL LEARN -->
<section style="padding:72px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">What will you learn in this session?</h2>
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${[['01','Part 1: Core Fundamentals','Master the essential concepts that 90% of learners skip — this is the foundation that makes everything else work.'],['02','Part 2: Practical Strategy','A proven proprietary framework tested across [X] real projects — not just theory.'],['03','Part 3: Case Studies & Demo','Walk through 3 specific case studies and a live demo so you can see exactly what results are possible.'],['04','Part 4: Live Q&A','Ask questions and get personalized advice from the expert right in the session.']].map(([num,title,desc])=>
        `<div style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:#f8fafc;border-radius:14px;border-left:4px solid #4f46e5;">
          <span style="font-size:22px;font-weight:900;color:#4f46e5;flex-shrink:0;min-width:32px;${F}">${num}</span>
          <div><h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 5px;${F}">${title}</h3><p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p></div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- SPEAKERS -->
<section style="padding:64px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:880px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 40px;${F}">Speakers</h2>
    <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">
      ${[['A','Alex Johnson','CEO at ABC Corp · 10 years experience','Leading expert in [field], author of [book title], has trained over 5,000 students.','#4f46e5'],['B','Beth Williams','Head of Marketing at XYZ Corp','Built breakthrough marketing campaigns for 50+ major brands across the US and internationally.','#7c3aed']].map(([letter,name,role,bio,color])=>
        `<div style="flex:1;min-width:280px;max-width:380px;background:#fff;border-radius:20px;padding:28px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 28px rgba(79,70,229,0.08);">
          <div style="width:80px;height:80px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;color:#fff;margin:0 auto 14px;">${letter}</div>
          <h3 style="font-size:17px;font-weight:800;color:#0f172a;margin:0 0 4px;${F}">${name}</h3>
          <p style="font-size:13px;font-weight:600;color:#4f46e5;margin:0 0 12px;${F}">${role}</p>
          <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${bio}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:64px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h2 style="font-size:clamp(22px,4vw,34px);font-weight:800;margin:0 0 12px;${F}">Don't miss out — Only <span style="color:#fde68a;">47 spots</span> remaining</h2>
  <p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 32px;${F}">Webinar on Saturday, Feb 15 2025 at 7:00 PM</p>
  <a href="#" style="display:inline-block;padding:16px 48px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 24px rgba(0,0,0,0.2);${F}">Register for free now →</a>
</section>

</div>`,
  })

  // ── LP 5: SaaS with 3-tier pricing ───────────────────────────────────────
  bm.add('tpl-lp-saas', {
    label: 'LP SaaS + Pricing',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="10" rx="2" fill="#1e1b4b"/><rect x="6" y="4" width="16" height="2.5" rx="1.25" fill="#fff"/><rect x="6" y="8" width="10" height="1.5" rx=".75" fill="#818cf8"/><rect x="2" y="13" width="28" height="8" rx="2" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1"/><rect x="4" y="15" width="7" height="4" rx="1" fill="#e0e7ff"/><rect x="13" y="15" width="7" height="4" rx="1" fill="#ede9fe"/><rect x="22" y="15" width="7" height="4" rx="1" fill="#c7d2fe"/><rect x="2" y="23" width="8" height="12" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/><rect x="12" y="21" width="8" height="14" rx="2" fill="#4f46e5"/><rect x="22" y="23" width="8" height="12" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/><rect x="14" y="28" width="4" height="2" rx="1" fill="#fff"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO -->
<section style="background:linear-gradient(160deg,#0f172a,#1e1b4b);padding:88px 24px 72px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  ${BADGE('🚀 The SaaS platform for modern teams')}
  <h1 style="font-size:clamp(28px,6vw,50px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 18px;${F}">Grow faster<br/>with <span style="color:#818cf8;">[Product Name]</span></h1>
  <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.75);max-width:540px;margin:0 auto 36px;line-height:1.75;${F}">The all-in-one platform that helps your team [do X], [achieve Y] and [avoid Z] — all in a single dashboard.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
    <a href="#pricing" style="padding:14px 36px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">View pricing</a>
    <a href="#" style="padding:14px 28px;border:1.5px solid rgba(255,255,255,0.3);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Try for free</a>
  </div>
  <p style="font-size:13px;color:rgba(255,255,255,0.4);${F}">No credit card required · Free 14 days</p>
</section>

<!-- FEATURES horizontal -->
<div style="background:#fff;padding:40px 24px;border-bottom:1px solid #f1f5f9;">
  <div style="max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:28px;justify-content:center;">
    ${[['⚡ 10× Faster','Than manual processes'],['📈 Positive ROI','Within the first 30 days'],['🔗 50+ Integrations','No code required'],['🛡️ 99.9% Uptime','Guaranteed SLA']].map(([title,sub])=>
      `<div style="text-align:center;min-width:150px;">
        <div style="font-size:15px;font-weight:800;color:#0f172a;margin-bottom:4px;${F}">${title}</div>
        <div style="font-size:13px;color:#94a3b8;${F}">${sub}</div>
      </div>`).join('')}
  </div>
</div>

<!-- PRICING TABLE -->
<section id="pricing" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:1000px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Pricing</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 10px;${F}">Simple, transparent, no hidden fees</h2>
      <p style="font-size:15px;color:#64748b;${F}">All plans include a 14-day free trial</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;">
      ${[
        {name:'Starter',price:'$9',unit:'/ month',color:'#475569',bg:'#fff',border:'#e2e8f0',btnBg:'#f1f5f9',btnColor:'#0f172a',highlight:false,features:['3 users','10 projects','5GB storage','Basic integrations','Email support']},
        {name:'Pro',price:'$29',unit:'/ month',color:'#4f46e5',bg:'linear-gradient(180deg,#4f46e5 0%,#3730a3 100%)',border:'transparent',btnBg:'#fff',btnColor:'#4f46e5',highlight:true,features:['15 users','Unlimited projects','50GB storage','All integrations','Priority support 24/7','Advanced reporting']},
        {name:'Enterprise',price:'Contact us',unit:'',color:'#0f172a',bg:'#fff',border:'#e2e8f0',btnBg:'#0f172a',btnColor:'#fff',highlight:false,features:['Unlimited','SSO & SAML','Custom SLA','Dedicated onboarding','Dedicated support','Custom contract']},
      ].map(p=>
        `<div style="flex:1;min-width:240px;background:${p.bg};border-radius:20px;border:2px solid ${p.border};padding:32px;box-sizing:border-box;position:relative;${p.highlight?'box-shadow:0 12px 40px rgba(79,70,229,0.3);transform:scale(1.03);':'' }">
          ${p.highlight?`<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 18px;background:#fbbf24;color:#0f172a;font-size:12px;font-weight:800;border-radius:9999px;white-space:nowrap;${F}">⭐ Most Popular</div>`:''}
          <p style="font-size:14px;font-weight:700;color:${p.highlight?'rgba(255,255,255,0.7)':'#64748b'};margin:0 0 10px;${F}">${p.name}</p>
          <div style="margin-bottom:22px;"><span style="font-size:clamp(26px,5vw,36px);font-weight:900;color:${p.highlight?'#fff':p.color};${F}">${p.price}</span><span style="font-size:13px;color:${p.highlight?'rgba(255,255,255,0.55)':'#94a3b8'};${F}">${p.unit}</span></div>
          <a href="#" style="display:block;text-align:center;padding:12px;background:${p.btnBg};color:${p.btnColor};text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin-bottom:22px;${F}">Get started</a>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
            ${p.features.map(f=>`<li style="font-size:14px;color:${p.highlight?'rgba(255,255,255,0.85)':'#475569'};display:flex;align-items:center;gap:8px;${F}"><span style="color:${p.highlight?'#86efac':'#4f46e5'};font-weight:700;font-size:13px;">✓</span>${f}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
    <p style="text-align:center;font-size:14px;color:#94a3b8;margin-top:28px;${F}">All prices include tax · Pay by card, PayPal, or bank transfer</p>
  </div>
</section>

<!-- FAQ -->
<section style="padding:64px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:720px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 40px;${F}">Frequently Asked Questions</h2>
    ${[['Can I change plans at any time?','Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and any price difference is prorated.'],['If I\'m not satisfied, can I get a refund?','Yes, we offer a 100% money-back guarantee within the first 30 days — no questions asked.'],['Is my data secure?','Data is encrypted with AES-256, stored on servers in the US and EU, and automatically backed up every 6 hours.']].map(([q,a])=>
      `<details style="border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:10px;cursor:pointer;">
        <summary style="font-size:15px;font-weight:700;color:#0f172a;list-style:none;${F}">${q}</summary>
        <p style="font-size:14px;color:#64748b;line-height:1.7;margin:12px 0 0;${F}">${a}</p>
      </details>`).join('')}
  </div>
</section>

</div>`,
  })

  // ── LP 6: Agency / Professional Services ──────────────────────────────────
  bm.add('tpl-lp-agency', {
    label: 'LP Agency / Services',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="2" y="1" width="28" height="12" rx="3" fill="#0f172a"/><circle cx="10" cy="7" r="4" fill="#4f46e5" opacity=".7"/><rect x="16" y="4" width="11" height="2.5" rx="1.25" fill="#fff"/><rect x="16" y="8" width="7" height="1.5" rx=".75" fill="#818cf8"/><rect x="4" y="15" width="6" height="6" rx="1.5" fill="#e0e7ff"/><rect x="12" y="15" width="6" height="6" rx="1.5" fill="#ede9fe"/><rect x="20" y="15" width="6" height="6" rx="1.5" fill="#ddd6fe"/><rect x="4" y="23" width="24" height="2" rx="1" fill="#f1f5f9"/><rect x="4" y="27" width="24" height="5" rx="1.5" fill="#4f46e5" opacity=".15"/><rect x="10" y="28.5" width="12" height="2" rx="1" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO Agency -->
<section style="background:#0f172a;padding:88px 24px;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 20% 50%,rgba(79,70,229,0.25) 0%,transparent 55%),radial-gradient(ellipse at 80% 50%,rgba(124,58,237,0.2) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="max-width:1050px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:48px;position:relative;">
    <div style="flex:1;min-width:280px;color:#fff;">
      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(79,70,229,0.2);border:1px solid rgba(79,70,229,0.4);border-radius:9999px;font-size:13px;font-weight:600;margin-bottom:20px;${F}">
        ✦ Professional Agency — Real Results
      </div>
      <h1 style="font-size:clamp(28px,5vw,46px);font-weight:800;letter-spacing:-0.025em;line-height:1.18;margin:0 0 18px;${F}">We build<br/><span style="background:linear-gradient(90deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">digital brands</span><br/>for your business</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.7);line-height:1.75;margin:0 0 32px;max-width:480px;${F}">From strategy to execution — we partner with businesses on their digital growth journey with a team of experts with 10+ years of experience.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px;">
        <a href="#services" style="padding:14px 32px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.45);${F}">View services</a>
        <a href="#contact" style="padding:14px 24px;border:1.5px solid rgba(255,255,255,0.25);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Contact us</a>
      </div>
      <div style="display:flex;gap:28px;flex-wrap:wrap;">
        ${[['200+','Projects completed'],['98%','Client satisfaction'],['10+','Years of experience']].map(([n,l])=>
          `<div><div style="font-size:26px;font-weight:800;color:#fff;${F}">${n}</div><div style="font-size:13px;color:rgba(255,255,255,0.5);${F}">${l}</div></div>`).join('')}
      </div>
    </div>
    <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:14px;">
      ${[['🎨','Brand Identity','Logo, colors, and full brand identity kit'],['📱','Social Media','Multi-platform content and advertising'],['🌐','Website','High-performance web design and development'],['📊','Analytics','Tracking, reporting and continuous optimization']].map(([icon,title,desc])=>
        `<div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:20px;">
          <div style="font-size:24px;margin-bottom:10px;">${icon}</div>
          <h3 style="font-size:14px;font-weight:700;color:#fff;margin:0 0 6px;${F}">${title}</h3>
          <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0;line-height:1.6;${F}">${desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Services</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0;${F}">Comprehensive solutions for every need</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:24px;">
      ${[['Marketing & Advertising','Facebook, Google, TikTok ad campaigns optimized for ROAS. Full management from strategy to execution.','🎯','From $299 / month',['Facebook & Instagram Ads','Google Search & Display','TikTok Ads','Email Marketing']],['SEO & Content Marketing','Long-term search optimization, building authority and sustainable organic traffic.','📈','From $199 / month',['Keyword Research','On-page & Technical SEO','Content Calendar','Link Building']],['Website Design','Professional, high-speed, conversion-optimized websites — delivered in 2–4 weeks.','💻','From $999 / project',['UI/UX Design','Next.js / WordPress','Mobile-first','SEO-ready']]].map(([title,desc,icon,price,features])=>
        `<div style="background:#fff;border-radius:20px;padding:28px 32px;display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;box-shadow:0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(79,70,229,0.07);">
          <div style="font-size:36px;">${icon}</div>
          <div style="flex:1;min-width:200px;">
            <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:8px;">
              <h3 style="font-size:18px;font-weight:800;color:#0f172a;margin:0;${F}">${title}</h3>
              <span style="font-size:14px;font-weight:700;color:#4f46e5;${F}">${price}</span>
            </div>
            <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0 0 14px;${F}">${desc}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${(features as string[]).map((f:string)=>`<span style="padding:4px 12px;background:#f0f4ff;color:#4338ca;font-size:12px;font-weight:600;border-radius:9999px;${F}">${f}</span>`).join('')}
            </div>
          </div>
          <a href="#contact" style="flex-shrink:0;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;align-self:center;${F}">Learn more</a>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" style="padding:80px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:680px;margin:0 auto;text-align:center;">
    <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Start with a free consultation</h2>
    <p style="font-size:16px;color:#64748b;margin:0 0 36px;line-height:1.7;${F}">Fill out the form below — our team will get back to you within 24 business hours</p>
    <div style="background:#f8fafc;border-radius:20px;padding:36px;text-align:left;">
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <input type="text" placeholder="Full name *" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
          <input type="tel" placeholder="Phone number *" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        </div>
        <input type="email" placeholder="Work email *" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        <input type="text" placeholder="Company name / website" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        <textarea placeholder="Briefly describe your needs..." style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;min-height:110px;resize:vertical;box-sizing:border-box;${F}"></textarea>
        <button style="width:100%;padding:16px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:11px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.4);${F}">Send consultation request →</button>
      </div>
      <p style="font-size:12px;color:#94a3b8;text-align:center;margin:14px 0 0;${F}">Response within 24h · Consultation is completely free · No commitment</p>
    </div>
  </div>
</section>

</div>`,
  })

  // ── Ads 1: Announcement banner ────────────────────────────────────────────
  bm.add('tpl-ad-announcement', {
    label: 'Announcement Banner',
    category: ADS,
    media: `<svg viewBox="0 0 32 12" fill="none"><rect x="1" y="1" width="30" height="10" rx="2" fill="#4f46e5"/><rect x="5" y="4" width="12" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="19" y="3.5" width="8" height="3" rx="1.5" fill="#fff" opacity=".3"/></svg>`,
    content: `<div style="background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 100%);padding:12px 20px;width:100%;box-sizing:border-box;${F}">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;max-width:900px;margin:0 auto;">
    <span style="font-size:14px;color:#fff;font-weight:500;text-align:center;${F}">🎉 Special offer — <strong style="color:#fde68a;">30% off</strong> all products. Ends <strong style="color:#fde68a;">Dec 31, 2025</strong></span>
    <a href="#" style="padding:6px 18px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:700;white-space:nowrap;${F}">Shop now →</a>
    <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;line-height:1;padding:0 0 0 4px;">×</button>
  </div>
</div>`,
  })

  // ── Ads 2: Promo banner ───────────────────────────────────────────────────
  bm.add('tpl-ad-banner', {
    label: 'Promo Banner',
    category: ADS,
    media: `<svg viewBox="0 0 32 16" fill="none"><rect x="1" y="1" width="30" height="14" rx="2.5" fill="#0f172a"/><circle cx="8" cy="8" r="4.5" fill="#4f46e5" opacity=".8"/><rect x="15" y="4" width="12" height="3" rx="1.5" fill="#fff"/><rect x="15" y="9" width="8" height="2" rx="1" fill="#818cf8" opacity=".7"/></svg>`,
    content: `<div style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);border-radius:20px;padding:40px 36px;display:flex;flex-wrap:wrap;align-items:center;gap:32px;overflow:hidden;position:relative;${F}">
  <div style="position:absolute;top:-20px;right:-20px;width:180px;height:180px;background:rgba(99,102,241,0.2);border-radius:50%;pointer-events:none;"></div>
  <div style="position:absolute;bottom:-30px;left:30%;width:140px;height:140px;background:rgba(167,139,250,0.15);border-radius:50%;pointer-events:none;"></div>
  <!-- Discount badge -->
  <div style="position:relative;flex-shrink:0;text-align:center;">
    <div style="width:110px;height:110px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(239,68,68,0.45);">
      <span style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:0.06em;${F}">SAVE</span>
      <span style="font-size:38px;font-weight:900;color:#fff;line-height:1;${F}">50%</span>
    </div>
  </div>
  <!-- Main content -->
  <div style="flex:1;min-width:220px;position:relative;">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#818cf8;margin:0 0 8px;${F}">Flash Sale · Today only</p>
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#fff;margin:0 0 10px;line-height:1.2;${F}">Product / Service Name</h2>
    <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 20px;line-height:1.6;${F}">Short offer description. State the value clearly and why they must act today.</p>
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <a href="#" style="padding:12px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 14px rgba(79,70,229,0.5);${F}">Claim offer now</a>
      <div>
        <span style="font-size:22px;font-weight:800;color:#fff;${F}">$9.99</span>
        <span style="font-size:14px;color:rgba(255,255,255,0.4);text-decoration:line-through;margin-left:8px;${F}">$19.99</span>
      </div>
    </div>
  </div>
  <!-- Countdown -->
  <div style="flex-shrink:0;position:relative;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 10px;${F}">Ends in</p>
    <div style="display:flex;gap:8px;">
      ${[['02','Hours'],['45','Mins'],['30','Secs']].map(([n,l])=>
        `<div style="text-align:center;"><div style="width:52px;height:52px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;${F}">${n}</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:5px;${F}">${l}</div></div>`).join('')}
    </div>
  </div>
</div>`,
  })

  // ── Ads 3: Social / Facebook Ad card ─────────────────────────────────────
  bm.add('tpl-ad-social', {
    label: 'Social / Facebook Ad',
    category: ADS,
    media: `<svg viewBox="0 0 28 32" fill="none"><rect x="1" y="1" width="26" height="30" rx="3" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/><rect x="1" y="1" width="26" height="13" rx="3" fill="#4f46e5"/><rect x="1" y="11" width="26" height="3" fill="#4f46e5"/><rect x="4" y="16" width="8" height="2" rx="1" fill="#334155"/><rect x="4" y="20" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="4" y="24" width="13" height="2" rx="1" fill="#94a3b8"/><rect x="4" y="27" width="8" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="max-width:500px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);${F}">
  <!-- Ad image -->
  <div style="position:relative;">
    <img src="https://placehold.co/500x280/312e81/ffffff?text=Ad+Image" alt="" style="width:100%;height:280px;object-fit:cover;display:block;"/>
    <div style="position:absolute;top:12px;left:12px;padding:5px 12px;background:rgba(0,0,0,0.6);border-radius:9999px;backdrop-filter:blur(6px);">
      <span style="font-size:12px;font-weight:700;color:#fff;${F}">Sponsored</span>
    </div>
    <div style="position:absolute;bottom:12px;left:12px;right:12px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:10px;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:14px;font-weight:800;color:#fff;${F}">🔥 50% Off — Today only!</span>
      <span style="font-size:14px;color:rgba(255,255,255,0.8);${F}">→</span>
    </div>
  </div>
  <!-- Content below -->
  <div style="padding:16px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div style="width:36px;height:36px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:14px;flex-shrink:0;">B</div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#0f172a;${F}">Brand Name</div>
        <div style="font-size:12px;color:#94a3b8;${F}">Sponsored post</div>
      </div>
    </div>
    <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">Compelling headline — Spark curiosity right away</h3>
    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 14px;${F}">Short description of your product/service. Focus on a specific benefit and why customers need to act now.</p>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
      <div>
        <span style="font-size:20px;font-weight:800;color:#4f46e5;${F}">$9.99</span>
        <span style="font-size:13px;color:#94a3b8;text-decoration:line-through;margin-left:6px;${F}">$19.99</span>
      </div>
      <a href="#" style="padding:10px 22px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:9px;font-size:14px;font-weight:700;${F}">Buy now</a>
    </div>
  </div>
</div>`,
  })

  // ── Ads 4: Offer popup ────────────────────────────────────────────────────
  bm.add('tpl-ad-popup', {
    label: 'Offer Popup',
    category: ADS,
    media: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="3" fill="#fff" stroke="#4f46e5" stroke-width="1.5"/><rect x="4" y="4" width="24" height="8" rx="3" fill="#4f46e5"/><rect x="4" y="10" width="24" height="2" fill="#4f46e5"/><rect x="8" y="16" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="10" y="20" width="12" height="3" rx="1.5" fill="#4f46e5"/><rect x="25" y="4" width="4" height="4" rx="1" fill="#ef4444"/><line x1="26.5" y1="5.5" x2="27.5" y2="6.5" stroke="#fff" stroke-width="1.2"/><line x1="26.5" y1="6.5" x2="27.5" y2="5.5" stroke="#fff" stroke-width="1.2"/></svg>`,
    content: `<div style="position:relative;max-width:480px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.25);${F}">
  <!-- Close button -->
  <button onclick="this.parentElement.style.display='none'" style="position:absolute;top:12px;right:12px;z-index:10;width:30px;height:30px;background:rgba(255,255,255,0.25);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;backdrop-filter:blur(4px);">×</button>
  <!-- Gradient header -->
  <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:36px 32px 28px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;background:rgba(255,255,255,0.1);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-30px;left:-10px;width:100px;height:100px;background:rgba(167,139,250,0.2);border-radius:50%;"></div>
    <div style="position:relative;">
      <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 14px;">🎁</div>
      <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin:0 0 8px;${F}">Special offer just for you</p>
      <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.2;${F}">Save 30% right now<br/>Only valid for 10 minutes!</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.7);margin:0;${F}">For first-time customers only</p>
    </div>
  </div>
  <!-- Body -->
  <div style="padding:28px 32px;">
    <ul style="list-style:none;padding:0;margin:0 0 24px;">
      ${TICK_ITEM('Valid on all products in the store')}
      ${TICK_ITEM('No minimum order value required')}
      ${TICK_ITEM('Stackable with member discounts')}
    </ul>
    <!-- Coupon code -->
    <div style="background:#f8fafc;border:2px dashed #c4b5fd;border-radius:12px;padding:16px;text-align:center;margin-bottom:20px;">
      <p style="font-size:12px;color:#64748b;margin:0 0 8px;font-weight:600;${F}">Use discount code</p>
      <p style="font-size:24px;font-weight:900;color:#4f46e5;letter-spacing:0.12em;margin:0;${F}">SAVE30</p>
    </div>
    <!-- Email form -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <input type="email" placeholder="Enter email to receive code..." style="flex:1;min-width:180px;padding:12px 14px;border-radius:9px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
      <button style="padding:12px 20px;background:#4f46e5;color:#fff;font-size:14px;font-weight:700;border:none;border-radius:9px;cursor:pointer;white-space:nowrap;${F}">Get code</button>
    </div>
    <p style="font-size:12px;color:#94a3b8;text-align:center;margin:12px 0 0;${F}">🔒 No spam · Fully secure</p>
  </div>
</div>`,
  })

  // ── Ads 5: Full-page Flash Sale ───────────────────────────────────────────
  bm.add('tpl-ad-flash-full', {
    label: 'Flash Sale Full Page',
    category: ADS,
    media: `<svg viewBox="0 0 32 20" fill="none"><rect x="1" y="1" width="30" height="18" rx="2.5" fill="linear-gradient" /><rect x="1" y="1" width="30" height="18" rx="2.5" fill="#ef4444"/><text x="16" y="13" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">FLASH</text></svg>`,
    content: `<div style="background:linear-gradient(135deg,#7f1d1d 0%,#991b1b 40%,#dc2626 100%);padding:56px 24px;text-align:center;position:relative;overflow:hidden;width:100%;box-sizing:border-box;${F}">
  <!-- Background effects -->
  <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
    <div style="position:absolute;top:-40px;left:-40px;width:200px;height:200px;background:rgba(251,191,36,0.1);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-40px;right:-40px;width:220px;height:220px;background:rgba(251,191,36,0.08);border-radius:50%;"></div>
    <div style="position:absolute;top:20px;right:15%;font-size:60px;opacity:0.08;transform:rotate(15deg);">⚡</div>
    <div style="position:absolute;bottom:10px;left:10%;font-size:50px;opacity:0.06;transform:rotate(-10deg);">🔥</div>
  </div>
  <div style="position:relative;max-width:700px;margin:0 auto;">
    <!-- Badge -->
    <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgba(251,191,36,0.2);border:1.5px solid rgba(251,191,36,0.5);border-radius:9999px;margin-bottom:20px;">
      <span style="width:10px;height:10px;background:#fbbf24;border-radius:50%;display:inline-block;"></span>
      <span style="font-size:13px;font-weight:800;color:#fde68a;letter-spacing:0.08em;text-transform:uppercase;${F}">🔥 Flash Sale · Ends in 2 hours</span>
    </div>
    <!-- Headline -->
    <h2 style="font-size:clamp(32px,7vw,60px);font-weight:900;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin:0 0 8px;${F}">SAVE <span style="color:#fbbf24;">70%</span></h2>
    <p style="font-size:clamp(16px,3vw,22px);font-weight:700;color:rgba(255,255,255,0.9);margin:0 0 24px;${F}">Everything — Today only!</p>
    <!-- Large countdown -->
    <div style="display:inline-flex;gap:12px;background:rgba(0,0,0,0.3);border-radius:16px;padding:16px 24px;margin-bottom:28px;">
      ${[['00','Hours'],['45','Mins'],['30','Secs']].map(([n,l])=>
        `<div style="text-align:center;">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.25);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;color:#fff;${F}">${n}</div>
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;${F}">${l}</div>
        </div>`).join('<div style="font-size:28px;font-weight:900;color:rgba(255,255,255,0.5);display:flex;align-items:center;padding-bottom:18px;">:</div>')}
    </div>
    <!-- Flash products -->
    <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-bottom:28px;">
      ${[['🎁 Pro Plan',['699','1,990'],['#fbbf24','#0f172a']],['⭐ Premium Plan',['1,499','4,990'],['#fff','#0f172a']],['🚀 Team Plan',['2,990','8,990'],['#fbbf24','#0f172a']]].map(([name,[sale,orig],[bg,color]])=>
        `<div style="background:rgba(255,255,255,0.12);border:1.5px solid rgba(255,255,255,0.2);border-radius:14px;padding:16px 20px;text-align:center;min-width:150px;">
          <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:8px;${F}">${name}</div>
          <div style="font-size:24px;font-weight:900;color:#fbbf24;${F}">${sale}K</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);text-decoration:line-through;margin-bottom:10px;${F}">${orig}K</div>
          <a href="#" style="display:block;padding:8px 14px;background:${bg};color:${color};text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;${F}">Buy now</a>
        </div>`).join('')}
    </div>
    <!-- Main CTA -->
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="#" style="padding:16px 44px;background:#fbbf24;color:#0f172a;text-decoration:none;border-radius:11px;font-size:17px;font-weight:900;box-shadow:0 6px 20px rgba(251,191,36,0.4);${F}">🛒 Buy now — Save 70%</a>
      <a href="#" style="padding:16px 24px;border:2px solid rgba(255,255,255,0.3);color:#fff;text-decoration:none;border-radius:11px;font-size:15px;font-weight:600;${F}">View all deals →</a>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:16px 0 0;${F}">⚡ Offer ends when stock runs out · Cannot be combined with other promotions</p>
  </div>
</div>`,
  })

  // ── Ads 6: Flash Sale featured products ──────────────────────────────────
  bm.add('tpl-ad-flash-products', {
    label: 'Flash Sale Products',
    category: ADS,
    media: `<svg viewBox="0 0 32 20" fill="none"><rect x="1" y="1" width="30" height="18" rx="2.5" fill="#f59e0b"/><rect x="2" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="12" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="22" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="3" y="14" width="7" height="2.5" rx="1" fill="#fff"/><rect x="13" y="14" width="7" height="2.5" rx="1" fill="#fff"/><rect x="23" y="14" width="7" height="2.5" rx="1" fill="#fff"/></svg>`,
    content: `<div style="width:100%;box-sizing:border-box;${F}">
  <!-- Flash sale header -->
  <div style="background:linear-gradient(90deg,#f59e0b 0%,#ef4444 100%);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <span style="font-size:20px;">⚡</span>
      <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.01em;${F}">FLASH SALE</span>
      <div style="display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border-radius:9999px;padding:5px 14px;">
        <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);${F}">Ends in:</span>
        ${['01','23','45'].map(n=>`<span style="font-size:16px;font-weight:900;color:#fff;${F}">${n}</span>`).join(`<span style="color:rgba(255,255,255,0.6);font-weight:700;font-size:14px;">:</span>`)}
      </div>
    </div>
    <a href="#" style="padding:8px 20px;background:#fff;color:#ef4444;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:800;${F}">View all →</a>
  </div>
  <!-- Product grid -->
  <div style="background:#fff;padding:24px;display:flex;flex-wrap:wrap;gap:16px;">
    ${[
      ['Product A','Short description of product A','249','599','#fef2f2','#ef4444','58'],
      ['Product B','Short description of product B','399','990','#fff7ed','#f59e0b','59'],
      ['Product C','Short description of product C','189','490','#f0fdf4','#16a34a','61'],
      ['Product D','Short description of product D','299','750','#eff6ff','#2563eb','60'],
    ].map(([name, desc, sale, orig, bg, color, pct])=>
      `<div style="flex:1;min-width:180px;max-width:260px;background:#fff;border-radius:16px;border:1.5px solid #f1f5f9;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <!-- Product image -->
        <div style="position:relative;">
          <img src="https://placehold.co/260x180/${color.replace('#','')}/ffffff?text=${name}" alt="${name}" style="width:100%;height:180px;object-fit:cover;display:block;"/>
          <div style="position:absolute;top:10px;left:10px;padding:4px 10px;background:${color};color:#fff;border-radius:9999px;font-size:12px;font-weight:800;${F}">-${pct}%</div>
          <div style="position:absolute;top:10px;right:10px;padding:4px 10px;background:#ef4444;color:#fff;border-radius:9999px;font-size:11px;font-weight:700;${F}">⚡ Flash</div>
        </div>
        <!-- Info -->
        <div style="padding:14px;">
          <h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;${F}">${name}</h4>
          <p style="font-size:13px;color:#64748b;margin:0 0 10px;${F}">${desc}</p>
          <!-- Stock progress bar -->
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:11px;color:#ef4444;font-weight:600;${F}">🔥 73% sold</span>
              <span style="font-size:11px;color:#94a3b8;${F}">27 left</span>
            </div>
            <div style="height:5px;background:#fee2e2;border-radius:9999px;overflow:hidden;">
              <div style="height:100%;width:73%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:9999px;"></div>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div>
              <span style="font-size:18px;font-weight:900;color:${color};${F}">${sale}K</span>
              <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;margin-left:5px;${F}">${orig}K</span>
            </div>
            <a href="#" style="padding:8px 16px;background:${color};color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;${F}">Buy</a>
          </div>
        </div>
      </div>`).join('')}
  </div>
  <!-- Footer banner -->
  <div style="background:linear-gradient(90deg,#0f172a,#1e1b4b);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
    <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:0;${F}">⚡ Free shipping on orders over $50 · Secure checkout · Easy returns</p>
    <a href="#" style="font-size:13px;font-weight:700;color:#818cf8;text-decoration:none;${F}">View all sale products →</a>
  </div>
</div>`,
  })
}
