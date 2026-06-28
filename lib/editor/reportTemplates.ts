import type { Editor } from 'grapesjs'

const F   = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const CAT = { id: 'report-templates', label: 'Business Docs', order: 8 }

// ─── Shared helpers ────────────────────────────────────────────────────────

const KPI_CARD = (label: string, value: string, change: string, up: boolean, color: string) =>
  `<div style="flex:1;min-width:160px;background:#fff;border-radius:14px;padding:22px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04);border:1px solid #f1f5f9;box-sizing:border-box;">
    <p style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#94a3b8;margin:0 0 10px;${F}">${label}</p>
    <p style="font-size:28px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.03em;${F}">${value}</p>
    <p style="font-size:13px;font-weight:600;color:${up ? '#10b981' : '#ef4444'};margin:0;${F}">${up ? '▲' : '▼'} ${change} <span style="color:#94a3b8;font-weight:400;">vs previous period</span></p>
  </div>`

const TABLE_ROW = (cells: string[], isHeader = false, alt = false) =>
  `<tr style="background:${isHeader ? color : alt ? '#f8fafc' : '#fff'};">
    ${cells.map((c, i) => isHeader
      ? `<th style="padding:12px 16px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#fff;text-align:${i === 0 ? 'left' : 'right'};${F}">${c}</th>`
      : `<td style="padding:11px 16px;font-size:14px;color:${i === 0 ? '#0f172a' : '#475569'};text-align:${i === 0 ? 'left' : 'right'};border-bottom:1px solid #f1f5f9;${F}">${c}</td>`
    ).join('')}
  </tr>`

const color = '#1e3a5f'

const PROGRESS_ROW = (label: string, pct: number, val: string, clr: string) =>
  `<div style="margin-bottom:16px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span style="font-size:14px;font-weight:600;color:#334155;${F}">${label}</span>
      <span style="font-size:14px;font-weight:700;color:#0f172a;${F}">${val}</span>
    </div>
    <div style="background:#f1f5f9;border-radius:9999px;height:8px;overflow:hidden;">
      <div style="width:${pct}%;height:100%;background:${clr};border-radius:9999px;"></div>
    </div>
  </div>`

const BAR = (label: string, pct: number, val: string) =>
  `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
    <span style="font-size:13px;color:#475569;min-width:90px;text-align:right;flex-shrink:0;${F}">${label}</span>
    <div style="flex:1;background:#f1f5f9;border-radius:4px;height:22px;overflow:hidden;">
      <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#4f46e5,#7c3aed);border-radius:4px;display:flex;align-items:center;padding-left:8px;">
        <span style="font-size:12px;font-weight:700;color:#fff;${F}">${val}</span>
      </div>
    </div>
  </div>`

// ═══════════════════════════════════════════════════════════════════════════
//  REPORT TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

