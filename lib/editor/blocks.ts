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

  bm.add('announcement', {
    label: 'Thông báo',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    content: `<div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#db2777 100%);padding:12px 24px;width:100%;box-sizing:border-box;${FONT}">
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
    content: `<section style="background:linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#4f46e5 75%,#7c3aed 100%);padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
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
    content: `<section style="background:linear-gradient(135deg,#312e81 0%,#4f46e5 50%,#7c3aed 100%);padding:80px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;${FONT}">
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
    <span style="position:absolute;top:12px;left:12px;padding:4px 12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border-radius:9999px;font-size:12px;font-weight:600;">Mới</span>
  </div>
  <div style="padding:22px;">
    <h3 style="${H3}margin-bottom:8px;font-size:17px;">Tên sản phẩm</h3>
    <p style="${BODY}font-size:14px;margin-bottom:18px;">Mô tả ngắn về sản phẩm hoặc dịch vụ của bạn một cách hấp dẫn</p>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
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
  <div style="flex:1;min-width:260px;border:2px solid #4f46e5;border-radius:18px;padding:32px 24px;text-align:center;background:linear-gradient(160deg,#faf5ff,#eef2ff);position:relative;">
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
                <div style="display:inline-block;padding:2px 10px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#fff;border-radius:9999px;font-size:10px;font-weight:700;letter-spacing:0.05em;margin-bottom:6px;${FONT}">★ Phổ biến</div>
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
                <a href="#" style="display:inline-block;padding:8px 16px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 3px 10px rgba(79,70,229,0.35);white-space:nowrap;${FONT}">Chọn gói</a>
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
    content: `<div data-carousel style="width:100%;position:relative;overflow:hidden;border-radius:18px;background:#0f172a;user-select:none;-webkit-user-select:none;${FONT}">
  <div data-track style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:24px;margin-bottom:-24px;">
    <div data-slide style="flex:0 0 100%;scroll-snap-align:start;position:relative;flex-shrink:0;">
      <img src="https://placehold.co/900x480/e0e7ff/4f46e5?text=Slide+1" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);pointer-events:none;"></div>
      <div style="position:absolute;bottom:52px;left:0;right:0;padding:0 32px;">
        <h3 style="font-size:clamp(18px,4vw,26px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.25;${FONT}">Tiêu đề slide 1</h3>
        <p style="font-size:15px;color:rgba(255,255,255,0.82);margin:0;line-height:1.6;${FONT}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
    <div data-slide style="flex:0 0 100%;scroll-snap-align:start;position:relative;flex-shrink:0;">
      <img src="https://placehold.co/900x480/ede9fe/7c3aed?text=Slide+2" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);pointer-events:none;"></div>
      <div style="position:absolute;bottom:52px;left:0;right:0;padding:0 32px;">
        <h3 style="font-size:clamp(18px,4vw,26px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.25;${FONT}">Tiêu đề slide 2</h3>
        <p style="font-size:15px;color:rgba(255,255,255,0.82);margin:0;line-height:1.6;${FONT}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
    <div data-slide style="flex:0 0 100%;scroll-snap-align:start;position:relative;flex-shrink:0;">
      <img src="https://placehold.co/900x480/dcfce7/059669?text=Slide+3" alt="" style="width:100%;height:420px;object-fit:cover;display:block;"/>
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);pointer-events:none;"></div>
      <div style="position:absolute;bottom:52px;left:0;right:0;padding:0 32px;">
        <h3 style="font-size:clamp(18px,4vw,26px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.25;${FONT}">Tiêu đề slide 3</h3>
        <p style="font-size:15px;color:rgba(255,255,255,0.82);margin:0;line-height:1.6;${FONT}">Mô tả ngắn hấp dẫn về nội dung của slide này để thu hút người xem</p>
      </div>
    </div>
  </div>
  <div data-dots style="position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:6px;">
    <a data-dot href="#" style="display:block;width:28px;height:7px;background:rgba(255,255,255,0.95);border-radius:9999px;text-decoration:none;transition:width 0.25s,background 0.25s;"></a>
    <a data-dot href="#" style="display:block;width:7px;height:7px;background:rgba(255,255,255,0.45);border-radius:50%;text-decoration:none;transition:width 0.25s,background 0.25s;"></a>
    <a data-dot href="#" style="display:block;width:7px;height:7px;background:rgba(255,255,255,0.45);border-radius:50%;text-decoration:none;transition:width 0.25s,background 0.25s;"></a>
  </div>
  <script>(function(){
    var all=document.querySelectorAll('[data-carousel]');
    var c=all[all.length-1];
    if(!c||c.getAttribute('data-init'))return;
    c.setAttribute('data-init','1');
    var track=c.querySelector('[data-track]');
    var slides=Array.from(c.querySelectorAll('[data-slide]'));
    var dots=Array.from(c.querySelectorAll('[data-dot]'));
    var n=slides.length,idx=0,timer,scrolling=false;
    function setDot(i){
      dots.forEach(function(d,j){
        d.style.width=j===i?'28px':'7px';
        d.style.borderRadius=j===i?'9999px':'50%';
        d.style.background=j===i?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';
      });
    }
    function goTo(i){
      idx=(i%n+n)%n;
      scrolling=true;
      track.scrollTo({left:slides[idx].offsetLeft,behavior:'smooth'});
      setDot(idx);
      setTimeout(function(){scrolling=false;},600);
    }
    dots.forEach(function(d,i){
      d.addEventListener('click',function(e){
        e.preventDefault();
        clearInterval(timer);
        goTo(i);
        startAuto();
      });
    });
    var st;
    track.addEventListener('scroll',function(){
      if(scrolling)return;
      clearTimeout(st);
      st=setTimeout(function(){
        var i=Math.round(track.scrollLeft/track.offsetWidth);
        if(i!==idx){idx=i;setDot(idx);}
      },80);
    });
    function startAuto(){timer=setInterval(function(){goTo(idx+1);},4000);}
    c.addEventListener('mouseenter',function(){clearInterval(timer);});
    c.addEventListener('mouseleave',startAuto);
    c.addEventListener('touchstart',function(){clearInterval(timer);},{passive:true});
    c.addEventListener('touchend',function(){clearTimeout(st);st=setTimeout(function(){var i=Math.round(track.scrollLeft/track.offsetWidth);idx=i;setDot(idx);startAuto();},200);},{passive:true});
    startAuto();
  })();</script>
</div>`,
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
}
