import type { Editor } from 'grapesjs'

const F   = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const CAT = { id: 'report-templates', label: 'Report Templates', order: 9 }

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
