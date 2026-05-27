import type { Editor } from 'grapesjs'

const FONT = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const H1   = `font-size:clamp(32px,7vw,52px);font-weight:800;letter-spacing:-0.025em;line-height:1.15;margin:0;color:#0f172a;${FONT}`
const H2   = `font-size:clamp(26px,5vw,36px);font-weight:800;letter-spacing:-0.02em;line-height:1.2;margin:0;color:#0f172a;${FONT}`
const H3   = `font-size:20px;font-weight:700;line-height:1.3;margin:0;color:#0f172a;${FONT}`
const BODY = `font-size:15px;color:#475569;line-height:1.7;margin:0;${FONT}`
const COL  = `flex:1;min-width:160px;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;`

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
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('3-col', {
    label: '3 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="${COL}"></div>
  <div style="${COL}"></div>
  <div style="${COL}"></div>
</div>`,
  })

  bm.add('4-col', {
    label: '4 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="4" height="16" rx="1"/><rect x="7" y="4" width="4" height="16" rx="1"/><rect x="13" y="4" width="4" height="16" rx="1"/><rect x="19" y="4" width="4" height="16" rx="1"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;gap:12px;width:100%;box-sizing:border-box;">
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
    content: `<div style="display:flex;flex-wrap:wrap;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:7;min-width:240px;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;"></div>
  <div style="flex:3;min-width:140px;padding:20px;min-height:72px;background:rgba(241,245,249,0.8);border-radius:10px;border:1.5px dashed #cbd5e1;box-sizing:border-box;"></div>
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
    content: `<a href="#" style="display:inline-block;padding:13px 30px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;letter-spacing:0.01em;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Nút bấm</a>`,
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

  bm.add('announcement', {
    label: 'Thông báo',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    content: `<div style="background-color:#4f46e5;padding:12px 24px;width:100%;box-sizing:border-box;${FONT}">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;">
    <span style="color:rgba(255,255,255,0.9);font-size:14px;text-align:center;">🎉 Ưu đãi đặc biệt — Giảm <strong style="color:#fff;">20%</strong> cho khách hàng mới. Kết thúc ngày 31/12!</span>
    <a href="#" style="display:inline-block;padding:4px 14px;background:rgba(255,255,255,0.18);color:#fff;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,0.35);white-space:nowrap;">Đặt ngay →</a>
  </div>
</div>`,
  })

  // ── Marketing ───────────────────────────────────────────────────────────
  bm.add('hero', {
    label: 'Hero',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 10h10M7 14h6"/></svg>`,
    content: `<section style="background-color:#1e1b4b;padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(255,255,255,0.14) 0%,transparent 65%);pointer-events:none;"></div>
  <div style="position:absolute;top:10%;right:8%;width:180px;height:180px;background:rgba(167,139,250,0.15);border-radius:50%;filter:blur(48px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:10%;left:6%;width:140px;height:140px;background:rgba(99,102,241,0.2);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;max-width:680px;margin:0 auto;">
    <span style="display:inline-block;padding:6px 18px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:9999px;font-size:13px;font-weight:500;margin-bottom:24px;letter-spacing:0.04em;">🚀 Ra mắt phiên bản mới</span>
    <h1 style="${H1}color:#fff;margin:0 0 20px;">Tiêu đề ấn tượng</h1>
    <p style="font-size:clamp(15px,3vw,18px);line-height:1.75;color:rgba(255,255,255,0.82);margin:0 0 40px;max-width:520px;margin-left:auto;margin-right:auto;${FONT}">Mô tả ngắn gọn và cuốn hút về sản phẩm hoặc dịch vụ để thu hút khách hàng</p>
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
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">⚡</div>
        <h3 style="${H3}margin-bottom:10px;">Nhanh chóng</h3>
        <p style="${BODY}font-size:14px;">Mô tả tính năng đầu tiên một cách ngắn gọn và súc tích để người dùng hiểu ngay</p>
      </div>
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#e0e7ff,#c7d2fe);border-radius:16px;display:inline-block;line-height:60px;font-size:28px;margin-bottom:20px;">🎯</div>
        <h3 style="${H3}margin-bottom:10px;">Chính xác</h3>
        <p style="${BODY}font-size:14px;">Mô tả tính năng thứ hai một cách ngắn gọn và súc tích để người dùng hiểu ngay</p>
      </div>
      <div style="flex:1;min-width:220px;text-align:center;padding:32px 24px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.05),0 6px 24px rgba(79,70,229,0.07);">
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
    content: `<section style="background-color:#312e81;padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(167,139,250,0.25) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:relative;max-width:580px;margin:0 auto;">
    <h2 style="font-size:clamp(28px,6vw,40px);font-weight:800;margin:0 0 16px;line-height:1.2;letter-spacing:-0.02em;${FONT}">Sẵn sàng bắt đầu?</h2>
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
    <span style="position:absolute;top:12px;left:12px;padding:4px 12px;background-color:#4f46e5;color:#fff;border-radius:9999px;font-size:12px;font-weight:600;">Mới</span>
  </div>
  <div style="padding:22px;">
    <h3 style="${H3}margin-bottom:8px;font-size:17px;">Tên sản phẩm</h3>
    <p style="${BODY}font-size:14px;margin-bottom:18px;">Mô tả ngắn về sản phẩm hoặc dịch vụ của bạn một cách hấp dẫn</p>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <span style="font-size:22px;font-weight:800;color:#4f46e5;${FONT}">299.000đ</span>
      <a href="#" style="padding:9px 20px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;${FONT}">Mua ngay</a>
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
  <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
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
    content: `<div style="display:flex;flex-wrap:wrap;gap:20px;max-width:860px;margin:0 auto;padding:24px;box-sizing:border-box;${FONT}">
  <div style="flex:1;min-width:260px;border:1.5px solid #e2e8f0;border-radius:18px;padding:32px 24px;text-align:center;background:#fff;">
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
  <div style="flex:1;min-width:260px;border:2px solid #4f46e5;border-radius:18px;padding:32px 24px;text-align:center;background-color:#faf5ff;position:relative;">
    <span style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 16px;background-color:#f59e0b;color:#fff;border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:0.05em;white-space:nowrap;${FONT}">★ Phổ biến nhất</span>
    <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6d28d9;margin:0 0 12px;">Pro</p>
    <div style="font-size:42px;font-weight:800;color:#0f172a;margin:0 0 4px;letter-spacing:-0.02em;${FONT}">499k</div>
    <p style="font-size:14px;color:#94a3b8;margin:0 0 24px;">/tháng</p>
    <a href="#" style="display:block;padding:12px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin-bottom:28px;box-shadow:0 4px 12px rgba(79,70,229,0.35);${FONT}">Chọn ngay</a>
    <ul style="list-style:none;padding:0;margin:0;text-align:left;font-size:14px;color:#475569;line-height:1;">
      <li style="padding:9px 0;border-bottom:1px solid #ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng A</li>
      <li style="padding:9px 0;border-bottom:1px solid #ede9fe;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng B</li>
      <li style="padding:9px 0;display:flex;align-items:center;gap:8px;"><span style="color:#4f46e5;font-size:16px;">✓</span> Tính năng C</li>
    </ul>
  </div>
</div>`,
  })

  bm.add('service-table', {
    label: 'Bảng dịch vụ',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="1"/><path d="M2 9h20M2 15h20M8 3v18"/></svg>`,
    content: `<div style="width:100%;box-sizing:border-box;padding:40px 24px;background:#f8fafc;${FONT}">
  <div style="max-width:900px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:36px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;">Dịch vụ</span>
      <h2 style="${H2}margin-bottom:10px;">Bảng Giá Dịch Vụ</h2>
      <p style="${BODY}max-width:440px;margin:0 auto;">Chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
    </div>
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.08);">
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
        <table style="width:100%;min-width:560px;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);">
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:left;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Gói dịch vụ</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:left;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Bao gồm</th>
              <th style="background:transparent;color:rgba(255,255,255,0.85);padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Thời gian</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Giá</th>
              <th style="background:transparent;color:#fff;padding:16px 20px;text-align:center;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;border-width:0;border-style:solid;">Đặt ngay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:18px 20px;border-bottom:1px solid #f1f5f9;background:#fff;">
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Gói Cơ Bản</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">Phù hợp cá nhân</div>
              </td>
              <td style="padding:18px 20px;border-bottom:1px solid #f1f5f9;background:#fff;color:#475569;font-size:13px;line-height:1.6;">Tư vấn 1 lần · Hỗ trợ email · Tài liệu hướng dẫn</td>
              <td style="padding:18px 20px;border-bottom:1px solid #f1f5f9;background:#fff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">1–3 ngày</td>
              <td style="padding:18px 20px;border-bottom:1px solid #f1f5f9;background:#fff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">499k</div>
                <div style="font-size:11px;color:#94a3b8;">/lần</div>
              </td>
              <td style="padding:18px 20px;border-bottom:1px solid #f1f5f9;background:#fff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background:#f1f5f9;color:#475569;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;${FONT}">Chọn gói</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;border-bottom:1px solid #ede9fe;background:#faf5ff;position:relative;">
                <div style="display:inline-block;padding:2px 10px;background-color:#f59e0b;color:#fff;border-radius:9999px;font-size:10px;font-weight:700;letter-spacing:0.05em;margin-bottom:6px;${FONT}">★ Phổ biến</div>
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Gói Chuyên Nghiệp</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">Cho doanh nghiệp SME</div>
              </td>
              <td style="padding:18px 20px;border-bottom:1px solid #ede9fe;background:#faf5ff;color:#475569;font-size:13px;line-height:1.6;">Tư vấn không giới hạn · Hỗ trợ ưu tiên · Báo cáo hàng tháng · Tối ưu liên tục</td>
              <td style="padding:18px 20px;border-bottom:1px solid #ede9fe;background:#faf5ff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">3–7 ngày</td>
              <td style="padding:18px 20px;border-bottom:1px solid #ede9fe;background:#faf5ff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">1.299k</div>
                <div style="font-size:11px;color:#94a3b8;">/tháng</div>
              </td>
              <td style="padding:18px 20px;border-bottom:1px solid #ede9fe;background:#faf5ff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 3px 10px rgba(79,70,229,0.35);white-space:nowrap;${FONT}">Chọn gói</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;background:#fff;">
                <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:4px;${FONT}">Gói Doanh Nghiệp</div>
                <div style="font-size:12px;color:#94a3b8;${FONT}">Giải pháp toàn diện</div>
              </td>
              <td style="padding:18px 20px;background:#fff;color:#475569;font-size:13px;line-height:1.6;">Tất cả tính năng Pro · Quản lý tài khoản riêng · SLA cam kết · Tùy chỉnh theo yêu cầu</td>
              <td style="padding:18px 20px;background:#fff;text-align:center;color:#64748b;font-size:13px;white-space:nowrap;">Thỏa thuận</td>
              <td style="padding:18px 20px;background:#fff;text-align:center;">
                <div style="font-size:20px;font-weight:800;color:#4f46e5;${FONT}">Liên hệ</div>
                <div style="font-size:11px;color:#94a3b8;">tùy nhu cầu</div>
              </td>
              <td style="padding:18px 20px;background:#fff;text-align:center;">
                <a href="#" style="display:inline-block;padding:8px 16px;background:#f1f5f9;color:#475569;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;${FONT}">Liên hệ</a>
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
    content: `<span style="display:inline-block;padding:5px 16px;background-color:#ede9fe;color:#5b21b6;border-radius:9999px;font-size:13px;font-weight:600;${FONT}">✨ Nhãn mới</span>`,
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

  // ── Landing page essentials ─────────────────────────────────────────────
  bm.add('stats', {
    label: 'Số liệu',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    content: `<section style="padding:64px 24px;background:#fff;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:880px;margin:0 auto;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#f0f4ff,#e8f0fe);border:1.5px solid #c7d2fe;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#4f46e5;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">10.000+</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Khách hàng tin dùng</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#fdf4ff,#fce7ff);border:1.5px solid #e9d5ff;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#7c3aed;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">98%</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Tỷ lệ hài lòng</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#f0fdf4,#dcfce7);border:1.5px solid #a7f3d0;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#059669;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">5 năm</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Kinh nghiệm hoạt động</div>
    </div>
    <div style="flex:1;min-width:160px;text-align:center;padding:32px 20px;border-radius:20px;background:linear-gradient(160deg,#fff7ed,#ffedd5);border:1.5px solid #fed7aa;">
      <div style="font-size:clamp(32px,6vw,44px);font-weight:800;color:#ea580c;letter-spacing:-0.03em;line-height:1;margin-bottom:8px;${FONT}">24/7</div>
      <div style="font-size:14px;font-weight:600;color:#475569;${FONT}">Hỗ trợ khách hàng</div>
    </div>
  </div>
</section>`,
  })

  bm.add('steps', {
    label: 'Quy trình',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/></svg>`,
    content: `<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:56px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Quy trình</span>
      <h2 style="${H2}margin-bottom:12px;">Chỉ 4 bước đơn giản</h2>
      <p style="${BODY}max-width:460px;margin:0 auto;">Từ lúc đăng ký đến khi nhận được kết quả — nhanh chóng và dễ dàng</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:0;">
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(79,70,229,0.35);${FONT}">1</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Đăng ký tài khoản</h3>
        <p style="${BODY}font-size:13px;">Tạo tài khoản miễn phí chỉ trong 30 giây</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#7c3aed,#9333ea);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(124,58,237,0.35);${FONT}">2</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Nhập thông tin</h3>
        <p style="${BODY}font-size:13px;">Điền đầy đủ thông tin theo hướng dẫn</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#9333ea,#db2777);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(147,51,234,0.35);${FONT}">3</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Xác nhận đơn hàng</h3>
        <p style="${BODY}font-size:13px;">Kiểm tra và xác nhận thông tin của bạn</p>
      </div>
      <div style="flex:1;min-width:180px;text-align:center;padding:0 20px 40px;">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#db2777,#f59e0b);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:20px;box-shadow:0 6px 18px rgba(219,39,119,0.3);${FONT}">4</div>
        <h3 style="${H3}font-size:16px;margin-bottom:8px;">Nhận kết quả</h3>
        <p style="${BODY}font-size:13px;">Tận hưởng dịch vụ ngay sau khi hoàn tất</p>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('faq', {
    label: 'Câu hỏi FAQ',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>`,
    content: `<section style="padding:80px 24px;background:#fff;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:720px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:48px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">FAQ</span>
      <h2 style="${H2}margin-bottom:12px;">Câu hỏi thường gặp</h2>
      <p style="${BODY}">Giải đáp những thắc mắc phổ biến nhất của khách hàng</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Dịch vụ của bạn có phù hợp với doanh nghiệp nhỏ không?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Có, chúng tôi thiết kế dịch vụ phù hợp với mọi quy mô doanh nghiệp. Gói Cơ Bản được tối ưu đặc biệt cho cá nhân và startup với chi phí hợp lý nhất.</div>
      </div>
      <div style="border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Tôi có thể hủy đăng ký bất cứ lúc nào không?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Hoàn toàn có thể. Không có hợp đồng ràng buộc dài hạn. Bạn có thể hủy bất cứ lúc nào trước ngày gia hạn mà không bị tính thêm phí.</div>
      </div>
      <div style="border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Thời gian triển khai mất bao lâu?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Thông thường từ 1 đến 3 ngày làm việc tùy gói dịch vụ. Gói Doanh Nghiệp với yêu cầu tùy chỉnh có thể mất thêm thời gian thỏa thuận.</div>
      </div>
      <div style="border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="padding:20px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span style="font-weight:600;color:#0f172a;font-size:15px;${FONT}">Có được dùng thử miễn phí không?</span>
            <span style="font-size:20px;color:#4f46e5;flex-shrink:0;font-weight:300;">+</span>
          </div>
        </div>
        <div style="padding:16px 20px;color:#475569;font-size:14px;line-height:1.7;${FONT}">Có! Chúng tôi cung cấp 14 ngày dùng thử miễn phí với đầy đủ tính năng. Không cần nhập thông tin thẻ tín dụng.</div>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('team', {
    label: 'Đội ngũ',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    content: `<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;${FONT}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">Đội ngũ</span>
      <h2 style="${H2}margin-bottom:12px;">Gặp gỡ đội ngũ của chúng tôi</h2>
      <p style="${BODY}max-width:440px;margin:0 auto;">Những chuyên gia tận tâm luôn sẵn sàng hỗ trợ bạn</p>
    </div>
    <div style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center;">
      <div style="flex:1;min-width:240px;max-width:300px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#e0e7ff,#ede9fe);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border:4px solid #fff;box-shadow:0 4px 16px rgba(79,70,229,0.3);${FONT}">N</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Nguyễn Minh Tuấn</div>
          <div style="font-size:13px;color:#7c3aed;font-weight:600;margin-bottom:10px;${FONT}">Giám đốc điều hành</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">10 năm kinh nghiệm trong lĩnh vực công nghệ và phát triển sản phẩm</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
      <div style="flex:1;min-width:240px;max-width:300px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#fce7ff,#fdf4ff);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border:4px solid #fff;box-shadow:0 4px 16px rgba(124,58,237,0.3);${FONT}">L</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Lê Thu Hương</div>
          <div style="font-size:13px;color:#7c3aed;font-weight:600;margin-bottom:10px;${FONT}">Trưởng phòng Marketing</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">Chuyên gia digital marketing với hơn 8 năm xây dựng thương hiệu</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
      <div style="flex:1;min-width:240px;max-width:300px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 8px 32px rgba(79,70,229,0.07);text-align:center;">
        <div style="height:180px;background:linear-gradient(160deg,#dcfce7,#f0fdf4);display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#059669,#10b981);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;border:4px solid #fff;box-shadow:0 4px 16px rgba(5,150,105,0.3);${FONT}">T</div>
        </div>
        <div style="padding:20px 16px;">
          <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:4px;${FONT}">Trần Đức Anh</div>
          <div style="font-size:13px;color:#059669;font-weight:600;margin-bottom:10px;${FONT}">Trưởng nhóm Kỹ thuật</div>
          <p style="${BODY}font-size:13px;margin-bottom:14px;">Kỹ sư phần mềm với niềm đam mê xây dựng sản phẩm có ích</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">in</a>
            <a href="#" style="display:inline-flex;width:32px;height:32px;background:#f1f5f9;border-radius:8px;align-items:center;justify-content:center;text-decoration:none;font-size:14px;">𝕏</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  })

  bm.add('gallery', {
    label: 'Thư viện ảnh',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    content: `<div style="padding:16px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
    <img src="https://placehold.co/400x300/e0e7ff/6366f1?text=Ảnh+1" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/ede9fe/7c3aed?text=Ảnh+2" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/fce7ff/db2777?text=Ảnh+3" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/dcfce7/059669?text=Ảnh+4" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/fff7ed/ea580c?text=Ảnh+5" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
    <img src="https://placehold.co/400x300/f0f9ff/0284c7?text=Ảnh+6" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;"/>
  </div>
</div>`,
  })

  bm.add('slider', {
    label: 'Slider',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M8 12h8M15 9l3 3-3 3"/></svg>`,
    content: (() => {
      // Unique prefix so anchor links work when multiple sliders appear on one page
      const sid = 's' + Math.random().toString(36).slice(2, 7)
      const SLIDE = `flex:0 0 100%;min-width:100%;scroll-snap-align:start;position:relative;`
      const OVERLAY = `position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);pointer-events:none;`
      const CAPTION = `position:absolute;bottom:52px;left:0;right:0;padding:0 32px;`
      const H3 = `font-size:clamp(18px,4vw,26px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.25;${FONT}`
      const P = `font-size:15px;color:rgba(255,255,255,0.82);margin:0;line-height:1.6;${FONT}`
      const DOT_ACTIVE = `display:block;width:28px;height:7px;background:rgba(255,255,255,0.95);border-radius:9999px;text-decoration:none;`
      const DOT_IDLE = `display:block;width:7px;height:7px;background:rgba(255,255,255,0.45);border-radius:50%;text-decoration:none;`
      return `<div style="width:100%;position:relative;border-radius:18px;background:#0f172a;overflow:hidden;${FONT}">
  <!-- scroll-snap track; padding-bottom+margin-bottom hides the horizontal scrollbar -->
  <div id="${sid}" style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;padding-bottom:20px;margin-bottom:-20px;">
    <div id="${sid}-1" style="${SLIDE}">
      <img src="https://placehold.co/900x480/e0e7ff/4f46e5?text=Slide+1" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${H3}">Tiêu đề slide 1</h3>
        <p style="${P}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
    <div id="${sid}-2" style="${SLIDE}">
      <img src="https://placehold.co/900x480/ede9fe/7c3aed?text=Slide+2" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${H3}">Tiêu đề slide 2</h3>
        <p style="${P}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
    <div id="${sid}-3" style="${SLIDE}">
      <img src="https://placehold.co/900x480/dcfce7/059669?text=Slide+3" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="${OVERLAY}"></div>
      <div style="${CAPTION}">
        <h3 style="${H3}">Tiêu đề slide 3</h3>
        <p style="${P}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
  </div>
  <!-- Dot navigation: anchor links scroll the snap container to the target slide -->
  <div style="position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:6px;z-index:10;">
    <a href="#${sid}-1" style="${DOT_ACTIVE}"></a>
    <a href="#${sid}-2" style="${DOT_IDLE}"></a>
    <a href="#${sid}-3" style="${DOT_IDLE}"></a>
  </div>
</div>`
    })(),
  })

  bm.add('table', {
    label: 'Bảng dữ liệu',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="1"/><path d="M2 9h20M2 15h20M8 3v18M14 3v18"/></svg>`,
    content: `<div style="width:100%;box-sizing:border-box;${FONT}">
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:14px;border:1.5px solid #e2e8f0;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
    <table style="width:100%;min-width:400px;border-collapse:collapse;font-size:14px;background:#fff;">
      <thead>
        <tr>
          <th style="padding:12px 16px;text-align:left;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background:#f8fafc;border-bottom:2px solid #e2e8f0;white-space:nowrap;">STT</th>
          <th style="padding:12px 16px;text-align:left;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background:#f8fafc;border-bottom:2px solid #e2e8f0;">Tên sản phẩm</th>
          <th style="padding:12px 16px;text-align:center;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background:#f8fafc;border-bottom:2px solid #e2e8f0;white-space:nowrap;">Số lượng</th>
          <th style="padding:12px 16px;text-align:right;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background:#f8fafc;border-bottom:2px solid #e2e8f0;white-space:nowrap;">Đơn giá</th>
          <th style="padding:12px 16px;text-align:right;font-weight:700;font-size:12px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;background:#f8fafc;border-bottom:2px solid #e2e8f0;white-space:nowrap;">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">1</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;border-bottom:1px solid #f1f5f9;">Sản phẩm A</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;border-bottom:1px solid #f1f5f9;">2</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;border-bottom:1px solid #f1f5f9;">250.000đ</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;border-bottom:1px solid #f1f5f9;">500.000đ</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;background:#f8fafc;border-bottom:1px solid #f1f5f9;">2</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;background:#f8fafc;border-bottom:1px solid #f1f5f9;">Sản phẩm B</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;background:#f8fafc;border-bottom:1px solid #f1f5f9;">1</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;background:#f8fafc;border-bottom:1px solid #f1f5f9;">480.000đ</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;background:#f8fafc;border-bottom:1px solid #f1f5f9;">480.000đ</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">3</td>
          <td style="padding:13px 16px;color:#0f172a;font-weight:500;border-bottom:1px solid #f1f5f9;">Sản phẩm C</td>
          <td style="padding:13px 16px;text-align:center;color:#334155;border-bottom:1px solid #f1f5f9;">3</td>
          <td style="padding:13px 16px;text-align:right;color:#334155;border-bottom:1px solid #f1f5f9;">120.000đ</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#4f46e5;border-bottom:1px solid #f1f5f9;">360.000đ</td>
        </tr>
        <tr>
          <td style="padding:13px 16px;text-align:right;font-weight:700;color:#0f172a;font-size:14px;background:#f8fafc;border-top:2px solid #e2e8f0;">Tổng</td>
          <td style="padding:13px 16px;background:#f8fafc;border-top:2px solid #e2e8f0;"></td>
          <td style="padding:13px 16px;background:#f8fafc;border-top:2px solid #e2e8f0;"></td>
          <td style="padding:13px 16px;background:#f8fafc;border-top:2px solid #e2e8f0;"></td>
          <td style="padding:13px 16px;text-align:right;font-weight:800;font-size:16px;color:#4f46e5;background:#f8fafc;border-top:2px solid #e2e8f0;">1.340.000đ</td>
        </tr>
      </tbody>
    </table>
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

  // ── SEO & Content ────────────────────────────────────────────────────────

  bm.add('h1-heading', {
    label: 'Tiêu đề H1',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h8M4 18h12"/><text x="14" y="19" font-size="8" fill="currentColor" stroke="none">H1</text></svg>`,
    content: `<h1 style="${H1}padding:8px 0;">Tiêu đề chính của trang (H1 — SEO quan trọng)</h1>`,
  })

  bm.add('blockquote', {
    label: 'Trích dẫn',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,
    content: `<blockquote style="margin:0;padding:24px 28px;border-left:4px solid #4f46e5;background:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:18px;font-style:italic;color:#3730a3;line-height:1.7;margin:0 0 12px;${FONT}">"Sản phẩm này đã thay đổi hoàn toàn cách chúng tôi làm việc. Kết quả vượt mọi kỳ vọng."</p>
  <footer style="${FONT}font-size:14px;color:#6d28d9;font-weight:600;">— Nguyễn Văn A, CEO tại Công ty XYZ</footer>
</blockquote>`,
  })

  bm.add('logo-cloud', {
    label: 'Logo đối tác',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>`,
    content: `<div style="padding:40px 24px;text-align:center;${FONT}">
  <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 28px;">Được tin dùng bởi</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:32px 40px;">
    <div style="padding:10px 20px;background:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND A</div>
    <div style="padding:10px 20px;background:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND B</div>
    <div style="padding:10px 20px;background:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND C</div>
    <div style="padding:10px 20px;background:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND D</div>
    <div style="padding:10px 20px;background:#f1f5f9;border-radius:8px;font-size:15px;font-weight:800;color:#64748b;letter-spacing:-0.02em;${FONT}">BRAND E</div>
  </div>
</div>`,
  })

  bm.add('image-text', {
    label: 'Ảnh + Nội dung',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="9" height="18" rx="1"/><rect x="13" y="3" width="9" height="4" rx="1"/><rect x="13" y="10" width="9" height="2" rx="1"/><rect x="13" y="15" width="6" height="2" rx="1"/></svg>`,
    content: `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:40px;padding:48px 24px;${FONT}">
  <div style="flex:1;min-width:280px;">
    <img src="https://placehold.co/520x380/e0e7ff/4f46e5?text=Hình+ảnh" alt="" style="width:100%;border-radius:16px;object-fit:cover;display:block;"/>
  </div>
  <div style="flex:1;min-width:280px;">
    <span style="display:inline-block;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f46e5;margin-bottom:14px;${FONT}">Tính năng nổi bật</span>
    <h2 style="${H2}margin-bottom:16px;">Tiêu đề mô tả lợi ích chính</h2>
    <p style="${BODY}margin-bottom:20px;">Mô tả chi tiết về tính năng hoặc lợi ích của sản phẩm/dịch vụ. Hãy tập trung vào giá trị thực mà khách hàng nhận được.</p>
    <ul style="list-style:none;padding:0;margin:0 0 28px;display:flex;flex-direction:column;gap:10px;">
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>Lợi ích thứ nhất rõ ràng</li>
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>Lợi ích thứ hai rõ ràng</li>
      <li style="display:flex;align-items:center;gap:10px;font-size:15px;color:#334155;${FONT}"><span style="width:20px;height:20px;background:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;font-weight:700;">✓</span>Lợi ích thứ ba rõ ràng</li>
    </ul>
    <a href="#" style="display:inline-block;padding:13px 28px;background:#4f46e5;color:#fff;font-weight:700;font-size:15px;border-radius:10px;text-decoration:none;${FONT}">Tìm hiểu thêm →</a>
  </div>
</div>`,
  })

  bm.add('contact-info', {
    label: 'Thông tin liên hệ',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.4 2 2 0 013.61 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.06 6.06l.97-.95a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    content: `<div style="padding:48px 24px;background:#f8fafc;${FONT}">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="${H2}text-align:center;margin-bottom:40px;">Liên hệ với chúng tôi</h2>
    <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">
      <div style="flex:1;min-width:200px;background:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">📍</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Địa chỉ</div>
        <div style="${BODY}text-align:center;">123 Đường ABC, Quận 1<br>TP. Hồ Chí Minh</div>
      </div>
      <div style="flex:1;min-width:200px;background:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">📞</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Điện thoại</div>
        <a href="tel:+84901234567" style="color:#4f46e5;text-decoration:none;font-weight:600;font-size:15px;${FONT}">0901 234 567</a>
      </div>
      <div style="flex:1;min-width:200px;background:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">✉️</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Email</div>
        <a href="mailto:hello@brand.vn" style="color:#4f46e5;text-decoration:none;font-weight:600;font-size:15px;${FONT}">hello@brand.vn</a>
      </div>
      <div style="flex:1;min-width:200px;background:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <div style="font-size:28px;margin-bottom:12px;">🕐</div>
        <div style="font-weight:700;color:#0f172a;margin-bottom:6px;${FONT}">Giờ làm việc</div>
        <div style="${BODY}text-align:center;">T2–T6: 8:00 – 17:30<br>T7: 8:00 – 12:00</div>
      </div>
    </div>
  </div>
</div>`,
  })

  bm.add('newsletter', {
    label: 'Đăng ký nhận tin',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    content: `<div style="padding:56px 24px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);text-align:center;${FONT}">
  <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin:0 0 12px;">Newsletter</p>
  <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#fff;margin:0 0 12px;line-height:1.2;${FONT}">Nhận ưu đãi & cập nhật mới nhất</h2>
  <p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0 0 32px;line-height:1.6;max-width:480px;display:inline-block;${FONT}">Đăng ký để nhận thông tin sản phẩm, khuyến mãi và nội dung hữu ích hàng tuần.</p>
  <form action="#" method="post" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:480px;margin:0 auto;">
    <input type="email" name="email" placeholder="Nhập email của bạn..." required style="flex:1;min-width:220px;padding:14px 18px;border-radius:10px;border:none;font-size:14px;outline:none;${FONT}"/>
    <button type="submit" style="padding:14px 24px;background:#fff;color:#4f46e5;font-weight:700;font-size:14px;border:none;border-radius:10px;cursor:pointer;white-space:nowrap;${FONT}">Đăng ký ngay</button>
  </form>
  <p style="font-size:12px;color:rgba(255,255,255,0.55);margin:16px 0 0;${FONT}">Không spam. Hủy đăng ký bất kỳ lúc nào.</p>
</div>`,
  })

  bm.add('social-links', {
    label: 'Mạng xã hội',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    content: `<div style="padding:32px 24px;text-align:center;${FONT}">
  <p style="${BODY}margin-bottom:20px;">Theo dõi chúng tôi trên mạng xã hội</p>
  <div style="display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;">
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:#1877f2;border-radius:50%;text-decoration:none;font-size:18px;">📘</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:linear-gradient(135deg,#f58529,#dd2a7b,#515bd4);border-radius:50%;text-decoration:none;font-size:18px;">📷</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:#000;border-radius:50%;text-decoration:none;font-size:18px;">🎵</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:#ff0000;border-radius:50%;text-decoration:none;font-size:18px;">▶️</a>
    <a href="#" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:#0a66c2;border-radius:50%;text-decoration:none;font-size:18px;">💼</a>
  </div>
</div>`,
  })

  bm.add('timeline', {
    label: 'Lịch sử / Timeline',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><line x1="12" y1="6" x2="18" y2="6"/><line x1="12" y1="12" x2="6" y2="12"/><line x1="12" y1="18" x2="18" y2="18"/></svg>`,
    content: `<div style="padding:48px 24px;${FONT}">
  <h2 style="${H2}text-align:center;margin-bottom:40px;">Hành trình của chúng tôi</h2>
  <div style="max-width:640px;margin:0 auto;position:relative;">
    <div style="position:absolute;left:20px;top:0;bottom:0;width:2px;background:#e2e8f0;"></div>
    ${['2020 — Thành lập công ty với đội ngũ 5 người và ý tưởng đột phá','2021 — Ra mắt sản phẩm đầu tiên, đạt 1.000 khách hàng trong 6 tháng','2022 — Mở rộng đội ngũ lên 30 người, nhận vòng đầu tư Series A','2023 — Phục vụ hơn 50.000 khách hàng trên toàn quốc'].map((item, i) => {
      const [year, ...rest] = item.split(' — ')
      return `<div style="display:flex;gap:20px;margin-bottom:28px;position:relative;">
      <div style="width:40px;height:40px;background:#4f46e5;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1;box-shadow:0 0 0 4px #fff;">
        <span style="color:#fff;font-size:11px;font-weight:800;">${year}</span>
      </div>
      <div style="background:#f8fafc;border-radius:12px;padding:16px 20px;flex:1;border:1px solid #e2e8f0;">
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.6;${FONT}">${rest.join(' — ')}</p>
      </div>
    </div>`}).join('')}
  </div>
</div>`,
  })

  bm.add('breadcrumb', {
    label: 'Breadcrumb',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`,
    content: `<nav aria-label="Breadcrumb" style="padding:12px 24px;${FONT}">
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px;">
    <li><a href="/" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${FONT}">Trang chủ</a></li>
    <li style="color:#94a3b8;font-size:13px;">/</li>
    <li><a href="#" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${FONT}">Danh mục</a></li>
    <li style="color:#94a3b8;font-size:13px;">/</li>
    <li style="font-size:13px;color:#64748b;font-weight:500;${FONT}" aria-current="page">Trang hiện tại</li>
  </ol>
</nav>`,
  })

  bm.add('blog-header', {
    label: 'Đầu bài viết',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    content: `<header style="padding:48px 24px 32px;max-width:800px;margin:0 auto;${FONT}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
    <span style="display:inline-block;padding:4px 12px;background:#ede9fe;color:#7c3aed;font-size:12px;font-weight:700;border-radius:9999px;${FONT}">Marketing</span>
    <span style="font-size:13px;color:#94a3b8;${FONT}">•</span>
    <span style="font-size:13px;color:#94a3b8;${FONT}">5 phút đọc</span>
  </div>
  <h1 style="${H1}margin-bottom:16px;font-size:clamp(26px,5vw,40px);">Tiêu đề bài viết chính — quan trọng nhất cho SEO</h1>
  <p style="font-size:17px;color:#475569;line-height:1.7;margin:0 0 24px;${FONT}">Mô tả ngắn tóm tắt nội dung bài viết, xuất hiện trong meta description và giúp người đọc quyết định có đọc tiếp không.</p>
  <div style="display:flex;align-items:center;gap:12px;padding-top:20px;border-top:1px solid #e2e8f0;">
    <img src="https://placehold.co/44x44/4f46e5/fff?text=A" alt="" style="width:44px;height:44px;border-radius:50%;object-fit:cover;"/>
    <div>
      <div style="font-weight:600;font-size:14px;color:#0f172a;${FONT}">Nguyễn Văn A</div>
      <div style="font-size:12px;color:#94a3b8;${FONT}">27 tháng 5, 2025</div>
    </div>
  </div>
</header>`,
  })

  bm.add('countdown', {
    label: 'Đếm ngược',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    content: `<div style="padding:40px 24px;text-align:center;background:#0f172a;border-radius:16px;${FONT}">
  <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 16px;">Ưu đãi kết thúc sau</p>
  <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
    ${[['02','Ngày'],['18','Giờ'],['45','Phút'],['30','Giây']].map(([n,l]) =>
      `<div style="text-align:center;">
        <div style="width:72px;height:72px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;${FONT}">${n}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:6px;font-weight:500;${FONT}">${l}</div>
      </div>`).join('')}
  </div>
  <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:20px 0 0;${FONT}">* Thay số bên trên theo thời gian thực tế của chiến dịch</p>
</div>`,
  })

  bm.add('footer', {
    label: 'Footer',
    category: 'SEO & Content',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="17" width="20" height="5" rx="1"/><line x1="2" y1="13" x2="22" y2="13"/><line x1="6" y1="9" x2="6" y2="13"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="18" y1="9" x2="18" y2="13"/></svg>`,
    content: `<footer style="background:#0f172a;padding:48px 24px 24px;${FONT}">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="display:flex;flex-wrap:wrap;gap:40px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div style="flex:2;min-width:200px;">
        <div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:12px;${FONT}">Tên Thương Hiệu</div>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 20px;max-width:260px;${FONT}">Mô tả ngắn về thương hiệu và sứ mệnh của bạn.</p>
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Sản phẩm</div>
        ${['Tính năng','Bảng giá','Hỗ trợ'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Công ty</div>
        ${['Về chúng tôi','Blog','Liên hệ'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
      <div style="flex:1;min-width:130px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:14px;${FONT}">Pháp lý</div>
        ${['Điều khoản','Chính sách','Cookies'].map(t=>`<div style="margin-bottom:8px;"><a href="#" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;${FONT}">${t}</a></div>`).join('')}
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:24px;">
      <p style="font-size:13px;color:rgba(255,255,255,0.3);margin:0;${FONT}">© 2025 Tên Thương Hiệu. All rights reserved.</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.3);margin:0;${FONT}">Made in Vietnam 🇻🇳</p>
    </div>
  </div>
</footer>`,
  })
}
