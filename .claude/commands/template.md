# /template — Tạo 6 mẫu template mới theo kế hoạch hàng ngày

Khi lệnh này được chạy, thực hiện CHÍNH XÁC các bước sau. Không hỏi lại, không cần người dùng nhắc thêm.

## Bước 1: Đọc tiến độ

Đọc `.claude/template-progress.json`. Tìm tất cả template có `"done": false` với cùng `"day"` nhỏ nhất. Đó là 6 template cần tạo hôm nay.

- **Ngày 1–5**: 2 landing + 2 ads + 2 article
- **Ngày 6+**: 3 portfolio + 3 cv

## Bước 2: Xác nhận ngắn gọn

Thông báo: đang tạo ngày mấy, liệt kê tên 6 template.

## Bước 3: Tạo HTML cho từng template

Tạo lần lượt 6 template. Mỗi cái cần HTML hoàn chỉnh, chất lượng cao.

### Yêu cầu HTML bắt buộc:

- **Tự chứa hoàn toàn**: `<!DOCTYPE html>` đầy đủ, inline CSS, không dùng file CSS/JS ngoài
- **Google Fonts được phép**: dùng `<link>` CDN từ fonts.googleapis.com nếu cần font đẹp
- **Responsive**: mobile-first, breakpoint tối thiểu cho 375px và 768px
- **Nội dung tiếng Việt**: placeholder text thực tế, đúng ngành/niche
- **Không dùng JavaScript phức tạp**: chỉ JS đơn giản nếu cần (hover, smooth scroll)
- **Hình ảnh**: dùng `https://placehold.co/[width]x[height]/[bg-color]/[text-color]?text=[text]` làm placeholder

### Quy tắc chất lượng:

- **Landing Page**: phải có Hero section (headline + CTA button), ít nhất 3 section (features/benefits, social proof/testimonial, CTA cuối), footer đơn giản
- **Ads**: kích thước hợp lý cho loại quảng cáo, thông điệp rõ ràng trong 3 giây, CTA nổi bật
- **Article**: có header bài viết (tiêu đề, tác giả, ngày, readtime), typography dễ đọc, có call-to-action cuối bài

### Gradient và màu sắc:

Mỗi template phải có:
- `gradient`: CSS gradient string đẹp, ví dụ `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- `accentColor`: hex màu chủ đạo của template, ví dụ `#6366f1`

Gradient dùng làm preview thumbnail trong danh sách template — chọn màu đại diện đúng với style HTML.

### Tags:

3-5 từ ngắn mô tả niche/style, ví dụ: `["mỹ phẩm", "skincare", "landing page", "pastel"]`

## Bước 4: Tạo file JSON output

Tạo file `.claude/pending-templates.json` chứa mảng 6 object:

```json
[
  {
    "id": "[id từ progress file — giữ nguyên]",
    "name": "[Tên hiển thị đầy đủ]",
    "category": "landing | article | ads",
    "description": "[Mô tả ngắn 1-2 câu, nói rõ dùng cho ai, ngành gì]",
    "tags": ["tag1", "tag2", "tag3"],
    "gradient": "linear-gradient(...)",
    "accentColor": "#xxxxxx",
    "order": 0,
    "html": "[full HTML — escape ký tự đặc biệt trong JSON]"
  },
  ...5 object tiếp theo
]
```

**Lưu ý JSON**: `html` phải được escape đúng — dấu `"` trong HTML thành `\"`, xuống dòng thành `\n`.

## Bước 5: Đánh dấu hoàn thành

Cập nhật `.claude/template-progress.json`: đổi `"done": false` thành `"done": true` cho 6 template vừa tạo. Cập nhật `"last_updated"` thành ngày hôm nay.

## Bước 5.5: Tự động import vào database

Chạy lệnh sau để import thẳng vào MongoDB — KHÔNG cần người dùng làm gì thủ công:

```bash
node scripts/import-templates.mjs
```

Hiển thị output của lệnh cho người dùng thấy (các dòng ✅ / ⏭ / ❌).

## Bước 6: Báo cáo và hướng dẫn

Thông báo:

```
✅ Đã tạo và import 6 template — Ngày [X]

[output từ lệnh import]

Tiến độ: [X*6]/[tổng] template hoàn thành
Ngày tiếp theo: [danh sách 6 tên template của ngày kế]
```

---

## Quy tắc HTML chi tiết theo category

