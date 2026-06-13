# /seo — Viết bài SEO tiếp theo theo kế hoạch 30 bài

Khi lệnh này được chạy, thực hiện CHÍNH XÁC các bước sau. Không hỏi lại, không cần người dùng nhắc thêm.

## Bước 1: Đọc tiến độ

Đọc file `.claude/seo-progress.json`. Tìm bài đầu tiên có `"done": false`. Đó là bài cần viết hôm nay.

## Bước 2: Xác nhận với người dùng

Thông báo ngắn gọn: bài số mấy, tiêu đề gì, slug gì, sẽ viết bao nhiêu chữ.

## Bước 3: Viết nội dung bài HTML

Viết nội dung đầy đủ bằng tiếng Việt theo cấu trúc chuẩn dưới đây. Độ dài phải đạt số chữ trong kế hoạch. Từ khóa chính phải xuất hiện trong 100 chữ đầu, tiêu đề H1, H2 đầu tiên.

### Cấu trúc bắt buộc của mỗi bài:

```html
<p><strong>[TÓM TẮT 2-3 câu trả lời thẳng câu hỏi trong tiêu đề. Định nghĩa ngắn gọn, súc tích.]</strong></p>

<h2>[Từ khóa chính] là gì?</h2>
<p>[Giải thích chi tiết, rõ ràng 150-200 chữ]</p>

<h2>Tại sao [chủ đề] quan trọng với người bán hàng online?</h2>
<p>[Lý do thực tế, có số liệu cụ thể, 150-200 chữ]</p>

<h2>[Hướng dẫn chi tiết hoặc Các loại phổ biến hoặc So sánh]</h2>
<h3>[Mục 1]</h3>
<p>[Nội dung...]</p>
<h3>[Mục 2]</h3>
<p>[Nội dung...]</p>
<h3>[Mục 3]</h3>
<p>[Nội dung...]</p>

<h2>Ví dụ thực tế</h2>
<p>[Ví dụ cụ thể, dễ hiểu với người Việt bán hàng online]</p>

<h2>Câu hỏi thường gặp (FAQ)</h2>
<h3>[Câu hỏi 1 chứa từ khóa?]</h3>
<p>[Trả lời ngắn gọn 2-3 câu]</p>
<h3>[Câu hỏi 2]</h3>
<p>[Trả lời]</p>
<h3>[Câu hỏi 3]</h3>
<p>[Trả lời]</p>

<h2>Kết luận</h2>
<p>[Tóm tắt 2-3 câu] Bắt đầu tạo nội dung chuyên nghiệp ngay hôm nay tại <a href="https://taopage.vn">TaoPage — miễn phí, không cần code</a>.</p>
```

### Quy tắc nội dung:
- Viết cho đối tượng: người Việt bán hàng online, chủ shop, freelancer, không rành kỹ thuật
- Ngôn ngữ: tự nhiên, thực tế, tránh thuật ngữ kỹ thuật không cần thiết
- Có ít nhất 2 internal link sang bài khác trong ARTICLES (dùng `href='/kien-thuc/[slug-bài-khác]'` — single quote). **CHỈ link vào bài có `"done": true` trong seo-progress.json** — không link vào bài chưa viết, người đọc bấm vào sẽ 404
- CTA cuối bài luôn link về TaoPage với `href='https://taopage.vn'` — single quote
- Không dùng từ "chúng tôi" — dùng "TaoPage" hoặc "AITaoPage"
- Có số liệu thực tế (tỷ lệ %, thống kê) để tăng độ tin cậy

### Quy tắc bắt buộc khi viết HTML cho field "content":
- **LUÔN dùng single quote** cho tất cả HTML attributes: `href='...'`, `class='...'`, `style='...'` — KHÔNG dùng double quote vì sẽ bị escape thành `\"` trong JSON gây lỗi khi user copy-paste
- **KHÔNG dùng `\n`** giữa các thẻ HTML — viết liền mạch, HTML không cần whitespace giữa các thẻ
- **KHÔNG escape** bất kỳ ký tự nào trong nội dung văn bản (dấu ngoặc kép trong text thì dùng `"` typographic hoặc viết lại)
- Content phải là **một chuỗi HTML liền** không có ký tự điều khiển

