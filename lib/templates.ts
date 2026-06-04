export type TemplateCategory = 'landing' | 'article' | 'ads'

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  description: string
  tags: string[]
  gradient: string
  accentColor: string
  html: string
}

const LP_SKINCARE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a}
/* Hero */
.hero{background:linear-gradient(135deg,#fce4ec 0%,#f8bbd0 60%,#fce4ec 100%);padding:90px 24px 80px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #f06292;color:#c2185b;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:28px}
.hero h1{font-size:clamp(36px,5vw,60px);font-weight:900;color:#880e4f;line-height:1.15;margin-bottom:18px}
.hero h1 span{color:#e91e63}
.hero p{font-size:19px;color:#ad1457;max-width:560px;margin:0 auto 36px;line-height:1.75}
.cta-btn{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#e91e63,#ad1457);color:#fff;border-radius:16px;padding:18px 40px;font-size:17px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(233,30,99,.35)}
.hero-note{margin-top:16px;font-size:13px;color:#c2185b;opacity:.8}
/* Stats bar */
.stats-bar{background:#880e4f;padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:20px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;color:#f48fb1}
.stat-l{font-size:13px;color:#fce4ec;margin-top:4px}
/* Why */
.why{padding:80px 24px;background:#fff}
.sec-title{text-align:center;font-size:34px;font-weight:800;color:#1a1a2e;margin-bottom:12px}
.sec-sub{text-align:center;font-size:16px;color:#888;margin-bottom:52px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;max-width:1000px;margin:0 auto}
.card{background:linear-gradient(135deg,#fce4ec,#fff9fb);border:1px solid #f8bbd0;border-radius:18px;padding:32px}
.card-icon{width:52px;height:52px;background:linear-gradient(135deg,#e91e63,#ad1457);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px}
.card h3{font-size:17px;font-weight:700;color:#880e4f;margin-bottom:10px}
.card p{font-size:14px;color:#6d4c41;line-height:1.7}
/* Ingredients */
.ingredients{padding:80px 24px;background:#fff7f8}
.ing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:960px;margin:0 auto}
.ing-card{background:#fff;border:1px solid #fce4ec;border-radius:16px;padding:24px;text-align:center}
.ing-emoji{font-size:40px;margin-bottom:12px;display:block}
.ing-name{font-weight:700;color:#880e4f;margin-bottom:6px}
.ing-desc{font-size:13px;color:#888;line-height:1.6}
/* Routine */
.routine{padding:80px 24px;background:#fff}
.steps{display:flex;flex-direction:column;gap:0;max-width:680px;margin:0 auto}
.step{display:flex;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px dashed #f8bbd0}
.step:last-child{border:none}
.step-num{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#e91e63,#ad1457);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.step-body h3{font-size:17px;font-weight:700;color:#880e4f;margin-bottom:6px}
.step-body p{font-size:14px;color:#666;line-height:1.65}
.step-tag{display:inline-flex;background:#fce4ec;color:#c2185b;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:700;margin-top:8px}
/* Results */
.results{padding:80px 24px;background:linear-gradient(135deg,#fce4ec,#fff9fb)}
.result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:960px;margin:0 auto}
.result-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(233,30,99,.08)}
.result-top{background:linear-gradient(135deg,#e91e63,#c2185b);padding:20px;color:#fff;text-align:center}
.result-top .day{font-size:13px;font-weight:700;opacity:.8;margin-bottom:4px}
.result-top .pct{font-size:40px;font-weight:900}
.result-bot{padding:20px}
.result-bot p{font-size:14px;color:#555;line-height:1.6}
/* Testimonials */
.testi{padding:80px 24px;background:linear-gradient(135deg,#880e4f,#c2185b)}
.testi .sec-title{color:#fff;margin-bottom:8px}
.testi .sec-sub{color:#f48fb1;margin-bottom:48px}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:18px;padding:28px}
.testi-stars{color:#f48fb1;font-size:18px;margin-bottom:12px}
.testi-quote{font-size:15px;color:#fce4ec;font-style:italic;line-height:1.7;margin-bottom:16px}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-loc{font-size:12px;color:#f48fb1}
/* FAQ */
.faq{padding:80px 24px;background:#fff}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.faq-item{border:1px solid #f8bbd0;border-radius:14px;padding:24px}
.faq-q{font-weight:700;color:#880e4f;margin-bottom:10px;font-size:16px}
.faq-a{font-size:14px;color:#666;line-height:1.7}
/* Pricing */
.pricing{padding:80px 24px;background:#fff7f8;text-align:center}
.price-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:860px;margin:0 auto 32px}
.price-card{border:2px solid #f8bbd0;border-radius:20px;padding:32px;background:#fff;text-align:left}
.price-card.featured{background:linear-gradient(135deg,#e91e63,#ad1457);border-color:transparent;color:#fff}
.price-label{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#e91e63;margin-bottom:12px}
.price-card.featured .price-label{color:#f8bbd0}
.price-amount{font-size:48px;font-weight:900;color:#880e4f;margin-bottom:4px}
.price-card.featured .price-amount{color:#fff}
.price-old{font-size:16px;text-decoration:line-through;color:#bbb;margin-bottom:20px}
.price-card.featured .price-old{color:#f8bbd0}
.price-btn{display:block;border-radius:12px;padding:13px;text-align:center;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:20px}
.price-btn-out{background:#fce4ec;color:#ad1457}
.price-btn-in{background:#fff;color:#ad1457}
.price-features{font-size:14px;line-height:2;color:#555}
.price-card.featured .price-features{color:#fce4ec}
/* Guarantee */
.guarantee{background:#fff;border:2px solid #e91e63;border-radius:20px;padding:32px;max-width:600px;margin:0 auto;text-align:center}
.guarantee h3{font-size:22px;font-weight:700;color:#880e4f;margin-bottom:10px}
.guarantee p{font-size:15px;color:#666;line-height:1.65}
/* Footer */
.footer{background:#880e4f;color:#f8bbd0;padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between;align-items:flex-start}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:8px}
.footer-tagline{font-size:13px;opacity:.7}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#f48fb1;text-decoration:none;font-size:14px}
.footer-bottom{background:#6d0d35;text-align:center;padding:16px 24px;font-size:13px;color:#f8bbd0;opacity:.8}
</style></head>
<body>

<section class="hero">
  <div class="badge">🌿 Thuần Chay · Không Paraben · Chứng Nhận Dermatologist-Tested</div>
  <h1>Da sáng căng mịn<br><span>chỉ sau 21 ngày dùng thử</span></h1>
  <p>Bộ skincare 4 bước chiết xuất 100% thiên nhiên — được 50.000+ phụ nữ Việt tin dùng. Phù hợp cho da nhạy cảm, da hỗn hợp và da dầu mụn.</p>
  <a href="#" class="cta-btn">🛒 Mua bộ dùng thử — chỉ 199.000đ</a>
  <p class="hero-note">Freeship toàn quốc · Hoàn tiền 30 ngày nếu không hài lòng</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">50K+</div><div class="stat-l">Khách hàng tin dùng</div></div>
    <div><div class="stat-n">94%</div><div class="stat-l">Thấy da cải thiện sau 7 ngày</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Đánh giá trung bình</div></div>
    <div><div class="stat-n">0</div><div class="stat-l">Hóa chất độc hại</div></div>
  </div>
</div>

<section class="why">
  <h2 class="sec-title">Tại sao LumiGlow khác biệt?</h2>
  <p class="sec-sub">Không phải ngẫu nhiên mà 50.000 phụ nữ Việt chọn chúng tôi</p>
  <div class="grid3">
    <div class="card"><div class="card-icon">🌿</div><h3>100% Thuần Chay & Organic</h3><p>Chứng nhận Vegan và Cruelty-Free quốc tế. Không paraben, không sulfate, không hương liệu nhân tạo — an toàn tuyệt đối kể cả cho phụ nữ mang thai.</p></div>
    <div class="card"><div class="card-icon">✨</div><h3>Hiệu quả lâm sàng đã kiểm chứng</h3><p>Thử nghiệm trên 500 tình nguyện viên Việt Nam: 94% thấy da sáng mịn sau 7 ngày, 88% giảm mụn sau 14 ngày, 97% da căng ẩm sau 21 ngày.</p></div>
    <div class="card"><div class="card-icon">🇻🇳</div><h3>Công thức riêng cho da Việt</h3><p>Phát triển bởi đội ngũ da liễu Việt Nam, tối ưu cho khí hậu nóng ẩm nhiệt đới. Không gây bít lỗ chân lông, không đổ mồ hôi ra bã nhờn.</p></div>
    <div class="card"><div class="card-icon">🧬</div><h3>Công nghệ Nano Delivery</h3><p>Hoạt chất được đóng gói bằng công nghệ nano — thấm sâu vào lớp hạ bì, hiệu quả gấp 3 lần so với kem thông thường cùng nồng độ.</p></div>
    <div class="card"><div class="card-icon">💧</div><h3>Dưỡng ẩm 72 giờ liên tục</h3><p>Phức hợp Hyaluronic Acid 3 trọng lượng phân tử giúp giữ ẩm từ bề mặt đến sâu trong da, không cần thoa lại suốt 3 ngày.</p></div>
    <div class="card"><div class="card-icon">☀️</div><h3>Chống nắng tích hợp SPF 30</h3><p>Kem dưỡng ngày của LumiGlow tích hợp SPF 30 PA+++ bảo vệ khỏi UVA/UVB, tiết kiệm một bước trong routine buổi sáng.</p></div>
  </div>
</section>

<section class="ingredients">
  <h2 class="sec-title">Thành phần vàng từ thiên nhiên</h2>
  <p class="sec-sub">Mỗi thành phần được chọn lọc kỹ lưỡng vì tác dụng lâm sàng đã được kiểm chứng</p>
  <div class="ing-grid">
    <div class="ing-card"><span class="ing-emoji">🍑</span><div class="ing-name">Niacinamide 5%</div><div class="ing-desc">Thu nhỏ lỗ chân lông, kiểm soát dầu nhờn, làm mờ vết thâm nhanh chóng sau 2 tuần.</div></div>
    <div class="ing-card"><span class="ing-emoji">🌹</span><div class="ing-name">Rose Hip Oil</div><div class="ing-desc">Giàu Vitamin C và Retinol tự nhiên, chống lão hóa, làm sáng đều màu da và mờ sẹo mụn.</div></div>
    <div class="ing-card"><span class="ing-emoji">🍵</span><div class="ing-name">Chiết xuất Trà Xanh</div><div class="ing-desc">EGCG chống oxi hóa mạnh gấp 20 lần Vitamin C, kiểm soát nhờn và kháng khuẩn tự nhiên.</div></div>
    <div class="ing-card"><span class="ing-emoji">🌊</span><div class="ing-name">Hyaluronic Acid 3 lớp</div><div class="ing-desc">Giữ ẩm tức thì và dài hạn — 1 phân tử HA có thể giữ 1.000 lần trọng lượng nước của nó.</div></div>
    <div class="ing-card"><span class="ing-emoji">🌸</span><div class="ing-name">Centella Asiatica</div><div class="ing-desc">Rau má Á Đông — làm dịu da kích ứng, thúc đẩy tái tạo tế bào, phục hồi hàng rào da bị tổn thương.</div></div>
    <div class="ing-card"><span class="ing-emoji">🫚</span><div class="ing-name">Bakuchiol (Retinol thuần chay)</div><div class="ing-desc">Thay thế Retinol hoàn toàn từ thực vật — chống lão hóa mạnh mà không gây kích ứng, phù hợp cả da nhạy.</div></div>
  </div>
</section>

<section class="routine">
  <h2 class="sec-title" style="text-align:center;margin-bottom:12px">Quy trình 4 bước · 5 phút mỗi ngày</h2>
  <p class="sec-sub">Đơn giản, nhanh gọn — nhưng đủ để da thay đổi hoàn toàn sau 3 tuần</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h3>Tẩy trang &amp; Làm sạch — Gentle Cleansing Oil</h3>
        <p>Dầu tẩy trang tan trong nước, loại bỏ kem chống nắng, makeup và bụi bẩn chỉ trong 60 giây. Không cần massage mạnh, không gây kéo căng da. pH cân bằng 5.5 — không phá vỡ màng bảo vệ tự nhiên của da.</p>
        <span class="step-tag">⏱ Buổi tối · 60 giây</span>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h3>Toner cân bằng — Hydra Balance Toner</h3>
        <p>Toner không cồn với Niacinamide 5% và Centella Asiatica. Vỗ nhẹ lên da sau rửa mặt để cân bằng độ pH, thu nhỏ lỗ chân lông và chuẩn bị da hấp thụ dưỡng chất tốt hơn ở bước tiếp theo.</p>
        <span class="step-tag">⏱ Sáng &amp; tối · 30 giây</span>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h3>Serum đặc trị — Bright Glow Serum</h3>
        <p>Serum Vitamin C 15% + Rose Hip Oil + Hyaluronic Acid — bộ ba hoạt chất vàng làm sáng đều màu da, mờ thâm nám và cấp ẩm sâu. Thoa 3-4 giọt, vỗ nhẹ cho thấm đều. Kết quả rõ rệt sau 14 ngày dùng liên tục.</p>
        <span class="step-tag">⏱ Sáng &amp; tối · 1 phút</span>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <h3>Kem dưỡng ngày/đêm — Moisture Lock Cream</h3>
        <p>Kem dưỡng ngày SPF 30 PA+++ và kem phục hồi đêm với Bakuchiol. Ban ngày bảo vệ và dưỡng ẩm suốt 8 tiếng, ban đêm kích thích tái tạo tế bào trong lúc ngủ. Kết cấu gel-cream thấm nhanh, không nhờn rít.</p>
        <span class="step-tag">⏱ Sáng: kem ngày · Tối: kem đêm</span>
      </div>
    </div>
  </div>
</section>

<section class="results">
  <h2 class="sec-title">Kết quả thực tế sau từng tuần</h2>
  <p class="sec-sub">Dựa trên nghiên cứu lâm sàng với 500 tình nguyện viên Việt Nam</p>
  <div class="result-grid">
    <div class="result-card">
      <div class="result-top"><div class="day">Sau 7 ngày</div><div class="pct">+40%</div></div>
      <div class="result-bot"><p>Độ ẩm da tăng đáng kể. Da bớt sần sùi, cảm giác căng khô sau rửa mặt biến mất. 94% người tham gia thấy da mịn màng và dễ chịu hơn hẳn.</p></div>
    </div>
    <div class="result-card">
      <div class="result-top"><div class="day">Sau 14 ngày</div><div class="pct">-60%</div></div>
      <div class="result-bot"><p>Giảm 60% mụn đầu đen và mụn viêm. Lỗ chân lông thu nhỏ rõ rệt. Vết thâm mụn bắt đầu mờ dần. 88% người dùng thấy da đều màu hơn.</p></div>
    </div>
    <div class="result-card">
      <div class="result-top"><div class="day">Sau 21 ngày</div><div class="pct">+85%</div></div>
      <div class="result-bot"><p>Da sáng bóng, căng mịn như "glass skin". Tông da đều hơn, vết thâm mờ 70%. 97% người tham gia hài lòng và muốn tiếp tục dùng lâu dài.</p></div>
    </div>
  </div>
</section>

<section class="testi">
  <h2 class="sec-title">Hơn 50.000 phụ nữ Việt đã tin dùng</h2>
  <p class="sec-sub">Đánh giá thật từ khách hàng thật — không chỉnh sửa</p>
  <div class="testi-grid">
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Mình da dầu mụn nặng, dùng đủ thứ không khỏi. Sau 3 tuần dùng LumiGlow, mụn giảm hẳn, lỗ chân lông thu nhỏ, da sáng bóng lên thấy rõ. Lần đầu tiên mình tự tin ra ngoài không cần foundation!"</p>
      <div class="testi-author"><div class="testi-avatar">LH</div><div><div class="testi-name">Lê Thị Hương, 26 tuổi</div><div class="testi-loc">TP. Hồ Chí Minh · Da dầu mụn</div></div></div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Mình bầu 6 tháng, rất lo chọn skincare an toàn cho em bé. Bác sĩ da liễu giới thiệu LumiGlow vì không paraben, không hương liệu. Dùng 1 tháng da đẹp hơn trước bầu nhiều, không bị nám bầu nữa."</p>
      <div class="testi-author"><div class="testi-avatar">NT</div><div><div class="testi-name">Nguyễn Minh Trang, 31 tuổi</div><div class="testi-loc">Hà Nội · Da nhạy cảm khi mang thai</div></div></div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Mình 38 tuổi, bắt đầu dùng LumiGlow để chăm sóc da chống lão hóa. Sau 2 tháng, nếp nhăn mờ rõ rệt, da căng hơn như hồi 30. Bạn bè hỏi mình đi spa ở đâu mà da đẹp vậy, mình cười không nói!"</p>
      <div class="testi-author"><div class="testi-avatar">PV</div><div><div class="testi-name">Phạm Thị Vân, 38 tuổi</div><div class="testi-loc">Đà Nẵng · Da lão hóa, nếp nhăn</div></div></div>
    </div>
  </div>
</section>

<section class="faq">
  <h2 class="sec-title">Câu hỏi thường gặp</h2>
  <p class="sec-sub">Tất cả những gì bạn muốn biết trước khi đặt hàng</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🤔 LumiGlow có phù hợp với da nhạy cảm không?</div><div class="faq-a">Có! LumiGlow được bào chế đặc biệt cho da nhạy cảm — không cồn, không hương liệu, không paraben, không sulfate. Đã được kiểm nghiệm da liễu và được khuyến nghị bởi các bác sĩ da liễu tại Việt Nam. Nếu da bạn cực nhạy, hãy thử patch test ở cổ tay 24h trước khi dùng.</div></div>
    <div class="faq-item"><div class="faq-q">📦 Bộ dùng thử gồm những gì?</div><div class="faq-a">Bộ dùng thử 21 ngày gồm: Cleansing Oil 30ml + Toner 50ml + Serum 15ml + Moisture Cream 20ml (ngày) + Night Cream 20ml (đêm). Đủ dùng trong 3 tuần để thấy kết quả rõ rệt trước khi quyết định mua bộ full size.</div></div>
    <div class="faq-item"><div class="faq-q">⏰ Bao lâu thì thấy kết quả?</div><div class="faq-a">Kết quả phụ thuộc vào loại da và vấn đề da của từng người. Thông thường: ngày 3-5 da thấy ẩm mượt hơn; tuần 1-2 mụn và nhờn giảm rõ; tuần 3 da sáng đều màu và thu nhỏ lỗ chân lông. Để kết quả tối ưu, hãy dùng đủ 4 bước mỗi ngày.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Chính sách đổi trả như thế nào?</div><div class="faq-a">Chúng tôi cam kết hoàn tiền 100% trong 30 ngày nếu bạn không hài lòng với kết quả — không cần giải thích lý do. Liên hệ hotline hoặc Zalo để được hỗ trợ hoàn tiền trong 24-48h làm việc.</div></div>
    <div class="faq-item"><div class="faq-q">🚚 Thời gian giao hàng bao lâu?</div><div class="faq-a">Nội thành TP.HCM và Hà Nội: 1-2 ngày làm việc. Các tỉnh thành khác: 2-4 ngày làm việc. Tất cả đơn hàng đều freeship. Theo dõi đơn hàng qua SMS sau khi đặt.</div></div>
  </div>
</section>

<section class="pricing">
  <h2 class="sec-title">Chọn gói phù hợp với bạn</h2>
  <p class="sec-sub">Tiết kiệm hơn khi mua combo — giá tốt nhất năm</p>
  <div class="price-grid">
    <div class="price-card">
      <div class="price-label">Dùng thử</div>
      <div class="price-amount">199K</div>
      <div class="price-old">350.000đ</div>
      <a href="#" class="price-btn price-btn-out">Đặt bộ dùng thử →</a>
      <div class="price-features">✓ Đủ 4 sản phẩm mini<br>✓ Dùng được 21 ngày<br>✓ Freeship toàn quốc<br>✓ Hoàn tiền 30 ngày</div>
    </div>
    <div class="price-card featured">
      <div class="price-label">Bộ full 3 tháng ⭐ Phổ biến</div>
      <div class="price-amount">890K</div>
      <div class="price-old">1.290.000đ</div>
      <a href="#" class="price-btn price-btn-in">Đặt bộ 3 tháng →</a>
      <div class="price-features">✓ Full size 4 sản phẩm<br>✓ Dùng được 90-100 ngày<br>✓ Freeship & quà tặng kèm<br>✓ Tư vấn da miễn phí 1-1</div>
    </div>
    <div class="price-card">
      <div class="price-label">Gói 6 tháng tiết kiệm</div>
      <div class="price-amount">1.590K</div>
      <div class="price-old">2.580.000đ</div>
      <a href="#" class="price-btn price-btn-out">Đặt gói 6 tháng →</a>
      <div class="price-features">✓ 2 bộ full size<br>✓ Tiết kiệm 38%<br>✓ Freeship & ưu tiên giao<br>✓ Hỗ trợ Zalo VIP</div>
    </div>
  </div>
  <div class="guarantee">
    <h3>🛡️ Cam kết hoàn tiền 30 ngày</h3>
    <p>Nếu sau 30 ngày dùng đúng theo hướng dẫn mà da không cải thiện, chúng tôi hoàn tiền 100% — không cần hỏi lý do. Đây là cam kết của chúng tôi với bạn.</p>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🌿 LumiGlow</div><div class="footer-tagline">Skincare thuần chay cho da Việt</div></div>
    <div class="footer-links"><a href="#">Về chúng tôi</a><a href="#">Thành phần</a><a href="#">Hướng dẫn sử dụng</a><a href="#">Chính sách đổi trả</a></div>
    <div class="footer-links"><a href="#">Hotline: 1800 123 456</a><a href="#">Zalo: 0901 234 567</a><a href="#">Email: hello@lumiglow.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 LumiGlow Skincare · Được cấp phép bởi Bộ Y tế Việt Nam · Số đăng ký: SP-123456/26</div>
</body></html>`

const LP_COURSE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif}
.hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);padding:96px 24px 80px;text-align:center;color:#fff}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,.2);border:1px solid rgba(99,102,241,.4);color:#a5b4fc;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;margin-bottom:28px}
.hero h1{font-size:clamp(34px,5vw,64px);font-weight:900;line-height:1.12;margin-bottom:20px}
.hero h1 span{background:linear-gradient(90deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#c7d2fe;max-width:580px;margin:0 auto 36px;line-height:1.75}
.hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:20px}
.btn-main{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:14px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(99,102,241,.4)}
.btn-sec{display:inline-flex;align-items:center;gap:8px;background:transparent;border:2px solid rgba(255,255,255,.2);color:#e0e7ff;border-radius:14px;padding:15px 28px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#818cf8}
.stats{background:#1e1b4b;padding:36px 24px}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px;max-width:900px;margin:0 auto;text-align:center}
.stat-num{font-size:42px;font-weight:900;background:linear-gradient(90deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-lbl{color:#94a3b8;font-size:13px;margin-top:4px}
/* For whom */
.for-whom{padding:80px 24px;background:#fff}
.sec-title{text-align:center;font-size:34px;font-weight:800;color:#1e1b4b;margin-bottom:12px}
.sec-sub{text-align:center;font-size:16px;color:#888;margin-bottom:48px}
.whom-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:960px;margin:0 auto}
.whom-card{border:2px solid #e0e7ff;border-radius:16px;padding:24px;text-align:center}
.whom-emoji{font-size:40px;margin-bottom:12px}
.whom-title{font-weight:700;color:#1e1b4b;margin-bottom:6px}
.whom-desc{font-size:13px;color:#666;line-height:1.6}
.whom-not{padding:32px 24px;background:#fef2f2;border-top:1px solid #fee2e2}
.whom-not-inner{max-width:700px;margin:0 auto;text-align:center}
.whom-not h3{font-size:18px;font-weight:700;color:#991b1b;margin-bottom:12px}
.whom-not p{font-size:14px;color:#7f1d1d;line-height:1.6}
/* Curriculum */
.curriculum{padding:80px 24px;background:#f8f7ff}
.modules{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.module{border:2px solid #e0e7ff;border-radius:16px;padding:20px 24px;display:flex;align-items:center;gap:16px;background:#fff}
.module-num{width:44px;height:44px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;flex-shrink:0}
.module-title{font-weight:700;color:#1e1b4b;margin-bottom:4px;font-size:15px}
.module-sub{font-size:13px;color:#6b7280}
.module-badge{margin-left:auto;background:#ede9fe;color:#6d28d9;border-radius:999px;padding:3px 12px;font-size:11px;font-weight:700;flex-shrink:0}
/* Projects */
.projects{padding:80px 24px;background:#1e1b4b}
.projects .sec-title{color:#fff;margin-bottom:12px}
.projects .sec-sub{color:#818cf8;margin-bottom:48px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:960px;margin:0 auto}
.proj-card{background:rgba(255,255,255,.06);border:1px solid rgba(99,102,241,.3);border-radius:16px;padding:24px}
.proj-emoji{font-size:36px;margin-bottom:12px}
.proj-name{font-weight:700;color:#e0e7ff;margin-bottom:6px}
.proj-tech{font-size:12px;color:#818cf8;margin-bottom:8px}
.proj-desc{font-size:13px;color:#94a3b8;line-height:1.6}
/* Instructor */
.instructor{padding:80px 24px;background:#f5f3ff}
.inst-inner{max-width:800px;margin:0 auto;display:flex;gap:40px;align-items:center;flex-wrap:wrap}
.inst-photo{width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:56px;flex-shrink:0}
.inst-name{font-size:28px;font-weight:800;color:#1e1b4b;margin-bottom:6px}
.inst-title{color:#6366f1;font-weight:600;margin-bottom:16px}
.inst-bio{color:#4b5563;line-height:1.75;margin-bottom:16px}
.inst-badges{display:flex;gap:10px;flex-wrap:wrap}
.inst-badge{background:#ede9fe;color:#5b21b6;border-radius:999px;padding:4px 14px;font-size:13px;font-weight:600}
/* Success stories */
.stories{padding:80px 24px;background:#fff}
.story-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:960px;margin:0 auto}
.story-card{border:2px solid #e0e7ff;border-radius:18px;padding:28px}
.story-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;margin-bottom:16px}
.story-result{font-size:22px;font-weight:800;color:#6366f1;margin-bottom:4px}
.story-job{font-size:14px;color:#374151;font-weight:600;margin-bottom:10px}
.story-quote{font-size:14px;color:#555;line-height:1.65;font-style:italic;margin-bottom:12px}
.story-name{font-size:13px;color:#888}
/* FAQ */
.faq{padding:80px 24px;background:#f8f7ff}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1px solid #e0e7ff;border-radius:14px;padding:22px}
.faq-q{font-weight:700;color:#1e1b4b;margin-bottom:8px}
.faq-a{font-size:14px;color:#555;line-height:1.7}
/* Pricing */
.pricing{padding:80px 24px;background:linear-gradient(135deg,#1e1b4b,#312e81);text-align:center}
.pricing .sec-title{color:#fff;margin-bottom:8px}
.pricing .sec-sub{color:#818cf8;margin-bottom:48px}
.price-main-card{background:rgba(255,255,255,.07);border:2px solid rgba(99,102,241,.5);border-radius:24px;padding:44px;max-width:480px;margin:0 auto;color:#fff}
.price-badge-top{display:inline-flex;background:#fbbf24;color:#1a1a1a;border-radius:999px;padding:5px 18px;font-size:13px;font-weight:800;margin-bottom:20px}
.price-old{font-size:18px;text-decoration:line-through;color:#818cf8;margin-bottom:4px}
.price-amount{font-size:60px;font-weight:900;margin-bottom:6px}
.price-note{color:#a5b4fc;font-size:14px;margin-bottom:32px}
.enroll-btn{display:block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:14px;padding:18px;font-size:17px;font-weight:800;text-decoration:none;margin-bottom:16px;box-shadow:0 8px 24px rgba(99,102,241,.4)}
.price-features{text-align:left;color:#c7d2fe;font-size:14px;line-height:2.2;margin-bottom:20px}
.guarantee-dark{color:#818cf8;font-size:13px;border-top:1px solid rgba(99,102,241,.3);padding-top:16px}
</style></head>
<body>

<section class="hero">
  <div class="badge">🎓 Khóa học trực tuyến · 2.400+ học viên · Cập nhật 2026</div>
  <h1>Từ 0 đến Junior Developer<br><span>trong vỏn vẹn 3 tháng</span></h1>
  <p>Lộ trình Fullstack Web thực chiến — HTML/CSS, JavaScript, ReactJS, Node.js, MongoDB. Mentor 1-1. Hỗ trợ tìm việc sau tốt nghiệp đến khi có offer.</p>
  <div class="hero-btns">
    <a href="#" class="btn-main">🚀 Đăng ký học ngay</a>
    <a href="#" class="btn-sec">▶ Xem video giới thiệu</a>
  </div>
  <p class="hero-note">⏰ Ưu đãi học phí kết thúc sau 48 giờ · Chỉ còn 15 suất học</p>
</section>

<div class="stats">
  <div class="stats-grid">
    <div><div class="stat-num">2.4K+</div><div class="stat-lbl">Học viên đã tốt nghiệp</div></div>
    <div><div class="stat-num">94%</div><div class="stat-lbl">Có việc sau 3 tháng</div></div>
    <div><div class="stat-num">18M+</div><div class="stat-lbl">Lương khởi điểm trung bình</div></div>
    <div><div class="stat-num">120+</div><div class="stat-lbl">Giờ video thực chiến</div></div>
    <div><div class="stat-num">4.9★</div><div class="stat-lbl">Đánh giá từ học viên</div></div>
  </div>
</div>

<section class="for-whom">
  <h2 class="sec-title">Khóa học này dành cho ai?</h2>
  <p class="sec-sub">Bạn không cần biết lập trình — chỉ cần quyết tâm thay đổi</p>
  <div class="whom-grid">
    <div class="whom-card"><div class="whom-emoji">👩‍🎓</div><div class="whom-title">Sinh viên mới ra trường</div><div class="whom-desc">Muốn bổ sung kỹ năng thực chiến để có lợi thế khi xin việc, hoặc chuyển hướng sang IT.</div></div>
    <div class="whom-card"><div class="whom-emoji">💼</div><div class="whom-title">Dân văn phòng muốn chuyển ngành</div><div class="whom-desc">Đang làm kế toán, kinh doanh, marketing — muốn tăng thu nhập gấp đôi bằng kỹ năng lập trình.</div></div>
    <div class="whom-card"><div class="whom-emoji">🏢</div><div class="whom-title">Chủ doanh nghiệp nhỏ</div><div class="whom-desc">Muốn tự xây dựng website, landing page và tự làm được thay vì phụ thuộc vào outsource đắt đỏ.</div></div>
    <div class="whom-card"><div class="whom-emoji">🌏</div><div class="whom-title">Muốn làm remote/freelance</div><div class="whom-desc">Mơ ước làm việc từ xa, nhận dự án quốc tế với mức thù lao tính theo USD thay vì VND.</div></div>
  </div>
</section>

<section class="curriculum">
  <h2 class="sec-title">Chương trình học 12 tuần chi tiết</h2>
  <p class="sec-sub">Từng module được thiết kế theo nguyên tắc "học đến đâu làm dự án đến đó"</p>
  <div class="modules">
    <div class="module"><div class="module-num">1</div><div><div class="module-title">HTML5 & CSS3 — Xây nền tảng vững chắc</div><div class="module-sub">16 bài · 10 giờ · Dự án: Portfolio cá nhân responsive</div></div><div class="module-badge">Tuần 1-2</div></div>
    <div class="module"><div class="module-num">2</div><div><div class="module-title">JavaScript ES6+ & DOM — Làm cho trang web sống động</div><div class="module-sub">22 bài · 16 giờ · Dự án: Quiz App + Todo List</div></div><div class="module-badge">Tuần 3-4</div></div>
    <div class="module"><div class="module-num">3</div><div><div class="module-title">ReactJS & Hooks — Framework phổ biến nhất thế giới</div><div class="module-sub">28 bài · 22 giờ · Dự án: E-commerce Frontend</div></div><div class="module-badge">Tuần 5-7</div></div>
    <div class="module"><div class="module-num">4</div><div><div class="module-title">Node.js & Express — Backend từ A đến Z</div><div class="module-sub">20 bài · 16 giờ · Dự án: REST API với authentication</div></div><div class="module-badge">Tuần 8-9</div></div>
    <div class="module"><div class="module-num">5</div><div><div class="module-title">MongoDB & Mongoose — Cơ sở dữ liệu NoSQL</div><div class="module-sub">14 bài · 10 giờ · Dự án: Database design thực tế</div></div><div class="module-badge">Tuần 10</div></div>
    <div class="module"><div class="module-num">6</div><div><div class="module-title">Dự án tốt nghiệp Fullstack — Deploy lên cloud</div><div class="module-sub">Mentored project · 3 tuần · Deploy Vercel + Railway + MongoDB Atlas</div></div><div class="module-badge">Tuần 11-12</div></div>
  </div>
</section>

<section class="projects">
  <h2 class="sec-title">5 dự án thực chiến vào portfolio</h2>
  <p class="sec-sub">Nhà tuyển dụng sẽ thấy những gì bạn đã làm được — không chỉ bằng cấp</p>
  <div class="proj-grid">
    <div class="proj-card"><div class="proj-emoji">🏠</div><div class="proj-name">Portfolio cá nhân</div><div class="proj-tech">HTML · CSS · JavaScript</div><div class="proj-desc">Trang web cá nhân responsive, dark mode, hiệu ứng scroll mượt mà để giới thiệu bản thân với nhà tuyển dụng.</div></div>
    <div class="proj-card"><div class="proj-emoji">🛍️</div><div class="proj-name">E-commerce React</div><div class="proj-tech">ReactJS · Redux · CSS Modules</div><div class="proj-desc">Trang bán hàng đầy đủ: danh sách sản phẩm, giỏ hàng, thanh toán giả lập và trang quản trị admin.</div></div>
    <div class="proj-card"><div class="proj-emoji">🔐</div><div class="proj-name">Auth API với JWT</div><div class="proj-tech">Node.js · Express · MongoDB</div><div class="proj-desc">Hệ thống đăng ký/đăng nhập với JWT, refresh token, rate limiting và bảo mật chuẩn production.</div></div>
    <div class="proj-card"><div class="proj-emoji">💬</div><div class="proj-name">Real-time Chat App</div><div class="proj-tech">Socket.io · React · Node.js</div><div class="proj-desc">Ứng dụng chat theo thời gian thực với nhiều phòng, gửi file, emoji và trạng thái online.</div></div>
    <div class="proj-card"><div class="proj-emoji">🚀</div><div class="proj-name">Dự án tốt nghiệp Fullstack</div><div class="proj-tech">React + Node + MongoDB · Deployed</div><div class="proj-desc">Sản phẩm hoàn chỉnh do học viên tự chọn đề tài, mentor review và deploy thực tế lên internet.</div></div>
  </div>
</section>

<section class="instructor">
  <h2 class="sec-title">Giảng viên của bạn</h2>
  <p class="sec-sub">Học từ người đã thực sự làm — không chỉ dạy lý thuyết</p>
  <div class="inst-inner">
    <div class="inst-photo">👨‍💻</div>
    <div>
      <div class="inst-name">Nguyễn Minh Tuấn</div>
      <div class="inst-title">Senior Fullstack Engineer · Tech Lead</div>
      <p class="inst-bio">8 năm kinh nghiệm làm việc tại Tiki, VNG và các startup công nghệ tại Singapore. Hiện là Tech Lead tại một startup fintech được định giá 50 triệu USD. Đã đào tạo hơn 5.000 lập trình viên, trong đó 200+ người đang làm việc tại các công ty top như Shopee, Sea, FPT, VNG.</p>
      <div class="inst-badges"><span class="inst-badge">8+ năm kinh nghiệm</span><span class="inst-badge">5.000+ học viên</span><span class="inst-badge">Ex-Tiki · Ex-VNG</span><span class="inst-badge">Tech Lead</span></div>
    </div>
  </div>
</section>

<section class="stories">
  <h2 class="sec-title">Học viên đã thay đổi cuộc sống như thế nào?</h2>
  <p class="sec-sub">Kết quả thật từ những người đã hoàn thành khóa học</p>
  <div class="story-grid">
    <div class="story-card"><div class="story-avatar">HN</div><div class="story-result">18 triệu/tháng</div><div class="story-job">Junior Frontend Developer tại Grab Việt Nam</div><p class="story-quote">"Trước học mình làm nhân viên bán hàng lương 8 triệu. Sau 3 tháng học và 2 tháng tìm việc, mình được Grab nhận với mức lương gấp đôi. Cảm ơn thầy Tuấn đã kiên nhẫn review code của mình suốt 3 tháng."</p><div class="story-name">Hoàng Nam, 25 tuổi · TP.HCM</div></div>
    <div class="story-card"><div class="story-avatar">PT</div><div class="story-result">$2.500/tháng</div><div class="story-job">Freelance Developer nhận dự án quốc tế</div><p class="story-quote">"Mình là cử nhân văn học, không biết gì về IT. Sau khóa học, mình tự nhận dự án freelance trên Upwork, hiện thu nhập ổn định 2.500 USD/tháng làm việc từ Đà Lạt. Đây là quyết định đúng đắn nhất cuộc đời."</p><div class="story-name">Phương Thảo, 29 tuổi · Đà Lạt</div></div>
    <div class="story-card"><div class="story-avatar">MK</div><div class="story-result">Tự xây web riêng</div><div class="story-job">Chủ shop thời trang — tiết kiệm 40 triệu outsource</div><p class="story-quote">"Tôi mở shop thời trang online nhưng mỗi lần cần thay đổi website phải trả 5-10 triệu cho đơn vị thiết kế. Sau khóa học, tôi tự làm tất cả, tiết kiệm được hơn 40 triệu trong năm đầu tiên."</p><div class="story-name">Minh Khoa, 34 tuổi · Hà Nội</div></div>
  </div>
</section>

<section class="faq">
  <h2 class="sec-title">Câu hỏi thường gặp</h2>
  <p class="sec-sub">Mọi thắc mắc bạn cần biết trước khi đăng ký</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🤔 Tôi hoàn toàn không biết code có học được không?</div><div class="faq-a">Hoàn toàn được! Khóa học bắt đầu từ số 0 — từng dòng code được giải thích chi tiết tại sao viết như vậy. Hơn 40% học viên tốt nghiệp của chúng tôi xuất phát từ nền tảng phi kỹ thuật.</div></div>
    <div class="faq-item"><div class="faq-q">⏰ Cần bao nhiêu giờ học mỗi ngày?</div><div class="faq-a">Tối thiểu 2-3 giờ/ngày để theo kịp lịch 12 tuần. Nếu bạn có thể dành 4-5 giờ, bạn sẽ có nhiều thời gian hơn để làm dự án và nhận mentor review. Video được ghi sẵn nên bạn học bất cứ lúc nào.</div></div>
    <div class="faq-item"><div class="faq-q">👨‍💼 Hỗ trợ tìm việc hoạt động như thế nào?</div><div class="faq-a">Sau tốt nghiệp, đội ngũ HR của chúng tôi review CV, chuẩn bị portfolio và kết nối bạn với 50+ công ty đối tác đang tuyển Junior Developer. Cam kết hỗ trợ đến khi bạn có offer — không giới hạn thời gian.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Chính sách hoàn tiền như thế nào?</div><div class="faq-a">Hoàn tiền 100% trong 7 ngày đầu nếu bạn không hài lòng — không cần giải thích lý do. Sau 7 ngày, nếu bạn học đúng theo lộ trình mà không tìm được việc trong 6 tháng, chúng tôi hoàn 50% học phí.</div></div>
    <div class="faq-item"><div class="faq-q">📱 Học trên thiết bị nào?</div><div class="faq-a">Máy tính laptop/desktop (Windows, Mac, Linux đều được). Không học được trên điện thoại hay iPad vì cần môi trường lập trình thực sự. Cấu hình tối thiểu: RAM 8GB, ổ cứng trống 20GB.</div></div>
  </div>
</section>

<section class="pricing">
  <h2 class="sec-title">Đăng ký học ngay hôm nay</h2>
  <p class="sec-sub">Đầu tư một lần — thay đổi cả cuộc đời</p>
  <div class="price-main-card">
    <div class="price-badge-top">🔥 Ưu đãi đặc biệt · Chỉ còn 15 suất</div>
    <div class="price-old">5.990.000đ</div>
    <div class="price-amount">2.990.000đ</div>
    <div class="price-note">Trả góp 0% từ 498K/tháng · Không cần thẻ ngân hàng</div>
    <a href="#" class="enroll-btn">🚀 Đăng ký học ngay — 2.990.000đ</a>
    <div class="price-features">
      ✓ 120+ giờ video chất lượng cao, truy cập trọn đời<br>
      ✓ 5 dự án thực chiến vào portfolio<br>
      ✓ Mentor review code 1-1 không giới hạn<br>
      ✓ Cộng đồng Discord 2.400+ thành viên<br>
      ✓ Cập nhật nội dung miễn phí khi có công nghệ mới<br>
      ✓ Hỗ trợ tìm việc đến khi có offer
    </div>
    <div class="guarantee-dark">🛡️ Hoàn tiền 100% trong 7 ngày nếu không hài lòng · Không cần giải thích lý do</div>
  </div>
</section>

</body></html>`

const LP_AGENCY = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#09090b;color:#fff}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:1px solid rgba(255,255,255,.08);position:sticky;top:0;background:#09090b;z-index:10}
.nav-logo{font-size:22px;font-weight:900;letter-spacing:-0.5px}
.nav-logo span{color:#a855f7}
.nav-links{display:flex;gap:28px;font-size:14px;color:#94a3b8}
.nav-links a{color:#94a3b8;text-decoration:none}
.nav-cta{background:linear-gradient(135deg,#a855f7,#6366f1);color:#fff;border:none;border-radius:10px;padding:11px 22px;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none}
.hero{padding:110px 40px 80px;max-width:1100px;margin:0 auto}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);color:#c084fc;border-radius:999px;padding:6px 18px;font-size:12px;font-weight:700;margin-bottom:28px}
.hero h1{font-size:clamp(40px,6vw,76px);font-weight:900;line-height:1.08;margin-bottom:22px;letter-spacing:-2px}
.hero h1 .grad{background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:19px;color:#94a3b8;max-width:580px;line-height:1.75;margin-bottom:36px}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:56px}
.btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#a855f7,#6366f1);color:#fff;border-radius:12px;padding:17px 34px;font-size:15px;font-weight:700;text-decoration:none}
.btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:12px;padding:15px 28px;font-size:15px;text-decoration:none}
.client-logos{display:flex;gap:24px;align-items:center;flex-wrap:wrap;padding-top:36px;border-top:1px solid rgba(255,255,255,.08)}
.logo-label{font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-right:8px}
.logo-badge{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;color:#94a3b8}
/* Stats */
.metrics{background:rgba(168,85,247,.08);border-top:1px solid rgba(168,85,247,.2);border-bottom:1px solid rgba(168,85,247,.2);padding:40px 40px}
.metrics-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:20px;max-width:1000px;margin:0 auto;text-align:center}
.metric-n{font-size:42px;font-weight:900;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.metric-l{font-size:13px;color:#94a3b8;margin-top:4px}
/* Services */
.services{padding:90px 40px;max-width:1100px;margin:0 auto}
.sec-label{color:#a855f7;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
.sec-title{font-size:38px;font-weight:800;margin-bottom:16px}
.sec-sub{color:#94a3b8;font-size:16px;max-width:560px;line-height:1.6;margin-bottom:52px}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.svc-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px}
.svc-num{font-size:44px;font-weight:900;background:linear-gradient(135deg,#a855f7,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:14px}
.svc-title{font-size:19px;font-weight:700;margin-bottom:10px}
.svc-text{font-size:14px;color:#94a3b8;line-height:1.7;margin-bottom:12px}
.svc-tags{display:flex;gap:6px;flex-wrap:wrap}
.svc-tag{background:rgba(168,85,247,.12);color:#c084fc;border-radius:6px;padding:3px 10px;font-size:11px;font-weight:600}
/* Process */
.process{padding:90px 40px;background:rgba(255,255,255,.02);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
.process-inner{max-width:1000px;margin:0 auto}
.process-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0;position:relative;margin-top:52px}
.proc-step{text-align:center;padding:0 16px;position:relative}
.proc-step:not(:last-child)::after{content:'→';position:absolute;right:-12px;top:28px;color:#a855f7;font-size:20px}
.proc-circle{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#6366f1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:22px}
.proc-title{font-weight:700;font-size:15px;margin-bottom:6px}
.proc-desc{font-size:13px;color:#94a3b8;line-height:1.55}
/* Works */
.works{padding:90px 40px}
.works-inner{max-width:1100px;margin:0 auto}
.works-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:48px}
.work-card{border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.06)}
.work-img{height:200px;display:flex;align-items:center;justify-content:center;font-size:56px}
.work-info{background:rgba(255,255,255,.04);padding:24px}
.work-name{font-weight:700;font-size:17px;margin-bottom:6px}
.work-result{font-size:22px;font-weight:900;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
.work-cat{font-size:13px;color:#64748b}
/* Testimonials */
.testi{padding:90px 40px;background:rgba(168,85,247,.06);border-top:1px solid rgba(168,85,247,.15)}
.testi-inner{max-width:1000px;margin:0 auto}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:48px}
.testi-card{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.2);border-radius:16px;padding:28px}
.testi-stars{color:#fbbf24;margin-bottom:12px;font-size:15px}
.testi-text{font-size:15px;color:#cbd5e1;font-style:italic;line-height:1.7;margin-bottom:16px}
.testi-author{font-weight:700;font-size:14px}
.testi-role{font-size:12px;color:#94a3b8}
/* CTA */
.cta-sec{padding:110px 40px;text-align:center;max-width:800px;margin:0 auto}
.cta-sec h2{font-size:52px;font-weight:900;margin-bottom:16px;letter-spacing:-1px}
.cta-sec p{color:#94a3b8;font-size:18px;margin-bottom:36px;line-height:1.6}
.cta-note{font-size:13px;color:#64748b;margin-top:14px}
</style></head>
<body>
<nav>
  <div class="nav-logo">Nexus<span>.</span>Agency</div>
  <div class="nav-links"><a href="#">Dịch vụ</a><a href="#">Portfolio</a><a href="#">Quy trình</a><a href="#">Về chúng tôi</a></div>
  <a href="#" class="nav-cta">Nhận báo giá miễn phí</a>
</nav>

<div class="hero">
  <div class="hero-eyebrow">⚡ Top 10 Marketing Agency tại Việt Nam 2025</div>
  <h1>Chúng tôi giúp<br>thương hiệu của bạn<br><span class="grad">tăng trưởng x10</span></h1>
  <p>Chiến lược marketing tổng thể — Performance Ads, SEO, Content Marketing, Social Media. Đã phục vụ 200+ thương hiệu từ startup đến tập đoàn lớn.</p>
  <div class="hero-btns">
    <a href="#" class="btn-p">Nhận tư vấn miễn phí 30 phút →</a>
    <a href="#" class="btn-s">Xem case studies</a>
  </div>
  <div class="client-logos">
    <span class="logo-label">Khách hàng tin tưởng</span>
    <span class="logo-badge">Vinamilk</span><span class="logo-badge">Shopee VN</span><span class="logo-badge">FPT Shop</span><span class="logo-badge">Sendo</span><span class="logo-badge">Momo</span><span class="logo-badge">Tiki</span>
  </div>
</div>

<div class="metrics">
  <div class="metrics-inner">
    <div><div class="metric-n">200+</div><div class="metric-l">Thương hiệu đã phục vụ</div></div>
    <div><div class="metric-n">6.8x</div><div class="metric-l">ROAS trung bình toàn danh mục</div></div>
    <div><div class="metric-n">850%</div><div class="metric-l">Tăng trưởng traffic SEO</div></div>
    <div><div class="metric-n">5 năm</div><div class="metric-l">Kinh nghiệm thị trường VN</div></div>
    <div><div class="metric-n">48h</div><div class="metric-l">Thời gian ra báo giá</div></div>
  </div>
</div>

<section class="services">
  <div class="sec-label">Dịch vụ</div>
  <h2 class="sec-title">Giải pháp marketing toàn diện</h2>
  <p class="sec-sub">Chúng tôi không bán dịch vụ đơn lẻ — chúng tôi xây dựng hệ thống tăng trưởng bền vững cho doanh nghiệp bạn.</p>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-num">01</div><div class="svc-title">Performance Ads</div><div class="svc-text">Quản lý ngân sách quảng cáo Facebook, TikTok, Google với AI bidding. Mục tiêu ROAS tối thiểu 4x — cam kết bằng hợp đồng.</div><div class="svc-tags"><span class="svc-tag">Meta Ads</span><span class="svc-tag">Google Ads</span><span class="svc-tag">TikTok Ads</span></div></div>
    <div class="svc-card"><div class="svc-num">02</div><div class="svc-title">SEO & Content Marketing</div><div class="svc-text">Lên top Google bền vững với chiến lược content E-E-A-T. Tăng traffic organic từ 0 lên 100K/tháng trong 6 tháng — đã chứng minh.</div><div class="svc-tags"><span class="svc-tag">Technical SEO</span><span class="svc-tag">Content SEO</span><span class="svc-tag">Link Building</span></div></div>
    <div class="svc-card"><div class="svc-num">03</div><div class="svc-title">Social Media Management</div><div class="svc-text">Quản lý toàn bộ kênh mạng xã hội — lên kế hoạch nội dung, sản xuất creative, đăng bài, tương tác và báo cáo hàng tuần.</div><div class="svc-tags"><span class="svc-tag">Facebook</span><span class="svc-tag">Instagram</span><span class="svc-tag">TikTok</span></div></div>
    <div class="svc-card"><div class="svc-num">04</div><div class="svc-title">Branding & Creative</div><div class="svc-text">Xây dựng brand identity từ chiến lược đến thực thi — logo, brand guideline, key visual, TVC, KV campaign.</div><div class="svc-tags"><span class="svc-tag">Brand Strategy</span><span class="svc-tag">Visual Identity</span><span class="svc-tag">Campaign</span></div></div>
    <div class="svc-card"><div class="svc-num">05</div><div class="svc-title">Influencer Marketing</div><div class="svc-text">Kết nối và quản lý chiến dịch KOC/KOL từ nano đến mega influencer. Network 5.000+ influencer Việt trên mọi nền tảng.</div><div class="svc-tags"><span class="svc-tag">KOL</span><span class="svc-tag">KOC</span><span class="svc-tag">Seeding</span></div></div>
    <div class="svc-card"><div class="svc-num">06</div><div class="svc-title">Marketing Automation</div><div class="svc-text">Xây dựng phễu bán hàng tự động — email marketing, chatbot, CRM, retargeting. Nuôi dưỡng lead 24/7 không cần nhân lực.</div><div class="svc-tags"><span class="svc-tag">Email</span><span class="svc-tag">CRM</span><span class="svc-tag">Chatbot</span></div></div>
  </div>
</section>

<section class="process">
  <div class="process-inner">
    <div class="sec-label">Quy trình làm việc</div>
    <h2 class="sec-title">Từ brief đến kết quả — 5 bước rõ ràng</h2>
    <div class="process-steps">
      <div class="proc-step"><div class="proc-circle">🔍</div><div class="proc-title">Khám phá &amp; Audit</div><div class="proc-desc">Phân tích toàn diện thương hiệu, đối thủ và thị trường hiện tại của bạn.</div></div>
      <div class="proc-step"><div class="proc-circle">🎯</div><div class="proc-title">Chiến lược</div><div class="proc-desc">Xây dựng roadmap tăng trưởng 6-12 tháng với KPI rõ ràng, đo lường được.</div></div>
      <div class="proc-step"><div class="proc-circle">🚀</div><div class="proc-title">Triển khai</div><div class="proc-desc">Thực thi đa kênh theo kế hoạch với đội ngũ chuyên biệt cho từng nền tảng.</div></div>
      <div class="proc-step"><div class="proc-circle">📊</div><div class="proc-title">Tối ưu</div><div class="proc-desc">Phân tích data hàng tuần, A/B testing liên tục để tối ưu hiệu suất.</div></div>
      <div class="proc-step"><div class="proc-circle">📈</div><div class="proc-title">Tăng trưởng</div><div class="proc-desc">Báo cáo minh bạch, scale ngân sách theo hiệu quả thực tế đo lường được.</div></div>
    </div>
  </div>
</section>

<section class="works">
  <div class="works-inner">
    <div class="sec-label">Case Studies</div>
    <h2 class="sec-title">Kết quả thực tế từ khách hàng</h2>
    <div class="works-grid">
      <div class="work-card"><div class="work-img" style="background:linear-gradient(135deg,#6366f1,#a855f7)">🛍️</div><div class="work-info"><div class="work-result">ROAS 6.2x</div><div class="work-name">FashionX — Facebook &amp; TikTok Ads</div><div class="work-cat">Từ 50 triệu/tháng ngân sách lên 300 triệu, doanh thu tăng 8x trong 4 tháng</div></div></div>
      <div class="work-card"><div class="work-img" style="background:linear-gradient(135deg,#06b6d4,#3b82f6)">🏠</div><div class="work-info"><div class="work-result">+850% Traffic</div><div class="work-name">DatNen24h — SEO &amp; Content</div><div class="work-cat">Từ 20K lên 200K visitor/tháng, 47 từ khóa Top 1 Google trong 8 tháng</div></div></div>
      <div class="work-card"><div class="work-img" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">☕</div><div class="work-info"><div class="work-result">+120K Followers</div><div class="work-name">CaféCore — Social Media &amp; KOL</div><div class="work-cat">Xây dựng community từ 0 lên 120K followers trong 6 tháng, engagement rate 8.5%</div></div></div>
    </div>
  </div>
</section>

<section class="testi">
  <div class="testi-inner">
    <div class="sec-label">Khách hàng nói gì</div>
    <h2 class="sec-title">Đối tác tin tưởng — kết quả thật</h2>
    <div class="testi-grid">
      <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"Nexus Agency đã giúp chúng tôi tăng doanh thu online từ 500 triệu lên 3 tỷ/tháng chỉ trong 5 tháng. Đội ngũ chuyên nghiệp, báo cáo minh bạch và luôn vượt KPI cam kết."</p><div class="testi-author">Nguyễn Văn Hùng</div><div class="testi-role">CEO · FashionX Việt Nam</div></div>
      <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"Sau 8 tháng làm SEO với Nexus, website của chúng tôi đã có 47 từ khóa top 1 Google. Traffic tăng gấp 10, chi phí acquisition giảm 60% so với chạy ads."</p><div class="testi-author">Trần Thị Lan</div><div class="testi-role">Marketing Director · DatNen24h</div></div>
      <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-text">"Điều tôi ấn tượng nhất là Nexus hiểu thị trường Việt Nam rất sâu. Họ không áp dụng công thức nước ngoài một cách cứng nhắc mà điều chỉnh chiến lược cho đúng văn hóa người tiêu dùng Việt."</p><div class="testi-author">Phạm Minh Đức</div><div class="testi-role">Founder · CaféCore</div></div>
    </div>
  </div>
</section>

<div class="cta-sec">
  <h2>Sẵn sàng tăng trưởng?</h2>
  <p>Nhận tư vấn chiến lược marketing miễn phí 30 phút với Senior Strategist của chúng tôi. Không cam kết, không ràng buộc.</p>
  <a href="#" class="btn-p" style="display:inline-flex;margin:0 auto">Đặt lịch tư vấn ngay →</a>
  <p class="cta-note">Đã có 200+ doanh nghiệp Việt tin tưởng · Phản hồi trong 24 giờ làm việc</p>
</div>
</body></html>`

const LP_SAAS = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a}
/* Hero */
.hero{background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 60%,#ecfdf5 100%);padding:90px 24px 80px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #34d399;color:#059669;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:28px}
.hero h1{font-size:clamp(34px,5vw,58px);font-weight:900;color:#064e3b;line-height:1.15;margin-bottom:18px}
.hero h1 span{color:#059669}
.hero p{font-size:18px;color:#065f46;max-width:540px;margin:0 auto 32px;line-height:1.75}
.hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.btn-hero{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border-radius:14px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(5,150,105,.3)}
.btn-demo{display:inline-flex;align-items:center;gap:8px;background:transparent;border:2px solid #34d399;color:#065f46;border-radius:14px;padding:15px 28px;font-size:15px;text-decoration:none}
.trial-note{font-size:13px;color:#6b7280}
/* Stats bar */
.stats-bar{background:#064e3b;padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:20px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;color:#6ee7b7}
.stat-l{font-size:13px;color:#a7f3d0;margin-top:4px}
/* Features */
.features{padding:80px 24px;background:#fff}
.sec-title{text-align:center;font-size:34px;font-weight:800;color:#064e3b;margin-bottom:12px}
.sec-sub{text-align:center;font-size:16px;color:#888;margin-bottom:48px}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:1000px;margin:0 auto}
.feat{background:linear-gradient(135deg,#ecfdf5,#fff);border:1px solid #a7f3d0;border-radius:18px;padding:32px}
.feat-icon{width:52px;height:52px;background:linear-gradient(135deg,#059669,#047857);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px}
.feat h3{font-size:17px;font-weight:700;color:#064e3b;margin-bottom:10px}
.feat p{font-size:14px;color:#374151;line-height:1.7}
/* How it works */
.how{padding:80px 24px;background:#f0fdf4}
.steps{display:flex;flex-direction:column;gap:0;max-width:680px;margin:0 auto}
.step{display:flex;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px dashed #a7f3d0}
.step:last-child{border:none}
.step-num{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#059669,#047857);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.step-body .step-title{font-size:17px;font-weight:700;color:#064e3b;margin-bottom:6px}
.step-body .step-text{font-size:14px;color:#374151;line-height:1.65}
.step-tag{display:inline-flex;background:#d1fae5;color:#047857;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:700;margin-top:8px}
/* Integrations */
.integrations{padding:80px 24px;background:#fff}
.int-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;max-width:900px;margin:0 auto}
.int-card{border:1px solid #d1fae5;border-radius:14px;padding:20px;text-align:center}
.int-emoji{font-size:32px;margin-bottom:8px;display:block}
.int-name{font-size:13px;font-weight:700;color:#064e3b}
/* Testimonials */
.testi{padding:80px 24px;background:linear-gradient(135deg,#064e3b,#065f46)}
.testi .sec-title{color:#fff;margin-bottom:8px}
.testi .sec-sub{color:#6ee7b7;margin-bottom:48px}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:28px}
.testi-stars{color:#6ee7b7;font-size:17px;margin-bottom:12px}
.testi-quote{font-size:15px;color:#d1fae5;font-style:italic;line-height:1.7;margin-bottom:16px}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-loc{font-size:12px;color:#6ee7b7}
/* FAQ */
.faq{padding:80px 24px;background:#f0fdf4}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.faq-item{border:1px solid #a7f3d0;border-radius:14px;padding:24px;background:#fff}
.faq-q{font-weight:700;color:#064e3b;margin-bottom:10px;font-size:16px}
.faq-a{font-size:14px;color:#374151;line-height:1.7}
/* Pricing */
.pricing{padding:80px 24px;background:#fff;text-align:center}
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:860px;margin:0 auto 32px}
.plan{border:2px solid #d1fae5;border-radius:20px;padding:32px;text-align:left}
.plan.featured{border-color:#059669;background:linear-gradient(135deg,#059669,#047857);color:#fff}
.plan-name{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;color:#059669}
.plan.featured .plan-name{color:#a7f3d0}
.plan-price{font-size:48px;font-weight:900;color:#064e3b;margin-bottom:4px}
.plan.featured .plan-price{color:#fff}
.plan-per{font-size:14px;color:#6b7280;margin-bottom:20px}
.plan.featured .plan-per{color:#a7f3d0}
.plan-btn{display:block;border-radius:12px;padding:13px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:20px}
.plan-btn-free{background:#f0fdf4;color:#059669;border:2px solid #d1fae5}
.plan-btn-paid{background:#fff;color:#047857}
.plan-feat{font-size:13px;color:#374151;line-height:2.1}
.plan.featured .plan-feat{color:#d1fae5}
/* CTA */
.cta-sec{padding:80px 24px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);text-align:center}
.cta-sec h2{font-size:38px;font-weight:800;color:#064e3b;margin-bottom:12px}
.cta-sec p{font-size:17px;color:#065f46;margin-bottom:32px;line-height:1.65}
/* Footer */
.footer{background:#064e3b;color:#a7f3d0;padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:8px}
.footer-tagline{font-size:13px;opacity:.7}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#6ee7b7;text-decoration:none;font-size:14px}
.footer-bottom{background:#022c22;text-align:center;padding:16px 24px;font-size:13px;color:#a7f3d0;opacity:.8}
</style></head>
<body>

<section class="hero">
  <div class="badge">📊 Phần mềm quản lý bán hàng · 15.000+ cửa hàng tin dùng</div>
  <h1>Quản lý cửa hàng<br><span>thông minh hơn mỗi ngày</span></h1>
  <p>Hệ thống POS + quản lý kho + báo cáo doanh thu thời gian thực. Không cần cài đặt, dùng ngay trên trình duyệt — từ mọi thiết bị.</p>
  <div class="hero-btns">
    <a href="#" class="btn-hero">🎁 Dùng thử miễn phí 30 ngày</a>
    <a href="#" class="btn-demo">▶ Xem demo trực tiếp</a>
  </div>
  <p class="trial-note">Không cần thẻ ngân hàng · Không cần cài đặt · Hủy bất cứ lúc nào</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">15K+</div><div class="stat-l">Cửa hàng tin dùng</div></div>
    <div><div class="stat-n">2.5M+</div><div class="stat-l">Giao dịch mỗi ngày</div></div>
    <div><div class="stat-n">99.9%</div><div class="stat-l">Uptime đảm bảo</div></div>
    <div><div class="stat-n">24/7</div><div class="stat-l">Hỗ trợ kỹ thuật</div></div>
  </div>
</div>

<section class="features">
  <h2 class="sec-title">Tất cả những gì bạn cần để vận hành cửa hàng</h2>
  <p class="sec-sub">Một nền tảng thay thế hoàn toàn 5-6 phần mềm riêng lẻ bạn đang dùng</p>
  <div class="feat-grid">
    <div class="feat"><div class="feat-icon">🏪</div><h3>POS & Bán hàng nhanh</h3><p>Giao dịch dưới 10 giây — hỗ trợ thanh toán QR (VNPay, Momo, ZaloPay), tiền mặt và thẻ ngân hàng. Tích hợp in hóa đơn nhiệt không cần cài driver.</p></div>
    <div class="feat"><div class="feat-icon">📦</div><h3>Quản lý kho thời gian thực</h3><p>Theo dõi tồn kho tức thì khi có giao dịch. Cảnh báo tự động qua Zalo/SMS khi hàng sắp hết. Quản lý nhiều kho, nhiều chi nhánh trên một màn hình.</p></div>
    <div class="feat"><div class="feat-icon">📈</div><h3>Báo cáo & Dashboard thông minh</h3><p>Xem doanh thu, lợi nhuận, sản phẩm bán chạy theo giờ/ngày/tháng. Xuất báo cáo Excel tự động hàng ngày. So sánh hiệu suất giữa các chi nhánh.</p></div>
    <div class="feat"><div class="feat-icon">👥</div><h3>Quản lý nhân viên & Ca làm</h3><p>Chấm công qua app, quản lý ca làm việc, phân quyền chi tiết theo vai trò. Tính lương tự động theo ca và hoa hồng bán hàng.</p></div>
    <div class="feat"><div class="feat-icon">❤️</div><h3>Chương trình khách hàng thân thiết</h3><p>Tích điểm, thẻ thành viên, voucher giảm giá tự động. CRM quản lý lịch sử mua hàng và gửi tin nhắn chăm sóc khách hàng tự động.</p></div>
    <div class="feat"><div class="feat-icon">🔗</div><h3>Kết nối đa kênh bán hàng</h3><p>Đồng bộ tự động với Shopee, Lazada, TikTok Shop và website — tồn kho cập nhật thời gian thực trên mọi kênh, không lo bán vượt hàng.</p></div>
  </div>
</section>

<section class="how">
  <h2 class="sec-title" style="text-align:center;margin-bottom:12px">Bắt đầu trong 3 bước đơn giản</h2>
  <p class="sec-sub">Từ đăng ký đến bán hàng — không quá 15 phút</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <div class="step-title">Đăng ký tài khoản miễn phí</div>
        <div class="step-text">Tạo tài khoản trong 60 giây chỉ cần email hoặc số điện thoại. Không cần thẻ ngân hàng, không cần cài đặt phần mềm — truy cập ngay trên trình duyệt.</div>
        <span class="step-tag">⏱ 60 giây</span>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <div class="step-title">Nhập sản phẩm & thiết lập cửa hàng</div>
        <div class="step-text">Import danh sách hàng hóa từ file Excel chỉ trong vài giây. Cài đặt thông tin cửa hàng, kết nối máy in, thiết lập giá và thuế. Đội ngũ hỗ trợ sẵn sàng giúp bạn 1-1 qua Zalo nếu cần.</div>
        <span class="step-tag">⏱ 10-15 phút</span>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <div class="step-title">Mở quầy và bắt đầu bán hàng</div>
        <div class="step-text">Giao diện POS cực đơn giản — nhân viên mới học trong 5 phút. Tìm sản phẩm, quét mã vạch, tính tiền và in hóa đơn trong vài giây. Dữ liệu đồng bộ real-time lên dashboard quản lý của bạn.</div>
        <span class="step-tag">⏱ Bắt đầu ngay lập tức</span>
      </div>
    </div>
  </div>
</section>

<section class="integrations">
  <h2 class="sec-title">Kết nối với các nền tảng bạn đang dùng</h2>
  <p class="sec-sub">Tích hợp sẵn — không cần kỹ thuật, không cần cấu hình phức tạp</p>
  <div class="int-grid">
    <div class="int-card"><span class="int-emoji">🛍️</span><div class="int-name">Shopee</div></div>
    <div class="int-card"><span class="int-emoji">📦</span><div class="int-name">Lazada</div></div>
    <div class="int-card"><span class="int-emoji">🎵</span><div class="int-name">TikTok Shop</div></div>
    <div class="int-card"><span class="int-emoji">💚</span><div class="int-name">Zalo OA</div></div>
    <div class="int-card"><span class="int-emoji">💳</span><div class="int-name">VNPay</div></div>
    <div class="int-card"><span class="int-emoji">💜</span><div class="int-name">MoMo</div></div>
    <div class="int-card"><span class="int-emoji">📱</span><div class="int-name">ZaloPay</div></div>
    <div class="int-card"><span class="int-emoji">📊</span><div class="int-name">Google Sheets</div></div>
  </div>
</section>

<section class="testi">
  <h2 class="sec-title">15.000+ chủ cửa hàng đã tin dùng</h2>
  <p class="sec-sub">Đánh giá thật từ chủ cửa hàng thật — không chỉnh sửa</p>
  <div class="testi-grid">
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Trước dùng 3 phần mềm khác nhau cho POS, kho và báo cáo. Giờ dùng SalePro là đủ hết. Tiết kiệm 4 triệu/tháng phần mềm và 2-3 giờ làm báo cáo mỗi ngày. Nhân viên mới học trong 1 buổi là dùng thành thạo."</p>
      <div class="testi-author"><div class="testi-avatar">MT</div><div><div class="testi-name">Minh Tuấn</div><div class="testi-loc">Chủ chuỗi 5 cửa hàng thời trang · Hà Nội</div></div></div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Tính năng kết nối Shopee và TikTok Shop tuyệt vời — kho tự cập nhật khi có đơn từ cả 3 kênh, không bao giờ bị tình trạng hết hàng mà vẫn bán. Doanh thu tăng 40% vì không bỏ sót đơn hàng nữa."</p>
      <div class="testi-author"><div class="testi-avatar">NL</div><div><div class="testi-name">Ngọc Lan</div><div class="testi-loc">Cửa hàng mỹ phẩm online · TP.HCM</div></div></div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"Mở quán cà phê lần đầu, sợ nhất phần quản lý kho nguyên liệu. SalePro tính tự động nguyên liệu hao hụt theo từng order — tôi biết chính xác cần nhập thêm gì trước khi hết. Không còn bị thiếu nguyên liệu giữa ngày bận nữa."</p>
      <div class="testi-author"><div class="testi-avatar">HA</div><div><div class="testi-name">Hoàng Anh</div><div class="testi-loc">Chủ quán cà phê · Đà Nẵng</div></div></div>
    </div>
  </div>
</section>

<section class="faq">
  <h2 class="sec-title">Câu hỏi thường gặp</h2>
  <p class="sec-sub">Mọi thứ bạn cần biết trước khi bắt đầu dùng thử</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🤔 Tôi cần mua thiết bị gì đặc biệt không?</div><div class="faq-a">Không cần thiết bị đặc biệt! Phần mềm chạy trên mọi trình duyệt — máy tính, laptop, tablet, thậm chí điện thoại. Nếu cần in hóa đơn, chúng tôi hỗ trợ hầu hết máy in nhiệt phổ biến tại Việt Nam qua kết nối USB hoặc WiFi.</div></div>
    <div class="faq-item"><div class="faq-q">📱 Có thể dùng offline khi mất mạng không?</div><div class="faq-a">Có! Chế độ offline cho phép bạn tiếp tục bán hàng và giao dịch ngay cả khi mất kết nối internet. Khi có mạng trở lại, dữ liệu tự động đồng bộ lên cloud — không mất bất kỳ giao dịch nào.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Tôi có thể chuyển dữ liệu từ phần mềm cũ không?</div><div class="faq-a">Hoàn toàn được. Chúng tôi hỗ trợ import từ Excel và các phần mềm phổ biến như KiotViet, Sapo, Bizweb. Đội ngũ onboarding sẽ hỗ trợ bạn chuyển đổi dữ liệu miễn phí trong vòng 24 giờ.</div></div>
    <div class="faq-item"><div class="faq-q">💳 Chính sách thanh toán và hoàn tiền như thế nào?</div><div class="faq-a">Dùng thử miễn phí 30 ngày không cần thẻ. Sau đó thanh toán theo tháng hoặc năm (tiết kiệm 20%). Hoàn tiền 100% trong 30 ngày đầu sử dụng nếu bạn không hài lòng — không cần giải thích.</div></div>
    <div class="faq-item"><div class="faq-q">🏪 Quản lý nhiều chi nhánh được không?</div><div class="faq-a">Gói Pro hỗ trợ tối đa 5 chi nhánh, gói Enterprise không giới hạn. Xem tồn kho, doanh thu và hiệu suất nhân viên của tất cả chi nhánh trên một dashboard duy nhất.</div></div>
  </div>
</section>

<section class="pricing">
  <h2 class="sec-title">Bảng giá minh bạch · Không phí ẩn</h2>
  <p class="sec-sub">Chọn gói phù hợp — nâng cấp hoặc hạ cấp bất cứ lúc nào</p>
  <div class="plan-grid">
    <div class="plan">
      <div class="plan-name">Miễn phí</div>
      <div class="plan-price">0đ</div>
      <div class="plan-per">/tháng · 1 chi nhánh</div>
      <a href="#" class="plan-btn plan-btn-free">Bắt đầu miễn phí →</a>
      <div class="plan-feat">✓ 1 tài khoản nhân viên<br>✓ 200 sản phẩm<br>✓ Báo cáo cơ bản<br>✓ Hỗ trợ email</div>
    </div>
    <div class="plan featured">
      <div class="plan-name">Pro ⭐ Phổ biến nhất</div>
      <div class="plan-price">299K</div>
      <div class="plan-per">/tháng · Tối đa 5 chi nhánh</div>
      <a href="#" class="plan-btn plan-btn-paid">Dùng thử Pro miễn phí →</a>
      <div class="plan-feat">✓ Không giới hạn nhân viên<br>✓ Không giới hạn sản phẩm<br>✓ Báo cáo nâng cao + xuất Excel<br>✓ Kết nối Shopee, Lazada, TikTok<br>✓ CRM khách hàng thân thiết<br>✓ Hỗ trợ 24/7 qua Zalo</div>
    </div>
    <div class="plan">
      <div class="plan-name">Enterprise</div>
      <div class="plan-price">799K</div>
      <div class="plan-per">/tháng · Không giới hạn</div>
      <a href="#" class="plan-btn plan-btn-free">Liên hệ tư vấn →</a>
      <div class="plan-feat">✓ Không giới hạn chi nhánh<br>✓ API tùy chỉnh<br>✓ Báo cáo theo yêu cầu<br>✓ Onboarding 1-1 tận nơi<br>✓ SLA uptime 99.9%</div>
    </div>
  </div>
</section>

<section class="cta-sec">
  <h2>Sẵn sàng quản lý cửa hàng thông minh hơn?</h2>
  <p>Tham gia cùng 15.000+ chủ cửa hàng Việt Nam đang tiết kiệm hàng giờ mỗi ngày với SalePro.</p>
  <a href="#" class="btn-hero" style="display:inline-flex;margin:0 auto">🎁 Bắt đầu dùng thử miễn phí 30 ngày →</a>
  <p style="margin-top:14px;font-size:13px;color:#065f46;opacity:.8">Không cần thẻ ngân hàng · Hoàn tiền 30 ngày nếu không hài lòng</p>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">📊 SalePro</div><div class="footer-tagline">Phần mềm quản lý bán hàng cho người Việt</div></div>
    <div class="footer-links"><a href="#">Tính năng</a><a href="#">Bảng giá</a><a href="#">Tích hợp</a><a href="#">Blog hướng dẫn</a></div>
    <div class="footer-links"><a href="#">Hotline: 1800 123 456</a><a href="#">Zalo hỗ trợ: 0901 234 567</a><a href="#">Email: hello@salepro.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 SalePro · Sản phẩm của Công ty TNHH SalePro Việt Nam · Chứng nhận ISO 27001</div>
</body></html>`

const LP_EVENT = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#0a0a0a;color:#fff}
/* Hero */
.hero{background:linear-gradient(135deg,#1a0533,#2d0a5e,#0a0a0a);padding:100px 24px 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at center,rgba(139,92,246,.15) 0%,transparent 60%)}
.hero-eyebrow{color:#a78bfa;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;position:relative}
.countdown{display:flex;gap:16px;justify-content:center;margin-bottom:40px;position:relative}
.cd-box{background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);border-radius:12px;padding:16px 20px;min-width:80px;text-align:center}
.cd-num{font-size:40px;font-weight:900;color:#a78bfa;line-height:1}
.cd-lbl{font-size:11px;color:#6b7280;margin-top:4px;text-transform:uppercase}
.hero h1{font-size:clamp(42px,8vw,90px);font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;position:relative}
.hero h1 .yr{color:#a78bfa}
.hero-date{font-size:18px;color:#c4b5fd;font-weight:700;margin-bottom:12px;position:relative}
.hero p{font-size:17px;color:#94a3b8;max-width:540px;margin:0 auto 36px;line-height:1.7;position:relative}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;position:relative}
.ticket-btn{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-radius:14px;padding:18px 40px;font-size:17px;font-weight:700;text-decoration:none}
.btn-sec-ev{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:14px;padding:16px 24px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#6b7280;position:relative}
/* Stats bar */
.stats-bar{background:rgba(139,92,246,.12);border-top:1px solid rgba(139,92,246,.25);border-bottom:1px solid rgba(139,92,246,.25);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:32px;font-weight:900;color:#a78bfa}
.stat-l{font-size:12px;color:#94a3b8;margin-top:4px}
/* Sections common */
.sec-label{color:#a78bfa;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;text-align:center}
.sec-title{font-size:36px;font-weight:800;text-align:center;margin-bottom:12px}
.sec-sub{text-align:center;font-size:15px;color:#94a3b8;margin-bottom:48px}
/* Artists */
.artists{padding:80px 24px;max-width:1040px;margin:0 auto}
.headliner-badge{display:inline-flex;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1a1a;border-radius:999px;padding:3px 12px;font-size:11px;font-weight:800;margin-bottom:8px}
.artist-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}
.artist-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;text-align:center;transition:border-color .2s}
.artist-card.headliner{border-color:rgba(139,92,246,.5);background:rgba(139,92,246,.08)}
.artist-emoji{font-size:56px;margin-bottom:12px;display:block}
.artist-name{font-weight:800;font-size:18px;margin-bottom:4px}
.artist-cat{color:#94a3b8;font-size:13px;margin-bottom:8px}
.artist-stage{display:inline-flex;background:rgba(139,92,246,.2);color:#c4b5fd;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700}
/* Schedule */
.schedule{padding:80px 24px;background:rgba(255,255,255,.02);border-top:1px solid rgba(255,255,255,.06)}
.schedule-inner{max-width:760px;margin:0 auto}
.day-tabs{display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap;justify-content:center}
.day-tab{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 20px;font-size:14px;font-weight:700;color:#94a3b8}
.day-tab.active{background:rgba(139,92,246,.2);border-color:#7c3aed;color:#a78bfa}
.sch-day-title{font-size:22px;font-weight:700;color:#e9d5ff;margin-bottom:20px}
.sch-item{display:flex;align-items:center;gap:20px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.sch-item:last-child{border:none}
.sch-time{width:72px;font-size:14px;font-weight:700;color:#a78bfa;flex-shrink:0}
.sch-name{font-weight:600;font-size:15px;margin-bottom:2px}
.sch-stage{font-size:12px;color:#6b7280}
.sch-badge{display:inline-flex;background:rgba(251,191,36,.15);color:#fbbf24;border-radius:999px;padding:2px 9px;font-size:11px;font-weight:700;margin-left:8px}
/* Experience */
.experience{padding:80px 24px}
.exp-inner{max-width:1000px;margin:0 auto}
.exp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:48px}
.exp-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;text-align:center}
.exp-icon{font-size:40px;margin-bottom:14px;display:block}
.exp-title{font-weight:700;font-size:16px;margin-bottom:6px}
.exp-desc{font-size:13px;color:#94a3b8;line-height:1.6}
/* Venue */
.venue{padding:80px 24px;background:rgba(139,92,246,.06);border-top:1px solid rgba(139,92,246,.15)}
.venue-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
@media(max-width:640px){.venue-inner{grid-template-columns:1fr}}
.venue-map{background:linear-gradient(135deg,#1a0533,#2d0a5e);border-radius:18px;height:260px;display:flex;align-items:center;justify-content:center;font-size:80px;border:1px solid rgba(139,92,246,.3)}
.venue-info h3{font-size:26px;font-weight:800;margin-bottom:10px}
.venue-address{color:#c4b5fd;font-size:15px;margin-bottom:20px}
.venue-details{display:flex;flex-direction:column;gap:10px}
.venue-detail{display:flex;align-items:center;gap:10px;font-size:14px;color:#94a3b8}
/* FAQ */
.faq{padding:80px 24px}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px}
.faq-q{font-weight:700;color:#e9d5ff;margin-bottom:8px;font-size:15px}
.faq-a{font-size:14px;color:#94a3b8;line-height:1.7}
/* Tickets */
.tickets{padding:80px 24px;text-align:center;background:linear-gradient(135deg,#1a0533,#2d0a5e)}
.ticket-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:860px;margin:0 auto 32px}
.tkt{background:rgba(255,255,255,.05);border:1px solid rgba(139,92,246,.3);border-radius:20px;padding:28px;text-align:left}
.tkt.featured{border-color:#a855f7;background:rgba(139,92,246,.15)}
.tkt-type{font-size:12px;font-weight:700;color:#a78bfa;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px}
.tkt-price{font-size:42px;font-weight:900;margin-bottom:4px}
.tkt-per{font-size:13px;color:#6b7280;margin-bottom:16px}
.tkt-features{font-size:13px;color:#94a3b8;line-height:2;margin-bottom:20px}
.tkt.featured .tkt-features{color:#c4b5fd}
.tkt-btn{display:block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-radius:10px;padding:13px;text-align:center;text-decoration:none;font-weight:700;font-size:14px}
.tkt-note{font-size:11px;color:#6b7280;text-align:center;margin-top:6px}
.ticket-guarantee{color:#94a3b8;font-size:13px;margin-top:8px}
/* Footer */
.footer-ev{background:#0a0a0a;border-top:1px solid rgba(255,255,255,.08);padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.footer-brand{font-size:26px;font-weight:900;letter-spacing:-1px;margin-bottom:6px}
.footer-tagline{font-size:13px;color:#6b7280}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#94a3b8;text-decoration:none;font-size:14px}
.footer-bottom{background:#000;text-align:center;padding:16px 24px;font-size:12px;color:#4b5563}
</style></head>
<body>

<section class="hero">
  <div class="hero-eyebrow">Sự kiện diễn ra trong</div>
  <div class="countdown">
    <div class="cd-box"><div class="cd-num">12</div><div class="cd-lbl">Ngày</div></div>
    <div class="cd-box"><div class="cd-num">08</div><div class="cd-lbl">Giờ</div></div>
    <div class="cd-box"><div class="cd-num">45</div><div class="cd-lbl">Phút</div></div>
    <div class="cd-box"><div class="cd-num">20</div><div class="cd-lbl">Giây</div></div>
  </div>
  <h1>SUMMER FEST<br><span class="yr">2026</span></h1>
  <div class="hero-date">📅 15 · 16 · 17 tháng 7 năm 2026</div>
  <p>Festival âm nhạc lớn nhất mùa hè Việt Nam · 3 ngày · 20+ nghệ sĩ · 3 sân khấu · Phú Quốc, Kiên Giang</p>
  <div class="hero-btns">
    <a href="#" class="ticket-btn">🎟️ Mua vé ngay — từ 499.000đ</a>
    <a href="#" class="btn-sec-ev">▶ Xem trailer</a>
  </div>
  <p class="hero-note">⚡ Vé Early Bird hết hạn 30/06 · Đã bán 8.500/10.000 vé</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">10K</div><div class="stat-l">Khán giả / ngày</div></div>
    <div><div class="stat-n">20+</div><div class="stat-l">Nghệ sĩ tham gia</div></div>
    <div><div class="stat-n">3</div><div class="stat-l">Sân khấu đặc sắc</div></div>
    <div><div class="stat-n">3 ngày</div><div class="stat-l">Liên tục không dừng</div></div>
    <div><div class="stat-n">Phú Quốc</div><div class="stat-l">Kiên Giang · Việt Nam</div></div>
  </div>
</div>

<section class="artists" style="padding-top:80px;padding-bottom:80px">
  <div class="sec-label">Lineup 2026</div>
  <h2 class="sec-title">Nghệ sĩ biểu diễn</h2>
  <p class="sec-sub">Những cái tên hot nhất làng nhạc Việt — tất cả trên cùng một sân khấu</p>
  <div class="artist-grid">
    <div class="artist-card headliner">
      <div class="headliner-badge">⭐ HEADLINER</div>
      <span class="artist-emoji">🎤</span>
      <div class="artist-name">Sơn Tùng M-TP</div>
      <div class="artist-cat">Pop / R&B</div>
      <span class="artist-stage">Main Stage · 22:30</span>
    </div>
    <div class="artist-card headliner">
      <div class="headliner-badge">⭐ HEADLINER</div>
      <span class="artist-emoji">🎧</span>
      <div class="artist-name">HIEUTHUHAI</div>
      <div class="artist-cat">Hip-hop / Rap</div>
      <span class="artist-stage">Night Stage · 22:00</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎵</span>
      <div class="artist-name">Tlinh</div>
      <div class="artist-cat">R&B / Soul</div>
      <span class="artist-stage">Main Stage</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎸</span>
      <div class="artist-name">Nguyên Hà</div>
      <div class="artist-cat">Acoustic / Indie</div>
      <span class="artist-stage">Sunset Stage</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎹</span>
      <div class="artist-name">Hoàng Thùy Linh</div>
      <div class="artist-cat">Pop / Dance</div>
      <span class="artist-stage">Main Stage</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎺</span>
      <div class="artist-name">MCK</div>
      <div class="artist-cat">Hip-hop / Trap</div>
      <span class="artist-stage">Night Stage</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎻</span>
      <div class="artist-name">Bích Phương</div>
      <div class="artist-cat">Pop / Ballad</div>
      <span class="artist-stage">Sunset Stage</span>
    </div>
    <div class="artist-card">
      <span class="artist-emoji">🎼</span>
      <div class="artist-name">+13 Nghệ sĩ khác</div>
      <div class="artist-cat">Đang cập nhật</div>
      <span class="artist-stage">Công bố dần</span>
    </div>
  </div>
</section>

<section class="schedule">
  <div class="schedule-inner">
    <div class="sec-label">Lịch trình biểu diễn</div>
    <h2 class="sec-title" style="text-align:left;font-size:28px;margin-bottom:12px">3 ngày · 3 đêm không ngừng nghỉ</h2>
    <div class="day-tabs">
      <div class="day-tab active">Ngày 1 · 15/07</div>
      <div class="day-tab">Ngày 2 · 16/07</div>
      <div class="day-tab">Ngày 3 · 17/07</div>
    </div>
    <div class="sch-day-title">Ngày 1 — Thứ Ba, 15/07/2026</div>
    <div class="sch-item"><div class="sch-time">16:00</div><div><div class="sch-name">Mở cổng & check-in</div><div class="sch-stage">Tất cả khu vực</div></div></div>
    <div class="sch-item"><div class="sch-time">17:30</div><div><div class="sch-name">Opening Show — DJ Chillax</div><div class="sch-stage">Main Stage · Warm-up set 90 phút</div></div></div>
    <div class="sch-item"><div class="sch-time">19:00</div><div><div class="sch-name">Nguyên Hà — Acoustic Sunset</div><div class="sch-stage">Sunset Stage · 60 phút</div></div></div>
    <div class="sch-item"><div class="sch-time">20:30</div><div><div class="sch-name">MCK &amp; Obito — Live Hip-hop</div><div class="sch-stage">Night Stage · 75 phút</div></div></div>
    <div class="sch-item"><div class="sch-time">22:00</div><div><div class="sch-name">Tlinh — R&amp;B Night <span class="sch-badge">FEATURED</span></div><div class="sch-stage">Main Stage · 90 phút</div></div></div>
    <div class="sch-item"><div class="sch-time">23:45</div><div><div class="sch-name">After Party DJ Set</div><div class="sch-stage">Night Stage · Đến 02:00</div></div></div>
  </div>
</section>

<section class="experience">
  <div class="exp-inner">
    <div class="sec-label">Trải nghiệm tại Summer Fest</div>
    <h2 class="sec-title">Không chỉ là âm nhạc</h2>
    <p class="sec-sub">Hơn 30 hoạt động và tiện ích cho 3 ngày không thể quên</p>
    <div class="exp-grid">
      <div class="exp-card"><span class="exp-icon">🎭</span><div class="exp-title">3 Sân khấu đặc sắc</div><div class="exp-desc">Main Stage 10.000 khán giả, Night Stage EDM, Sunset Stage acoustic nhìn ra biển.</div></div>
      <div class="exp-card"><span class="exp-icon">🍔</span><div class="exp-title">Food Court 50+ gian hàng</div><div class="exp-desc">Ẩm thực Việt Nam và quốc tế, food truck, bar craft beer và cocktail nhiệt đới.</div></div>
      <div class="exp-card"><span class="exp-icon">🎨</span><div class="exp-title">Art Installation</div><div class="exp-desc">15 tác phẩm nghệ thuật tương tác đặc biệt của các nghệ sĩ Việt Nam và quốc tế.</div></div>
      <div class="exp-card"><span class="exp-icon">📸</span><div class="exp-title">Photo Zones</div><div class="exp-desc">20+ điểm check-in ấn tượng, backdrop neon, mirror room và cầu ảo ảo ngoài trời.</div></div>
      <div class="exp-card"><span class="exp-icon">🌊</span><div class="exp-title">Beach Club</div><div class="exp-desc">Khu vực pool party bên bờ biển Phú Quốc — bơi, thư giãn và nhạc beach chill.</div></div>
      <div class="exp-card"><span class="exp-icon">🛕</span><div class="exp-title">Camping &amp; Glamping</div><div class="exp-desc">Dịch vụ cắm trại ngay trong khuôn viên — lều tiêu chuẩn và glamping tent cao cấp.</div></div>
    </div>
  </div>
</section>

<section class="venue">
  <div class="venue-inner">
    <div class="venue-map">🏝️</div>
    <div class="venue-info">
      <div class="sec-label" style="text-align:left">Địa điểm</div>
      <h3>Bãi Dài Beach Festival Ground</h3>
      <div class="venue-address">📍 Bãi Dài, Phú Quốc, Kiên Giang<br>Khu vực sự kiện 50.000m²</div>
      <div class="venue-details">
        <div class="venue-detail">✈️ <span>Bay thẳng đến sân bay Phú Quốc — 1 tiếng từ TP.HCM, Hà Nội</span></div>
        <div class="venue-detail">🚌 <span>Shuttle bus miễn phí từ sân bay đến khu vực lễ hội</span></div>
        <div class="venue-detail">🏨 <span>Đối tác khách sạn với ưu đãi 20% dành cho người tham dự</span></div>
        <div class="venue-detail">🅿️ <span>Bãi đỗ xe miễn phí cho 3.000 xe ô tô và 5.000 xe máy</span></div>
        <div class="venue-detail">🚑 <span>Đội y tế 24/7, khu vực cứu thương trong khuôn viên</span></div>
      </div>
    </div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Bạn cần biết gì?</h2>
  <p class="sec-sub">Mọi thắc mắc về vé, địa điểm và quy định sự kiện</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🎟️ Một vé có dùng cho cả 3 ngày không?</div><div class="faq-a">Có! Vé General, VIP và Platinum đều cho phép vào cổng cả 3 ngày (15, 16, 17/07). Bạn có thể vào ra tự do trong ngày nhưng không mang vé sang ngày hôm sau nếu rời khu vực.</div></div>
    <div class="faq-item"><div class="faq-q">👶 Trẻ em dưới 12 tuổi có phải mua vé không?</div><div class="faq-a">Trẻ em dưới 12 tuổi được vào miễn phí khi có người lớn đi kèm. Trẻ 12-17 tuổi phải mua vé General với giá học sinh. Không có dịch vụ giữ trẻ trong khuôn viên.</div></div>
    <div class="faq-item"><div class="faq-q">🌧️ Sự kiện có diễn ra khi trời mưa không?</div><div class="faq-a">Sự kiện diễn ra trong mọi điều kiện thời tiết. Khu vực Main Stage và Night Stage có mái che một phần. Chúng tôi sẽ thông báo qua app và Fanpage nếu có thay đổi lịch diễn do thời tiết cực đoan.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Chính sách hoàn vé như thế nào?</div><div class="faq-a">Hủy trước 30/06/2026: hoàn 80% giá vé. Hủy từ 01/07-10/07: hoàn 50%. Không hoàn tiền sau 11/07. Trong trường hợp ban tổ chức hủy sự kiện, hoàn 100% giá vé trong 7-10 ngày làm việc.</div></div>
    <div class="faq-item"><div class="faq-q">🎒 Được mang những gì vào sự kiện?</div><div class="faq-a">Được mang: áo mưa, chai nước trống (dưới 500ml), thuốc theo toa có toa thuốc, máy ảnh không có ống kính rời. Không được mang: đồ ăn và thức uống từ bên ngoài, vũ khí, pháo, drone, ghế cắm. Kiểm tra an ninh đầy đủ tại cổng vào.</div></div>
  </div>
</section>

<section class="tickets">
  <div class="sec-label">Mua vé</div>
  <h2 class="sec-title">Chọn vé của bạn</h2>
  <p class="sec-sub" style="color:#a78bfa">⚡ Chỉ còn 1.500 vé General · Vé VIP đã bán 90%</p>
  <div class="ticket-grid">
    <div class="tkt">
      <div class="tkt-type">GENERAL</div>
      <div class="tkt-price">499K</div>
      <div class="tkt-per">/người · 3 ngày</div>
      <div class="tkt-features">✓ Vào cổng tự do 3 ngày<br>✓ Khu khán giả đại trà<br>✓ Wifi tại khu vực chung<br>✓ Bản đồ &amp; app sự kiện</div>
      <a href="#" class="tkt-btn">Mua vé General →</a>
      <div class="tkt-note">Early bird hết 30/06 · Sau đó 699K</div>
    </div>
    <div class="tkt featured">
      <div class="tkt-type">VIP ⭐ Phổ biến</div>
      <div class="tkt-price">1.299K</div>
      <div class="tkt-per">/người · 3 ngày</div>
      <div class="tkt-features">✓ Khu VIP sân khấu chính<br>✓ Buffet đồ ăn &amp; thức uống miễn phí<br>✓ Wifi tốc độ cao riêng<br>✓ Locker lưu đồ cá nhân<br>✓ Fast-track qua cổng<br>✓ Áo thun &amp; quà lưu niệm</div>
      <a href="#" class="tkt-btn">Mua vé VIP →</a>
      <div class="tkt-note">Còn ~200 vé · Nhanh tay!</div>
    </div>
    <div class="tkt">
      <div class="tkt-type">PLATINUM</div>
      <div class="tkt-price">2.499K</div>
      <div class="tkt-per">/người · 3 ngày</div>
      <div class="tkt-features">✓ Backstage pass đầy đủ<br>✓ Gặp gỡ nghệ sĩ (Meet &amp; Greet)<br>✓ Dinner VIP với nghệ sĩ (1 buổi)<br>✓ Tất cả quyền lợi VIP<br>✓ Glamping tent 2 đêm<br>✓ Transfer riêng từ sân bay</div>
      <a href="#" class="tkt-btn">Mua vé Platinum →</a>
      <div class="tkt-note">Giới hạn 100 vé · Còn 23 vé</div>
    </div>
  </div>
  <p class="ticket-guarantee">🛡️ Vé điện tử · Bảo đảm chống giả mạo · Hỗ trợ 24/7 qua hotline</p>
</section>

<footer class="footer-ev">
  <div class="footer-inner">
    <div><div class="footer-brand">🎵 SUMMER FEST 2026</div><div class="footer-tagline">Festival âm nhạc mùa hè · Phú Quốc</div></div>
    <div class="footer-links"><a href="#">Về sự kiện</a><a href="#">Lineup</a><a href="#">Lịch trình</a><a href="#">Mua vé</a></div>
    <div class="footer-links"><a href="#">Hotline: 1900 123 456</a><a href="#">Fanpage: Summer Fest VN</a><a href="#">Email: info@summerfest.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 Summer Fest Vietnam · Ban tổ chức: Live Nation VN · Giấy phép tổ chức biểu diễn số: 2026/BVHTT-GP</div>
</body></html>`

const ARTICLE_REVIEW = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}
.container{max-width:760px;margin:0 auto;padding:48px 24px}
.breadcrumb{font-size:13px;color:#94a3b8;margin-bottom:20px}
.breadcrumb span{color:#6366f1}
.category{display:inline-flex;align-items:center;gap:6px;background:#ede9fe;color:#7c3aed;border-radius:999px;padding:4px 14px;font-size:12px;font-weight:700;margin-bottom:16px}
h1{font-size:clamp(28px,4vw,40px);font-weight:800;line-height:1.25;color:#0f172a;margin-bottom:16px}
.meta{display:flex;align-items:center;gap:16px;font-size:13px;color:#94a3b8;margin-bottom:32px;padding-bottom:32px;border-bottom:2px solid #e2e8f0;flex-wrap:wrap}
.meta-author{display:flex;align-items:center;gap:8px}
.author-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
.verdict{background:linear-gradient(135deg,#ede9fe,#faf5ff);border:2px solid #c4b5fd;border-radius:16px;padding:24px;margin-bottom:32px;display:flex;align-items:center;gap:20px}
.verdict-score{font-size:56px;font-weight:900;color:#7c3aed;line-height:1;flex-shrink:0}
.verdict-title{font-weight:700;font-size:16px;color:#4c1d95;margin-bottom:4px}
.verdict-desc{font-size:14px;color:#6b21a8;line-height:1.5}
.stars{color:#fbbf24;font-size:20px}
.product-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;display:flex;gap:24px;margin-bottom:32px;align-items:center}
.product-img{width:100px;height:100px;background:linear-gradient(135deg,#ede9fe,#c4b5fd);border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:40px}
.product-name{font-weight:700;font-size:18px;color:#0f172a;margin-bottom:4px}
.product-price{font-size:24px;font-weight:800;color:#7c3aed;margin-bottom:8px}
.product-badge{display:inline-flex;background:#dcfce7;color:#166534;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:700}
.section{margin-bottom:28px}
.section h2{font-size:22px;font-weight:700;color:#0f172a;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ede9fe}
.section p{color:#475569;line-height:1.75;margin-bottom:12px}
.pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px}
.pros,.cons{border-radius:12px;padding:20px}
.pros{background:#f0fdf4;border:1px solid #bbf7d0}
.cons{background:#fff1f2;border:1px solid #fecdd3}
.pros h3{color:#166534;font-weight:700;margin-bottom:12px}
.cons h3{color:#9f1239;font-weight:700;margin-bottom:12px}
.pros li,.cons li{font-size:14px;list-style:none;padding:4px 0;padding-left:20px;position:relative;line-height:1.5}
.pros li::before{content:'✓';position:absolute;left:0;color:#16a34a;font-weight:700}
.cons li::before{content:'✗';position:absolute;left:0;color:#dc2626}
.final-score{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-radius:16px;padding:28px;text-align:center;margin-bottom:28px}
.final-score h3{font-size:20px;margin-bottom:8px}
.final-score .big-score{font-size:64px;font-weight:900;line-height:1}
.final-score .score-sub{color:#e9d5ff;font-size:14px;margin-top:4px}
.buy-btn{display:block;background:#fff;color:#7c3aed;border-radius:12px;padding:14px;font-weight:700;text-decoration:none;margin-top:16px;font-size:16px}
</style></head>
<body>
<div class="container">
  <div class="breadcrumb">Trang chủ / <span>Review</span> / Công nghệ</div>
  <div class="category">📱 Review sản phẩm</div>
  <h1>Review iPhone 16 Pro Max: Xứng đáng với mức giá 34 triệu?</h1>
  <div class="meta">
    <div class="meta-author"><div class="author-avatar">NT</div> Nguyễn Thanh · Tech Editor</div>
    <span>📅 28/05/2026</span>
    <span>⏱️ 8 phút đọc</span>
    <span>👁️ 12.4K lượt xem</span>
  </div>
  <div class="verdict">
    <div><div class="stars">★★★★★</div><div class="verdict-score">9.2</div></div>
    <div><div class="verdict-title">Verdict: Xuất sắc — Đáng mua nếu bạn muốn camera tốt nhất</div><div class="verdict-desc">iPhone 16 Pro Max mang đến chip A18 Pro mạnh mẽ, camera 48MP cải tiến đáng kể, màn hình ProMotion 120Hz sắc nét. Đây là chiếc iPhone tốt nhất Apple từng làm — nhưng mức giá không dành cho tất cả mọi người.</div></div>
  </div>
  <div class="product-card">
    <div class="product-img">📱</div>
    <div>
      <div class="product-name">Apple iPhone 16 Pro Max 256GB</div>
      <div class="product-price">34.990.000đ</div>
      <div class="product-badge">✓ Còn hàng · Giao trong 24h</div>
    </div>
  </div>
  <div class="section">
    <h2>Thiết kế & màn hình</h2>
    <p>iPhone 16 Pro Max giữ nguyên thiết kế titanium từ thế hệ trước, nhưng kích thước màn hình tăng lên 6.9 inch — lớn nhất lịch sử iPhone. Dynamic Island nay hỗ trợ nhiều tác vụ hơn, trở nên thực sự hữu ích trong cuộc sống hàng ngày.</p>
    <p>Màn hình Super Retina XDR ProMotion 120Hz cho trải nghiệm cuộn cực kỳ mượt mà. Màu sắc chính xác, độ sáng tối đa 2.000 nits — dễ dàng đọc nội dung ngoài trời giữa trưa Sài Gòn.</p>
  </div>
  <div class="section">
    <h2>Hiệu năng & pin</h2>
    <p>Chip A18 Pro là bước nhảy vọt về hiệu năng — xử lý AI nhanh hơn 30%, đồ họa mạnh hơn 20% so với A17 Pro. Chơi game Genshin Impact ở đồ họa cao nhất mà không nóng máy sau 1 giờ.</p>
    <p>Pin 4.685 mAh cải tiến lớn: dùng cả ngày nặng (5-6 giờ màn hình bật) mà còn dư pin. Sạc nhanh 45W thực sự nhanh hơn thế hệ cũ.</p>
  </div>
  <div class="pros-cons">
    <div class="pros"><h3>👍 Ưu điểm</h3><ul><li>Camera 48MP siêu nét, quay 4K 120fps</li><li>Chip A18 Pro mạnh nhất thị trường</li><li>Pin trâu hơn hẳn thế hệ trước</li><li>Màn hình 6.9" sắc nét ProMotion 120Hz</li><li>Thiết kế titanium cao cấp, bền</li></ul></div>
    <div class="cons"><h3>👎 Nhược điểm</h3><ul><li>Giá 34 triệu là rất cao</li><li>Nặng 227g — không phù hợp tay nhỏ</li><li>Sạc tối đa vẫn 45W — chậm hơn Android</li><li>Không đi kèm adapter sạc trong hộp</li></ul></div>
  </div>
  <div class="final-score">
    <h3>Điểm tổng kết</h3>
    <div class="big-score">9.2</div>
    <div class="score-sub">Trên 10 · Xuất sắc · Recommend</div>
    <a href="#" class="buy-btn">🛒 Xem giá & mua ngay →</a>
  </div>
</div>
</body></html>`

const ARTICLE_BLOG = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
.hero-banner{background:linear-gradient(135deg,#0f172a,#1e293b);padding:72px 24px;text-align:center}
.hero-banner .cat{display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,.2);border:1px solid rgba(99,102,241,.3);color:#818cf8;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:20px}
.hero-banner h1{font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px;max-width:700px;margin-left:auto;margin-right:auto}
.hero-banner .meta{display:flex;gap:20px;justify-content:center;font-size:13px;color:#94a3b8;flex-wrap:wrap}
.content{max-width:720px;margin:0 auto;padding:56px 24px}
.intro{font-size:19px;color:#374151;line-height:1.75;margin-bottom:32px;padding:24px;background:#f8fafc;border-left:4px solid #6366f1;border-radius:0 12px 12px 0}
h2{font-size:26px;font-weight:700;color:#0f172a;margin:40px 0 16px}
p{color:#4b5563;line-height:1.8;margin-bottom:16px}
.tip-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px 24px;margin:24px 0}
.tip-box .tip-label{font-size:12px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.tip-box p{color:#1e40af;margin:0}
.numbered{counter-reset:steps;margin:16px 0 24px}
.step-item{counter-increment:steps;display:flex;align-items:flex-start;gap:16px;margin-bottom:16px}
.step-item::before{content:counter(steps);display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:8px;font-weight:700;font-size:14px;flex-shrink:0;margin-top:2px}
.step-item p{margin:0}
.quote-block{background:linear-gradient(135deg,#ede9fe,#faf5ff);border-left:4px solid #8b5cf6;border-radius:0 12px 12px 0;padding:24px 28px;margin:28px 0}
.quote-block blockquote{font-size:20px;font-style:italic;color:#4c1d95;line-height:1.6;margin-bottom:8px}
.quote-block cite{font-size:14px;color:#7c3aed;font-style:normal;font-weight:600}
.cta-box{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px;padding:32px;text-align:center;margin-top:40px}
.cta-box h3{color:#fff;font-size:22px;font-weight:700;margin-bottom:8px}
.cta-box p{color:#e0e7ff;margin-bottom:20px}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#6366f1;border-radius:12px;padding:12px 28px;font-weight:700;text-decoration:none}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:40px;padding-top:24px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:4px 12px;font-size:13px}
</style></head>
<body>
<div class="hero-banner">
  <div class="cat">💡 Hướng dẫn · AI & Marketing</div>
  <h1>7 cách dùng ChatGPT viết content marketing hiệu quả cho người không biết code</h1>
  <div class="meta"><span>👤 Trần Minh Khoa</span><span>📅 27/05/2026</span><span>⏱️ 6 phút đọc</span></div>
</div>
<div class="content">
  <p class="intro">AI đang thay đổi cách marketer sáng tạo nội dung. Nếu bạn biết cách prompt đúng, ChatGPT có thể tiết kiệm cho bạn 3-4 giờ mỗi ngày — mà chất lượng nội dung vẫn đảm bảo. Đây là 7 kỹ thuật tôi dùng hàng ngày.</p>
  <h2>1. Bắt đầu bằng Role Prompting</h2>
  <p>Thay vì hỏi thẳng, hãy giao "vai diễn" cho AI trước. Ví dụ: <em>"Bạn là copywriter 10 năm kinh nghiệm chuyên viết content cho thương hiệu làm đẹp Việt Nam..."</em></p>
  <div class="tip-box"><div class="tip-label">💡 Mẹo thực chiến</div><p>Càng mô tả chi tiết vai trò và bối cảnh, output AI càng sát với nhu cầu thực tế của bạn. Đừng tiết kiệm chữ khi viết prompt.</p></div>
  <h2>2. Cung cấp đủ context về đối tượng</h2>
  <p>AI cần biết bạn đang nói chuyện với ai. Mô tả rõ: độ tuổi, giới tính, thu nhập, nỗi đau, mong muốn của khách hàng mục tiêu.</p>
  <div class="numbered">
    <div class="step-item"><p><strong>Tuổi tác & giới tính:</strong> Phụ nữ 25-35 tuổi, có thu nhập ổn định, quan tâm làn da</p></div>
    <div class="step-item"><p><strong>Nỗi đau:</strong> Không có thời gian skincare phức tạp, sợ sản phẩm không phù hợp da</p></div>
    <div class="step-item"><p><strong>Mong muốn:</strong> Da đẹp tự nhiên, không cần make-up nhiều, sản phẩm tiện dụng</p></div>
  </div>
  <h2>3. Kỹ thuật "Few-Shot" — cho AI ví dụ mẫu</h2>
  <p>Cách nhanh nhất để AI viết đúng tone là cung cấp 2-3 ví dụ content bạn đã hài lòng. AI sẽ học tone và style từ đó để tạo ra nội dung mới tương tự.</p>
  <div class="quote-block"><blockquote>"Cung cấp ví dụ mẫu cho AI còn hiệu quả hơn viết 1.000 chữ hướng dẫn tone of voice."</blockquote><cite>— David Shapiro, AI Researcher</cite></div>
  <h2>4. Yêu cầu nhiều phiên bản để A/B test</h2>
  <p>Đừng hỏi một lần, lấy một bài. Yêu cầu AI tạo ra 5 tiêu đề khác nhau theo các hướng: gây tò mò, mạnh về số liệu, tập trung vào lợi ích, dùng ngôn ngữ khẩn cấp, và tập trung cảm xúc.</p>
  <div class="cta-box">
    <h3>Muốn tạo content nhanh hơn?</h3>
    <p>Thử AIContentBooster — AI viết landing page, bài viết và quảng cáo trong tiếng Việt, chỉnh sửa kéo thả ngay trong editor.</p>
    <a href="#">🚀 Dùng thử miễn phí →</a>
  </div>
  <div class="tags"><span class="tag">AI</span><span class="tag">ChatGPT</span><span class="tag">Content Marketing</span><span class="tag">Copywriting</span><span class="tag">Hướng dẫn</span></div>
</div>
</body></html>`

const ARTICLE_NEWS = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f1f5f9;color:#1e293b}
.press-header{background:#fff;border-bottom:3px solid #0f172a;padding:16px 24px;display:flex;align-items:center;gap:16px}
.press-logo{font-size:18px;font-weight:900;letter-spacing:-0.5px}
.press-logo span{color:#3b82f6}
.press-tag{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;border-radius:4px;padding:3px 10px;font-size:12px;font-weight:700;margin-left:auto}
.container{max-width:760px;margin:32px auto;padding:0 24px}
.news-card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.news-img-placeholder{background:linear-gradient(135deg,#0f172a,#1e3a5f);height:240px;display:flex;align-items:center;justify-content:center;font-size:64px}
.news-body{padding:32px}
.news-meta{display:flex;gap:16px;font-size:12px;color:#94a3b8;margin-bottom:12px;flex-wrap:wrap}
.news-source{font-weight:700;color:#3b82f6}
h1{font-size:clamp(24px,4vw,36px);font-weight:800;color:#0f172a;line-height:1.25;margin-bottom:16px}
.lead{font-size:17px;color:#374151;line-height:1.7;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #e2e8f0;font-weight:500}
p{color:#4b5563;line-height:1.8;margin-bottom:16px}
.key-facts{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin:24px 0}
.key-facts h3{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:12px}
.fact-item{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px}
.fact-item:last-child{border:none}
.fact-icon{font-size:18px;flex-shrink:0}
.fact-val{font-weight:700;color:#0f172a}
.fact-lbl{color:#64748b}
blockquote{background:#eff6ff;border-left:4px solid #3b82f6;padding:20px 24px;border-radius:0 8px 8px 0;margin:24px 0}
blockquote p{color:#1e40af;font-style:italic;font-size:17px;margin:0 0 8px}
blockquote cite{font-size:13px;color:#3b82f6;font-style:normal;font-weight:600}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:4px;padding:4px 10px;font-size:12px;font-weight:600}
.related{margin-top:32px}
.related h3{font-size:18px;font-weight:700;margin-bottom:16px}
.related-item{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;display:flex;gap:12px;align-items:center;margin-bottom:12px;text-decoration:none;color:inherit}
.related-emoji{font-size:28px;flex-shrink:0}
.related-title{font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px}
.related-meta{font-size:12px;color:#94a3b8}
</style></head>
<body>
<div class="press-header">
  <div class="press-logo">Tech<span>VN</span> News</div>
  <div class="press-tag">THÔNG CÁO BÁO CHÍ</div>
</div>
<div class="container">
  <div class="news-card">
    <div class="news-img-placeholder">🚀</div>
    <div class="news-body">
      <div class="news-meta"><span class="news-source">TechVN News</span><span>📅 28/05/2026</span><span>📍 Hà Nội</span></div>
      <h1>VNG Corporation ra mắt nền tảng AI tạo nội dung tiếng Việt đầu tiên, huy động 50 triệu USD Series B</h1>
      <p class="lead">VNG Corporation vừa chính thức công bố ra mắt AIViet.vn — nền tảng AI tạo nội dung hoàn toàn bằng tiếng Việt đầu tiên tại Đông Nam Á, đồng thời hoàn thành vòng gọi vốn Series B trị giá 50 triệu USD.</p>
      <div class="key-facts">
        <h3>Số liệu chính</h3>
        <div class="fact-item"><div class="fact-icon">💰</div><div><div class="fact-val">50 triệu USD</div><div class="fact-lbl">Vòng gọi vốn Series B</div></div></div>
        <div class="fact-item"><div class="fact-icon">🏢</div><div><div class="fact-val">Sequoia Capital SEA · SoftBank Vision Fund</div><div class="fact-lbl">Nhà đầu tư dẫn đầu</div></div></div>
        <div class="fact-item"><div class="fact-icon">👥</div><div><div class="fact-val">500.000+</div><div class="fact-lbl">Người dùng beta trong 3 tháng đầu</div></div></div>
        <div class="fact-item"><div class="fact-icon">🌏</div><div><div class="fact-val">Việt Nam · Thái Lan · Indonesia</div><div class="fact-lbl">Thị trường mục tiêu 2026</div></div></div>
      </div>
      <p>Theo đại diện VNG, nền tảng AIViet.vn được xây dựng trên mô hình ngôn ngữ lớn (LLM) tự phát triển, được huấn luyện riêng trên dữ liệu văn bản tiếng Việt — bao gồm văn học, báo chí, luật pháp và thương mại điện tử Việt Nam.</p>
      <blockquote><p>"Chúng tôi tin rằng AI không chỉ là công cụ của Silicon Valley. Người Việt Nam xứng đáng có AI hiểu tiếng Việt, hiểu văn hóa và hiểu thị trường Việt Nam."</p><cite>— Lê Hồng Minh, CEO VNG Corporation</cite></blockquote>
      <p>Sản phẩm sẽ ra mắt chính thức vào Q3/2026, với gói miễn phí cho cá nhân và startup, và gói doanh nghiệp từ 999.000đ/tháng.</p>
      <div class="tags"><span class="tag">AI</span><span class="tag">VNG</span><span class="tag">Startup</span><span class="tag">Đầu tư</span><span class="tag">Công nghệ</span></div>
    </div>
  </div>
  <div class="related">
    <h3>Bài viết liên quan</h3>
    <a href="#" class="related-item"><div class="related-emoji">🤖</div><div><div class="related-title">Top 10 công cụ AI tạo nội dung phổ biến nhất 2026</div><div class="related-meta">TechVN News · 25/05/2026</div></div></a>
    <a href="#" class="related-item"><div class="related-emoji">💼</div><div><div class="related-title">Startup AI Việt Nam huy động được bao nhiêu trong 2025?</div><div class="related-meta">TechVN News · 20/05/2026</div></div></a>
  </div>
</div>
</body></html>`

const ADS_FLASHSALE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#0a0a0a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ad-wrap{background:linear-gradient(135deg,#1a0000,#3b0000,#7f1d1d);border-radius:24px;overflow:hidden;max-width:680px;width:100%;position:relative}
.ad-wrap::before{content:'FLASH SALE';position:absolute;top:20px;left:-30px;background:#ef4444;color:#fff;font-size:11px;font-weight:900;letter-spacing:2px;padding:6px 40px;transform:rotate(-35deg)}
.ad-banner{padding:48px 40px;text-align:center;position:relative}
.flame{font-size:64px;display:block;margin-bottom:8px;animation:bounce .8s infinite alternate}
@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-8px)}}
.sale-pct{font-size:clamp(80px,15vw,140px);font-weight:900;line-height:1;background:linear-gradient(180deg,#fbbf24,#f59e0b,#d97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:-8px}
.sale-label{color:#fef3c7;font-size:24px;font-weight:700;margin-bottom:24px}
.countdown-row{display:flex;gap:12px;justify-content:center;margin-bottom:32px}
.cd{background:rgba(0,0,0,.4);border:1px solid rgba(251,191,36,.3);border-radius:10px;padding:12px 16px;text-align:center;min-width:70px}
.cd-n{font-size:32px;font-weight:900;color:#fbbf24}
.cd-l{font-size:11px;color:#fcd34d;text-transform:uppercase;letter-spacing:1px}
.products{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
.prd{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;text-align:center}
.prd-emoji{font-size:32px;margin-bottom:8px;display:block}
.prd-name{font-size:12px;color:#fef3c7;margin-bottom:6px;font-weight:600}
.prd-old{font-size:12px;color:#9ca3af;text-decoration:line-through}
.prd-new{font-size:18px;font-weight:800;color:#fbbf24}
.shop-btn{display:block;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a0000;border-radius:14px;padding:18px;font-size:18px;font-weight:900;text-decoration:none;letter-spacing:0.5px;text-align:center}
.fine-print{color:#9ca3af;font-size:11px;text-align:center;margin-top:12px}
</style></head>
<body>
<div class="ad-wrap">
  <div class="ad-banner">
    <span class="flame">🔥</span>
    <div class="sale-pct">70%</div>
    <div class="sale-label">FLASH SALE — KẾT THÚC TRONG</div>
    <div class="countdown-row">
      <div class="cd"><div class="cd-n">05</div><div class="cd-l">Giờ</div></div>
      <div class="cd"><div class="cd-n">30</div><div class="cd-l">Phút</div></div>
      <div class="cd"><div class="cd-n">00</div><div class="cd-l">Giây</div></div>
    </div>
    <div class="products">
      <div class="prd"><span class="prd-emoji">👗</span><div class="prd-name">Áo Công Sở</div><div class="prd-old">599K</div><div class="prd-new">179K</div></div>
      <div class="prd"><span class="prd-emoji">👠</span><div class="prd-name">Giày Cao Gót</div><div class="prd-old">899K</div><div class="prd-new">269K</div></div>
      <div class="prd"><span class="prd-emoji">👜</span><div class="prd-name">Túi Da</div><div class="prd-old">1.299K</div><div class="prd-new">389K</div></div>
    </div>
    <a href="#" class="shop-btn">🛍️ MUA NGAY — HẾT SALE LÀ HẾT GIÁ</a>
    <div class="fine-print">Freeship đơn từ 300K · Hoàn tiền 7 ngày · Hàng chính hãng 100%</div>
  </div>
</div>
</body></html>`

const ADS_COURSE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f5f3ff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;border-radius:24px;overflow:hidden;max-width:640px;width:100%;box-shadow:0 20px 60px rgba(109,40,217,.15)}
.ad-top{background:linear-gradient(135deg,#4c1d95,#6d28d9,#7c3aed);padding:40px 32px;position:relative;overflow:hidden}
.ad-top::after{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(255,255,255,.08);border-radius:50%}
.ad-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);color:#e9d5ff;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:700;margin-bottom:16px}
.ad-top h2{font-size:clamp(24px,4vw,36px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:12px;position:relative}
.ad-top p{color:#ddd6fe;font-size:15px;line-height:1.6;position:relative}
.ad-body{padding:28px 32px}
.offer-box{background:linear-gradient(135deg,#fef3c7,#fffbeb);border:2px solid #fbbf24;border-radius:16px;padding:20px 24px;text-align:center;margin-bottom:24px}
.offer-old{font-size:16px;color:#9ca3af;text-decoration:line-through}
.offer-new{font-size:48px;font-weight:900;color:#d97706}
.offer-badge{display:inline-flex;background:#fbbf24;color:#1a1a1a;border-radius:999px;padding:4px 16px;font-size:12px;font-weight:800;margin-top:4px}
.features{list-style:none;margin-bottom:24px;display:flex;flex-direction:column;gap:10px}
.features li{display:flex;align-items:center;gap:12px;font-size:14px;color:#374151}
.features li::before{content:'✓';width:22px;height:22px;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0}
.enroll-btn{display:block;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;border-radius:14px;padding:18px;text-align:center;font-size:17px;font-weight:800;text-decoration:none;margin-bottom:12px}
.guarantee{display:flex;align-items:center;gap:8px;justify-content:center;font-size:13px;color:#6b7280}
.testimonial-row{display:flex;align-items:center;gap:12px;padding:16px;background:#faf5ff;border-top:1px solid #ede9fe}
.avt{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0}
.testi-text{font-size:13px;color:#374151;flex:1;line-height:1.4}
.stars-sm{color:#fbbf24;font-size:13px}
</style></head>
<body>
<div class="ad">
  <div class="ad-top">
    <div class="ad-eyebrow">🎓 Ưu đãi đặc biệt · Chỉ còn 24 giờ</div>
    <h2>Học Lập Trình Python AI từ con số 0 — Có việc ngay sau 4 tháng</h2>
    <p>Lộ trình thực chiến: Python → Data Science → Machine Learning → Deploy model</p>
  </div>
  <div class="ad-body">
    <div class="offer-box">
      <div class="offer-old">4.990.000đ</div>
      <div class="offer-new">1.990.000đ</div>
      <div class="offer-badge">GIẢM 60% — HÔM NAY</div>
    </div>
    <ul class="features">
      <li>80+ giờ video · Bài tập thực hành mỗi module</li>
      <li>5 dự án portfolio: Chatbot AI, dự đoán giá BĐS, phân tích sentiment</li>
      <li>Hỗ trợ mentor 1-1 qua Zalo trong suốt khóa học</li>
      <li>Chứng chỉ hoàn thành được Google & doanh nghiệp công nhận</li>
      <li>Hỗ trợ tìm việc — kết nối với 50+ công ty tech đối tác</li>
    </ul>
    <a href="#" class="enroll-btn">🚀 Đăng ký học với giá 1.990.000đ →</a>
    <div class="guarantee">🛡️ Hoàn tiền 100% trong 14 ngày nếu không hài lòng</div>
  </div>
  <div class="testimonial-row">
    <div class="avt">HN</div>
    <div class="testi-text"><div class="stars-sm">★★★★★</div>"Sau 4 tháng học, mình được tuyển vào Grab làm Data Analyst — lương 18 triệu!" — Hoàng Nam</div>
  </div>
</div>
</body></html>`

const ADS_REALESTATE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;border-radius:20px;overflow:hidden;max-width:680px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.1)}
.img-area{background:linear-gradient(135deg,#0c4a6e,#0369a1,#0284c7);height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden}
.img-area::before{content:'';position:absolute;inset:0;background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="80" cy="20" r="30" fill="rgba(255,255,255,0.05)"/><circle cx="20" cy="80" r="40" fill="rgba(255,255,255,0.03)"/></svg>')}
.img-badge{position:absolute;top:16px;left:16px;background:#ef4444;color:#fff;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:700}
.img-emoji{font-size:72px;margin-bottom:12px;position:relative}
.img-title{font-size:22px;font-weight:800;color:#fff;position:relative;text-align:center;padding:0 20px}
.img-sub{color:#bae6fd;font-size:14px;position:relative;margin-top:4px}
.body{padding:28px 28px 20px}
.project-name{font-size:26px;font-weight:800;color:#0c4a6e;margin-bottom:6px}
.location{display:flex;align-items:center;gap:6px;color:#64748b;font-size:14px;margin-bottom:20px}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;padding:16px;background:#f0f9ff;border-radius:12px}
.stat{text-align:center}
.stat-val{font-size:20px;font-weight:800;color:#0369a1}
.stat-label{font-size:11px;color:#64748b;margin-top:2px}
.highlights{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.hl{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151}
.hl-dot{width:8px;height:8px;border-radius:50%;background:#0369a1;flex-shrink:0}
.price-row{display:flex;align-items:flex-end;gap:12px;margin-bottom:20px;padding:20px;background:linear-gradient(135deg,#eff6ff,#f0f9ff);border-radius:12px}
.price-from{font-size:13px;color:#64748b}
.price-main{font-size:36px;font-weight:900;color:#0c4a6e;line-height:1}
.price-unit{font-size:14px;color:#0369a1;font-weight:600;margin-bottom:4px}
.btns{display:flex;gap:12px}
.btn-main-re{flex:1;background:linear-gradient(135deg,#0369a1,#0284c7);color:#fff;border-radius:12px;padding:14px;text-align:center;font-weight:700;text-decoration:none;font-size:15px}
.btn-sec-re{background:#fff;border:2px solid #0369a1;color:#0369a1;border-radius:12px;padding:14px 20px;font-weight:700;text-decoration:none;font-size:15px;white-space:nowrap}
</style></head>
<body>
<div class="ad">
  <div class="img-area">
    <div class="img-badge">🔥 Mở bán đợt 1</div>
    <div class="img-emoji">🏙️</div>
    <div class="img-title">The Skyline Residences</div>
    <div class="img-sub">Căn hộ hạng sang · View sông Sài Gòn</div>
  </div>
  <div class="body">
    <div class="project-name">The Skyline Residences</div>
    <div class="location">📍 Quận 2, TP. Hồ Chí Minh · Tầng 18–45</div>
    <div class="stats-row">
      <div class="stat"><div class="stat-val">3</div><div class="stat-label">Tháp cao cấp</div></div>
      <div class="stat"><div class="stat-val">1.200</div><div class="stat-label">Căn hộ</div></div>
      <div class="stat"><div class="stat-val">45</div><div class="stat-label">Tầng</div></div>
      <div class="stat"><div class="stat-val">Q4/27</div><div class="stat-label">Bàn giao</div></div>
    </div>
    <div class="highlights">
      <div class="hl"><div class="hl-dot"></div>Tầm nhìn 360° sông Sài Gòn và trung tâm quận 1</div>
      <div class="hl"><div class="hl-dot"></div>Tiện ích 5★: hồ bơi vô cực, gym, clubhouse, spa</div>
      <div class="hl"><div class="hl-dot"></div>1km đến Metro số 1 · 5 phút đến sân bay</div>
      <div class="hl"><div class="hl-dot"></div>Diện tích từ 65m² đến 220m² (Studio, 1–3PN)</div>
    </div>
    <div class="price-row">
      <div><div class="price-from">Giá từ</div><div class="price-main">5,2 tỷ</div></div>
      <div class="price-unit">~ 80 triệu/m² · Thanh toán 30 tháng</div>
    </div>
    <div class="btns">
      <a href="#" class="btn-main-re">📞 Đặt lịch xem nhà mẫu</a>
      <a href="#" class="btn-sec-re">Xem thêm</a>
    </div>
  </div>
</div>
</body></html>`

const ADS_FNB = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;border-radius:24px;overflow:hidden;max-width:620px;width:100%;box-shadow:0 12px 48px rgba(234,88,12,.1)}
.ad-header{background:linear-gradient(135deg,#ea580c,#f97316,#fb923c);padding:32px 28px;position:relative;overflow:hidden;text-align:center}
.ad-header::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:rgba(255,255,255,.1);border-radius:50%}
.menu-badge{display:inline-flex;background:rgba(255,255,255,.2);color:#fff;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:16px}
.ad-header h2{font-size:clamp(26px,5vw,40px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:8px;position:relative}
.ad-header p{color:#fed7aa;font-size:15px;position:relative}
.menu-grid{padding:24px 20px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.menu-item{border:1px solid #fed7aa;border-radius:16px;overflow:hidden;background:#fff}
.menu-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:56px}
.menu-info{padding:12px 16px}
.menu-name{font-weight:700;color:#1c1917;margin-bottom:4px}
.menu-desc{font-size:12px;color:#78716c;line-height:1.4;margin-bottom:8px}
.menu-price-row{display:flex;align-items:center;justify-content:space-between}
.menu-old-price{font-size:12px;color:#9ca3af;text-decoration:line-through}
.menu-price{font-size:18px;font-weight:800;color:#ea580c}
.promo-section{padding:20px 20px 0}
.promo-box{background:linear-gradient(135deg,#fef3c7,#fffbeb);border:2px dashed #fbbf24;border-radius:16px;padding:20px;text-align:center;margin-bottom:20px}
.promo-code{font-size:28px;font-weight:900;color:#d97706;letter-spacing:2px;margin:8px 0}
.promo-desc{font-size:13px;color:#92400e}
.order-btn{display:block;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;border-radius:14px;padding:18px;text-align:center;font-size:17px;font-weight:800;text-decoration:none;margin:0 20px 20px}
.footer-row{display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;border-top:1px solid #fed7aa;font-size:13px;color:#78716c}
</style></head>
<body>
<div class="ad">
  <div class="ad-header">
    <div class="menu-badge">🍽️ Menu mùa hè 2026</div>
    <h2>Taste of<br>Summer</h2>
    <p>Món ngon mới · Ưu đãi đặc biệt · Giao trong 30 phút</p>
  </div>
  <div class="menu-grid">
    <div class="menu-item"><div class="menu-img" style="background:#fff7ed">🦞</div><div class="menu-info"><div class="menu-name">Tôm hùm nướng phô mai</div><div class="menu-desc">Tôm tươi nhập khẩu, sốt phô mai Gruyère thượng hạng</div><div class="menu-price-row"><div class="menu-old-price">480K</div><div class="menu-price">320K</div></div></div></div>
    <div class="menu-item"><div class="menu-img" style="background:#ecfdf5">🥩</div><div class="menu-info"><div class="menu-name">Bò Wagyu A5 nướng than</div><div class="menu-desc">Wagyu Nhật nguyên chất, muối hồng Himalaya</div><div class="menu-price-row"><div class="menu-old-price">650K</div><div class="menu-price">420K</div></div></div></div>
    <div class="menu-item"><div class="menu-img" style="background:#fef3c7">🍱</div><div class="menu-info"><div class="menu-name">Set cơm trưa văn phòng</div><div class="menu-desc">Cơm + 2 món + súp + tráng miệng, đổi mới mỗi ngày</div><div class="menu-price-row"><div class="menu-old-price">120K</div><div class="menu-price">79K</div></div></div></div>
    <div class="menu-item"><div class="menu-img" style="background:#f0fdf4">🍹</div><div class="menu-info"><div class="menu-name">Mocktail trái cây nhiệt đới</div><div class="menu-desc">Xoài, dứa, chanh leo — không cồn, cực giải khát</div><div class="menu-price-row"><div class="menu-old-price">80K</div><div class="menu-price">49K</div></div></div></div>
  </div>
  <div class="promo-section">
    <div class="promo-box">
      <div style="font-size:13px;color:#92400e;font-weight:700">NHẬP MÃ ĐỂ ĐƯỢC GIẢM THÊM 20%</div>
      <div class="promo-code">SUMMER20</div>
      <div class="promo-desc">Áp dụng đơn từ 200K · Đến 30/07/2026 · Dùng 1 lần/tài khoản</div>
    </div>
  </div>
  <a href="#" class="order-btn">🛵 Đặt ngay — Giao trong 30 phút</a>
  <div class="footer-row"><span>⭐ 4.9/5 (2.400+ đánh giá)</span><span>🕐 10:00–22:00</span><span>📞 1900 123 456</span></div>
</div>
</body></html>`

const LP_GYM = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#0a0a0a;color:#fff}
/* Hero */
.hero{background:linear-gradient(135deg,#0a0a0a 0%,#1c0a00 60%,#0a0a0a 100%);padding:100px 24px 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(249,115,22,.12) 0%,transparent 70%)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.4);color:#fb923c;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:28px;position:relative}
.hero h1{font-size:clamp(40px,7vw,80px);font-weight:900;line-height:1.05;margin-bottom:18px;letter-spacing:-2px;position:relative}
.hero h1 .fire{background:linear-gradient(135deg,#f97316,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#94a3b8;max-width:520px;margin:0 auto 36px;line-height:1.75;position:relative}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;position:relative}
.btn-fire{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#ea580c,#dc2626);color:#fff;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(234,88,12,.35)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:12px;padding:15px 24px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#6b7280;position:relative}
/* Stats bar */
.stats-bar{background:rgba(249,115,22,.1);border-top:1px solid rgba(249,115,22,.2);border-bottom:1px solid rgba(249,115,22,.2);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:860px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;background:linear-gradient(135deg,#f97316,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-l{font-size:12px;color:#94a3b8;margin-top:4px}
/* Programs */
.programs{padding:80px 24px}
.sec-label{color:#f97316;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;text-align:center}
.sec-title{font-size:36px;font-weight:800;text-align:center;margin-bottom:12px}
.sec-sub{text-align:center;font-size:15px;color:#94a3b8;margin-bottom:48px}
.prog-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1040px;margin:0 auto}
.prog-card{border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:32px;background:rgba(255,255,255,.03);position:relative;overflow:hidden}
.prog-card.featured{border-color:rgba(249,115,22,.4);background:rgba(249,115,22,.06)}
.prog-icon{font-size:44px;margin-bottom:16px;display:block}
.prog-title{font-size:20px;font-weight:800;margin-bottom:8px}
.prog-desc{font-size:14px;color:#94a3b8;line-height:1.65;margin-bottom:12px}
.prog-tag{display:inline-flex;background:rgba(249,115,22,.15);color:#fb923c;border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700}
/* Trainers */
.trainers{padding:80px 24px;background:rgba(255,255,255,.02);border-top:1px solid rgba(255,255,255,.06)}
.trainer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:960px;margin:0 auto}
.trainer-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:28px;text-align:center}
.trainer-avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#ea580c,#dc2626);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px}
.trainer-name{font-size:18px;font-weight:800;margin-bottom:4px}
.trainer-title{font-size:13px;color:#f97316;font-weight:600;margin-bottom:10px}
.trainer-certs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.trainer-cert{background:rgba(249,115,22,.12);color:#fb923c;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600}
/* Transformations */
.transform{padding:80px 24px}
.transform-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:960px;margin:0 auto}
.tf-card{border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden}
.tf-top{background:linear-gradient(135deg,#ea580c,#7c2d12);padding:20px;text-align:center}
.tf-result{font-size:36px;font-weight:900}
.tf-period{font-size:13px;color:#fed7aa;margin-top:4px}
.tf-body{padding:20px;background:rgba(255,255,255,.03)}
.tf-body p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
.tf-name{font-size:12px;font-weight:700;color:#fb923c}
/* Pricing */
.pricing{padding:80px 24px;text-align:center;background:rgba(255,255,255,.02)}
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:860px;margin:0 auto 28px}
.plan{border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:32px;text-align:left;background:rgba(255,255,255,.03)}
.plan.hot{border-color:rgba(249,115,22,.5);background:rgba(249,115,22,.07)}
.plan-name{font-size:13px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.plan-price{font-size:48px;font-weight:900;margin-bottom:4px}
.plan-per{font-size:13px;color:#6b7280;margin-bottom:20px}
.plan-btn{display:block;border-radius:10px;padding:13px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:18px}
.plan-btn-outline{background:transparent;border:2px solid rgba(249,115,22,.4);color:#fb923c}
.plan-btn-fire{background:linear-gradient(135deg,#ea580c,#dc2626);color:#fff}
.plan-feat{font-size:13px;color:#94a3b8;line-height:2.1}
/* FAQ */
.faq{padding:80px 24px}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:22px}
.faq-q{font-weight:700;color:#f1f5f9;margin-bottom:8px;font-size:15px}
.faq-a{font-size:14px;color:#94a3b8;line-height:1.7}
/* CTA */
.cta{padding:80px 24px;text-align:center;background:linear-gradient(135deg,#1c0a00,#0a0a0a)}
.cta h2{font-size:44px;font-weight:900;letter-spacing:-1px;margin-bottom:14px}
.cta p{color:#94a3b8;font-size:17px;margin-bottom:32px;line-height:1.6}
/* Footer */
.footer{background:#000;border-top:1px solid rgba(255,255,255,.07);padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.footer-brand{font-size:24px;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px}
.footer-brand span{color:#f97316}
.footer-tagline{font-size:13px;color:#6b7280}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#94a3b8;text-decoration:none;font-size:14px}
.footer-bottom{background:#000;border-top:1px solid rgba(255,255,255,.05);text-align:center;padding:16px 24px;font-size:12px;color:#4b5563}
</style></head>
<body>

<section class="hero">
  <div class="badge">🔥 Phòng tập chuyên nghiệp · 5.000+ hội viên tin chọn</div>
  <h1>Phá vỡ giới hạn<br><span class="fire">của chính bạn</span></h1>
  <p>Hệ thống phòng tập hiện đại nhất TP.HCM — thiết bị nhập khẩu, HLV quốc tế, chương trình cá nhân hóa theo từng mục tiêu.</p>
  <div class="hero-btns">
    <a href="#" class="btn-fire">🎯 Tập thử miễn phí 7 ngày</a>
    <a href="#" class="btn-ghost">▶ Xem tour phòng tập</a>
  </div>
  <p class="hero-note">Không ràng buộc · Hủy bất cứ lúc nào · 3 cơ sở tại TP.HCM</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">5K+</div><div class="stat-l">Hội viên đang tập</div></div>
    <div><div class="stat-n">25+</div><div class="stat-l">HLV có chứng chỉ</div></div>
    <div><div class="stat-n">200+</div><div class="stat-l">Thiết bị hiện đại</div></div>
    <div><div class="stat-n">3</div><div class="stat-l">Cơ sở TP.HCM</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Đánh giá Google</div></div>
  </div>
</div>

<section class="programs">
  <div class="sec-label">Chương trình tập luyện</div>
  <h2 class="sec-title">Phù hợp với mọi mục tiêu</h2>
  <p class="sec-sub">Từ người mới bắt đầu đến vận động viên chuyên nghiệp — chúng tôi có chương trình riêng cho bạn</p>
  <div class="prog-grid">
    <div class="prog-card featured"><span class="prog-icon">💪</span><div class="prog-title">Strength Training</div><div class="prog-desc">Xây dựng cơ bắp và sức mạnh với chương trình tập cá nhân hóa. Thiết bị Power Rack, Olympic Bar, Dumbell đến 60kg.</div><span class="prog-tag">Mọi cấp độ</span></div>
    <div class="prog-card"><span class="prog-icon">🔥</span><div class="prog-title">HIIT & Cardio Burn</div><div class="prog-desc">Đốt mỡ tối đa trong thời gian ngắn nhất. Lớp học nhóm 45 phút với nhạc sôi động, HLV năng lượng cao.</div><span class="prog-tag">Giảm cân nhanh</span></div>
    <div class="prog-card"><span class="prog-icon">🥊</span><div class="prog-title">Muay Thai & Boxing</div><div class="prog-desc">Học võ thực chiến với HLV vô địch quốc gia. Rèn luyện thể lực, kỷ luật và kỹ năng tự vệ thực tế.</div><span class="prog-tag">Võ thuật</span></div>
    <div class="prog-card"><span class="prog-icon">🧘</span><div class="prog-title">Yoga & Pilates</div><div class="prog-desc">Phòng studio riêng 50m² chuyên yoga và pilates. Lớp học buổi sáng từ 6:00 và buổi tối đến 21:00.</div><span class="prog-tag">Thư giãn & dẻo dai</span></div>
    <div class="prog-card"><span class="prog-icon">🚴</span><div class="prog-title">Cycling Studio</div><div class="prog-desc">30 xe đạp Technogym nhập khẩu Ý, màn hình theo dõi nhịp tim, lớp Spin class với DJ set trực tiếp.</div><span class="prog-tag">Cardio vui nhộn</span></div>
    <div class="prog-card"><span class="prog-icon">🏊</span><div class="prog-title">Bơi lội & Aqua Fitness</div><div class="prog-desc">Hồ bơi 25m tiêu chuẩn, nước sạch khử khuẩn UV. Lớp học bơi từ cơ bản đến nâng cao và Aqua Zumba.</div><span class="prog-tag">Toàn thân</span></div>
  </div>
</section>

<section class="trainers">
  <div class="sec-label">Đội ngũ huấn luyện viên</div>
  <h2 class="sec-title">Học từ những chuyên gia tốt nhất</h2>
  <p class="sec-sub">100% HLV có chứng chỉ quốc tế và ít nhất 5 năm kinh nghiệm</p>
  <div class="trainer-grid">
    <div class="trainer-card"><div class="trainer-avatar">💪</div><div class="trainer-name">Trần Văn Khoa</div><div class="trainer-title">Head Strength Coach</div><div class="trainer-certs"><span class="trainer-cert">NSCA-CSCS</span><span class="trainer-cert">10 năm KN</span><span class="trainer-cert">Ex-Athlete</span></div></div>
    <div class="trainer-card"><div class="trainer-avatar">🔥</div><div class="trainer-name">Lê Thị Lan Anh</div><div class="trainer-title">HIIT & Nutrition Specialist</div><div class="trainer-certs"><span class="trainer-cert">ACE-CPT</span><span class="trainer-cert">8 năm KN</span><span class="trainer-cert">Dinh dưỡng</span></div></div>
    <div class="trainer-card"><div class="trainer-avatar">🥊</div><div class="trainer-name">Nguyễn Minh Dũng</div><div class="trainer-title">Muay Thai Head Coach</div><div class="trainer-certs"><span class="trainer-cert">Vô địch SEA 2020</span><span class="trainer-cert">12 năm KN</span></div></div>
    <div class="trainer-card"><div class="trainer-avatar">🧘</div><div class="trainer-name">Phạm Thu Hà</div><div class="trainer-title">Yoga & Pilates Master</div><div class="trainer-certs"><span class="trainer-cert">RYT-500</span><span class="trainer-cert">Pilates Mat</span><span class="trainer-cert">7 năm KN</span></div></div>
  </div>
</section>

<section class="transform">
  <div class="sec-label">Kết quả thực tế</div>
  <h2 class="sec-title">Hội viên đã thay đổi như thế nào</h2>
  <p class="sec-sub">Không phủ chỉnh — đây là kết quả thật từ hội viên thật của chúng tôi</p>
  <div class="transform-grid">
    <div class="tf-card"><div class="tf-top"><div class="tf-result">-18kg</div><div class="tf-period">trong 4 tháng</div></div><div class="tf-body"><p>"Từ 95kg xuống 77kg sau 4 tháng tập HIIT kết hợp PT 3 buổi/tuần. Chưa bao giờ tôi cảm thấy tự tin về cơ thể mình đến vậy."</p><div class="tf-name">Nguyễn Thanh Bình, 32 tuổi</div></div></div>
    <div class="tf-card"><div class="tf-top"><div class="tf-result">+12kg cơ</div><div class="tf-period">trong 6 tháng</div></div><div class="tf-body"><p>"Tập Strength Training theo chương trình của coach Khoa. Tăng 12kg cơ, bench press từ 60kg lên 100kg. Người thay đổi hoàn toàn!"</p><div class="tf-name">Lê Hoàng Nam, 27 tuổi</div></div></div>
    <div class="tf-card"><div class="tf-top"><div class="tf-result">Run 10K</div><div class="tf-period">chỉ sau 8 tuần</div></div><div class="tf-body"><p>"Trước đây chạy 1km đã thở hổn hển. Sau 8 tuần tập cardio và HIIT, tôi hoàn thành 10km đầu tiên trong đời tại VD-Run Hà Nội."</p><div class="tf-name">Trần Minh Châu, 29 tuổi</div></div></div>
    <div class="tf-card"><div class="tf-top"><div class="tf-result">-30% body fat</div><div class="tf-period">trong 3 tháng</div></div><div class="tf-body"><p>"Kết hợp Yoga, HIIT và tư vấn dinh dưỡng. Body fat từ 34% xuống 24% mà không cần nhịn ăn, năng lượng tràn đầy cả ngày."</p><div class="tf-name">Phạm Ngọc Ánh, 35 tuổi</div></div></div>
  </div>
</section>

<section class="pricing">
  <div class="sec-label">Gói hội viên</div>
  <h2 class="sec-title">Đầu tư vào sức khoẻ của bạn</h2>
  <p class="sec-sub">Tất cả gói đều bao gồm: thiết bị không giới hạn · phòng xông hơi · hồ bơi · lớp học nhóm</p>
  <div class="plan-grid">
    <div class="plan">
      <div class="plan-name">1 tháng</div>
      <div class="plan-price">699K</div>
      <div class="plan-per">/tháng · Linh hoạt nhất</div>
      <a href="#" class="plan-btn plan-btn-outline">Đăng ký ngay →</a>
      <div class="plan-feat">✓ Vào tập không giới hạn<br>✓ Tất cả thiết bị & lớp học nhóm<br>✓ Hồ bơi & phòng xông hơi<br>✓ Tư vấn dinh dưỡng 1 lần</div>
    </div>
    <div class="plan hot">
      <div class="plan-name">3 tháng ⭐ Phổ biến</div>
      <div class="plan-price">549K</div>
      <div class="plan-per">/tháng · Tiết kiệm 21%</div>
      <a href="#" class="plan-btn plan-btn-fire">Đăng ký 3 tháng →</a>
      <div class="plan-feat">✓ Tất cả quyền lợi 1 tháng<br>✓ 3 buổi PT miễn phí với HLV<br>✓ Đánh giá thể lực định kỳ<br>✓ Tủ locker riêng</div>
    </div>
    <div class="plan">
      <div class="plan-name">12 tháng</div>
      <div class="plan-price">399K</div>
      <div class="plan-per">/tháng · Tiết kiệm 43%</div>
      <a href="#" class="plan-btn plan-btn-outline">Đăng ký 1 năm →</a>
      <div class="plan-feat">✓ Tất cả quyền lợi 3 tháng<br>✓ 10 buổi PT miễn phí<br>✓ Chương trình dinh dưỡng cá nhân<br>✓ Đổi cơ sở tự do</div>
    </div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Bạn muốn biết gì?</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🕐 Giờ mở cửa như thế nào?</div><div class="faq-a">Phòng tập mở cửa từ 5:30 đến 23:00 tất cả các ngày trong tuần kể cả Chủ nhật và ngày lễ. Lớp học nhóm từ 6:00 đến 21:00, cố vấn đặt lịch qua app trước 2 giờ.</div></div>
    <div class="faq-item"><div class="faq-q">🎯 Người hoàn toàn mới bắt đầu từ đâu?</div><div class="faq-a">Đăng ký gói tập thử 7 ngày miễn phí. Ngày đầu tiên HLV sẽ đánh giá thể lực và tư vấn chương trình phù hợp với mục tiêu của bạn — giảm cân, tăng cơ hay nâng cao sức bền.</div></div>
    <div class="faq-item"><div class="faq-q">👗 Cần chuẩn bị gì khi đến tập?</div><div class="faq-a">Chỉ cần giày thể thao và trang phục thoải mái. Phòng tập cung cấp: khăn tắm, tủ khoá, nước uống tại quầy, phòng thay đồ và tủ locker cá nhân (có phí đặt tháng).</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Có thể đổi hoặc hoàn phí hội viên không?</div><div class="faq-a">Trong 7 ngày đầu, hoàn 100% phí nếu không hài lòng. Đóng băng thẻ tối đa 2 tháng/năm khi bận việc hoặc đi công tác. Chuyển nhượng thẻ cho người thân trong gia đình miễn phí.</div></div>
  </div>
</section>

<section class="cta">
  <h2>Tập thử <span style="background:linear-gradient(135deg,#f97316,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent">7 ngày miễn phí</span></h2>
  <p>Không cần cam kết. Không cần thẻ tín dụng. Chỉ cần ý chí thay đổi.</p>
  <a href="#" class="btn-fire" style="display:inline-flex;margin:0 auto">🔥 Đăng ký tập thử ngay →</a>
  <p style="margin-top:14px;font-size:13px;color:#6b7280">Phản hồi trong 2 giờ · HLV tư vấn 1-1 buổi đầu tiên</p>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">⚡ Iron<span>X</span> Gym</div><div class="footer-tagline">Phòng tập chuyên nghiệp tại TP.HCM</div></div>
    <div class="footer-links"><a href="#">Chương trình tập</a><a href="#">Đội ngũ HLV</a><a href="#">Gói hội viên</a><a href="#">Đặt lịch</a></div>
    <div class="footer-links"><a href="#">Cơ sở 1: Q.1 · 028 1234 5678</a><a href="#">Cơ sở 2: Q.7 · 028 8765 4321</a><a href="#">Cơ sở 3: Bình Thạnh</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 IronX Gym · Giấy phép kinh doanh: 0312345678 · Thành phố Hồ Chí Minh</div>
</body></html>`

const LP_TRAVEL = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a}
/* Hero */
.hero{background:linear-gradient(150deg,#0c4a6e 0%,#0284c7 50%,#0891b2 100%);padding:96px 24px 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;bottom:0;left:0;right:0;height:80px;background:linear-gradient(to top,#fff,transparent)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;margin-bottom:28px}
.hero h1{font-size:clamp(36px,6vw,68px);font-weight:900;color:#fff;line-height:1.1;margin-bottom:16px;letter-spacing:-1px}
.hero h1 em{color:#7dd3fc;font-style:normal}
.hero p{font-size:18px;color:#bae6fd;max-width:560px;margin:0 auto 40px;line-height:1.75}
/* Search bar */
.search-bar{background:#fff;border-radius:18px;padding:16px 20px;max-width:700px;margin:0 auto 16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;box-shadow:0 20px 60px rgba(0,0,0,.15)}
.search-field{display:flex;flex-direction:column;flex:1;min-width:140px}
.search-label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.search-val{font-size:15px;font-weight:600;color:#0c4a6e}
.search-divider{width:1px;height:40px;background:#e2e8f0}
.search-btn{background:linear-gradient(135deg,#0284c7,#0891b2);color:#fff;border:none;border-radius:12px;padding:13px 24px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.hero-note{font-size:13px;color:#bae6fd;margin-top:8px}
/* Stats bar */
.stats-bar{background:#0c4a6e;padding:24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:860px;margin:0 auto;text-align:center}
.stat-n{font-size:34px;font-weight:900;color:#7dd3fc}
.stat-l{font-size:12px;color:#bae6fd;margin-top:4px}
/* Tours */
.tours{padding:80px 24px;background:#fff}
.sec-title{text-align:center;font-size:34px;font-weight:800;color:#0c4a6e;margin-bottom:12px}
.sec-sub{text-align:center;font-size:15px;color:#888;margin-bottom:48px}
.tour-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;max-width:1000px;margin:0 auto}
.tour-card{border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,.06)}
.tour-img{height:200px;display:flex;align-items:center;justify-content:center;font-size:64px;position:relative}
.tour-badge{position:absolute;top:12px;left:12px;background:#ef4444;color:#fff;border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700}
.tour-info{padding:20px}
.tour-location{font-size:12px;color:#0284c7;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.tour-name{font-size:18px;font-weight:800;color:#0c4a6e;margin-bottom:8px;line-height:1.3}
.tour-meta{display:flex;gap:12px;font-size:13px;color:#64748b;margin-bottom:12px;flex-wrap:wrap}
.tour-price-row{display:flex;align-items:center;justify-content:space-between}
.tour-from{font-size:12px;color:#94a3b8}
.tour-price{font-size:26px;font-weight:900;color:#0284c7}
.tour-btn{background:linear-gradient(135deg,#0284c7,#0891b2);color:#fff;border-radius:10px;padding:10px 18px;font-size:13px;font-weight:700;text-decoration:none}
/* Why */
.why{padding:80px 24px;background:#f0f9ff}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:960px;margin:0 auto}
.why-card{background:#fff;border:1px solid #bae6fd;border-radius:16px;padding:28px;text-align:center}
.why-icon{font-size:44px;margin-bottom:14px;display:block}
.why-title{font-size:17px;font-weight:700;color:#0c4a6e;margin-bottom:8px}
.why-desc{font-size:14px;color:#475569;line-height:1.65}
/* Process */
.process{padding:80px 24px;background:#fff}
.process-steps{display:flex;flex-direction:column;gap:0;max-width:640px;margin:0 auto}
.proc-step{display:flex;gap:24px;padding:24px 0;border-bottom:1px dashed #bae6fd}
.proc-step:last-child{border:none}
.proc-num{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#0891b2);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.proc-title{font-size:17px;font-weight:700;color:#0c4a6e;margin-bottom:6px}
.proc-desc{font-size:14px;color:#475569;line-height:1.65}
/* Testimonials */
.testi{padding:80px 24px;background:linear-gradient(135deg,#0c4a6e,#0284c7)}
.testi .sec-title{color:#fff;margin-bottom:8px}
.testi .sec-sub{color:#7dd3fc;margin-bottom:48px}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:960px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:26px}
.testi-stars{color:#fbbf24;margin-bottom:10px}
.testi-quote{font-size:14px;color:#e0f2fe;font-style:italic;line-height:1.7;margin-bottom:14px}
.testi-author{display:flex;gap:10px;align-items:center}
.testi-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0;font-size:14px}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-tour{font-size:12px;color:#7dd3fc}
/* FAQ */
.faq{padding:80px 24px;background:#f0f9ff}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1px solid #bae6fd;border-radius:14px;padding:22px}
.faq-q{font-weight:700;color:#0c4a6e;margin-bottom:8px;font-size:15px}
.faq-a{font-size:14px;color:#475569;line-height:1.7}
/* CTA */
.cta-sec{padding:80px 24px;background:#fff;text-align:center}
.cta-sec h2{font-size:40px;font-weight:800;color:#0c4a6e;margin-bottom:12px}
.cta-sec p{font-size:17px;color:#475569;margin-bottom:32px;line-height:1.6}
.btn-travel{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0284c7,#0891b2);color:#fff;border-radius:14px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(2,132,199,.3)}
/* Footer */
.footer{background:#0c4a6e;color:#bae6fd;padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:6px}
.footer-tagline{font-size:13px;opacity:.7}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#7dd3fc;text-decoration:none;font-size:14px}
.footer-bottom{background:#082f49;text-align:center;padding:16px;font-size:12px;color:#7dd3fc;opacity:.8}
</style></head>
<body>

<section class="hero">
  <div class="badge">✈️ Công ty du lịch uy tín #1 Việt Nam · Giấy phép số 01-123/2022</div>
  <h1>Khám phá thế giới<br><em>theo cách của bạn</em></h1>
  <p>Tour trọn gói chất lượng cao — từ Phú Quốc, Đà Lạt đến Nhật Bản, Châu Âu. Mỗi hành trình là một câu chuyện riêng.</p>
  <div class="search-bar">
    <div class="search-field"><div class="search-label">🗺️ Điểm đến</div><div class="search-val">Tất cả điểm đến</div></div>
    <div class="search-divider"></div>
    <div class="search-field"><div class="search-label">📅 Ngày khởi hành</div><div class="search-val">Chọn ngày</div></div>
    <div class="search-divider"></div>
    <div class="search-field"><div class="search-label">👥 Số người</div><div class="search-val">2 người lớn</div></div>
    <a href="#" class="search-btn">🔍 Tìm tour</a>
  </div>
  <p class="hero-note">Tư vấn miễn phí · Đặt chỗ giữ bằng 10% · Hoàn tiền 100% nếu hủy trước 30 ngày</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">80K+</div><div class="stat-l">Khách đã đi tour</div></div>
    <div><div class="stat-n">45</div><div class="stat-l">Điểm đến trong nước</div></div>
    <div><div class="stat-n">30+</div><div class="stat-l">Quốc gia quốc tế</div></div>
    <div><div class="stat-n">4.8★</div><div class="stat-l">Đánh giá Google</div></div>
    <div><div class="stat-n">15 năm</div><div class="stat-l">Kinh nghiệm hoạt động</div></div>
  </div>
</div>

<section class="tours">
  <h2 class="sec-title">Tour nổi bật tháng này</h2>
  <p class="sec-sub">Lịch khởi hành cố định mỗi tuần — đặt chỗ ngay trước khi hết</p>
  <div class="tour-grid">
    <div class="tour-card"><div class="tour-img" style="background:linear-gradient(135deg,#0891b2,#06b6d4)">🏝️<div class="tour-badge">HOT</div></div><div class="tour-info"><div class="tour-location">📍 Kiên Giang</div><div class="tour-name">Phú Quốc 4 ngày 3 đêm — Khám phá Bắc đảo</div><div class="tour-meta"><span>⏱ 4N3Đ</span><span>👥 Min 10 người</span><span>🍽 Full board</span></div><div class="tour-price-row"><div><div class="tour-from">Từ</div><div class="tour-price">3.990K</div></div><a href="#" class="tour-btn">Đặt ngay →</a></div></div></div>
    <div class="tour-card"><div class="tour-img" style="background:linear-gradient(135deg,#4338ca,#7c3aed)">⛩️<div class="tour-badge">BESTSELLER</div></div><div class="tour-info"><div class="tour-location">📍 Nhật Bản</div><div class="tour-name">Tokyo – Osaka – Kyoto 7 ngày — Mùa hoa anh đào</div><div class="tour-meta"><span>⏱ 7N6Đ</span><span>👥 Min 15 người</span><span>✈️ Bay thẳng</span></div><div class="tour-price-row"><div><div class="tour-from">Từ</div><div class="tour-price">24.990K</div></div><a href="#" class="tour-btn">Đặt ngay →</a></div></div></div>
    <div class="tour-card"><div class="tour-img" style="background:linear-gradient(135deg,#065f46,#059669)">🌿</div><div class="tour-info"><div class="tour-location">📍 Lâm Đồng</div><div class="tour-name">Đà Lạt 3 ngày — Vườn hoa mùa hè & cà phê chill</div><div class="tour-meta"><span>⏱ 3N2Đ</span><span>👥 Min 8 người</span><span>🏨 4★ Hotel</span></div><div class="tour-price-row"><div><div class="tour-from">Từ</div><div class="tour-price">2.490K</div></div><a href="#" class="tour-btn">Đặt ngay →</a></div></div></div>
  </div>
</section>

<section class="why">
  <h2 class="sec-title">Tại sao chọn VietTravel?</h2>
  <p class="sec-sub">15 năm kinh nghiệm — chúng tôi biết điều gì làm nên một chuyến đi hoàn hảo</p>
  <div class="why-grid">
    <div class="why-card"><span class="why-icon">🛡️</span><div class="why-title">Bảo đảm giá tốt nhất</div><div class="why-desc">Tìm thấy giá rẻ hơn ở đâu, chúng tôi cam kết hoàn lại phần chênh lệch + thêm 5% chiết khấu chuyến sau.</div></div>
    <div class="why-card"><span class="why-icon">🎯</span><div class="why-title">Tour đúng như mô tả</div><div class="why-desc">Mọi khách sạn, điểm tham quan và dịch vụ đều đúng như tư vấn. Không phát sinh chi phí ẩn, không "tour 0 đồng" dẫn shop.</div></div>
    <div class="why-card"><span class="why-icon">👨‍✈️</span><div class="why-title">Hướng dẫn viên chuyên nghiệp</div><div class="why-desc">HDV có bằng cấp quốc gia, thành thạo ngoại ngữ và am hiểu sâu về từng điểm đến. Luôn sẵn sàng 24/7 trong suốt hành trình.</div></div>
    <div class="why-card"><span class="why-icon">🔄</span><div class="why-title">Hủy linh hoạt</div><div class="why-desc">Hủy trước 30 ngày hoàn 100%. Hủy trước 15 ngày hoàn 70%. Có thể đổi ngày 1 lần miễn phí nếu còn slot.</div></div>
  </div>
</section>

<section class="process">
  <h2 class="sec-title" style="text-align:center;margin-bottom:12px">Đặt tour đơn giản trong 4 bước</h2>
  <p class="sec-sub">Từ tư vấn đến lên máy bay — chúng tôi lo tất cả</p>
  <div class="process-steps">
    <div class="proc-step"><div class="proc-num">1</div><div><div class="proc-title">Tư vấn & chọn tour</div><div class="proc-desc">Liên hệ qua hotline, Zalo hoặc website. Chuyên viên tư vấn lộ trình phù hợp với ngân sách và sở thích của bạn.</div></div></div>
    <div class="proc-step"><div class="proc-num">2</div><div><div class="proc-title">Đặt chỗ & thanh toán cọc</div><div class="proc-desc">Giữ chỗ bằng 10% tổng giá trị tour. Thanh toán số còn lại 15 ngày trước ngày khởi hành qua chuyển khoản hoặc thẻ.</div></div></div>
    <div class="proc-step"><div class="proc-num">3</div><div><div class="proc-title">Chuẩn bị hành trình</div><div class="proc-desc">Nhận lịch trình chi tiết, danh sách hành lý và thông tin liên hệ HDV qua email và Zalo 7 ngày trước khi đi.</div></div></div>
    <div class="proc-step"><div class="proc-num">4</div><div><div class="proc-title">Lên đường & tận hưởng</div><div class="proc-desc">HDV đón bạn tại điểm hẹn. Tất cả dịch vụ đã được sắp xếp — bạn chỉ việc tận hưởng chuyến đi của mình.</div></div></div>
  </div>
</section>

<section class="testi">
  <h2 class="sec-title">Khách hàng nói gì về chúng tôi</h2>
  <p class="sec-sub">80.000+ hành khách đã tin tưởng trong 15 năm hoạt động</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Tour Nhật 7 ngày vượt mong đợi hoàn toàn. HDV Minh Trí nói tiếng Nhật rất tốt, lịch trình hợp lý không bị nhồi nhét, khách sạn đúng như hình. Năm sau sẽ book tour Châu Âu ngay."</p><div class="testi-author"><div class="testi-avatar">TL</div><div><div class="testi-name">Thùy Linh, 34 tuổi</div><div class="testi-tour">Tour Tokyo – Osaka – Kyoto 7N</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Đặt tour Phú Quốc cho gia đình 6 người (có 2 trẻ nhỏ). Đội ngũ hỗ trợ rất tận tình, phòng đúng tầng cao view biển như yêu cầu, xe đón đúng giờ. Trẻ em được chăm sóc đặc biệt."</p><div class="testi-author"><div class="testi-avatar">HM</div><div><div class="testi-name">Hoàng Minh, 40 tuổi</div><div class="testi-tour">Tour Phú Quốc gia đình 4N3Đ</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Hủy tour gấp vì công việc, được hoàn 100% tiền đặt cọc trong 2 ngày làm việc. Hiếm có công ty du lịch nào làm đúng cam kết như VietTravel. Chắc chắn sẽ quay lại."</p><div class="testi-author"><div class="testi-avatar">NA</div><div><div class="testi-name">Ngọc Ánh, 28 tuổi</div><div class="testi-tour">Khách hàng thân thiết 3 năm</div></div></div></div>
  </div>
</section>

<section class="faq">
  <h2 class="sec-title">Câu hỏi thường gặp</h2>
  <p class="sec-sub">Mọi thứ bạn cần biết trước khi đặt tour</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">💳 Thanh toán như thế nào, có trả góp không?</div><div class="faq-a">Nhận thanh toán qua chuyển khoản ngân hàng, VNPay, MoMo và thẻ tín dụng. Hỗ trợ trả góp 0% qua thẻ tín dụng Visa/Mastercard cho tour từ 10 triệu đồng. Đặt cọc tối thiểu 10% để giữ chỗ.</div></div>
    <div class="faq-item"><div class="faq-q">🛂 Đi tour nước ngoài cần chuẩn bị gì?</div><div class="faq-a">Hộ chiếu còn hạn tối thiểu 6 tháng. VietTravel hỗ trợ làm visa toàn bộ các quốc gia trong gói tour — chi phí visa đã bao gồm hoặc ghi rõ trong báo giá. Bạn chỉ cần cung cấp hồ sơ theo hướng dẫn.</div></div>
    <div class="faq-item"><div class="faq-q">👶 Tour có phù hợp cho trẻ nhỏ và người cao tuổi không?</div><div class="faq-a">Đa số tour đều phù hợp cho mọi lứa tuổi. Một số tour có ghi chú mức độ vận động — chúng tôi sẽ tư vấn cụ thể theo nhu cầu gia đình. Trẻ dưới 2 tuổi miễn phí, 2-11 tuổi giá trẻ em 70-80% giá người lớn.</div></div>
    <div class="faq-item"><div class="faq-q">🌧️ Thời tiết xấu có được đổi lịch không?</div><div class="faq-a">Nếu điểm đến có cảnh báo thiên tai hoặc bão, chúng tôi sẽ chủ động thông báo và đổi lịch miễn phí. Trường hợp phát sinh do thời tiết trong hành trình, HDV sẽ điều chỉnh lịch trình phù hợp để đảm bảo an toàn.</div></div>
  </div>
</section>

<section class="cta-sec">
  <h2>Chuyến đi mơ ước của bạn<br>chỉ cách một cuộc gọi</h2>
  <p>Tư vấn lộ trình miễn phí · Báo giá trong 30 phút · Đặt chỗ linh hoạt</p>
  <a href="#" class="btn-travel">✈️ Tư vấn tour miễn phí ngay →</a>
  <p style="margin-top:14px;font-size:13px;color:#64748b">Hotline: 1900 1234 · Zalo: 0901 234 567 · Làm việc 7:30–21:00 hàng ngày</p>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">✈️ VietTravel</div><div class="footer-tagline">Hành trình của bạn, trách nhiệm của chúng tôi</div></div>
    <div class="footer-links"><a href="#">Tour trong nước</a><a href="#">Tour nước ngoài</a><a href="#">Tour MICE</a><a href="#">Visa & hộ chiếu</a></div>
    <div class="footer-links"><a href="#">Hotline: 1900 1234</a><a href="#">Zalo: 0901 234 567</a><a href="#">booking@viettravel.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 VietTravel · Giấy phép lữ hành quốc tế số 01-123/TCDL-GP LHQT · Hội viên PATA & ASTA</div>
</body></html>`

const ARTICLE_LISTICLE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
/* Header */
.hero-banner{background:linear-gradient(135deg,#1e293b,#334155);padding:64px 24px;text-align:center}
.cat-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(251,191,36,.15);border:1px solid rgba(251,191,36,.3);color:#fbbf24;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:18px}
.hero-banner h1{font-size:clamp(26px,4vw,44px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:14px;max-width:700px;margin-left:auto;margin-right:auto}
.hero-meta{display:flex;gap:20px;justify-content:center;font-size:13px;color:#94a3b8;flex-wrap:wrap}
/* Content */
.content{max-width:740px;margin:0 auto;padding:52px 24px}
.lead{font-size:18px;color:#374151;line-height:1.8;margin-bottom:36px;padding:20px 24px;background:#f8fafc;border-left:4px solid #fbbf24;border-radius:0 12px 12px 0}
/* List items */
.list-item{display:flex;gap:24px;padding:28px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start}
.list-item:last-of-type{border-bottom:none}
.item-num{width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1a1a;font-size:28px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.item-content{flex:1}
.item-title{font-size:20px;font-weight:800;color:#0f172a;margin-bottom:8px;line-height:1.3}
.item-body{font-size:15px;color:#475569;line-height:1.75;margin-bottom:10px}
.item-tip{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e;display:flex;gap:8px;align-items:flex-start}
.item-tip-label{font-weight:700;white-space:nowrap}
.item-tag{display:inline-flex;background:#fef3c7;color:#b45309;border-radius:999px;padding:3px 11px;font-size:12px;font-weight:700}
/* Call-out box */
.callout{background:linear-gradient(135deg,#fef3c7,#fffbeb);border:2px solid #fbbf24;border-radius:14px;padding:24px;margin:32px 0}
.callout h3{font-size:16px;font-weight:700;color:#92400e;margin-bottom:8px}
.callout p{font-size:14px;color:#92400e;line-height:1.65}
/* CTA */
.cta-box{background:linear-gradient(135deg,#1e293b,#334155);border-radius:18px;padding:36px;text-align:center;margin-top:44px}
.cta-box h3{color:#fff;font-size:24px;font-weight:800;margin-bottom:10px}
.cta-box p{color:#94a3b8;font-size:15px;margin-bottom:22px;line-height:1.6}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1a1a;border-radius:12px;padding:14px 28px;font-weight:800;text-decoration:none;font-size:15px}
/* Share & tags */
.article-footer{margin-top:40px;padding-top:28px;border-top:2px solid #f1f5f9}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:5px 12px;font-size:13px;font-weight:600}
.share-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.share-label{font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px}
.share-btn{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;color:#374151;text-decoration:none}
</style></head>
<body>

<div class="hero-banner">
  <div class="cat-badge">⭐ Tổng hợp · Kinh doanh online</div>
  <h1>10 chiến lược tăng doanh thu Shopee hiệu quả nhất 2026 — đã kiểm chứng</h1>
  <div class="hero-meta"><span>👤 Lê Quốc Bảo · Growth Strategist</span><span>📅 28/05/2026</span><span>⏱ 10 phút đọc</span><span>👁 34.7K lượt xem</span></div>
</div>

<div class="content">
  <p class="lead">Bán hàng Shopee ngày càng cạnh tranh — nhưng những shop tăng trưởng mạnh nhất 2026 đều đang dùng những chiến lược này. Tôi đã phân tích 50 shop triệu đơn và đúc kết 10 điểm chung quan trọng nhất.</p>

  <div class="list-item">
    <div class="item-num">1</div>
    <div class="item-content">
      <div class="item-title">Tối ưu hình ảnh sản phẩm theo tiêu chuẩn Shopee 2026</div>
      <div class="item-body">Hình ảnh là yếu tố quyết định click-through rate. Shopee hiện ưu tiên hiển thị listing có ảnh nền trắng, độ phân giải tối thiểu 500x500px và video sản phẩm 30-60 giây. Các shop có video chuyển đổi cao hơn 40% so với chỉ có ảnh tĩnh.</div>
      <div class="item-tip"><span class="item-tip-label">💡 Mẹo:</span><span>Dùng AI tạo background trắng miễn phí tại remove.bg. Video sản phẩm quay bằng điện thoại 9:16 là đủ — không cần studio.</span></div>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">2</div>
    <div class="item-content">
      <div class="item-title">Đặt tên sản phẩm đúng công thức SEO nội bộ Shopee</div>
      <div class="item-body">Tên sản phẩm cần theo format: [Từ khóa chính] + [Thương hiệu/xuất xứ] + [Đặc điểm nổi bật] + [Màu sắc/size]. Tối đa 120 ký tự, đặt từ khóa quan trọng nhất ở đầu tiêu đề. Tránh viết hoa toàn bộ hoặc lạm dụng ký tự đặc biệt.</div>
      <div class="item-tip"><span class="item-tip-label">🔑 Ví dụ:</span><span>"Áo thun nam basic cotton 100% Việt Nam chống nhăn form rộng oversize M-XL" — cấu trúc này tăng 60% lượt tìm kiếm tự nhiên.</span></div>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">3</div>
    <div class="item-content">
      <div class="item-title">Tận dụng Flash Sale & Shopee Voucher đúng thời điểm</div>
      <div class="item-body">Đăng ký Flash Sale Shopee vào khung giờ vàng (12:00 và 20:00) — đây là 2 khung có traffic cao nhất. Đặt giá Flash Sale giảm tối thiểu 30% để được Shopee phân phối. Kết hợp với voucher shop để tăng giá trị đơn hàng trung bình.</div>
      <span class="item-tag">Khung vàng: 12:00 &amp; 20:00</span>
    </div>
  </div>

  <div class="callout">
    <h3>📊 Dữ liệu thực tế từ 50 shop phân tích</h3>
    <p>Shop áp dụng đồng thời 3+ chiến lược từ danh sách này tăng doanh thu trung bình 187% sau 90 ngày. Shop tập trung vào 1-2 chiến lược chỉ tăng 43%. Kết hợp là chìa khóa.</p>
  </div>

  <div class="list-item">
    <div class="item-num">4</div>
    <div class="item-content">
      <div class="item-title">Chạy Shopee Ads với ngân sách nhỏ nhưng nhắm đúng</div>
      <div class="item-body">Bắt đầu với ngân sách 50.000đ/ngày cho Search Ads. Chọn "tự động bid" và để 7-14 ngày thu thập data trước khi tối ưu. Focus vào 3-5 từ khóa chính xác hơn là 50 từ khóa rộng. CPC thường dao động 200-800đ, target ROAS 4-8x.</div>
      <div class="item-tip"><span class="item-tip-label">⚠️ Lưu ý:</span><span>Tắt từ khóa có CTR dưới 0.3% sau 7 ngày. Đây thường là từ khóa không liên quan, tốn ngân sách vô ích.</span></div>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">5</div>
    <div class="item-content">
      <div class="item-title">Xây dựng review 5 sao chủ động và đúng cách</div>
      <div class="item-body">Gửi tin nhắn cảm ơn tự động sau khi khách nhận hàng (qua Shopee Chat tự động), nhắc nhở đánh giá nhẹ nhàng. Đính kèm tờ cảm ơn nhỏ vào đơn hàng với mã giảm giá 10% đơn tiếp theo khi đánh giá 5 sao. Tỷ lệ review tăng từ 8% lên 35% với phương pháp này.</div>
      <span class="item-tag">Từ 8% → 35% review rate</span>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">6</div>
    <div class="item-content">
      <div class="item-title">Livestream bán hàng tối thiểu 3 buổi/tuần</div>
      <div class="item-body">Shopee Live đang được nền tảng ưu tiên đẩy reach miễn phí — đây là lợi thế lớn nên tận dụng ngay. Thời gian tốt nhất: 20:00-22:00 các ngày thường, 15:00-18:00 cuối tuần. Mỗi buổi tối thiểu 45 phút. Cần chuẩn bị: script, sản phẩm trưng bày, voucher độc quyền cho người xem live.</div>
      <div class="item-tip"><span class="item-tip-label">🎯 Target:</span><span>Buổi đầu đặt mục tiêu 50 lượt xem đồng thời. Sau 10 buổi bạn sẽ thấy thuật toán bắt đầu đẩy traffic tự nhiên.</span></div>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">7</div>
    <div class="item-content">
      <div class="item-title">Tối ưu tỷ lệ phản hồi chat — phải dưới 1 tiếng</div>
      <div class="item-body">Shopee tính điểm shop dựa trên tốc độ phản hồi. Shop có tốc độ phản hồi dưới 1 giờ được ưu tiên hiển thị trong kết quả tìm kiếm. Cài Quick Reply với 20-30 câu trả lời tự động cho câu hỏi thường gặp. Bật thông báo và phân công 1 người chuyên trực chat giờ cao điểm.</div>
      <span class="item-tag">Mục tiêu: phản hồi &lt;1 giờ</span>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">8</div>
    <div class="item-content">
      <div class="item-title">Tham gia Shopee Mall hoặc tối ưu điểm uy tín</div>
      <div class="item-body">Shopee Mall tăng hiển thị 3-5x so với shop thường trong cùng từ khóa. Nếu chưa đủ điều kiện Shopee Mall, tập trung đạt badge "Shop Yêu Thích" (tỷ lệ đơn thành công trên 97%, đánh giá trung bình 4.7+ sao, tốc độ phản hồi dưới 2 giờ).</div>
      <div class="item-tip"><span class="item-tip-label">📋 Điều kiện Mall:</span><span>Doanh thu 3 tháng liên tiếp &gt;100 triệu, giấy tờ kinh doanh hợp lệ, tỷ lệ hoàn hàng &lt;5%.</span></div>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">9</div>
    <div class="item-content">
      <div class="item-title">Combo sản phẩm thông minh để tăng AOV</div>
      <div class="item-body">Average Order Value (AOV) là chỉ số then chốt vì chi phí giao hàng gần như cố định. Tạo "combo mua kèm" giảm thêm 10-15% khi mua 2+ sản phẩm. Dùng tính năng "Gợi ý sản phẩm thêm" trong Shopee Seller để upsell tự động. Shop làm tốt AOV tăng 60% mà không tốn thêm chi phí quảng cáo.</div>
      <span class="item-tag">AOV tăng trung bình 60%</span>
    </div>
  </div>

  <div class="list-item">
    <div class="item-num">10</div>
    <div class="item-content">
      <div class="item-title">Phân tích data Shopee Business hàng tuần</div>
      <div class="item-body">Shopee cung cấp Business Insights miễn phí với dữ liệu rất chi tiết: conversion rate theo từng sản phẩm, nguồn traffic, hành vi khách hàng. Đặt lịch review data mỗi thứ Hai sáng — 30 phút xem 5 chỉ số: Lượt xem, CTR, Thêm giỏ hàng, Conversion Rate, và Tỷ lệ hoàn hàng. Hành động ngay với top 3 sản phẩm conversion thấp nhất.</div>
      <div class="item-tip"><span class="item-tip-label">📊 5 KPI cần theo dõi:</span><span>Lượt xem · CTR &gt;2% · Add-to-cart &gt;8% · Conversion &gt;3% · Hoàn hàng &lt;5%</span></div>
    </div>
  </div>

  <div class="cta-box">
    <h3>Muốn tạo content bán hàng Shopee nhanh hơn?</h3>
    <p>AIContentBooster viết mô tả sản phẩm, caption livestream và nội dung quảng cáo bằng AI — tối ưu sẵn cho thị trường Việt Nam.</p>
    <a href="#">🚀 Dùng thử miễn phí ngay →</a>
  </div>

  <div class="article-footer">
    <div class="tags"><span class="tag">Shopee</span><span class="tag">Kinh doanh online</span><span class="tag">Ecommerce</span><span class="tag">Bán hàng</span><span class="tag">Marketing</span></div>
    <div class="share-row"><span class="share-label">Chia sẻ</span><a href="#" class="share-btn">📘 Facebook</a><a href="#" class="share-btn">💬 Zalo</a><a href="#" class="share-btn">🐦 Twitter</a><a href="#" class="share-btn">📋 Copy link</a></div>
  </div>
</div>
</body></html>`

const ADS_FASHION = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fafafa;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;max-width:640px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08)}
/* Header */
.ad-header{background:#111;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}
.brand-name{font-size:20px;font-weight:900;color:#fff;letter-spacing:3px;text-transform:uppercase}
.ad-tag{background:#fff;color:#111;font-size:10px;font-weight:800;padding:4px 10px;letter-spacing:1px}
/* Hero banner */
.collection-banner{background:linear-gradient(160deg,#fdf2f8,#fce7f3,#fbcfe8);padding:44px 28px;text-align:center;position:relative}
.collection-label{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#9d174d;margin-bottom:12px}
.collection-title{font-size:clamp(28px,6vw,52px);font-weight:900;color:#111;letter-spacing:-1px;line-height:1;margin-bottom:10px}
.collection-sub{font-size:15px;color:#6b7280;margin-bottom:24px}
.season-badges{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.season-badge{background:#fff;border:1px solid #fbcfe8;color:#9d174d;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700}
/* Products */
.products{padding:24px 20px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.product{border-radius:4px;overflow:hidden;border:1px solid #f3f4f6}
.prod-img{height:180px;display:flex;align-items:center;justify-content:center;font-size:56px;position:relative}
.prod-sale-badge{position:absolute;top:10px;right:10px;background:#ef4444;color:#fff;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:700}
.prod-info{padding:12px}
.prod-name{font-size:14px;font-weight:700;color:#111;margin-bottom:4px}
.prod-style{font-size:12px;color:#9ca3af;margin-bottom:6px}
.prod-price-row{display:flex;align-items:center;gap:8px}
.prod-old{font-size:12px;color:#d1d5db;text-decoration:line-through}
.prod-new{font-size:16px;font-weight:800;color:#111}
/* Promo strip */
.promo-strip{background:#111;padding:20px 24px;text-align:center}
.promo-strip p{color:#9ca3af;font-size:12px;margin-bottom:8px;letter-spacing:1px;text-transform:uppercase}
.promo-code{font-size:28px;font-weight:900;color:#fff;letter-spacing:3px;margin-bottom:4px}
.promo-detail{font-size:12px;color:#6b7280}
/* CTA */
.shop-btn{display:block;background:#111;color:#fff;padding:18px;text-align:center;font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;margin:20px 20px 0}
.shop-btn:hover{background:#222}
/* Footer */
.ad-footer{display:flex;justify-content:space-between;padding:14px 20px;background:#fafafa;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af;flex-wrap:wrap;gap:8px}
</style></head>
<body>
<div class="ad">
  <div class="ad-header">
    <div class="brand-name">NOVA Style</div>
    <div class="ad-tag">NEW COLLECTION</div>
  </div>

  <div class="collection-banner">
    <div class="collection-label">Summer Collection 2026</div>
    <div class="collection-title">BLOOM</div>
    <div class="collection-sub">Nhẹ nhàng · Tươi mới · Tự do</div>
    <div class="season-badges">
      <span class="season-badge">🌸 Hoa nhí</span>
      <span class="season-badge">☀️ Tông pastel</span>
      <span class="season-badge">💨 Chất vải thoáng</span>
      <span class="season-badge">🎀 Size S–XXL</span>
    </div>
  </div>

  <div class="products">
    <div class="product">
      <div class="prod-img" style="background:#fdf2f8">👗<div class="prod-sale-badge">-40%</div></div>
      <div class="prod-info">
        <div class="prod-name">Đầm maxi hoa nhí</div>
        <div class="prod-style">Pastel hồng · Chiffon nhẹ</div>
        <div class="prod-price-row"><div class="prod-old">620K</div><div class="prod-new">372K</div></div>
      </div>
    </div>
    <div class="product">
      <div class="prod-img" style="background:#f0fdf4">🧥<div class="prod-sale-badge">-35%</div></div>
      <div class="prod-info">
        <div class="prod-name">Áo kiểu cổ V tay bồng</div>
        <div class="prod-style">Mint xanh · Cotton blend</div>
        <div class="prod-price-row"><div class="prod-old">420K</div><div class="prod-new">273K</div></div>
      </div>
    </div>
    <div class="product">
      <div class="prod-img" style="background:#fffbeb">👖<div class="prod-sale-badge">-30%</div></div>
      <div class="prod-info">
        <div class="prod-name">Quần culottes cao eo</div>
        <div class="prod-style">Kem trắng · Linen cao cấp</div>
        <div class="prod-price-row"><div class="prod-old">520K</div><div class="prod-new">364K</div></div>
      </div>
    </div>
    <div class="product">
      <div class="prod-img" style="background:#f5f3ff">👜<div class="prod-sale-badge">-25%</div></div>
      <div class="prod-info">
        <div class="prod-name">Túi rơm đan thủ công</div>
        <div class="prod-style">Natural · Dây da thật</div>
        <div class="prod-price-row"><div class="prod-old">380K</div><div class="prod-new">285K</div></div>
      </div>
    </div>
  </div>

  <div class="promo-strip">
    <p>Nhập mã để giảm thêm 15%</p>
    <div class="promo-code">BLOOM15</div>
    <div class="promo-detail">Áp dụng đơn từ 500K · Hết hạn 30/06/2026 · Dùng 1 lần</div>
  </div>

  <a href="#" class="shop-btn">→ SHOP NGAY</a>
  <div class="ad-footer">
    <span>📦 Free ship đơn từ 300K</span>
    <span>🔄 Đổi trả 30 ngày</span>
    <span>⭐ 4.9/5 (8.200+ đánh giá)</span>
  </div>
</div>
</body></html>`

const ADS_APP = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#030712;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:linear-gradient(160deg,#0f172a,#1e1b4b);border-radius:28px;max-width:660px;width:100%;overflow:hidden;border:1px solid rgba(255,255,255,.06);box-shadow:0 40px 80px rgba(0,0,0,.5)}
/* Top */
.ad-top{padding:44px 36px 0;text-align:center;position:relative}
.ad-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);color:#a5b4fc;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:24px}
.app-icon{width:88px;height:88px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:44px;margin:0 auto 20px;box-shadow:0 12px 32px rgba(99,102,241,.4)}
.app-name{font-size:32px;font-weight:900;color:#fff;letter-spacing:-0.5px;margin-bottom:6px}
.app-tagline{font-size:16px;color:#94a3b8;margin-bottom:10px;line-height:1.5}
.rating-row{display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:36px}
.stars{color:#fbbf24;font-size:16px}
.rating-num{font-size:15px;font-weight:700;color:#fff}
.rating-count{font-size:13px;color:#64748b}
/* Phone mockup */
.phone-mockup{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:32px;width:200px;margin:0 auto;padding:16px;position:relative}
.phone-notch{width:60px;height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:0 auto 12px}
.phone-screen{background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:18px;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px}
.screen-icon{font-size:48px;margin-bottom:4px}
.screen-title{font-size:13px;font-weight:700;color:#e9d5ff;text-align:center}
.screen-chart{display:flex;align-items:flex-end;gap:4px;margin-top:8px}
.chart-bar{width:18px;background:rgba(99,102,241,.4);border-radius:3px 3px 0 0}
.chart-bar.active{background:linear-gradient(to top,#6366f1,#a855f7)}
/* Features */
.features{padding:32px 36px}
.feat-list{display:flex;flex-direction:column;gap:16px}
.feat-row{display:flex;gap:16px;align-items:flex-start}
.feat-bullet{width:42px;height:42px;border-radius:12px;background:rgba(99,102,241,.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.feat-text h4{font-size:15px;font-weight:700;color:#e2e8f0;margin-bottom:4px}
.feat-text p{font-size:13px;color:#64748b;line-height:1.5}
/* Downloads */
.downloads{padding:0 36px 36px}
.store-btns{display:flex;gap:12px;flex-direction:column}
.store-btn{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 20px;text-decoration:none}
.store-btn.primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-color:transparent}
.store-icon{font-size:28px;flex-shrink:0}
.store-info{flex:1}
.store-sub{font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:1px}
.store-name{font-size:16px;font-weight:800;color:#fff}
.store-arrow{color:rgba(255,255,255,.4);font-size:18px}
/* Bottom */
.ad-bottom{background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.06);padding:16px 36px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.bottom-stat{text-align:center}
.bottom-num{font-size:18px;font-weight:800;color:#a5b4fc}
.bottom-lbl{font-size:11px;color:#64748b;margin-top:2px}
</style></head>
<body>
<div class="ad">
  <div class="ad-top">
    <div class="ad-eyebrow">🏆 App tài chính cá nhân #1 Việt Nam 2026</div>
    <div class="app-icon">💰</div>
    <div class="app-name">MoneyMind</div>
    <div class="app-tagline">Quản lý chi tiêu · Đầu tư thông minh<br>Đạt mục tiêu tài chính nhanh hơn</div>
    <div class="rating-row">
      <span class="stars">★★★★★</span>
      <span class="rating-num">4.9</span>
      <span class="rating-count">(128.000+ đánh giá)</span>
    </div>
    <div class="phone-mockup">
      <div class="phone-notch"></div>
      <div class="phone-screen">
        <div class="screen-icon">📊</div>
        <div class="screen-title">Tháng này tiết kiệm<br>được 3.2 triệu 🎉</div>
        <div class="screen-chart">
          <div class="chart-bar" style="height:30px"></div>
          <div class="chart-bar" style="height:50px"></div>
          <div class="chart-bar" style="height:40px"></div>
          <div class="chart-bar active" style="height:70px"></div>
          <div class="chart-bar" style="height:55px"></div>
          <div class="chart-bar active" style="height:80px"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="features">
    <div class="feat-list">
      <div class="feat-row">
        <div class="feat-bullet">🔗</div>
        <div class="feat-text"><h4>Kết nối tất cả tài khoản ngân hàng</h4><p>Đồng bộ tự động với 30+ ngân hàng Việt Nam. Giao dịch cập nhật real-time, không cần nhập tay.</p></div>
      </div>
      <div class="feat-row">
        <div class="feat-bullet">🤖</div>
        <div class="feat-text"><h4>AI phân tích thói quen chi tiêu</h4><p>Nhận báo cáo hàng tuần về nơi bạn tiêu tiền nhiều nhất và gợi ý cụ thể để tiết kiệm thêm 20%.</p></div>
      </div>
      <div class="feat-row">
        <div class="feat-bullet">🎯</div>
        <div class="feat-text"><h4>Đặt mục tiêu & theo dõi tiến độ</h4><p>Mua nhà, du lịch, quỹ khẩn cấp — thiết lập mục tiêu và app tự tính bao lâu bạn đạt được.</p></div>
      </div>
    </div>
  </div>

  <div class="downloads">
    <div class="store-btns">
      <a href="#" class="store-btn primary">
        <span class="store-icon">🍎</span>
        <div class="store-info"><div class="store-sub">Tải về trên</div><div class="store-name">App Store</div></div>
        <span class="store-arrow">→</span>
      </a>
      <a href="#" class="store-btn">
        <span class="store-icon">🤖</span>
        <div class="store-info"><div class="store-sub">Tải về trên</div><div class="store-name">Google Play</div></div>
        <span class="store-arrow">→</span>
      </a>
    </div>
  </div>

  <div class="ad-bottom">
    <div class="bottom-stat"><div class="bottom-num">2M+</div><div class="bottom-lbl">Người dùng</div></div>
    <div class="bottom-stat"><div class="bottom-num">Miễn phí</div><div class="bottom-lbl">Cơ bản mãi mãi</div></div>
    <div class="bottom-stat"><div class="bottom-num">ISO 27001</div><div class="bottom-lbl">Bảo mật dữ liệu</div></div>
    <div class="bottom-stat"><div class="bottom-num">4.9★</div><div class="bottom-lbl">128K đánh giá</div></div>
  </div>
</div>
</body></html>`

const LP_WEDDING = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a}
.hero{background:linear-gradient(150deg,#fdf6ee 0%,#fff1f2 50%,#fdf6ee 100%);padding:96px 24px 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'✦ ✦ ✦';position:absolute;top:32px;left:50%;transform:translateX(-50%);color:#d4af7a;font-size:16px;letter-spacing:12px}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #f9a8d4;color:#be185d;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:24px}
.hero-date{font-size:13px;color:#d4af7a;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.hero h1{font-size:clamp(38px,6vw,72px);font-weight:900;color:#1c0b2b;line-height:1.08;margin-bottom:16px;letter-spacing:-1px}
.hero h1 em{color:#be185d;font-style:normal}
.hero p{font-size:17px;color:#6d4c6e;max-width:520px;margin:0 auto 36px;line-height:1.8}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
.btn-blush{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#be185d,#9d174d);color:#fff;border-radius:14px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(190,24,93,.25)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;border:2px solid #f9a8d4;color:#be185d;border-radius:14px;padding:15px 28px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#9ca3af}
.ornament{text-align:center;font-size:20px;color:#d4af7a;letter-spacing:8px;padding:12px 0}
.stats-bar{background:#1c0b2b;padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:860px;margin:0 auto;text-align:center}
.stat-n{font-size:34px;font-weight:900;color:#f9a8d4}
.stat-l{font-size:12px;color:#d1d5db;margin-top:4px}
.services{padding:80px 24px;background:#fff}
.sec-title{text-align:center;font-size:34px;font-weight:800;color:#1c0b2b;margin-bottom:12px;letter-spacing:-0.5px}
.sec-sub{text-align:center;font-size:15px;color:#9ca3af;margin-bottom:48px}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;max-width:1000px;margin:0 auto}
.svc-card{border:1px solid #fce7f3;border-radius:20px;padding:36px;text-align:center;background:linear-gradient(160deg,#fff5f7,#fff)}
.svc-icon{font-size:48px;margin-bottom:16px;display:block}
.svc-title{font-size:18px;font-weight:800;color:#1c0b2b;margin-bottom:8px}
.svc-desc{font-size:14px;color:#6d4c6e;line-height:1.7}
.portfolio{padding:80px 24px;background:#fdf6ee}
.port-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:960px;margin:0 auto}
.port-card{border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(190,24,93,.08)}
.port-img{height:220px;display:flex;align-items:center;justify-content:center;font-size:64px}
.port-info{padding:20px;background:#fff}
.port-couple{font-size:18px;font-weight:800;color:#1c0b2b;margin-bottom:4px}
.port-style{font-size:13px;color:#be185d;font-weight:600;margin-bottom:4px}
.port-date{font-size:12px;color:#9ca3af}
.packages{padding:80px 24px;background:#fff;text-align:center}
.pkg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;max-width:880px;margin:0 auto}
.pkg{border:2px solid #fce7f3;border-radius:22px;padding:36px;text-align:left}
.pkg.featured{border-color:#be185d;background:linear-gradient(160deg,#fff0f6,#fff)}
.pkg-name{font-size:13px;font-weight:700;color:#be185d;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.pkg-price{font-size:44px;font-weight:900;color:#1c0b2b;margin-bottom:4px}
.pkg-per{font-size:13px;color:#9ca3af;margin-bottom:20px}
.pkg-btn{display:block;border-radius:12px;padding:13px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:20px}
.pkg-btn-out{background:#fce7f3;color:#be185d}
.pkg-btn-in{background:linear-gradient(135deg,#be185d,#9d174d);color:#fff}
.pkg-feat{font-size:13px;color:#4b5563;line-height:2.1}
.testi{padding:80px 24px;background:linear-gradient(135deg,#1c0b2b,#4a1942)}
.testi .sec-title{color:#fff;margin-bottom:8px}
.testi .sec-sub{color:#f9a8d4;margin-bottom:48px}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:960px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.07);border:1px solid rgba(249,168,212,.2);border-radius:18px;padding:28px}
.testi-hearts{color:#f9a8d4;font-size:18px;margin-bottom:12px}
.testi-quote{font-size:14px;color:#fce7f3;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-loc{font-size:12px;color:#f9a8d4}
.faq{padding:80px 24px;background:#fdf6ee}
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1px solid #fce7f3;border-radius:14px;padding:22px}
.faq-q{font-weight:700;color:#1c0b2b;margin-bottom:8px;font-size:15px}
.faq-a{font-size:14px;color:#4b5563;line-height:1.7}
.cta-sec{padding:80px 24px;text-align:center;background:#fff}
.cta-sec h2{font-size:40px;font-weight:800;color:#1c0b2b;margin-bottom:12px;letter-spacing:-0.5px}
.cta-sec p{font-size:17px;color:#6d4c6e;margin-bottom:32px;line-height:1.65}
.footer{background:#1c0b2b;color:#f9a8d4;padding:40px 24px}
.footer-inner{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:6px}
.footer-tagline{font-size:13px;opacity:.7}
.footer-links{display:flex;flex-direction:column;gap:6px}
.footer-links a{color:#f9a8d4;text-decoration:none;font-size:14px}
.footer-bottom{background:#0d0616;text-align:center;padding:16px;font-size:12px;color:#f9a8d4;opacity:.7}
</style></head>
<body>
<section class="hero">
  <div class="badge">💍 Wedding Planner cao cấp · 500+ đám cưới thành công</div>
  <div class="hero-date">Đặt lịch tư vấn miễn phí · Trả lời trong 2 giờ</div>
  <h1>Ngày cưới trong mơ<br><em>bắt đầu từ đây</em></h1>
  <p>Chúng tôi lên kế hoạch, trang trí và điều phối toàn bộ ngày trọng đại của bạn — để bạn chỉ việc tận hưởng từng khoảnh khắc.</p>
  <div class="hero-btns">
    <a href="#" class="btn-blush">💍 Đặt lịch tư vấn miễn phí</a>
    <a href="#" class="btn-ghost">📸 Xem portfolio</a>
  </div>
  <p class="hero-note">Tư vấn 1-1 · Báo giá trong 24h · Không ràng buộc</p>
</section>
<div class="ornament">✦ ✦ ✦</div>
<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">500+</div><div class="stat-l">Đám cưới tổ chức</div></div>
    <div><div class="stat-n">12 năm</div><div class="stat-l">Kinh nghiệm</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Điểm hài lòng</div></div>
    <div><div class="stat-n">50+</div><div class="stat-l">Đối tác dịch vụ</div></div>
    <div><div class="stat-n">0</div><div class="stat-l">Đám cưới thất bại</div></div>
  </div>
</div>
<section class="services">
  <h2 class="sec-title">Dịch vụ trọn gói</h2>
  <p class="sec-sub">Mọi chi tiết đều được chúng tôi chăm chút — từ hoa cài áo đến khoảnh khắc cắt bánh</p>
  <div class="svc-grid">
    <div class="svc-card"><span class="svc-icon">🌸</span><div class="svc-title">Trang trí &amp; Hoa cưới</div><div class="svc-desc">Thiết kế concept độc quyền theo phong cách bạn — Rustic, Luxury, Minimalist hay Garden Party. Hoa tươi nhập khẩu hàng ngày từ Đà Lạt.</div></div>
    <div class="svc-card"><span class="svc-icon">📸</span><div class="svc-title">Chụp ảnh &amp; Quay phim</div><div class="svc-desc">Đội ngũ nhiếp ảnh gia chuyên nghiệp, máy ảnh full-frame, chỉnh màu nghệ thuật. Phim cưới 4K highlight 5 phút và full wedding film.</div></div>
    <div class="svc-card"><span class="svc-icon">🎤</span><div class="svc-title">MC &amp; Âm thanh ánh sáng</div><div class="svc-desc">MC song ngữ Việt-Anh chuyên nghiệp. Hệ thống âm thanh JBL cao cấp, đèn LED full màu, máy khói sân khấu.</div></div>
    <div class="svc-card"><span class="svc-icon">🍽️</span><div class="svc-title">Tiệc cưới &amp; Menu</div><div class="svc-desc">Hợp tác với 20+ nhà hàng khách sạn 5★ tại TP.HCM và Hà Nội. Menu Âu-Á-Việt, bánh cưới nhiều tầng theo yêu cầu.</div></div>
    <div class="svc-card"><span class="svc-icon">💄</span><div class="svc-title">Trang điểm &amp; Váy cưới</div><div class="svc-desc">Chuyên gia trang điểm hàng đầu Việt Nam, váy cưới thiết kế riêng hoặc thuê nhập khẩu từ Châu Âu và Hàn Quốc.</div></div>
    <div class="svc-card"><span class="svc-icon">🗓️</span><div class="svc-title">Điều phối ngày cưới</div><div class="svc-desc">Wedding Coordinator riêng từ 6 tháng trước đến cuối đêm cưới. Checklist 200 hạng mục, lịch trình chi tiết từng phút.</div></div>
  </div>
</section>
<section class="portfolio">
  <h2 class="sec-title">Những khoảnh khắc chúng tôi đã tạo nên</h2>
  <p class="sec-sub">Mỗi đám cưới là một câu chuyện tình yêu độc nhất</p>
  <div class="port-grid">
    <div class="port-card"><div class="port-img" style="background:linear-gradient(135deg,#fce7f3,#fbcfe8)">💒</div><div class="port-info"><div class="port-couple">Minh Anh &amp; Thanh Huy</div><div class="port-style">Garden Wedding · Rustic Boho</div><div class="port-date">📅 15/03/2026 · Tiệc 350 khách</div></div></div>
    <div class="port-card"><div class="port-img" style="background:linear-gradient(135deg,#fdf6ee,#fef3c7)">🕍</div><div class="port-info"><div class="port-couple">Ngọc Lan &amp; Đức Thịnh</div><div class="port-style">Luxury Ballroom · Gold &amp; White</div><div class="port-date">📅 20/12/2025 · Tiệc 600 khách</div></div></div>
    <div class="port-card"><div class="port-img" style="background:linear-gradient(135deg,#ecfdf5,#d1fae5)">🏡</div><div class="port-info"><div class="port-couple">Thu Hiền &amp; Minh Khang</div><div class="port-style">Outdoor Villa · Minimalist Chic</div><div class="port-date">📅 08/10/2025 · Tiệc 120 khách</div></div></div>
  </div>
</section>
<section class="packages">
  <h2 class="sec-title">Gói dịch vụ</h2>
  <p class="sec-sub">Trọn gói hoặc tùy chọn từng dịch vụ — linh hoạt theo ngân sách của bạn</p>
  <div class="pkg-grid">
    <div class="pkg"><div class="pkg-name">Gói Bạc</div><div class="pkg-price">35 triệu</div><div class="pkg-per">Trọn gói · Tiệc đến 200 khách</div><a href="#" class="pkg-btn pkg-btn-out">Tư vấn gói này →</a><div class="pkg-feat">✓ Trang trí bàn &amp; sân khấu<br>✓ Hoa cưới cô dâu &amp; phù dâu<br>✓ MC 4 giờ + Âm thanh ánh sáng<br>✓ Phim cưới highlight 3 phút<br>✓ Wedding Coordinator 1 ngày</div></div>
    <div class="pkg featured"><div class="pkg-name">Gói Vàng ⭐ Phổ biến</div><div class="pkg-price">75 triệu</div><div class="pkg-per">Trọn gói · Tiệc đến 400 khách</div><a href="#" class="pkg-btn pkg-btn-in">Tư vấn gói này →</a><div class="pkg-feat">✓ Tất cả gói Bạc<br>✓ Concept thiết kế độc quyền<br>✓ Chụp ảnh phóng sự cưới<br>✓ Phim cưới 4K full &amp; highlight<br>✓ Trang điểm cô dâu trọn ngày<br>✓ Coordinator từ 3 tháng trước</div></div>
    <div class="pkg"><div class="pkg-name">Gói Kim Cương</div><div class="pkg-price">Liên hệ</div><div class="pkg-per">Luxury · Không giới hạn</div><a href="#" class="pkg-btn pkg-btn-out">Tư vấn gói này →</a><div class="pkg-feat">✓ Tất cả gói Vàng<br>✓ Trang trí full venue<br>✓ Váy cưới &amp; suit thiết kế riêng<br>✓ Pre-wedding nước ngoài<br>✓ Xe hoa nhập khẩu<br>✓ Coordinator team 6 tháng</div></div>
  </div>
</section>
<section class="testi">
  <h2 class="sec-title">Những đôi uyên ương hạnh phúc</h2>
  <p class="sec-sub">Đây là điều chúng tôi làm việc vì — không phải những con số</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-hearts">💕💕💕💕💕</div><p class="testi-quote">"Ngày cưới của chúng tôi hoàn hảo hơn những gì chúng tôi từng mơ tới. Team luôn ở đó giải quyết mọi thứ trước khi chúng tôi kịp lo lắng. Cô dâu và chú rể chỉ việc cười và tận hưởng!"</p><div class="testi-author"><div class="testi-avatar">💑</div><div><div class="testi-name">Minh Anh &amp; Thanh Huy</div><div class="testi-loc">Garden Wedding · Tháng 3/2026</div></div></div></div>
    <div class="testi-card"><div class="testi-hearts">💕💕💕💕💕</div><p class="testi-quote">"Chúng tôi ở Mỹ về tổ chức cưới tại Việt Nam, không quen địa điểm và nhà cung cấp. Bloom Wedding xử lý 100% từ xa — khi về đến nơi mọi thứ đã sẵn sàng và đẹp hơn mong đợi rất nhiều."</p><div class="testi-author"><div class="testi-avatar">💑</div><div><div class="testi-name">Vivian &amp; Khải Hoàn</div><div class="testi-loc">Luxury Ballroom · Tháng 12/2025</div></div></div></div>
    <div class="testi-card"><div class="testi-hearts">💕💕💕💕💕</div><p class="testi-quote">"Ngân sách eo hẹp nhưng muốn đám cưới đẹp — đội tư vấn rất khéo léo tối ưu từng khoản. Kết quả là đám cưới 150 khách sang trọng và ấm cúng, khách ai cũng khen. Quá xứng đáng!"</p><div class="testi-author"><div class="testi-avatar">💑</div><div><div class="testi-name">Thu Hiền &amp; Minh Khang</div><div class="testi-loc">Outdoor Villa · Tháng 10/2025</div></div></div></div>
  </div>
</section>
<section class="faq">
  <h2 class="sec-title">Câu hỏi thường gặp</h2>
  <p class="sec-sub">Những điều cặp đôi hay hỏi chúng tôi nhất</p>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">📅 Cần đặt lịch trước bao lâu?</div><div class="faq-a">Lý tưởng nhất là 6-12 tháng trước ngày cưới để đảm bảo ngày và địa điểm ưa thích. Tuy nhiên chúng tôi vẫn nhận đặt nhanh 3 tháng nếu còn slot. Liên hệ sớm để được ưu tiên ngày đẹp.</div></div>
    <div class="faq-item"><div class="faq-q">💰 Có thể điều chỉnh gói theo ngân sách không?</div><div class="faq-a">Hoàn toàn được! Chúng tôi không bán gói cố định mà tư vấn theo nhu cầu và ngân sách thực tế của bạn. Hãy chia sẻ con số bạn có và chúng tôi sẽ đề xuất cách phân bổ hợp lý nhất để đám cưới đẹp nhất trong khả năng đó.</div></div>
    <div class="faq-item"><div class="faq-q">🌧️ Đám cưới ngoài trời thì xử lý thời tiết xấu thế nào?</div><div class="faq-a">Luôn có Plan B với lều tent hoặc phương án di chuyển vào trong. Theo dõi thời tiết 7 ngày trước và thảo luận phương án dự phòng với cặp đôi. Phí thuê tent dự phòng đã bao gồm trong gói outdoor wedding.</div></div>
    <div class="faq-item"><div class="faq-q">✈️ Có tổ chức đám cưới ngoài TP.HCM/Hà Nội không?</div><div class="faq-a">Có! Chúng tôi đã tổ chức đám cưới ở Đà Nẵng, Hội An, Phú Quốc, Nha Trang và cả nước ngoài (Bali, Singapore, Phuket). Chi phí di chuyển và lưu trú của team sẽ tính thêm theo thực tế.</div></div>
  </div>
</section>
<section class="cta-sec">
  <h2>Bắt đầu hành trình cưới<br>của bạn hôm nay</h2>
  <p>Buổi tư vấn đầu tiên hoàn toàn miễn phí — không cam kết, không áp lực.</p>
  <a href="#" class="btn-blush" style="display:inline-flex;margin:0 auto">💍 Đặt lịch tư vấn miễn phí →</a>
  <p style="margin-top:14px;font-size:13px;color:#9ca3af">Phản hồi trong 2 giờ · Zalo: 0901 234 567 · hello@bloomwedding.vn</p>
</section>
<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">💍 Bloom Wedding</div><div class="footer-tagline">Ngày cưới hoàn hảo — Từng chi tiết đều có ý nghĩa</div></div>
    <div class="footer-links"><a href="#">Dịch vụ</a><a href="#">Portfolio</a><a href="#">Gói giá</a><a href="#">Blog cưới</a></div>
    <div class="footer-links"><a href="#">Hotline: 0901 234 567</a><a href="#">Zalo: 0901 234 567</a><a href="#">hello@bloomwedding.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 Bloom Wedding · Giấy phép kinh doanh: 0312345678 · TP. Hồ Chí Minh</div>
</body></html>`

const ARTICLE_COMPARISON = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;color:#1e293b}
.hero-banner{background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:60px 24px;text-align:center}
.cat-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(234,88,12,.15);border:1px solid rgba(234,88,12,.3);color:#fb923c;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:18px}
.hero-banner h1{font-size:clamp(24px,4vw,40px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:12px;max-width:700px;margin-left:auto;margin-right:auto}
.hero-meta{display:flex;gap:20px;justify-content:center;font-size:13px;color:#94a3b8;flex-wrap:wrap}
.content{max-width:800px;margin:0 auto;padding:48px 24px}
.verdict-banner{background:linear-gradient(135deg,#fffbeb,#fef3c7);border:2px solid #fbbf24;border-radius:16px;padding:24px 28px;margin-bottom:36px;display:flex;gap:20px;align-items:center;flex-wrap:wrap}
.verdict-badge{background:#f59e0b;color:#fff;border-radius:999px;padding:4px 14px;font-size:12px;font-weight:800;margin-bottom:6px;display:inline-block}
.verdict-text h3{font-size:18px;font-weight:800;color:#92400e;margin-bottom:4px}
.verdict-text p{font-size:14px;color:#78350f;line-height:1.6}
.intro{font-size:17px;color:#374151;line-height:1.8;margin-bottom:36px}
.compare-header{display:grid;grid-template-columns:2fr 1fr 1fr;gap:0;border:2px solid #e2e8f0;border-radius:16px 16px 0 0;overflow:hidden;margin-bottom:0}
.ch-label{background:#f8fafc;padding:16px 20px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px}
.ch-prod{padding:16px;text-align:center;font-weight:800;font-size:16px;color:#fff}
.ch-prod.a{background:linear-gradient(135deg,#3b82f6,#6366f1)}
.ch-prod.b{background:linear-gradient(135deg,#64748b,#475569)}
.ch-prod .winner-crown{font-size:18px;display:block;margin-bottom:4px}
.compare-table{border:2px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;margin-bottom:32px}
.compare-row{display:grid;grid-template-columns:2fr 1fr 1fr;gap:0;border-bottom:1px solid #f1f5f9}
.compare-row:last-child{border:none}
.compare-row:hover{background:#f8fafc}
.cr-feature{padding:14px 20px;font-size:14px;font-weight:600;color:#374151;display:flex;align-items:center;gap:8px}
.cr-val{padding:14px 12px;text-align:center;font-size:14px;display:flex;align-items:center;justify-content:center}
.cr-val.win{background:#f0fdf4;color:#15803d;font-weight:700}
.cr-val.lose{color:#9ca3af}
.cr-val .check{color:#22c55e;font-size:18px}
.cr-val .cross{color:#ef4444;font-size:18px}
.section-title{font-size:22px;font-weight:800;color:#0f172a;margin:36px 0 16px;padding-bottom:10px;border-bottom:2px solid #e2e8f0}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px}
@media(max-width:600px){.two-col{grid-template-columns:1fr}}
.prod-card{border-radius:14px;padding:22px}
.prod-card.blue{background:#eff6ff;border:1px solid #bfdbfe}
.prod-card.gray{background:#f8fafc;border:1px solid #e2e8f0}
.prod-card h3{font-size:16px;font-weight:800;margin-bottom:12px}
.prod-card.blue h3{color:#1d4ed8}
.prod-card.gray h3{color:#475569}
.prod-pros{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.prod-pros li{font-size:13px;padding-left:18px;position:relative;line-height:1.5}
.prod-pros li::before{content:'✓';position:absolute;left:0;font-weight:700}
.prod-card.blue .prod-pros li::before{color:#2563eb}
.prod-card.gray .prod-pros li::before{color:#64748b}
.prod-cons li::before{content:'—'!important;color:#ef4444!important}
p{color:#475569;line-height:1.8;margin-bottom:16px}
.winner-box{background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:16px;padding:28px;color:#fff;text-align:center;margin:32px 0}
.winner-box .trophy{font-size:48px;margin-bottom:12px}
.winner-box h3{font-size:24px;font-weight:800;margin-bottom:8px}
.winner-box p{color:#bfdbfe;font-size:15px;margin:0}
.cta-box{background:#f1f5f9;border-radius:14px;padding:28px;text-align:center;margin-top:36px}
.cta-box h3{font-size:18px;font-weight:700;color:#0f172a;margin-bottom:8px}
.cta-box p{font-size:14px;color:#64748b;margin-bottom:18px}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border-radius:10px;padding:12px 24px;font-weight:700;text-decoration:none}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:4px 12px;font-size:13px}
</style></head>
<body>
<div class="hero-banner">
  <div class="cat-badge">⚖️ So sánh chi tiết · Laptop</div>
  <h1>MacBook Air M3 vs Dell XPS 15 2026: Laptop nào đáng mua hơn cho dân văn phòng?</h1>
  <div class="hero-meta"><span>👤 Phạm Quốc Toàn · Hardware Reviewer</span><span>📅 28/05/2026</span><span>⏱ 9 phút đọc</span></div>
</div>
<div class="content">
  <div class="verdict-banner">
    <div style="font-size:48px">🏆</div>
    <div class="verdict-text"><div class="verdict-badge">VERDICT 2026</div><h3>MacBook Air M3 thắng tổng thể — nhưng Dell XPS 15 vẫn có lý do tồn tại</h3><p>MacBook Air M3 dẫn ở pin, hiệu năng/watt và build quality. Dell XPS 15 phản công ở màn hình OLED và RAM tối đa 64GB. Chọn cái nào phụ thuộc vào workflow của bạn.</p></div>
  </div>
  <p class="intro">Hai chiếc laptop tốt nhất phân khúc cao cấp 2026 — một bên là tượng đài macOS tối ưu hoàn hảo, một bên là Windows mạnh mẽ với màn hình OLED đẳng cấp. Tôi đã dùng cả hai trong 3 tuần để đưa ra kết luận.</p>
  <div class="compare-header">
    <div class="ch-label">Tiêu chí so sánh</div>
    <div class="ch-prod a"><span class="winner-crown">🏆</span>MacBook Air M3</div>
    <div class="ch-prod b">Dell XPS 15</div>
  </div>
  <div class="compare-table">
    <div class="compare-row"><div class="cr-feature">⚡ Hiệu năng CPU</div><div class="cr-val win">Apple M3 — xuất sắc <span class="check">✓</span></div><div class="cr-val">Intel i9-13900H</div></div>
    <div class="compare-row"><div class="cr-feature">🔋 Thời lượng pin</div><div class="cr-val win">18–20 giờ <span class="check">✓</span></div><div class="cr-val lose">8–10 giờ</div></div>
    <div class="compare-row"><div class="cr-feature">🖥️ Chất lượng màn hình</div><div class="cr-val">Liquid Retina IPS</div><div class="cr-val win">OLED 3.5K 120Hz <span class="check">✓</span></div></div>
    <div class="compare-row"><div class="cr-feature">💾 RAM tối đa</div><div class="cr-val lose">24GB (hàn cứng)</div><div class="cr-val win">64GB DDR5 <span class="check">✓</span></div></div>
    <div class="compare-row"><div class="cr-feature">🌡️ Nhiệt độ khi tải nặng</div><div class="cr-val win">Mát, không quạt <span class="check">✓</span></div><div class="cr-val lose">Nóng, quạt ồn</div></div>
    <div class="compare-row"><div class="cr-feature">⚖️ Trọng lượng</div><div class="cr-val win">1.24kg <span class="check">✓</span></div><div class="cr-val lose">1.86kg</div></div>
    <div class="compare-row"><div class="cr-feature">🔌 Cổng kết nối</div><div class="cr-val lose">2x USB-C, MagSafe</div><div class="cr-val win">USB-A, USB-C, HDMI, SD <span class="check">✓</span></div></div>
    <div class="compare-row"><div class="cr-feature">💰 Giá bán (VN)</div><div class="cr-val win">28–35 triệu <span class="check">✓</span></div><div class="cr-val lose">42–55 triệu</div></div>
  </div>
  <div class="section-title">Phân tích chi tiết</div>
  <p>MacBook Air M3 chip Apple Silicon là bước nhảy vọt thực sự — xử lý văn phòng, code, edit video 4K mà không cần quạt tản nhiệt, pin gần 20 giờ thực tế. Dell XPS 15 phản công bằng màn hình OLED 3.5K 120Hz đẹp nhất thị trường và khả năng nâng cấp RAM/SSD sau này.</p>
  <div class="two-col">
    <div class="prod-card blue"><h3>👍 MacBook Air M3 — Ưu điểm</h3><ul class="prod-pros"><li>Pin 18-20 giờ thực tế, tốt nhất thị trường</li><li>Hoàn toàn không quạt, im lặng tuyệt đối</li><li>Build nhôm nguyên khối, siêu bền</li><li>Giá tốt hơn XPS 15 cùng cấu hình</li></ul><ul class="prod-pros prod-cons"><li>RAM hàn cứng, không nâng cấp được</li><li>Chỉ 2 cổng USB-C</li></ul></div>
    <div class="prod-card gray"><h3>👍 Dell XPS 15 — Ưu điểm</h3><ul class="prod-pros"><li>Màn hình OLED 3.5K 120Hz đẹp nhất</li><li>RAM nâng cấp tối đa 64GB DDR5</li><li>Cổng kết nối đa dạng (HDMI, SD, USB-A)</li><li>Chạy Windows — tương thích phần mềm rộng hơn</li></ul><ul class="prod-pros prod-cons"><li>Pin chỉ 8-10 giờ thực tế</li><li>Nặng 1.86kg, nóng khi tải nặng</li></ul></div>
  </div>
  <div class="winner-box"><div class="trophy">🏆</div><h3>Kết luận: MacBook Air M3 thắng tổng thể</h3><p>Nếu bạn ưu tiên pin trâu, nhẹ và lặng — MacBook Air M3 là lựa chọn rõ ràng. Nếu bạn cần màn hình OLED, RAM lớn và dùng phần mềm Windows đặc thù — Dell XPS 15 vẫn xứng đáng với mức giá cao hơn.</p></div>
  <div class="cta-box"><h3>Muốn tạo bài so sánh sản phẩm cho website của bạn?</h3><p>AIContentBooster viết bài so sánh, review và bài hướng dẫn chuyên nghiệp bằng AI — tối ưu SEO, đúng giọng văn Việt.</p><a href="#">🚀 Dùng thử miễn phí →</a></div>
  <div class="tags"><span class="tag">Laptop</span><span class="tag">MacBook</span><span class="tag">Dell XPS</span><span class="tag">So sánh</span><span class="tag">Công nghệ</span></div>
</div>
</body></html>`

const ARTICLE_CASESTUDY = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
.case-header{background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:64px 24px;position:relative;overflow:hidden}
.case-header::before{content:'';position:absolute;top:-40px;right:-40px;width:300px;height:300px;background:rgba(99,102,241,.08);border-radius:50%}
.case-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,.2);border:1px solid rgba(99,102,241,.3);color:#a5b4fc;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:18px}
.case-title{font-size:clamp(24px,4vw,42px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:16px;max-width:720px;position:relative}
.case-meta{display:flex;gap:16px;flex-wrap:wrap;position:relative}
.meta-chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:#94a3b8;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600}
.content{max-width:780px;margin:0 auto;padding:48px 24px}
.client-card{display:flex;gap:20px;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:36px;flex-wrap:wrap}
.client-logo{width:72px;height:72px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:34px;flex-shrink:0}
.client-info h3{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:4px}
.client-info p{font-size:14px;color:#64748b;line-height:1.5}
.client-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.client-chip{background:#ede9fe;color:#5b21b6;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600}
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin-bottom:36px}
.kpi-card{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:14px;padding:22px;text-align:center;color:#fff}
.kpi-num{font-size:40px;font-weight:900;line-height:1}
.kpi-label{font-size:12px;color:#e0e7ff;margin-top:6px;line-height:1.4}
.section-h2{font-size:22px;font-weight:800;color:#0f172a;margin:36px 0 14px;display:flex;align-items:center;gap:10px}
.section-h2 .icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
p{color:#475569;line-height:1.8;margin-bottom:14px}
.timeline{display:flex;flex-direction:column;gap:0;margin:20px 0 28px;max-width:560px}
.tl-item{display:flex;gap:16px;padding-bottom:24px;position:relative}
.tl-item:last-child{padding-bottom:0}
.tl-item::before{content:'';position:absolute;left:18px;top:36px;bottom:0;width:2px;background:#e0e7ff}
.tl-item:last-child::before{display:none}
.tl-dot{width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0;z-index:1}
.tl-content .tl-month{font-size:12px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.tl-content .tl-title{font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px}
.tl-content .tl-desc{font-size:13px;color:#64748b;line-height:1.55}
.quote-block{background:linear-gradient(135deg,#ede9fe,#faf5ff);border-left:4px solid #8b5cf6;padding:22px 26px;border-radius:0 12px 12px 0;margin:24px 0}
.quote-block blockquote{font-size:18px;font-style:italic;color:#4c1d95;line-height:1.6;margin-bottom:8px}
.quote-block cite{font-size:13px;color:#7c3aed;font-style:normal;font-weight:600}
.results-list{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.results-list li{display:flex;align-items:flex-start;gap:12px;font-size:15px;color:#374151;line-height:1.5}
.results-list li::before{content:'↑';width:28px;height:28px;background:#f0fdf4;color:#16a34a;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0;margin-top:1px}
.cta-box{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px;padding:32px;text-align:center;margin-top:36px}
.cta-box h3{color:#fff;font-size:20px;font-weight:800;margin-bottom:8px}
.cta-box p{color:#c7d2fe;font-size:14px;margin-bottom:20px}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#6366f1;border-radius:10px;padding:12px 24px;font-weight:700;text-decoration:none}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:4px 12px;font-size:13px}
</style></head>
<body>
<div class="case-header">
  <div class="case-tag">📊 Case Study · E-commerce</div>
  <div class="case-title">Cách FashionX tăng doanh thu Shopee từ 200 triệu lên 1,8 tỷ/tháng trong 8 tháng</div>
  <div class="case-meta">
    <span class="meta-chip">🗓 Tháng 8/2025 – 4/2026</span>
    <span class="meta-chip">🏢 FashionX Việt Nam</span>
    <span class="meta-chip">🛍️ Thời trang online</span>
    <span class="meta-chip">⏱ 8 phút đọc</span>
  </div>
</div>
<div class="content">
  <div class="client-card">
    <div class="client-logo">👗</div>
    <div class="client-info">
      <h3>FashionX Việt Nam</h3>
      <p>Shop thời trang nữ online, thành lập 2022. Bán hàng chủ yếu qua Shopee và Facebook. Đội ngũ 8 người, kho 500m² tại TP.HCM.</p>
      <div class="client-chips"><span class="client-chip">Shopee Mall</span><span class="client-chip">8 nhân sự</span><span class="client-chip">TP.HCM</span></div>
    </div>
  </div>
  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-num">9x</div><div class="kpi-label">Tăng trưởng doanh thu</div></div>
    <div class="kpi-card"><div class="kpi-num">8</div><div class="kpi-label">Tháng để đạt kết quả</div></div>
    <div class="kpi-card"><div class="kpi-num">340%</div><div class="kpi-label">Tăng lượt theo dõi shop</div></div>
    <div class="kpi-card"><div class="kpi-card"><div class="kpi-num">4.6x</div><div class="kpi-label">ROAS quảng cáo</div></div></div>
  </div>
  <h2 class="section-h2"><div class="icon">🔥</div>Bối cảnh &amp; Thách thức</h2>
  <p>Cuối năm 2024, FashionX đang bán được 200-250 triệu/tháng trên Shopee nhưng tăng trưởng đình trệ. Họ chạy quảng cáo nhưng ROAS chỉ đạt 1.8x, tồn kho dư nhiều. Chi phí quảng cáo ngày càng tăng trong khi tỷ lệ chuyển đổi không cải thiện.</p>
  <p>Chủ shop Nguyễn Văn Hùng tự nhận: "Chúng tôi biết mình đang làm sai ở đâu đó nhưng không biết sửa ở đâu trước. Data có nhưng không biết đọc, quảng cáo có nhưng không biết optimize."</p>
  <h2 class="section-h2"><div class="icon">💡</div>Chiến lược can thiệp</h2>
  <div class="timeline">
    <div class="tl-item"><div class="tl-dot">1</div><div class="tl-content"><div class="tl-month">Tháng 8/2025</div><div class="tl-title">Audit toàn diện &amp; Tái cấu trúc listing</div><div class="tl-desc">Xác định 30% SKU chiếm 80% doanh thu. Tối ưu hình ảnh, tiêu đề và mô tả 50 sản phẩm bán chạy nhất. Loại bỏ 120 SKU hiệu suất thấp.</div></div></div>
    <div class="tl-item"><div class="tl-dot">2</div><div class="tl-content"><div class="tl-month">Tháng 9–10/2025</div><div class="tl-title">Rebuild chiến lược quảng cáo Shopee Ads</div><div class="tl-desc">Chuyển từ broad targeting sang exact match keywords. Cắt giảm 60% từ khóa lãng phí, tăng bid cho top 10 từ khóa chuyển đổi cao nhất.</div></div></div>
    <div class="tl-item"><div class="tl-dot">3</div><div class="tl-content"><div class="tl-month">Tháng 11/2025</div><div class="tl-title">Ra mắt Shopee Live 3 buổi/tuần</div><div class="tl-desc">Đào tạo host, xây dựng script và chương trình voucher độc quyền live. Buổi đầu đạt 800 lượt xem, buổi thứ 5 vượt 3.500 lượt xem đồng thời.</div></div></div>
    <div class="tl-item"><div class="tl-dot">4</div><div class="tl-content"><div class="tl-month">Tháng 12/2025 – 4/2026</div><div class="tl-title">Scale &amp; Tối ưu liên tục</div><div class="tl-desc">Tăng ngân sách quảng cáo theo ROAS. Xây dựng chương trình khách hàng thân thiết. Mở rộng livestream lên 5 buổi/tuần với 2 host.</div></div></div>
  </div>
  <div class="quote-block"><blockquote>"Điều thay đổi lớn nhất không phải là ngân sách quảng cáo — mà là chúng tôi đã học cách đọc data và ra quyết định dựa trên con số thực tế, không phải cảm tính."</blockquote><cite>— Nguyễn Văn Hùng, Chủ shop FashionX</cite></div>
  <h2 class="section-h2"><div class="icon">📈</div>Kết quả sau 8 tháng</h2>
  <ul class="results-list">
    <li>Doanh thu Shopee tăng từ 200 triệu lên 1,8 tỷ/tháng — tăng trưởng 9x</li>
    <li>ROAS quảng cáo cải thiện từ 1.8x lên 4.6x với cùng ngân sách ban đầu</li>
    <li>Lượt theo dõi shop tăng từ 12.000 lên 53.000 followers</li>
    <li>Tỷ lệ chuyển đổi tăng từ 1.2% lên 3.8% — gần 3x</li>
    <li>Shopee Live đạt trung bình 4.500 lượt xem/buổi, doanh thu live 15% tổng shop</li>
  </ul>
  <div class="cta-box"><h3>Muốn áp dụng chiến lược tương tự cho shop của bạn?</h3><p>Đọc thêm các case study và hướng dẫn bán hàng thực chiến tại AIContentBooster Blog.</p><a href="#">📚 Đọc thêm case studies →</a></div>
  <div class="tags"><span class="tag">Shopee</span><span class="tag">Case Study</span><span class="tag">Thời trang</span><span class="tag">Ecommerce</span><span class="tag">Tăng trưởng</span></div>
</div>
</body></html>`

const ARTICLE_INTERVIEW = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
.hero-banner{background:linear-gradient(135deg,#064e3b,#065f46);padding:64px 24px;text-align:center}
.cat-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(52,211,153,.15);border:1px solid rgba(52,211,153,.3);color:#6ee7b7;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:18px}
.hero-banner h1{font-size:clamp(24px,4vw,40px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:14px;max-width:680px;margin-left:auto;margin-right:auto}
.hero-meta{display:flex;gap:20px;justify-content:center;font-size:13px;color:#6ee7b7;flex-wrap:wrap}
.content{max-width:760px;margin:0 auto;padding:48px 24px}
.subject-card{display:flex;gap:24px;align-items:center;background:#f0fdf4;border:1px solid #a7f3d0;border-radius:18px;padding:28px;margin-bottom:36px;flex-wrap:wrap}
.subject-avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#059669,#047857);display:flex;align-items:center;justify-content:center;font-size:44px;flex-shrink:0}
.subject-info h2{font-size:22px;font-weight:800;color:#064e3b;margin-bottom:4px}
.subject-title{font-size:14px;color:#059669;font-weight:600;margin-bottom:10px}
.subject-bio{font-size:14px;color:#4b5563;line-height:1.6;margin-bottom:10px}
.subject-badges{display:flex;gap:8px;flex-wrap:wrap}
.subject-badge{background:#d1fae5;color:#065f46;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600}
.intro-text{font-size:17px;color:#374151;line-height:1.8;margin-bottom:36px;padding:20px 24px;background:#f8fafc;border-left:4px solid #34d399;border-radius:0 12px 12px 0}
.qa-block{margin-bottom:32px}
.question{display:flex;gap:14px;align-items:flex-start;margin-bottom:16px}
.q-label{width:36px;height:36px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0;margin-top:2px}
.q-text{font-size:17px;font-weight:700;color:#064e3b;line-height:1.5;flex:1}
.answer{display:flex;gap:14px;align-items:flex-start}
.a-label{width:36px;height:36px;background:#f0fdf4;border:2px solid #a7f3d0;color:#059669;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0;margin-top:2px}
.a-content{flex:1}
.a-content p{font-size:15px;color:#374151;line-height:1.8;margin-bottom:12px}
.a-content p:last-child{margin-bottom:0}
.pull-quote{background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border-left:4px solid #059669;padding:20px 24px;border-radius:0 12px 12px 0;margin:28px 0}
.pull-quote blockquote{font-size:20px;font-style:italic;color:#065f46;line-height:1.6;font-weight:600}
.divider{border:none;border-top:2px dashed #a7f3d0;margin:32px 0}
.key-takeaways{background:#064e3b;border-radius:16px;padding:28px;margin:36px 0;color:#fff}
.key-takeaways h3{font-size:18px;font-weight:800;margin-bottom:16px;color:#6ee7b7}
.kt-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.kt-list li{display:flex;gap:10px;font-size:14px;line-height:1.55;color:#d1fae5}
.kt-list li::before{content:'→';color:#34d399;font-weight:700;flex-shrink:0}
.cta-box{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:14px;padding:28px;text-align:center;margin-top:32px}
.cta-box h3{font-size:18px;font-weight:700;color:#064e3b;margin-bottom:8px}
.cta-box p{font-size:14px;color:#4b5563;margin-bottom:16px}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border-radius:10px;padding:12px 24px;font-weight:700;text-decoration:none}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:4px 12px;font-size:13px}
</style></head>
<body>
<div class="hero-banner">
  <div class="cat-badge">🎙️ Phỏng vấn độc quyền · Khởi nghiệp</div>
  <h1>"Tôi đã thất bại 2 startup trước khi xây dựng được công ty 50 tỷ" — Lê Minh Hiếu, CEO TechViet</h1>
  <div class="hero-meta"><span>📅 28/05/2026</span><span>⏱ 8 phút đọc</span><span>👁 28.3K lượt xem</span></div>
</div>
<div class="content">
  <div class="subject-card">
    <div class="subject-avatar">👨‍💼</div>
    <div class="subject-info">
      <h2>Lê Minh Hiếu</h2>
      <div class="subject-title">CEO &amp; Co-founder · TechViet Solutions</div>
      <div class="subject-bio">Serial entrepreneur với 12 năm kinh nghiệm. Đã sáng lập 3 startup, trong đó có 2 thất bại và 1 thành công vang dội. TechViet Solutions hiện phục vụ 500+ doanh nghiệp SME tại Việt Nam với doanh thu 50 tỷ/năm.</div>
      <div class="subject-badges"><span class="subject-badge">12 năm KN</span><span class="subject-badge">3 startup</span><span class="subject-badge">Forbes 30 Under 30 2023</span></div>
    </div>
  </div>
  <p class="intro-text">Lê Minh Hiếu không phải là founder may mắn. Anh đã trải qua 2 lần thất bại nặng nề trước khi tìm ra công thức đúng. Cuộc trò chuyện dưới đây là những chia sẻ thẳng thắn nhất anh từng nói về hành trình đó.</p>

  <div class="qa-block">
    <div class="question"><div class="q-label">Q</div><div class="q-text">Anh có thể kể về 2 lần thất bại trước khi có TechViet không? Anh học được gì từ những thất bại đó?</div></div>
    <div class="answer"><div class="a-label">A</div><div class="a-content"><p>Startup đầu tiên là một app giao đồ ăn — năm 2015, trước cả GrabFood và Now. Chúng tôi không sai về ý tưởng nhưng sai về timing và nguồn lực. Cháy tiền sau 8 tháng, không có khách hàng đủ để duy trì.</p><p>Startup thứ hai là nền tảng e-learning — thất bại vì team không phù hợp. Tôi làm việc với người giỏi kỹ thuật nhưng không ai hiểu sales và marketing. Chúng tôi xây sản phẩm rất tốt nhưng không ai biết đến.</p><p>Bài học lớn nhất: thất bại không phải là kết thúc — nó là dữ liệu đắt giá nhất bạn có thể có. Mỗi lần thất bại tôi đều viết một "post-mortem" 10 trang phân tích nguyên nhân. Đó là tài liệu quan trọng nhất tôi mang vào TechViet.</p></div></div>
  </div>
  <div class="pull-quote"><blockquote>"Thất bại không phải là kết thúc — nó là dữ liệu đắt giá nhất bạn có thể có."</blockquote></div>
  <hr class="divider">
  <div class="qa-block">
    <div class="question"><div class="q-label">Q</div><div class="q-text">Điều gì khác biệt khiến TechViet thành công trong khi 2 startup trước thất bại?</div></div>
    <div class="answer"><div class="a-label">A</div><div class="a-content"><p>Ba điều. Thứ nhất, tôi không bắt đầu bằng sản phẩm — tôi bắt đầu bằng 50 cuộc trò chuyện với khách hàng tiềm năng trong 3 tháng trước khi viết một dòng code. Tôi hiểu pain point thật sự trước khi build solution.</p><p>Thứ hai, tôi build team đầu tiên là người bán hàng, không phải kỹ thuật. TechViet có customer đầu tiên trả tiền trước khi có sản phẩm hoàn chỉnh. Revenue-first mentality hoàn toàn thay đổi cách startup vận hành.</p><p>Thứ ba, tôi chấp nhận tốc độ tăng trưởng chậm hơn để tăng trưởng bền vững. Chúng tôi không raise vốn trong 2 năm đầu — điều đó buộc chúng tôi phải profitable từ sớm.</p></div></div>
  </div>
  <hr class="divider">
  <div class="qa-block">
    <div class="question"><div class="q-label">Q</div><div class="q-text">Lời khuyên của anh cho những bạn trẻ đang muốn khởi nghiệp nhưng sợ thất bại?</div></div>
    <div class="answer"><div class="a-label">A</div><div class="a-content"><p>Hãy sợ một điều khác — sợ không thử. Thất bại có thể học hỏi và phục hồi được. Nhưng không bao giờ thử thì không bao giờ biết mình có thể làm được gì.</p><p>Và hãy bắt đầu nhỏ — validate idea với ít tiền nhất có thể. Không cần quit job ngay, không cần raise vốn triệu đô trước khi có 1 customer trả tiền. Làm nhỏ, học nhanh, scale sau khi biết chắc works.</p></div></div>
  </div>
  <div class="key-takeaways"><h3>💡 Điểm cốt lõi từ cuộc trò chuyện</h3><ul class="kt-list"><li>Nói chuyện với 50 khách hàng tiềm năng trước khi viết một dòng code</li><li>Hire sales/marketing trước khi hire kỹ thuật — revenue-first mentality</li><li>Viết post-mortem sau mỗi thất bại để học một cách hệ thống</li><li>Profitable trước khi raise vốn — tránh áp lực từ investor</li><li>Thất bại là dữ liệu, không phải kết thúc</li></ul></div>
  <div class="cta-box"><h3>Đọc thêm phỏng vấn CEO và founder Việt Nam</h3><p>Subscribe nhận email hàng tuần với những câu chuyện khởi nghiệp truyền cảm hứng.</p><a href="#">📬 Subscribe miễn phí →</a></div>
  <div class="tags"><span class="tag">Khởi nghiệp</span><span class="tag">Startup</span><span class="tag">CEO</span><span class="tag">Phỏng vấn</span><span class="tag">Kinh doanh</span></div>
</div>
</body></html>`

const ARTICLE_HOWTO = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b}
.hero-banner{background:linear-gradient(135deg,#0c4a6e,#0369a1);padding:60px 24px;text-align:center}
.cat-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(125,211,252,.15);border:1px solid rgba(125,211,252,.3);color:#7dd3fc;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:18px}
.hero-banner h1{font-size:clamp(24px,4vw,40px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:12px;max-width:680px;margin-left:auto;margin-right:auto}
.hero-meta{display:flex;gap:20px;justify-content:center;font-size:13px;color:#7dd3fc;flex-wrap:wrap}
.content{max-width:760px;margin:0 auto;padding:48px 24px}
.difficulty-bar{display:flex;gap:12px;align-items:center;background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:16px 20px;margin-bottom:32px;flex-wrap:wrap}
.diff-item{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#0369a1}
.diff-divider{color:#bae6fd;font-size:18px}
.intro{font-size:17px;color:#374151;line-height:1.8;margin-bottom:28px}
.prereq-box{background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px 24px;margin-bottom:32px}
.prereq-box h3{font-size:14px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.prereq-list{list-style:none;display:flex;flex-direction:column;gap:6px}
.prereq-list li{font-size:14px;color:#78350f;display:flex;gap:8px;align-items:flex-start}
.prereq-list li::before{content:'•';color:#fbbf24;font-size:18px;line-height:1;flex-shrink:0}
.step-section{margin-bottom:40px}
.step-header{display:flex;gap:16px;align-items:center;margin-bottom:16px}
.step-badge{width:48px;height:48px;background:linear-gradient(135deg,#0369a1,#0284c7);color:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;flex-shrink:0}
.step-header-text h2{font-size:20px;font-weight:800;color:#0c4a6e;margin-bottom:2px}
.step-header-text .est{font-size:12px;color:#94a3b8}
.step-body p{font-size:15px;color:#374151;line-height:1.8;margin-bottom:14px}
.code-block{background:#0f172a;border-radius:10px;padding:20px 22px;margin:16px 0;overflow-x:auto}
.code-block code{color:#7dd3fc;font-family:'Courier New',monospace;font-size:14px;line-height:1.7;white-space:pre}
.code-block .comment{color:#475569}
.code-block .keyword{color:#c084fc}
.code-block .string{color:#86efac}
.tip-box{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;margin:16px 0;display:flex;gap:10px}
.tip-box .tip-icon{font-size:20px;flex-shrink:0}
.tip-box .tip-label{font-size:12px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.tip-box p{font-size:14px;color:#166534;margin:0;line-height:1.6}
.warn-box{background:#fef3c7;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin:16px 0;display:flex;gap:10px}
.warn-box .warn-icon{font-size:20px;flex-shrink:0}
.warn-box p{font-size:14px;color:#92400e;margin:0;line-height:1.6}
.step-divider{border:none;border-top:2px dashed #bae6fd;margin:32px 0}
.result-box{background:linear-gradient(135deg,#0c4a6e,#0369a1);border-radius:16px;padding:28px;color:#fff;text-align:center;margin:36px 0}
.result-box .icon{font-size:48px;margin-bottom:12px}
.result-box h3{font-size:20px;font-weight:800;margin-bottom:8px}
.result-box p{color:#bae6fd;font-size:15px;line-height:1.6}
.cta-box{background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:28px;text-align:center;margin-top:32px}
.cta-box h3{font-size:18px;font-weight:700;color:#0c4a6e;margin-bottom:8px}
.cta-box p{font-size:14px;color:#4b5563;margin-bottom:16px}
.cta-box a{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0369a1,#0284c7);color:#fff;border-radius:10px;padding:12px 24px;font-weight:700;text-decoration:none}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0}
.tag{background:#f1f5f9;color:#64748b;border-radius:6px;padding:4px 12px;font-size:13px}
</style></head>
<body>
<div class="hero-banner">
  <div class="cat-badge">⚙️ Hướng dẫn kỹ thuật · Next.js · API</div>
  <h1>Cách tích hợp Claude AI API vào ứng dụng Next.js 15 — Hướng dẫn từng bước cho người mới</h1>
  <div class="hero-meta"><span>👤 Trần Đức Anh · Full-stack Developer</span><span>📅 28/05/2026</span><span>⏱ 12 phút đọc</span></div>
</div>
<div class="content">
  <div class="difficulty-bar">
    <div class="diff-item">🎯 Độ khó: Trung bình</div>
    <span class="diff-divider">·</span>
    <div class="diff-item">⏱ Thời gian: 30–45 phút</div>
    <span class="diff-divider">·</span>
    <div class="diff-item">🔄 Cập nhật: 05/2026</div>
    <span class="diff-divider">·</span>
    <div class="diff-item">✅ Đã test: Next.js 15.3</div>
  </div>
  <p class="intro">Trong bài này, tôi sẽ hướng dẫn bạn tích hợp Claude AI API (Anthropic) vào ứng dụng Next.js 15 — từ cài đặt SDK, tạo API route, đến streaming response để tạo chatbot real-time. Bạn sẽ có một chatbot hoạt động đầy đủ sau khi đọc xong.</p>
  <div class="prereq-box">
    <h3>📋 Yêu cầu trước khi bắt đầu</h3>
    <ul class="prereq-list">
      <li>Node.js 18+ và npm/yarn đã cài trên máy</li>
      <li>Kiến thức cơ bản về React và Next.js App Router</li>
      <li>API key từ Anthropic Console (console.anthropic.com) — có free tier để test</li>
      <li>Dự án Next.js 15 có sẵn hoặc tạo mới bằng <code>npx create-next-app@latest</code></li>
    </ul>
  </div>

  <div class="step-section">
    <div class="step-header">
      <div class="step-badge">1</div>
      <div class="step-header-text"><h2>Cài đặt Anthropic SDK</h2><div class="est">⏱ ~2 phút</div></div>
    </div>
    <div class="step-body">
      <p>Đầu tiên, cài đặt SDK chính thức của Anthropic vào dự án Next.js của bạn:</p>
      <div class="code-block"><code><span class="comment"># Dùng npm</span>
npm install @anthropic-ai/sdk

<span class="comment"># Hoặc yarn</span>
yarn add @anthropic-ai/sdk</code></div>
      <p>Tiếp theo, thêm API key vào file <code>.env.local</code> ở thư mục gốc dự án:</p>
      <div class="code-block"><code><span class="comment"># .env.local — KHÔNG commit file này lên git!</span>
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx</code></div>
      <div class="tip-box"><div class="tip-icon">💡</div><div><div class="tip-label">Mẹo bảo mật</div><p>Đảm bảo <code>.env.local</code> đã có trong <code>.gitignore</code>. API key bị lộ sẽ bị charge tiền bởi người khác.</p></div></div>
    </div>
  </div>
  <hr class="step-divider">

  <div class="step-section">
    <div class="step-header">
      <div class="step-badge">2</div>
      <div class="step-header-text"><h2>Tạo API Route để gọi Claude</h2><div class="est">⏱ ~10 phút</div></div>
    </div>
    <div class="step-body">
      <p>Tạo file <code>app/api/chat/route.ts</code> — đây là API endpoint nhận message từ frontend và gửi đến Claude:</p>
      <div class="code-block"><code><span class="keyword">import</span> Anthropic <span class="keyword">from</span> <span class="string">'@anthropic-ai/sdk'</span>
<span class="keyword">import</span> { NextResponse } <span class="keyword">from</span> <span class="string">'next/server'</span>

<span class="keyword">const</span> client = <span class="keyword">new</span> Anthropic()

<span class="keyword">export async function</span> POST(req: Request) {
  <span class="keyword">const</span> { message } = <span class="keyword">await</span> req.json()

  <span class="keyword">const</span> response = <span class="keyword">await</span> client.messages.create({
    model: <span class="string">'claude-sonnet-4-6'</span>,
    max_tokens: 1024,
    messages: [{ role: <span class="string">'user'</span>, content: message }],
  })

  <span class="keyword">return</span> NextResponse.json({
    reply: response.content[0].text
  })
}</code></div>
      <div class="warn-box"><div class="warn-icon">⚠️</div><p>Không bao giờ gọi Anthropic SDK trực tiếp từ client-side — API key sẽ bị lộ trong browser. Luôn đi qua API Route.</p></div>
    </div>
  </div>
  <hr class="step-divider">

  <div class="step-section">
    <div class="step-header">
      <div class="step-badge">3</div>
      <div class="step-header-text"><h2>Xây dựng UI Chatbot phía frontend</h2><div class="est">⏱ ~15 phút</div></div>
    </div>
    <div class="step-body">
      <p>Tạo component <code>components/Chatbot.tsx</code> để gọi API và hiển thị conversation:</p>
      <div class="code-block"><code><span class="string">'use client'</span>
<span class="keyword">import</span> { useState } <span class="keyword">from</span> <span class="string">'react'</span>

<span class="keyword">export default function</span> Chatbot() {
  <span class="keyword">const</span> [input, setInput] = useState(<span class="string">''</span>)
  <span class="keyword">const</span> [messages, setMessages] = useState([])
  <span class="keyword">const</span> [loading, setLoading] = useState(<span class="keyword">false</span>)

  <span class="keyword">async function</span> sendMessage() {
    <span class="keyword">if</span> (!input.trim()) <span class="keyword">return</span>
    setLoading(<span class="keyword">true</span>)
    <span class="keyword">const</span> res = <span class="keyword">await</span> fetch(<span class="string">'/api/chat'</span>, {
      method: <span class="string">'POST'</span>,
      body: JSON.stringify({ message: input }),
      headers: { <span class="string">'Content-Type'</span>: <span class="string">'application/json'</span> },
    })
    <span class="keyword">const</span> data = <span class="keyword">await</span> res.json()
    setMessages(prev => [...prev,
      { role: <span class="string">'user'</span>, text: input },
      { role: <span class="string">'ai'</span>, text: data.reply }
    ])
    setInput(<span class="string">''</span>)
    setLoading(<span class="keyword">false</span>)
  }
  <span class="comment">// ... render UI</span>
}</code></div>
      <div class="tip-box"><div class="tip-icon">🚀</div><div><div class="tip-label">Nâng cao</div><p>Thêm streaming response bằng cách dùng <code>stream: true</code> trong Anthropic SDK và <code>ReadableStream</code> trong API Route để hiển thị chữ xuất hiện từng từ như ChatGPT.</p></div></div>
    </div>
  </div>

  <div class="result-box"><div class="icon">✅</div><h3>Kết quả: Chatbot Claude hoạt động trong Next.js!</h3><p>Giờ bạn có chatbot AI tích hợp Claude đầy đủ — nhận câu hỏi, gọi API, hiển thị câu trả lời. Bước tiếp theo: thêm conversation history, system prompt và streaming.</p></div>
  <div class="cta-box"><h3>Muốn tạo content với AI nhanh hơn?</h3><p>Thử AIContentBooster — công cụ viết content AI tối ưu cho thị trường Việt Nam, không cần code.</p><a href="#">🚀 Dùng thử miễn phí →</a></div>
  <div class="tags"><span class="tag">Next.js</span><span class="tag">Claude AI</span><span class="tag">API</span><span class="tag">Hướng dẫn</span><span class="tag">React</span></div>
</div>
</body></html>`

const ADS_SUPPLEMENT = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f0fdf4;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;border-radius:24px;overflow:hidden;max-width:640px;width:100%;box-shadow:0 8px 40px rgba(5,150,105,.12)}
.ad-header{background:linear-gradient(135deg,#064e3b,#059669);padding:36px 28px;text-align:center;position:relative;overflow:hidden}
.ad-header::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(255,255,255,.07);border-radius:50%}
.cert-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);color:#fff;border-radius:999px;padding:5px 16px;font-size:11px;font-weight:700;margin-bottom:18px}
.product-icon{font-size:72px;margin-bottom:10px;display:block;position:relative}
.product-name{font-size:28px;font-weight:900;color:#fff;margin-bottom:6px;position:relative}
.product-sub{font-size:14px;color:#a7f3d0;position:relative}
.body{padding:28px 28px 20px}
.claim-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
.claim{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:12px;padding:14px;text-align:center}
.claim-num{font-size:24px;font-weight:900;color:#059669;margin-bottom:4px}
.claim-lbl{font-size:11px;color:#4b5563;line-height:1.3}
.ingredients-title{font-size:14px;font-weight:700;color:#064e3b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.ingredient-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.ingredient{display:flex;align-items:center;gap:12px}
.ing-icon{font-size:24px;flex-shrink:0}
.ing-name{font-size:14px;font-weight:700;color:#064e3b}
.ing-desc{font-size:12px;color:#64748b;line-height:1.4}
.before-after{background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #a7f3d0;border-radius:14px;padding:18px 20px;margin-bottom:22px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.ba-label{font-size:12px;font-weight:700;color:#064e3b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.ba-val{font-size:22px;font-weight:900;color:#059669}
.ba-period{font-size:11px;color:#6b7280;margin-top:2px}
.ba-arrow{font-size:28px;color:#a7f3d0}
.price-section{background:#f0fdf4;border-radius:14px;padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.price-old{font-size:14px;color:#9ca3af;text-decoration:line-through}
.price-new{font-size:38px;font-weight:900;color:#064e3b}
.price-saving{background:#059669;color:#fff;border-radius:8px;padding:4px 12px;font-size:12px;font-weight:700}
.cta-btn{display:block;background:linear-gradient(135deg,#059669,#047857);color:#fff;border-radius:14px;padding:17px;text-align:center;font-size:17px;font-weight:800;text-decoration:none;margin-bottom:10px}
.trust-row{display:flex;justify-content:center;gap:16px;font-size:12px;color:#6b7280;flex-wrap:wrap}
</style></head>
<body>
<div class="ad">
  <div class="ad-header">
    <div class="cert-badge">🏥 Được Bộ Y tế cấp phép · Clinically Tested</div>
    <span class="product-icon">💊</span>
    <div class="product-name">VitaCore Pro</div>
    <div class="product-sub">Bổ sung năng lượng · Tăng đề kháng · Chống lão hóa</div>
  </div>
  <div class="body">
    <div class="claim-grid">
      <div class="claim"><div class="claim-num">+74%</div><div class="claim-lbl">Năng lượng sau 2 tuần</div></div>
      <div class="claim"><div class="claim-num">3x</div><div class="claim-lbl">Tăng sức đề kháng</div></div>
      <div class="claim"><div class="claim-num">92%</div><div class="claim-lbl">Khách hàng hài lòng</div></div>
    </div>
    <div class="ingredients-title">Thành phần vàng</div>
    <div class="ingredient-list">
      <div class="ingredient"><span class="ing-icon">🍀</span><div><div class="ing-name">Coenzyme Q10 200mg</div><div class="ing-desc">Tăng sản xuất ATP — nguồn năng lượng tế bào, chống mệt mỏi mãn tính</div></div></div>
      <div class="ingredient"><span class="ing-icon">🦠</span><div><div class="ing-name">Probiotics 10 tỷ CFU</div><div class="ing-desc">12 chủng vi khuẩn có lợi — tăng miễn dịch đường ruột, hấp thu dưỡng chất tốt hơn</div></div></div>
      <div class="ingredient"><span class="ing-icon">🌿</span><div><div class="ing-name">Resveratrol 150mg</div><div class="ing-desc">Chất chống oxy hóa mạnh từ nho đỏ — chống lão hóa tế bào, bảo vệ tim mạch</div></div></div>
    </div>
    <div class="before-after">
      <div><div class="ba-label">Trước</div><div class="ba-val">Mệt mỏi mãn tính</div><div class="ba-period">Trước khi dùng</div></div>
      <div class="ba-arrow">→</div>
      <div><div class="ba-label">Sau 30 ngày</div><div class="ba-val">Tràn đầy năng lượng</div><div class="ba-period">92% khách hàng xác nhận</div></div>
    </div>
    <div class="price-section">
      <div><div class="price-old">890.000đ</div><div class="price-new">590K</div></div>
      <div><div class="price-saving">TIẾT KIỆM 300K</div><div style="font-size:11px;color:#6b7280;margin-top:4px">Hộp 60 viên · Dùng 2 tháng</div></div>
    </div>
    <a href="#" class="cta-btn">🛒 Mua ngay — Chỉ còn 47 hộp</a>
    <div class="trust-row"><span>✅ Freeship toàn quốc</span><span>🔄 Hoàn tiền 30 ngày</span><span>🏥 Được cấp phép BYT</span></div>
  </div>
</div>
</body></html>`

const ADS_TRAVEL_BANNER = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.ad{background:#fff;border-radius:20px;overflow:hidden;max-width:680px;width:100%;box-shadow:0 8px 40px rgba(2,132,199,.12)}
.dest-hero{background:linear-gradient(160deg,#0c4a6e,#0369a1,#0891b2);padding:36px 28px;position:relative;overflow:hidden;text-align:center}
.dest-hero::before{content:'';position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(to top,#fff,transparent)}
.dest-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);color:#fff;border-radius:999px;padding:5px 16px;font-size:12px;font-weight:700;margin-bottom:16px}
.dest-icon{font-size:72px;margin-bottom:12px;display:block}
.dest-name{font-size:32px;font-weight:900;color:#fff;letter-spacing:-0.5px;margin-bottom:4px}
.dest-country{font-size:16px;color:#bae6fd;font-weight:600}
.body{padding:24px 24px 20px}
.tour-highlights{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
.hl{background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:12px;text-align:center}
.hl-icon{font-size:22px;margin-bottom:4px}
.hl-val{font-size:15px;font-weight:800;color:#0c4a6e}
.hl-lbl{font-size:11px;color:#64748b;margin-top:2px}
.itinerary-title{font-size:13px;font-weight:700;color:#0c4a6e;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.itinerary{display:flex;flex-direction:column;gap:8px;margin-bottom:22px}
.itin-row{display:flex;gap:12px;align-items:flex-start}
.itin-day{width:56px;background:#0369a1;color:#fff;border-radius:8px;padding:4px 8px;font-size:11px;font-weight:700;text-align:center;flex-shrink:0}
.itin-content{font-size:13px;color:#374151;line-height:1.4}
.itin-content strong{color:#0c4a6e}
.includes{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.include-badge{background:#eff6ff;color:#1d4ed8;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600}
.price-row{background:linear-gradient(135deg,#f0f9ff,#eff6ff);border-radius:14px;padding:18px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;gap:12px;flex-wrap:wrap}
.price-info .from{font-size:12px;color:#64748b}
.price-info .price{font-size:38px;font-weight:900;color:#0c4a6e;line-height:1}
.price-info .per{font-size:12px;color:#64748b}
.seats-box{text-align:right}
.seats-num{font-size:22px;font-weight:900;color:#ef4444}
.seats-lbl{font-size:11px;color:#64748b;margin-top:2px}
.cta-btn{display:block;background:linear-gradient(135deg,#0369a1,#0284c7);color:#fff;border-radius:12px;padding:16px;text-align:center;font-size:16px;font-weight:700;text-decoration:none;margin-bottom:10px}
.footer-row{display:flex;justify-content:center;gap:16px;font-size:12px;color:#6b7280;flex-wrap:wrap}
</style></head>
<body>
<div class="ad">
  <div class="dest-hero">
    <div class="dest-tag">✈️ Tour khởi hành tháng 7/2026 · Còn chỗ</div>
    <span class="dest-icon">🗼</span>
    <div class="dest-name">Paris · Pháp</div>
    <div class="dest-country">Tây Âu · Mùa hè</div>
  </div>
  <div class="body">
    <div class="tour-highlights">
      <div class="hl"><div class="hl-icon">🗓️</div><div class="hl-val">8N7Đ</div><div class="hl-lbl">Hành trình</div></div>
      <div class="hl"><div class="hl-icon">✈️</div><div class="hl-val">Bay thẳng</div><div class="hl-lbl">SGN–CDG</div></div>
      <div class="hl"><div class="hl-icon">🏨</div><div class="hl-val">4★ Central</div><div class="hl-lbl">Khách sạn</div></div>
    </div>
    <div class="itinerary-title">Điểm nổi bật hành trình</div>
    <div class="itinerary">
      <div class="itin-row"><div class="itin-day">N1–2</div><div class="itin-content"><strong>Paris</strong> — Tháp Eiffel, Louvre, Montmartre. Cruise sông Seine buổi tối.</div></div>
      <div class="itin-row"><div class="itin-day">N3–4</div><div class="itin-content"><strong>Versailles + Loire Valley</strong> — Cung điện Versailles, các lâu đài cổ.</div></div>
      <div class="itin-row"><div class="itin-day">N5–6</div><div class="itin-content"><strong>Nice + Monaco</strong> — Bờ biển Côte d'Azur, Monte Carlo casino.</div></div>
      <div class="itin-row"><div class="itin-day">N7–8</div><div class="itin-content"><strong>Paris</strong> — Mua sắm Champs-Élysées, tự do khám phá &amp; bay về.</div></div>
    </div>
    <div class="includes">
      <span class="include-badge">✈️ Vé máy bay khứ hồi</span>
      <span class="include-badge">🏨 8 đêm khách sạn 4★</span>
      <span class="include-badge">🚌 Xe bus riêng</span>
      <span class="include-badge">🍽️ Ăn sáng daily</span>
      <span class="include-badge">🎫 Vé tham quan</span>
      <span class="include-badge">👨‍✈️ HDV tiếng Việt</span>
    </div>
    <div class="price-row">
      <div class="price-info"><div class="from">Giá trọn gói từ</div><div class="price">42,9 triệu</div><div class="per">/người · 2 người đi cùng</div></div>
      <div class="seats-box"><div class="seats-num">8 chỗ</div><div class="seats-lbl">Còn lại · KH: 15/07</div></div>
    </div>
    <a href="#" class="cta-btn">📞 Đặt ngay — Giữ chỗ với 5 triệu</a>
    <div class="footer-row"><span>🛡️ Hoàn tiền 100% nếu hủy trước 30 ngày</span><span>📋 Hỗ trợ visa trọn gói</span></div>
  </div>
</div>
</body></html>`

const LP_REALESTATE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#07090f;color:#e8e0d0}
.hero{background:linear-gradient(160deg,#07090f 0%,#0f1626 50%,#07090f 100%);padding:110px 24px 90px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(212,168,83,.08) 0%,transparent 65%)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(212,168,83,.12);border:1px solid rgba(212,168,83,.35);color:#d4a853;border-radius:4px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px}
.hero h1{font-size:clamp(36px,6vw,68px);font-weight:900;line-height:1.1;margin-bottom:20px;letter-spacing:-1px}
.hero h1 .gold{background:linear-gradient(135deg,#d4a853,#f0d080);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#8b949e;max-width:580px;margin:0 auto 40px;line-height:1.8}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
.btn-gold{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#d4a853,#b8892e);color:#07090f;border-radius:6px;padding:17px 38px;font-size:16px;font-weight:800;text-decoration:none}
.btn-out{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(212,168,83,.4);color:#d4a853;border-radius:6px;padding:15px 28px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#6b7280}
.stats-bar{background:rgba(212,168,83,.06);border-top:1px solid rgba(212,168,83,.15);border-bottom:1px solid rgba(212,168,83,.15);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:20px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:38px;font-weight:900;background:linear-gradient(135deg,#d4a853,#f0d080);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-l{font-size:12px;color:#8b949e;margin-top:4px;letter-spacing:.5px}
.sec-label{color:#d4a853;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:36px;font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-.5px}
.sec-sub{text-align:center;font-size:15px;color:#8b949e;margin-bottom:50px;line-height:1.7}
.projects{padding:90px 24px;background:#07090f}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;max-width:1060px;margin:0 auto}
.proj-card{border:1px solid rgba(212,168,83,.15);border-radius:12px;overflow:hidden;background:#0d1117}
.proj-img{height:200px;display:flex;align-items:center;justify-content:center;font-size:60px;position:relative}
.proj-img.p1{background:linear-gradient(135deg,#1a2744,#0d1b38)}
.proj-img.p2{background:linear-gradient(135deg,#1a3a20,#0d2b15)}
.proj-img.p3{background:linear-gradient(135deg,#3a1a0d,#2b1208)}
.proj-badge{position:absolute;top:14px;left:14px;background:linear-gradient(135deg,#d4a853,#b8892e);color:#07090f;border-radius:4px;padding:4px 12px;font-size:11px;font-weight:800}
.proj-body{padding:24px}
.proj-name{font-size:20px;font-weight:800;margin-bottom:6px}
.proj-loc{font-size:13px;color:#d4a853;font-weight:600;margin-bottom:12px}
.proj-specs{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.proj-spec{background:rgba(212,168,83,.08);border:1px solid rgba(212,168,83,.15);border-radius:4px;padding:4px 10px;font-size:12px;color:#c9b572}
.proj-price{font-size:22px;font-weight:900;color:#d4a853;margin-bottom:4px}
.proj-price-note{font-size:12px;color:#6b7280}
.amenities{padding:90px 24px;background:#0a0d14}
.amen-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.amen-card{border:1px solid rgba(212,168,83,.1);border-radius:10px;padding:28px;background:#0d1117;text-align:center}
.amen-icon{font-size:40px;margin-bottom:14px;display:block}
.amen-name{font-size:16px;font-weight:700;margin-bottom:8px}
.amen-desc{font-size:13px;color:#8b949e;line-height:1.65}
.progress{padding:90px 24px;background:#07090f}
.prog-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:0}
.prog-item{display:flex;gap:24px;padding:28px 0;border-bottom:1px solid rgba(212,168,83,.08)}
.prog-item:last-child{border:none}
.prog-dot{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;font-weight:900}
.prog-dot.done{background:linear-gradient(135deg,#d4a853,#b8892e);color:#07090f}
.prog-dot.inprog{background:rgba(212,168,83,.15);border:2px solid #d4a853;color:#d4a853}
.prog-dot.soon{background:rgba(255,255,255,.05);border:2px solid rgba(212,168,83,.2);color:#6b7280}
.prog-info h3{font-size:17px;font-weight:700;margin-bottom:5px}
.prog-info p{font-size:13px;color:#8b949e;line-height:1.6}
.prog-tag{display:inline-flex;border-radius:4px;padding:3px 10px;font-size:11px;font-weight:700;margin-top:6px}
.tag-done{background:rgba(212,168,83,.15);color:#d4a853}
.tag-inprog{background:rgba(34,197,94,.1);color:#4ade80}
.tag-soon{background:rgba(255,255,255,.06);color:#6b7280}
.team{padding:90px 24px;background:#0a0d14}
.team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px;max-width:960px;margin:0 auto}
.team-card{background:#0d1117;border:1px solid rgba(212,168,83,.12);border-radius:12px;padding:28px;text-align:center}
.team-av{width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#d4a853,#8b5e1a);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 16px}
.team-name{font-size:18px;font-weight:800;margin-bottom:4px}
.team-role{font-size:13px;color:#d4a853;font-weight:600;margin-bottom:10px}
.team-bio{font-size:13px;color:#8b949e;line-height:1.6}
.testi{padding:90px 24px;background:linear-gradient(135deg,#0d1117,#07090f)}
.testi .sec-title{color:#e8e0d0}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:rgba(212,168,83,.05);border:1px solid rgba(212,168,83,.12);border-radius:12px;padding:28px}
.testi-stars{color:#d4a853;font-size:17px;margin-bottom:12px}
.testi-q{font-size:15px;color:#c8bfa8;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;background:rgba(212,168,83,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#d4a853}
.testi-name{font-size:14px;font-weight:700}
.testi-src{font-size:12px;color:#d4a853}
.booking{padding:90px 24px;background:#0f1626;text-align:center}
.booking-form{background:#0d1117;border:1px solid rgba(212,168,83,.15);border-radius:16px;padding:48px;max-width:640px;margin:0 auto}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.form-row-1{margin-bottom:16px}
.form-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(212,168,83,.2);border-radius:8px;padding:14px 16px;color:#e8e0d0;font-size:15px;outline:none}
.form-input::placeholder{color:#4b5563}
.form-select{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(212,168,83,.2);border-radius:8px;padding:14px 16px;color:#e8e0d0;font-size:15px;outline:none}
.form-btn{width:100%;background:linear-gradient(135deg,#d4a853,#b8892e);color:#07090f;border:none;border-radius:8px;padding:17px;font-size:16px;font-weight:800;cursor:pointer;margin-top:8px}
.form-note{font-size:12px;color:#6b7280;margin-top:12px;line-height:1.6}
.faq{padding:90px 24px;background:#07090f}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#0d1117;border:1px solid rgba(212,168,83,.1);border-radius:10px;padding:24px}
.faq-q{font-weight:700;color:#d4a853;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#8b949e;line-height:1.75}
.footer{background:#050709;border-top:1px solid rgba(212,168,83,.1);padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;letter-spacing:1px;margin-bottom:6px}
.footer-brand span{background:linear-gradient(135deg,#d4a853,#f0d080);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.footer-tagline{font-size:13px;color:#6b7280}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#8b949e;text-decoration:none;font-size:14px}
.footer-bottom{background:#050709;border-top:1px solid rgba(255,255,255,.04);text-align:center;padding:16px 24px;font-size:12px;color:#4b5563}
@media(max-width:640px){.form-row{grid-template-columns:1fr}.hero h1{font-size:36px}}
</style></head>
<body>

<section class="hero">
  <div class="badge">🏆 Chủ đầu tư uy tín top 5 Việt Nam · 15 năm phát triển</div>
  <h1>Nơi cuộc sống<br><span class="gold">chạm tới đỉnh cao</span></h1>
  <p>Các dự án bất động sản cao cấp tại vị trí đắc địa nhất TP.HCM — thiết kế bởi kiến trúc sư quốc tế, vận hành bởi đơn vị quản lý 5 sao.</p>
  <div class="hero-btns">
    <a href="#" class="btn-gold">🏠 Xem nhà mẫu — Đặt lịch ngay</a>
    <a href="#" class="btn-out">📋 Tải brochure</a>
  </div>
  <p class="hero-note">Tư vấn miễn phí · Hỗ trợ vay 70% · Thanh toán linh hoạt 48 tháng</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">15+</div><div class="stat-l">Năm phát triển</div></div>
    <div><div class="stat-n">12</div><div class="stat-l">Dự án đã bàn giao</div></div>
    <div><div class="stat-n">8.500+</div><div class="stat-l">Cư dân hài lòng</div></div>
    <div><div class="stat-n">4.8★</div><div class="stat-l">Đánh giá chất lượng</div></div>
    <div><div class="stat-n">98%</div><div class="stat-l">Bàn giao đúng tiến độ</div></div>
  </div>
</div>

<section class="projects">
  <div class="sec-label">Dự án nổi bật</div>
  <h2 class="sec-title">Những công trình định nghĩa lại<br>tiêu chuẩn sống đẳng cấp</h2>
  <p class="sec-sub">Mỗi dự án là một tuyên ngôn về kiến trúc, chất lượng và phong cách sống hiện đại</p>
  <div class="proj-grid">
    <div class="proj-card">
      <div class="proj-img p1"><span>🏙️</span><span class="proj-badge">Đang mở bán</span></div>
      <div class="proj-body">
        <div class="proj-name">The Pinnacle Residences</div>
        <div class="proj-loc">📍 Quận 1, TP.HCM · Tầm nhìn sông Sài Gòn</div>
        <div class="proj-specs"><span class="proj-spec">65 tầng</span><span class="proj-spec">420 căn</span><span class="proj-spec">2–4 PN</span><span class="proj-spec">58–180m²</span></div>
        <div class="proj-price">Từ 8,5 tỷ / căn</div>
        <div class="proj-price-note">Hỗ trợ vay 70% · Lãi suất 0% 18 tháng đầu</div>
      </div>
    </div>
    <div class="proj-card">
      <div class="proj-img p2"><span>🌿</span><span class="proj-badge">Sắp ra mắt</span></div>
      <div class="proj-body">
        <div class="proj-name">GreenValley Golf Villas</div>
        <div class="proj-loc">📍 Long An · Biệt thự sân golf 36 lỗ</div>
        <div class="proj-specs"><span class="proj-spec">240 biệt thự</span><span class="proj-spec">300–600m²</span><span class="proj-spec">Pool villa</span></div>
        <div class="proj-price">Từ 15 tỷ / căn</div>
        <div class="proj-price-note">Cam kết thuê lại 6%/năm trong 5 năm</div>
      </div>
    </div>
    <div class="proj-card">
      <div class="proj-img p3"><span>🌅</span><span class="proj-badge">Bàn giao Q3/2026</span></div>
      <div class="proj-body">
        <div class="proj-name">SunHarbour Beach Resort</div>
        <div class="proj-loc">📍 Vũng Tàu · Mặt tiền biển 120m</div>
        <div class="proj-specs"><span class="proj-spec">180 căn hộ</span><span class="proj-spec">45–95m²</span><span class="proj-spec">Condotel</span></div>
        <div class="proj-price">Từ 3,2 tỷ / căn</div>
        <div class="proj-price-note">Cam kết lợi nhuận 8%/năm · Full nội thất</div>
      </div>
    </div>
  </div>
</section>

<section class="amenities">
  <div class="sec-label">Tiện ích nội khu</div>
  <h2 class="sec-title">Trải nghiệm resort<br>ngay trong khu dân cư</h2>
  <p class="sec-sub">Hơn 50 tiện ích cao cấp được thiết kế để mang lại cuộc sống đẳng cấp nhất</p>
  <div class="amen-grid">
    <div class="amen-card"><span class="amen-icon">🏊</span><div class="amen-name">Bể bơi vô cực 50m</div><div class="amen-desc">Bể bơi tràn bờ tầng thượng với tầm nhìn toàn cảnh thành phố, khu sunbed và bar nước.</div></div>
    <div class="amen-card"><span class="amen-icon">🏋️</span><div class="amen-name">Sky Fitness Club</div><div class="amen-desc">Phòng gym 800m² trang bị thiết bị Technogym cao cấp, yoga studio và phòng spa riêng.</div></div>
    <div class="amen-card"><span class="amen-icon">🌳</span><div class="amen-name">Công viên nội khu 2ha</div><div class="amen-desc">Khuôn viên xanh 2 hecta với cây cổ thụ, hồ cá Koi, sân chơi trẻ em và đường đi bộ.</div></div>
    <div class="amen-card"><span class="amen-icon">🍽️</span><div class="amen-name">Sky Lounge & Restaurant</div><div class="amen-desc">Nhà hàng cao cấp tầng 60 với menu quốc tế, wine bar và không gian tổ chức sự kiện private.</div></div>
    <div class="amen-card"><span class="amen-icon">🏫</span><div class="amen-name">Trường học liên cấp</div><div class="amen-desc">Trường mầm non, tiểu học và THCS ngay trong khu — chuẩn quốc tế, học phí ưu đãi cư dân.</div></div>
    <div class="amen-card"><span class="amen-icon">🚗</span><div class="amen-name">Bãi xe thông minh 3 tầng</div><div class="amen-desc">Hệ thống đỗ xe tự động, trạm sạc xe điện, camera AI 24/7 và bảo vệ chuyên nghiệp.</div></div>
    <div class="amen-card"><span class="amen-icon">🏥</span><div class="amen-name">Phòng khám đa khoa</div><div class="amen-desc">Phòng khám nội khu với bác sĩ thường trực, cấp cứu 24/7 và dịch vụ khám tại nhà.</div></div>
    <div class="amen-card"><span class="amen-icon">🛒</span><div class="amen-name">Trung tâm thương mại</div><div class="amen-desc">Shophouse và trung tâm mua sắm 15.000m² với siêu thị, rạp phim, nhà hàng và café.</div></div>
  </div>
</section>

<section class="progress">
  <div class="sec-label">Tiến độ xây dựng</div>
  <h2 class="sec-title">Minh bạch — Đúng hẹn<br>Đúng cam kết</h2>
  <p class="sec-sub">Cập nhật tiến độ hàng tháng với hình ảnh thực tế trực tiếp từ công trường</p>
  <div class="prog-list">
    <div class="prog-item"><div class="prog-dot done">✓</div><div class="prog-info"><h3>Hoàn thành móng & tầng hầm (T10/2024)</h3><p>Thi công xong toàn bộ hệ thống móng cọc khoan nhồi và 3 tầng hầm. Đạt tiêu chuẩn chịu lực 8.0 độ Richter.</p><span class="prog-tag tag-done">✅ Hoàn thành</span></div></div>
    <div class="prog-item"><div class="prog-dot done">✓</div><div class="prog-info"><h3>Thân tầng 1–30 (T4/2025)</h3><p>Đổ sàn và dựng tường toàn bộ 30 tầng dưới. Vượt tiến độ 2 tuần so với kế hoạch ban đầu.</p><span class="prog-tag tag-done">✅ Hoàn thành</span></div></div>
    <div class="prog-item"><div class="prog-dot inprog">⚡</div><div class="prog-info"><h3>Thân tầng 31–65 (T6–T12/2025)</h3><p>Đang thi công tầng 44. Lắp đặt hệ thống M&E, chống thấm và kính mặt dựng curtain wall toàn tòa.</p><span class="prog-tag tag-inprog">🔧 Đang thi công</span></div></div>
    <div class="prog-item"><div class="prog-dot soon">→</div><div class="prog-info"><h3>Hoàn thiện nội thất & cảnh quan (Q1/2026)</h3><p>Lắp đặt nội thất bàn giao, hoàn thiện sảnh, hành lang và toàn bộ tiện ích nội khu.</p><span class="prog-tag tag-soon">⏳ Sắp thực hiện</span></div></div>
    <div class="prog-item"><div class="prog-dot soon">🏠</div><div class="prog-info"><h3>Bàn giao căn hộ (Q3/2026)</h3><p>Bàn giao đúng tiến độ cam kết. Hỗ trợ đội ngũ thiết kế nội thất và chuyển dọn miễn phí cho cư dân.</p><span class="prog-tag tag-soon">📅 Q3/2026</span></div></div>
  </div>
</section>

<section class="team">
  <div class="sec-label">Đội ngũ phát triển</div>
  <h2 class="sec-title">Những chuyên gia định hình<br>bất động sản hạng sang</h2>
  <p class="sec-sub">Kết hợp giữa tầm nhìn chiến lược và chuyên môn kỹ thuật đỉnh cao</p>
  <div class="team-grid">
    <div class="team-card"><div class="team-av">👔</div><div class="team-name">Nguyễn Hoàng Minh</div><div class="team-role">Tổng Giám Đốc</div><div class="team-bio">30 năm kinh nghiệm BĐS cao cấp. Từng lãnh đạo dự án tổng trị giá hơn 2 tỷ USD tại VN và Singapore.</div></div>
    <div class="team-card"><div class="team-av">🏗️</div><div class="team-name">KTS. Trần Bảo Long</div><div class="team-role">Trưởng phòng Kiến trúc</div><div class="team-bio">Tốt nghiệp Harvard GSD. Thiết kế chính cho 6 dự án đoạt giải thưởng kiến trúc ASEAN.</div></div>
    <div class="team-card"><div class="team-av">📊</div><div class="team-name">Phạm Thị Thu Hương</div><div class="team-role">Giám đốc Tài chính</div><div class="team-bio">CFA, MBA INSEAD. Cấu trúc tài chính thành công cho 8 dự án lớn với tổng vốn hơn 500 triệu USD.</div></div>
    <div class="team-card"><div class="team-av">🤝</div><div class="team-name">Lê Quốc Hùng</div><div class="team-role">Giám đốc Kinh doanh</div><div class="team-bio">15 năm trong lĩnh vực phát triển và phân phối BĐS hạng sang, quản lý mạng lưới 200+ đại lý.</div></div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Khách hàng nói gì</div>
  <h2 class="sec-title" style="color:#e8e0d0">Sự tin tưởng là tài sản<br>quý giá nhất của chúng tôi</h2>
  <p class="sec-sub" style="margin-bottom:48px">Hơn 8.500 cư dân đã chọn chúng tôi là nơi gọi là nhà</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Đã sống tại The Pinnacle được 2 năm. Chất lượng xây dựng vượt kỳ vọng, ban quản lý chuyên nghiệp và cộng đồng cư dân thực sự đẳng cấp. Không hối tiếc khi quyết định đầu tư."</div><div class="testi-auth"><div class="testi-av">TH</div><div><div class="testi-name">Ông Trần Hải Đăng</div><div class="testi-src">Căn hộ tầng 45 · The Pinnacle</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Mua villa GreenValley làm tài sản đầu tư. Cam kết thuê lại 6%/năm được thực hiện đúng và đủ từ tháng đầu. Đội ngũ hỗ trợ rất tận tâm trong suốt quá trình."</div><div class="testi-auth"><div class="testi-av">NL</div><div><div class="testi-name">Bà Nguyễn Lan Anh</div><div class="testi-src">Villa 380m² · GreenValley</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Điều tôi đánh giá cao nhất là sự minh bạch. Tiến độ cập nhật đúng từng tháng, không có gì bất ngờ. Đây là CĐT đầu tiên khiến tôi thực sự an tâm khi xuống tiền."</div><div class="testi-auth"><div class="testi-av">PV</div><div><div class="testi-name">Ông Phạm Văn Thắng</div><div class="testi-src">SunHarbour · Condotel unit</div></div></div></div>
  </div>
</section>

<section class="booking">
  <div class="sec-label">Đăng ký tư vấn</div>
  <h2 class="sec-title">Nhận tư vấn 1-1 hoàn toàn<br><span style="background:linear-gradient(135deg,#d4a853,#f0d080);-webkit-background-clip:text;-webkit-text-fill-color:transparent">miễn phí từ chuyên gia</span></h2>
  <p class="sec-sub">Đội ngũ 50+ chuyên gia sẵn sàng tư vấn nhu cầu cụ thể của bạn</p>
  <div class="booking-form">
    <div class="form-row">
      <input class="form-input" placeholder="Họ và tên *" type="text" />
      <input class="form-input" placeholder="Số điện thoại *" type="tel" />
    </div>
    <div class="form-row">
      <input class="form-input" placeholder="Email" type="email" />
      <select class="form-select"><option>Chọn dự án quan tâm</option><option>The Pinnacle Residences</option><option>GreenValley Golf Villas</option><option>SunHarbour Beach Resort</option></select>
    </div>
    <div class="form-row-1">
      <select class="form-select"><option>Mục đích mua</option><option>Để ở</option><option>Đầu tư cho thuê</option><option>Tài sản tích lũy</option><option>Mua cho gia đình</option></select>
    </div>
    <button class="form-btn">🏠 Đăng ký tư vấn miễn phí ngay →</button>
    <div class="form-note">Chuyên gia sẽ liên hệ trong vòng 30 phút · Cam kết không làm phiền · Tuyệt đối bảo mật thông tin</div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Những điều bạn cần biết<br>trước khi đầu tư</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">💰 Có thể vay ngân hàng mua dự án này không?</div><div class="faq-a">Có. Chúng tôi hợp tác với 8 ngân hàng lớn gồm Vietcombank, BIDV, VPBank, Techcombank... Hỗ trợ vay tối đa 70% giá trị căn hộ, lãi suất ưu đãi 0% trong 18-24 tháng đầu tùy gói. Bộ phận tư vấn tài chính sẽ giúp bạn tối ưu phương án vay.</div></div>
    <div class="faq-item"><div class="faq-q">📋 Thủ tục pháp lý như thế nào?</div><div class="faq-a">Tất cả dự án đều có đầy đủ pháp lý: Giấy phép xây dựng, Quy hoạch 1/500, Thông báo đủ điều kiện huy động vốn từ Sở Xây dựng. Người mua ký Hợp đồng Mua bán chính thức và được cấp Sổ hồng (GCNQSDĐ) sau khi nhận bàn giao.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Nếu cần bán lại, có hỗ trợ không?</div><div class="faq-a">Chúng tôi có bộ phận Secondary Market chuyên hỗ trợ giao dịch thứ cấp miễn phí cho cư dân. Mạng lưới 200+ môi giới đã quen thuộc với dự án, thông thường các căn hộ tại dự án của chúng tôi thanh khoản tốt trong vòng 30-60 ngày.</div></div>
    <div class="faq-item"><div class="faq-q">🏗️ Chậm tiến độ bàn giao thì sao?</div><div class="faq-a">Hợp đồng cam kết phạt 0.05%/ngày giá trị căn hộ nếu chậm bàn giao quá 180 ngày. Trong 15 năm hoạt động, tỷ lệ bàn giao đúng hạn của chúng tôi đạt 98% — bằng chứng bằng 12 dự án đã hoàn thành.</div></div>
    <div class="faq-item"><div class="faq-q">💼 Phí quản lý sau khi nhận nhà là bao nhiêu?</div><div class="faq-a">Phí quản lý từ 15.000–25.000đ/m²/tháng tùy dự án, bao gồm: bảo vệ 24/7, vệ sinh công cộng, bảo trì hệ thống M&E, sử dụng hồ bơi và gym. Phí dịch vụ được công khai minh bạch và không tăng đột biến.</div></div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">👑 <span>PINNACLE</span> GROUP</div><div class="footer-tagline">Định hình cuộc sống đẳng cấp · Thành lập 2009</div></div>
    <div class="footer-links"><a href="#">Dự án đang mở bán</a><a href="#">Dự án đã bàn giao</a><a href="#">Tin tức & Sự kiện</a><a href="#">Investor Relations</a></div>
    <div class="footer-links"><a href="#">📍 12 Nguyễn Huệ, Q.1, TP.HCM</a><a href="#">📞 Hotline: 1800 1234 (miễn phí)</a><a href="#">✉️ sales@pinnaclegroup.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 Pinnacle Group · MST: 0312345678 · Sở KH&ĐT TP.HCM · Giấy phép kinh doanh BĐS số 01/GP-BĐS</div>
</body></html>`

const LP_DENTAL = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#0f172a}
.hero{background:linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 50%,#f0f9ff 100%);padding:100px 24px 80px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #bae6fd;color:#0284c7;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:.5px;margin-bottom:28px}
.hero h1{font-size:clamp(34px,5.5vw,62px);font-weight:900;color:#0c4a6e;line-height:1.15;margin-bottom:18px}
.hero h1 span{color:#0ea5e9}
.hero p{font-size:18px;color:#0369a1;max-width:560px;margin:0 auto 36px;line-height:1.8}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0284c7,#0c4a6e);color:#fff;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(2,132,199,.3)}
.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:#fff;border:2px solid #bae6fd;color:#0284c7;border-radius:12px;padding:15px 26px;font-size:15px;font-weight:600;text-decoration:none}
.hero-note{font-size:13px;color:#0369a1;opacity:.8}
.stats-bar{background:linear-gradient(135deg,#0c4a6e,#075985);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;color:#7dd3fc}
.stat-l{font-size:12px;color:#bae6fd;margin-top:4px}
.sec-label{color:#0284c7;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:34px;font-weight:800;color:#0c4a6e;text-align:center;margin-bottom:12px}
.sec-sub{text-align:center;font-size:15px;color:#64748b;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.services{padding:90px 24px;background:#fff}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;max-width:1060px;margin:0 auto}
.svc-card{border:1.5px solid #e0f2fe;border-radius:16px;padding:32px;background:#f8fcff;transition:.2s}
.svc-icon{width:60px;height:60px;background:linear-gradient(135deg,#0284c7,#0c4a6e);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px}
.svc-name{font-size:18px;font-weight:800;color:#0c4a6e;margin-bottom:8px}
.svc-desc{font-size:14px;color:#475569;line-height:1.7;margin-bottom:14px}
.svc-price{font-size:16px;font-weight:700;color:#0284c7}
.svc-note{font-size:12px;color:#94a3b8;margin-top:2px}
.tech{padding:90px 24px;background:linear-gradient(160deg,#f0f9ff,#fff)}
.tech-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:960px;margin:0 auto}
.tech-card{background:#fff;border:1px solid #e0f2fe;border-radius:14px;padding:26px;text-align:center;box-shadow:0 2px 12px rgba(2,132,199,.06)}
.tech-icon{font-size:44px;margin-bottom:14px;display:block}
.tech-name{font-size:16px;font-weight:700;color:#0c4a6e;margin-bottom:8px}
.tech-desc{font-size:13px;color:#64748b;line-height:1.65}
.doctors{padding:90px 24px;background:#fff}
.doc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;max-width:980px;margin:0 auto}
.doc-card{border:1.5px solid #e0f2fe;border-radius:16px;padding:28px;text-align:center;background:#f8fcff}
.doc-av{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#0c4a6e);display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 16px;border:3px solid #fff;box-shadow:0 4px 16px rgba(2,132,199,.2)}
.doc-name{font-size:18px;font-weight:800;color:#0c4a6e;margin-bottom:4px}
.doc-spec{font-size:13px;color:#0284c7;font-weight:600;margin-bottom:10px}
.doc-certs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}
.doc-cert{background:#e0f2fe;color:#0369a1;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600}
.doc-exp{font-size:13px;color:#64748b;line-height:1.6}
.process{padding:90px 24px;background:linear-gradient(160deg,#f0f9ff,#fff)}
.proc-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.proc-step{text-align:center;padding:28px}
.proc-num{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#0c4a6e);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.proc-title{font-size:17px;font-weight:700;color:#0c4a6e;margin-bottom:8px}
.proc-desc{font-size:13px;color:#64748b;line-height:1.65}
.pricing{padding:90px 24px;background:#fff}
.price-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:960px;margin:0 auto 32px}
.price-card{border:2px solid #e0f2fe;border-radius:18px;padding:32px;background:#f8fcff;text-align:left}
.price-card.feat{background:linear-gradient(135deg,#0284c7,#0c4a6e);border-color:transparent;color:#fff}
.price-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0284c7;margin-bottom:12px}
.price-card.feat .price-label{color:#bae6fd}
.price-amount{font-size:44px;font-weight:900;color:#0c4a6e;line-height:1;margin-bottom:4px}
.price-card.feat .price-amount{color:#fff}
.price-unit{font-size:14px;color:#64748b;margin-bottom:20px}
.price-card.feat .price-unit{color:#bae6fd}
.price-btn{display:block;border-radius:10px;padding:13px;text-align:center;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:20px}
.price-btn-out{background:#e0f2fe;color:#0284c7}
.price-btn-in{background:#fff;color:#0284c7}
.price-feats{font-size:14px;color:#475569;line-height:2}
.price-card.feat .price-feats{color:#e0f2fe}
.testi{padding:90px 24px;background:linear-gradient(135deg,#0c4a6e,#0284c7)}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:28px}
.testi-stars{color:#fde68a;font-size:17px;margin-bottom:12px}
.testi-q{font-size:15px;color:#e0f2fe;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:14px}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-src{font-size:12px;color:#bae6fd}
.faq{padding:90px 24px;background:#f8fcff}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1.5px solid #e0f2fe;border-radius:12px;padding:24px}
.faq-q{font-weight:700;color:#0c4a6e;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#475569;line-height:1.75}
.cta-section{padding:80px 24px;background:linear-gradient(160deg,#f0f9ff,#fff);text-align:center}
.cta-box{background:linear-gradient(135deg,#0284c7,#0c4a6e);border-radius:24px;padding:60px 40px;max-width:700px;margin:0 auto}
.cta-box h2{font-size:36px;font-weight:900;color:#fff;margin-bottom:14px;line-height:1.25}
.cta-box p{color:#bae6fd;font-size:16px;margin-bottom:32px;line-height:1.65}
.cta-box .btn-white{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0284c7;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:800;text-decoration:none}
.footer{background:#0c4a6e;padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:6px}
.footer-brand span{color:#7dd3fc}
.footer-tagline{font-size:13px;color:#bae6fd}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#bae6fd;text-decoration:none;font-size:14px}
.footer-bottom{background:#075985;text-align:center;padding:16px 24px;font-size:12px;color:#93c5fd}
</style></head>
<body>

<section class="hero">
  <div class="badge">🦷 Được 20.000+ bệnh nhân tin chọn · Bác sĩ tốt nghiệp nước ngoài</div>
  <h1>Nụ cười tự tin<br><span>bắt đầu từ đây</span></h1>
  <p>Nha khoa thẩm mỹ cao cấp với công nghệ hiện đại nhất Việt Nam — không đau, không lo ngại, kết quả đẹp bền vững.</p>
  <div class="hero-btns">
    <a href="#" class="btn-primary">📅 Đặt lịch khám — Miễn phí tư vấn</a>
    <a href="#" class="btn-secondary">📞 Gọi ngay: 028 3456 7890</a>
  </div>
  <p class="hero-note">Khám miễn phí · Báo giá trước điều trị · Bảo hành dài hạn</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">20K+</div><div class="stat-l">Bệnh nhân tin chọn</div></div>
    <div><div class="stat-n">15+</div><div class="stat-l">Bác sĩ chuyên khoa</div></div>
    <div><div class="stat-n">12</div><div class="stat-l">Năm kinh nghiệm</div></div>
    <div><div class="stat-n">98%</div><div class="stat-l">Bệnh nhân hài lòng</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Google Reviews</div></div>
  </div>
</div>

<section class="services">
  <div class="sec-label">Dịch vụ nha khoa</div>
  <h2 class="sec-title">Giải pháp toàn diện<br>cho nụ cười hoàn hảo</h2>
  <p class="sec-sub">Từ chỉnh hình cơ bản đến thẩm mỹ cao cấp — chúng tôi có giải pháp cho mọi nhu cầu</p>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-icon">✨</div><div class="svc-name">Dán sứ Veneer</div><div class="svc-desc">Mỏng như vỏ trứng, bền như đá quý. Sứ Emax/Zirconia nhập khẩu Đức, bảo hành 10 năm. Thay đổi màu sắc, hình dạng và kích thước răng trong chỉ 2 buổi hẹn.</div><div class="svc-price">Từ 3.500.000đ/răng</div><div class="svc-note">Bảo hành 10 năm · Không mài răng hoặc mài cực ít</div></div>
    <div class="svc-card"><div class="svc-icon">🦷</div><div class="svc-name">Implant Nha Khoa</div><div class="svc-desc">Trồng răng giả vĩnh viễn với titanium implant thương hiệu Straumann (Thụy Sĩ), Nobel Biocare (Mỹ). Tỷ lệ thành công 99.5%, cảm giác như răng thật, không ảnh hưởng răng bên cạnh.</div><div class="svc-price">Từ 18.000.000đ/răng</div><div class="svc-note">Bảo hành suốt đời implant · Trả góp 0%</div></div>
    <div class="svc-card"><div class="svc-icon">🎯</div><div class="svc-name">Niềng Răng Invisalign</div><div class="svc-desc">Niềng trong suốt Invisalign — công nghệ Mỹ, không cần mắc cài, tháo ra ăn uống bình thường. Phù hợp cho người đi làm, không muốn ảnh hưởng ngoại hình trong quá trình niềng.</div><div class="svc-price">Từ 45.000.000đ</div><div class="svc-note">Bao gồm toàn bộ khay · Theo dõi online mỗi 2 tuần</div></div>
    <div class="svc-card"><div class="svc-icon">💎</div><div class="svc-name">Tẩy Trắng Răng Zoom!</div><div class="svc-desc">Công nghệ Zoom! Whitening từ Mỹ — 1 giờ tẩy trắng, nâng tông 8-12 shade. Không đau, không ê buốt nhờ gel bảo vệ tủy chuyên dụng. Kết quả bền 2-3 năm.</div><div class="svc-price">4.500.000đ / lần</div><div class="svc-note">Bao gồm máng tẩy trắng về nhà · Tư vấn màu sắc</div></div>
    <div class="svc-card"><div class="svc-icon">🌿</div><div class="svc-name">Điều Trị Nha Chu</div><div class="svc-desc">Điều trị viêm nướu, tụt nướu, viêm quanh răng bằng laser Er:YAG thế hệ mới. Không phẫu thuật, phục hồi nhanh, giải quyết tận gốc nguyên nhân gây hôi miệng mãn tính.</div><div class="svc-price">Từ 800.000đ/phiên</div><div class="svc-note">Laser không đau · Lịch tái khám theo dõi miễn phí</div></div>
    <div class="svc-card"><div class="svc-icon">👶</div><div class="svc-name">Nha Khoa Trẻ Em</div><div class="svc-desc">Phòng khám chuyên biệt cho trẻ từ 1-16 tuổi với không gian vui nhộn, màu sắc. Bác sĩ được đào tạo tâm lý trẻ em, kỹ thuật tê không đau, giúp trẻ không sợ nha sĩ.</div><div class="svc-price">Từ 300.000đ/lần</div><div class="svc-note">Phòng chờ trẻ em riêng · Quà tặng sau khám</div></div>
  </div>
</section>

<section class="tech">
  <div class="sec-label">Công nghệ hiện đại</div>
  <h2 class="sec-title">Trang thiết bị tối tân<br>chuẩn quốc tế</h2>
  <p class="sec-sub">Đầu tư hơn 15 tỷ đồng vào thiết bị y tế tiên tiến nhất — để mọi điều trị đều chính xác và an toàn tuyệt đối</p>
  <div class="tech-grid">
    <div class="tech-card"><span class="tech-icon">🔬</span><div class="tech-name">CT Scan 3D Cone Beam</div><div class="tech-desc">Chụp CT 3D toàn hàm trong 14 giây, liều phóng xạ thấp hơn phim X-quang thông thường 90%. Cần thiết cho implant và phẫu thuật hàm mặt.</div></div>
    <div class="tech-card"><span class="tech-icon">💡</span><div class="tech-name">Laser Er:YAG & Nd:YAG</div><div class="tech-desc">Điều trị nha chu, trắng răng và tiểu phẫu không cần mũi kim. Lành thương nhanh gấp 3 lần phương pháp truyền thống.</div></div>
    <div class="tech-card"><span class="tech-icon">🖥️</span><div class="tech-name">CAD/CAM CEREC Sirona</div><div class="tech-desc">Thiết kế và phay sứ tại chỗ trong 1 giờ — không cần đi lại nhiều lần, mão sứ nguyên khối Zirconia chính xác đến 0.02mm.</div></div>
    <div class="tech-card"><span class="tech-icon">📱</span><div class="tech-name">Scan 3D khoang miệng iTero</div><div class="tech-desc">Thay thế hoàn toàn lấy dấu thạch cao truyền thống. Scan trong 2 phút, kết quả chính xác 100%, xem mô phỏng kết quả điều trị ngay lập tức.</div></div>
    <div class="tech-card"><span class="tech-icon">🤖</span><div class="tech-name">Robot Hướng Dẫn Implant</div><div class="tech-desc">Hệ thống robot YOMI hỗ trợ định vị implant chính xác theo kế hoạch 3D, sai số dưới 0.5mm. An toàn nhất, xâm lấn ít nhất.</div></div>
    <div class="tech-card"><span class="tech-icon">🛡️</span><div class="tech-name">Hệ Thống Khử Khuẩn Autoclave</div><div class="tech-desc">Máy tiệt khuẩn áp suất cao chuẩn EN 13060 Châu Âu. Mỗi dụng cụ đều được đóng gói riêng và in tem ngày tiệt khuẩn.</div></div>
  </div>
</section>

<section class="doctors">
  <div class="sec-label">Đội ngũ bác sĩ</div>
  <h2 class="sec-title">Chuyên gia hàng đầu<br>được đào tạo quốc tế</h2>
  <p class="sec-sub">100% bác sĩ có trình độ sau đại học, nhiều người tốt nghiệp từ Mỹ, Pháp, Nhật, Úc</p>
  <div class="doc-grid">
    <div class="doc-card"><div class="doc-av">👨‍⚕️</div><div class="doc-name">BS. CKI Trần Minh Khoa</div><div class="doc-spec">Implant & Phẫu thuật hàm mặt</div><div class="doc-certs"><span class="doc-cert">Straumann Certified</span><span class="doc-cert">NobelBiocare</span></div><div class="doc-exp">20 năm kinh nghiệm. Đặt hơn 3.000 implant. Giảng viên khoa ĐH Y Dược TP.HCM.</div></div>
    <div class="doc-card"><div class="doc-av">👩‍⚕️</div><div class="doc-name">BS. CKII Lê Thị Lan Hương</div><div class="doc-spec">Nha khoa thẩm mỹ & Veneer</div><div class="doc-certs"><span class="doc-cert">Invisalign Diamond</span><span class="doc-cert">AACD Member</span></div><div class="doc-exp">15 năm chuyên về thẩm mỹ răng sứ. Tốt nghiệp chuyên khoa tại Paris, Pháp.</div></div>
    <div class="doc-card"><div class="doc-av">👨‍⚕️</div><div class="doc-name">BS. Nguyễn Văn Thành</div><div class="doc-spec">Chỉnh nha Invisalign & Mắc cài</div><div class="doc-certs"><span class="doc-cert">Invisalign Platinum</span><span class="doc-cert">3M Certified</span></div><div class="doc-exp">12 năm chuyên niềng răng. Hơn 2.000 ca Invisalign thành công. Fellowship ĐH Sydney.</div></div>
    <div class="doc-card"><div class="doc-av">👩‍⚕️</div><div class="doc-name">BS. Phạm Thu Trang</div><div class="doc-spec">Nha chu & Laser nha khoa</div><div class="doc-certs"><span class="doc-cert">AAP Member</span><span class="doc-cert">Biophotonics</span></div><div class="doc-exp">10 năm điều trị nha chu. Chuyên gia laser Bios nha khoa đầu tiên tại VN.</div></div>
  </div>
</section>

<section class="process">
  <div class="sec-label">Quy trình khám</div>
  <h2 class="sec-title">Đơn giản, minh bạch<br>không áp lực</h2>
  <p class="sec-sub">Mỗi bệnh nhân đều được tư vấn kỹ lưỡng trước khi quyết định điều trị — không bao giờ vội vàng</p>
  <div class="proc-steps">
    <div class="proc-step"><div class="proc-num">1</div><div class="proc-title">Đặt lịch online/call</div><div class="proc-desc">Chọn giờ hẹn phù hợp qua website hoặc hotline. Xác nhận qua SMS trong 5 phút. Không cần đặt cọc.</div></div>
    <div class="proc-step"><div class="proc-num">2</div><div class="proc-title">Khám & chụp X-quang</div><div class="proc-desc">Bác sĩ khám tổng quát, chụp CT 3D nếu cần. Phân tích tình trạng răng miệng toàn diện, không bỏ sót.</div></div>
    <div class="proc-step"><div class="proc-num">3</div><div class="proc-title">Tư vấn & lập kế hoạch</div><div class="proc-desc">Bác sĩ giải thích rõ ràng vấn đề, các phương án điều trị, chi phí chính xác và thời gian hoàn thành. Bạn quyết định.</div></div>
    <div class="proc-step"><div class="proc-num">4</div><div class="proc-title">Điều trị không đau</div><div class="proc-desc">Áp dụng gel tê bề mặt trước khi tiêm. Kỹ thuật tiêm chậm áp lực thấp. Hơn 95% bệnh nhân không cảm thấy đau trong điều trị.</div></div>
    <div class="proc-step"><div class="proc-num">5</div><div class="proc-title">Tái khám & bảo hành</div><div class="proc-desc">Lịch tái khám tự động qua app. Mỗi điều trị đều có phiếu bảo hành rõ ràng. Hỗ trợ 24/7 nếu có vấn đề phát sinh.</div></div>
  </div>
</section>

<section class="pricing">
  <div class="sec-label">Gói dịch vụ</div>
  <h2 class="sec-title">Đầu tư vào nụ cười<br>là đầu tư sinh lời nhất</h2>
  <p class="sec-sub">Minh bạch giá cả — không phí ẩn — báo giá trước khi điều trị</p>
  <div class="price-grid">
    <div class="price-card"><div class="price-label">Chăm sóc cơ bản</div><div class="price-amount">Miễn phí</div><div class="price-unit">Lần khám đầu tiên</div><a href="#" class="price-btn price-btn-out">Đặt lịch khám →</a><div class="price-feats">✓ Khám tổng quát<br>✓ Chụp X-quang tổng quát<br>✓ Tư vấn kế hoạch điều trị<br>✓ Báo giá chi tiết không ràng buộc</div></div>
    <div class="price-card feat"><div class="price-label">Gói thẩm mỹ nụ cười</div><div class="price-amount">85tr</div><div class="price-unit">Trọn gói 10 răng · Veneer Emax</div><a href="#" class="price-btn price-btn-in">Tư vấn ngay →</a><div class="price-feats">✓ 10 răng sứ Emax<br>✓ Tẩy trắng Zoom! trước dán<br>✓ Bảo hành 10 năm<br>✓ Scan 3D & mô phỏng trước<br>✓ Trả góp 0% đến 12 tháng</div></div>
    <div class="price-card"><div class="price-label">Gói Implant toàn hàm</div><div class="price-amount">250tr</div><div class="price-unit">All-on-4 · Trọn gói 2 hàm</div><a href="#" class="price-btn price-btn-out">Xem chi tiết →</a><div class="price-feats">✓ 4 implant Straumann / hàm<br>✓ CT 3D lập kế hoạch<br>✓ Sứ Zirconia toàn hàm<br>✓ Phẫu thuật hướng dẫn robot<br>✓ Bảo hành suốt đời implant</div></div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Cảm nhận bệnh nhân</div>
  <h2 class="sec-title" style="color:#fff">Hàng nghìn nụ cười<br>đã thay đổi tại đây</h2>
  <p class="sec-sub" style="color:#bae6fd;margin-bottom:48px">Không photoshop, không dàn dựng — đây là chia sẻ thật từ bệnh nhân thật</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Tôi đã sợ nha sĩ suốt 20 năm. Đến đây lần đầu chỉ định khám thôi nhưng bác sĩ Khoa quá nhẹ nhàng và kiên nhẫn. Giờ tôi đã implant 3 răng, hoàn toàn không đau và kết quả đẹp hơn cả mong đợi."</div><div class="testi-auth"><div class="testi-av">NM</div><div><div class="testi-name">Chị Nguyễn Minh Châu</div><div class="testi-src">Implant Straumann · Quận 3</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Dán sứ Veneer 8 răng — trước khi làm được xem mô phỏng 3D kết quả nên rất an tâm. Kết quả đúng như bác sĩ cam kết. Bạn bè liên tục hỏi tôi đi làm ở đâu, thật sự tự tin hơn rất nhiều."</div><div class="testi-auth"><div class="testi-av">TH</div><div><div class="testi-name">Anh Trần Hoàng Phúc</div><div class="testi-src">Veneer Emax 8 răng · Quận 7</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Niềng Invisalign được 8 tháng, răng thay đổi rõ rệt. Quan trọng nhất là không ai biết tôi đang niềng khi đi làm và đi gặp khách hàng. App theo dõi tiến trình rất tiện, BS Thành tận tình lắm."</div><div class="testi-auth"><div class="testi-av">LN</div><div><div class="testi-name">Chị Lê Ngọc Hà</div><div class="testi-src">Invisalign · Bình Thạnh</div></div></div></div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Những lo lắng thường gặp<br>của bệnh nhân</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">😰 Điều trị có đau không?</div><div class="faq-a">Chúng tôi áp dụng quy trình "Comfort Dentistry" 3 bước: (1) gel tê bề mặt trước khi tiêm, (2) kim tiêm siêu mảnh 30G, (3) tiêm chậm có kiểm soát áp lực. Hơn 95% bệnh nhân đánh giá không đau hoặc rất ít đau. Nếu bạn vẫn cảm thấy đau, bác sĩ sẽ tê thêm ngay lập tức.</div></div>
    <div class="faq-item"><div class="faq-q">💰 Có trả góp được không?</div><div class="faq-a">Có. Hợp tác với Home Credit, FE Credit và thẻ tín dụng các ngân hàng. Trả góp 0% lãi suất đến 12 tháng cho điều trị trên 10 triệu đồng. Thủ tục đơn giản, phê duyệt trong 30 phút ngay tại phòng khám.</div></div>
    <div class="faq-item"><div class="faq-q">⏱️ Niềng răng Invisalign mất bao lâu?</div><div class="faq-a">Trung bình 12-24 tháng tùy mức độ sai khớp cắn. Sau khi scan 3D, bác sĩ sẽ cho bạn xem mô phỏng từng tháng và ước tính chính xác thời gian hoàn thành cho trường hợp của bạn. Tái khám mỗi 6-8 tuần, hoặc theo dõi từ xa qua app giữa các lần hẹn.</div></div>
    <div class="faq-item"><div class="faq-q">🛡️ Implant có bền không? Bảo hành ra sao?</div><div class="faq-a">Implant titanium Straumann bảo hành suốt đời từ nhà sản xuất. Mão sứ Zirconia bảo hành 5 năm tại phòng khám. Với vệ sinh tốt và tái khám định kỳ, implant có thể dùng được 20-30 năm. Tỷ lệ thành công sau 10 năm đạt 95%+ theo nghiên cứu quốc tế.</div></div>
    <div class="faq-item"><div class="faq-q">📋 Sau khi dán sứ Veneer có cần kiêng gì không?</div><div class="faq-a">Tránh cắn đồ quá cứng (xương, mía) và hạn chế thực phẩm nhuộm màu mạnh (cà phê, trà đen) trong tuần đầu. Sau đó ăn uống bình thường. Đánh răng đúng cách, dùng chỉ tơ nha khoa và tái khám định kỳ 6 tháng/lần là đủ để giữ sứ bền đẹp 10+ năm.</div></div>
  </div>
</section>

<section class="cta-section">
  <div class="cta-box">
    <h2>Đặt lịch khám miễn phí<br>ngay hôm nay</h2>
    <p>Chuyên gia sẽ tư vấn riêng cho trường hợp của bạn — không áp lực, không phí ẩn, chỉ cần bạn mỉm cười.</p>
    <a href="#" class="btn-white">🦷 Đặt lịch ngay — 100% miễn phí</a>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🦷 <span>Smile</span>Perfect Dental</div><div class="footer-tagline">Nha khoa thẩm mỹ cao cấp · Thành lập 2012</div></div>
    <div class="footer-links"><a href="#">Dịch vụ nha khoa</a><a href="#">Đội ngũ bác sĩ</a><a href="#">Bảng giá</a><a href="#">Đặt lịch hẹn</a></div>
    <div class="footer-links"><a href="#">📍 CS1: 123 Nguyễn Thị Minh Khai, Q.1</a><a href="#">📍 CS2: 456 Lê Văn Sỹ, Q.3</a><a href="#">📞 028 3456 7890 (7:30–21:00)</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 SmilePerfect Dental · Giấy phép hoạt động khám chữa bệnh số 1234/BYT-GPHD · Bộ Y tế</div>
</body></html>`

const LP_LANGUAGE = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#0f0b1e;color:#e8e0f8}
.hero{background:linear-gradient(160deg,#0f0b1e 0%,#1a1040 50%,#0f0b1e 100%);padding:100px 24px 80px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 65%)}
.hero::after{content:'';position:absolute;top:100px;right:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.3);color:#fb923c;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:.5px;margin-bottom:28px;position:relative}
.hero h1{font-size:clamp(36px,6vw,68px);font-weight:900;line-height:1.1;margin-bottom:20px;position:relative}
.hero h1 .orange{background:linear-gradient(135deg,#f97316,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero h1 .purple{background:linear-gradient(135deg,#818cf8,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#a5b4fc;max-width:560px;margin:0 auto 36px;line-height:1.8;position:relative}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;position:relative}
.btn-orange{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#ea580c,#d97706);color:#fff;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(234,88,12,.3)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:12px;padding:15px 26px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#6b7280;position:relative}
.stats-bar{background:rgba(249,115,22,.08);border-top:1px solid rgba(249,115,22,.15);border-bottom:1px solid rgba(249,115,22,.15);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;background:linear-gradient(135deg,#f97316,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-l{font-size:12px;color:#94a3b8;margin-top:4px}
.sec-label{color:#f97316;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:34px;font-weight:800;text-align:center;margin-bottom:12px;line-height:1.25}
.sec-sub{text-align:center;font-size:15px;color:#94a3b8;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.courses{padding:90px 24px;background:#0f0b1e}
.course-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;max-width:1060px;margin:0 auto}
.course-card{border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:32px;background:rgba(255,255,255,.03);position:relative;overflow:hidden}
.course-card.popular{border-color:rgba(249,115,22,.35);background:rgba(249,115,22,.05)}
.popular-badge{position:absolute;top:18px;right:18px;background:linear-gradient(135deg,#ea580c,#d97706);color:#fff;border-radius:6px;padding:4px 12px;font-size:11px;font-weight:700}
.course-flag{font-size:44px;margin-bottom:16px;display:block}
.course-name{font-size:20px;font-weight:800;margin-bottom:6px}
.course-target{font-size:13px;color:#f97316;font-weight:600;margin-bottom:12px}
.course-desc{font-size:14px;color:#94a3b8;line-height:1.7;margin-bottom:16px}
.course-features{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.course-feat{font-size:13px;color:#c8bfa8;display:flex;align-items:center;gap:8px}
.course-feat::before{content:'✓';color:#f97316;font-weight:700;flex-shrink:0}
.course-price{font-size:22px;font-weight:900;color:#f97316}
.course-price-note{font-size:12px;color:#6b7280;margin-top:2px}
.method{padding:90px 24px;background:#0a0714}
.method-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.method-card{background:rgba(255,255,255,.03);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:28px;text-align:center}
.method-icon{font-size:46px;margin-bottom:16px;display:block}
.method-name{font-size:17px;font-weight:700;margin-bottom:10px;color:#c7d2fe}
.method-desc{font-size:13px;color:#94a3b8;line-height:1.7}
.teachers{padding:90px 24px;background:#0f0b1e}
.teacher-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;max-width:1000px;margin:0 auto}
.teacher-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;text-align:center}
.teacher-av{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px;border:3px solid rgba(249,115,22,.3)}
.teacher-av.t1{background:linear-gradient(135deg,#1d4ed8,#0369a1)}
.teacher-av.t2{background:linear-gradient(135deg,#b91c1c,#991b1b)}
.teacher-av.t3{background:linear-gradient(135deg,#0369a1,#0891b2)}
.teacher-av.t4{background:linear-gradient(135deg,#15803d,#166534)}
.teacher-name{font-size:18px;font-weight:800;margin-bottom:4px}
.teacher-nationality{font-size:13px;color:#f97316;font-weight:600;margin-bottom:10px}
.teacher-certs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}
.teacher-cert{background:rgba(249,115,22,.1);color:#fb923c;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600}
.teacher-bio{font-size:13px;color:#94a3b8;line-height:1.6}
.results{padding:90px 24px;background:#0a0714}
.result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.result-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden}
.result-top{padding:24px;background:linear-gradient(135deg,#ea580c,#92400e);text-align:center}
.result-score{font-size:44px;font-weight:900;color:#fff}
.result-exam{font-size:14px;color:#fed7aa;margin-top:4px;font-weight:600}
.result-body{padding:22px}
.result-body p{font-size:13px;color:#94a3b8;line-height:1.65;margin-bottom:10px}
.result-name{font-size:13px;font-weight:700;color:#fb923c}
.roadmap{padding:90px 24px;background:#0f0b1e}
.road-steps{display:flex;flex-direction:column;gap:0;max-width:700px;margin:0 auto}
.road-step{display:flex;gap:24px;padding:28px 0;border-bottom:1px dashed rgba(249,115,22,.15)}
.road-step:last-child{border:none}
.road-num{width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,#ea580c,#d97706);color:#fff;font-size:18px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.road-body h3{font-size:17px;font-weight:700;margin-bottom:6px;color:#e8e0f8}
.road-body p{font-size:14px;color:#94a3b8;line-height:1.65}
.road-level{display:inline-flex;background:rgba(249,115,22,.12);color:#fb923c;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:700;margin-top:8px}
.pricing{padding:90px 24px;background:#0a0714}
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;max-width:900px;margin:0 auto 28px}
.plan{border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:32px;background:rgba(255,255,255,.03)}
.plan.hot{border-color:rgba(249,115,22,.4);background:rgba(249,115,22,.06)}
.plan-name{font-size:12px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.plan-price{font-size:44px;font-weight:900;margin-bottom:4px}
.plan-per{font-size:13px;color:#6b7280;margin-bottom:20px}
.plan-btn{display:block;border-radius:10px;padding:13px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:18px}
.plan-btn-outline{background:transparent;border:2px solid rgba(249,115,22,.35);color:#fb923c}
.plan-btn-hot{background:linear-gradient(135deg,#ea580c,#d97706);color:#fff}
.plan-feats{font-size:13px;color:#94a3b8;line-height:2.1}
.testi{padding:90px 24px;background:linear-gradient(135deg,#1a0a30,#0f0b1e)}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px}
.testi-stars{color:#f97316;font-size:17px;margin-bottom:12px}
.testi-q{font-size:15px;color:#c8bfa8;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;background:rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#f97316;font-size:14px}
.testi-name{font-size:14px;font-weight:700}
.testi-src{font-size:12px;color:#f97316}
.faq{padding:90px 24px;background:#0f0b1e}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:24px}
.faq-q{font-weight:700;color:#f97316;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#94a3b8;line-height:1.75}
.cta-sec{padding:80px 24px;text-align:center;background:linear-gradient(135deg,#1a1040,#0f0b1e)}
.cta-sec h2{font-size:44px;font-weight:900;margin-bottom:14px;letter-spacing:-.5px}
.cta-sec p{color:#94a3b8;font-size:17px;margin-bottom:32px;line-height:1.6}
.footer{background:#080614;border-top:1px solid rgba(255,255,255,.06);padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;margin-bottom:6px}
.footer-brand span{color:#f97316}
.footer-tagline{font-size:13px;color:#6b7280}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#94a3b8;text-decoration:none;font-size:14px}
.footer-bottom{background:#080614;border-top:1px solid rgba(255,255,255,.04);text-align:center;padding:16px 24px;font-size:12px;color:#4b5563}
</style></head>
<body>

<section class="hero">
  <div class="badge">🌍 10.000+ học viên · Đầu ra IELTS 7.0+ được chứng minh</div>
  <h1>Thành thạo <span class="orange">tiếng Anh</span><br>theo cách <span class="purple">khoa học nhất</span></h1>
  <p>Phương pháp học tập cá nhân hóa theo AI — giáo viên bản ngữ quốc tế — lộ trình rõ ràng từ 0 đến IELTS 7.0+ trong 12 tháng.</p>
  <div class="hero-btns">
    <a href="#" class="btn-orange">🚀 Học thử miễn phí 7 ngày</a>
    <a href="#" class="btn-ghost">📊 Test trình độ ngay</a>
  </div>
  <p class="hero-note">Không cam kết · Không cần trình độ đầu vào · Học online hoặc offline</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">10K+</div><div class="stat-l">Học viên tốt nghiệp</div></div>
    <div><div class="stat-n">7.2</div><div class="stat-l">IELTS trung bình đầu ra</div></div>
    <div><div class="stat-n">120+</div><div class="stat-l">GV bản ngữ quốc tế</div></div>
    <div><div class="stat-n">96%</div><div class="stat-l">Đạt mục tiêu cam kết</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Đánh giá phụ huynh & HV</div></div>
  </div>
</div>

<section class="courses">
  <div class="sec-label">Khóa học</div>
  <h2 class="sec-title">Chương trình học<br>cho mọi mục tiêu</h2>
  <p class="sec-sub">Dù bạn cần IELTS để du học, tiếng Anh giao tiếp đi làm hay tiếng Anh cho con — chúng tôi đều có</p>
  <div class="course-grid">
    <div class="course-card popular">
      <span class="popular-badge">Phổ biến nhất</span>
      <span class="course-flag">🎓</span>
      <div class="course-name">IELTS Academic 6.5–7.5</div>
      <div class="course-target">Cho: Du học sinh · Người đi làm · Định cư</div>
      <div class="course-desc">Lộ trình 6-12 tháng, tập trung 4 kỹ năng Listening, Reading, Writing, Speaking. Cam kết đầu ra hoặc học lại miễn phí.</div>
      <div class="course-features">
        <div class="course-feat">Mock test hàng tuần với đề thi thật</div>
        <div class="course-feat">Speaking 1-1 với giáo viên bản ngữ IELTS Examiner</div>
        <div class="course-feat">Chữa Writing từng bài trong 24 giờ</div>
        <div class="course-feat">Cam kết điểm đầu ra · Bảo hành 100%</div>
      </div>
      <div class="course-price">3.500.000đ/tháng</div>
      <div class="course-price-note">Giảm 20% khi đăng ký 6 tháng · Trả góp 0%</div>
    </div>
    <div class="course-card">
      <span class="course-flag">💼</span>
      <div class="course-name">Business English Pro</div>
      <div class="course-target">Cho: Manager · Doanh nhân · Nhân viên văn phòng</div>
      <div class="course-desc">Tiếng Anh thương mại thực chiến: email, meeting, presentation, negotiation. Kịch bản thực tế từ ngành của bạn.</div>
      <div class="course-features">
        <div class="course-feat">Học theo ngành: Finance, IT, Marketing, HR</div>
        <div class="course-feat">Role-play tình huống thực tế mỗi buổi</div>
        <div class="course-feat">Chứng chỉ LinkedIn-ready khi hoàn thành</div>
        <div class="course-feat">Lớp buổi tối & cuối tuần linh hoạt</div>
      </div>
      <div class="course-price">2.800.000đ/tháng</div>
      <div class="course-price-note">Nhóm nhỏ 8 người · 3 buổi/tuần 90 phút</div>
    </div>
    <div class="course-card">
      <span class="course-flag">👦</span>
      <div class="course-name">English for Kids (6–15 tuổi)</div>
      <div class="course-target">Cho: Tiểu học · THCS · Phụ huynh muốn con tự tin giao tiếp</div>
      <div class="course-desc">Chương trình Cambridge Primary & Secondary. Học qua game, dự án, kể chuyện — đúng cách trẻ học tốt nhất. Giáo viên nước ngoài vui vẻ, kiên nhẫn.</div>
      <div class="course-features">
        <div class="course-feat">Lớp nhỏ tối đa 10 trẻ/lớp</div>
        <div class="course-feat">Báo cáo tiến độ hàng tuần cho phụ huynh</div>
        <div class="course-feat">Luyện thi Cambridge Starters/Movers/Flyers</div>
        <div class="course-feat">Tiếng Anh nghe như Việt Nam!</div>
      </div>
      <div class="course-price">2.200.000đ/tháng</div>
      <div class="course-price-note">Học thử 2 buổi miễn phí không cam kết</div>
    </div>
    <div class="course-card">
      <span class="course-flag">🌐</span>
      <div class="course-name">Tiếng Nhật · Hàn · Trung</div>
      <div class="course-target">Cho: Người đi xuất khẩu lao động · Du học · Yêu văn hóa Á</div>
      <div class="course-desc">Giáo viên bản ngữ từ Nhật Bản, Hàn Quốc và Trung Quốc. Học theo giáo trình chính thức: Genki (JP), TOPIK (KR), HSK (CN).</div>
      <div class="course-features">
        <div class="course-feat">Từ JLPT N5 → N2 / TOPIK 1 → 4 / HSK 1 → 5</div>
        <div class="course-feat">Văn hóa và thực hành giao tiếp thực tế</div>
        <div class="course-feat">Hỗ trợ hồ sơ du học & xin việc</div>
      </div>
      <div class="course-price">2.500.000đ/tháng</div>
      <div class="course-price-note">Khai giảng mỗi tháng · Học thử miễn phí</div>
    </div>
  </div>
</section>

<section class="method">
  <div class="sec-label">Phương pháp giảng dạy</div>
  <h2 class="sec-title">Học đúng cách —<br>tiến bộ thật sự</h2>
  <p class="sec-sub">Kết hợp khoa học giáo dục, công nghệ AI và con người để tạo ra trải nghiệm học ngôn ngữ hiệu quả nhất</p>
  <div class="method-grid">
    <div class="method-card"><span class="method-icon">🤖</span><div class="method-name">AI Học Tập Cá Nhân Hóa</div><div class="method-desc">Hệ thống AI phân tích điểm yếu riêng của từng học viên và tự động tạo bài tập tập trung vào chỗ cần cải thiện nhất, không lãng phí thời gian.</div></div>
    <div class="method-card"><span class="method-icon">🗣️</span><div class="method-name">Immersion — Ngập tràn trong tiếng</div><div class="method-desc">80% thời gian lớp học là output thực: speaking, writing, debating. Giáo viên không cho phép dùng tiếng Việt trong lớp — phương pháp hiệu quả nhất để não "chuyển số" sang tiếng Anh.</div></div>
    <div class="method-card"><span class="method-icon">📊</span><div class="method-name">Dữ liệu học tập rõ ràng</div><div class="method-desc">Dashboard theo dõi tiến bộ theo tuần. Đo lường chính xác từng kỹ năng: vocabulary size, speaking fluency, writing accuracy. Không đoán mò mà biết chính xác đang ở đâu.</div></div>
    <div class="method-card"><span class="method-icon">👥</span><div class="method-name">Lớp Nhỏ · Chú Ý Từng Người</div><div class="method-desc">Tối đa 12 học viên/lớp — giáo viên biết tên, biết điểm mạnh yếu từng người. Không bị "chìm" trong đám đông, không ngại hỏi, không sợ nói sai.</div></div>
    <div class="method-card"><span class="method-icon">🔄</span><div class="method-name">Spaced Repetition System</div><div class="method-desc">Hệ thống nhắc lại từ vựng thông minh theo thuật toán nhớ lâu nhất — học 10 từ/ngày nhưng giữ được 95% sau 6 tháng thay vì 20% theo cách truyền thống.</div></div>
    <div class="method-card"><span class="method-icon">🎯</span><div class="method-name">Cam Kết Đầu Ra Bằng HĐ</div><div class="method-desc">Không học viên nào rời khỏi với kết quả kém hơn cam kết. Nếu không đạt mục tiêu sau khóa, học lại 100% miễn phí đến khi đạt — ghi rõ trong hợp đồng.</div></div>
  </div>
</section>

<section class="teachers">
  <div class="sec-label">Giáo viên</div>
  <h2 class="sec-title">Học từ những người<br>nói tiếng Anh như hơi thở</h2>
  <p class="sec-sub">100% giáo viên bản ngữ hoặc CELTA/DELTA certified với ít nhất 5 năm kinh nghiệm giảng dạy</p>
  <div class="teacher-grid">
    <div class="teacher-card"><div class="teacher-av t1">🇺🇸</div><div class="teacher-name">Michael Anderson</div><div class="teacher-nationality">🇺🇸 Mỹ · IELTS Examiner</div><div class="teacher-certs"><span class="teacher-cert">CELTA</span><span class="teacher-cert">IELTS Examiner</span><span class="teacher-cert">12 năm</span></div><div class="teacher-bio">Cựu giám khảo IELTS chính thức tại British Council. Chuyên IELTS Writing & Speaking band 7.0+.</div></div>
    <div class="teacher-card"><div class="teacher-av t2">🇬🇧</div><div class="teacher-name">Sarah Thompson</div><div class="teacher-nationality">🇬🇧 Anh · Business English</div><div class="teacher-certs"><span class="teacher-cert">DELTA</span><span class="teacher-cert">MA TESOL</span><span class="teacher-cert">10 năm</span></div><div class="teacher-bio">MBA từ University of Manchester. Từng làm việc tại Deloitte UK, chuyên Business & Corporate English.</div></div>
    <div class="teacher-card"><div class="teacher-av t3">🇦🇺</div><div class="teacher-name">David Morrison</div><div class="teacher-nationality">🇦🇺 Úc · Kids Specialist</div><div class="teacher-certs"><span class="teacher-cert">B.Ed Primary</span><span class="teacher-cert">CELTA</span><span class="teacher-cert">8 năm</span></div><div class="teacher-bio">Cử nhân Giáo dục Tiểu học ĐH Melbourne. 8 năm dạy trẻ em tại VN, được phụ huynh yêu thích nhất.</div></div>
    <div class="teacher-card"><div class="teacher-av t4">🇨🇦</div><div class="teacher-name">Jennifer Walsh</div><div class="teacher-nationality">🇨🇦 Canada · Pronunciation</div><div class="teacher-certs"><span class="teacher-cert">CELTA</span><span class="teacher-cert">Phonetics Expert</span><span class="teacher-cert">7 năm</span></div><div class="teacher-bio">Chuyên gia phát âm và giọng điệu. Giúp hàng nghìn học viên VN nói tiếng Anh không bị accent Việt.</div></div>
  </div>
</section>

<section class="results">
  <div class="sec-label">Kết quả học viên</div>
  <h2 class="sec-title">Con số thật — Học viên thật<br>Không bịa đặt</h2>
  <p class="sec-sub">Tất cả đều có giấy chứng nhận và điểm thi chính thức có thể verify</p>
  <div class="result-grid">
    <div class="result-card"><div class="result-top"><div class="result-score">IELTS 7.5</div><div class="result-exam">Overall · Cambridge 2024</div></div><div class="result-body"><p>"Từ 5.5 lên 7.5 sau 9 tháng. Điểm Writing tăng từ 5.0 lên 7.0 — điều tôi không tin là có thể. Coach Michael sửa từng bài, chi tiết đến từng câu."</p><div class="result-name">Nguyễn Thanh Hương · Lớp IELTS 7.0+</div></div></div>
    <div class="result-card"><div class="result-top"><div class="result-score">IELTS 7.0</div><div class="result-exam">IDP · Tháng 11/2024</div></div><div class="result-body"><p>"Mục tiêu ban đầu chỉ là 6.5 cho visa Úc. Được 7.0 surprise bản thân luôn. Lớp nhỏ và mock test hàng tuần là chìa khóa thành công."</p><div class="result-name">Trần Văn Đức · Visa 500 Úc</div></div></div>
    <div class="result-card"><div class="result-top"><div class="result-score">JLPT N2</div><div class="result-exam">Nhật · Tháng 12/2024</div></div><div class="result-body"><p>"Học tiếng Nhật từ 0, sau 18 tháng đậu N2. Giờ làm việc cho công ty Nhật tại HCM, lương tăng 60% so với trước."</p><div class="result-name">Lê Thị Phương · Khóa tiếng Nhật</div></div></div>
    <div class="result-card"><div class="result-top"><div class="result-score">TOPIK 4</div><div class="result-exam">Hàn · Tháng 10/2024</div></div><div class="result-body"><p>"Học online hoàn toàn vì bận đi làm. Giáo viên Hàn Quốc dạy rất tận tình qua Zoom. Đậu TOPIK 4 sau 14 tháng học."</p><div class="result-name">Phạm Ngọc Linh · Tiếng Hàn online</div></div></div>
  </div>
</section>

<section class="roadmap">
  <div class="sec-label">Lộ trình IELTS</div>
  <h2 class="sec-title">Từ 0 đến IELTS 7.0<br>trong 12 tháng</h2>
  <p class="sec-sub">Lộ trình đã giúp 5.000+ học viên đạt mục tiêu — rõ ràng, đo lường được, không mơ hồ</p>
  <div class="road-steps">
    <div class="road-step"><div class="road-num">1</div><div class="road-body"><h3>Foundation (Tháng 1-2) — Nền tảng vững chắc</h3><p>Ngữ pháp cơ bản → nâng cao, 2000 từ vựng IELTS core, phonetics chuẩn AmE, luyện nghe từng âm tiết. Test đầu vào và xây lộ trình cá nhân.</p><span class="road-level">Mục tiêu: 4.0 Band</span></div></div>
    <div class="road-step"><div class="road-num">2</div><div class="road-body"><h3>Intermediate (Tháng 3-5) — Kỹ năng cốt lõi</h3><p>Reading strategies cho Academic texts, Listening từ section 1-4, Writing Task 1 graphs/charts + Task 2 essays. Speaking part 1 & 2 fluency drilling.</p><span class="road-level">Mục tiêu: 5.5 Band</span></div></div>
    <div class="road-step"><div class="road-num">3</div><div class="road-body"><h3>Upper-Intermediate (Tháng 6-9) — Chiến lược thi</h3><p>IELTS exam strategies chi tiết từng task, mock test hàng tuần với phân tích điểm. Writing academic được chấm bởi cựu giám khảo, sửa đến khi đúng.</p><span class="road-level">Mục tiêu: 6.5 Band</span></div></div>
    <div class="road-step"><div class="road-num">4</div><div class="road-body"><h3>Advanced (Tháng 10-12) — Sprint đến đích</h3><p>Full mock test dưới điều kiện thi thật mỗi 2 tuần. Tập trung tinh chỉnh điểm yếu cuối cùng. Tâm lý thi và chiến lược quản lý thời gian.</p><span class="road-level">Mục tiêu: 7.0+ Band</span></div></div>
  </div>
</section>

<section class="pricing">
  <div class="sec-label">Học phí</div>
  <h2 class="sec-title">Đầu tư nhỏ —<br>thay đổi lớn</h2>
  <p class="sec-sub">So sánh học phí tại các trung tâm lớn: chúng tôi tốt hơn với chi phí thấp hơn 30-40%</p>
  <div class="plan-grid">
    <div class="plan"><div class="plan-name">Online</div><div class="plan-price">1.800K</div><div class="plan-per">/tháng · 12 buổi · Zoom</div><a href="#" class="plan-btn plan-btn-outline">Đăng ký ngay →</a><div class="plan-feats">✓ Lớp online 12 người<br>✓ Giáo viên bản ngữ<br>✓ App học liệu + AI<br>✓ Chữa bài Writing 48h</div></div>
    <div class="plan hot"><div class="plan-name">Offline ⭐ Phổ biến</div><div class="plan-price">3.500K</div><div class="plan-per">/tháng · 3 buổi/tuần · 2h</div><a href="#" class="plan-btn plan-btn-hot">Học thử 7 ngày →</a><div class="plan-feats">✓ Lớp offline 12 người<br>✓ GV bản ngữ + hỗ trợ VN<br>✓ Mock test hàng tuần<br>✓ Cam kết đầu ra ghi HĐ<br>✓ Trả góp 0%</div></div>
    <div class="plan"><div class="plan-name">1-1 Private</div><div class="plan-price">8.000K</div><div class="plan-per">/tháng · 8 buổi · 90 phút</div><a href="#" class="plan-btn plan-btn-outline">Xem chi tiết →</a><div class="plan-feats">✓ 100% thời gian dành cho bạn<br>✓ Lịch linh hoạt theo bạn<br>✓ Tiến độ nhanh gấp 3x<br>✓ Chọn GV phù hợp nhất</div></div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Học viên chia sẻ</div>
  <h2 class="sec-title" style="color:#e8e0f8">Tiếng Anh thay đổi<br>cả cuộc đời họ</h2>
  <p class="sec-sub" style="margin-bottom:48px">Không chỉ là điểm số — mà là cơ hội, công việc, và sự tự tin</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Nhờ IELTS 7.0 từ Lingu, tôi được học bổng Master tại Úc trị giá 800 triệu đồng. Tất cả bắt đầu từ việc tôi quyết định học thử 7 ngày miễn phí ở đây."</div><div class="testi-auth"><div class="testi-av">TN</div><div><div class="testi-name">Trần Ngọc Sơn</div><div class="testi-src">Du học Úc · IELTS 7.0</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Làm việc tại công ty đa quốc gia, không tự tin nói tiếng Anh trong meeting. Sau 4 tháng Business English, giờ tôi dẫn meeting với người Mỹ mỗi tuần. Lương tăng 40%."</div><div class="testi-auth"><div class="testi-av">LH</div><div><div class="testi-name">Lê Hoàng Minh</div><div class="testi-src">Business English · Marketing Manager</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Con tôi học ở đây từ lúc 8 tuổi. Giờ 12 tuổi thi Movers đạt điểm tuyệt đối. Quan trọng hơn là con yêu thích tiếng Anh, tự đọc sách Anh ngữ mỗi ngày."</div><div class="testi-auth"><div class="testi-av">PH</div><div><div class="testi-name">Phụ huynh Phạm Thu Hà</div><div class="testi-src">Tiếng Anh trẻ em · Quận 7</div></div></div></div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Những điều bạn cần biết<br>trước khi đăng ký</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">📊 Tôi bắt đầu từ 0 có học được không?</div><div class="faq-a">Hoàn toàn được. Chúng tôi có lớp Starter từ A1 cho người chưa biết gì. Test trình độ đầu vào miễn phí sẽ xếp bạn vào đúng lớp phù hợp. Không ai bị "ném vào lớp sai trình độ" tại đây.</div></div>
    <div class="faq-item"><div class="faq-q">🎯 Cam kết đầu ra hoạt động như thế nào?</div><div class="faq-a">Cam kết được ghi trong Hợp đồng học tập: nếu bạn hoàn thành đủ buổi học và bài tập nhưng không đạt band điểm mục tiêu, được học lại toàn bộ khóa miễn phí đến khi đạt. Điều kiện duy nhất là điểm danh trên 90% và nộp đủ bài tập.</div></div>
    <div class="faq-item"><div class="faq-q">📱 Học online có hiệu quả như offline không?</div><div class="faq-a">Tỷ lệ đạt cam kết của lớp online và offline gần như tương đương (95% vs 97%). Lớp online sử dụng Zoom Pro với breakout room cho luyện speaking nhóm, bảng whiteboard tương tác và hệ thống quản lý bài tập riêng. Nhiều học viên thích online hơn vì tiết kiệm thời gian đi lại.</div></div>
    <div class="faq-item"><div class="faq-q">⏰ Lịch học như thế nào? Có linh hoạt không?</div><div class="faq-a">Có nhiều ca học: sáng (7:30-9:30), chiều (14:00-16:00), tối (18:30-20:30) và cuối tuần. Online thì linh hoạt hơn vì có thêm các khung giờ 12:00-14:00 và 21:00-23:00. Nếu bỏ buổi có thể bù trong tuần với lớp khác cùng trình độ.</div></div>
  </div>
</section>

<section class="cta-sec">
  <h2>Học thử <span style="background:linear-gradient(135deg,#f97316,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent">7 ngày miễn phí</span></h2>
  <p>Không cần cam kết. Không cần thẻ tín dụng. Chỉ cần quyết định thay đổi.</p>
  <a href="#" class="btn-orange" style="display:inline-flex">🚀 Bắt đầu học thử ngay →</a>
  <p style="margin-top:14px;font-size:13px;color:#6b7280">Tư vấn khóa học phù hợp trong 15 phút · Test trình độ miễn phí</p>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🌍 <span>Lingu</span>Pro Center</div><div class="footer-tagline">Trung tâm ngoại ngữ chuẩn quốc tế · Thành lập 2014</div></div>
    <div class="footer-links"><a href="#">Khóa học IELTS</a><a href="#">Business English</a><a href="#">Tiếng Anh trẻ em</a><a href="#">Tiếng Nhật / Hàn / Trung</a></div>
    <div class="footer-links"><a href="#">📍 CS1: 45 Đinh Tiên Hoàng, Q.1</a><a href="#">📍 CS2: 89 Nguyễn Đình Chiểu, Q.3</a><a href="#">📞 028 2345 6789 (8:00–21:00)</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 LinguPro Center · MST: 0312345679 · Cơ sở giáo dục đăng ký Sở GD&ĐT TP.HCM</div>
</body></html>`

const LP_SPA = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1a0a2e}
.hero{background:linear-gradient(160deg,#fdf4ff 0%,#f5e8ff 50%,#fff5f7 100%);padding:100px 24px 80px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #e9d5ff;color:#7c3aed;border-radius:999px;padding:7px 20px;font-size:12px;font-weight:700;letter-spacing:.5px;margin-bottom:28px}
.hero h1{font-size:clamp(34px,5.5vw,62px);font-weight:900;color:#3b0764;line-height:1.15;margin-bottom:18px}
.hero h1 span{background:linear-gradient(135deg,#7c3aed,#db2777);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#6b21a8;max-width:560px;margin:0 auto 36px;line-height:1.8}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(124,58,237,.3)}
.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:#fff;border:2px solid #e9d5ff;color:#7c3aed;border-radius:12px;padding:15px 26px;font-size:15px;font-weight:600;text-decoration:none}
.hero-note{font-size:13px;color:#7c3aed;opacity:.8}
.stats-bar{background:linear-gradient(135deg,#3b0764,#6b21a8);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;color:#e9d5ff}
.stat-l{font-size:12px;color:#d8b4fe;margin-top:4px}
.sec-label{color:#7c3aed;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:34px;font-weight:800;color:#3b0764;text-align:center;margin-bottom:12px;line-height:1.25}
.sec-sub{text-align:center;font-size:15px;color:#7c3aed;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7;opacity:.85}
.services{padding:90px 24px;background:#fff}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;max-width:1060px;margin:0 auto}
.svc-card{border:1.5px solid #f3e8ff;border-radius:18px;padding:32px;background:linear-gradient(160deg,#fdf4ff,#fff)}
.svc-icon{width:62px;height:62px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px}
.svc-name{font-size:18px;font-weight:800;color:#3b0764;margin-bottom:8px}
.svc-desc{font-size:14px;color:#6b7280;line-height:1.7;margin-bottom:14px}
.svc-time{font-size:12px;color:#7c3aed;font-weight:600;margin-bottom:6px}
.svc-price{font-size:18px;font-weight:800;color:#7c3aed}
.process{padding:90px 24px;background:linear-gradient(160deg,#fdf4ff,#fff5f7)}
.proc-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.proc-step{text-align:center;padding:28px 20px}
.proc-num{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 6px 20px rgba(124,58,237,.3)}
.proc-title{font-size:16px;font-weight:700;color:#3b0764;margin-bottom:8px}
.proc-desc{font-size:13px;color:#6b7280;line-height:1.65}
.team{padding:90px 24px;background:#fff}
.team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;max-width:980px;margin:0 auto}
.team-card{border:1.5px solid #f3e8ff;border-radius:18px;padding:28px;text-align:center;background:linear-gradient(160deg,#fdf4ff,#fff)}
.team-av{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#db2777);display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 16px;box-shadow:0 4px 16px rgba(124,58,237,.25)}
.team-name{font-size:18px;font-weight:800;color:#3b0764;margin-bottom:4px}
.team-role{font-size:13px;color:#7c3aed;font-weight:600;margin-bottom:10px}
.team-certs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}
.team-cert{background:#f3e8ff;color:#6d28d9;border-radius:6px;padding:3px 9px;font-size:11px;font-weight:600}
.team-bio{font-size:13px;color:#6b7280;line-height:1.6}
.before-after{padding:90px 24px;background:linear-gradient(160deg,#fdf4ff,#fff5f7)}
.ba-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.ba-card{background:#fff;border:1.5px solid #f3e8ff;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(124,58,237,.08)}
.ba-top{background:linear-gradient(135deg,#7c3aed,#db2777);padding:24px;text-align:center}
.ba-title{font-size:18px;font-weight:900;color:#fff;margin-bottom:4px}
.ba-sessions{font-size:13px;color:#e9d5ff}
.ba-body{padding:22px}
.ba-body p{font-size:14px;color:#6b7280;line-height:1.65;margin-bottom:10px}
.ba-name{font-size:13px;font-weight:700;color:#7c3aed}
.packages{padding:90px 24px;background:#fff}
.pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:980px;margin:0 auto 28px}
.pack{border:2px solid #f3e8ff;border-radius:20px;padding:32px;background:linear-gradient(160deg,#fdf4ff,#fff);text-align:left}
.pack.featured{background:linear-gradient(135deg,#7c3aed,#6d28d9);border-color:transparent}
.pack-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7c3aed;margin-bottom:12px}
.pack.featured .pack-label{color:#e9d5ff}
.pack-price{font-size:46px;font-weight:900;color:#3b0764;line-height:1;margin-bottom:6px}
.pack.featured .pack-price{color:#fff}
.pack-old{font-size:15px;text-decoration:line-through;color:#d1d5db;margin-bottom:20px}
.pack.featured .pack-old{color:#c4b5fd}
.pack-btn{display:block;border-radius:12px;padding:13px;text-align:center;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:20px}
.pack-btn-out{background:#f3e8ff;color:#7c3aed}
.pack-btn-in{background:#fff;color:#7c3aed}
.pack-feats{font-size:14px;color:#6b7280;line-height:2.1}
.pack.featured .pack-feats{color:#e9d5ff}
.testi{padding:90px 24px;background:linear-gradient(135deg,#3b0764,#6b21a8)}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:28px}
.testi-stars{color:#fbbf24;font-size:17px;margin-bottom:12px}
.testi-q{font-size:15px;color:#f3e8ff;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:14px}
.testi-name{font-size:14px;font-weight:700;color:#fff}
.testi-svc{font-size:12px;color:#d8b4fe}
.faq{padding:90px 24px;background:linear-gradient(160deg,#fdf4ff,#fff)}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1.5px solid #f3e8ff;border-radius:12px;padding:24px}
.faq-q{font-weight:700;color:#7c3aed;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#6b7280;line-height:1.75}
.cta-sec{padding:80px 24px;background:linear-gradient(135deg,#fdf4ff,#fff5f7);text-align:center}
.cta-box{background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:24px;padding:60px 40px;max-width:700px;margin:0 auto}
.cta-box h2{font-size:36px;font-weight:900;color:#fff;margin-bottom:14px;line-height:1.25}
.cta-box p{color:#e9d5ff;font-size:16px;margin-bottom:32px;line-height:1.65}
.cta-box .btn-white{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#7c3aed;border-radius:12px;padding:17px 36px;font-size:16px;font-weight:800;text-decoration:none}
.footer{background:#3b0764;padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fff;margin-bottom:6px}
.footer-brand span{color:#c084fc}
.footer-tagline{font-size:13px;color:#d8b4fe}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#d8b4fe;text-decoration:none;font-size:14px}
.footer-bottom{background:#2e0650;text-align:center;padding:16px 24px;font-size:12px;color:#c4b5fd}
</style></head>
<body>

<section class="hero">
  <div class="badge">💆 Thẩm mỹ spa 5 sao · 15.000+ khách hàng thân thiết</div>
  <h1>Tái sinh vẻ đẹp<br><span>từ bên trong</span></h1>
  <p>Spa cao cấp kết hợp liệu pháp truyền thống phương Đông và công nghệ thẩm mỹ hiện đại — nơi bạn thực sự được nghỉ ngơi và làm đẹp.</p>
  <div class="hero-btns">
    <a href="#" class="btn-primary">💐 Đặt lịch spa ngay</a>
    <a href="#" class="btn-secondary">📋 Xem toàn bộ dịch vụ</a>
  </div>
  <p class="hero-note">Tư vấn miễn phí · Đặt online giảm 10% · Tặng đồ uống khi đến</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">15K+</div><div class="stat-l">Khách hàng thân thiết</div></div>
    <div><div class="stat-n">50+</div><div class="stat-l">Kỹ thuật viên có bằng</div></div>
    <div><div class="stat-n">200+</div><div class="stat-l">Liệu trình phục vụ</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Google & Facebook</div></div>
    <div><div class="stat-n">8</div><div class="stat-l">Năm phục vụ</div></div>
  </div>
</div>

<section class="services">
  <div class="sec-label">Dịch vụ spa</div>
  <h2 class="sec-title">Trải nghiệm thư giãn<br>và làm đẹp toàn diện</h2>
  <p class="sec-sub">Từ massage thư giãn đến điều trị thẩm mỹ chuyên sâu — mỗi dịch vụ là một hành trình tái sinh</p>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-icon">🙌</div><div class="svc-name">Full Body Massage</div><div class="svc-desc">Massage toàn thân kết hợp kỹ thuật Thái Lan, Shiatsu Nhật Bản và liệu pháp tinh dầu Ayurveda. Giải tỏa căng thẳng, cải thiện tuần hoàn máu, ngủ ngon hơn ngay buổi đầu.</div><div class="svc-time">⏱ 60 · 90 · 120 phút</div><div class="svc-price">Từ 450.000đ</div></div>
    <div class="svc-card"><div class="svc-icon">✨</div><div class="svc-name">Facial Thẩm Mỹ Cao Cấp</div><div class="svc-desc">Liệu trình chăm sóc da mặt chuyên sâu với công nghệ RF lifting, microneedling và chiết xuất tế bào gốc. Giảm nếp nhăn, căng bóng da, mờ thâm đốm nâu sau 1 buổi.</div><div class="svc-time">⏱ 90 phút · Facial Pro</div><div class="svc-price">Từ 1.200.000đ</div></div>
    <div class="svc-card"><div class="svc-icon">💧</div><div class="svc-name">Điều Trị Da Laser</div><div class="svc-desc">Laser Pico, Q-Switch và Fractional CO2 điều trị nám, tàn nhang, sẹo rỗ và trẻ hóa da. Được thực hiện bởi bác sĩ da liễu — an toàn, chính xác, lành nhanh.</div><div class="svc-time">⏱ 30–60 phút/buổi</div><div class="svc-price">Từ 2.500.000đ/buổi</div></div>
    <div class="svc-card"><div class="svc-icon">🌸</div><div class="svc-name">Triệt Lông Vĩnh Viễn</div><div class="svc-desc">Công nghệ Diode Laser 810nm — hiệu quả nhất cho da Châu Á. Không đau, không phỏng, không thay đổi sắc tố da. Liệu trình 6-8 buổi để triệt sạch 95%+ lông.</div><div class="svc-time">⏱ Theo vùng điều trị</div><div class="svc-price">Từ 500.000đ/vùng</div></div>
    <div class="svc-card"><div class="svc-icon">💅</div><div class="svc-name">Nail Art & Chăm Sóc Tay Chân</div><div class="svc-desc">Nail salon cao cấp với hơn 500 mẫu nail theo mùa. Gel Shellac, acrylic, builder gel. Manicure và pedicure chuyên sâu với spa tay chân ngâm muối biển và dưỡng kem tay chân.</div><div class="svc-time">⏱ 60–120 phút</div><div class="svc-price">Từ 200.000đ</div></div>
    <div class="svc-card"><div class="svc-icon">🌺</div><div class="svc-name">Gội Đầu Dưỡng Sinh & Phục Hồi Tóc</div><div class="svc-desc">Gội đầu thư giãn bấm huyệt đầu 45 phút + ủ phục hồi tóc hư tổn với keratin và protein tóc. Tóc mềm mượt, bóng khỏe, giảm gãy rụng từ buổi đầu tiên.</div><div class="svc-time">⏱ 90 phút trọn gói</div><div class="svc-price">Từ 350.000đ</div></div>
  </div>
</section>

<section class="process">
  <div class="sec-label">Quy trình dịch vụ</div>
  <h2 class="sec-title">Trải nghiệm spa<br>từ lúc bước vào đến lúc ra về</h2>
  <p class="sec-sub">Mỗi chi tiết đều được thiết kế để bạn cảm thấy được trân trọng và thư giãn hoàn toàn</p>
  <div class="proc-steps">
    <div class="proc-step"><div class="proc-num">1</div><div class="proc-title">Chào đón & Tư vấn</div><div class="proc-desc">Trà thảo mộc nóng, khăn lạnh và tư vấn 1-1 với chuyên viên để xác định dịch vụ phù hợp nhất.</div></div>
    <div class="proc-step"><div class="proc-num">2</div><div class="proc-title">Thay đồ & Chuẩn bị</div><div class="proc-desc">Tủ cá nhân riêng, áo choàng spa cao cấp, phòng thay đồ riêng tư sạch sẽ và yên tĩnh.</div></div>
    <div class="proc-step"><div class="proc-num">3</div><div class="proc-title">Điều trị chuyên sâu</div><div class="proc-desc">Phòng riêng yên tĩnh, nhạc thư giãn, hương thơm tinh dầu, nhiệt độ tối ưu 24°C. Hoàn toàn riêng tư.</div></div>
    <div class="proc-step"><div class="proc-num">4</div><div class="proc-title">Phục hồi & Thư giãn</div><div class="proc-desc">Phòng nghỉ chung sau điều trị với trà hoa, snack healthy và không gian nhẹ nhàng để cơ thể hồi phục.</div></div>
    <div class="proc-step"><div class="proc-num">5</div><div class="proc-title">Tư vấn chăm sóc tại nhà</div><div class="proc-desc">Chuyên viên hướng dẫn routine chăm sóc sau điều trị và gợi ý sản phẩm phù hợp với da/tóc của bạn.</div></div>
  </div>
</section>

<section class="team">
  <div class="sec-label">Đội ngũ chuyên viên</div>
  <h2 class="sec-title">Bàn tay vàng của<br>nghề làm đẹp</h2>
  <p class="sec-sub">100% kỹ thuật viên có chứng chỉ chuyên môn và được đào tạo liên tục theo tiêu chuẩn spa 5 sao</p>
  <div class="team-grid">
    <div class="team-card"><div class="team-av">💆</div><div class="team-name">Nguyễn Thị Hoa</div><div class="team-role">Master Therapist · 12 năm</div><div class="team-certs"><span class="team-cert">CIDESCO</span><span class="team-cert">IHM Massage</span></div><div class="team-bio">Chứng chỉ quốc tế CIDESCO Thụy Sĩ — cao nhất trong ngành spa. Chuyên gia massage trị liệu và liệu pháp đá nóng.</div></div>
    <div class="team-card"><div class="team-av">✨</div><div class="team-name">BS. Lê Thị Thanh Vân</div><div class="team-role">Bác Sĩ Da Liễu · Laser</div><div class="team-certs"><span class="team-cert">Da liễu ĐH Y</span><span class="team-cert">Laser Certified</span></div><div class="team-bio">Bác sĩ da liễu chuyên thực hiện tất cả liệu trình laser và điều trị chuyên sâu, đảm bảo an toàn tuyệt đối.</div></div>
    <div class="team-card"><div class="team-av">🌸</div><div class="team-name">Trần Ngọc Linh</div><div class="team-role">Senior Nail Artist · 8 năm</div><div class="team-certs"><span class="team-cert">NNA Certified</span><span class="team-cert">Ombre Expert</span></div><div class="team-bio">Nail artist với 8 năm kinh nghiệm và hơn 10.000 bộ nail đã làm. Được 5.000+ khách hàng quay lại mỗi tháng.</div></div>
    <div class="team-card"><div class="team-av">💇</div><div class="team-name">Phạm Minh Tú</div><div class="team-role">Hair Expert · Phục Hồi Tóc</div><div class="team-certs"><span class="team-cert">L'Oréal Pro</span><span class="team-cert">Kerastase Certified</span></div><div class="team-bio">Chuyên gia phục hồi tóc hư tổn và ủ dưỡng. Được L'Oréal Professionnel và Kérastase chứng nhận.</div></div>
  </div>
</section>

<section class="before-after">
  <div class="sec-label">Kết quả thực tế</div>
  <h2 class="sec-title">Thay đổi thấy rõ<br>sau từng liệu trình</h2>
  <p class="sec-sub">Hình ảnh thật từ khách hàng thật — không chỉnh sửa, không filter</p>
  <div class="ba-grid">
    <div class="ba-card"><div class="ba-top"><div class="ba-title">Mờ nám 70%</div><div class="ba-sessions">5 buổi Laser Pico · 3 tháng</div></div><div class="ba-body"><p>"Nám má đã theo tôi 7 năm sau khi sinh con. Sau 5 buổi laser Pico tại đây, nám mờ đến 70%, da đều màu hơn bao giờ hết. Tiếp tục 3 buổi nữa là xong."</p><div class="ba-name">Chị Nguyễn Thị Mai Anh · 38 tuổi</div></div></div>
    <div class="ba-card"><div class="ba-top"><div class="ba-title">Da căng lên 5 tuổi</div><div class="ba-sessions">8 buổi RF Lifting · 4 tháng</div></div><div class="ba-body"><p>"Bắt đầu ở tuổi 42, da bắt đầu chảy xệ. Sau 8 buổi RF lifting, cằm và má rõ ràng hơn, nếp nhăn quanh mắt giảm hẳn. Chồng cứ hỏi đi đâu trẻ ra vậy!"</p><div class="ba-name">Chị Lê Hoàng Yến · 42 tuổi</div></div></div>
    <div class="ba-card"><div class="ba-top"><div class="ba-title">Tóc phục hồi hoàn toàn</div><div class="ba-sessions">6 buổi Kerastase · 2 tháng</div></div><div class="ba-body"><p>"Tóc xấu, khô, gãy rụng nhiều sau khi nhuộm liên tục. 6 buổi ủ Kerastase Fusio-Dose kết hợp với điều chỉnh chăm sóc tại nhà. Tóc mượt và bóng như chưa từng hư."</p><div class="ba-name">Chị Trần Thu Hương · 29 tuổi</div></div></div>
    <div class="ba-card"><div class="ba-top"><div class="ba-title">Triệt sạch 95% lông</div><div class="ba-sessions">8 buổi Diode Laser</div></div><div class="ba-body"><p>"Đã thử wax và kem tẩy lông nhưng chỉ 2 tuần là lông mọc lại. Triệt Diode Laser đủ 8 buổi — giờ gần như không còn lông, tiết kiệm được hàng triệu mỗi năm."</p><div class="ba-name">Chị Phạm Ngọc An · 26 tuổi</div></div></div>
  </div>
</section>

<section class="packages">
  <div class="sec-label">Gói dịch vụ</div>
  <h2 class="sec-title">Gói tháng tiết kiệm<br>dành riêng cho bạn</h2>
  <p class="sec-sub">Tiết kiệm đến 40% khi đăng ký gói — được sử dụng linh hoạt trong 3 tháng</p>
  <div class="pack-grid">
    <div class="pack"><div class="pack-label">Gói Thư Giãn</div><div class="pack-price">1.500K</div><div class="pack-old">2.100.000đ</div><a href="#" class="pack-btn pack-btn-out">Đăng ký ngay →</a><div class="pack-feats">✓ 3 buổi massage body 60'<br>✓ 1 buổi facial cơ bản<br>✓ Trà & snack mỗi lần đến<br>✓ Sử dụng trong 3 tháng</div></div>
    <div class="pack featured"><div class="pack-label">Gói Làm Đẹp ⭐</div><div class="pack-price">3.800K</div><div class="pack-old">6.200.000đ</div><a href="#" class="pack-btn pack-btn-in">Đăng ký gói hot →</a><div class="pack-feats">✓ 4 buổi massage body 90'<br>✓ 2 buổi facial RF lifting<br>✓ 1 bộ nail cao cấp<br>✓ 1 buổi gội đầu phục hồi<br>✓ Giảm thêm 10% dịch vụ lẻ</div></div>
    <div class="pack"><div class="pack-label">Gói Trị Liệu Da</div><div class="pack-price">6.500K</div><div class="pack-old">10.000.000đ</div><a href="#" class="pack-btn pack-btn-out">Xem chi tiết →</a><div class="pack-feats">✓ 5 buổi laser điều trị da<br>✓ 3 buổi facial chuyên sâu<br>✓ Tư vấn BS da liễu 1-1<br>✓ Sản phẩm chăm sóc tại nhà</div></div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Cảm nhận khách hàng</div>
  <h2 class="sec-title" style="color:#fff">Họ đến một lần<br>rồi không thể không quay lại</h2>
  <p class="sec-sub" style="color:#d8b4fe;margin-bottom:48px">90% khách hàng quay lại trong vòng 1 tháng — đó là đánh giá trung thực nhất</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Tôi đã đến 20+ spa ở TP.HCM trong 5 năm qua. Đây là nơi duy nhất tôi quay lại đều đặn hàng tháng. Không gian như resort 5 sao, kỹ thuật viên tuyệt vời và quan trọng nhất — tôi luôn cảm thấy được quan tâm thực sự."</div><div class="testi-auth"><div class="testi-av">KH</div><div><div class="testi-name">Chị Khánh Hà</div><div class="testi-svc">VIP Member · 3 năm</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Bác sĩ Vân tư vấn cực kỳ cẩn thận trước khi làm laser — không chạy theo doanh thu, chỉ làm những gì thực sự cần thiết. Sau 6 buổi Pico, da tôi đẹp hơn 10 năm trước. Không tiếc 1 đồng nào."</div><div class="testi-auth"><div class="testi-av">NL</div><div><div class="testi-name">Chị Ngọc Lan</div><div class="testi-svc">Laser Pico · 6 buổi</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Mua gói massage cho chồng tặng sinh nhật. Chồng vốn không thích spa nhưng sau buổi đầu về nhà cứ hỏi khi nào đi tiếp. Giờ 2 vợ chồng đăng ký gói couple hàng tháng. Tuyệt vời!"</div><div class="testi-auth"><div class="testi-av">TM</div><div><div class="testi-name">Chị Thanh Mỹ</div><div class="testi-svc">Couple Package</div></div></div></div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Những điều bạn<br>muốn biết trước khi đến</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">🕐 Giờ mở cửa và cách đặt lịch?</div><div class="faq-a">Mở cửa 8:00–21:00 tất cả các ngày kể cả lễ Tết. Đặt lịch qua website, Zalo hoặc gọi hotline. Khuyến khích đặt trước 24 giờ, đặt online được giảm 10%. Đặt lịch ngay trên trang hoặc nhắn Zalo số 0901 234 567.</div></div>
    <div class="faq-item"><div class="faq-q">⚠️ Laser có đau và nguy hiểm không?</div><div class="faq-a">Tất cả liệu trình laser đều do bác sĩ da liễu thực hiện — không phải kỹ thuật viên thông thường. Trước khi làm sẽ có bôi tê 30-45 phút, hầu hết khách hàng cảm nhận như kim nhỏ châm. Không nguy hiểm khi được thực hiện đúng thiết bị và đúng người. Chúng tôi không nhận bệnh nhân không phù hợp chỉ để có doanh thu.</div></div>
    <div class="faq-item"><div class="faq-q">👫 Có dịch vụ cho nam giới không?</div><div class="faq-a">Có. Hơn 30% khách hàng của chúng tôi là nam. Các dịch vụ phổ biến cho nam: massage thư giãn, facial nam, triệt lông lưng/ngực, điều trị nám và trẻ hóa da. Phòng điều trị hoàn toàn riêng tư, kỹ thuật viên chuyên phục vụ khách nam.</div></div>
    <div class="faq-item"><div class="faq-q">🤰 Phụ nữ mang thai có dùng được dịch vụ không?</div><div class="faq-a">Một số dịch vụ được, một số cần tránh. Massage bầu (pregnancy massage) với kỹ thuật riêng là hoàn toàn an toàn từ tam cá nguyệt thứ 2. Tuyệt đối không làm laser, triệt lông và một số liệu trình facial khi mang thai. Chúng tôi sẽ tư vấn cụ thể khi bạn đặt lịch.</div></div>
  </div>
</section>

<section class="cta-sec">
  <div class="cta-box">
    <h2>Đặt lịch ngay —<br>nhận ưu đãi 15%</h2>
    <p>Lần đầu đến Velvet Spa, nhận ngay ưu đãi 15% toàn bộ dịch vụ và một ly trà thảo mộc đặc biệt chào đón.</p>
    <a href="#" class="btn-white">💐 Đặt lịch spa ngay →</a>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🌸 <span>Velvet</span> Spa & Beauty</div><div class="footer-tagline">Spa thẩm mỹ cao cấp · Thành lập 2018</div></div>
    <div class="footer-links"><a href="#">Massage & Body</a><a href="#">Facial & Da liễu</a><a href="#">Nail & Tóc</a><a href="#">Đặt lịch</a></div>
    <div class="footer-links"><a href="#">📍 CS1: 88 Lê Lợi, Q.1, TP.HCM</a><a href="#">📍 CS2: 234 Điện Biên Phủ, Q.Bình Thạnh</a><a href="#">📞 Hotline: 0901 234 567 (8:00–21:00)</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 Velvet Spa & Beauty · MST: 0312345680 · Giấy phép kinh doanh dịch vụ làm đẹp</div>
</body></html>`

const LP_RESTAURANT = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#0e0b08;color:#f0e8d8}
.hero{background:linear-gradient(160deg,#0e0b08 0%,#1e1408 50%,#0e0b08 100%);padding:110px 24px 90px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(217,119,6,.1) 0%,transparent 65%)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(217,119,6,.12);border:1px solid rgba(217,119,6,.3);color:#f59e0b;border-radius:4px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px}
.hero h1{font-size:clamp(36px,6vw,68px);font-weight:900;line-height:1.1;margin-bottom:20px;letter-spacing:-.5px}
.hero h1 .gold{background:linear-gradient(135deg,#d97706,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#a8967e;max-width:560px;margin:0 auto 40px;line-height:1.8}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
.btn-gold{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#d97706,#92400e);color:#fff;border-radius:6px;padding:17px 38px;font-size:16px;font-weight:800;text-decoration:none;box-shadow:0 8px 24px rgba(217,119,6,.3)}
.btn-out{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(217,119,6,.35);color:#f59e0b;border-radius:6px;padding:15px 28px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#78716c}
.stats-bar{background:rgba(217,119,6,.08);border-top:1px solid rgba(217,119,6,.15);border-bottom:1px solid rgba(217,119,6,.15);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;background:linear-gradient(135deg,#d97706,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-l{font-size:12px;color:#a8967e;margin-top:4px}
.sec-label{color:#d97706;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:34px;font-weight:800;text-align:center;margin-bottom:12px;line-height:1.25}
.sec-sub{text-align:center;font-size:15px;color:#a8967e;margin-bottom:50px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.75}
.story{padding:90px 24px;background:#0e0b08}
.story-inner{max-width:860px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:48px;align-items:center}
.story-text h2{font-size:32px;font-weight:800;margin-bottom:16px;line-height:1.3}
.story-text h2 span{color:#d97706}
.story-text p{font-size:15px;color:#a8967e;line-height:1.8;margin-bottom:16px}
.story-visual{background:linear-gradient(135deg,#1e1408,#2d1f0a);border:1px solid rgba(217,119,6,.15);border-radius:16px;padding:32px;text-align:center}
.story-emoji{font-size:64px;margin-bottom:16px;display:block}
.story-quote{font-size:16px;font-style:italic;color:#c8b99a;line-height:1.7}
.story-attr{font-size:13px;color:#d97706;font-weight:600;margin-top:12px}
.menu{padding:90px 24px;background:#0a0806}
.menu-cats{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:40px}
.menu-cat{background:rgba(217,119,6,.08);border:1px solid rgba(217,119,6,.2);color:#f59e0b;border-radius:4px;padding:8px 18px;font-size:13px;font-weight:700;cursor:pointer}
.menu-cat.active{background:rgba(217,119,6,.2);border-color:rgba(217,119,6,.5)}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;max-width:1060px;margin:0 auto}
.dish-card{background:#141009;border:1px solid rgba(217,119,6,.1);border-radius:14px;padding:24px;display:flex;gap:16px}
.dish-emoji{font-size:48px;flex-shrink:0}
.dish-body{flex:1}
.dish-name{font-size:17px;font-weight:800;color:#f0e8d8;margin-bottom:4px}
.dish-desc{font-size:13px;color:#a8967e;line-height:1.6;margin-bottom:10px}
.dish-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.dish-tag{background:rgba(217,119,6,.1);color:#f59e0b;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:600}
.dish-price{font-size:18px;font-weight:900;color:#d97706}
.space{padding:90px 24px;background:#0e0b08}
.space-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.space-card{background:#141009;border:1px solid rgba(217,119,6,.1);border-radius:16px;padding:28px;text-align:center}
.space-icon{font-size:44px;margin-bottom:14px;display:block}
.space-name{font-size:17px;font-weight:700;color:#f0e8d8;margin-bottom:8px}
.space-desc{font-size:13px;color:#a8967e;line-height:1.65;margin-bottom:12px}
.space-cap{font-size:12px;color:#d97706;font-weight:600}
.chef{padding:90px 24px;background:#0a0806}
.chef-inner{max-width:860px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:40px;align-items:center}
.chef-card{background:#141009;border:1px solid rgba(217,119,6,.15);border-radius:18px;padding:36px;text-align:center}
.chef-avatar{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#d97706,#92400e);display:flex;align-items:center;justify-content:center;font-size:48px;margin:0 auto 20px}
.chef-name{font-size:22px;font-weight:900;margin-bottom:4px}
.chef-title{font-size:14px;color:#d97706;font-weight:600;margin-bottom:14px}
.chef-awards{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:14px}
.chef-award{background:rgba(217,119,6,.12);color:#f59e0b;border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600}
.chef-bio{font-size:14px;color:#a8967e;line-height:1.7}
.chef-menu{display:flex;flex-direction:column;gap:16px}
.chef-specialty{background:#141009;border:1px solid rgba(217,119,6,.1);border-radius:12px;padding:20px;display:flex;gap:14px;align-items:flex-start}
.specialty-em{font-size:36px;flex-shrink:0}
.specialty-info h4{font-size:16px;font-weight:700;margin-bottom:4px}
.specialty-info p{font-size:13px;color:#a8967e;line-height:1.6}
.combos{padding:90px 24px;background:#0e0b08}
.combo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1000px;margin:0 auto}
.combo-card{background:#141009;border:1.5px solid rgba(217,119,6,.15);border-radius:18px;padding:32px;text-align:left}
.combo-card.featured{border-color:rgba(217,119,6,.5);background:rgba(217,119,6,.06)}
.combo-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#d97706;margin-bottom:12px}
.combo-name{font-size:20px;font-weight:800;margin-bottom:6px}
.combo-desc{font-size:14px;color:#a8967e;line-height:1.6;margin-bottom:14px}
.combo-items{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.combo-item{font-size:14px;color:#c8b99a;display:flex;align-items:center;gap:8px}
.combo-item::before{content:'🍽';font-size:12px;flex-shrink:0}
.combo-price{font-size:26px;font-weight:900;color:#d97706;margin-bottom:4px}
.combo-note{font-size:12px;color:#78716c}
.combo-btn{display:block;border-radius:8px;padding:13px;text-align:center;font-weight:700;text-decoration:none;font-size:14px;margin-top:16px}
.combo-btn-out{background:rgba(217,119,6,.1);border:1px solid rgba(217,119,6,.3);color:#f59e0b}
.combo-btn-in{background:linear-gradient(135deg,#d97706,#92400e);color:#fff}
.testi{padding:90px 24px;background:linear-gradient(135deg,#1e1408,#0e0b08)}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:rgba(217,119,6,.06);border:1px solid rgba(217,119,6,.12);border-radius:16px;padding:28px}
.testi-source{display:flex;gap:8px;align-items:center;margin-bottom:12px}
.testi-source-icon{font-size:14px}
.testi-source-name{font-size:12px;color:#d97706;font-weight:600}
.testi-stars{color:#f59e0b;font-size:17px;margin-bottom:10px}
.testi-q{font-size:15px;color:#c8b99a;font-style:italic;line-height:1.75;margin-bottom:14px}
.testi-auth{display:flex;align-items:center;gap:10px}
.testi-av{width:38px;height:38px;border-radius:50%;background:rgba(217,119,6,.2);display:flex;align-items:center;justify-content:center;font-weight:700;color:#d97706;font-size:13px}
.testi-name{font-size:14px;font-weight:700;color:#f0e8d8}
.testi-occ{font-size:12px;color:#78716c}
.booking{padding:90px 24px;background:#0a0806;text-align:center}
.book-box{background:#141009;border:1px solid rgba(217,119,6,.15);border-radius:20px;padding:48px;max-width:700px;margin:0 auto}
.book-box h3{font-size:28px;font-weight:800;margin-bottom:8px}
.book-box p{font-size:15px;color:#a8967e;margin-bottom:32px;line-height:1.7}
.book-form{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.book-input{background:rgba(255,255,255,.04);border:1px solid rgba(217,119,6,.2);border-radius:8px;padding:14px;color:#f0e8d8;font-size:15px;outline:none}
.book-input::placeholder{color:#4b5563}
.book-select{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(217,119,6,.2);border-radius:8px;padding:14px;color:#f0e8d8;font-size:15px;outline:none;margin-bottom:14px}
.book-btn{width:100%;background:linear-gradient(135deg,#d97706,#92400e);color:#fff;border:none;border-radius:8px;padding:17px;font-size:16px;font-weight:800;cursor:pointer}
.book-note{font-size:12px;color:#6b7280;margin-top:10px;line-height:1.6}
.faq{padding:90px 24px;background:#0e0b08}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#141009;border:1px solid rgba(217,119,6,.1);border-radius:12px;padding:24px}
.faq-q{font-weight:700;color:#d97706;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#a8967e;line-height:1.75}
.footer{background:#080604;border-top:1px solid rgba(217,119,6,.1);padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;margin-bottom:6px}
.footer-brand span{background:linear-gradient(135deg,#d97706,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.footer-tagline{font-size:13px;color:#78716c}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#a8967e;text-decoration:none;font-size:14px}
.footer-bottom{background:#080604;border-top:1px solid rgba(255,255,255,.04);text-align:center;padding:16px 24px;font-size:12px;color:#4b5563}
@media(max-width:640px){.book-form{grid-template-columns:1fr}}
</style></head>
<body>

<section class="hero">
  <div class="badge">🌟 Michelin Guide Recommended · 8 năm phục vụ</div>
  <h1>Nơi ẩm thực<br><span class="gold">trở thành nghệ thuật</span></h1>
  <p>Nhà hàng cao cấp phong cách Việt fusion — nguyên liệu tươi từ farm đối tác, bàn tay tài hoa của bếp trưởng 5 sao, không gian chạm đến cảm xúc.</p>
  <div class="hero-btns">
    <a href="#" class="btn-gold">🍽️ Đặt bàn ngay</a>
    <a href="#" class="btn-out">📖 Xem thực đơn</a>
  </div>
  <p class="hero-note">Phục vụ Thứ 3 – Chủ nhật · Trưa 11:30 – 14:00 · Tối 18:00 – 22:30</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">8</div><div class="stat-l">Năm phục vụ</div></div>
    <div><div class="stat-n">200+</div><div class="stat-l">Khách mỗi ngày</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Google Reviews</div></div>
    <div><div class="stat-n">15+</div><div class="stat-l">Giải thưởng ẩm thực</div></div>
    <div><div class="stat-n">3</div><div class="stat-l">Sao Michelin Bib Gourmand</div></div>
  </div>
</div>

<section class="story">
  <div class="story-inner">
    <div class="story-text">
      <div class="sec-label">Câu chuyện của chúng tôi</div>
      <h2>Ẩm thực Việt được<br><span>kể bằng ngôn ngữ</span> của thế giới</h2>
      <p>Được thành lập năm 2018 bởi Chef Nguyễn Minh Dũng — người đã trải qua 15 năm học hỏi tại các bếp hàng đầu Paris, Tokyo và New York — The Saigon Larder mang đến trải nghiệm độc đáo: linh hồn ẩm thực Việt trong từng nguyên liệu, kỹ thuật nấu ăn của thế giới trong từng kỹ thuật.</p>
      <p>Mỗi món ăn là một chuyến du hành — từ bờ biển Phú Quốc đến đồng bằng sông Cửu Long, từ cao nguyên Đà Lạt đến phố cổ Hội An. Tất cả được thuật lại trên chiếc đĩa của bạn tối nay.</p>
    </div>
    <div class="story-visual">
      <span class="story-emoji">👨‍🍳</span>
      <div class="story-quote">"Tôi nấu ăn bằng ký ức về bà nội, bằng những gì đã học được ở khắp nơi trên thế giới, và bằng tình yêu với nguyên liệu Việt Nam."</div>
      <div class="story-attr">— Chef Nguyễn Minh Dũng, Bếp trưởng & Đồng sáng lập</div>
    </div>
  </div>
</section>

<section class="menu">
  <div class="sec-label">Thực đơn nổi bật</div>
  <h2 class="sec-title">Những kiệt tác<br>trên chiếc đĩa</h2>
  <p class="sec-sub">Thực đơn thay đổi theo mùa — để mỗi lần đến là một trải nghiệm mới</p>
  <div class="menu-grid">
    <div class="dish-card"><div class="dish-emoji">🦞</div><div class="dish-body"><div class="dish-name">Tôm Hùm Đất Nướng Sốt Tiêu Xanh Phú Quốc</div><div class="dish-desc">Tôm hùm đất 600g tươi sống, nướng than hoa và phủ sốt tiêu xanh Phú Quốc với bơ Normandy. Phục vụ kèm bánh mì nướng tỏi và rau mầm địa phương.</div><div class="dish-tags"><span class="dish-tag">Signature</span><span class="dish-tag">Hải sản tươi</span></div><div class="dish-price">1.280.000đ</div></div></div>
    <div class="dish-card"><div class="dish-emoji">🥩</div><div class="dish-body"><div class="dish-name">Bò Wagyu A5 Áp Chảo Sốt Phở Giảm</div><div class="dish-desc">Bò Wagyu A5 Nhật Bản 200g áp chảo medium-rare, phủ sốt Phở cô đặc 6 tiếng với quế, hồi và gừng. Kèm khoai tây hấp Đà Lạt và rau cải xào tỏi đen.</div><div class="dish-tags"><span class="dish-tag">Chef's Choice</span><span class="dish-tag">Wagyu</span></div><div class="dish-price">1.650.000đ</div></div></div>
    <div class="dish-card"><div class="dish-emoji">🍜</div><div class="dish-body"><div class="dish-name">Phở Bò 36 Tiếng Trình Bày Fine Dining</div><div class="dish-desc">Nước dùng ninh 36 tiếng với 12 loại gia vị, thịt bò Úc thái lát mỏng, bánh phở tươi làm hàng ngày. Trình bày tinh tế theo phong cách haute cuisine nhưng hương vị thuần Việt.</div><div class="dish-tags"><span class="dish-tag">Iconic</span><span class="dish-tag">Bestseller</span></div><div class="dish-price">380.000đ</div></div></div>
    <div class="dish-card"><div class="dish-emoji">🐟</div><div class="dish-body"><div class="dish-name">Cá Mú Biển Hấp Gừng Hành Kiểu Quảng Đông</div><div class="dish-desc">Cá mú biển tươi Nha Trang 800g hấp kiểu Cantonese với gừng, hành xanh và tương ngọt. Phục vụ nguyên con tại bàn với rượu Shaoxing và dầu hào cao cấp.</div><div class="dish-tags"><span class="dish-tag">Seasonal</span><span class="dish-tag">Cantonese</span></div><div class="dish-price">980.000đ</div></div></div>
    <div class="dish-card"><div class="dish-emoji">🥗</div><div class="dish-body"><div class="dish-name">Gỏi Xoài Xanh Tôm Tươi Sorbet Sả</div><div class="dish-desc">Xoài xanh Cát Hòa, tôm biển tươi sautéed, rau thơm Ba Vì, giấm mật ong và sorbet sả tươi. Một khai vị thanh mát, cân bằng hoàn hảo giữa chua ngọt mặn.</div><div class="dish-tags"><span class="dish-tag">Khai vị</span><span class="dish-tag">Thuần chay có thể</span></div><div class="dish-price">290.000đ</div></div></div>
    <div class="dish-card"><div class="dish-emoji">🍮</div><div class="dish-body"><div class="dish-name">Bánh Flan Cà Phê Chồn Đà Lạt</div><div class="dish-desc">Flan mềm mịn pha từ cà phê chồn Đà Lạt, caramel rum, served với kem tươi whipped và praline hạt điều Bình Phước. Tráng miệng iconic của The Saigon Larder.</div><div class="dish-tags"><span class="dish-tag">Dessert</span><span class="dish-tag">Phải thử</span></div><div class="dish-price">185.000đ</div></div></div>
  </div>
</section>

<section class="space">
  <div class="sec-label">Không gian</div>
  <h2 class="sec-title">Mỗi góc nhỏ là<br>một câu chuyện riêng</h2>
  <p class="sec-sub">Thiết kế bởi KTS Trần Bảo Châu — kết hợp vật liệu truyền thống và thẩm mỹ đương đại</p>
  <div class="space-grid">
    <div class="space-card"><span class="space-icon">🌿</span><div class="space-name">Garden Terrace</div><div class="space-desc">Khoảng sân vườn mở giữa lòng thành phố với cây cối xanh mát, đèn fairy light và âm nhạc nhẹ nhàng. Lý tưởng cho buổi ăn tối lãng mạn.</div><div class="space-cap">Sức chứa 30 khách</div></div>
    <div class="space-card"><span class="space-icon">🕯️</span><div class="space-name">Wine Room</div><div class="space-desc">Phòng Private với hầm rượu 500 chai từ Bordeaux, Bourgogne và Napa Valley. Hoàn hảo cho tiệc kinh doanh và kỷ niệm đặc biệt.</div><div class="space-cap">Sức chứa 12 khách · Riêng tư hoàn toàn</div></div>
    <div class="space-card"><span class="space-icon">🔆</span><div class="space-name">Open Kitchen Bar</div><div class="space-desc">Ngồi ngay trước bếp mở, xem Chef Dũng và đội bếp làm việc trực tiếp. Trải nghiệm Chef's Table độc đáo và gần gũi nhất.</div><div class="space-cap">8 ghế · Booking riêng</div></div>
    <div class="space-card"><span class="space-icon">🎊</span><div class="space-name">Sảnh Events</div><div class="space-desc">Không gian linh hoạt cho tiệc sinh nhật, kỷ niệm, workshop ẩm thực và team building. Âm thanh, ánh sáng và bố trí theo yêu cầu.</div><div class="space-cap">Sức chứa 80 khách · Buffet hoặc Set menu</div></div>
  </div>
</section>

<section class="chef">
  <div class="sec-label">Bếp trưởng</div>
  <h2 class="sec-title">Người đứng sau<br>mỗi kiệt tác</h2>
  <div class="chef-inner">
    <div class="chef-card">
      <div class="chef-avatar">👨‍🍳</div>
      <div class="chef-name">Chef Nguyễn Minh Dũng</div>
      <div class="chef-title">Executive Chef & Co-founder</div>
      <div class="chef-awards"><span class="chef-award">Michelin Bib Gourmand 2023</span><span class="chef-award">Best Chef Vietnam 2022</span><span class="chef-award">Asia's 50 Best Restaurants</span></div>
      <div class="chef-bio">Tốt nghiệp Le Cordon Bleu Paris. Từng làm việc tại Joël Robuchon (3 sao Michelin), Sukiyabashi Jiro Tokyo và Per Se New York. Trở về VN với sứ mệnh đưa ẩm thực Việt lên bản đồ ẩm thực thế giới.</div>
    </div>
    <div class="chef-menu">
      <div class="chef-specialty">
        <div class="specialty-em">🏆</div>
        <div class="specialty-info"><h4>Giải Best Chef Vietnam 2022</h4><p>Do Hiệp hội Ẩm thực Việt Nam trao tặng, ghi nhận đóng góp trong việc hiện đại hóa ẩm thực Việt.</p></div>
      </div>
      <div class="chef-specialty">
        <div class="specialty-em">📚</div>
        <div class="specialty-info"><h4>Sách dạy nấu ăn bán chạy</h4><p>"Việt Fusion — Bếp Việt Gặp Thế Giới" — bán hơn 50.000 bản, dịch sang tiếng Anh và Pháp.</p></div>
      </div>
      <div class="chef-specialty">
        <div class="specialty-em">🎓</div>
        <div class="specialty-info"><h4>Workshop hàng tháng</h4><p>Chef Dũng trực tiếp dạy workshop "Bếp Việt từ A-Z" cho 20 học viên mỗi tháng tại nhà hàng.</p></div>
      </div>
      <div class="chef-specialty">
        <div class="specialty-em">🌱</div>
        <div class="specialty-info"><h4>Farm-to-table pioneer</h4><p>Đầu tiên ở VN xây dựng hệ thống 30+ nông trại đối tác, cam kết 90% nguyên liệu hữu cơ địa phương.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="combos">
  <div class="sec-label">Set menu & Ưu đãi</div>
  <h2 class="sec-title">Trọn vẹn bữa ăn<br>với mức giá tốt nhất</h2>
  <p class="sec-sub">Set menu theo mùa — được thiết kế để bạn trải nghiệm đầy đủ phong cách nấu ăn của chúng tôi</p>
  <div class="combo-grid">
    <div class="combo-card">
      <div class="combo-label">Set trưa</div>
      <div class="combo-name">Lunch Set — Đơn giản & Tinh tế</div>
      <div class="combo-desc">Bữa trưa sang trọng trong 45 phút — nhanh mà không vội vàng.</div>
      <div class="combo-items">
        <div class="combo-item">Súp hoặc Salad mùa</div>
        <div class="combo-item">1 món chính theo ngày</div>
        <div class="combo-item">Dessert nhỏ & Cà phê</div>
      </div>
      <div class="combo-price">485.000đ</div>
      <div class="combo-note">Thứ 3–Thứ 6 · 11:30–14:00 · Không áp dụng cuối tuần</div>
      <a href="#" class="combo-btn combo-btn-out">Đặt bàn trưa →</a>
    </div>
    <div class="combo-card featured">
      <div class="combo-label">⭐ Signature</div>
      <div class="combo-name">Degustation Menu — 7 Courses</div>
      <div class="combo-desc">Hành trình ẩm thực trọn vẹn qua 7 món — định nghĩa trải nghiệm The Saigon Larder.</div>
      <div class="combo-items">
        <div class="combo-item">Amuse-bouche & Bánh mì đặc biệt</div>
        <div class="combo-item">2 khai vị lạnh & nóng</div>
        <div class="combo-item">Sorbet chuyển vị</div>
        <div class="combo-item">Món chính Wagyu hoặc Hải sản</div>
        <div class="combo-item">Pre-dessert & Dessert</div>
        <div class="combo-item">Petit fours & Cà phê</div>
      </div>
      <div class="combo-price">1.680.000đ</div>
      <div class="combo-note">Wine pairing +900K · Vegetarian option available</div>
      <a href="#" class="combo-btn combo-btn-in">Đặt bàn tối →</a>
    </div>
    <div class="combo-card">
      <div class="combo-label">Tiệc riêng</div>
      <div class="combo-name">Private Dining — Theo yêu cầu</div>
      <div class="combo-desc">Bữa tối riêng tư trong Wine Room với menu cá nhân hóa theo sở thích.</div>
      <div class="combo-items">
        <div class="combo-item">Menu 5–9 courses theo yêu cầu</div>
        <div class="combo-item">Trang trí theo chủ đề</div>
        <div class="combo-item">Sommelier tư vấn rượu vang</div>
        <div class="combo-item">Chụp ảnh kỷ niệm miễn phí</div>
      </div>
      <div class="combo-price">Từ 2.500K/người</div>
      <div class="combo-note">Tối thiểu 8 khách · Đặt trước 3 ngày</div>
      <a href="#" class="combo-btn combo-btn-out">Liên hệ tư vấn →</a>
    </div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Cảm nhận thực khách</div>
  <h2 class="sec-title">Những tối không thể quên<br>tại The Saigon Larder</h2>
  <p class="sec-sub" style="color:#a8967e;margin-bottom:48px">Đọc thêm hơn 1.200 đánh giá 5 sao trên Google Maps và TripAdvisor</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-source"><span class="testi-source-icon">🌟</span><span class="testi-source-name">Michelin Guide</span></div><div class="testi-stars">★★★★★</div><div class="testi-q">"A remarkable expression of Vietnamese cuisine through a contemporary lens. Chef Dũng demonstrates exceptional technical skill while maintaining authentic flavors. The Phở 36-hour broth alone is worth the visit."</div><div class="testi-auth"><div class="testi-av">MG</div><div><div class="testi-name">Michelin Inspector</div><div class="testi-occ">Bib Gourmand 2023</div></div></div></div>
    <div class="testi-card"><div class="testi-source"><span class="testi-source-icon">📍</span><span class="testi-source-name">Google Reviews</span></div><div class="testi-stars">★★★★★</div><div class="testi-q">"Đây là nhà hàng Việt ngon nhất tôi từng ăn trong 20 năm sống ở Sài Gòn. Set 7 courses tối qua là trải nghiệm hoàn toàn khác — mỗi món đều kể một câu chuyện riêng. Nhất định phải quay lại."</div><div class="testi-auth"><div class="testi-av">TV</div><div><div class="testi-name">Anh Thanh Văn</div><div class="testi-occ">Food blogger · 150K followers</div></div></div></div>
    <div class="testi-card"><div class="testi-source"><span class="testi-source-icon">✈️</span><span class="testi-source-name">TripAdvisor</span></div><div class="testi-stars">★★★★★</div><div class="testi-q">"Best restaurant in Ho Chi Minh City! We came specifically because of the Michelin Bib Gourmand recognition. The Wagyu with Pho reduction sauce was absolutely mind-blowing. Service was impeccable."</div><div class="testi-auth"><div class="testi-av">JL</div><div><div class="testi-name">James & Lisa</div><div class="testi-occ">Du khách Pháp · Paris</div></div></div></div>
  </div>
</section>

<section class="booking">
  <div class="sec-label">Đặt bàn</div>
  <h2 class="sec-title">Giữ chỗ cho<br><span style="background:linear-gradient(135deg,#d97706,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent">bữa tối đặc biệt</span></h2>
  <p class="sec-sub" style="color:#a8967e">Nhà hàng thường kín chỗ vào cuối tuần — khuyến khích đặt trước 2–3 ngày</p>
  <div class="book-box">
    <h3>Đặt bàn online</h3>
    <p>Xác nhận trong 2 giờ · Không thu phí đặt bàn · Đặt lại miễn phí trước 4 tiếng</p>
    <div class="book-form">
      <input class="book-input" placeholder="Họ và tên *" type="text" />
      <input class="book-input" placeholder="Số điện thoại *" type="tel" />
    </div>
    <div class="book-form">
      <input class="book-input" placeholder="Ngày ăn *" type="date" />
      <input class="book-input" placeholder="Giờ *" type="time" />
    </div>
    <select class="book-select"><option>Số lượng khách</option><option>1–2 khách</option><option>3–4 khách</option><option>5–6 khách</option><option>7–10 khách</option><option>10+ khách (Private dining)</option></select>
    <button class="book-btn">🍽️ Đặt bàn ngay →</button>
    <div class="book-note">Vui lòng thông báo dị ứng thực phẩm hoặc yêu cầu đặc biệt · Chúng tôi sẽ xác nhận qua SMS/Zalo</div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Thông tin cần biết</div>
  <h2 class="sec-title">Trước khi bạn đến<br>với chúng tôi</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">👔 Dress code như thế nào?</div><div class="faq-a">Smart casual — tức là không cần formal suit nhưng vui lòng tránh quần short, dép lê và áo ba lỗ. Garden Terrace thoải mái hơn một chút; Wine Room Private Dining thì smart casual hoặc smart formal. Chúng tôi muốn bạn thoải mái nhưng phù hợp với không gian.</div></div>
    <div class="faq-item"><div class="faq-q">🅿️ Có chỗ đậu xe không?</div><div class="faq-a">Bãi đậu xe riêng miễn phí 40 chỗ trong hẻm sau nhà hàng (vào từ đường Lê Thánh Tôn). Valet parking phục vụ từ 18:00–23:00 với phí 50.000đ. Gần đây cũng có bãi xe công cộng tại số 8 Tôn Đức Thắng.</div></div>
    <div class="faq-item"><div class="faq-q">🌱 Có món chay/thuần chay không?</div><div class="faq-a">Có. Toàn bộ Set menu đều có phiên bản vegetarian và vegan theo yêu cầu — vui lòng thông báo khi đặt bàn để bếp chuẩn bị nguyên liệu phù hợp. Chef Dũng đặc biệt tôn trọng các yêu cầu về chế độ ăn và sẽ không đơn giản là "bỏ thịt" mà sẽ thay thế bằng nguyên liệu thực vật thú vị.</div></div>
    <div class="faq-item"><div class="faq-q">🎂 Nhà hàng có hỗ trợ tiệc sinh nhật/kỷ niệm không?</div><div class="faq-a">Chúng tôi rất vui được đồng hành cùng những dịp đặc biệt của bạn. Chuẩn bị bánh sinh nhật theo yêu cầu (+350K), trang trí bàn ăn, chụp ảnh kỷ niệm. Đặt Private Dining trong Wine Room cho tối hơn 8 người. Vui lòng thông báo khi đặt bàn để chúng tôi chuẩn bị tốt nhất.</div></div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🌟 The <span>Saigon Larder</span></div><div class="footer-tagline">Việt Fusion Fine Dining · Thành lập 2018 · Michelin Bib Gourmand</div></div>
    <div class="footer-links"><a href="#">Thực đơn</a><a href="#">Về chúng tôi</a><a href="#">Events & Private Dining</a><a href="#">Workshop ẩm thực</a></div>
    <div class="footer-links"><a href="#">📍 42 Tôn Thất Thiệp, Q.1, TP.HCM</a><a href="#">📞 028 3823 4567</a><a href="#">✉️ booking@saigonlarder.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 The Saigon Larder · Giấy phép VSATTP: 12345/GP-VSATTP · Sở Y tế TP.HCM · Michelin Bib Gourmand 2023</div>
</body></html>`

const LP_INTERIOR = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#fafaf9;color:#1c1917}
.hero{background:linear-gradient(160deg,#1c1917 0%,#292524 60%,#1c1917 100%);padding:110px 24px 90px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(161,98,7,.1) 0%,transparent 65%)}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(161,98,7,.12);border:1px solid rgba(161,98,7,.3);color:#d97706;border-radius:4px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;color:#ca8a04}
.hero h1{font-size:clamp(36px,6vw,68px);font-weight:900;color:#fafaf9;line-height:1.1;margin-bottom:20px;letter-spacing:-.5px}
.hero h1 .warm{background:linear-gradient(135deg,#d97706,#ca8a04);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#a8a29e;max-width:560px;margin:0 auto 40px;line-height:1.8}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
.btn-warm{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#d97706,#92400e);color:#fff;border-radius:6px;padding:17px 38px;font-size:16px;font-weight:800;text-decoration:none;box-shadow:0 8px 24px rgba(217,119,6,.25)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.15);color:#e7e5e4;border-radius:6px;padding:15px 28px;font-size:15px;text-decoration:none}
.hero-note{font-size:13px;color:#78716c}
.stats-bar{background:#292524;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);padding:28px 24px}
.stats-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center}
.stat-n{font-size:36px;font-weight:900;color:#d97706}
.stat-l{font-size:12px;color:#a8a29e;margin-top:4px}
.sec-label{color:#d97706;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;text-align:center}
.sec-title{font-size:34px;font-weight:800;color:#1c1917;text-align:center;margin-bottom:12px;line-height:1.25}
.sec-sub{text-align:center;font-size:15px;color:#78716c;margin-bottom:50px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.75}
.services{padding:90px 24px;background:#fafaf9}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;max-width:1060px;margin:0 auto}
.svc-card{border:1.5px solid #e7e5e4;border-radius:16px;padding:32px;background:#fff}
.svc-icon{width:62px;height:62px;background:linear-gradient(135deg,#d97706,#92400e);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px}
.svc-name{font-size:18px;font-weight:800;color:#1c1917;margin-bottom:8px}
.svc-desc{font-size:14px;color:#78716c;line-height:1.7;margin-bottom:14px}
.svc-includes{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
.svc-inc{font-size:13px;color:#57534e;display:flex;align-items:center;gap:7px}
.svc-inc::before{content:'→';color:#d97706;font-weight:700;flex-shrink:0}
.svc-start{font-size:14px;color:#d97706;font-weight:700}
.portfolio{padding:90px 24px;background:#f5f5f4}
.port-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1060px;margin:0 auto}
.port-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.06)}
.port-img{height:200px;display:flex;align-items:center;justify-content:center;font-size:64px}
.port-img.s1{background:linear-gradient(135deg,#f5f0e8,#ede3d4)}
.port-img.s2{background:linear-gradient(135deg,#e8f0f5,#d4e3ed)}
.port-img.s3{background:linear-gradient(135deg,#f0ebe8,#e8ddd6)}
.port-img.s4{background:linear-gradient(135deg,#e8f5ee,#d4eddf)}
.port-img.s5{background:linear-gradient(135deg,#f5eef0,#edd4db)}
.port-img.s6{background:linear-gradient(135deg,#f0f5e8,#e3edd4)}
.port-body{padding:22px}
.port-name{font-size:17px;font-weight:800;color:#1c1917;margin-bottom:4px}
.port-loc{font-size:13px;color:#d97706;font-weight:600;margin-bottom:8px}
.port-desc{font-size:13px;color:#78716c;line-height:1.6;margin-bottom:12px}
.port-tags{display:flex;gap:6px;flex-wrap:wrap}
.port-tag{background:#fef3c7;color:#b45309;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600}
.process{padding:90px 24px;background:#fafaf9}
.proc-timeline{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:0}
.proc-item{display:flex;gap:24px;padding:28px 0;border-bottom:1px dashed #e7e5e4}
.proc-item:last-child{border:none}
.proc-step{width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,#d97706,#92400e);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;flex-shrink:0}
.proc-info h3{font-size:17px;font-weight:700;color:#1c1917;margin-bottom:5px}
.proc-info p{font-size:14px;color:#78716c;line-height:1.65;margin-bottom:8px}
.proc-dur{display:inline-flex;background:#fef3c7;color:#b45309;border-radius:4px;padding:3px 10px;font-size:12px;font-weight:700}
.team{padding:90px 24px;background:#f5f5f4}
.team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px;max-width:980px;margin:0 auto}
.team-card{background:#fff;border:1.5px solid #e7e5e4;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.team-av{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#d97706,#92400e);display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 16px}
.team-name{font-size:18px;font-weight:800;color:#1c1917;margin-bottom:4px}
.team-role{font-size:13px;color:#d97706;font-weight:600;margin-bottom:10px}
.team-certs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}
.team-cert{background:#fef3c7;color:#b45309;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600}
.team-bio{font-size:13px;color:#78716c;line-height:1.6}
.pricing{padding:90px 24px;background:#fafaf9}
.pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:980px;margin:0 auto 28px}
.pack{border:2px solid #e7e5e4;border-radius:20px;padding:32px;background:#fff}
.pack.featured{background:linear-gradient(135deg,#292524,#1c1917);border-color:transparent;color:#fafaf9}
.pack-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#d97706;margin-bottom:12px}
.pack.featured .pack-label{color:#fcd34d}
.pack-price{font-size:44px;font-weight:900;color:#1c1917;line-height:1;margin-bottom:6px}
.pack.featured .pack-price{color:#fafaf9}
.pack-unit{font-size:13px;color:#78716c;margin-bottom:20px}
.pack.featured .pack-unit{color:#a8a29e}
.pack-btn{display:block;border-radius:10px;padding:13px;text-align:center;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:20px}
.pack-btn-out{background:#fef3c7;color:#d97706}
.pack-btn-in{background:linear-gradient(135deg,#d97706,#92400e);color:#fff}
.pack-feats{font-size:14px;color:#78716c;line-height:2.1}
.pack.featured .pack-feats{color:#a8a29e}
.testi{padding:90px 24px;background:#f5f5f4}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1020px;margin:0 auto}
.testi-card{background:#fff;border:1.5px solid #e7e5e4;border-radius:18px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.testi-stars{color:#d97706;font-size:17px;margin-bottom:12px}
.testi-q{font-size:15px;color:#44403c;font-style:italic;line-height:1.75;margin-bottom:16px}
.testi-auth{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#d97706,#92400e);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:14px}
.testi-name{font-size:14px;font-weight:700;color:#1c1917}
.testi-proj{font-size:12px;color:#d97706}
.faq{padding:90px 24px;background:#fafaf9}
.faq-list{max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.faq-item{background:#fff;border:1.5px solid #e7e5e4;border-radius:12px;padding:24px}
.faq-q{font-weight:700;color:#d97706;margin-bottom:10px;font-size:15px}
.faq-a{font-size:14px;color:#78716c;line-height:1.75}
.cta-sec{padding:80px 24px;background:#1c1917;text-align:center}
.cta-sec h2{font-size:40px;font-weight:900;color:#fafaf9;margin-bottom:14px;line-height:1.25}
.cta-sec h2 span{background:linear-gradient(135deg,#d97706,#ca8a04);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.cta-sec p{color:#a8a29e;font-size:17px;margin-bottom:32px;line-height:1.6}
.footer{background:#0f0f0e;border-top:1px solid rgba(255,255,255,.06);padding:48px 24px}
.footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:36px;justify-content:space-between}
.footer-brand{font-size:22px;font-weight:900;color:#fafaf9;margin-bottom:6px}
.footer-brand span{color:#d97706}
.footer-tagline{font-size:13px;color:#78716c}
.footer-links{display:flex;flex-direction:column;gap:8px}
.footer-links a{color:#a8a29e;text-decoration:none;font-size:14px}
.footer-bottom{background:#0c0c0b;border-top:1px solid rgba(255,255,255,.04);text-align:center;padding:16px 24px;font-size:12px;color:#57534e}
</style></head>
<body>

<section class="hero">
  <div class="badge">🏆 Giải thưởng Thiết kế Nội thất Xuất sắc 2023 · 500+ dự án</div>
  <h1>Không gian sống<br><span class="warm">phản ánh con người bạn</span></h1>
  <p>Studio thiết kế nội thất hàng đầu TP.HCM — từ chung cư đến villa, từ văn phòng đến khách sạn — mỗi công trình là một tác phẩm nghệ thuật đậm cá tính chủ nhân.</p>
  <div class="hero-btns">
    <a href="#" class="btn-warm">🏠 Tư vấn thiết kế miễn phí</a>
    <a href="#" class="btn-ghost">📸 Xem portfolio</a>
  </div>
  <p class="hero-note">Khảo sát tại nhà miễn phí · Thiết kế 3D trước khi thi công · Bảo hành 2 năm</p>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-n">500+</div><div class="stat-l">Dự án hoàn thành</div></div>
    <div><div class="stat-n">15+</div><div class="stat-l">Kiến trúc sư & NTK</div></div>
    <div><div class="stat-n">12</div><div class="stat-l">Năm kinh nghiệm</div></div>
    <div><div class="stat-n">4.9★</div><div class="stat-l">Google Reviews</div></div>
    <div><div class="stat-n">98%</div><div class="stat-l">Khách hàng giới thiệu thêm</div></div>
  </div>
</div>

<section class="services">
  <div class="sec-label">Dịch vụ thiết kế</div>
  <h2 class="sec-title">Giải pháp không gian<br>toàn diện từ ý tưởng đến hoàn thiện</h2>
  <p class="sec-sub">Chúng tôi thiết kế và thi công trọn gói — bạn chỉ cần đến nhà mới, không cần quản lý từng chi tiết nhỏ</p>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-icon">🏠</div><div class="svc-name">Thiết kế Nội Thất Chung Cư</div><div class="svc-desc">Từ studio 30m² đến penthouse 500m² — tối ưu không gian, ánh sáng và lưu thông. Phù hợp mọi phong cách từ Scandinavian, Industrial đến Japandi và Tropical.</div><div class="svc-includes"><div class="svc-inc">Thiết kế 3D chi tiết toàn bộ không gian</div><div class="svc-inc">Bảng vật liệu và màu sắc cụ thể</div><div class="svc-inc">Dự toán chi phí chi tiết trước khi thi công</div><div class="svc-inc">Giám sát thi công tại chỗ</div></div><div class="svc-start">Từ 150.000đ/m² thiết kế</div></div>
    <div class="svc-card"><div class="svc-icon">🏡</div><div class="svc-name">Biệt Thự & Nhà Phố</div><div class="svc-desc">Thiết kế kiến trúc ngoại thất và nội thất toàn bộ nhà phố, townhouse và biệt thự từ 1 đến 4+ tầng. Kết hợp cảnh quan sân vườn và hồ bơi nếu có.</div><div class="svc-includes"><div class="svc-inc">Phương án kiến trúc & nội thất tổng thể</div><div class="svc-inc">Hệ thống chiếu sáng chuyên nghiệp</div><div class="svc-inc">Smart home integration tùy chọn</div><div class="svc-inc">Nội thất custom-made theo yêu cầu</div></div><div class="svc-start">Từ 200.000đ/m² thiết kế</div></div>
    <div class="svc-card"><div class="svc-icon">🏢</div><div class="svc-name">Văn Phòng & Coworking</div><div class="svc-desc">Không gian làm việc thúc đẩy sáng tạo, tăng năng suất và thể hiện DNA thương hiệu. Tối ưu layout cho workflow, meeting rooms và social spaces.</div><div class="svc-includes"><div class="svc-inc">Brand identity qua không gian</div><div class="svc-inc">Acoustic design cho phòng họp</div><div class="svc-inc">Ergonomic workspace planning</div><div class="svc-inc">Thi công nhanh, không ảnh hưởng hoạt động</div></div><div class="svc-start">Từ 250.000đ/m² thiết kế</div></div>
    <div class="svc-card"><div class="svc-icon">🍽️</div><div class="svc-name">F&B & Khách Sạn</div><div class="svc-desc">Thiết kế nhà hàng, café, bar và khách sạn boutique tạo ra trải nghiệm độc đáo và instagrammable — kéo khách hàng quay lại không chỉ vì món ăn mà vì không gian.</div><div class="svc-includes"><div class="svc-inc">Concept độc đáo theo brand story</div><div class="svc-inc">Tối ưu flow khách và hiệu quả vận hành</div><div class="svc-inc">Thiết kế ánh sáng F&B chuyên nghiệp</div><div class="svc-inc">Furniture & decor theo chủ đề</div></div><div class="svc-start">Từ 300.000đ/m² thiết kế</div></div>
    <div class="svc-card"><div class="svc-icon">🎨</div><div class="svc-name">Tư Vấn Phong Cách & Vật Liệu</div><div class="svc-desc">Chưa sẵn sàng thiết kế trọn gói? Buổi tư vấn 2 giờ với KTS senior — định hướng phong cách, gợi ý vật liệu và màu sắc, lập kế hoạch ngân sách sơ bộ.</div><div class="svc-includes"><div class="svc-inc">Phân tích không gian hiện tại</div><div class="svc-inc">Moodboard và color palette</div><div class="svc-inc">Danh sách nhà cung cấp uy tín</div><div class="svc-inc">Checklist DIY nếu bạn muốn tự làm</div></div><div class="svc-start">1.500.000đ / buổi 2 giờ</div></div>
    <div class="svc-card"><div class="svc-icon">🔨</div><div class="svc-name">Thi Công & Hoàn Thiện</div><div class="svc-desc">Dịch vụ thi công nội thất toàn diện — từ hạ tầng kỹ thuật, trần thạch cao đến lắp đặt nội thất cuối cùng. Đội thợ lành nghề, vật liệu đúng tiêu chuẩn cam kết.</div><div class="svc-includes"><div class="svc-inc">Thợ thi công chính thức của studio</div><div class="svc-inc">Vật liệu đúng hàng, đúng thương hiệu</div><div class="svc-inc">Tiến độ cam kết theo hợp đồng</div><div class="svc-inc">Bảo hành 2 năm công trình</div></div><div class="svc-start">Báo giá theo khảo sát thực tế</div></div>
  </div>
</section>

<section class="portfolio">
  <div class="sec-label">Portfolio</div>
  <h2 class="sec-title">Những không gian<br>chúng tôi đã tạo ra</h2>
  <p class="sec-sub">Mỗi dự án là câu chuyện riêng — về chủ nhân, về không gian và về cuộc sống họ muốn sống</p>
  <div class="port-grid">
    <div class="port-card"><div class="port-img s1">🌿</div><div class="port-body"><div class="port-name">Căn hộ Japandi · Vinhomes Central Park</div><div class="port-loc">Bình Thạnh · 120m² · 2022</div><div class="port-desc">Phong cách Japandi tối giản — gỗ sồi trắng, bê tông xám, cây xanh và ánh sáng tự nhiên. Cho cặp đôi trẻ yêu sự yên tĩnh giữa lòng thành phố.</div><div class="port-tags"><span class="port-tag">Japandi</span><span class="port-tag">Minimalist</span><span class="port-tag">Chung cư</span></div></div></div>
    <div class="port-card"><div class="port-img s2">🏛️</div><div class="port-body"><div class="port-name">Penthouse Mediterranean · Masteri Thảo Điền</div><div class="port-loc">Quận 2 · 280m² · 2023</div><div class="port-desc">Phong cách Địa Trung Hải với vòm gạch trắng, lam gỗ ấm, terrazzo và hồ bơi tầng thượng. Không gian thư giãn như resort ngay trong nhà.</div><div class="port-tags"><span class="port-tag">Mediterranean</span><span class="port-tag">Luxury</span><span class="port-tag">Penthouse</span></div></div></div>
    <div class="port-card"><div class="port-img s3">🎨</div><div class="port-body"><div class="port-name">Văn phòng Creative Agency · Quận 7</div><div class="port-loc">Quận 7 · 350m² · 2023</div><div class="port-desc">Không gian làm việc sáng tạo với wall graffiti, nội thất công nghiệp tái chế, breakout zones đầy màu sắc và cafe corner cho team.</div><div class="port-tags"><span class="port-tag">Industrial</span><span class="port-tag">Creative</span><span class="port-tag">Office</span></div></div></div>
    <div class="port-card"><div class="port-img s4">🌱</div><div class="port-body"><div class="port-name">Biệt thự Tropical Modern · Thủ Đức</div><div class="port-loc">Thủ Đức · 450m² · 2024</div><div class="port-desc">Biệt thự 3 tầng phong cách Tropical hiện đại — gỗ teak, đá tự nhiên, sân vườn nhiệt đới 200m² và hồ bơi tràn bờ. Giải thưởng Best Villa Design 2024.</div><div class="port-tags"><span class="port-tag">Tropical</span><span class="port-tag">Villa</span><span class="port-tag">Award</span></div></div></div>
    <div class="port-card"><div class="port-img s5">☕</div><div class="port-body"><div class="port-name">Café The Garden · Tân Bình</div><div class="port-loc">Tân Bình · 180m² · 2024</div><div class="port-desc">Cafe theo phong cách garden greenhouse với khung kính, cây xanh leo, tường gạch cổ và ánh sáng tự nhiên tràn ngập. Checkin ăn khách nhất Tân Bình.</div><div class="port-tags"><span class="port-tag">F&B</span><span class="port-tag">Garden Style</span><span class="port-tag">Cafe</span></div></div></div>
    <div class="port-card"><div class="port-img s6">🏨</div><div class="port-body"><div class="port-name">Boutique Hotel · Hội An</div><div class="port-loc">Hội An · 20 phòng · 2024</div><div class="port-desc">Khách sạn boutique 20 phòng theo phong cách Hội An đương đại — gạch hoa, đèn lồng hiện đại, gỗ và bamboo. Được vinh danh Best Boutique Hotel Design 2024.</div><div class="port-tags"><span class="port-tag">Hotel</span><span class="port-tag">Heritage</span><span class="port-tag">Award</span></div></div></div>
  </div>
</section>

<section class="process">
  <div class="sec-label">Quy trình làm việc</div>
  <h2 class="sec-title">Từ ý tưởng đến<br>không gian hoàn thiện</h2>
  <p class="sec-sub">Quy trình minh bạch, tiến độ cam kết — bạn luôn biết dự án đang ở giai đoạn nào</p>
  <div class="proc-timeline">
    <div class="proc-item"><div class="proc-step">1</div><div class="proc-info"><h3>Tư vấn ban đầu & Khảo sát</h3><p>Gặp gỡ 1-1 tại văn phòng hoặc tại nhà bạn. Lắng nghe phong cách sống, sở thích, ngân sách và timeline. Đo đạc và chụp ảnh thực tế không gian.</p><span class="proc-dur">Miễn phí · 1-2 giờ</span></div></div>
    <div class="proc-item"><div class="proc-step">2</div><div class="proc-info"><h3>Đề xuất Concept & Phong cách</h3><p>Trình bày 2-3 hướng concept khác nhau với moodboard, color palette và reference images. Thảo luận và chọn hướng phù hợp nhất với sở thích của bạn.</p><span class="proc-dur">3-5 ngày làm việc</span></div></div>
    <div class="proc-item"><div class="proc-step">3</div><div class="proc-info"><h3>Thiết kế 3D chi tiết</h3><p>Vẽ bản vẽ kỹ thuật và render 3D từng phòng với vật liệu, màu sắc và nội thất thực tế. Bạn thấy rõ không gian trước khi thi công 1 đồng. Chỉnh sửa không giới hạn đến khi hài lòng.</p><span class="proc-dur">7-14 ngày làm việc</span></div></div>
    <div class="proc-item"><div class="proc-step">4</div><div class="proc-info"><h3>Dự toán & Ký hợp đồng</h3><p>Bảng dự toán chi phí thi công chi tiết theo từng hạng mục. Phân tích options tiết kiệm chi phí mà không giảm chất lượng. Hợp đồng rõ ràng về tiến độ và bảo hành.</p><span class="proc-dur">2-3 ngày</span></div></div>
    <div class="proc-item"><div class="proc-step">5</div><div class="proc-info"><h3>Thi công & Giám sát</h3><p>Đội thợ chính thức của studio thi công theo bản vẽ. Giám sát trưởng mặt bằng hàng ngày. Báo cáo tiến độ + hình ảnh gửi cho bạn mỗi tuần. Không thuê ngoài, không phó mặc.</p><span class="proc-dur">Theo diện tích & độ phức tạp</span></div></div>
    <div class="proc-item"><div class="proc-step">6</div><div class="proc-info"><h3>Bàn giao & Hậu mãi</h3><p>Vệ sinh công trình sạch sẽ, bố trí nội thất đúng bản vẽ, chụp ảnh nghiệm thu. Bảo hành 2 năm toàn bộ công trình. Hỗ trợ tư vấn cải tạo nhỏ sau bàn giao.</p><span class="proc-dur">Bảo hành 2 năm</span></div></div>
  </div>
</section>

<section class="team">
  <div class="sec-label">Đội ngũ thiết kế</div>
  <h2 class="sec-title">Những kiến trúc sư<br>và nhà thiết kế hàng đầu</h2>
  <p class="sec-sub">Kết hợp kinh nghiệm quốc tế và hiểu biết sâu sắc về văn hóa và khí hậu Việt Nam</p>
  <div class="team-grid">
    <div class="team-card"><div class="team-av">🏛️</div><div class="team-name">KTS. Nguyễn Bảo Anh</div><div class="team-role">Principal Designer · Founder</div><div class="team-certs"><span class="team-cert">RIBA Member</span><span class="team-cert">Harvard MArch</span></div><div class="team-bio">Tốt nghiệp Kiến trúc tại Harvard GSD. Kinh nghiệm làm việc tại Kengo Kuma Associates Tokyo và Foster+Partners London trước khi về VN.</div></div>
    <div class="team-card"><div class="team-av">🎨</div><div class="team-name">Lê Thị Phương Linh</div><div class="team-role">Interior Design Lead</div><div class="team-certs"><span class="team-cert">ASID Member</span><span class="team-cert">CID Certified</span></div><div class="team-bio">10 năm chuyên thiết kế nội thất cao cấp. Phong cách chuyên sâu về Scandinavian, Japandi và Contemporary Asian.</div></div>
    <div class="team-card"><div class="team-av">💡</div><div class="team-name">Trần Minh Khôi</div><div class="team-role">Lighting Design Specialist</div><div class="team-certs"><span class="team-cert">IALD Member</span><span class="team-cert">Lighting Cert.</span></div><div class="team-bio">Chuyên gia chiếu sáng kiến trúc duy nhất tại VN có chứng chỉ IALD quốc tế. Thiết kế ánh sáng cho 200+ công trình.</div></div>
    <div class="team-card"><div class="team-av">🌿</div><div class="team-name">Phạm Ngọc Hà</div><div class="team-role">FF&E & Project Manager</div><div class="team-certs"><span class="team-cert">PMP Certified</span><span class="team-cert">FF&E Expert</span></div><div class="team-bio">Quản lý thi công 100+ dự án từ chung cư đến khách sạn. Mạng lưới 200+ nhà cung cấp vật liệu và nội thất tin cậy.</div></div>
  </div>
</section>

<section class="pricing">
  <div class="sec-label">Gói dịch vụ</div>
  <h2 class="sec-title">Đầu tư vào không gian<br>là đầu tư vào chất lượng cuộc sống</h2>
  <p class="sec-sub">Minh bạch chi phí — không phát sinh — báo giá trước khi ký hợp đồng</p>
  <div class="pack-grid">
    <div class="pack"><div class="pack-label">Gói Thiết kế</div><div class="pack-price">150K</div><div class="pack-unit">/m² · Chỉ thiết kế</div><a href="#" class="pack-btn pack-btn-out">Tư vấn ngay →</a><div class="pack-feats">✓ Bản vẽ kỹ thuật đầy đủ<br>✓ Render 3D từng phòng<br>✓ Bảng vật liệu chi tiết<br>✓ Dự toán thi công<br>✓ Chỉnh sửa không giới hạn</div></div>
    <div class="pack featured"><div class="pack-label">⭐ Trọn gói</div><div class="pack-price">3.5tr</div><div class="pack-unit">/m² · Thiết kế + Thi công</div><a href="#" class="pack-btn pack-btn-in">Khảo sát miễn phí →</a><div class="pack-feats">✓ Tất cả dịch vụ thiết kế<br>✓ Thi công bởi đội thợ chính thức<br>✓ Giám sát hàng ngày tại công trường<br>✓ Vật liệu đúng hàng cam kết<br>✓ Bảo hành 2 năm công trình<br>✓ Trả góp 0% đến 12 tháng</div></div>
    <div class="pack"><div class="pack-label">F&B & Thương mại</div><div class="pack-price">Liên hệ</div><div class="pack-unit">Báo giá theo dự án</div><a href="#" class="pack-btn pack-btn-out">Gặp gỡ tư vấn →</a><div class="pack-feats">✓ Thiết kế thương mại chuyên biệt<br>✓ Brand integration đầy đủ<br>✓ Thi công nhanh không dừng hoạt động<br>✓ Hỗ trợ cấp phép và pháp lý<br>✓ Bảo hành công trình thương mại</div></div>
  </div>
</section>

<section class="testi">
  <div class="sec-label">Khách hàng nói gì</div>
  <h2 class="sec-title">Họ không chỉ hài lòng —<br>họ tự hào về ngôi nhà của mình</h2>
  <p class="sec-sub">98% khách hàng giới thiệu bạn bè sau khi trải nghiệm dịch vụ của chúng tôi</p>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Tôi đã làm việc với 3 studio thiết kế trước khi gặp Archi+. Sự khác biệt là ở đây họ thực sự LẮNG NGHE. Không áp đặt phong cách, không cắt xén ngân sách, bàn giao đúng như cam kết. Căn hộ hoàn thiện đẹp hơn render 3D!"</div><div class="testi-auth"><div class="testi-av">TL</div><div><div class="testi-name">Gia đình anh Tuấn Lâm</div><div class="testi-proj">Penthouse 240m² · Masteri</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Nhà hàng của tôi đã hoạt động 2 năm kể từ khi Archi+ thiết kế. Check-in của khách tăng 300%, doanh thu tăng 40% so với trước. Không gian trở thành điểm nhận diện thương hiệu mạnh nhất của chúng tôi."</div><div class="testi-auth"><div class="testi-av">MH</div><div><div class="testi-name">Chị Minh Hương · CEO</div><div class="testi-proj">Chuỗi cafe The Garden · 3 cơ sở</div></div></div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-q">"Gói trọn gói thực sự trọn gói — từ đầu đến cuối không có phát sinh nào ngoài hợp đồng. Tiến độ đúng từng tuần như cam kết. Bảo hành 2 năm đã xử lý 2 vấn đề nhỏ mà không tốn phí. Cực kỳ chuyên nghiệp."</div><div class="testi-auth"><div class="testi-av">BK</div><div><div class="testi-name">Gia đình anh Bảo Khoa</div><div class="testi-proj">Biệt thự 380m² · Long An</div></div></div></div>
  </div>
</section>

<section class="faq">
  <div class="sec-label">Câu hỏi thường gặp</div>
  <h2 class="sec-title">Những điều bạn muốn<br>biết trước khi bắt đầu</h2>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">💰 Chi phí thiết kế nội thất thường là bao nhiêu?</div><div class="faq-a">Chi phí thiết kế từ 150.000đ/m² tùy phức tạp. Gói trọn gói thiết kế + thi công từ 3.500.000đ/m² cho chung cư tiêu chuẩn, đến 6.000.000đ/m² cho biệt thự cao cấp và 8.000.000đ/m² cho công trình thương mại. Khảo sát miễn phí và báo giá chính xác sau khi đo thực tế.</div></div>
    <div class="faq-item"><div class="faq-q">⏱️ Mất bao lâu để hoàn thành một dự án?</div><div class="faq-a">Thiết kế: 2-3 tuần (chung cư) đến 4-6 tuần (biệt thự, thương mại). Thi công: 30-45 ngày cho chung cư 100m², 60-90 ngày cho nhà phố 3 tầng, 3-6 tháng cho biệt thự và công trình thương mại lớn. Tiến độ được cam kết trong hợp đồng với điều khoản phạt nếu chậm.</div></div>
    <div class="faq-item"><div class="faq-q">🔄 Có thể thay đổi thiết kế trong quá trình thi công không?</div><div class="faq-a">Giai đoạn thiết kế: thay đổi không giới hạn đến khi bạn hài lòng. Sau khi ký biên bản xác nhận thiết kế cuối: thay đổi nhỏ không tính phí, thay đổi lớn ảnh hưởng kết cấu hoặc vật liệu sẽ có phụ lục hợp đồng với chi phí thực tế. Đây là lý do chúng tôi đầu tư kỹ vào giai đoạn thiết kế 3D — để bạn "thấy rõ trước khi làm".</div></div>
    <div class="faq-item"><div class="faq-q">📦 Có cung cấp nội thất đặt theo yêu cầu không?</div><div class="faq-a">Có. Xưởng nội thất đối tác sản xuất theo bản vẽ của chúng tôi: bàn, ghế, tủ, kệ, giường và sofa theo kích thước và vật liệu chuẩn xác từng cm. Cam kết đúng chất liệu gỗ và vật liệu như thiết kế — không thay thế vật liệu rẻ hơn như nhiều đơn vị khác.</div></div>
  </div>
</section>

<section class="cta-sec">
  <h2>Bắt đầu dự án<br><span>ngôi nhà mơ ước</span> của bạn</h2>
  <p>Khảo sát tại nhà miễn phí, tư vấn concept trong 1 tuần. Không cam kết, không chi phí ban đầu.</p>
  <a href="#" class="btn-warm" style="display:inline-flex">🏠 Đặt lịch khảo sát miễn phí →</a>
  <p style="margin-top:14px;font-size:13px;color:#78716c">Phản hồi trong 4 giờ · Khảo sát tại nhà bạn hoặc tại văn phòng chúng tôi</p>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div><div class="footer-brand">🏛️ <span>Archi+</span> Studio</div><div class="footer-tagline">Thiết kế nội thất cao cấp · Thành lập 2012 · 500+ dự án</div></div>
    <div class="footer-links"><a href="#">Dịch vụ thiết kế</a><a href="#">Portfolio</a><a href="#">Đội ngũ</a><a href="#">Blog kiến trúc</a></div>
    <div class="footer-links"><a href="#">📍 15 Lê Duẩn, Q.1, TP.HCM</a><a href="#">📞 028 3823 9999</a><a href="#">✉️ hello@archiplus.vn</a></div>
  </div>
</footer>
<div class="footer-bottom">© 2026 Archi+ Studio · MST: 0312345681 · Hội viên Hội Kiến Trúc Sư Việt Nam</div>
</body></html>`

export const TEMPLATES: Template[] = [
  {
    id: 'lp-skincare',
    name: 'Landing Page Mỹ Phẩm',
    category: 'landing',
    description: 'Trang bán sản phẩm skincare/mỹ phẩm với hero section, tính năng nổi bật, testimonial và bảng giá.',
    tags: ['Mỹ phẩm', 'Skincare', 'Sản phẩm'],
    gradient: 'from-pink-400 to-rose-500',
    accentColor: '#e91e63',
    html: LP_SKINCARE,
  },
  {
    id: 'lp-course',
    name: 'Landing Page Khóa Học',
    category: 'landing',
    description: 'Trang giới thiệu khóa học online với stats ấn tượng, chương trình học chi tiết, thông tin giảng viên và gói giá.',
    tags: ['Giáo dục', 'Khóa học', 'E-learning'],
    gradient: 'from-indigo-500 to-violet-600',
    accentColor: '#6366f1',
    html: LP_COURSE,
  },
  {
    id: 'lp-agency',
    name: 'Landing Page Agency',
    category: 'landing',
    description: 'Trang giới thiệu marketing agency phong cách tối (dark mode), với danh sách dịch vụ và portfolio dự án.',
    tags: ['Agency', 'Marketing', 'B2B'],
    gradient: 'from-violet-600 to-purple-700',
    accentColor: '#a855f7',
    html: LP_AGENCY,
  },
  {
    id: 'lp-saas',
    name: 'Landing Page SaaS App',
    category: 'landing',
    description: 'Trang ra mắt phần mềm/ứng dụng với tính năng, quy trình 3 bước và bảng giá free/pro.',
    tags: ['SaaS', 'Phần mềm', 'Startup'],
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: '#059669',
    html: LP_SAAS,
  },
  {
    id: 'lp-event',
    name: 'Landing Page Sự Kiện',
    category: 'landing',
    description: 'Trang bán vé sự kiện/festival với đồng hồ đếm ngược, lineup nghệ sĩ, lịch trình và các loại vé.',
    tags: ['Sự kiện', 'Festival', 'Âm nhạc'],
    gradient: 'from-violet-700 to-purple-900',
    accentColor: '#7c3aed',
    html: LP_EVENT,
  },
  {
    id: 'article-review',
    name: 'Bài Review Sản Phẩm',
    category: 'article',
    description: 'Layout bài review chuyên nghiệp với điểm đánh giá, ưu/nhược điểm, và verdict rõ ràng.',
    tags: ['Review', 'Sản phẩm', 'Blog'],
    gradient: 'from-violet-500 to-purple-600',
    accentColor: '#7c3aed',
    html: ARTICLE_REVIEW,
  },
  {
    id: 'article-blog',
    name: 'Bài Viết Blog',
    category: 'article',
    description: 'Template bài viết hướng dẫn dạng list với các tip box, quote block và CTA cuối bài.',
    tags: ['Blog', 'Hướng dẫn', 'SEO'],
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: '#6366f1',
    html: ARTICLE_BLOG,
  },
  {
    id: 'article-news',
    name: 'Thông Cáo Báo Chí',
    category: 'article',
    description: 'Layout tin tức/thông cáo báo chí với key facts, trích dẫn CEO và bài viết liên quan.',
    tags: ['Báo chí', 'Tin tức', 'PR'],
    gradient: 'from-slate-600 to-blue-700',
    accentColor: '#3b82f6',
    html: ARTICLE_NEWS,
  },
  {
    id: 'ads-flashsale',
    name: 'Banner Flash Sale',
    category: 'ads',
    description: 'Banner quảng cáo flash sale với đồng hồ đếm ngược, hiển thị sản phẩm giảm giá nổi bật.',
    tags: ['Flash Sale', 'Khuyến mãi', 'Facebook Ads'],
    gradient: 'from-red-600 to-orange-600',
    accentColor: '#ef4444',
    html: ADS_FLASHSALE,
  },
  {
    id: 'ads-course',
    name: 'Quảng Cáo Khóa Học',
    category: 'ads',
    description: 'Banner quảng cáo đăng ký khóa học với giá ưu đãi, danh sách tính năng và đảm bảo hoàn tiền.',
    tags: ['Khóa học', 'Giáo dục', 'Facebook Ads'],
    gradient: 'from-violet-600 to-purple-700',
    accentColor: '#6d28d9',
    html: ADS_COURSE,
  },
  {
    id: 'ads-realestate',
    name: 'Quảng Cáo Bất Động Sản',
    category: 'ads',
    description: 'Banner dự án căn hộ với thông số kỹ thuật, tiện ích nổi bật và nút đặt lịch xem nhà mẫu.',
    tags: ['Bất động sản', 'Căn hộ', 'Dự án'],
    gradient: 'from-sky-600 to-blue-700',
    accentColor: '#0369a1',
    html: ADS_REALESTATE,
  },
  {
    id: 'ads-fnb',
    name: 'Quảng Cáo Nhà Hàng',
    category: 'ads',
    description: 'Banner nhà hàng/F&B với menu mới, combo ưu đãi, mã giảm giá và nút đặt đồ ăn.',
    tags: ['Nhà hàng', 'F&B', 'Đồ ăn'],
    gradient: 'from-orange-500 to-red-500',
    accentColor: '#ea580c',
    html: ADS_FNB,
  },
  {
    id: 'lp-gym',
    name: 'Landing Page Phòng Gym',
    category: 'landing',
    description: 'Trang giới thiệu phòng gym/fitness với các chương trình tập, HLV, kết quả thực tế và gói hội viên.',
    tags: ['Gym', 'Fitness', 'Sức khoẻ'],
    gradient: 'from-orange-500 to-red-600',
    accentColor: '#f97316',
    html: LP_GYM,
  },
  {
    id: 'lp-travel',
    name: 'Landing Page Du Lịch',
    category: 'landing',
    description: 'Trang đặt tour du lịch với search bar, danh sách tour nổi bật, lý do chọn và testimonial.',
    tags: ['Du lịch', 'Tour', 'Khách sạn'],
    gradient: 'from-sky-500 to-cyan-600',
    accentColor: '#0284c7',
    html: LP_TRAVEL,
  },
  {
    id: 'article-listicle',
    name: 'Bài Viết Top-N',
    category: 'article',
    description: 'Template bài viết dạng danh sách đánh số (top 10, 7 cách...) với tip box và callout nổi bật.',
    tags: ['Listicle', 'Top N', 'Hướng dẫn'],
    gradient: 'from-amber-400 to-yellow-500',
    accentColor: '#f59e0b',
    html: ARTICLE_LISTICLE,
  },
  {
    id: 'ads-fashion',
    name: 'Quảng Cáo Thời Trang',
    category: 'ads',
    description: 'Banner bộ sưu tập thời trang theo mùa với lưới sản phẩm, badge sale và mã giảm giá.',
    tags: ['Thời trang', 'Fashion', 'Mua sắm'],
    gradient: 'from-pink-400 to-fuchsia-500',
    accentColor: '#ec4899',
    html: ADS_FASHION,
  },
  {
    id: 'ads-app',
    name: 'Quảng Cáo App Mobile',
    category: 'ads',
    description: 'Banner quảng cáo app mobile với mockup điện thoại, tính năng nổi bật và nút tải App Store/Google Play.',
    tags: ['App', 'Mobile', 'Download'],
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: '#6366f1',
    html: ADS_APP,
  },
  {
    id: 'lp-wedding',
    name: 'Landing Page Dịch Vụ Cưới',
    category: 'landing',
    description: 'Trang giới thiệu wedding planner với dịch vụ trọn gói, portfolio đám cưới, bảng giá và testimonials.',
    tags: ['Đám cưới', 'Wedding', 'Sự kiện'],
    gradient: 'from-pink-400 to-rose-600',
    accentColor: '#be185d',
    html: LP_WEDDING,
  },
  {
    id: 'article-comparison',
    name: 'Bài So Sánh Sản Phẩm',
    category: 'article',
    description: 'Layout so sánh A vs B với bảng tiêu chí chi tiết, ưu/nhược điểm từng bên và verdict cuối bài.',
    tags: ['So sánh', 'Review', 'Công nghệ'],
    gradient: 'from-orange-400 to-amber-500',
    accentColor: '#f59e0b',
    html: ARTICLE_COMPARISON,
  },
  {
    id: 'article-casestudy',
    name: 'Case Study Kinh Doanh',
    category: 'article',
    description: 'Layout case study chuyên nghiệp với KPI nổi bật, timeline triển khai, trích dẫn và kết quả đạt được.',
    tags: ['Case Study', 'Kinh doanh', 'Marketing'],
    gradient: 'from-indigo-500 to-violet-600',
    accentColor: '#6366f1',
    html: ARTICLE_CASESTUDY,
  },
  {
    id: 'article-interview',
    name: 'Bài Phỏng Vấn',
    category: 'article',
    description: 'Template phỏng vấn Q&A với profile người được phỏng vấn, câu hỏi/trả lời nổi bật và pull quote.',
    tags: ['Phỏng vấn', 'CEO', 'Startup'],
    gradient: 'from-emerald-500 to-green-600',
    accentColor: '#059669',
    html: ARTICLE_INTERVIEW,
  },
  {
    id: 'article-howto',
    name: 'Hướng Dẫn Kỹ Thuật',
    category: 'article',
    description: 'Template hướng dẫn từng bước với code block, tip/warning box và thanh độ khó/thời gian.',
    tags: ['Hướng dẫn', 'Kỹ thuật', 'Developer'],
    gradient: 'from-sky-500 to-blue-600',
    accentColor: '#0369a1',
    html: ARTICLE_HOWTO,
  },
  {
    id: 'ads-supplement',
    name: 'Quảng Cáo Thực Phẩm Chức Năng',
    category: 'ads',
    description: 'Banner thực phẩm chức năng với chỉ số lâm sàng, thành phần nổi bật, before/after và giá ưu đãi.',
    tags: ['Sức khoẻ', 'Supplement', 'Wellness'],
    gradient: 'from-emerald-500 to-green-600',
    accentColor: '#059669',
    html: ADS_SUPPLEMENT,
  },
  {
    id: 'ads-travel-banner',
    name: 'Banner Quảng Cáo Tour',
    category: 'ads',
    description: 'Banner tour du lịch với điểm đến nổi bật, lịch trình tóm tắt, bao gồm gì và giá trọn gói.',
    tags: ['Du lịch', 'Tour', 'Quảng cáo'],
    gradient: 'from-sky-600 to-cyan-600',
    accentColor: '#0284c7',
    html: ADS_TRAVEL_BANNER,
  },
  {
    id: 'lp-realestate',
    name: 'Landing Page Bất Động Sản',
    category: 'landing',
    description: 'Trang giới thiệu dự án BĐS cao cấp với danh sách dự án, tiện ích nội khu, tiến độ bàn giao, form đặt lịch tư vấn và FAQ pháp lý.',
    tags: ['Bất động sản', 'Căn hộ', 'Đầu tư'],
    gradient: 'from-yellow-600 to-amber-700',
    accentColor: '#d97706',
    html: LP_REALESTATE,
  },
  {
    id: 'lp-dental',
    name: 'Landing Page Nha Khoa',
    category: 'landing',
    description: 'Trang nha khoa thẩm mỹ cao cấp với dịch vụ chi tiết, công nghệ hiện đại, đội ngũ bác sĩ, bảng giá và form đặt lịch khám miễn phí.',
    tags: ['Nha khoa', 'Y tế', 'Thẩm mỹ'],
    gradient: 'from-sky-500 to-cyan-600',
    accentColor: '#0284c7',
    html: LP_DENTAL,
  },
  {
    id: 'lp-language',
    name: 'Landing Page Trung Tâm Ngoại Ngữ',
    category: 'landing',
    description: 'Trang trung tâm học tiếng Anh/Nhật/Hàn với khóa học, phương pháp AI, giáo viên bản ngữ, kết quả học viên và lộ trình IELTS.',
    tags: ['Giáo dục', 'IELTS', 'Ngoại ngữ'],
    gradient: 'from-orange-500 to-indigo-600',
    accentColor: '#f97316',
    html: LP_LANGUAGE,
  },
  {
    id: 'lp-spa',
    name: 'Landing Page Spa & Thẩm Mỹ',
    category: 'landing',
    description: 'Trang spa cao cấp với dịch vụ massage/facial/laser, quy trình trải nghiệm, kết quả before/after, gói tháng và đặt lịch online.',
    tags: ['Spa', 'Làm đẹp', 'Thẩm mỹ'],
    gradient: 'from-purple-600 to-pink-600',
    accentColor: '#7c3aed',
    html: LP_SPA,
  },
  {
    id: 'lp-restaurant',
    name: 'Landing Page Nhà Hàng Fine Dining',
    category: 'landing',
    description: 'Trang nhà hàng cao cấp Việt Fusion với thực đơn nổi bật, không gian độc đáo, hồ sơ bếp trưởng, set menu và form đặt bàn.',
    tags: ['Nhà hàng', 'F&B', 'Fine Dining'],
    gradient: 'from-amber-600 to-orange-800',
    accentColor: '#d97706',
    html: LP_RESTAURANT,
  },
  {
    id: 'lp-interior',
    name: 'Landing Page Thiết Kế Nội Thất',
    category: 'landing',
    description: 'Trang studio thiết kế nội thất với dịch vụ trọn gói, portfolio dự án thực tế, quy trình làm việc, đội ngũ KTS và bảng giá minh bạch.',
    tags: ['Nội thất', 'Kiến trúc', 'Thiết kế'],
    gradient: 'from-stone-600 to-amber-700',
    accentColor: '#d97706',
    html: LP_INTERIOR,
  },
]

export const CATEGORY_META: Record<TemplateCategory, { label: string; icon: string; desc: string }> = {
  landing: { label: 'Landing Page', icon: '🏠', desc: 'Trang bán hàng, dịch vụ, sự kiện' },
  article: { label: 'Bài viết', icon: '📝', desc: 'Blog, review, tin tức, báo chí' },
  ads: { label: 'Quảng cáo', icon: '📣', desc: 'Banner Facebook, Google Ads, F&B' },
}
