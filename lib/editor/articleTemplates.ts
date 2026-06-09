import type { Editor } from 'grapesjs'

const F  = `font-family:'Segoe UI',system-ui,-apple-system,sans-serif;`
const AH1 = `font-size:clamp(26px,5vw,38px);font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0 0 20px;color:#0f172a;${F}`
const AH2 = `font-size:clamp(20px,3.5vw,26px);font-weight:800;letter-spacing:-0.02em;line-height:1.3;margin:40px 0 14px;color:#0f172a;padding-bottom:10px;border-bottom:2px solid #e0e7ff;${F}`
const AH3 = `font-size:19px;font-weight:700;line-height:1.35;margin:28px 0 10px;color:#1e293b;${F}`
const AP  = `font-size:16px;color:#475569;line-height:1.8;margin:0 0 16px;${F}`
const CAT = { label: 'Mẫu bài viết', order: 8 }

// Shared fragments
const BREADCRUMB = `<nav aria-label="Breadcrumb" style="margin-bottom:20px;">
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px;">
    <li><a href="/" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${F}">Trang chủ</a></li>
    <li style="color:#94a3b8;font-size:13px;margin:0 2px;">/</li>
    <li><a href="#" style="font-size:13px;color:#4f46e5;text-decoration:none;font-weight:500;${F}">Blog</a></li>
    <li style="color:#94a3b8;font-size:13px;margin:0 2px;">/</li>
    <li style="font-size:13px;color:#64748b;${F}" aria-current="page">Bài viết</li>
  </ol>
</nav>`

const META = (cat = 'SEO', time = '7') => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
  <span style="padding:4px 12px;background:#ede9fe;color:#7c3aed;font-size:12px;font-weight:700;border-radius:9999px;${F}">${cat}</span>
  <span style="font-size:13px;color:#94a3b8;">•</span>
  <span style="font-size:13px;color:#94a3b8;${F}">${time} phút đọc</span>
  <span style="font-size:13px;color:#94a3b8;">•</span>
  <span style="font-size:13px;color:#94a3b8;${F}">01/06/2025</span>
</div>`

const AUTHOR = `<div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;margin-bottom:28px;">
  <img src="https://placehold.co/44x44/4f46e5/fff?text=A" alt="" style="width:44px;height:44px;border-radius:50%;flex-shrink:0;"/>
  <div>
    <div style="font-weight:600;font-size:14px;color:#0f172a;${F}">Nguyễn Văn A</div>
    <div style="font-size:12px;color:#94a3b8;${F}">Chuyên gia Content Marketing</div>
  </div>
</div>`

const COVER = (text = 'Ảnh+bìa+bài+viết') => `<img src="https://placehold.co/740x400/e0e7ff/4f46e5?text=${text}" alt="Ảnh bìa" style="width:100%;height:auto;border-radius:14px;margin-bottom:32px;display:block;"/>`

const CTA_BOX = `<div style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%);border:1.5px solid #c4b5fd;border-radius:16px;padding:24px 28px;margin-top:32px;display:flex;flex-wrap:wrap;align-items:center;gap:16px;${F}">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7c3aed;margin:0 0 6px;">Bài viết liên quan</p>
    <p style="font-size:15px;font-weight:600;color:#0f172a;margin:0 0 4px;">Bạn muốn tìm hiểu thêm?</p>
    <p style="font-size:13px;color:#64748b;margin:0;">Khám phá các bài viết chuyên sâu khác</p>
  </div>
  <a href="#" style="padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;white-space:nowrap;box-shadow:0 4px 12px rgba(79,70,229,0.3);">Xem ngay →</a>
</div>`

const CHECKLIST = (items: string[]) => `<ul style="list-style:none;padding:0;margin:16px 0 24px;${F}">
  ${items.map((t, i) => `<li style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;font-size:15px;color:#334155;line-height:1.65;${i < items.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
    <span style="width:22px;height:22px;background:#4f46e5;border-radius:50%;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>${t}</li>`).join('')}
</ul>`

const TOC_WIDGET = (items: { href: string; text: string }[]) => `<nav data-toc style="background:#f8fafc;border:1.5px solid #e0e7ff;border-radius:14px;padding:20px 24px;margin:32px 0 36px;${F}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
    <span style="font-size:15px;">📋</span>
    <span style="font-size:14px;font-weight:700;color:#0f172a;${F}">Mục lục bài viết</span>
  </div>
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;">
    ${items.map((item, i) => `<li><a href="${item.href}" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;text-decoration:none;color:#374151;font-size:14px;${F}">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:#4f46e5;color:#fff;border-radius:50%;font-size:11px;font-weight:700;flex-shrink:0;">${i + 1}</span>${item.text}</a></li>`).join('')}
  </ol>