## Bước 4: Tạo file JSON để paste vào admin

Tạo file `.claude/pending-article.json` với đúng các field sau:

```json
{
  "slug": "[slug]",
  "title": "[Tiêu đề đầy đủ]",
  "description": "[Meta description 150-160 ký tự, chứa từ khóa chính]",
  "category": "[Landing Page | Hướng dẫn | So sánh | Content | Kỹ thuật | Quảng cáo | SEO]",
  "readTime": "[X phút]",
  "publishedDate": "[YYYY-MM-DD — dùng ngày hôm nay]",
  "author": "AITaoPage",
  "keywords": ["từ khóa chính", "từ khóa phụ 1", "từ khóa phụ 2", "từ khóa phụ 3", "từ khóa phụ 4"],
  "content": "[HTML một dòng, single quote cho attributes, không có \\n]"
}
```

Sau khi tạo xong, thông báo cho user:
> File JSON đã sẵn sàng tại `.claude/pending-article.json`. Vào **Admin → Bài viết → Thêm mới**, điền các field từ file JSON trên. Phần **Nội dung HTML**: copy từ ký tự `<` đầu tiên đến `>` cuối cùng của value `"content"` — **không copy dấu `"` bao ngoài**.

## Bước 5: Đánh dấu hoàn thành

Cập nhật `.claude/seo-progress.json`: đổi `"done": false` thành `"done": true` cho bài vừa viết, và cập nhật `"last_updated"` thành ngày hôm nay (YYYY-MM-DD).

## Bước 6: Báo cáo kết quả

Thông báo ngắn gọn:
- Bài đã viết: [tiêu đề]
- Slug: [slug]
- URL sau khi thêm: https://taopage.vn/kien-thuc/[slug]
- File JSON: `.claude/pending-article.json` — paste vào Admin → Bài viết
- Tiến độ: [X/30] bài hoàn thành
- Bài tiếp theo: [tiêu đề bài kế]

---

## Kế hoạch 30 bài (THÁNG 1)