export function registerReportTemplates(editor: Editor) {
  const bm = editor.BlockManager

  // ── 1. Business Report ────────────────────────────────────────────────────
  bm.add('tpl-report-business', {
    label: 'Business Report',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="10" width="8" height="6" rx="2" fill="#4f46e5" opacity=".3"/><rect x="16" y="10" width="8" height="6" rx="2" fill="#4f46e5" opacity=".5"/><rect x="6" y="18" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="22" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="26" width="14" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #e2e8f0;">
  <div>
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 6px;${F}">BUSINESS REPORT</p>
    <h1 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.025em;${F}">Q2 2025 Business Results</h1>
    <p style="font-size:14px;color:#64748b;margin:0;${F}">Sales Department · Updated: 06/27/2025</p>
  </div>
  <div style="text-align:right;">
    <div style="display:inline-block;padding:6px 16px;background:#1e3a5f;color:#fff;border-radius:8px;font-size:13px;font-weight:700;${F}">CONFIDENTIAL</div>
  </div>
</div>

<!-- KPI CARDS -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:36px;">
  ${KPI_CARD('Revenue', '$4.2M', '+18.5%', true, '#4f46e5')}
  ${KPI_CARD('New Customers', '1,240', '+23%', true, '#10b981')}
  ${KPI_CARD('Conversion Rate', '3.8%', '-0.4%', false, '#ef4444')}
  ${KPI_CARD('Gross Profit', '$1.6M', '+12%', true, '#f59e0b')}
</div>

<!-- EXECUTIVE SUMMARY -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:17px;font-weight:800;color:#0f172a;margin:0 0 16px;display:flex;align-items:center;gap:8px;${F}">📋 Executive Summary</h2>
  <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;">
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>Q2 revenue reached $4.2M, up 18.5% year-over-year</li>
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>New customers reached 1,240, exceeding target by 23%</li>
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#f59e0b;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">!</span>Conversion rate declined 0.4% — sales consulting process needs improvement</li>
  </ul>
</div>

<!-- PERFORMANCE TABLE -->
<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <div style="padding:20px 24px 16px;border-bottom:1px solid #f1f5f9;">
    <h2 style="font-size:17px;font-weight:800;color:#0f172a;margin:0;${F}">📊 Results by Channel</h2>
  </div>
  <div style="overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        ${TABLE_ROW(['Sales Channel', 'Revenue', 'Share', 'vs Target', 'Status'], true)}
      </thead>
      <tbody>
        ${TABLE_ROW(['Direct', '$1.8M', '43%', '+22%', '✅ Met'], false, false)}
        ${TABLE_ROW(['Online / Digital', '$1.2M', '29%', '+35%', '✅ Exceeded'], false, true)}
        ${TABLE_ROW(['Resellers', '$780K', '18%', '+8%', '⚠️ Below Target'], false, false)}
        ${TABLE_ROW(['Export', '$420K', '10%', '+12%', '✅ Met'], false, true)}
      </tbody>
    </table>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:36px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Internal document — Do not distribute</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Page 1 / 1 · Sales Department · 2025</p>
</div>

</div>`,
  })

  // ── 2. Market Analysis Report ─────────────────────────────────────────────
  bm.add('tpl-report-market', {
    label: 'Market Analysis',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="4" height="12" rx="1" fill="#4f46e5" opacity=".9"/><rect x="12" y="15" width="4" height="8" rx="1" fill="#4f46e5" opacity=".7"/><rect x="18" y="13" width="4" height="10" rx="1" fill="#4f46e5" opacity=".5"/><rect x="6" y="26" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="30" width="14" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="background:linear-gradient(135deg,#1e3a5f 0%,#1e40af 100%);border-radius:16px;padding:32px;margin-bottom:32px;color:#fff;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin:0 0 8px;${F}">MARKET ANALYSIS</p>
  <h1 style="font-size:clamp(20px,4vw,30px);font-weight:800;margin:0 0 10px;${F}">Market Analysis Report Q2/2025</h1>
  <p style="font-size:14px;color:rgba(255,255,255,0.75);margin:0;${F}">Sector: Software Technology · Market: Southeast Asia · Updated: 06/27/2025</p>
</div>

<!-- KPI OVERVIEW -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:28px;">
  ${KPI_CARD('Market Size', '$2.4B', '+21%', true, '#4f46e5')}
  ${KPI_CARD('Our Market Share', '12.3%', '+2.1%', true, '#10b981')}
  ${KPI_CARD('Key Competitors', '8', '+1', false, '#ef4444')}
  ${KPI_CARD('Average NPS', '67', '+5 pts', true, '#f59e0b')}
</div>

<!-- BAR CHART: Market Share -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">📊 Market Share by Competitor</h2>
  ${BAR('Company A (us)', 65, '12.3%')}
  ${BAR('Competitor B', 52, '9.8%')}
  ${BAR('Competitor C', 45, '8.5%')}
  ${BAR('Competitor D', 38, '7.1%')}
  ${BAR('Others', 74, '62.3%')}
</div>

<!-- SWOT -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">🔍 SWOT Analysis</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
    <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#15803d;margin:0 0 10px;${F}">💪 Strengths</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#166534;line-height:1.7;${F}"><li>Strong brand recognition</li><li>Experienced technical team</li><li>High customer retention</li></ul>
    </div>
    <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#dc2626;margin:0 0 10px;${F}">⚠️ Weaknesses</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#991b1b;line-height:1.7;${F}"><li>High operational costs</li><li>Understaffed marketing team</li><li>Limited product range</li></ul>
    </div>
    <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 10px;${F}">🚀 Opportunities</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#1e40af;line-height:1.7;${F}"><li>Growing B2B market</li><li>High demand for digitalization</li><li>SEA expansion potential</li></ul>
    </div>
    <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#d97706;margin:0 0 10px;${F}">🛡️ Threats</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#92400e;line-height:1.7;${F}"><li>Intensifying price competition</li><li>USD exchange rate volatility</li><li>Foreign competitors entering market</li></ul>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Market Analysis Report — June 2025</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Strategy Department · Intelligate</p>
</div>

</div>`,
  })

  // ── 3. Marketing Performance Report ──────────────────────────────────────
  bm.add('tpl-report-marketing', {
    label: 'Marketing Report',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><circle cx="16" cy="20" r="10" fill="none" stroke="#4f46e5" stroke-width="1.5"/><path d="M16 10 A10 10 0 0 1 26 20" stroke="#818cf8" stroke-width="3" fill="none"/><path d="M26 20 A10 10 0 0 1 16 30" stroke="#4f46e5" stroke-width="3" fill="none"/><circle cx="16" cy="20" r="4" fill="#4f46e5"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #4f46e5;">
  <div>
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 6px;${F}">MARKETING PERFORMANCE REPORT</p>
    <h1 style="font-size:clamp(20px,4vw,30px);font-weight:800;color:#0f172a;margin:0 0 6px;${F}">Marketing Performance — June 2025</h1>
    <p style="font-size:14px;color:#64748b;margin:0;${F}">Marketing Department · Period: 06/01 – 06/30/2025</p>
  </div>
</div>

<!-- KPI CARDS -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:28px;">
  ${KPI_CARD('Total Reach', '2.8M', '+34%', true, '#4f46e5')}
  ${KPI_CARD('Engagement Rate', '5.2%', '+1.1%', true, '#10b981')}
  ${KPI_CARD('Cost per Lead', '$85', '-12%', true, '#10b981')}
  ${KPI_CARD('Overall ROI', '340%', '+28%', true, '#f59e0b')}
</div>

<!-- CHANNEL PERFORMANCE: PROGRESS BARS -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">📈 Performance by Channel</h2>
  ${PROGRESS_ROW('Facebook Ads', 88, '88% of Target', '#4f46e5')}
  ${PROGRESS_ROW('Google Ads', 72, '72% of Target', '#1d4ed8')}
  ${PROGRESS_ROW('TikTok Ads', 95, '95% of Target', '#7c3aed')}
  ${PROGRESS_ROW('Email Marketing', 61, '61% of Target', '#0891b2')}
  ${PROGRESS_ROW('SEO Organic', 45, '45% of Target', '#059669')}
</div>

<!-- BUDGET DETAIL TABLE -->
<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <div style="padding:20px 24px 16px;">
    <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0;${F}">💰 Budget & ROI Breakdown</h2>
  </div>
  <div style="overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        ${TABLE_ROW(['Channel', 'Budget', 'Revenue', 'Leads', 'ROI'], true)}
      </thead>
      <tbody>
        ${TABLE_ROW(['Facebook Ads', '$12K', '$52K', '1,240', '333%'], false, false)}
        ${TABLE_ROW(['Google Ads', '$8.5K', '$38K', '890', '347%'], false, true)}
        ${TABLE_ROW(['TikTok Ads', '$6K', '$27K', '620', '350%'], false, false)}
        ${TABLE_ROW(['Email', '$1.5K', '$9.5K', '280', '533%'], false, true)}
      </tbody>
    </table>
  </div>
</div>

<!-- INSIGHTS -->
<div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:14px;padding:24px;margin-bottom:28px;">
  <h2 style="font-size:15px;font-weight:800;color:#1d4ed8;margin:0 0 12px;${F}">💡 Insights & Recommendations</h2>
  <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;">
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• TikTok Ads has the highest ROI (350%) — recommend increasing budget by 30% in July</li>
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• Email Marketing delivers 533% ROI at low cost — optimize automation flows</li>
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• SEO Organic needs 2–3 more months to show clearer results</li>
  </ul>
</div>

<!-- FOOTER -->
<div style="margin-top:16px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Marketing Report · June 2025 · Internal</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Marketing Department · Intelligate</p>
</div>

</div>`,
  })

  // ── 4b. Proposal ─────────────────────────────────────────────────────────
  bm.add('tpl-proposal', {
    label: 'Proposal',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="20" height="2" rx="1" fill="#4f46e5" opacity=".5"/><rect x="6" y="15" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="19" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="25" width="9" height="7" rx="2" fill="#4f46e5" opacity=".2" stroke="#4f46e5" stroke-width="1"/><rect x="17" y="25" width="9" height="7" rx="2" fill="#4f46e5" opacity=".7"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;background:#fff;${F}">

<!-- COVER PAGE -->
<div style="background:linear-gradient(145deg,#0f172a 0%,#1e3a5f 60%,#312e81 100%);padding:72px 48px;text-align:center;border-radius:0 0 32px 32px;margin-bottom:0;">
  <div style="display:inline-block;padding:6px 18px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:28px;${F}">PROJECT PROPOSAL</div>
  <h1 style="font-size:clamp(26px,5vw,42px);font-weight:900;color:#fff;margin:0 0 16px;letter-spacing:-0.03em;line-height:1.15;${F}">Website Development Proposal for TechCorp Inc.</h1>
  <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 40px;${F}">Prepared for: Ms. Sarah Johnson, CEO · TechCorp Inc.</p>
  <div style="display:flex;justify-content:center;gap:40px;flex-wrap:wrap;">
    <div style="text-align:center;"><p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.45);margin:0 0 4px;${F}">Prepared By</p><p style="font-size:15px;font-weight:700;color:#fff;margin:0;${F}">Intelligate Studio</p></div>
    <div style="text-align:center;"><p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.45);margin:0 0 4px;${F}">Date</p><p style="font-size:15px;font-weight:700;color:#fff;margin:0;${F}">June 27, 2025</p></div>
    <div style="text-align:center;"><p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.45);margin:0 0 4px;${F}">Valid Until</p><p style="font-size:15px;font-weight:700;color:#fff;margin:0;${F}">July 27, 2025</p></div>
  </div>
</div>

<div style="padding:48px 40px;">

<!-- EXECUTIVE SUMMARY -->
<div style="margin-bottom:40px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">01 · EXECUTIVE SUMMARY</p>
  <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 16px;${F}">Overview</h2>
  <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 16px;${F}">We understand that TechCorp Inc. needs a modern, high-performance website that reflects your brand identity and drives measurable business growth. This proposal outlines our recommended approach, deliverables, timeline, and investment to achieve those goals.</p>
  <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:20px;">
    <div style="flex:1;min-width:160px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;">
      <p style="font-size:26px;font-weight:800;color:#4f46e5;margin:0 0 4px;${F}">$28,500</p>
      <p style="font-size:13px;color:#64748b;margin:0;${F}">Total Investment</p>
    </div>
    <div style="flex:1;min-width:160px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;">
      <p style="font-size:26px;font-weight:800;color:#10b981;margin:0 0 4px;${F}">10 Weeks</p>
      <p style="font-size:13px;color:#64748b;margin:0;${F}">Timeline</p>
    </div>
    <div style="flex:1;min-width:160px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;">
      <p style="font-size:26px;font-weight:800;color:#f59e0b;margin:0 0 4px;${F}">5 Pages</p>
      <p style="font-size:13px;color:#64748b;margin:0;${F}">Deliverables</p>
    </div>
  </div>
</div>

<!-- SCOPE OF WORK -->
<div style="margin-bottom:40px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">02 · SCOPE OF WORK</p>
  <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">What We Will Deliver</h2>
  <div style="display:flex;flex-direction:column;gap:12px;">
    ${[
      ['🏠 Homepage', 'Hero section, feature highlights, testimonials, CTA — fully responsive'],
      ['🛍️ Products / Services Page', 'Product grid, filter by category, detail view with pricing'],
      ['👥 About Us Page', 'Company story, team profiles, values and mission'],
      ['📞 Contact Page', 'Contact form (integrated with email), embedded map, office info'],
      ['📰 Blog / News', 'Listing page with pagination, article detail with SEO optimized structure'],
    ].map(([title, desc]) => `<div style="display:flex;gap:16px;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;align-items:flex-start;">
      <div style="flex:1;"><p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;${F}">${title}</p><p style="font-size:13px;color:#64748b;margin:0;line-height:1.6;${F}">${desc}</p></div>
    </div>`).join('')}
  </div>
</div>

<!-- TIMELINE -->
<div style="margin-bottom:40px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">03 · TIMELINE</p>
  <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">Project Phases</h2>
  <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead><tr style="background:#1e3a5f;">
      <th style="padding:12px 16px;text-align:left;color:#fff;font-weight:700;${F}">Phase</th>
      <th style="padding:12px 16px;text-align:left;color:#fff;font-weight:700;${F}">Duration</th>
      <th style="padding:12px 16px;text-align:left;color:#fff;font-weight:700;${F}">Key Deliverables</th>
      <th style="padding:12px 16px;text-align:center;color:#fff;font-weight:700;${F}">Status</th>
    </tr></thead>
    <tbody>
      ${[
        ['Discovery & Strategy','Week 1–2','Stakeholder interviews, sitemap, wireframes','Planning'],
        ['UI/UX Design','Week 3–4','Mockups, design system, client approval','Design'],
        ['Development','Week 5–8','Frontend + CMS integration, responsive build','Build'],
        ['QA & Testing','Week 9','Cross-browser testing, performance audit','QA'],
        ['Launch & Handover','Week 10','Deployment, team training, documentation','Launch'],
      ].map(([phase,dur,del,status],i) => `<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 16px;font-weight:600;color:#0f172a;${F}">${phase}</td>
        <td style="padding:12px 16px;color:#4f46e5;font-weight:600;${F}">${dur}</td>
        <td style="padding:12px 16px;color:#475569;${F}">${del}</td>
        <td style="padding:12px 16px;text-align:center;${F}"><span style="padding:3px 10px;border-radius:9999px;font-size:12px;font-weight:600;background:#eff6ff;color:#1d4ed8;">${status}</span></td>
      </tr>`).join('')}
    </tbody>
  </table></div>
</div>

<!-- INVESTMENT -->
<div style="margin-bottom:40px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">04 · INVESTMENT</p>
  <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">Pricing Breakdown</h2>
  <div style="overflow-x:auto;border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead><tr style="background:#1e3a5f;"><th style="padding:12px 16px;text-align:left;color:#fff;font-weight:700;${F}">Item</th><th style="padding:12px 16px;text-align:right;color:#fff;font-weight:700;${F}">Price</th></tr></thead>
      <tbody>
        ${[['UI/UX Design (5 pages)','$6,000'],['Frontend Development','$8,500'],['CMS Integration (WordPress)','$4,000'],['SEO Setup & Optimization','$2,500'],['QA Testing & Bug Fixes','$2,500'],['Training & Documentation','$1,500'],['Project Management','$3,500']].map(([item,price],i)=>`<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;"><td style="padding:12px 16px;color:#334155;${F}">${item}</td><td style="padding:12px 16px;text-align:right;color:#0f172a;font-weight:600;${F}">${price}</td></tr>`).join('')}
        <tr style="background:#1e3a5f;"><td style="padding:14px 16px;font-size:15px;font-weight:800;color:#fff;${F}">Total Investment</td><td style="padding:14px 16px;text-align:right;font-size:18px;font-weight:800;color:#fff;${F}">$28,500</td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:13px;color:#94a3b8;margin:10px 0 0;${F}">Payment: 40% upon signing · 40% mid-project · 20% on delivery</p>
</div>

<!-- SIGNATURE -->
<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:28px;margin-bottom:16px;">
  <p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 20px;${F}">By signing below, both parties agree to the terms outlined in this proposal.</p>
  <div style="display:flex;flex-wrap:wrap;gap:32px;">
    <div style="flex:1;min-width:200px;"><p style="font-size:12px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;margin:0 0 32px;${F}">For Intelligate Studio</p><div style="border-top:1.5px solid #cbd5e1;padding-top:8px;"><p style="font-size:13px;color:#475569;margin:0;${F}">Authorized Signature</p></div></div>
    <div style="flex:1;min-width:200px;"><p style="font-size:12px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;margin:0 0 32px;${F}">For TechCorp Inc.</p><div style="border-top:1.5px solid #cbd5e1;padding-top:8px;"><p style="font-size:13px;color:#475569;margin:0;${F}">Authorized Signature</p></div></div>
  </div>
</div>

</div></div>`,
  })

  // ── 4c. Case Study ────────────────────────────────────────────────────────
  bm.add('tpl-case-study', {
    label: 'Case Study',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><circle cx="12" cy="17" r="5" fill="#4f46e5" opacity=".2" stroke="#4f46e5" stroke-width="1.5"/><path d="M12 14v6M9 17h6" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/><rect x="19" y="13" width="7" height="2" rx="1" fill="#4f46e5" opacity=".6"/><rect x="19" y="17" width="7" height="2" rx="1" fill="#e2e8f0"/><rect x="19" y="21" width="5" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="27" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="31" width="14" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;background:#fff;${F}">

<!-- HERO -->
<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:60px 48px;text-align:center;">
  <div style="display:inline-block;padding:5px 16px;background:rgba(79,70,229,0.3);border:1px solid rgba(99,102,241,0.4);border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a5b4fc;margin-bottom:20px;${F}">CASE STUDY</div>
  <h1 style="font-size:clamp(24px,5vw,40px);font-weight:900;color:#fff;margin:0 0 16px;letter-spacing:-0.025em;line-height:1.2;${F}">How RetailPro Increased Online Revenue by 142% in 8 Months</h1>
  <p style="font-size:15px;color:rgba(255,255,255,0.6);margin:0 0 40px;${F}">Client: RetailPro · Industry: E-commerce · Solution: Full-stack digital transformation</p>
  <div style="display:flex;justify-content:center;gap:48px;flex-wrap:wrap;">
    <div><p style="font-size:36px;font-weight:900;color:#4ade80;margin:0;${F}">+142%</p><p style="font-size:13px;color:rgba(255,255,255,0.55);margin:4px 0 0;${F}">Revenue Growth</p></div>
    <div><p style="font-size:36px;font-weight:900;color:#60a5fa;margin:0;${F}">8 mo.</p><p style="font-size:13px;color:rgba(255,255,255,0.55);margin:4px 0 0;${F}">Time to Result</p></div>
    <div><p style="font-size:36px;font-weight:900;color:#fb923c;margin:0;${F}">3.2×</p><p style="font-size:13px;color:rgba(255,255,255,0.55);margin:4px 0 0;${F}">ROI</p></div>
    <div><p style="font-size:36px;font-weight:900;color:#e879f9;margin:0;${F}">68%</p><p style="font-size:13px;color:rgba(255,255,255,0.55);margin:4px 0 0;${F}">↓ Cart Abandonment</p></div>
  </div>
</div>

<div style="padding:48px 40px;">

<!-- CLIENT OVERVIEW -->
<div style="display:flex;flex-wrap:wrap;gap:32px;margin-bottom:40px;padding-bottom:40px;border-bottom:1px solid #f1f5f9;align-items:flex-start;">
  <div style="flex:2;min-width:260px;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">ABOUT THE CLIENT</p>
    <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 12px;${F}">RetailPro — Fashion & Lifestyle E-commerce</h2>
    <p style="font-size:14px;color:#475569;line-height:1.75;margin:0;${F}">RetailPro is a mid-size fashion retailer with 12 offline stores across 4 cities. Prior to working with us, their online sales accounted for less than 8% of total revenue — well below industry averages. They had an outdated website, no structured digital marketing strategy, and high cart abandonment rates.</p>
  </div>
  <div style="flex:1;min-width:200px;background:#f8fafc;border-radius:14px;padding:22px;border:1px solid #e2e8f0;">
    <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 14px;${F}">At a Glance</p>
    ${[['Industry','Fashion & Lifestyle'],['Company Size','280 employees'],['Founded','2014'],['Challenge Start','September 2024'],['Project Duration','8 months']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #e2e8f0;font-size:13px;${F}"><span style="color:#64748b;">${k}</span><span style="font-weight:600;color:#0f172a;">${v}</span></div>`).join('')}
  </div>
</div>

<!-- THE CHALLENGE -->
<div style="margin-bottom:36px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ef4444;margin:0 0 8px;${F}">THE CHALLENGE</p>
  <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 14px;${F}">A Digital Presence That Was Holding Them Back</h2>
  <div style="display:flex;flex-direction:column;gap:12px;">
    ${[
      ['🐌 Slow website', 'Page load times exceeded 8 seconds on mobile — losing 60%+ of visitors before they saw any product.'],
      ['🛒 High cart abandonment', '78% of users abandoned carts at checkout due to a confusing 6-step payment flow.'],
      ['📱 Not mobile-optimized', 'Over 70% of traffic came from mobile, but the site was built for desktop only.'],
      ['📊 No data visibility', 'No analytics setup meant no insight into where traffic came from or why users dropped off.'],
    ].map(([title, desc]) => `<div style="display:flex;gap:16px;padding:16px 20px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
      <div><p style="font-size:14px;font-weight:700;color:#dc2626;margin:0 0 4px;${F}">${title}</p><p style="font-size:13px;color:#7f1d1d;margin:0;line-height:1.6;${F}">${desc}</p></div>
    </div>`).join('')}
  </div>
</div>

<!-- THE SOLUTION -->
<div style="margin-bottom:36px;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#10b981;margin:0 0 8px;${F}">THE SOLUTION</p>
  <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 14px;${F}">A Holistic Digital Overhaul in 3 Phases</h2>
  <div style="display:flex;flex-direction:column;gap:12px;">
    ${[
      ['Phase 1 — Platform Rebuild (Month 1–3)', 'Rebuilt the entire site on a modern headless stack. Load time went from 8.2s to 1.1s. Streamlined checkout from 6 steps to 2.'],
      ['Phase 2 — Mobile-First Design (Month 3–5)', 'Redesigned all UX flows for mobile. Introduced smart product search, size guides, and one-tap reorder.'],
      ['Phase 3 — Growth Engine (Month 5–8)', 'Launched performance marketing across Google, Meta, and TikTok. Set up full analytics stack with real-time dashboards.'],
    ].map(([title, desc]) => `<div style="display:flex;gap:16px;padding:16px 20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;">
      <div><p style="font-size:14px;font-weight:700;color:#15803d;margin:0 0 4px;${F}">${title}</p><p style="font-size:13px;color:#14532d;margin:0;line-height:1.6;${F}">${desc}</p></div>
    </div>`).join('')}
  </div>
</div>

<!-- RESULTS -->
<div style="margin-bottom:36px;background:#f8fafc;border-radius:16px;padding:28px;border:1px solid #e2e8f0;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 8px;${F}">THE RESULTS</p>
  <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">Measurable Impact After 8 Months</h2>
  <div style="display:flex;flex-wrap:wrap;gap:14px;">
    ${[
      ['Online Revenue','$1.2M → $2.9M','+142%','#10b981'],
      ['Conversion Rate','0.9% → 3.4%','+278%','#4f46e5'],
      ['Page Load Time','8.2s → 1.1s','−87%','#f59e0b'],
      ['Cart Abandonment','78% → 25%','−68%','#ef4444'],
      ['Monthly Active Users','28K → 112K','+300%','#8b5cf6'],
      ['Marketing ROI','—','3.2×','#0891b2'],
    ].map(([label,val,change,c])=>`<div style="flex:1;min-width:130px;background:#fff;border-radius:12px;padding:18px;border:1.5px solid #e2e8f0;">
      <p style="font-size:12px;color:#94a3b8;margin:0 0 6px;font-weight:600;${F}">${label}</p>
      <p style="font-size:20px;font-weight:800;color:#0f172a;margin:0 0 4px;${F}">${val}</p>
      <p style="font-size:13px;font-weight:700;color:${c};margin:0;${F}">${change}</p>
    </div>`).join('')}
  </div>
</div>

<!-- TESTIMONIAL -->
<div style="background:linear-gradient(135deg,#eff6ff,#f5f3ff);border:1.5px solid #c7d2fe;border-radius:16px;padding:32px;margin-bottom:16px;">
  <p style="font-size:28px;color:#818cf8;margin:0 0 12px;line-height:1;">"</p>
  <p style="font-size:16px;color:#1e1b4b;line-height:1.75;font-style:italic;margin:0 0 20px;${F}">Working with this team was a turning point for RetailPro. In less than a year, our online channel went from an afterthought to our fastest-growing revenue stream. The combination of technical excellence and strategic thinking is rare — I'd recommend them to any retailer serious about digital growth.</p>
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:44px;height:44px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;flex-shrink:0;">M</div>
    <div><p style="font-size:14px;font-weight:700;color:#1e1b4b;margin:0;${F}">Michael Torres</p><p style="font-size:13px;color:#6366f1;margin:0;${F}">CEO & Co-founder, RetailPro</p></div>
  </div>
</div>

</div></div>`,
  })

  // ── 4d. Meeting Minutes ───────────────────────────────────────────────────
  bm.add('tpl-meeting-minutes', {
    label: 'Meeting Minutes',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="9" y="0" width="5" height="5" rx="1.5" fill="#4f46e5"/><rect x="18" y="0" width="5" height="5" rx="1.5" fill="#4f46e5"/><rect x="6" y="8" width="20" height="2" rx="1" fill="#1e3a5f"/><rect x="6" y="13" width="4" height="4" rx="1" fill="#4f46e5" opacity=".4"/><rect x="12" y="14" width="12" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="20" width="4" height="4" rx="1" fill="#4f46e5" opacity=".7"/><rect x="12" y="21" width="12" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="27" width="4" height="4" rx="1" fill="#10b981" opacity=".8"/><rect x="12" y="28" width="12" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:860px;margin:0 auto;padding:48px 40px;background:#fff;${F}">

<!-- HEADER -->
<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;padding-bottom:24px;margin-bottom:32px;border-bottom:3px solid #1e3a5f;">
  <div>
    <p style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4f46e5;margin:0 0 6px;${F}">MEETING MINUTES</p>
    <h1 style="font-size:clamp(20px,4vw,28px);font-weight:800;color:#0f172a;margin:0 0 4px;${F}">Q2 2025 Business Review — Board Meeting</h1>
  </div>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;min-width:220px;">
    ${[['Date','June 27, 2025'],['Time','9:00 AM – 11:30 AM'],['Location','Boardroom A, 5th Floor'],['Facilitator','John Smith, CEO'],['Minutes by','Emily Chen, EA']].map(([k,v])=>`<div style="display:flex;gap:8px;font-size:13px;padding:3px 0;${F}"><span style="color:#94a3b8;min-width:80px;flex-shrink:0;">${k}</span><span style="font-weight:600;color:#334155;">${v}</span></div>`).join('')}
  </div>
</div>

<!-- ATTENDEES -->
<div style="margin-bottom:36px;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 14px;${F}">👥 Attendees</h2>
  <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:13px;">
    <thead><tr style="background:#1e3a5f;"><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">Name</th><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">Role / Department</th><th style="padding:10px 14px;text-align:center;color:#fff;font-weight:700;${F}">Status</th></tr></thead>
    <tbody>
      ${[
        ['John Smith','CEO','✅ Present'],
        ['Sarah Johnson','CFO','✅ Present'],
        ['David Lee','VP Sales','✅ Present'],
        ['Emily Chen','Executive Assistant','✅ Present'],
        ['Mark Williams','VP Engineering','📞 Remote'],
        ['Lisa Park','Head of Marketing','❌ Absent (Apologies)'],
      ].map(([name,role,status],i)=>`<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0f172a;${F}">${name}</td><td style="padding:10px 14px;color:#64748b;${F}">${role}</td><td style="padding:10px 14px;text-align:center;font-size:13px;${F}">${status}</td></tr>`).join('')}
    </tbody>
  </table></div>
</div>

<!-- AGENDA & DISCUSSION -->
<div style="margin-bottom:36px;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 16px;${F}">📋 Agenda & Discussion</h2>
  <div style="display:flex;flex-direction:column;gap:0;">
    ${[
      {num:'01',title:'Q2 Financial Results Review',time:'9:05 – 9:40 AM',presenter:'Sarah Johnson (CFO)',
       discussion:'CFO presented Q2 financials: revenue $4.2M (+18.5% YoY), gross profit $1.6M (+12%). EBITDA margin improved to 22%. Cash position strong at $3.1M. Board noted concern about rising operational costs (+14% QoQ).',
       decision:'Approved Q2 results. Finance team to prepare cost-reduction analysis for next board meeting.'},
      {num:'02',title:'Sales Performance & Pipeline Update',time:'9:40 – 10:10 AM',presenter:'David Lee (VP Sales)',
       discussion:'Sales team exceeded Q2 target by 23% (1,240 new customers vs target of 1,008). Enterprise pipeline currently at $8.4M. 3 deals expected to close in July totaling $1.2M. Conversion rate dipped 0.4% — identified root cause as extended discovery cycle.',
       decision:'Approved expanding sales team by 2 headcount in Q3. Sales enablement resources to be allocated.'},
      {num:'03',title:'Product Roadmap Q3/Q4 2025',time:'10:10 – 10:45 AM',presenter:'Mark Williams (VP Engineering)',
       discussion:'Engineering presented roadmap for H2 2025: AI-powered reporting module (Q3), mobile app v2.0 (Q4), API marketplace launch (Q4). Technical debt sprint planned for August. Team currently at 85% capacity.',
       decision:'Roadmap approved with minor adjustments. Mobile app prioritized over API marketplace. Budget allocation confirmed.'},
      {num:'04',title:'AOB & Next Steps',time:'10:45 – 11:00 AM',presenter:'All',
       discussion:'Annual offsite date confirmed for August 14–15. Hiring freeze lifted for approved roles. Office expansion plan to be revisited in Q4 budget review.',
       decision:'No further items. Meeting adjourned at 11:02 AM.'},
    ].map((item,i)=>`<div style="display:flex;gap:0;margin-bottom:${i<3?'20':'0'}px;">
      <div style="width:36px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;">
        <div style="width:32px;height:32px;background:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0;">${item.num}</div>
        ${i<3?`<div style="width:2px;flex:1;background:#e2e8f0;margin:4px 0;"></div>`:''}
      </div>
      <div style="flex:1;padding:0 0 0 16px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:0;">
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;margin-bottom:10px;">
            <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0;${F}">${item.title}</h3>
            <span style="font-size:12px;color:#94a3b8;${F}">${item.time} · ${item.presenter}</span>
          </div>
          <p style="font-size:13px;color:#475569;line-height:1.7;margin:0 0 10px;${F}"><strong style="color:#334155;">Discussion:</strong> ${item.discussion}</p>
          <div style="background:#eff6ff;border-left:3px solid #4f46e5;padding:10px 14px;border-radius:0 8px 8px 0;font-size:13px;color:#1e3a8a;${F}"><strong>Decision/Action:</strong> ${item.decision}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- ACTION ITEMS -->
<div style="margin-bottom:32px;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 14px;${F}">✅ Action Items</h2>
  <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:13px;">
    <thead><tr style="background:#1e3a5f;"><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">#</th><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">Action</th><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">Owner</th><th style="padding:10px 14px;text-align:left;color:#fff;font-weight:700;${F}">Due Date</th><th style="padding:10px 14px;text-align:center;color:#fff;font-weight:700;${F}">Priority</th></tr></thead>
    <tbody>
      ${[
        ['1','Prepare cost-reduction analysis report','Sarah Johnson','July 11, 2025','🔴 High'],
        ['2','Submit Q3 headcount expansion plan (2 roles)','David Lee','July 4, 2025','🔴 High'],
        ['3','Finalize Q3/Q4 product roadmap document','Mark Williams','July 7, 2025','🟡 Medium'],
        ['4','Confirm offsite logistics for Aug 14–15','Emily Chen','July 1, 2025','🟡 Medium'],
        ['5','Circulate approved minutes to all attendees','Emily Chen','June 28, 2025','🟢 Low'],
      ].map(([num,action,owner,due,priority],i)=>`<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;"><td style="padding:10px 14px;color:#64748b;font-weight:600;${F}">${num}</td><td style="padding:10px 14px;color:#334155;${F}">${action}</td><td style="padding:10px 14px;font-weight:600;color:#4f46e5;${F}">${owner}</td><td style="padding:10px 14px;color:#64748b;${F}">${due}</td><td style="padding:10px 14px;text-align:center;${F}">${priority}</td></tr>`).join('')}
    </tbody>
  </table></div>
</div>

<!-- NEXT MEETING & FOOTER -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin-bottom:24px;display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center;">
  <div><p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;margin:0 0 4px;${F}">Next Board Meeting</p><p style="font-size:15px;font-weight:700;color:#0f172a;margin:0;${F}">Friday, September 26, 2025 · 9:00 AM · Boardroom A</p></div>
  <div style="text-align:right;"><p style="font-size:12px;color:#94a3b8;margin:0;${F}">Minutes prepared by Emily Chen · June 27, 2025</p><p style="font-size:12px;color:#94a3b8;margin:4px 0 0;${F}">Approved by: John Smith, CEO</p></div>
</div>

</div>`,
  })

  // ── 4e. Quotation ─────────────────────────────────────────────────────────
  bm.add('tpl-quotation', {
    label: 'Quotation',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="12" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="20" height="1.5" rx=".75" fill="#e2e8f0"/><rect x="6" y="14" width="20" height="1.5" rx=".75" fill="#e2e8f0"/><rect x="6" y="17" width="20" height="1.5" rx=".75" fill="#e2e8f0"/><rect x="6" y="20" width="20" height="1.5" rx=".75" fill="#e2e8f0"/><rect x="6" y="25" width="14" height="1.5" rx=".75" fill="#e2e8f0"/><rect x="16" y="28" width="10" height="4" rx="2" fill="#4f46e5"/></svg>`,
    content: `<div style="max-width:820px;margin:0 auto;padding:0;background:#fff;${F}">

<!-- HEADER BAR -->
<div style="background:#1e3a5f;padding:32px 40px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
  <div>
    <h1 style="font-size:26px;font-weight:900;color:#fff;margin:0 0 4px;letter-spacing:-0.02em;${F}">Intelligate Studio</h1>
    <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:0;${F}">studio@intelligate.com · +1 (555) 890-1234</p>
    <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:2px 0 0;${F}">123 Innovation Drive, San Francisco, CA 94105</p>
  </div>
  <div style="text-align:right;">
    <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:14px 20px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin:0 0 4px;${F}">QUOTATION</p>
      <p style="font-size:20px;font-weight:800;color:#fff;margin:0 0 8px;${F}">QT-2025-0148</p>
      ${[['Date','June 27, 2025'],['Valid Until','July 27, 2025']].map(([k,v])=>`<p style="font-size:12px;color:rgba(255,255,255,0.65);margin:2px 0;${F}">${k}: <strong style="color:#fff;">${v}</strong></p>`).join('')}
    </div>
  </div>
</div>

<div style="padding:36px 40px;">

<!-- BILL TO -->
<div style="display:flex;flex-wrap:wrap;gap:32px;margin-bottom:36px;">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4f46e5;margin:0 0 10px;${F}">BILL TO</p>
    <p style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 4px;${F}">TechCorp Inc.</p>
    <p style="font-size:13px;color:#64748b;margin:0;line-height:1.7;${F}">Attn: Sarah Johnson, CEO<br>456 Business Park Blvd<br>New York, NY 10001<br>sarah@techcorp.com</p>
  </div>
  <div style="flex:1;min-width:200px;background:#f8fafc;border-radius:12px;padding:18px 20px;border:1px solid #e2e8f0;">
    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin:0 0 10px;${F}">PROJECT DETAILS</p>
    ${[['Project','Website Redesign & Development'],['Scope','5 pages + CMS'],['Delivery','10 weeks from signing'],['Support','3 months post-launch']].map(([k,v])=>`<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #e2e8f0;font-size:13px;${F}"><span style="color:#94a3b8;min-width:70px;flex-shrink:0;">${k}</span><span style="font-weight:600;color:#334155;">${v}</span></div>`).join('')}
  </div>
</div>

<!-- LINE ITEMS TABLE -->
<div style="margin-bottom:28px;overflow-x:auto;border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead><tr style="background:#1e3a5f;">
      <th style="padding:13px 16px;text-align:left;color:#fff;font-weight:700;${F}">#</th>
      <th style="padding:13px 16px;text-align:left;color:#fff;font-weight:700;${F}">Service / Deliverable</th>
      <th style="padding:13px 16px;text-align:center;color:#fff;font-weight:700;${F}">Qty</th>
      <th style="padding:13px 16px;text-align:right;color:#fff;font-weight:700;${F}">Unit Price</th>
      <th style="padding:13px 16px;text-align:right;color:#fff;font-weight:700;${F}">Total</th>
    </tr></thead>
    <tbody>
      ${[
        ['1','UI/UX Design — 5 custom page designs with responsive variants','1','$6,000','$6,000'],
        ['2','Frontend Development — HTML/CSS/JS, fully responsive','1','$8,500','$8,500'],
        ['3','CMS Integration — WordPress setup, plugins, custom admin','1','$4,000','$4,000'],
        ['4','SEO Foundation — on-page optimization, sitemap, analytics setup','1','$2,500','$2,500'],
        ['5','QA & Cross-browser Testing — 5 browsers, mobile & desktop','1','$2,500','$2,500'],
        ['6','Training & Documentation — 2-hour session + written guide','1','$1,500','$1,500'],
        ['7','Project Management — dedicated PM, weekly updates','1','$3,500','$3,500'],
      ].map(([num,desc,qty,unit,total],i)=>`<tr style="background:${i%2===0?'#fff':'#f8fafc'};border-bottom:1px solid #f1f5f9;">
        <td style="padding:12px 16px;color:#94a3b8;font-weight:600;${F}">${num}</td>
        <td style="padding:12px 16px;color:#334155;${F}">${desc}</td>
        <td style="padding:12px 16px;text-align:center;color:#64748b;${F}">${qty}</td>
        <td style="padding:12px 16px;text-align:right;color:#64748b;${F}">${unit}</td>
        <td style="padding:12px 16px;text-align:right;font-weight:700;color:#0f172a;${F}">${total}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>

<!-- TOTALS -->
<div style="display:flex;justify-content:flex-end;margin-bottom:32px;">
  <div style="min-width:280px;">
    ${[['Subtotal','$28,500'],['Discount (Early sign-in 5%)','−$1,425'],['Tax (0% — B2B service)','$0.00']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:9px 16px;font-size:14px;border-bottom:1px solid #f1f5f9;${F}"><span style="color:#64748b;">${k}</span><span style="font-weight:600;color:#334155;">${v}</span></div>`).join('')}
    <div style="display:flex;justify-content:space-between;padding:14px 16px;background:#1e3a5f;border-radius:0 0 10px 10px;font-size:16px;font-weight:800;${F}"><span style="color:#fff;">Total Due</span><span style="color:#fff;">$27,075</span></div>
  </div>
</div>

<!-- TERMS & PAYMENT -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px;margin-bottom:28px;">
  <h3 style="font-size:14px;font-weight:800;color:#0f172a;margin:0 0 14px;${F}">Terms & Conditions</h3>
  <ul style="margin:0;padding-left:18px;font-size:13px;color:#475569;line-height:1.8;${F}">
    <li>Payment Schedule: 40% upfront upon signing · 40% at development completion · 20% on final delivery</li>
    <li>This quotation is valid for 30 days from the issue date (until July 27, 2025)</li>
    <li>Scope changes beyond the agreed deliverables may incur additional charges</li>
    <li>Post-launch support: 3 months bug fixes included at no extra charge</li>
    <li>All deliverables become client property upon receipt of full payment</li>
  </ul>
</div>

<!-- ACCEPT / SIGNATURE -->
<div style="border:1.5px solid #c7d2fe;border-radius:14px;padding:28px;text-align:center;background:linear-gradient(135deg,#fafafa,#eff6ff);">
  <p style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 8px;${F}">Ready to move forward?</p>
  <p style="font-size:13px;color:#64748b;margin:0 0 24px;${F}">Sign below or reply to this email to accept the quotation and get started.</p>
  <div style="display:flex;flex-wrap:wrap;gap:32px;justify-content:center;">
    <div style="text-align:left;min-width:220px;"><p style="font-size:12px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;margin:0 0 28px;${F}">Accepted by (Client)</p><div style="border-top:1.5px solid #cbd5e1;padding-top:8px;"><p style="font-size:12px;color:#94a3b8;margin:0;${F}">Name · Title · Date</p></div></div>
    <div style="text-align:left;min-width:220px;"><p style="font-size:12px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;margin:0 0 28px;${F}">Authorized by (Intelligate)</p><div style="border-top:1.5px solid #cbd5e1;padding-top:8px;"><p style="font-size:12px;color:#94a3b8;margin:0;${F}">Name · Title · Date</p></div></div>
  </div>
</div>

</div></div>`,
  })

  // ── 4. Project Status Report ──────────────────────────────────────────────
  bm.add('tpl-report-project', {
    label: 'Project Report',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="20" height="2" rx="1" fill="#4f46e5" opacity=".3"/><rect x="6" y="15" width="14" height="2" rx="1" fill="#4f46e5" opacity=".7"/><rect x="6" y="19" width="18" height="2" rx="1" fill="#4f46e5" opacity=".5"/><rect x="6" y="23" width="10" height="2" rx="1" fill="#4f46e5" opacity=".9"/><rect x="6" y="29" width="20" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:16px;padding:32px;margin-bottom:32px;color:#fff;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 8px;${F}">PROJECT STATUS REPORT</p>
  <h1 style="font-size:clamp(20px,4vw,28px);font-weight:800;margin:0 0 12px;${F}">Project: Internal Management System v2.0</h1>
  <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:16px;">
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">START DATE</p><p style="font-size:14px;font-weight:700;margin:0;${F}">04/01/2025</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">TARGET DATE</p><p style="font-size:14px;font-weight:700;margin:0;${F}">09/30/2025</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">STATUS</p><p style="font-size:14px;font-weight:700;color:#4ade80;margin:0;${F}">On Track</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">COMPLETE</p><p style="font-size:14px;font-weight:700;margin:0;${F}">52%</p></div>
  </div>
</div>

<!-- OVERALL PROGRESS -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">🎯 Overall Progress — 52%</h2>
  <div style="background:#f1f5f9;border-radius:9999px;height:12px;overflow:hidden;margin-bottom:24px;">
    <div style="width:52%;height:100%;background:linear-gradient(90deg,#4f46e5,#7c3aed);border-radius:9999px;"></div>
  </div>
  ${PROGRESS_ROW('Phase 1: Requirements Analysis', 100, 'Complete', '#10b981')}
  ${PROGRESS_ROW('Phase 2: System Design', 100, 'Complete', '#10b981')}
  ${PROGRESS_ROW('Phase 3: Backend Development', 75, 'In Progress', '#4f46e5')}
  ${PROGRESS_ROW('Phase 4: Frontend Development', 40, 'In Progress', '#f59e0b')}
  ${PROGRESS_ROW('Phase 5: QA Testing', 0, 'Not Started', '#94a3b8')}
  ${PROGRESS_ROW('Phase 6: Deploy & Training', 0, 'Not Started', '#94a3b8')}
</div>

<!-- ISSUES & RISKS -->
<div style="display:flex;flex-wrap:wrap;gap:20px;margin-bottom:28px;">
  <div style="flex:1;min-width:240px;background:#fef2f2;border:1.5px solid #fecaca;border-radius:14px;padding:22px;">
    <h3 style="font-size:14px;font-weight:800;color:#dc2626;margin:0 0 12px;${F}">🚨 Risks to Watch</h3>
    <ul style="margin:0;padding-left:16px;font-size:13px;color:#991b1b;line-height:1.8;${F}">
      <li>Third-party API instability</li>
      <li>Missing 1 senior developer</li>
      <li>Risk of 2-week deadline slip</li>
    </ul>
  </div>
  <div style="flex:1;min-width:240px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:14px;padding:22px;">
    <h3 style="font-size:14px;font-weight:800;color:#15803d;margin:0 0 12px;${F}">✅ Achievements</h3>
    <ul style="margin:0;padding-left:16px;font-size:13px;color:#166534;line-height:1.8;${F}">
      <li>On budget, no overruns</li>
      <li>Stakeholders satisfied with design</li>
      <li>Unit test coverage at 85%</li>
    </ul>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:16px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Project Status Report · 06/27/2025</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">PM: John Smith · Intelligate</p>
</div>

</div>`,
  })
}
