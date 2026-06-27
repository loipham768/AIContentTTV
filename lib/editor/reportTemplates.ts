import type { Editor } from 'grapesjs'

const F   = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const CAT = { id: 'report-templates', label: 'Mẫu Report', order: 9 }

// ─── Shared helpers ────────────────────────────────────────────────────────

const KPI_CARD = (label: string, value: string, change: string, up: boolean, color: string) =>
  `<div style="flex:1;min-width:160px;background:#fff;border-radius:14px;padding:22px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04);border:1px solid #f1f5f9;box-sizing:border-box;">
    <p style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#94a3b8;margin:0 0 10px;${F}">${label}</p>
    <p style="font-size:28px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.03em;${F}">${value}</p>
    <p style="font-size:13px;font-weight:600;color:${up ? '#10b981' : '#ef4444'};margin:0;${F}">${up ? '▲' : '▼'} ${change} <span style="color:#94a3b8;font-weight:400;">so với kỳ trước</span></p>
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

  // ── 1. Báo cáo kinh doanh tổng quan ──────────────────────────────────────
  bm.add('tpl-report-business', {
    label: 'Báo cáo kinh doanh',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="10" width="8" height="6" rx="2" fill="#4f46e5" opacity=".3"/><rect x="16" y="10" width="8" height="6" rx="2" fill="#4f46e5" opacity=".5"/><rect x="6" y="18" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="22" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="26" width="14" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #e2e8f0;">
  <div>
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 6px;${F}">BÁO CÁO KINH DOANH</p>
    <h1 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.025em;${F}">Kết quả Kinh doanh Quý 2 / 2025</h1>
    <p style="font-size:14px;color:#64748b;margin:0;${F}">Phòng Kinh doanh · Cập nhật: 27/06/2025</p>
  </div>
  <div style="text-align:right;">
    <div style="display:inline-block;padding:6px 16px;background:#1e3a5f;color:#fff;border-radius:8px;font-size:13px;font-weight:700;${F}">CONFIDENTIAL</div>
  </div>
</div>

<!-- KPI CARDS -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:36px;">
  ${KPI_CARD('Doanh thu', '4.2 tỷ', '+18.5%', true, '#4f46e5')}
  ${KPI_CARD('Khách hàng mới', '1,240', '+23%', true, '#10b981')}
  ${KPI_CARD('Tỷ lệ chuyển đổi', '3.8%', '-0.4%', false, '#ef4444')}
  ${KPI_CARD('Lợi nhuận gộp', '1.6 tỷ', '+12%', true, '#f59e0b')}
</div>

<!-- EXECUTIVE SUMMARY -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:17px;font-weight:800;color:#0f172a;margin:0 0 16px;display:flex;align-items:center;gap:8px;${F}">📋 Tóm tắt điều hành</h2>
  <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;">
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>Doanh thu Q2 đạt 4.2 tỷ đồng, tăng 18.5% so với cùng kỳ năm ngoái</li>
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>Số lượng khách hàng mới đạt 1,240, vượt mục tiêu 23%</li>
    <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#334155;line-height:1.65;${F}"><span style="width:20px;height:20px;background:#f59e0b;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">!</span>Tỷ lệ chuyển đổi giảm nhẹ 0.4% — cần cải thiện quy trình tư vấn</li>
  </ul>
</div>

<!-- PERFORMANCE TABLE -->
<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <div style="padding:20px 24px 16px;border-bottom:1px solid #f1f5f9;">
    <h2 style="font-size:17px;font-weight:800;color:#0f172a;margin:0;${F}">📊 Kết quả theo kênh</h2>
  </div>
  <div style="overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        ${TABLE_ROW(['Kênh bán hàng', 'Doanh thu', 'Tỷ lệ', 'So KH', 'Trạng thái'], true)}
      </thead>
      <tbody>
        ${TABLE_ROW(['Trực tiếp', '1.8 tỷ', '43%', '+22%', '✅ Đạt'], false, false)}
        ${TABLE_ROW(['Online / Digital', '1.2 tỷ', '29%', '+35%', '✅ Vượt'], false, true)}
        ${TABLE_ROW(['Đại lý', '780 triệu', '18%', '+8%', '⚠️ Dưới KH'], false, false)}
        ${TABLE_ROW(['Xuất khẩu', '420 triệu', '10%', '+12%', '✅ Đạt'], false, true)}
      </tbody>
    </table>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:36px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Tài liệu nội bộ — Không phát tán bên ngoài</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Trang 1 / 1 · Phòng Kinh doanh · 2025</p>
</div>

</div>`,
  })

  // ── 2. Báo cáo phân tích thị trường ──────────────────────────────────────
  bm.add('tpl-report-market', {
    label: 'Phân tích thị trường',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="4" height="12" rx="1" fill="#4f46e5" opacity=".9"/><rect x="12" y="15" width="4" height="8" rx="1" fill="#4f46e5" opacity=".7"/><rect x="18" y="13" width="4" height="10" rx="1" fill="#4f46e5" opacity=".5"/><rect x="6" y="26" width="20" height="2" rx="1" fill="#e2e8f0"/><rect x="6" y="30" width="14" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="background:linear-gradient(135deg,#1e3a5f 0%,#1e40af 100%);border-radius:16px;padding:32px;margin-bottom:32px;color:#fff;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin:0 0 8px;${F}">PHÂN TÍCH THỊ TRƯỜNG</p>
  <h1 style="font-size:clamp(20px,4vw,30px);font-weight:800;margin:0 0 10px;${F}">Báo cáo Phân tích Thị trường Q2/2025</h1>
  <p style="font-size:14px;color:rgba(255,255,255,0.75);margin:0;${F}">Ngành: Công nghệ phần mềm · Thị trường: Việt Nam · Cập nhật: 27/06/2025</p>
</div>

<!-- KPI OVERVIEW -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:28px;">
  ${KPI_CARD('Quy mô thị trường', '$2.4 tỷ', '+21%', true, '#4f46e5')}
  ${KPI_CARD('Thị phần của ta', '12.3%', '+2.1%', true, '#10b981')}
  ${KPI_CARD('Số đối thủ chính', '8', '+1', false, '#ef4444')}
  ${KPI_CARD('NPS trung bình', '67', '+5 pts', true, '#f59e0b')}
</div>

<!-- BAR CHART: Thị phần -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">📊 Thị phần theo đối thủ</h2>
  ${BAR('Công ty A (ta)', 65, '12.3%')}
  ${BAR('Đối thủ B', 52, '9.8%')}
  ${BAR('Đối thủ C', 45, '8.5%')}
  ${BAR('Đối thủ D', 38, '7.1%')}
  ${BAR('Khác', 74, '62.3%')}
</div>

<!-- SWOT -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">🔍 Phân tích SWOT</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
    <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#15803d;margin:0 0 10px;${F}">💪 Điểm mạnh</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#166534;line-height:1.7;${F}"><li>Thương hiệu được nhận diện tốt</li><li>Đội ngũ kỹ thuật mạnh</li><li>Khách hàng trung thành cao</li></ul>
    </div>
    <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#dc2626;margin:0 0 10px;${F}">⚠️ Điểm yếu</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#991b1b;line-height:1.7;${F}"><li>Chi phí vận hành còn cao</li><li>Thiếu nhân sự marketing</li><li>Sản phẩm chưa đa dạng</li></ul>
    </div>
    <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 10px;${F}">🚀 Cơ hội</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#1e40af;line-height:1.7;${F}"><li>Thị trường B2B đang tăng trưởng</li><li>Nhu cầu chuyển đổi số cao</li><li>Mở rộng sang SEA</li></ul>
    </div>
    <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:18px;">
      <p style="font-size:13px;font-weight:700;color:#d97706;margin:0 0 10px;${F}">🛡️ Thách thức</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;color:#92400e;line-height:1.7;${F}"><li>Cạnh tranh giá ngày càng gay gắt</li><li>Biến động tỷ giá USD</li><li>Đối thủ nước ngoài thâm nhập</li></ul>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Báo cáo phân tích thị trường — Tháng 6/2025</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Phòng Chiến lược · Intelligate</p>
</div>

</div>`,
  })

  // ── 3. Báo cáo hiệu suất Marketing ───────────────────────────────────────
  bm.add('tpl-report-marketing', {
    label: 'Báo cáo Marketing',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><circle cx="16" cy="20" r="10" fill="none" stroke="#4f46e5" stroke-width="1.5"/><path d="M16 10 A10 10 0 0 1 26 20" stroke="#818cf8" stroke-width="3" fill="none"/><path d="M26 20 A10 10 0 0 1 16 30" stroke="#4f46e5" stroke-width="3" fill="none"/><circle cx="16" cy="20" r="4" fill="#4f46e5"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #4f46e5;">
  <div>
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin:0 0 6px;${F}">MARKETING PERFORMANCE REPORT</p>
    <h1 style="font-size:clamp(20px,4vw,30px);font-weight:800;color:#0f172a;margin:0 0 6px;${F}">Hiệu suất Marketing Tháng 6/2025</h1>
    <p style="font-size:14px;color:#64748b;margin:0;${F}">Phòng Marketing · Chu kỳ: 01/06 – 30/06/2025</p>
  </div>
</div>

<!-- KPI CARDS -->
<div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:28px;">
  ${KPI_CARD('Tổng lượt tiếp cận', '2.8M', '+34%', true, '#4f46e5')}
  ${KPI_CARD('Tỷ lệ tương tác', '5.2%', '+1.1%', true, '#10b981')}
  ${KPI_CARD('Chi phí / Lead', '85K', '-12%', true, '#10b981')}
  ${KPI_CARD('ROI tổng', '340%', '+28%', true, '#f59e0b')}
</div>

<!-- KÊNH MARKETING: PROGRESS BARS -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">📈 Hiệu suất theo kênh</h2>
  ${PROGRESS_ROW('Facebook Ads', 88, '88% KH', '#4f46e5')}
  ${PROGRESS_ROW('Google Ads', 72, '72% KH', '#1d4ed8')}
  ${PROGRESS_ROW('TikTok Ads', 95, '95% KH', '#7c3aed')}
  ${PROGRESS_ROW('Email Marketing', 61, '61% KH', '#0891b2')}
  ${PROGRESS_ROW('SEO Organic', 45, '45% KH', '#059669')}
</div>

<!-- BẢNG CHI TIẾT -->
<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <div style="padding:20px 24px 16px;">
    <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0;${F}">💰 Chi tiết ngân sách & ROI</h2>
  </div>
  <div style="overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        ${TABLE_ROW(['Kênh', 'Ngân sách', 'Doanh thu', 'Leads', 'ROI'], true)}
      </thead>
      <tbody>
        ${TABLE_ROW(['Facebook Ads', '120M', '520M', '1,240', '333%'], false, false)}
        ${TABLE_ROW(['Google Ads', '85M', '380M', '890', '347%'], false, true)}
        ${TABLE_ROW(['TikTok Ads', '60M', '270M', '620', '350%'], false, false)}
        ${TABLE_ROW(['Email', '15M', '95M', '280', '533%'], false, true)}
      </tbody>
    </table>
  </div>
</div>

<!-- NHẬN XÉT -->
<div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:14px;padding:24px;margin-bottom:28px;">
  <h2 style="font-size:15px;font-weight:800;color:#1d4ed8;margin:0 0 12px;${F}">💡 Nhận xét & Đề xuất</h2>
  <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;">
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• TikTok Ads có ROI cao nhất (350%), nên tăng ngân sách 30% trong tháng 7</li>
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• Email Marketing đạt ROI 533% với chi phí thấp — tối ưu automation flow</li>
    <li style="font-size:14px;color:#1e40af;line-height:1.65;${F}">• SEO Organic cần thêm 2–3 tháng để thấy kết quả rõ ràng hơn</li>
  </ul>
</div>

<!-- FOOTER -->
<div style="margin-top:16px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Marketing Report · Tháng 6/2025 · Nội bộ</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Phòng Marketing · Intelligate</p>
</div>

</div>`,
  })

  // ── 4. Báo cáo dự án ─────────────────────────────────────────────────────
  bm.add('tpl-report-project', {
    label: 'Báo cáo dự án',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="6" y="5" width="20" height="3" rx="1.5" fill="#1e3a5f"/><rect x="6" y="11" width="20" height="2" rx="1" fill="#4f46e5" opacity=".3"/><rect x="6" y="15" width="14" height="2" rx="1" fill="#4f46e5" opacity=".7"/><rect x="6" y="19" width="18" height="2" rx="1" fill="#4f46e5" opacity=".5"/><rect x="6" y="23" width="10" height="2" rx="1" fill="#4f46e5" opacity=".9"/><rect x="6" y="29" width="20" height="2" rx="1" fill="#e2e8f0"/></svg>`,
    content: `<div style="max-width:900px;margin:0 auto;padding:48px 32px;background:#f8fafc;${F}">

<!-- HEADER -->
<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:16px;padding:32px;margin-bottom:32px;color:#fff;">
  <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 8px;${F}">BÁO CÁO TIẾN ĐỘ DỰ ÁN</p>
  <h1 style="font-size:clamp(20px,4vw,28px);font-weight:800;margin:0 0 12px;${F}">Dự án: Hệ thống Quản lý Nội bộ v2.0</h1>
  <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:16px;">
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">NGÀY BẮT ĐẦU</p><p style="font-size:14px;font-weight:700;margin:0;${F}">01/04/2025</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">DỰ KIẾN XONG</p><p style="font-size:14px;font-weight:700;margin:0;${F}">30/09/2025</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">TRẠNG THÁI</p><p style="font-size:14px;font-weight:700;color:#4ade80;margin:0;${F}">Đúng tiến độ</p></div>
    <div><p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 2px;${F}">HOÀN THÀNH</p><p style="font-size:14px;font-weight:700;margin:0;${F}">52%</p></div>
  </div>
</div>

<!-- OVERALL PROGRESS -->
<div style="background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
  <h2 style="font-size:16px;font-weight:800;color:#0f172a;margin:0 0 20px;${F}">🎯 Tiến độ tổng thể — 52%</h2>
  <div style="background:#f1f5f9;border-radius:9999px;height:12px;overflow:hidden;margin-bottom:24px;">
    <div style="width:52%;height:100%;background:linear-gradient(90deg,#4f46e5,#7c3aed);border-radius:9999px;"></div>
  </div>
  ${PROGRESS_ROW('Giai đoạn 1: Phân tích yêu cầu', 100, 'Hoàn thành', '#10b981')}
  ${PROGRESS_ROW('Giai đoạn 2: Thiết kế hệ thống', 100, 'Hoàn thành', '#10b981')}
  ${PROGRESS_ROW('Giai đoạn 3: Lập trình backend', 75, 'Đang tiến hành', '#4f46e5')}
  ${PROGRESS_ROW('Giai đoạn 4: Lập trình frontend', 40, 'Đang tiến hành', '#f59e0b')}
  ${PROGRESS_ROW('Giai đoạn 5: Kiểm thử (QA)', 0, 'Chưa bắt đầu', '#94a3b8')}
  ${PROGRESS_ROW('Giai đoạn 6: Deploy & Training', 0, 'Chưa bắt đầu', '#94a3b8')}
</div>

<!-- ISSUES & RISKS -->
<div style="display:flex;flex-wrap:wrap;gap:20px;margin-bottom:28px;">
  <div style="flex:1;min-width:240px;background:#fef2f2;border:1.5px solid #fecaca;border-radius:14px;padding:22px;">
    <h3 style="font-size:14px;font-weight:800;color:#dc2626;margin:0 0 12px;${F}">🚨 Rủi ro cần lưu ý</h3>
    <ul style="margin:0;padding-left:16px;font-size:13px;color:#991b1b;line-height:1.8;${F}">
      <li>API bên thứ 3 chưa ổn định</li>
      <li>Thiếu 1 senior developer</li>
      <li>Nguy cơ trễ deadline 2 tuần</li>
    </ul>
  </div>
  <div style="flex:1;min-width:240px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:14px;padding:22px;">
    <h3 style="font-size:14px;font-weight:800;color:#15803d;margin:0 0 12px;${F}">✅ Thành tựu đạt được</h3>
    <ul style="margin:0;padding-left:16px;font-size:13px;color:#166534;line-height:1.8;${F}">
      <li>Đúng ngân sách, không phát sinh</li>
      <li>Stakeholder hài lòng với thiết kế</li>
      <li>Unit test coverage đạt 85%</li>
    </ul>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:16px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">Project Status Report · 27/06/2025</p>
  <p style="font-size:12px;color:#94a3b8;margin:0;${F}">PM: Nguyễn Văn A · Intelligate</p>
</div>

</div>`,
  })
}
