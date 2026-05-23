import type { Editor } from 'grapesjs'

export function registerBlocks(editor: Editor) {
  const bm = editor.BlockManager

  // ── Bố cục ──────────────────────────────────────────────────────────────
  bm.add('section', {
    label: 'Khung',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/></svg>`,
    content: '<section style="padding:40px 20px;min-height:80px;width:100%;box-sizing:border-box;"><div style="max-width:1200px;margin:0 auto;min-height:40px;"></div></section>',
  })

  bm.add('1-col', {
    label: '1 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>`,
    content: '<div style="padding:16px;min-height:60px;width:100%;box-sizing:border-box;"></div>',
  })

  bm.add('2-col', {
    label: '2 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="9" height="18" rx="1"/><rect x="13" y="3" width="9" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:1;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
</div>`,
  })

  bm.add('3-col', {
    label: '3 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:1;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
</div>`,
  })

  bm.add('4-col', {
    label: '4 Cột',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="4" height="16" rx="1"/><rect x="7" y="4" width="4" height="16" rx="1"/><rect x="13" y="4" width="4" height="16" rx="1"/><rect x="19" y="4" width="4" height="16" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:12px;width:100%;box-sizing:border-box;">
  <div style="flex:1;padding:12px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:12px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:12px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:1;padding:12px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
</div>`,
  })

  bm.add('col-70-30', {
    label: '70/30',
    category: 'Bố cục',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="12" height="18" rx="1"/><rect x="16" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<div style="display:flex;gap:16px;width:100%;box-sizing:border-box;">
  <div style="flex:7;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
  <div style="flex:3;padding:16px;min-height:60px;background:#f8fafc;border-radius:4px;"></div>
</div>`,
  })

  // ── Cơ bản ──────────────────────────────────────────────────────────────
  bm.add('text', {
    label: 'Văn bản',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h10"/></svg>`,
    content: '<p style="font-size:16px;color:#333;line-height:1.6;margin:0;">Nhập văn bản của bạn vào đây...</p>',
  })

  bm.add('heading', {
    label: 'Tiêu đề',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h2m12 0h2M10 6v12M4 12h16M4 18h2m12 0h2"/></svg>`,
    content: '<h2 style="font-size:32px;font-weight:700;color:#111;margin:0;line-height:1.2;">Tiêu đề của bạn</h2>',
  })

  bm.add('heading-sm', {
    label: 'Tiêu đề nhỏ',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h2m12 0h2M10 7v10M4 12h16"/></svg>`,
    content: '<h3 style="font-size:22px;font-weight:600;color:#111;margin:0;line-height:1.3;">Tiêu đề phụ</h3>',
  })

  bm.add('image', {
    label: 'Hình ảnh',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    content: '<img src="https://placehold.co/600x400/e2e8f0/64748b?text=Hình+ảnh" alt="Hình ảnh" style="max-width:100%;height:auto;display:block;border-radius:4px;"/>',
    attributes: { class: 'gjs-block-image' },
  })

  bm.add('button', {
    label: 'Nút bấm',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="5"/><path d="M8 12h8"/></svg>`,
    content: '<a href="#" style="display:inline-block;padding:12px 28px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:500;">Nút bấm</a>',
  })

  bm.add('divider', {
    label: 'Đường kẻ',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>`,
    content: '<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>',
  })

  bm.add('spacer', {
    label: 'Khoảng trống',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
    content: '<div style="height:48px;"></div>',
  })

  bm.add('list', {
    label: 'Danh sách',
    category: 'Cơ bản',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>`,
    content: `<ul style="list-style:none;padding:0;margin:0;font-size:16px;color:#333;line-height:2;">
  <li style="padding-left:24px;position:relative;">✓ &nbsp;Điểm nổi bật thứ nhất</li>
  <li style="padding-left:24px;position:relative;">✓ &nbsp;Điểm nổi bật thứ hai</li>
  <li style="padding-left:24px;position:relative;">✓ &nbsp;Điểm nổi bật thứ ba</li>
</ul>`,
  })

  // ── Marketing ───────────────────────────────────────────────────────────
  bm.add('hero', {
    label: 'Hero',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 10h10M7 14h6"/></svg>`,
    content: `<section style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:80px 20px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h1 style="font-size:48px;font-weight:700;margin:0 0 16px;line-height:1.2;">Tiêu đề ấn tượng</h1>
  <p style="font-size:20px;margin:0 0 32px;opacity:0.9;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6;">Mô tả ngắn gọn về sản phẩm hoặc dịch vụ của bạn để thu hút khách hàng</p>
  <a href="#" style="display:inline-block;padding:14px 36px;background:#fff;color:#1e40af;text-decoration:none;border-radius:8px;font-size:18px;font-weight:600;margin:0 8px;">Bắt đầu ngay</a>
  <a href="#" style="display:inline-block;padding:14px 36px;border:2px solid #fff;color:#fff;text-decoration:none;border-radius:8px;font-size:18px;font-weight:600;margin:0 8px;">Tìm hiểu thêm</a>
</section>`,
  })

  bm.add('features', {
    label: 'Tính năng',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="3" width="6" height="18" rx="1"/></svg>`,
    content: `<section style="padding:60px 20px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <h2 style="text-align:center;font-size:36px;font-weight:700;margin:0 0 40px;color:#111;">Tính năng nổi bật</h2>
  <div style="display:flex;gap:24px;max-width:960px;margin:0 auto;">
    <div style="flex:1;text-align:center;padding:24px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-size:40px;margin-bottom:16px;">⚡</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px;color:#111;">Nhanh chóng</h3>
      <p style="color:#555;line-height:1.6;margin:0;font-size:15px;">Mô tả tính năng đầu tiên của bạn một cách ngắn gọn và rõ ràng</p>
    </div>
    <div style="flex:1;text-align:center;padding:24px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-size:40px;margin-bottom:16px;">🎯</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px;color:#111;">Chính xác</h3>
      <p style="color:#555;line-height:1.6;margin:0;font-size:15px;">Mô tả tính năng thứ hai của bạn một cách ngắn gọn và rõ ràng</p>
    </div>
    <div style="flex:1;text-align:center;padding:24px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-size:40px;margin-bottom:16px;">🔒</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px;color:#111;">An toàn</h3>
      <p style="color:#555;line-height:1.6;margin:0;font-size:15px;">Mô tả tính năng thứ ba của bạn một cách ngắn gọn và rõ ràng</p>
    </div>
  </div>
</section>`,
  })

  bm.add('cta', {
    label: 'Kêu gọi',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09"/></svg>`,
    content: `<section style="background:#1e40af;padding:60px 20px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h2 style="font-size:36px;font-weight:700;margin:0 0 16px;">Sẵn sàng bắt đầu?</h2>
  <p style="font-size:18px;margin:0 0 32px;opacity:0.9;">Đăng ký miễn phí ngay hôm nay và trải nghiệm sự khác biệt</p>
  <a href="#" style="display:inline-block;padding:14px 36px;background:#fff;color:#1e40af;text-decoration:none;border-radius:8px;font-size:18px;font-weight:600;margin:0 8px;">Đăng ký miễn phí</a>
</section>`,
  })

  bm.add('card', {
    label: 'Thẻ sản phẩm',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`,
    content: `<div style="background:#fff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.08);overflow:hidden;max-width:320px;">
  <img src="https://placehold.co/320x200/e2e8f0/64748b?text=Hình+ảnh" alt="" style="width:100%;height:200px;object-fit:cover;display:block;"/>
  <div style="padding:20px;">
    <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#111;">Tên sản phẩm</h3>
    <p style="color:#555;line-height:1.6;margin:0 0 16px;font-size:14px;">Mô tả ngắn về sản phẩm hoặc dịch vụ của bạn</p>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:20px;font-weight:700;color:#1e40af;">299.000 đ</span>
      <a href="#" style="padding:8px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">Mua ngay</a>
    </div>
  </div>
</div>`,
  })

  bm.add('testimonial', {
    label: 'Đánh giá',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    content: `<div style="background:#f0f7ff;border-left:4px solid #2563eb;padding:24px 28px;border-radius:0 8px 8px 0;max-width:600px;">
  <p style="font-size:17px;color:#333;line-height:1.7;font-style:italic;margin:0 0 20px;">"Sản phẩm tuyệt vời! Đã giúp tôi tiết kiệm rất nhiều thời gian. Tôi hoàn toàn hài lòng và sẽ tiếp tục sử dụng."</p>
  <div style="display:flex;align-items:center;gap:12px;">
    <div style="width:44px;height:44px;background:#2563eb;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;">N</div>
    <div>
      <div style="font-weight:600;color:#111;margin-bottom:2px;">Nguyễn Văn An</div>
      <div style="font-size:13px;color:#666;">Giám đốc, Công ty ABC</div>
    </div>
  </div>
</div>`,
  })

  bm.add('pricing', {
    label: 'Bảng giá',
    category: 'Marketing',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    content: `<div style="display:flex;gap:24px;max-width:900px;margin:0 auto;padding:20px;box-sizing:border-box;">
  <div style="flex:1;border:1px solid #e5e7eb;border-radius:12px;padding:32px 24px;text-align:center;">
    <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;color:#333;">Cơ bản</h3>
    <div style="font-size:40px;font-weight:700;color:#111;margin:16px 0;">199k<span style="font-size:16px;font-weight:400;color:#666;">/tháng</span></div>
    <ul style="list-style:none;padding:0;margin:0 0 24px;text-align:left;font-size:14px;color:#555;line-height:2.2;">
      <li>✓ Tính năng A</li><li>✓ Tính năng B</li><li style="color:#bbb;">✗ Tính năng C</li>
    </ul>
    <a href="#" style="display:block;padding:12px;background:#f3f4f6;color:#333;text-decoration:none;border-radius:6px;font-weight:500;">Bắt đầu</a>
  </div>
  <div style="flex:1;border:2px solid #2563eb;border-radius:12px;padding:32px 24px;text-align:center;background:#eff6ff;">
    <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;color:#1e40af;">Pro</h3>
    <div style="font-size:40px;font-weight:700;color:#111;margin:16px 0;">499k<span style="font-size:16px;font-weight:400;color:#666;">/tháng</span></div>
    <ul style="list-style:none;padding:0;margin:0 0 24px;text-align:left;font-size:14px;color:#555;line-height:2.2;">
      <li>✓ Tính năng A</li><li>✓ Tính năng B</li><li>✓ Tính năng C</li>
    </ul>
    <a href="#" style="display:block;padding:12px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:500;">Chọn ngay</a>
  </div>
</div>`,
  })

  // ── Media ───────────────────────────────────────────────────────────────
  bm.add('video', {
    label: 'Video',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    content: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;width:100%;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>`,
  })

  bm.add('badge', {
    label: 'Nhãn',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    content: '<span style="display:inline-block;padding:4px 14px;background:#dbeafe;color:#1d4ed8;border-radius:9999px;font-size:13px;font-weight:500;">Nhãn mới</span>',
  })

  bm.add('icon-text', {
    label: 'Icon + Nội dung',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><path d="M15 6a6 6 0 010 12M22 12h-7"/></svg>`,
    content: `<div style="display:flex;align-items:flex-start;gap:16px;padding:16px;">
  <div style="width:52px;height:52px;background:#dbeafe;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;">✓</div>
  <div>
    <h4 style="font-weight:600;color:#111;margin:0 0 6px;font-size:16px;">Tiêu đề điểm</h4>
    <p style="color:#666;font-size:14px;margin:0;line-height:1.6;">Mô tả ngắn gọn về điểm nổi bật này của sản phẩm</p>
  </div>
</div>`,
  })

  bm.add('map', {
    label: 'Bản đồ',
    category: 'Media',
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    content: `<div style="width:100%;height:350px;border-radius:8px;overflow:hidden;">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125418.4534827254!2d106.62873!3d10.8230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVHAuIEhDTQ!5e0!3m2!1svi!2svn!4v1635000000000" style="width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>
</div>`,
  })
}