### Landing Page (`landing`)
```
Cấu trúc bắt buộc:
1. <nav> — Logo + menu đơn giản (3-4 item) + CTA button
2. <section class="hero"> — Headline H1 mạnh, subheadline, 2 CTA buttons (primary + secondary), hero image/mockup
3. <section class="features"> — 3-4 tính năng/lợi ích với icon và mô tả
4. <section class="social-proof"> — Testimonial (2-3 người), số liệu (X khách hàng, X năm), logo đối tác (optional)
5. <section class="pricing" hoặc "offer"> — Giá / ưu đãi / gói dịch vụ (nếu phù hợp)
6. <section class="cta-final"> — Banner CTA cuối trang, màu nổi bật
7. <footer> — Thông tin liên hệ, copyright
```

### Ads (`ads`)
```
Loại phổ biến cần hỗ trợ:
- Facebook/Instagram feed: ~1200x628px layout (landscape)
- Story vertical: ~400x700px layout
- Banner display: ~728x90 hoặc ~300x250px

Yêu cầu:
- Thông điệp cốt lõi hiện ngay, không cần scroll
- CTA button lớn, màu tương phản mạnh
- Logo/brand name rõ ràng
- Có thể dùng CSS animation đơn giản (fade, pulse) nếu phù hợp
```

### Article (`article`)
```
Cấu trúc bắt buộc:
1. Header bài viết: tiêu đề H1, meta (tác giả, ngày đăng, thời gian đọc, category tag)
2. Featured image (placeholder)
3. Phần mở đầu: tóm tắt hoặc lead paragraph
4. Nội dung chính: dùng H2/H3 có cấu trúc, đoạn văn ngắn 3-4 câu
5. Các element bổ trợ: blockquote, highlight box, danh sách, bảng (nếu phù hợp style)
6. CTA cuối: box kêu gọi hành động với link về TaoPage
7. Author bio box: avatar + tên + mô tả ngắn
```

### Portfolio (`portfolio`)
```
Cấu trúc bắt buộc:
1. Hero section: tên, title/role, tagline ngắn, 2 CTA (Xem dự án + Liên hệ)
2. About / Bio: mô tả 2-3 dòng về bản thân, điểm mạnh nổi bật
3. Skills / Expertise: kỹ năng với visual (bar, tag, icon grid)
4. Projects / Works: 3-6 dự án với thumbnail placeholder, tên, mô tả ngắn, tags công nghệ
5. Testimonials hoặc Achievements (nếu phù hợp niche)
6. Contact section: email + social links + CTA liên hệ

Yêu cầu kỹ thuật:
- Full-page single scroll, không có router/tab phức tạp
- Dùng CSS animation nhẹ (fade-in, hover transform) — KHÔNG dùng JS animation library
- Dark hoặc light tùy niche, phải có visual identity rõ ràng
- Placeholder image: dùng placehold.co hoặc gradient div
- Nội dung tiếng Việt (tên, role, mô tả dự án)
```

### CV (`cv`)
```
Cấu trúc bắt buộc:
1. Header: tên đầy đủ (in hoa/bold), role/chức danh, thông tin liên hệ (email, phone, địa chỉ, LinkedIn)
2. Tóm tắt nghề nghiệp: 3-4 dòng highlight kinh nghiệm và thành tích chính
3. Kinh nghiệm làm việc: timeline với tên vị trí, công ty, thời gian, 3-5 bullet achievement có số liệu
4. Học vấn: trường, ngành, năm, GPA (nếu có)
5. Kỹ năng: nhóm theo loại (chuyên môn, công cụ, ngôn ngữ) với visual bar hoặc tag
6. Mục bổ sung tùy niche: Chứng chỉ / Thành tích / Dự án cá nhân / Sở thích

Yêu cầu kỹ thuật:
- Print-friendly: body background nhạt, max-width 800-900px, padding đủ để print A4
- ATS-safe hoặc visual tùy style (xem niche trong progress file)
- Font rõ ràng, font-size body ≥ 12px
- KHÔNG dùng fixed height — nội dung phải tự co giãn
- Tên nhân vật, công ty, trường học: dùng tên Việt thực tế (không dùng Lorem Ipsum)
```

---

## Checklist trước khi lưu mỗi template

- [ ] HTML mở bằng `<!DOCTYPE html>` và có `<html lang="vi">`
- [ ] Có `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Toàn bộ CSS là inline trong `<style>` tag trong `<head>`
- [ ] Không có đường dẫn file ngoài (không có `src="./..."` hay `href="./..."`)
- [ ] Nội dung tiếng Việt, đúng niche
- [ ] Màu `gradient` và `accentColor` khớp với màu chủ đạo trong HTML
- [ ] Đã kiểm tra JSON escape hợp lệ (không có dấu `"` thô trong string)
- [ ] **Portfolio**: có đủ 6 section, dùng tên Việt thực tế, animation chỉ CSS
- [ ] **CV**: tên nhân vật và công ty Việt, font-size body ≥ 12px, không fixed height