| Ngày | Slug | Tiêu đề | Từ khóa | Category | Chữ |
|------|------|---------|---------|----------|-----|
| 1 | landing-page-la-gi | Landing page là gì? Tại sao mọi người bán hàng online cần landing page | landing page là gì | Landing Page | 1500 |
| 2 | html-la-gi-bai-viet-html-dep | HTML là gì? Tại sao bài viết HTML đẹp hơn bài viết thường trên CMS | bài viết html đẹp | Kỹ thuật | 1200 |
| 3 | inline-css-la-gi | Inline CSS là gì? Tại sao nên dùng inline CSS cho bài viết WordPress | inline css là gì | Kỹ thuật | 1200 |
| 4 | editor-keo-tha-la-gi | Editor kéo thả là gì? So sánh các loại page builder phổ biến 2026 | editor kéo thả | So sánh | 1500 |
| 5 | ai-viet-content-la-gi | AI viết content là gì? Ưu nhược điểm thực tế khi dùng AI tạo nội dung | AI viết content | Content | 1500 |
| 6 | content-marketing-la-gi | Content marketing là gì? Cách tạo nội dung thu hút khách hàng hiệu quả | content marketing là gì | Content | 1500 |
| 7 | conversion-rate-la-gi | Conversion rate là gì? Cách tối ưu tỷ lệ chuyển đổi trên landing page | conversion rate là gì | Landing Page | 1200 |
| 8 | mau-landing-page-my-pham | Mẫu landing page bán mỹ phẩm đẹp, chuyên nghiệp — tải miễn phí | mẫu landing page mỹ phẩm | Landing Page | 1500 |
| 9 | mau-landing-page-spa | Mẫu landing page spa, thẩm mỹ viện thu hút khách đặt lịch | mẫu landing page spa | Landing Page | 1500 |
| 10 | mau-landing-page-khoa-hoc | Mẫu landing page bán khóa học online hiệu quả cao | mẫu landing page khóa học | Landing Page | 1500 |
| 11 | mau-landing-page-nha-hang | Mẫu landing page nhà hàng, quán ăn chuyên nghiệp | mẫu landing page nhà hàng | Landing Page | 1500 |
| 12 | mau-landing-page-bat-dong-san | Mẫu landing page bất động sản thu hút khách hàng tiềm năng | mẫu landing page bất động sản | Landing Page | 1500 |
| 13 | mau-landing-page-agency | Mẫu landing page dịch vụ marketing, agency chuyên nghiệp | mẫu landing page agency | Landing Page | 1500 |
| 14 | landing-page-shopee-lazada | Mẫu landing page bán hàng Shopee, Lazada tăng tỷ lệ chuyển đổi | landing page shopee lazada | Landing Page | 1500 |
| 15 | cach-tao-landing-page-khong-can-code | Cách tạo landing page bán hàng hiệu quả không cần biết code | cách tạo landing page | Hướng dẫn | 2000 |
| 16 | viet-bai-html-wordpress | Cách viết bài HTML đẹp đăng lên WordPress không bị vỡ giao diện | viết bài html wordpress | Hướng dẫn | 1500 |
| 17 | tao-banner-quang-cao-facebook-html | Cách tạo banner quảng cáo Facebook bằng HTML chuyên nghiệp | tạo banner quảng cáo facebook | Quảng cáo | 1500 |
| 18 | viet-content-ban-hang-bang-ai | Cách viết content bán hàng online hiệu quả bằng AI trong 5 phút | viết content bán hàng AI | Content | 2000 |
| 19 | tao-trang-gioi-thieu-san-pham | Cách tạo trang giới thiệu sản phẩm đẹp tăng doanh số | tạo trang giới thiệu sản phẩm | Hướng dẫn | 1500 |
| 20 | toi-uu-landing-page-tang-chuyen-doi | Cách tối ưu landing page để tăng tỷ lệ chuyển đổi lên 300% | tối ưu landing page | Landing Page | 2000 |
| 21 | email-marketing-html-dep | Cách tạo email marketing HTML đẹp không cần biết code | email marketing html | Hướng dẫn | 1500 |
| 22 | xuat-html-dang-wordpress-shopify | Cách xuất HTML từ editor và đăng lên WordPress, Shopify, Wix | xuất html đăng wordpress | Hướng dẫn | 1500 |
| 23 | cong-cu-tao-landing-page-viet-nam-2026 | Top 5 công cụ tạo landing page tốt nhất Việt Nam 2026 | công cụ tạo landing page | So sánh | 2000 |
| 24 | so-sanh-taopage-wix-webflow | So sánh TaoPage vs Wix vs Webflow: cái nào phù hợp người Việt | so sánh công cụ tạo web | So sánh | 2000 |
| 25 | ai-tao-html-vs-thue-designer | AI tạo HTML vs thuê designer: chi phí và hiệu quả thực tế | AI tạo html vs designer | So sánh | 1500 |
| 26 | cong-cu-ai-viet-content-tieng-viet-2026 | Top công cụ AI viết content tiếng Việt tốt nhất 2026 | AI viết content tiếng việt | So sánh | 2000 |
| 27 | huong-dan-taopage-tao-landing-page-dau-tien | Hướng dẫn dùng TaoPage tạo landing page đầu tiên trong 5 phút | hướng dẫn taopage | Hướng dẫn | 1500 |
| 28 | meo-viet-prompt-ai-tao-html | 10 mẹo viết prompt AI để tạo HTML đẹp hơn trên TaoPage | prompt AI tạo html | Hướng dẫn | 1500 |
| 29 | dung-taopage-tao-content-shopify | Cách dùng TaoPage tạo content đăng Shopify tăng doanh số | taopage shopify | Hướng dẫn | 1500 |
| 30 | review-taopage-sau-1-thang | Review TaoPage sau 1 tháng sử dụng — có đáng dùng không? | review taopage | So sánh | 1500 |

---

## Checklist trước khi hoàn thành

- [ ] Từ khóa chính xuất hiện trong tiêu đề, 100 chữ đầu, H2 đầu tiên
- [ ] Có ít nhất 2 internal link sang bài khác trong /kien-thuc/
- [ ] description đúng 150-160 ký tự, chứa từ khóa
- [ ] Có mục FAQ với ít nhất 3 câu hỏi
- [ ] CTA cuối bài link về taopage.vn
- [ ] Đã cập nhật seo-progress.json