</nav>`

const NOTE_BOX = (icon: string, color: string, bg: string, border: string, content: string) =>
  `<div style="background:${bg};border:1.5px solid ${border};border-radius:12px;padding:16px 20px;margin:20px 0 24px;display:flex;gap:12px;align-items:flex-start;${F}">
    <span style="font-size:20px;flex-shrink:0;">${icon}</span>
    <p style="font-size:15px;color:${color};line-height:1.7;margin:0;">${content}</p>
  </div>`

// ─────────────────────────────────────────────────────────────────────────────

export function registerArticleTemplates(editor: Editor) {
  const bm = editor.BlockManager

  // ── 1. Bài viết đơn giản ─────────────────────────────────────────────────
  bm.add('tpl-article-basic', {
    label: 'Bài viết đơn giản',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="7" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="13" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="17" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="21" width="16" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="27" width="10" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('Marketing', '6')}
<h1 style="${AH1}">Tiêu đề bài viết chính — Rõ ràng và chứa từ khóa SEO</h1>
${AUTHOR}
${COVER()}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 24px;${F}">Đây là đoạn dẫn nhập (introduction). Tóm tắt 2–3 câu về nội dung chính, nêu vấn đề người đọc đang gặp và cho họ biết bài viết sẽ giúp được gì.</p>

<h2 id="phan-1" style="${AH2}">1. Tiêu đề phần thứ nhất</h2>
<p style="${AP}">Nội dung phần đầu tiên. Trình bày bối cảnh, định nghĩa khái niệm chính hoặc cung cấp thông tin nền cần thiết để người đọc hiểu các phần tiếp theo.</p>
<p style="${AP}">Tiếp tục phát triển ý chính. Sử dụng dữ liệu cụ thể, ví dụ thực tế hoặc câu chuyện để tăng tính thuyết phục.</p>
<h3 style="${AH3}">1.1. Tiêu đề phụ (H3)</h3>
<p style="${AP}">Nội dung chi tiết cho tiêu đề phụ. H3 giúp tăng khả năng xuất hiện trong featured snippets và cải thiện cấu trúc bài viết.</p>

<h2 id="phan-2" style="${AH2}">2. Tiêu đề phần thứ hai</h2>
<p style="${AP}">Nội dung phần hai — thường là phần quan trọng nhất, trình bày giải pháp hoặc thông tin cốt lõi của bài viết.</p>
${CHECKLIST(['Điểm quan trọng đầu tiên bạn cần thực hiện ngay hôm nay', 'Điểm quan trọng thứ hai giúp đạt được kết quả tốt hơn', 'Điểm quan trọng thứ ba để hoàn thiện chiến lược của bạn'])}

<h2 id="ket-luan" style="${AH2}">Kết luận</h2>
<p style="${AP}">Tóm tắt ngắn gọn các ý chính. Nhắc nhở người đọc về giá trị cốt lõi và khuyến khích họ hành động ngay.</p>
${CTA_BOX}
</article>`,
  })

  // ── 2. Bài viết có ảnh nội dung ──────────────────────────────────────────
  bm.add('tpl-article-photo', {
    label: 'Bài có ảnh nội dung',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="7" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="13" width="8" height="7" rx="2" fill="#bfdbfe"/><rect x="17" y="13" width="8" height="2" rx="1" fill="#94a3b8"/><rect x="17" y="17" width="6" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="23" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="27" width="13" height="2" rx="1" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${META('Content', '8')}
<h1 style="${AH1}">Hướng dẫn chi tiết — Kết hợp văn bản và hình ảnh minh họa</h1>
${AUTHOR}
${COVER('Ảnh+bìa+bài+viết')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 32px;${F}">Đoạn giới thiệu ngắn gọn, thu hút ngay từ đầu. Cho người đọc biết họ sẽ học được gì sau khi đọc xong bài viết này.</p>

<h2 id="phan-1" style="${AH2}">1. Tiêu đề phần đầu</h2>
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;margin-bottom:24px;">
  <img src="https://placehold.co/300x200/e0e7ff/4f46e5?text=Ảnh+minh+họa" alt="Minh họa" style="flex:0 0 auto;width:280px;max-width:100%;border-radius:12px;object-fit:cover;"/>
  <div style="flex:1;min-width:220px;">
    <p style="${AP}margin-top:0;">Nội dung đi kèm với ảnh minh họa bên cạnh. Kết hợp hình ảnh và văn bản giúp người đọc dễ hình dung hơn, đồng thời tăng thời gian đọc trang.</p>
    <p style="${AP}">Tiếp tục giải thích chi tiết hơn về nội dung trong ảnh hoặc bổ sung thông tin liên quan để làm rõ điểm đang trình bày.</p>
  </div>
</div>

<h2 id="phan-2" style="${AH2}">2. Phân tích chuyên sâu</h2>
<p style="${AP}">Nội dung phân tích. Phần này đi sâu vào vấn đề cốt lõi với bằng chứng, số liệu và ví dụ cụ thể.</p>
${CHECKLIST(['Luận điểm thứ nhất được hỗ trợ bởi bằng chứng cụ thể', 'Luận điểm thứ hai với dữ liệu và ví dụ thực tế', 'Luận điểm thứ ba củng cố quan điểm trung tâm'])}

<blockquote style="margin:24px 0;padding:20px 24px;border-left:4px solid #4f46e5;background:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:17px;font-style:italic;color:#3730a3;line-height:1.75;margin:0 0 10px;${F}">"Trích dẫn quan trọng từ chuyên gia hoặc nghiên cứu uy tín để tăng độ tin cậy cho bài viết."</p>
  <footer style="font-size:14px;color:#6d28d9;font-weight:600;${F}">— Nguồn trích dẫn, Năm xuất bản</footer>
</blockquote>

<h2 id="phan-3" style="${AH2}">3. Ứng dụng thực tế</h2>
<p style="${AP}">Hướng dẫn người đọc cách áp dụng kiến thức vào thực tế. Phần này làm tăng giá trị của bài viết và giữ chân người đọc.</p>
<img src="https://placehold.co/700x320/ede9fe/7c3aed?text=Hình+ảnh+minh+họa+thực+tế" alt="Minh họa thực tế" style="width:100%;height:auto;border-radius:12px;margin:16px 0 20px;display:block;"/>
<p style="${AP}">Giải thích ảnh minh họa ở trên và liên kết với nội dung đã trình bày ở các phần trước.</p>

<h2 id="ket-luan" style="${AH2}">Kết luận</h2>
<p style="${AP}">Tổng kết toàn bộ bài viết. Nhấn mạnh lại lợi ích chính và kêu gọi người đọc hành động.</p>
${CTA_BOX}
</article>`,
  })

  // ── 3. Bài viết cơ bản có mục lục ────────────────────────────────────────
  bm.add('tpl-article-toc', {
    label: 'Bài có mục lục',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="6" width="18" height="3" rx="1.5" fill="#4f46e5"/><rect x="7" y="12" width="18" height="5" rx="2" fill="#e0e7ff" stroke="#818cf8" stroke-width="1"/><rect x="9" y="13.5" width="5" height="1.5" rx="0.75" fill="#4f46e5"/><rect x="9" y="15" width="3" height="1" rx="0.5" fill="#818cf8"/><rect x="7" y="20" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="24" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="28" width="16" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('SEO', '10')}
<h1 style="${AH1}">Tiêu đề bài viết — Tối ưu SEO với cấu trúc đầy đủ</h1>
${AUTHOR}
${COVER()}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">Đoạn giới thiệu của bài viết. Trình bày vấn đề trọng tâm, lý do tại sao chủ đề này quan trọng và người đọc sẽ nhận được gì từ bài viết này.</p>
${TOC_WIDGET([
  { href: '#phan-1', text: 'Giới thiệu tổng quan về chủ đề' },
  { href: '#phan-2', text: 'Phân tích chi tiết và dữ liệu' },
  { href: '#phan-3', text: 'Giải pháp và hướng dẫn thực tế' },
  { href: '#ket-luan', text: 'Kết luận và bước tiếp theo' },
])}

<h2 id="phan-1" style="${AH2}">1. Giới thiệu tổng quan về chủ đề</h2>
<p style="${AP}">Nội dung tổng quan. Phần này cung cấp bối cảnh và định nghĩa các thuật ngữ chuyên ngành cần thiết để người đọc có thể theo dõi phần tiếp theo.</p>
<p style="${AP}">Tiếp tục mở rộng, đưa ra số liệu hoặc thống kê thuyết phục để khẳng định tầm quan trọng của chủ đề.</p>
<h3 style="${AH3}">1.1. Khái niệm cơ bản</h3>
<p style="${AP}">Định nghĩa và giải thích chi tiết. Dùng ngôn ngữ đơn giản, tránh jargon không cần thiết để đảm bảo bài viết tiếp cận được nhiều đối tượng.</p>

<h2 id="phan-2" style="${AH2}">2. Phân tích chi tiết và dữ liệu</h2>
<p style="${AP}">Đây là phần cốt lõi của bài viết. Trình bày phân tích, dữ liệu, bảng so sánh hoặc case study để hỗ trợ luận điểm chính.</p>
${CHECKLIST([
  'Số liệu thống kê hoặc nghiên cứu liên quan đến chủ đề',
  'So sánh các phương pháp hoặc giải pháp khác nhau',
  'Ưu và nhược điểm của từng lựa chọn',
])}
<h3 style="${AH3}">2.1. Phân tích chuyên sâu</h3>
<p style="${AP}">Đi sâu hơn vào từng điểm. Sử dụng ví dụ cụ thể từ thực tế hoặc kết quả từ các nghiên cứu để làm vững chắc luận điểm.</p>

<h2 id="phan-3" style="${AH2}">3. Giải pháp và hướng dẫn thực tế</h2>
<p style="${AP}">Phần hành động. Hướng dẫn người đọc từng bước cụ thể để áp dụng kiến thức vào thực tế. Đây là phần tạo ra giá trị lớn nhất.</p>
${NOTE_BOX('💡', '#92400e', '#fffbeb', '#fcd34d', '<strong>Mẹo thực tế:</strong> Thêm một lời khuyên nhanh hoặc cách tắt giúp người đọc tiết kiệm thời gian khi triển khai.')}
<p style="${AP}">Tiếp tục hướng dẫn chi tiết. Chia nhỏ thành các bước rõ ràng và cụ thể để người đọc dễ làm theo.</p>

<h2 id="ket-luan" style="${AH2}">Kết luận</h2>
<p style="${AP}">Tóm tắt toàn bộ bài viết, nhấn mạnh những điểm then chốt và khuyến khích người đọc bắt đầu thực hiện ngay hôm nay.</p>
${CTA_BOX}
</article>`,
  })

  // ── 4. Hướng dẫn từng bước có mục lục ───────────────────────────────────
  bm.add('tpl-howto-toc', {
    label: 'Hướng dẫn từng bước',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="6" width="18" height="3" rx="1.5" fill="#4f46e5"/><circle cx="9.5" cy="15" r="2.5" fill="#4f46e5"/><rect x="14" y="13.5" width="11" height="2" rx="1" fill="#94a3b8"/><rect x="14" y="16.5" width="8" height="1.5" rx="0.75" fill="#e2e8f0"/><circle cx="9.5" cy="22" r="2.5" fill="#818cf8"/><rect x="14" y="20.5" width="11" height="2" rx="1" fill="#94a3b8"/><rect x="14" y="23.5" width="7" height="1.5" rx="0.75" fill="#e2e8f0"/><circle cx="9.5" cy="29" r="2.5" fill="#c4b5fd"/><rect x="14" y="27.5" width="9" height="2" rx="1" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('Hướng dẫn', '12')}
<h1 style="${AH1}">Cách làm [Chủ đề] từng bước — Hướng dẫn đầy đủ cho người mới</h1>
${AUTHOR}
${COVER('Ảnh+bìa+hướng+dẫn')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">Trong bài hướng dẫn này, bạn sẽ học được cách [làm điều gì đó] theo từng bước cụ thể — từ cơ bản đến nâng cao. Chỉ cần làm theo đúng thứ tự là bạn sẽ đạt được kết quả mong muốn.</p>
${NOTE_BOX('⏱', '#1e40af', '#eff6ff', '#bfdbfe', '<strong>Thời gian thực hiện:</strong> Khoảng 30–60 phút. <strong>Yêu cầu:</strong> Không cần kinh nghiệm trước đó.')}
${TOC_WIDGET([
  { href: '#buoc-1', text: 'Bước 1: Chuẩn bị và thu thập tài nguyên' },
  { href: '#buoc-2', text: 'Bước 2: Thiết lập môi trường làm việc' },
  { href: '#buoc-3', text: 'Bước 3: Thực hiện quy trình chính' },
  { href: '#buoc-4', text: 'Bước 4: Kiểm tra và tối ưu kết quả' },
  { href: '#ket-luan', text: 'Kết luận và bước tiếp theo' },
])}

<h2 id="buoc-1" style="${AH2}">Bước 1: Chuẩn bị và thu thập tài nguyên</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(79,70,229,0.35);${F}">1</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Trước khi bắt đầu, hãy đảm bảo bạn đã có đủ các công cụ và tài nguyên cần thiết. Bước chuẩn bị kỹ lưỡng sẽ giúp quá trình thực hiện diễn ra suôn sẻ hơn nhiều.</p>
  </div>
</div>
${CHECKLIST(['Công cụ / tài nguyên cần thiết thứ nhất', 'Công cụ / tài nguyên cần thiết thứ hai', 'Tài khoản hoặc quyền truy cập cần có trước'])}

<h2 id="buoc-2" style="${AH2}">Bước 2: Thiết lập môi trường làm việc</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#9333ea);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(124,58,237,0.35);${F}">2</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Hướng dẫn cách cài đặt, cấu hình hoặc thiết lập môi trường. Giải thích lý do tại sao mỗi thiết lập lại quan trọng để người đọc không bỏ qua bước này.</p>
  </div>
</div>
<p style="${AP}">Mô tả chi tiết từng hành động cần thực hiện trong bước này. Có thể thêm ảnh chụp màn hình hoặc ảnh minh họa nếu cần.</p>
${NOTE_BOX('⚠️', '#92400e', '#fffbeb', '#fcd34d', '<strong>Lưu ý quan trọng:</strong> Đây là bước dễ mắc lỗi nhất. Hãy kiểm tra lại kỹ trước khi chuyển sang bước 3.')}

<h2 id="buoc-3" style="${AH2}">Bước 3: Thực hiện quy trình chính</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#9333ea,#db2777);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(147,51,234,0.35);${F}">3</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Đây là bước quan trọng nhất — nơi hầu hết công việc thực sự được thực hiện. Làm theo từng hướng dẫn nhỏ bên dưới theo đúng thứ tự.</p>
  </div>
</div>
<h3 style="${AH3}">3.1. Bước phụ đầu tiên</h3>
<p style="${AP}">Mô tả chi tiết hành động cụ thể. Nên bao gồm ảnh minh họa, code snippet hoặc ví dụ thực tế khi cần thiết.</p>
<h3 style="${AH3}">3.2. Bước phụ thứ hai</h3>
<p style="${AP}">Tiếp tục hướng dẫn. Nếu có nhiều cách thực hiện, hãy chọn và đề xuất cách tốt nhất, giải thích tại sao.</p>

<h2 id="buoc-4" style="${AH2}">Bước 4: Kiểm tra và tối ưu kết quả</h2>
<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
  <div style="width:48px;height:48px;background:linear-gradient(135deg,#db2777,#f59e0b);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 14px rgba(219,39,119,0.3);${F}">4</div>
  <div style="flex:1;">
    <p style="${AP}margin-top:0;">Sau khi hoàn thành các bước trên, hãy kiểm tra lại kết quả để đảm bảo mọi thứ hoạt động đúng như mong đợi.</p>
  </div>
</div>
${NOTE_BOX('✅', '#065f46', '#ecfdf5', '#6ee7b7', '<strong>Kiểm tra thành công:</strong> Nếu bạn thấy [kết quả cụ thể], bạn đã hoàn thành đúng. Nếu gặp lỗi, xem phần xử lý sự cố bên dưới.')}

<h2 id="ket-luan" style="${AH2}">Kết luận</h2>
<p style="${AP}">Chúc mừng! Bạn đã hoàn thành toàn bộ quy trình. Tóm tắt nhanh những gì đã đạt được và gợi ý bước tiếp theo để đạt kết quả tốt hơn.</p>
${CTA_BOX}
</article>`,
  })

  // ── 5. Bài viết nâng cao đầy đủ ─────────────────────────────────────────
  bm.add('tpl-article-advanced', {
    label: 'Bài nâng cao (đầy đủ)',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="3" y="1" width="26" height="34" rx="3" fill="#f0f4ff" stroke="#4f46e5" stroke-width="1.5"/><rect x="7" y="5" width="18" height="3.5" rx="1.75" fill="#4f46e5"/><rect x="7" y="11" width="18" height="4" rx="1.5" fill="#e0e7ff" stroke="#818cf8" stroke-width="1"/><rect x="9" y="12" width="10" height="1.5" rx="0.75" fill="#4f46e5"/><rect x="9" y="13.5" width="6" height="1" rx="0.5" fill="#818cf8"/><rect x="7" y="18" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="22" width="14" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="22" width="18" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="26" width="10" height="2" rx="1" fill="#94a3b8"/><rect x="7" y="30" width="15" height="2" rx="1" fill="#c4b5fd"/></svg>`,
    content: `<article style="max-width:740px;margin:0 auto;padding:48px 24px;${F}">
${BREADCRUMB}
${META('Chuyên sâu', '15')}
<h1 style="${AH1}">Tiêu đề bài viết chuyên sâu — Hướng dẫn toàn diện từ A đến Z</h1>
${AUTHOR}
${COVER('Ảnh+bìa+bài+chuyên+sâu')}
<p style="font-size:17px;color:#334155;line-height:1.8;margin:0 0 8px;${F}">Đây là bài viết chuyên sâu, bao gồm toàn bộ những gì bạn cần biết về [chủ đề]. Sau khi đọc xong, bạn sẽ có đủ kiến thức và công cụ để tự triển khai thành công.</p>
${TOC_WIDGET([
  { href: '#tong-quan', text: 'Tổng quan và lý do quan trọng' },
  { href: '#phan-tich', text: 'Phân tích chi tiết — Dữ liệu và bằng chứng' },
  { href: '#giai-phap', text: 'Giải pháp thực tế — Từng bước cụ thể' },
  { href: '#cong-cu', text: 'Công cụ và tài nguyên hỗ trợ' },
  { href: '#sai-lam', text: 'Những sai lầm thường gặp cần tránh' },
  { href: '#ket-luan', text: 'Kết luận và lộ trình tiếp theo' },
])}

<h2 id="tong-quan" style="${AH2}">1. Tổng quan và lý do quan trọng</h2>
<p style="${AP}">Phần tổng quan cung cấp bức tranh toàn cảnh về chủ đề. Giải thích tại sao đây là vấn đề đáng quan tâm và ảnh hưởng của nó đến đối tượng mục tiêu.</p>
<p style="${AP}">Đưa ra số liệu hoặc thống kê thuyết phục. Ví dụ: <em>"Theo nghiên cứu năm 2024, 78% doanh nghiệp đang gặp khó khăn với vấn đề này..."</em></p>
<h3 style="${AH3}">1.1. Định nghĩa và phạm vi</h3>
<p style="${AP}">Làm rõ định nghĩa và phân biệt với các khái niệm liên quan. Điều này giúp tránh hiểu lầm và đảm bảo người đọc đang cùng hiểu về một vấn đề.</p>

<h2 id="phan-tich" style="${AH2}">2. Phân tích chi tiết — Dữ liệu và bằng chứng</h2>
<p style="${AP}">Phần phân tích chuyên sâu. Trình bày dữ liệu, nghiên cứu, case study và bằng chứng thực tế để xây dựng luận điểm vững chắc.</p>
${CHECKLIST([
  'Bằng chứng thứ nhất — Nghiên cứu hoặc số liệu cụ thể hỗ trợ luận điểm',
  'Bằng chứng thứ hai — Case study từ thực tế hoặc ví dụ nổi tiếng',
  'Bằng chứng thứ ba — So sánh trước và sau khi áp dụng giải pháp',
])}
<blockquote style="margin:24px 0;padding:20px 24px;border-left:4px solid #4f46e5;background:#f5f3ff;border-radius:0 12px 12px 0;">
  <p style="font-size:17px;font-style:italic;color:#3730a3;line-height:1.75;margin:0 0 10px;${F}">"Trích dẫn từ chuyên gia hàng đầu trong lĩnh vực để tăng độ tin cậy và authority cho bài viết của bạn."</p>
  <footer style="font-size:14px;color:#6d28d9;font-weight:600;${F}">— Tên Chuyên Gia, Chức Danh tại Công ty ABC</footer>
</blockquote>

<h2 id="giai-phap" style="${AH2}">3. Giải pháp thực tế — Từng bước cụ thể</h2>
<p style="${AP}">Đây là phần có giá trị nhất trong bài. Hướng dẫn chi tiết, có thể làm ngay với các bước rõ ràng, có thể đo lường được.</p>
<h3 style="${AH3}">3.1. Bước đầu tiên — Nền tảng</h3>
<p style="${AP}">Mô tả cụ thể bước đầu tiên. Bao gồm ví dụ, ảnh minh họa hoặc template mẫu nếu có thể. Đây là bước tạo ra nền tảng cho toàn bộ quy trình.</p>
<h3 style="${AH3}">3.2. Bước thứ hai — Triển khai</h3>
<p style="${AP}">Chi tiết bước triển khai chính. Đây thường là bước tốn nhiều công sức nhất nhưng cũng tạo ra kết quả rõ rệt nhất.</p>
${NOTE_BOX('💡', '#92400e', '#fffbeb', '#fcd34d', '<strong>Mẹo nhanh:</strong> Cách tắt giúp bạn tiết kiệm 50% thời gian ở bước này — [mô tả cụ thể cách tắt].')}
<h3 style="${AH3}">3.3. Bước thứ ba — Tối ưu</h3>
<p style="${AP}">Hướng dẫn tối ưu kết quả. Phân biệt mức độ cơ bản (đủ dùng) vs. nâng cao (xuất sắc) để người đọc tự điều chỉnh theo mục tiêu.</p>

<h2 id="cong-cu" style="${AH2}">4. Công cụ và tài nguyên hỗ trợ</h2>
<p style="${AP}">Danh sách các công cụ, phần mềm hoặc tài nguyên được khuyên dùng, kèm theo đánh giá ngắn gọn về ưu nhược điểm.</p>
<div style="display:flex;flex-wrap:wrap;gap:12px;margin:16px 0 24px;">
  ${[['⭐ Miễn phí', 'Công cụ A', '#dcfce7', '#15803d'], ['💎 Cao cấp', 'Công cụ B', '#ede9fe', '#7c3aed'], ['🔧 Mã nguồn mở', 'Công cụ C', '#fff7ed', '#c2410c']].map(([badge, name, bg, color]) =>
    `<div style="flex:1;min-width:180px;background:${bg};border-radius:12px;padding:16px;"><div style="font-size:12px;font-weight:700;color:${color};margin-bottom:6px;${F}">${badge}</div><div style="font-size:15px;font-weight:600;color:#0f172a;${F}">${name}</div><p style="font-size:13px;color:#475569;margin:4px 0 0;${F}">Mô tả ngắn về tính năng và trường hợp dùng tốt nhất.</p></div>`
  ).join('')}
</div>

<h2 id="sai-lam" style="${AH2}">5. Những sai lầm thường gặp cần tránh</h2>
<p style="${AP}">Phần này đặc biệt quan trọng — giúp người đọc tránh những cạm bẫy phổ biến đã làm nhiều người thất bại.</p>
${NOTE_BOX('❌', '#991b1b', '#fef2f2', '#fca5a5', '<strong>Sai lầm #1:</strong> [Mô tả sai lầm phổ biến nhất]. Hậu quả: [giải thích tại sao điều này gây hại]. Cách tránh: [giải pháp cụ thể].')}
${NOTE_BOX('❌', '#991b1b', '#fef2f2', '#fca5a5', '<strong>Sai lầm #2:</strong> [Sai lầm thứ hai hay gặp]. Nhiều người bỏ qua bước này vì [lý do], nhưng thực ra đây là yếu tố quyết định thành bại.')}

<h2 id="ket-luan" style="${AH2}">Kết luận</h2>
<p style="${AP}">Bạn vừa hoàn thành hướng dẫn toàn diện về [chủ đề]. Hãy bắt đầu với bước đơn giản nhất ngay hôm nay thay vì chờ đến khi "sẵn sàng hoàn hảo".</p>
<p style="${AP}">Nếu bạn thấy bài viết này hữu ích, hãy chia sẻ cho người khác và để lại câu hỏi bên dưới — chúng tôi sẽ trả lời trong thời gian sớm nhất.</p>
${CTA_BOX}
</article>`,
  })

  // ── Bài viết Listicle / Top-N ──────────────────────────────────────────
  bm.add('tpl-article-listicle', {
    label: 'Bài listicle Top-N',
    category: CAT,
    media: `<svg viewBox="0 0 32 36" fill="none"><rect x="2" y="2" width="28" height="32" rx="3" fill="#f8fafc" stroke="#e0e7ff" stroke-width="1.5"/><rect x="5" y="6" width="22" height="3" rx="1.5" fill="#1e1b4b"/><rect x="5" y="11" width="10" height="2" rx="1" fill="#94a3b8"/><rect x="5" y="15" width="4" height="4" rx="1" fill="#4f46e5"/><rect x="11" y="15.5" width="16" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="18" width="11" height="1.5" rx=".75" fill="#94a3b8"/><rect x="5" y="21" width="4" height="4" rx="1" fill="#7c3aed"/><rect x="11" y="21.5" width="16" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="24" width="13" height="1.5" rx=".75" fill="#94a3b8"/><rect x="5" y="28" width="4" height="4" rx="1" fill="#059669"/><rect x="11" y="28.5" width="14" height="1.5" rx=".75" fill="#334155"/><rect x="11" y="31" width="9" height="1.5" rx=".75" fill="#94a3b8"/></svg>`,
    content: `<article style="max-width:720px;margin:0 auto;padding:40px 24px;${F}">
${BREADCRUMB}
${META('Hướng dẫn', '12')}
<h1 style="${AH1}">10 [Điều/Cách/Bí quyết] Giúp Bạn [Đạt Kết Quả] Nhanh Hơn</h1>
<p style="${AP}">Mô tả ngắn gọn: bài viết này tổng hợp [X] [điều/cách/bí quyết] quan trọng nhất, được chắt lọc từ [nguồn/kinh nghiệm thực tế]. Dù bạn là người mới bắt đầu hay đã có kinh nghiệm, đây là danh sách bạn cần đọc.</p>
${AUTHOR}

<!-- Intro benefits -->
<div style="background:linear-gradient(135deg,#ede9fe,#e0e7ff);border-radius:16px;padding:24px;margin-bottom:36px;">
  <p style="font-size:15px;font-weight:600;color:#3730a3;margin:0 0 10px;${F}">📌 Bài viết này giúp bạn:</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
    ${['Hiểu rõ [khái niệm cốt lõi] một cách thực tế','Tránh được [X] sai lầm phổ biến nhất','Tiết kiệm [thời gian/tiền bạc] ngay từ bước đầu','Áp dụng được ngay — không cần kinh nghiệm trước'].map(t=>`<li style="font-size:14px;color:#4338ca;display:flex;align-items:flex-start;gap:8px;${F}"><span style="color:#4f46e5;font-weight:700;flex-shrink:0;">✓</span>${t}</li>`).join('')}
  </ul>
</div>

<!-- Items 1–3 -->
${[
  ['1','Tên điều/cách thứ nhất — Ngắn gọn và ấn tượng','#4f46e5','#ede9fe','Giải thích rõ tại sao điều này quan trọng. Cung cấp bằng chứng, ví dụ cụ thể hoặc số liệu để tăng sức thuyết phục. Kết thúc bằng hành động cụ thể mà người đọc có thể làm ngay.','💡 Mẹo nhanh: Cách đơn giản nhất để áp dụng điều này là [hành động cụ thể] — chỉ mất [X phút] nhưng mang lại [kết quả].'],
  ['2','Tên điều/cách thứ hai — Lợi ích rõ ràng','#7c3aed','#f5f3ff','Mô tả chi tiết cách thực hiện. Chia nhỏ thành các bước nếu cần. Dùng ngôn ngữ đơn giản, tránh thuật ngữ kỹ thuật không cần thiết khi giải thích với người mới.','⚡ Ví dụ thực tế: [Tên người/thương hiệu] đã áp dụng cách này và đạt được [kết quả cụ thể] trong [khoảng thời gian].'],
  ['3','Tên điều/cách thứ ba — Kết quả đo lường được','#059669','#f0fdf4','Đây thường là điểm mà nhiều người bỏ qua nhưng lại tạo ra sự khác biệt lớn nhất. Giải thích cơ chế hoạt động và tại sao nó hiệu quả hơn các cách khác.','📊 Số liệu: Theo [nguồn], [X]% người áp dụng cách này ghi nhận cải thiện [Y]% về [chỉ số] trong [thời gian].'],
].map(([num, title, color, bg, body, tip]) =>
  `<div style="margin-bottom:32px;padding:28px;background:#fff;border-radius:18px;border:1.5px solid #e0e7ff;box-shadow:0 2px 10px rgba(79,70,229,0.06);">
    <div style="display:flex;align-items:flex-start;gap:18px;">
      <div style="width:52px;height:52px;background:${bg};border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:${color};flex-shrink:0;border:2px solid ${color}22;">${num}</div>
      <div style="flex:1;">
        <h2 style="font-size:19px;font-weight:800;color:#0f172a;margin:0 0 10px;${F}">${title}</h2>
        <p style="font-size:15px;color:#475569;line-height:1.75;margin:0 0 14px;${F}">${body}</p>
        <div style="padding:12px 16px;background:${bg};border-radius:10px;font-size:13px;color:${color};font-weight:600;${F}">${tip}</div>
      </div>
    </div>
  </div>`
).join('')}

<!-- Items 4–6 (dạng compact) -->
<h2 style="${AH2}">Tiếp tục: Điều #4 đến #6</h2>
${[
  ['4','Tên điều/cách thứ tư','Mô tả ngắn gọn — tập trung vào kết quả có thể đạt được và cách bắt đầu ngay hôm nay.'],
  ['5','Tên điều/cách thứ năm','Mô tả ngắn gọn — nêu rõ sự khác biệt so với cách thông thường và lý do phương pháp này vượt trội.'],
  ['6','Tên điều/cách thứ sáu','Mô tả ngắn gọn — nhấn mạnh tính đơn giản trong triển khai và ví dụ cụ thể từ thực tế.'],
].map(([num, title, body]) =>
  `<div style="display:flex;align-items:flex-start;gap:14px;padding:20px;background:#f8fafc;border-radius:14px;margin-bottom:14px;">
    <div style="width:38px;height:38px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:#fff;flex-shrink:0;">${num}</div>
    <div><h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px;${F}">${title}</h3><p style="font-size:14px;color:#64748b;line-height:1.7;margin:0;${F}">${body}</p></div>
  </div>`
).join('')}

${NOTE_BOX('🎯','#1e40af','#eff6ff','#bfdbfe','<strong>Điểm mấu chốt:</strong> Nếu bạn chỉ có thể áp dụng 1 điều từ danh sách này, hãy chọn <strong>#[X]</strong> — đây là cái tạo ra tác động lớn nhất với nỗ lực nhỏ nhất.')}

<!-- Items 7–10 -->
<h2 style="${AH2}">Nâng cao: Điều #7 đến #10</h2>
${[
  ['7','Nâng cao #7 — Dành cho người có kinh nghiệm'],
  ['8','Nâng cao #8 — Khi bạn đã thành thạo cơ bản'],
  ['9','Nâng cao #9 — Tối ưu hóa kết quả dài hạn'],
  ['10','Nâng cao #10 — Bí quyết của người xuất sắc'],
].map(([num, title]) =>
  `<div style="display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #f1f5f9;">
    <span style="width:32px;height:32px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;">${num}</span>
    <span style="font-size:15px;font-weight:600;color:#0f172a;${F}">${title}</span>
    <span style="margin-left:auto;font-size:13px;color:#4f46e5;font-weight:600;${F}">Chi tiết →</span>
  </div>`
).join('')}

<!-- Kết luận -->
<h2 style="${AH2}">Tổng kết — Bắt đầu từ đâu?</h2>
<p style="${AP}">Bạn vừa khám phá 10 [điều/cách/bí quyết] quan trọng nhất về [chủ đề]. Đừng cố áp dụng tất cả cùng một lúc — hãy bắt đầu với <strong>#1</strong> và <strong>#2</strong>, thành thạo chúng trước, rồi mới tiến tới bước tiếp theo.</p>
<p style="${AP}">Bạn đang áp dụng cách nào trong số này? Hãy chia sẻ kinh nghiệm của bạn trong phần bình luận bên dưới!</p>
${CTA_BOX}
</article>`,
  })
}
