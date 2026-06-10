import type { Editor } from 'grapesjs'

const F   = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const LP  = { id: 'landing-templates', label: 'Mẫu Landing Page', order: 9 }
const ADS = { id: 'ad-templates',      label: 'Mẫu Quảng cáo',   order: 10 }

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

  // ── LP 1: Đơn giản ────────────────────────────────────────────────────────
  bm.add('tpl-lp-simple', {
    label: 'LP Đơn giản',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="8" rx="2" fill="#1e1b4b"/><rect x="7" y="3" width="12" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="21" y="3" width="6" height="2" rx="1" fill="#818cf8"/><rect x="2" y="11" width="28" height="12" rx="2" fill="#312e81"/><rect x="8" y="14" width="16" height="3" rx="1.5" fill="#fff"/><rect x="10" y="19" width="12" height="2" rx="1" fill="#818cf8" opacity=".7"/><rect x="2" y="25" width="28" height="10" rx="2" fill="#f0f4ff"/><rect x="5" y="27.5" width="8" height="5" rx="2" fill="#e0e7ff"/><rect x="15" y="27.5" width="8" height="5" rx="2" fill="#e0e7ff"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- NAVBAR -->
<nav style="width:100%;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 6px rgba(0,0,0,0.05);position:sticky;top:0;z-index:100;box-sizing:border-box;">
  <div style="max-width:1100px;margin:0 auto;padding:0 24px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
    <span style="font-size:20px;font-weight:800;color:#0f172a;${F}">Thương Hiệu</span>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <a href="#tinh-nang" style="font-size:14px;font-weight:500;color:#475569;text-decoration:none;padding:6px 12px;border-radius:8px;${F}">Tính năng</a>
      <a href="#bang-gia" style="font-size:14px;font-weight:500;color:#475569;text-decoration:none;padding:6px 12px;border-radius:8px;${F}">Bảng giá</a>
      <a href="#dang-ky" style="padding:9px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:9px;font-size:14px;font-weight:700;${F}">Dùng thử miễn phí</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section style="background:linear-gradient(160deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%);padding:96px 24px 80px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -10%,rgba(255,255,255,0.12) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:relative;max-width:660px;margin:0 auto;">
    ${BADGE('🚀 Ra mắt phiên bản mới — Đăng ký ngay hôm nay')}
    <h1 style="font-size:clamp(30px,6vw,52px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 20px;color:#fff;${F}">Tiêu đề chính<br/>Ngắn gọn và Ấn tượng</h1>
    <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.8);line-height:1.75;margin:0 0 40px;${F}">Mô tả lợi ích cốt lõi trong 1–2 câu. Tập trung vào kết quả khách hàng nhận được, không phải tính năng.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a id="dang-ky" href="#" style="padding:15px 36px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 20px rgba(0,0,0,0.2);${F}">Bắt đầu miễn phí</a>
      <a href="#" style="padding:15px 28px;border:2px solid rgba(255,255,255,0.4);color:#fff;text-decoration:none;border-radius:11px;font-size:15px;font-weight:600;${F}">Xem demo →</a>
    </div>
    <p style="font-size:12px;color:rgba(255,255,255,0.45);margin:18px 0 0;${F}">Không cần thẻ tín dụng · Miễn phí 14 ngày · Hủy bất kỳ lúc nào</p>
  </div>
</section>

<!-- FEATURES -->
<section id="tinh-nang" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Tính năng</span>
      <h2 style="font-size:clamp(24px,4vw,34px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Tại sao chọn chúng tôi?</h2>
      <p style="font-size:16px;color:#64748b;max-width:480px;margin:0 auto;line-height:1.7;${F}">Những tính năng được thiết kế để giúp bạn đạt kết quả nhanh hơn</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      ${FEATURE_CARD('⚡','Nhanh chóng','Tiết kiệm hàng giờ công việc thủ công mỗi tuần với tự động hóa thông minh.','#4f46e5')}
      ${FEATURE_CARD('🎯','Chính xác','Kết quả được tối ưu dựa trên dữ liệu thực tế, không phải phỏng đoán.','#7c3aed')}
      ${FEATURE_CARD('🔒','An toàn','Bảo mật cấp doanh nghiệp, dữ liệu của bạn luôn được bảo vệ tuyệt đối.','#059669')}
    </div>
  </div>
</section>

<!-- SOCIAL PROOF -->
<section style="padding:56px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:880px;margin:0 auto;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
    ${[['10.000+','Khách hàng tin dùng','#4f46e5','#f0f4ff','#c7d2fe'],['98%','Tỷ lệ hài lòng','#7c3aed','#fdf4ff','#e9d5ff'],['3x','Tăng hiệu suất','#059669','#f0fdf4','#a7f3d0']].map(([n,l,c,bg,b])=>
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
    <h2 style="font-size:clamp(26px,5vw,38px);font-weight:800;margin:0 0 14px;line-height:1.2;${F}">Sẵn sàng bắt đầu chưa?</h2>
    <p style="font-size:17px;color:rgba(255,255,255,0.8);margin:0 0 36px;line-height:1.7;${F}">Tham gia cùng hàng nghìn khách hàng đang sử dụng thành công</p>
    <a href="#" style="display:inline-block;padding:16px 44px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 20px rgba(0,0,0,0.2);${F}">Đăng ký miễn phí ngay</a>
  </div>
</section>

</div>`,
  })

  // ── LP 2: Sản phẩm / Dịch vụ ─────────────────────────────────────────────
  bm.add('tpl-lp-product', {
    label: 'LP Sản phẩm & Dịch vụ',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="8" rx="2" fill="#0f172a"/><rect x="2" y="11" width="28" height="9" rx="2" fill="#312e81"/><rect x="5" y="13" width="10" height="5" rx="2" fill="#4f46e5" opacity=".5"/><rect x="17" y="14" width="10" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="17" y="17" width="7" height="1.5" rx=".75" fill="#818cf8"/><rect x="2" y="22" width="28" height="8" rx="2" fill="#f8fafc"/><rect x="4" y="24" width="7" height="4" rx="1.5" fill="#e0e7ff"/><rect x="13" y="24" width="7" height="4" rx="1.5" fill="#ede9fe"/><rect x="22" y="24" width="7" height="4" rx="1.5" fill="#ddd6fe"/><rect x="2" y="32" width="28" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO chia đôi: text trái / ảnh phải -->
<section style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);padding:80px 24px;width:100%;box-sizing:border-box;">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:48px;">
    <div style="flex:1;min-width:280px;color:#fff;">
      ${BADGE('✨ Giải pháp #1 cho doanh nghiệp Việt')}
      <h1 style="font-size:clamp(28px,5vw,46px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 18px;color:#fff;${F}">Tên sản phẩm —<br/>Giải pháp toàn diện</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 32px;max-width:460px;${F}">Mô tả rõ ràng sản phẩm/dịch vụ mang lại lợi ích gì, giải quyết vấn đề gì cho khách hàng mục tiêu.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;">
        <a href="#" style="padding:14px 32px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Dùng thử ngay</a>
        <a href="#" style="padding:14px 24px;border:1.5px solid rgba(255,255,255,0.35);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Tìm hiểu thêm</a>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        ${['✅ Miễn phí 14 ngày','✅ Không cần credit card','✅ Hủy bất kỳ lúc'].map(t=>`<span style="font-size:13px;color:rgba(255,255,255,0.65);${F}">${t}</span>`).join('')}
      </div>
    </div>
    <div style="flex:1;min-width:280px;">
      <img src="https://placehold.co/520x380/4f46e5/ffffff?text=Ảnh+sản+phẩm" alt="Sản phẩm" style="width:100%;border-radius:18px;box-shadow:0 24px 60px rgba(0,0,0,0.35);display:block;"/>
    </div>
  </div>
</section>

<!-- LOGO CLOUD -->
<div style="padding:32px 24px;background:#fff;border-bottom:1px solid #f1f5f9;">
  <p style="text-align:center;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;margin:0 0 20px;${F}">Được tin dùng bởi hơn 10.000 doanh nghiệp</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:24px 36px;max-width:900px;margin:0 auto;">
    ${['BRAND A','BRAND B','BRAND C','BRAND D','BRAND E'].map(b=>`<div style="padding:8px 18px;background:#f1f5f9;border-radius:8px;font-size:13px;font-weight:800;color:#64748b;letter-spacing:-0.01em;${F}">${b}</div>`).join('')}
  </div>
</div>

<!-- FEATURES chi tiết 2 cột -->
<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Tính năng nổi bật</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Mọi thứ bạn cần trong một nơi</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
      ${[['⚡','Tự động hóa thông minh','Giảm 80% công việc thủ công với quy trình tự động được cá nhân hóa theo nhu cầu.'],['📊','Báo cáo thời gian thực','Dashboard trực quan hiển thị mọi chỉ số quan trọng — không cần chờ đến cuối tháng.'],['🔗','Tích hợp dễ dàng','Kết nối với hơn 50+ công cụ phổ biến chỉ trong vài cú click, không cần lập trình.'],['🛡️','Bảo mật cấp doanh nghiệp','Mã hóa đầu cuối, tuân thủ GDPR, sao lưu tự động — dữ liệu của bạn luôn an toàn.']].map(([icon,title,desc])=>
        `<div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,0.04),0 6px 20px rgba(79,70,229,0.07);">
          <div style="font-size:28px;margin-bottom:14px;">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px;${F}">${title}</h3>
          <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- QUY TRÌNH 4 bước -->
<section style="padding:80px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:960px;margin:0 auto;text-align:center;">
    <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Quy trình</span>
    <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 48px;${F}">Bắt đầu chỉ trong 4 bước</h2>
    <div style="display:flex;flex-wrap:wrap;gap:0;">
      ${STEP_ITEM(1,'Đăng ký tài khoản','Tạo tài khoản miễn phí trong 30 giây','linear-gradient(135deg,#4f46e5,#7c3aed)','0 6px 18px rgba(79,70,229,0.35)')}
      ${STEP_ITEM(2,'Thiết lập','Cấu hình theo nhu cầu của bạn','linear-gradient(135deg,#7c3aed,#9333ea)','0 6px 18px rgba(124,58,237,0.35)')}
      ${STEP_ITEM(3,'Tích hợp','Kết nối với các công cụ hiện tại','linear-gradient(135deg,#9333ea,#db2777)','0 6px 18px rgba(147,51,234,0.35)')}
      ${STEP_ITEM(4,'Tận hưởng','Nhận kết quả ngay lập tức','linear-gradient(135deg,#db2777,#f59e0b)','0 6px 18px rgba(219,39,119,0.3)')}
    </div>
  </div>
</section>

<!-- TESTIMONIAL -->
<section style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">Khách hàng nói gì về chúng tôi</h2>
    <div style="display:flex;flex-wrap:wrap;gap:20px;">
      ${[['N','Nguyễn Minh Tuấn','CEO, Công ty ABC','Sản phẩm thay đổi hoàn toàn cách chúng tôi vận hành. Tiết kiệm được 20 giờ mỗi tuần!','#4f46e5'],['L','Lê Thu Hà','Marketing Manager','Dễ dùng, kết quả rõ ràng. Đây là công cụ tôi luôn tìm kiếm bấy lâu nay.','#7c3aed'],['T','Trần Đức Anh','Founder, StartupXYZ','Hỗ trợ nhiệt tình, tính năng đầy đủ. Hoàn toàn xứng đáng với mức giá.','#059669']].map(([letter,name,title,quote,color])=>
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

<!-- CTA cuối -->
<section style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:72px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h2 style="font-size:clamp(24px,5vw,38px);font-weight:800;margin:0 0 14px;line-height:1.2;${F}">Bắt đầu dùng thử miễn phí hôm nay</h2>
  <p style="font-size:17px;color:rgba(255,255,255,0.8);margin:0 0 36px;${F}">Không cần thẻ tín dụng. Hủy bất kỳ lúc nào.</p>
  <a href="#" style="display:inline-block;padding:16px 48px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 24px rgba(0,0,0,0.2);${F}">Đăng ký miễn phí</a>
</section>

</div>`,
  })

  // ── LP 3: Thu thập email / Lead gen ──────────────────────────────────────
  bm.add('tpl-lp-leadgen', {
    label: 'LP Thu thập email',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="14" rx="2" fill="#312e81"/><rect x="7" y="5" width="18" height="3" rx="1.5" fill="#fff"/><rect x="9" y="10" width="14" height="2" rx="1" fill="#818cf8" opacity=".7"/><rect x="2" y="17" width="28" height="10" rx="2" fill="#f0f4ff"/><rect x="4" y="19.5" width="8" height="5" rx="1.5" fill="#e0e7ff"/><rect x="14" y="19.5" width="8" height="5" rx="1.5" fill="#ede9fe"/><rect x="24" y="19.5" width="5" height="5" rx="1.5" fill="#c4b5fd"/><rect x="2" y="29" width="28" height="6" rx="2" fill="#fff" stroke="#e0e7ff" stroke-width="1"/><rect x="4" y="31" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="22" y="31" width="6" height="2" rx="1" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO thu thập email -->
<section style="background:linear-gradient(160deg,#0f172a 0%,#1e1b4b 100%);padding:100px 24px 80px;text-align:center;color:#fff;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;top:5%;right:8%;width:200px;height:200px;background:rgba(167,139,250,0.12);border-radius:50%;filter:blur(52px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:5%;left:5%;width:160px;height:160px;background:rgba(99,102,241,0.15);border-radius:50%;filter:blur(44px);pointer-events:none;"></div>
  <div style="position:relative;max-width:620px;margin:0 auto;">
    <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9999px;font-size:13px;margin-bottom:24px;${F}">
      <span style="width:8px;height:8px;background:#4ade80;border-radius:50%;display:inline-block;animation:pulse 2s infinite;"></span>
      🎁 Tặng miễn phí — chỉ còn 48 giờ
    </div>
    <h1 style="font-size:clamp(28px,6vw,48px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 18px;${F}">Nhận [Tên tài nguyên] miễn phí ngay hôm nay</h1>
    <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 40px;${F}">Mô tả ngắn gọn giá trị của tài nguyên: người đọc sẽ học được gì, tiết kiệm được bao nhiêu thời gian.</p>
    <!-- FORM -->
    <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:32px;max-width:480px;margin:0 auto;text-align:left;">
      <p style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.6);margin:0 0 20px;text-align:center;letter-spacing:0.04em;${F}">NHẬN NGAY — HOÀN TOÀN MIỄN PHÍ</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input type="text" placeholder="Họ và tên của bạn" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="email" placeholder="Email của bạn (bắt buộc)" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <button style="width:100%;padding:15px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Nhận ngay — Miễn phí 🎁</button>
      </div>
      <p style="font-size:12px;color:rgba(255,255,255,0.4);text-align:center;margin:14px 0 0;${F}">🔒 Chúng tôi không bao giờ spam. Hủy đăng ký bất kỳ lúc nào.</p>
    </div>
  </div>
</section>

<!-- LỢI ÍCH -->
<section style="padding:72px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:880px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">Bạn sẽ nhận được những gì?</h2>
    <div style="display:flex;flex-wrap:wrap;gap:16px;">
      ${[['📚','Kiến thức chuyên sâu','Tổng hợp từ hàng trăm giờ nghiên cứu và thực chiến — bạn học trong 30 phút.'],['🛠','Công cụ thực hành','Template, checklist và framework sẵn dùng — áp dụng ngay không cần tùy chỉnh.'],['💡','Insight độc quyền','Những bí quyết ít người biết từ các chuyên gia hàng đầu trong ngành.'],['⏱','Tiết kiệm thời gian','Kết quả rõ ràng trong 7 ngày — không cần thử và sai tốn kém.']].map(([icon,title,desc])=>
        `<div style="flex:1;min-width:220px;display:flex;gap:14px;padding:20px;background:#f8fafc;border-radius:14px;align-items:flex-start;">
          <div style="font-size:26px;flex-shrink:0;">${icon}</div>
          <div><h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">${title}</h4><p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${desc}</p></div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- SOCIAL PROOF + CTA lại -->
<section style="padding:60px 24px;background:#f8fafc;width:100%;box-sizing:border-box;text-align:center;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="display:flex;justify-content:center;gap:4px;margin-bottom:10px;"><span style="color:#f59e0b;font-size:20px;">★★★★★</span></div>
    <p style="font-size:14px;color:#64748b;margin:0 0 28px;${F}">Đánh giá 4.9/5 từ <strong style="color:#0f172a;">2.400+ người</strong> đã tải</p>
    <div style="display:flex;flex-direction:column;gap:10px;max-width:400px;margin:0 auto;">
      <input type="email" placeholder="Nhập email của bạn..." style="width:100%;padding:14px 18px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
      <button style="width:100%;padding:15px;background:#4f46e5;color:#fff;font-size:15px;font-weight:700;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 12px rgba(79,70,229,0.35);${F}">Nhận tài nguyên miễn phí →</button>
    </div>
  </div>
</section>

</div>`,
  })

  // ═══════════════════════════════════════════════════════════════════════════
  //  ADS TEMPLATES
  // ═══════════════════════════════════════════════════════════════════════════

  // ── LP 4: Webinar / Sự kiện ──────────────────────────────────────────────
  bm.add('tpl-lp-webinar', {
    label: 'LP Webinar / Sự kiện',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="2" y="1" width="28" height="11" rx="3" fill="#0f172a"/><rect x="6" y="4" width="14" height="2.5" rx="1.25" fill="#fff"/><rect x="6" y="8" width="9" height="1.5" rx=".75" fill="#818cf8"/><rect x="22" y="5" width="5" height="4" rx="1" fill="#ef4444"/><rect x="4" y="14" width="24" height="6" rx="2" fill="#ede9fe"/><rect x="6" y="22" width="8" height="6" rx="1.5" fill="#e0e7ff"/><rect x="16" y="22" width="8" height="6" rx="1.5" fill="#e0e7ff"/><rect x="6" y="30" width="20" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO Webinar -->
<section style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#2d1b69 100%);padding:80px 24px;color:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:1050px;margin:0 auto;display:flex;flex-wrap:wrap;gap:48px;align-items:center;">
    <!-- Left: info -->
    <div style="flex:1;min-width:280px;">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:#ef4444;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:20px;${F}">
        🔴 LIVE · Đăng ký miễn phí
      </div>
      <h1 style="font-size:clamp(26px,5vw,42px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 16px;${F}">Tên Webinar:<br/>Chủ đề thu hút và cụ thể</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 28px;${F}">Mô tả ngắn về nội dung webinar — bạn sẽ học được gì, tại sao nên tham gia và giá trị mang lại sau buổi học.</p>
      <!-- Thời gian / địa điểm -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
        ${[['📅','Thứ Bảy, 15/02/2025'],['🕐','19:00 – 21:00 (Giờ Việt Nam)'],['🌐','Zoom — Link gửi qua email sau khi đăng ký']].map(([icon,text])=>
          `<div style="display:flex;align-items:center;gap:10px;font-size:15px;color:rgba(255,255,255,0.85);${F}"><span style="font-size:18px;">${icon}</span>${text}</div>`).join('')}
      </div>
      <!-- Speakers -->
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        ${[['A','Nguyễn Văn A','Chuyên gia SEO','#4f46e5'],['B','Trần Thị B','Content Strategist','#7c3aed']].map(([letter,name,title,color])=>
          `<div style="display:flex;align-items:center;gap:10px;">
            <div style="width:46px;height:46px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:18px;border:2px solid rgba(255,255,255,0.3);">${letter}</div>
            <div><div style="font-size:14px;font-weight:700;color:#fff;${F}">${name}</div><div style="font-size:12px;color:rgba(255,255,255,0.55);${F}">${title}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <!-- Right: form đăng ký -->
    <div style="flex-shrink:0;width:100%;max-width:360px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:32px;box-sizing:border-box;">
      <p style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 6px;${F}">Đăng ký tham dự</p>
      <p style="font-size:18px;font-weight:800;color:#fff;text-align:center;margin:0 0 6px;${F}">100% Miễn Phí</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 22px;${F}">Còn <strong style="color:#fbbf24;">47 chỗ</strong> — đăng ký ngay trước khi hết!</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input type="text" placeholder="Họ và tên" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="email" placeholder="Email của bạn" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <input type="tel" placeholder="Số điện thoại (tùy chọn)" style="width:100%;padding:12px 14px;border-radius:9px;border:1.5px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:14px;box-sizing:border-box;outline:none;${F}"/>
        <button style="width:100%;padding:15px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:10px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Đăng ký ngay — Miễn phí</button>
      </div>
      <p style="font-size:12px;color:rgba(255,255,255,0.35);text-align:center;margin:12px 0 0;${F}">Xác nhận qua email · Không spam</p>
    </div>
  </div>
</section>

<!-- NỘI DUNG HỌC -->
<section style="padding:72px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 48px;${F}">Bạn sẽ học được gì trong buổi này?</h2>
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${[['01','Phần 1: Kiến thức nền tảng','Nắm vững những khái niệm cốt lõi mà 90% người học bỏ qua — đây là nền tảng để mọi thứ sau hoạt động hiệu quả.'],['02','Phần 2: Chiến lược thực tế','Framework độc quyền được kiểm chứng qua [X] dự án thực tế — không phải lý thuyết suông.'],['03','Phần 3: Case study & Demo','Xem qua 3 case study cụ thể và demo trực tiếp để bạn thấy rõ kết quả có thể đạt được.'],['04','Phần 4: Q&A trực tiếp','Đặt câu hỏi và nhận tư vấn cá nhân từ chuyên gia ngay trong buổi học.']].map(([num,title,desc])=>
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
    <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 40px;${F}">Diễn giả</h2>
    <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">
      ${[['A','Nguyễn Văn A','CEO tại Công ty ABC · 10 năm kinh nghiệm','Chuyên gia hàng đầu về [lĩnh vực], tác giả cuốn sách [tên sách], đã đào tạo hơn 5.000 học viên.','#4f46e5'],['B','Trần Thị B','Head of Marketing tại XYZ Corp','Xây dựng các chiến dịch marketing đột phá cho 50+ thương hiệu lớn tại Việt Nam và quốc tế.','#7c3aed']].map(([letter,name,role,bio,color])=>
        `<div style="flex:1;min-width:280px;max-width:380px;background:#fff;border-radius:20px;padding:28px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05),0 8px 28px rgba(79,70,229,0.08);">
          <div style="width:80px;height:80px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;color:#fff;margin:0 auto 14px;">${letter}</div>
          <h3 style="font-size:17px;font-weight:800;color:#0f172a;margin:0 0 4px;${F}">${name}</h3>
          <p style="font-size:13px;font-weight:600;color:#4f46e5;margin:0 0 12px;${F}">${role}</p>
          <p style="font-size:14px;color:#64748b;line-height:1.65;margin:0;${F}">${bio}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- CTA cuối -->
<section style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:64px 24px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  <h2 style="font-size:clamp(22px,4vw,34px);font-weight:800;margin:0 0 12px;${F}">Đừng bỏ lỡ — Chỉ còn <span style="color:#fde68a;">47 chỗ</span> trống</h2>
  <p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 32px;${F}">Webinar diễn ra vào Thứ Bảy, 15/02/2025 lúc 19:00</p>
  <a href="#" style="display:inline-block;padding:16px 48px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:11px;font-size:16px;font-weight:800;box-shadow:0 6px 24px rgba(0,0,0,0.2);${F}">Đăng ký miễn phí ngay →</a>
</section>

</div>`,
  })

  // ── LP 5: SaaS với bảng giá 3 gói ────────────────────────────────────────
  bm.add('tpl-lp-saas', {
    label: 'LP SaaS + Bảng giá',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="10" rx="2" fill="#1e1b4b"/><rect x="6" y="4" width="16" height="2.5" rx="1.25" fill="#fff"/><rect x="6" y="8" width="10" height="1.5" rx=".75" fill="#818cf8"/><rect x="2" y="13" width="28" height="8" rx="2" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1"/><rect x="4" y="15" width="7" height="4" rx="1" fill="#e0e7ff"/><rect x="13" y="15" width="7" height="4" rx="1" fill="#ede9fe"/><rect x="22" y="15" width="7" height="4" rx="1" fill="#c7d2fe"/><rect x="2" y="23" width="8" height="12" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/><rect x="12" y="21" width="8" height="14" rx="2" fill="#4f46e5"/><rect x="22" y="23" width="8" height="12" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/><rect x="14" y="28" width="4" height="2" rx="1" fill="#fff"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO -->
<section style="background:linear-gradient(160deg,#0f172a,#1e1b4b);padding:88px 24px 72px;text-align:center;color:#fff;width:100%;box-sizing:border-box;">
  ${BADGE('🚀 Nền tảng SaaS cho doanh nghiệp Việt')}
  <h1 style="font-size:clamp(28px,6vw,50px);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin:0 0 18px;${F}">Tăng trưởng nhanh hơn<br/>với <span style="color:#818cf8;">[Tên Sản Phẩm]</span></h1>
  <p style="font-size:clamp(15px,2.5vw,18px);color:rgba(255,255,255,0.75);max-width:540px;margin:0 auto 36px;line-height:1.75;${F}">Nền tảng all-in-one giúp đội nhóm của bạn [làm X], [đạt Y] và [tránh Z] — tất cả trong một dashboard duy nhất.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
    <a href="#bang-gia" style="padding:14px 36px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:16px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.5);${F}">Xem bảng giá</a>
    <a href="#" style="padding:14px 28px;border:1.5px solid rgba(255,255,255,0.3);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Dùng thử miễn phí</a>
  </div>
  <p style="font-size:13px;color:rgba(255,255,255,0.4);${F}">Không cần thẻ tín dụng · Miễn phí 14 ngày</p>
</section>

<!-- FEATURES ngang -->
<div style="background:#fff;padding:40px 24px;border-bottom:1px solid #f1f5f9;">
  <div style="max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:28px;justify-content:center;">
    ${[['⚡ Nhanh 10×','So với làm thủ công'],['📈 ROI dương','Trong 30 ngày đầu'],['🔗 50+ tích hợp','Không cần code'],['🛡️ Uptime 99.9%','SLA đảm bảo']].map(([title,sub])=>
      `<div style="text-align:center;min-width:150px;">
        <div style="font-size:15px;font-weight:800;color:#0f172a;margin-bottom:4px;${F}">${title}</div>
        <div style="font-size:13px;color:#94a3b8;${F}">${sub}</div>
      </div>`).join('')}
  </div>
</div>

<!-- BẢNG GIÁ -->
<section id="bang-gia" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:1000px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Bảng giá</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 10px;${F}">Đơn giản, minh bạch, không ẩn phí</h2>
      <p style="font-size:15px;color:#64748b;${F}">Tất cả các gói đều bao gồm 14 ngày dùng thử miễn phí</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;">
      ${[
        {name:'Starter',price:'199.000',unit:'/ tháng',color:'#475569',bg:'#fff',border:'#e2e8f0',btnBg:'#f1f5f9',btnColor:'#0f172a',highlight:false,features:['3 người dùng','10 dự án','5GB lưu trữ','Tích hợp cơ bản','Email hỗ trợ']},
        {name:'Pro',price:'599.000',unit:'/ tháng',color:'#4f46e5',bg:'linear-gradient(180deg,#4f46e5 0%,#3730a3 100%)',border:'transparent',btnBg:'#fff',btnColor:'#4f46e5',highlight:true,features:['15 người dùng','Không giới hạn dự án','50GB lưu trữ','Tất cả tích hợp','Hỗ trợ ưu tiên 24/7','Báo cáo nâng cao']},
        {name:'Enterprise',price:'Liên hệ',unit:'',color:'#0f172a',bg:'#fff',border:'#e2e8f0',btnBg:'#0f172a',btnColor:'#fff',highlight:false,features:['Không giới hạn','SSO & SAML','SLA tùy chỉnh','Onboarding riêng','Dedicated support','Custom contract']},
      ].map(p=>
        `<div style="flex:1;min-width:240px;background:${p.bg};border-radius:20px;border:2px solid ${p.border};padding:32px;box-sizing:border-box;position:relative;${p.highlight?'box-shadow:0 12px 40px rgba(79,70,229,0.3);transform:scale(1.03);':'' }">
          ${p.highlight?`<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 18px;background:#fbbf24;color:#0f172a;font-size:12px;font-weight:800;border-radius:9999px;white-space:nowrap;${F}">⭐ Phổ biến nhất</div>`:''}
          <p style="font-size:14px;font-weight:700;color:${p.highlight?'rgba(255,255,255,0.7)':'#64748b'};margin:0 0 10px;${F}">${p.name}</p>
          <div style="margin-bottom:22px;"><span style="font-size:clamp(26px,5vw,36px);font-weight:900;color:${p.highlight?'#fff':p.color};${F}">${p.price}</span><span style="font-size:13px;color:${p.highlight?'rgba(255,255,255,0.55)':'#94a3b8'};${F}">${p.unit}</span></div>
          <a href="#" style="display:block;text-align:center;padding:12px;background:${p.btnBg};color:${p.btnColor};text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin-bottom:22px;${F}">Bắt đầu ngay</a>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
            ${p.features.map(f=>`<li style="font-size:14px;color:${p.highlight?'rgba(255,255,255,0.85)':'#475569'};display:flex;align-items:center;gap:8px;${F}"><span style="color:${p.highlight?'#86efac':'#4f46e5'};font-weight:700;font-size:13px;">✓</span>${f}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
    <p style="text-align:center;font-size:14px;color:#94a3b8;margin-top:28px;${F}">Tất cả giá đã bao gồm VAT · Thanh toán qua VNPAY, Momo, chuyển khoản ngân hàng</p>
  </div>
</section>

<!-- FAQ -->
<section style="padding:64px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:720px;margin:0 auto;">
    <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#0f172a;text-align:center;margin:0 0 40px;${F}">Câu hỏi thường gặp</h2>
    ${[['Tôi có thể đổi gói bất kỳ lúc nào không?','Có, bạn có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào. Thay đổi sẽ được áp dụng ngay lập tức, phần phí chênh lệch được tính theo tỷ lệ thời gian sử dụng.'],['Nếu không hài lòng, tôi có được hoàn tiền không?','Có, chúng tôi cam kết hoàn tiền 100% trong vòng 30 ngày đầu tiên — không hỏi lý do.'],['Dữ liệu của tôi có được bảo mật không?','Dữ liệu được mã hóa AES-256, lưu trữ trên server tại Việt Nam và Singapore, sao lưu tự động mỗi 6 giờ.']].map(([q,a])=>
      `<details style="border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:10px;cursor:pointer;">
        <summary style="font-size:15px;font-weight:700;color:#0f172a;list-style:none;${F}">${q}</summary>
        <p style="font-size:14px;color:#64748b;line-height:1.7;margin:12px 0 0;${F}">${a}</p>
      </details>`).join('')}
  </div>
</section>

</div>`,
  })

  // ── LP 6: Agency / Dịch vụ chuyên nghiệp ─────────────────────────────────
  bm.add('tpl-lp-agency', {
    label: 'LP Agency / Dịch vụ',
    category: LP,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="1" width="28" height="34" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="2" y="1" width="28" height="12" rx="3" fill="#0f172a"/><circle cx="10" cy="7" r="4" fill="#4f46e5" opacity=".7"/><rect x="16" y="4" width="11" height="2.5" rx="1.25" fill="#fff"/><rect x="16" y="8" width="7" height="1.5" rx=".75" fill="#818cf8"/><rect x="4" y="15" width="6" height="6" rx="1.5" fill="#e0e7ff"/><rect x="12" y="15" width="6" height="6" rx="1.5" fill="#ede9fe"/><rect x="20" y="15" width="6" height="6" rx="1.5" fill="#ddd6fe"/><rect x="4" y="23" width="24" height="2" rx="1" fill="#f1f5f9"/><rect x="4" y="27" width="24" height="5" rx="1.5" fill="#4f46e5" opacity=".15"/><rect x="10" y="28.5" width="12" height="2" rx="1" fill="#4f46e5"/></svg>`,
    content: `<div style="width:100%;${F}">

<!-- HERO Agency -->
<section style="background:#0f172a;padding:88px 24px;width:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 20% 50%,rgba(79,70,229,0.25) 0%,transparent 55%),radial-gradient(ellipse at 80% 50%,rgba(124,58,237,0.2) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="max-width:1050px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:48px;position:relative;">
    <div style="flex:1;min-width:280px;color:#fff;">
      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(79,70,229,0.2);border:1px solid rgba(79,70,229,0.4);border-radius:9999px;font-size:13px;font-weight:600;margin-bottom:20px;${F}">
        ✦ Agency chuyên nghiệp — Kết quả thực tế
      </div>
      <h1 style="font-size:clamp(28px,5vw,46px);font-weight:800;letter-spacing:-0.025em;line-height:1.18;margin:0 0 18px;${F}">Chúng tôi xây dựng<br/><span style="background:linear-gradient(90deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">thương hiệu số</span><br/>cho doanh nghiệp của bạn</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.7);line-height:1.75;margin:0 0 32px;max-width:480px;${F}">Từ chiến lược đến triển khai — chúng tôi đồng hành cùng doanh nghiệp trong hành trình phát triển trực tuyến với đội ngũ chuyên gia 10+ năm kinh nghiệm.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px;">
        <a href="#dich-vu" style="padding:14px 32px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 16px rgba(79,70,229,0.45);${F}">Xem dịch vụ</a>
        <a href="#lien-he" style="padding:14px 24px;border:1.5px solid rgba(255,255,255,0.25);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:500;${F}">Liên hệ tư vấn</a>
      </div>
      <div style="display:flex;gap:28px;flex-wrap:wrap;">
        ${[['200+','Dự án hoàn thành'],['98%','Khách hàng hài lòng'],['10+','Năm kinh nghiệm']].map(([n,l])=>
          `<div><div style="font-size:26px;font-weight:800;color:#fff;${F}">${n}</div><div style="font-size:13px;color:rgba(255,255,255,0.5);${F}">${l}</div></div>`).join('')}
      </div>
    </div>
    <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:14px;">
      ${[['🎨','Brand Identity','Logo, màu sắc, bộ nhận diện thương hiệu'],['📱','Social Media','Nội dung và quảng cáo đa nền tảng'],['🌐','Website','Thiết kế và phát triển web hiệu suất cao'],['📊','Analytics','Tracking, báo cáo và tối ưu liên tục']].map(([icon,title,desc])=>
        `<div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:20px;">
          <div style="font-size:24px;margin-bottom:10px;">${icon}</div>
          <h3 style="font-size:14px;font-weight:700;color:#fff;margin:0 0 6px;${F}">${title}</h3>
          <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0;line-height:1.6;${F}">${desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- DỊCH VỤ -->
<section id="dich-vu" style="padding:80px 24px;background:#f8fafc;width:100%;box-sizing:border-box;">
  <div style="max-width:980px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:52px;">
      <span style="display:inline-block;padding:5px 16px;background:#ede9fe;color:#6d28d9;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:14px;${F}">Dịch vụ</span>
      <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0;${F}">Giải pháp toàn diện cho mọi nhu cầu</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:24px;">
      ${[['Marketing & Quảng cáo','Chiến dịch quảng cáo Facebook, Google, TikTok tối ưu ROAS. Quản lý toàn diện từ chiến lược đến thực thi.','🎯','Từ 5.000.000đ / tháng',['Facebook & Instagram Ads','Google Search & Display','TikTok Ads','Email Marketing']],['SEO & Content Marketing','Tối ưu tìm kiếm dài hạn, xây dựng authority và traffic organics bền vững.','📈','Từ 3.000.000đ / tháng',['Nghiên cứu từ khóa','On-page & Technical SEO','Content Calendar','Link Building']],['Thiết kế Website','Website chuyên nghiệp, tốc độ cao, tối ưu chuyển đổi — giao hàng trong 2–4 tuần.','💻','Từ 15.000.000đ / dự án',['UI/UX Design','Next.js / WordPress','Mobile-first','SEO-ready']]].map(([title,desc,icon,price,features])=>
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
          <a href="#lien-he" style="flex-shrink:0;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;align-self:center;${F}">Tìm hiểu</a>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- LIÊN HỆ -->
<section id="lien-he" style="padding:80px 24px;background:#fff;width:100%;box-sizing:border-box;">
  <div style="max-width:680px;margin:0 auto;text-align:center;">
    <h2 style="font-size:clamp(22px,4vw,32px);font-weight:800;color:#0f172a;margin:0 0 12px;${F}">Bắt đầu với tư vấn miễn phí</h2>
    <p style="font-size:16px;color:#64748b;margin:0 0 36px;line-height:1.7;${F}">Điền form bên dưới — đội ngũ của chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc</p>
    <div style="background:#f8fafc;border-radius:20px;padding:36px;text-align:left;">
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <input type="text" placeholder="Họ và tên *" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
          <input type="tel" placeholder="Số điện thoại *" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        </div>
        <input type="email" placeholder="Email công ty *" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        <input type="text" placeholder="Tên công ty / website" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
        <textarea placeholder="Mô tả ngắn nhu cầu của bạn..." style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;min-height:110px;resize:vertical;box-sizing:border-box;${F}"></textarea>
        <button style="width:100%;padding:16px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:800;border:none;border-radius:11px;cursor:pointer;box-shadow:0 4px 16px rgba(79,70,229,0.4);${F}">Gửi yêu cầu tư vấn →</button>
      </div>
      <p style="font-size:12px;color:#94a3b8;text-align:center;margin:14px 0 0;${F}">Phản hồi trong 24h · Tư vấn hoàn toàn miễn phí · Không ràng buộc</p>
    </div>
  </div>
</section>

</div>`,
  })

  // ── Ads 1: Banner thông báo ───────────────────────────────────────────────
  bm.add('tpl-ad-announcement', {
    label: 'Banner thông báo',
    category: ADS,
    media: `<svg viewBox="0 0 32 12" fill="none"><rect x="1" y="1" width="30" height="10" rx="2" fill="#4f46e5"/><rect x="5" y="4" width="12" height="2" rx="1" fill="#fff" opacity=".8"/><rect x="19" y="3.5" width="8" height="3" rx="1.5" fill="#fff" opacity=".3"/></svg>`,
    content: `<div style="background:linear-gradient(90deg,#4f46e5 0%,#7c3aed 100%);padding:12px 20px;width:100%;box-sizing:border-box;${F}">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;max-width:900px;margin:0 auto;">
    <span style="font-size:14px;color:#fff;font-weight:500;text-align:center;${F}">🎉 Ưu đãi đặc biệt — Giảm <strong style="color:#fde68a;">30%</strong> toàn bộ sản phẩm. Kết thúc ngày <strong style="color:#fde68a;">31/12/2025</strong></span>
    <a href="#" style="padding:6px 18px;background:#fff;color:#4f46e5;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:700;white-space:nowrap;${F}">Mua ngay →</a>
    <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;line-height:1;padding:0 0 0 4px;">×</button>
  </div>
</div>`,
  })

  // ── Ads 2: Banner khuyến mãi ngang ───────────────────────────────────────
  bm.add('tpl-ad-banner', {
    label: 'Banner khuyến mãi',
    category: ADS,
    media: `<svg viewBox="0 0 32 16" fill="none"><rect x="1" y="1" width="30" height="14" rx="2.5" fill="#0f172a"/><circle cx="8" cy="8" r="4.5" fill="#4f46e5" opacity=".8"/><rect x="15" y="4" width="12" height="3" rx="1.5" fill="#fff"/><rect x="15" y="9" width="8" height="2" rx="1" fill="#818cf8" opacity=".7"/></svg>`,
    content: `<div style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);border-radius:20px;padding:40px 36px;display:flex;flex-wrap:wrap;align-items:center;gap:32px;overflow:hidden;position:relative;${F}">
  <div style="position:absolute;top:-20px;right:-20px;width:180px;height:180px;background:rgba(99,102,241,0.2);border-radius:50%;pointer-events:none;"></div>
  <div style="position:absolute;bottom:-30px;left:30%;width:140px;height:140px;background:rgba(167,139,250,0.15);border-radius:50%;pointer-events:none;"></div>
  <!-- Badge giảm giá -->
  <div style="position:relative;flex-shrink:0;text-align:center;">
    <div style="width:110px;height:110px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(239,68,68,0.45);">
      <span style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:0.06em;${F}">GIẢM</span>
      <span style="font-size:38px;font-weight:900;color:#fff;line-height:1;${F}">50%</span>
    </div>
  </div>
  <!-- Nội dung chính -->
  <div style="flex:1;min-width:220px;position:relative;">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#818cf8;margin:0 0 8px;${F}">Flash Sale · Chỉ hôm nay</p>
    <h2 style="font-size:clamp(22px,4vw,30px);font-weight:800;color:#fff;margin:0 0 10px;line-height:1.2;${F}">Tên sản phẩm / Dịch vụ</h2>
    <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 20px;line-height:1.6;${F}">Mô tả ngắn ưu đãi. Nêu rõ giá trị và lý do tại sao phải hành động ngay hôm nay.</p>
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <a href="#" style="padding:12px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 4px 14px rgba(79,70,229,0.5);${F}">Nhận ưu đãi ngay</a>
      <div>
        <span style="font-size:22px;font-weight:800;color:#fff;${F}">199.000đ</span>
        <span style="font-size:14px;color:rgba(255,255,255,0.4);text-decoration:line-through;margin-left:8px;${F}">399.000đ</span>
      </div>
    </div>
  </div>
  <!-- Countdown -->
  <div style="flex-shrink:0;position:relative;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;margin:0 0 10px;${F}">Kết thúc sau</p>
    <div style="display:flex;gap:8px;">
      ${[['02','Giờ'],['45','Phút'],['30','Giây']].map(([n,l])=>
        `<div style="text-align:center;"><div style="width:52px;height:52px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;${F}">${n}</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:5px;${F}">${l}</div></div>`).join('')}
    </div>
  </div>
</div>`,
  })

  // ── Ads 3: Card quảng cáo Facebook / Social ───────────────────────────────
  bm.add('tpl-ad-social', {
    label: 'Quảng cáo Social / Facebook',
    category: ADS,
    media: `<svg viewBox="0 0 28 32" fill="none"><rect x="1" y="1" width="26" height="30" rx="3" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/><rect x="1" y="1" width="26" height="13" rx="3" fill="#4f46e5"/><rect x="1" y="11" width="26" height="3" fill="#4f46e5"/><rect x="4" y="16" width="8" height="2" rx="1" fill="#334155"/><rect x="4" y="20" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="4" y="24" width="13" height="2" rx="1" fill="#94a3b8"/><rect x="4" y="27" width="8" height="3" rx="1.5" fill="#4f46e5"/></svg>`,
    content: `<div style="max-width:500px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);${F}">
  <!-- Ảnh quảng cáo -->
  <div style="position:relative;">
    <img src="https://placehold.co/500x280/312e81/ffffff?text=Ảnh+quảng+cáo" alt="" style="width:100%;height:280px;object-fit:cover;display:block;"/>
    <div style="position:absolute;top:12px;left:12px;padding:5px 12px;background:rgba(0,0,0,0.6);border-radius:9999px;backdrop-filter:blur(6px);">
      <span style="font-size:12px;font-weight:700;color:#fff;${F}">Quảng cáo</span>
    </div>
    <div style="position:absolute;bottom:12px;left:12px;right:12px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:10px;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:14px;font-weight:800;color:#fff;${F}">🔥 Giảm 50% — Chỉ hôm nay!</span>
      <span style="font-size:14px;color:rgba(255,255,255,0.8);${F}">→</span>
    </div>
  </div>
  <!-- Nội dung bên dưới -->
  <div style="padding:16px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <div style="width:36px;height:36px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:14px;flex-shrink:0;">B</div>
      <div>
        <div style="font-weight:700;font-size:14px;color:#0f172a;${F}">Tên Thương Hiệu</div>
        <div style="font-size:12px;color:#94a3b8;${F}">Bài viết được tài trợ</div>
      </div>
    </div>
    <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">Tiêu đề hấp dẫn — Khơi gợi sự tò mò ngay</h3>
    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 14px;${F}">Mô tả ngắn về sản phẩm/dịch vụ. Tập trung vào lợi ích cụ thể và lý do khách hàng cần hành động ngay.</p>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
      <div>
        <span style="font-size:20px;font-weight:800;color:#4f46e5;${F}">199.000đ</span>
        <span style="font-size:13px;color:#94a3b8;text-decoration:line-through;margin-left:6px;${F}">399.000đ</span>
      </div>
      <a href="#" style="padding:10px 22px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:9px;font-size:14px;font-weight:700;${F}">Mua ngay</a>
    </div>
  </div>
</div>`,
  })

  // ── Ads 4: Popup ưu đãi ───────────────────────────────────────────────────
  bm.add('tpl-ad-popup', {
    label: 'Popup ưu đãi',
    category: ADS,
    media: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="3" fill="#fff" stroke="#4f46e5" stroke-width="1.5"/><rect x="4" y="4" width="24" height="8" rx="3" fill="#4f46e5"/><rect x="4" y="10" width="24" height="2" fill="#4f46e5"/><rect x="8" y="16" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="10" y="20" width="12" height="3" rx="1.5" fill="#4f46e5"/><rect x="25" y="4" width="4" height="4" rx="1" fill="#ef4444"/><line x1="26.5" y1="5.5" x2="27.5" y2="6.5" stroke="#fff" stroke-width="1.2"/><line x1="26.5" y1="6.5" x2="27.5" y2="5.5" stroke="#fff" stroke-width="1.2"/></svg>`,
    content: `<div style="position:relative;max-width:480px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.25);${F}">
  <!-- Nút đóng -->
  <button onclick="this.parentElement.style.display='none'" style="position:absolute;top:12px;right:12px;z-index:10;width:30px;height:30px;background:rgba(255,255,255,0.25);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;backdrop-filter:blur(4px);">×</button>
  <!-- Header gradient -->
  <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:36px 32px 28px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;background:rgba(255,255,255,0.1);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-30px;left:-10px;width:100px;height:100px;background:rgba(167,139,250,0.2);border-radius:50%;"></div>
    <div style="position:relative;">
      <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 14px;">🎁</div>
      <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin:0 0 8px;${F}">Ưu đãi đặc biệt dành cho bạn</p>
      <h2 style="font-size:clamp(22px,4vw,28px);font-weight:800;color:#fff;margin:0 0 8px;line-height:1.2;${F}">Giảm ngay 30%<br/>Chỉ trong 10 phút!</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.7);margin:0;${F}">Dành cho khách hàng đăng ký lần đầu</p>
    </div>
  </div>
  <!-- Body -->
  <div style="padding:28px 32px;">
    <ul style="list-style:none;padding:0;margin:0 0 24px;">
      ${TICK_ITEM('Áp dụng cho tất cả sản phẩm trong cửa hàng')}
      ${TICK_ITEM('Không giới hạn giá trị đơn hàng tối thiểu')}
      ${TICK_ITEM('Kết hợp được với các ưu đãi thành viên')}
    </ul>
    <!-- Mã coupon -->
    <div style="background:#f8fafc;border:2px dashed #c4b5fd;border-radius:12px;padding:16px;text-align:center;margin-bottom:20px;">
      <p style="font-size:12px;color:#64748b;margin:0 0 8px;font-weight:600;${F}">Dùng mã giảm giá</p>
      <p style="font-size:24px;font-weight:900;color:#4f46e5;letter-spacing:0.12em;margin:0;${F}">SALE30</p>
    </div>
    <!-- Form email -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <input type="email" placeholder="Nhập email để nhận mã..." style="flex:1;min-width:180px;padding:12px 14px;border-radius:9px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;box-sizing:border-box;${F}"/>
      <button style="padding:12px 20px;background:#4f46e5;color:#fff;font-size:14px;font-weight:700;border:none;border-radius:9px;cursor:pointer;white-space:nowrap;${F}">Nhận mã</button>
    </div>
    <p style="font-size:12px;color:#94a3b8;text-align:center;margin:12px 0 0;${F}">🔒 Không spam · Bảo mật tuyệt đối</p>
  </div>
</div>`,
  })

  // ── Ads 5: Flash Sale toàn trang ──────────────────────────────────────────
  bm.add('tpl-ad-flash-full', {
    label: 'Flash Sale toàn trang',
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
      <span style="font-size:13px;font-weight:800;color:#fde68a;letter-spacing:0.08em;text-transform:uppercase;${F}">🔥 Flash Sale · Kết thúc sau 2 giờ nữa</span>
    </div>
    <!-- Tiêu đề -->
    <h2 style="font-size:clamp(32px,7vw,60px);font-weight:900;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin:0 0 8px;${F}">GIẢM <span style="color:#fbbf24;">70%</span></h2>
    <p style="font-size:clamp(16px,3vw,22px);font-weight:700;color:rgba(255,255,255,0.9);margin:0 0 24px;${F}">Toàn bộ sản phẩm — Chỉ trong hôm nay!</p>
    <!-- Countdown lớn -->
    <div style="display:inline-flex;gap:12px;background:rgba(0,0,0,0.3);border-radius:16px;padding:16px 24px;margin-bottom:28px;">
      ${[['00','Giờ'],['45','Phút'],['30','Giây']].map(([n,l])=>
        `<div style="text-align:center;">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.25);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;color:#fff;${F}">${n}</div>
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;${F}">${l}</div>
        </div>`).join('<div style="font-size:28px;font-weight:900;color:rgba(255,255,255,0.5);display:flex;align-items:center;padding-bottom:18px;">:</div>')}
    </div>
    <!-- Sản phẩm flash -->
    <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-bottom:28px;">
      ${[['🎁 Gói Pro',['699','1.990'],['#fbbf24','#0f172a']],['⭐ Gói Premium',['1.499','4.990'],['#fff','#0f172a']],['🚀 Gói Team',['2.990','8.990'],['#fbbf24','#0f172a']]].map(([name,[sale,orig],[bg,color]])=>
        `<div style="background:rgba(255,255,255,0.12);border:1.5px solid rgba(255,255,255,0.2);border-radius:14px;padding:16px 20px;text-align:center;min-width:150px;">
          <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:8px;${F}">${name}</div>
          <div style="font-size:24px;font-weight:900;color:#fbbf24;${F}">${sale}K</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);text-decoration:line-through;margin-bottom:10px;${F}">${orig}K</div>
          <a href="#" style="display:block;padding:8px 14px;background:${bg};color:${color};text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;${F}">Mua ngay</a>
        </div>`).join('')}
    </div>
    <!-- CTA chính -->
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="#" style="padding:16px 44px;background:#fbbf24;color:#0f172a;text-decoration:none;border-radius:11px;font-size:17px;font-weight:900;box-shadow:0 6px 20px rgba(251,191,36,0.4);${F}">🛒 Mua ngay — Giảm 70%</a>
      <a href="#" style="padding:16px 24px;border:2px solid rgba(255,255,255,0.3);color:#fff;text-decoration:none;border-radius:11px;font-size:15px;font-weight:600;${F}">Xem tất cả ưu đãi →</a>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:16px 0 0;${F}">⚡ Ưu đãi kết thúc khi hết hàng · Không áp dụng cùng khuyến mãi khác</p>
  </div>
</div>`,
  })

  // ── Ads 6: Flash Sale sản phẩm nổi bật ───────────────────────────────────
  bm.add('tpl-ad-flash-products', {
    label: 'Flash Sale sản phẩm',
    category: ADS,
    media: `<svg viewBox="0 0 32 20" fill="none"><rect x="1" y="1" width="30" height="18" rx="2.5" fill="#f59e0b"/><rect x="2" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="12" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="22" y="2" width="9" height="16" rx="1.5" fill="#fff" opacity=".3"/><rect x="3" y="14" width="7" height="2.5" rx="1" fill="#fff"/><rect x="13" y="14" width="7" height="2.5" rx="1" fill="#fff"/><rect x="23" y="14" width="7" height="2.5" rx="1" fill="#fff"/></svg>`,
    content: `<div style="width:100%;box-sizing:border-box;${F}">
  <!-- Header flash sale -->
  <div style="background:linear-gradient(90deg,#f59e0b 0%,#ef4444 100%);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <span style="font-size:20px;">⚡</span>
      <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.01em;${F}">FLASH SALE</span>
      <div style="display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border-radius:9999px;padding:5px 14px;">
        <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);${F}">Kết thúc sau:</span>
        ${['01','23','45'].map(n=>`<span style="font-size:16px;font-weight:900;color:#fff;${F}">${n}</span>`).join(`<span style="color:rgba(255,255,255,0.6);font-weight:700;font-size:14px;">:</span>`)}
      </div>
    </div>
    <a href="#" style="padding:8px 20px;background:#fff;color:#ef4444;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:800;${F}">Xem tất cả →</a>
  </div>
  <!-- Lưới sản phẩm -->
  <div style="background:#fff;padding:24px;display:flex;flex-wrap:wrap;gap:16px;">
    ${[
      ['Sản phẩm A','Mô tả ngắn sản phẩm A','249','599','#fef2f2','#ef4444','58'],
      ['Sản phẩm B','Mô tả ngắn sản phẩm B','399','990','#fff7ed','#f59e0b','59'],
      ['Sản phẩm C','Mô tả ngắn sản phẩm C','189','490','#f0fdf4','#16a34a','61'],
      ['Sản phẩm D','Mô tả ngắn sản phẩm D','299','750','#eff6ff','#2563eb','60'],
    ].map(([name, desc, sale, orig, bg, color, pct])=>
      `<div style="flex:1;min-width:180px;max-width:260px;background:#fff;border-radius:16px;border:1.5px solid #f1f5f9;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <!-- Ảnh sản phẩm -->
        <div style="position:relative;">
          <img src="https://placehold.co/260x180/${color.replace('#','')}/ffffff?text=${name}" alt="${name}" style="width:100%;height:180px;object-fit:cover;display:block;"/>
          <div style="position:absolute;top:10px;left:10px;padding:4px 10px;background:${color};color:#fff;border-radius:9999px;font-size:12px;font-weight:800;${F}">-${pct}%</div>
          <div style="position:absolute;top:10px;right:10px;padding:4px 10px;background:#ef4444;color:#fff;border-radius:9999px;font-size:11px;font-weight:700;${F}">⚡ Flash</div>
        </div>
        <!-- Thông tin -->
        <div style="padding:14px;">
          <h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;${F}">${name}</h4>
          <p style="font-size:13px;color:#64748b;margin:0 0 10px;${F}">${desc}</p>
          <!-- Thanh tiến trình số lượng -->
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:11px;color:#ef4444;font-weight:600;${F}">🔥 Đã bán 73%</span>
              <span style="font-size:11px;color:#94a3b8;${F}">Còn 27 sp</span>
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
            <a href="#" style="padding:8px 16px;background:${color};color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;${F}">Mua</a>
          </div>
        </div>
      </div>`).join('')}
  </div>
  <!-- Footer banner -->
  <div style="background:linear-gradient(90deg,#0f172a,#1e1b4b);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
    <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:0;${F}">⚡ Miễn phí vận chuyển cho đơn từ 500K · Thanh toán an toàn · Đổi trả dễ dàng</p>
    <a href="#" style="font-size:13px;font-weight:700;color:#818cf8;text-decoration:none;${F}">Xem tất cả sản phẩm khuyến mãi →</a>
  </div>
</div>`,
  })
}
