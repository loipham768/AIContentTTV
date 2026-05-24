import type { Editor } from 'grapesjs'

const FONT = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const H1   = `font-size:52px;font-weight:800;letter-spacing:-0.025em;line-height:1.15;margin:0;color:#0f172a;${FONT}`
const H2   = `font-size:36px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;margin:0;color:#0f172a;${FONT}`
const H3   = `font-size:20px;font-weight:700;line-height:1.3;margin:0;color:#0f172a;${FONT}`
const BODY = `font-size:15px;color:#475569;line-height:1.7;margin:0;${FONT}`
const COL  = `flex:1;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;`

export function registerBlocks(editor: Editor) {
  const bm = editor.BlockManager

  // ── Bố cục ──────────────────────────────────────────────────────────────
  bm.add('section', {
    label: 'Khung',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/></svg>`,
    content: `<section style="padding:56px 24px;width:100%;box-sizing:border-box;background:#ffffff;"><div style="max-width:1200px;margin:0 auto;min-height:48px;"></div></section>`,
  })

  bm.add('1-col', {
    label: '1 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>`,
    content: `<div style="${COL}"></div>`,
  })

  bm.add('2-col', {
    label: '2 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="9" height="18" rx="1"/><rect x="13" y="3" width="9" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('3-col', {
    label: '3 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('4-col', {
    label: '4 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="4" height="16" rx="1"/><rect x="7" y="4" width="4" height="16" rx="1"/><rect x="13" y="4" width="4" height="16" rx="1"/><rect x="19" y="4" width="4" height="16" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:12px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('col-70-30', {
    label: '70/30',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="12" height="18" rx="1"/><rect x="16" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:7;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;"></div>
  <div style="flex:3;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;"></div>
</div>`,
  })

  // ── Cơ bản ──────────────────────────────────────────────────────────────
  bm.add('text', {
    label: 'Văn bản',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h10"/></svg>`,
    content: `<p style="${BODY}margin:0;">Nhập văn bản của bạn vào đây. Bấm để chỉnh sửa nội dung.</p>`,
  })

  bm.add('heading', {
    label: 'Tiêu đề',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h2m12 0h2M10 6v12M4 12h16M4 18h2m12 0h2"/></svg>`,
    content: `<h2 style="${H2}">Tiêu đề của bạn</h2>`,
  })

  bm.add('heading-sm', {
    label: 'Tiêu đề nhỏ',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h2m12 0h2M10 7v10M4 12h16"/></svg>`,
    content: `<h3 style="${H3}">Tiêu đề phụ</h3>`,
  })

  bm.add('image', {
    label: 'Hình ảnh',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    content: `<img src="https://placehold.co/800x420/e0e7ff/6366f1?text=Hình+ảnh" alt="Hình ảnh" style="max-width:100%;height:auto;display:block;border-radius:14px;"/>`,
    attributes: { class: 'gjs-block-image' },
  })

  bm.add('button', {
    label: 'Nút bấm',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="5"/><path d="M8 12h8"/></svg>`,
    content: `<a href="#" style="display:inline-block;padding:13px 30px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;letter-spacing:0.01em;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Nút bấm</a>`,
  })

  bm.add('divider', {
    label: 'Đường kẻ',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>`,
    content: `<hr style="border:none;border-top:1.5px solid #e2e8f0;margin:32px 0;"/>`,
  })

  bm.add('spacer', {
    label: 'Khoảng trống',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
    content: `<div style="height:56px;"></div>`,
  })

  bm.add('list', {
    label: 'Danh sách',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>`,
    content: `<ul style="list-style:none;padding:0;margin:0;${FONT}">
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    Điểm nổi bật thứ nhất
  </li>
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    Điểm nổi bật thứ hai
  </li>
  <li style="display:flex;align-items:center;gap:10px;padding:10px 0;font-size:15px;color:#334155;">
    <span style="width:22px;height:22px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">✓</span>
    Điểm nổi bật thứ ba
  </li>
</ul>`,
  })

  // ── Marketing ───────────────────────────────────────────────────────────
  bm.add('hero', {
    label: 'Hero',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 10h10M7 14h6"/></svg>`,
    content: `<section style="background:linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#4f46e5 75%,#7c3aed 100%);padding:88px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(255,255,255,0.14) 0%,transparent 65%);pointer-events:none;"></div>
  <div style="position:absolute;top:10%;right:8%;width:180px;height:180px;background:rgba(167,139,250,0.15);border-radius:50%;filter:blur(48px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:10%;left:6%;width:140px;height:140px;background:rgba(99,102,241,0.2);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;max-width:680px;margin:0 auto;">
    <span style="display:inline-block;padding:6px 18px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:9999px;font-size:13px;font-weight:500;margin-bottom:24px;letter-spacing:0.04em;">🚀 Ra mắt phiên bản mới</span>
    <h1 style="${H1}color:#fff;margin:0 0 20px;font-size:52px;">Tiêu đề ấn tượng</h1>
    <p style="font-size:18px;line-height:1.75;color:rgba(255,255,255,0.82);margin:0 0 40px;max-width:520px;margin-left:auto;margin-right:auto;${FONT}">Mô tả ngắn gọn và cuốn hút về sản phẩm hoặc dịch vụ để thu hút khách hàng</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="#" style="display:inline-block;padding:14px 34px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 6px 20px rgba(0,0,0,0.2);${FONT}">Bắt đầu ngay</a>
      <a href="#" style="display:inline-block;padding:14px 34px;border:2px solid rgba(255,255,255,0.45);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;${FONT}">Tìm hiểu thêm →</a>
    </div>
  </div>
</section>`,
  })

  bm.add('features', {
    label: 'Tính năng',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:56px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Tính năng</span>
      <h2 style="${H2}margin-bottom:14px;">Tại sao chọn chúng tôi?</h2>
      <p style="${BODY}max-width:460px;margin:0 auto;">Những tính năng được thiết kế để giúp bạn làm việc hiệu quả và tạo ra kết quả tốt nhất</p>
    </div>
    <div style="display:flex;gap:20px;">
      <div style="flex:1;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">⚡</div>
        <h3 style="${H3}margin-bottom:10px;">Nhanh chóng</h3>
        <p style="${BODY}font-size:14px;">Mô tả tính năng đầu tiên một cách ngắn gọn và súc tích để người dùng hiểu ngay</p>
      </div>
      <div style="flex:1;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#e0e7ff,#c7d2fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">🎯</div>
        <h3 style="${H3}margin-bottom:10px;">Chính xác</h3>
        <p style="${BODY}font-size:14px;">Mô tả tính năng thứ hai một cách ngắn gọn và súc tích để người dùng hiểu ngay</p>
      </div>
      <div style="flex:1;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">🔒</div>
        <h3 style="${H3}margin-bottom:10px;">An toàn</h3>
        <p style="${BODY}font-size:14px;">Mô tả tính năng thứ ba một cách ngắn gọn và súc tích để người dùng hiểu ngay</p>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('cta', {
    label: 'Kêu gọi',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09"/></svg>`,
    content: `<section style="background:linear-gradient(135deg,#312e81 0%,#4f46e5 50%,#7c3aed 100%);padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(167,139,250,0.25) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:relative;max-width:580px;margin:0 auto;">
    <h2 style="font-size:40px;font-weight:800;margin:0 0 16px;line-height:1.2;letter-spacing:-0.02em;${FONT}">Sẵn sàng bắt đầu?</h2>
    <p style="font-size:17px;margin:0 0 40px;color:rgba(255,255,255,0.8);line-height:1.7;${FONT}">Đăng ký miễn phí ngay hôm nay và trải nghiệm sự khác biệt mà chúng tôi mang lại</p>
    <a href="#" style="display:inline-block;padding:15px 42px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 6px 20px rgba(0,0,0,0.2);${FONT}">Đăng ký miễn phí</a>
  </div>
</section>`,
  })

  bm.add('card', {
    label: 'Thẻ sản phẩm',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`,
    content: `<div style="background:#fff;border-radius:18px;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 12px 32px rgba(79,70,229,0.09);overflow:hidden;max-width:320px;${FONT}">
  <div style="position:relative;overflow:hidden;">
    <img src="https://placehold.co/320x200/e0e7ff/6366f1?text=Hình+ảnh" alt="" style="width:100%;height:200px;object-fit:cover;display:block;"/>
    <span style="position:absolute;top:12px;left:12px;padding:4px 12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border-radius:9999px;font-size:12px;font-weight:600;">Mới</span>
  </div>
  <div style="padding:22px;">
    <h3 style="${H3}margin-bottom:8px;font-size:17px;">Tên sản phẩm</h3>
    <p style="${BODY}font-size:14px;margin-bottom:18px;">Mô tả ngắn về sản phẩm hoặc dịch vụ của bạn một cách hấp dẫn</p>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:22px;font-weight:800;color:#4f46e5;${FONT}">299.000đ</span>
      <a href="#" style="padding:9px 20px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;${FONT}">Mua ngay</a>
    </div>
  </div>
</div>`,
  })

  bm.add('testimonial', {
    label: 'Đánh giá',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    content: `<div style="background:#fff;border-radius:18px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 32px rgba(79,70,229,0.08);max-width:600px;position:relative;${FONT}">
  <div style="position:absolute;top:28px;right:28px;font-size:48px;line-height:1;color:#e0e7ff;font-family:Georgia,serif;">"</div>
  <div style="display:flex;gap:4px;margin-bottom:16px;">
    <span style="color:#f59e0b;font-size:18px;">★★★★★</span>
  </div>
  <p style="font-size:16px;color:#334155;line-height:1.8;margin:0 0 24px;font-style:italic;">"Sản phẩm tuyệt vời! Đã giúp tôi tiết kiệm rất nhiều thời gian. Tôi hoàn toàn hài lòng và chắc chắn sẽ tiếp tục sử dụng dài lâu."</p>
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:48px;height:48px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;color:#fff;display:inline-block;line-height:48px;text-align:center;font-weight:700;font-size:18px;flex-shrink:0;">N</div>
    <div>
      <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:2px;${FONT}">Nguyễn Văn An</div>
      <div style="font-size:13px;color:#94a3b8;${FONT}">Giám đốc, Công ty ABC</div>
    </div>
  </div>
</div>`,
  })

  bm.add('pricing', {
    label: 'Bảng giá',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    content: `<div style="display:flex;gap:20px;max-width:860px;margin:0 auto;padding:24px;box-sizing:border-box;${FONT}">
  <div style="flex:1;border:1.5px solid #e2e8f0;border-radius:18px;padding:32px 24px;text-align:center;background:#fff;">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 12px;">Cơ bản</p>
    <div style="font-size:42px;font-weight:800;color:#0f172a;margin:0 0 4px;letter-spacing:-0.02em;${FONT}">199k</div>
    <p style="font-size:14px;color:#94a3b8;margin:0 0 24px;">/tháng</p>
    <a href="#" style="display:block;padding:12px;background:#f1f5f9;color:#475569;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;margin-bottom:28px;${FONT}">Bắt đầu</a>
    <ul style="list-style:none;padding:0;margin:0;text-align:left;font-size:14px;color:#475569;line-height:1;">
      <li style="padding:9px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng A</li>
      <li style="padding:9px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng B</li>
      <li style="padding:9px 0;display:flex;align-items:center;gap:8px;"><span style="color:#cbd5e1;font-size:16px;">✗</span> <span style="color:#cbd5e1;">Tính năng C</span></li>
    </ul>
  </div>
  <div style="flex:1;border:2px solid #4f46e5;border-radius:18px;padding:32px 24px;text-align:center;background:linear-gradient(160deg,#faf5ff,#eef2ff);position:relative;">
    <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 16px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#fff;border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.05em;white-space:nowrap;${FONT}">★ Phổ biến nhất</span>
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6d28d9;margin:0 0 12px;">Pro</p>
    <div style="font-size:42px;font-weight:800;color:#0f172a;margin:0 0 4px;letter-spacing:-0.02em;${FONT}">499k</div>
    <p style="font-size:14px;color:#94a3b8;margin:0 0 24px;">/tháng</p>
    <a href="#" style="display:block;padding:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin-bottom:28px;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Chọn ngay</a>
    <ul style="list-style:none;padding:0;margin:0;text-align:left;font-size:14px;color:#475569;line-height:1;">
      <li style="padding:9px 0;border-bottom:1px solid #ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng A</li>
      <li style="padding:9px 0;border-bottom:1px solid #ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng B</li>
      <li style="padding:9px 0;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng C</li>
    </ul>
  </div>
</div>`,
  })

  // ── Media ───────────────────────────────────────────────────────────────
  bm.add('video', {
    label: 'Video',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    content: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:100%;border-radius:14px;background:#0f172a;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>`,
  })

  bm.add('badge', {
    label: 'Nhãn',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    content: `<span style="display:inline-block;padding:5px 16px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);color:#5b21b6;border-radius:9999px;font-size:13px;font-weight:600;${FONT}">✨ Nhãn mới</span>`,
  })

  bm.add('icon-text', {
    label: 'Icon + Nội dung',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><path d="M15 6a6 6 0 010 12M22 12h-7"/></svg>`,
    content: `<div style="display:flex;align-items:flex-start;gap:18px;padding:20px;${FONT}">
  <div style="width:52px;height:52px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;color:#fff;display:inline-block;line-height:52px;text-align:center;font-size:24px;flex-shrink:0;">✓</div>
  <div>
    <h4 style="${H3}font-size:16px;margin-bottom:6px;">Tiêu đề điểm nổi bật</h4>
    <p style="${BODY}font-size:14px;">Mô tả ngắn gọn về điểm nổi bật này của sản phẩm hoặc dịch vụ của bạn</p>
  </div>
</div>`,
  })

  bm.add('map', {
    label: 'Bản đồ',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    content: `<div style="width:100%;height:360px;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125418.4534827254!2d106.62873!3d10.8230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVHAuIEhDTQ!5e0!3m2!1svi!2svn!4v1635000000000" style="width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>
</div>`,
  })
}
