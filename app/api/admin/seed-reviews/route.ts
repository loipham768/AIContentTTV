import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Review from '@/models/Review'

// ── Chi tiết 15 review đầu (đã có trong DB, sẽ bị skip nếu chạy lại) ────────
const DETAILED: any[] = [
  { userId: 'seed_v1_001', userEmail: 'nguyen.thi.lan.content@gmail.com', userName: 'Nguyễn Thị Lan', plan: 'basic', rating: 5, content: 'Trước đây tôi mất cả buổi để làm một banner quảng cáo. Bây giờ AI tạo xong trong 1 phút, chỉ cần chỉnh vài chi tiết rồi paste vào là xong. Năng suất tăng gấp 5 lần, thật sự không ngờ.', isApproved: true, createdAt: new Date('2025-03-18T08:30:00Z') },
  { userId: 'seed_v1_002', userEmail: 'tran.quoc.huy.shop@gmail.com', userName: 'Trần Quốc Huy', plan: 'basic', rating: 5, content: 'HTML inline CSS dán vào Sapo không bị lỗi giao diện. Tôi không biết code vẫn tạo được khối content đẹp như chuyên nghiệp thiết kế. Dùng thử 1 tuần là nghiện luôn.', isApproved: true, createdAt: new Date('2025-03-25T14:15:00Z') },
  { userId: 'seed_v1_003', userEmail: 'le.thi.mai.marketing@gmail.com', userName: 'Lê Thị Mai', plan: 'pro', rating: 5, content: 'Nhập tiếng Việt hoàn toàn tự nhiên mà AI vẫn hiểu đúng ý định. Tính năng lưu lịch sử giúp tái sử dụng template cũ rất tiện. Đây là tool không thể thiếu trong workflow của tôi.', isApproved: true, createdAt: new Date('2025-04-02T09:45:00Z') },
  { userId: 'seed_v1_004', userEmail: 'pham.minh.tuan.seo@gmail.com', userName: 'Phạm Minh Tuấn', plan: 'pro', rating: 4, content: 'Dùng mỗi ngày để tạo banner khuyến mãi cho WordPress. Tốc độ nhanh, HTML sạch, không lo CSS conflict. Mong có thêm template sẵn theo ngành để chọn nhanh hơn.', isApproved: true, createdAt: new Date('2025-04-10T16:20:00Z') },
  { userId: 'seed_v1_005', userEmail: 'hoang.thi.thu.freelance@gmail.com', userName: 'Hoàng Thị Thu', plan: 'designer', rating: 5, content: 'Khách hàng cứ nghĩ tôi thuê designer riêng, nhưng thực ra AI làm hết trong vài giây. Tiết kiệm 3-4 triệu mỗi tháng tiền outsource. Cực kỳ đáng đồng tiền bỏ ra.', isApproved: true, createdAt: new Date('2025-04-18T11:00:00Z') },
  { userId: 'seed_v1_006', userEmail: 'vu.duc.anh.ecommerce@gmail.com', userName: 'Vũ Đức Anh', plan: 'pro', rating: 5, content: 'Team marketing 5 người dùng chung, mỗi chiến dịch tiết kiệm 2-3 ngày công. ROI so với chi phí gói Pro là rất cao. Sẽ tiếp tục gia hạn dài hạn.', isApproved: true, createdAt: new Date('2025-04-28T13:30:00Z') },
  { userId: 'seed_v1_007', userEmail: 'dang.thi.huong.social@gmail.com', userName: 'Đặng Thị Hương', plan: 'basic', rating: 4, content: 'Phù hợp cho team nhỏ không có designer. Chỉ mô tả bằng tiếng Việt là ra ngay banner đẹp cho Shopee, Lazada, Facebook. Giao diện thân thiện, học nhanh.', isApproved: true, createdAt: new Date('2025-05-05T10:00:00Z') },
  { userId: 'seed_v1_008', userEmail: 'bui.van.long.dev@gmail.com', userName: 'Bùi Văn Long', plan: 'designer', rating: 5, content: 'Integrate thẳng vào quy trình build site cho khách hàng. Inline CSS không conflict với theme, khách mới cũng tự chỉnh sửa được dễ dàng. Chuyên nghiệp từ A-Z.', isApproved: true, createdAt: new Date('2025-05-12T15:45:00Z') },
  { userId: 'seed_v1_009', userEmail: 'nguyen.van.kiet.ads@gmail.com', userName: 'Nguyễn Văn Kiệt', plan: 'pro', rating: 5, content: 'Tôi chạy quảng cáo Facebook cho 10 khách hàng cùng lúc. TaoPage giúp tạo banner set quảng cáo nhanh gấp 4 lần trước. Copy AI viết ra cũng khá chuẩn, ít phải sửa.', isApproved: true, createdAt: new Date('2025-05-18T08:20:00Z') },
  { userId: 'seed_v1_010', userEmail: 'tran.ngoc.bich.shop@gmail.com', userName: 'Trần Ngọc Bích', plan: 'basic', rating: 5, content: 'Chủ shop online không biết thiết kế như tôi mà vẫn tự làm được banner Flash Sale đẹp. Màu sắc, font chữ AI tự chọn hợp lý, không cần chỉnh nhiều. Tuyệt vời!', isApproved: true, createdAt: new Date('2025-05-22T11:30:00Z') },
  { userId: 'seed_v1_011', userEmail: 'le.hoang.nam.content@gmail.com', userName: 'Lê Hoàng Nam', plan: 'pro', rating: 5, content: 'Làm content cho 3 brand cùng lúc, mỗi brand có style khác nhau. TaoPage xử lý tốt khi tôi mô tả đúng tone. HTML export ra sạch, paste vào Webflow ngon lành.', isApproved: true, createdAt: new Date('2025-05-28T14:00:00Z') },
  { userId: 'seed_v1_012', userEmail: 'pham.thi.thanh.hr@gmail.com', userName: 'Phạm Thị Thanh', plan: 'designer', rating: 5, content: 'Bộ phận HR dùng để tạo thông báo tuyển dụng đăng nội bộ và lên website. Trước phải chờ IT hỗ trợ, giờ tự làm trong 5 phút. Ai cũng hài lòng.', isApproved: true, createdAt: new Date('2025-06-02T09:15:00Z') },
  { userId: 'seed_v1_013', userEmail: 'vo.thanh.liem.agency@gmail.com', userName: 'Võ Thành Liêm', plan: 'designer', rating: 4, content: 'Agency nhỏ dùng để demo nhanh cho khách trước khi vào production. Tiết kiệm được bước mockup ban đầu. Nếu có thêm custom component thì sẽ dùng nhiều hơn nữa.', isApproved: true, createdAt: new Date('2025-06-05T16:45:00Z') },
  { userId: 'seed_v1_014', userEmail: 'nguyen.thi.hoa.beauty@gmail.com', userName: 'Nguyễn Thị Hoa', plan: 'basic', rating: 5, content: 'Mở shop mỹ phẩm online, cần banner liên tục cho từng đợt sale. Trước thuê người làm tốn 200k/cái, giờ tự làm hết. Chất lượng không thua gì, mà còn nhanh hơn nhiều.', isApproved: true, createdAt: new Date('2025-06-08T10:30:00Z') },
  { userId: 'seed_v1_015', userEmail: 'dinh.quoc.bao.startup@gmail.com', userName: 'Đinh Quốc Bảo', plan: 'pro', rating: 5, content: 'Startup không có budget thuê designer full-time. TaoPage là giải pháp hoàn hảo, landing page ra đúng chuẩn, tích hợp vào Next.js cực mượt. Đội dev rất thích.', isApproved: true, createdAt: new Date('2025-06-10T13:00:00Z') },
]

// ── Bulk generation data ──────────────────────────────────────────────────────
const NAMES = [
  'Nguyễn Văn An', 'Trần Thị Bích', 'Lê Hoàng Cường', 'Phạm Thị Dung', 'Vũ Minh Đức',
  'Đỗ Thị Hoa', 'Hoàng Quốc Hùng', 'Ngô Thị Hương', 'Đinh Quang Khoa', 'Dương Thị Lan',
  'Mai Văn Lộc', 'Cao Thị Ly', 'Trương Văn Mạnh', 'Lý Thị Ngân', 'Phan Hoàng Nhân',
  'Tô Thị Oanh', 'Lưu Văn Phát', 'Trịnh Thị Quỳnh', 'Đặng Minh Quân', 'Bùi Thị Ry',
  'Nguyễn Thị Sen', 'Vũ Văn Tài', 'Trần Thị Thảo', 'Lê Minh Thiện', 'Phạm Thị Thu',
  'Hoàng Văn Tiến', 'Đinh Thị Trang', 'Đỗ Văn Triết', 'Mai Thị Uyên', 'Cao Văn Vũ',
]

const CONTENTS = [
  'Công cụ tuyệt vời! Tạo banner nhanh, HTML sạch, dán vào Sapo hay WooCommerce đều không bị lỗi layout. Rất hài lòng.',
  'Tiết kiệm cả tuần thiết kế chỉ trong 1 buổi sáng. Team content của tôi giờ tự xử được hết mà không cần nhờ designer.',
  'AI hiểu tiếng Việt chuẩn, không cần translate hay giải thích rườm rà. Đúng ý ngay lần đầu là tôi thích nhất.',
  'Dùng thử free thấy ổn, nâng gói Pro rồi không muốn quay lại cách cũ nữa. Đầu tư xứng đáng với những gì nhận được.',
  'Làm content cho 5 fanpage cùng lúc mà không bị chậm. Export HTML là tính năng tôi dùng nhiều nhất mỗi ngày.',
  'Khách hàng hỏi ai thiết kế, tôi chỉ cười vì AI làm hết trong 2 phút. Chất lượng không thua gì designer thực thụ.',
  'Trước thuê freelancer 150-200k một banner, giờ tự làm hàng loạt chỉ trong vài phút. Tiết kiệm được kha khá chi phí.',
  'Giao diện editor rất quen tay, học được trong 10 phút là dùng ngay được. Không cần training gì nhiều, tự mày mò là xong.',
  'Tính năng lưu template rất hay, mỗi lần campaign mới chỉ cần chỉnh text và màu là xong. Nhanh và nhất quán về brand.',
  'Paste HTML vào Haravan không bị lỗi responsive. Đây là điểm tôi đánh giá cao nhất, đỡ mất công test trên nhiều thiết bị.',
  'So với các tool khác tôi đã dùng thì TaoPage nhanh hơn hẳn và ít phải chỉnh sửa hơn nhiều. Workflow mượt hơn rõ rệt.',
  'Dùng cho campaign Tết vừa rồi, làm được 50 banner trong 1 ngày. Trước đây thì không tưởng tượng nổi.',
  'Team 3 người cùng dùng, ai cũng tự tạo được banner mà không cần chờ nhau. Workflow cải thiện đáng kể so với trước.',
  'AI viết copy cũng khá ổn, không cần chỉnh nhiều. Phù hợp với SME muốn tự làm mà không tốn nhiều ngân sách thiết kế.',
  'Chạy ads Facebook và Google đều cần nhiều size banner khác nhau. Tool này xử lý nhanh gọn, tiết kiệm được rất nhiều thời gian.',
  'Tôi là người mới học marketing, TaoPage giúp tôi tự tạo được visual content trông chuyên nghiệp ngay từ đầu. Tự tin hơn nhiều.',
  'Dùng để tạo section email marketing. HTML output chuẩn, hiển thị đúng trên cả Gmail và Outlook. Không bị vỡ layout.',
  'Chủ yếu dùng cho landing page sản phẩm mới. Tốc độ ra bản thảo nhanh giúp tôi test nhiều version hơn với chi phí thấp hơn.',
  'Được đồng nghiệp giới thiệu, dùng thử 3 ngày là quyết định đăng ký ngay. Không phải đắn đo gì, giá hợp lý.',
  'Tiện nhất là không cần thoát ra ngoài tìm ý tưởng. Cứ mô tả là AI gợi ý layout và màu sắc ngay trong lúc làm.',
  'Làm e-commerce 3 năm, đây là tool content tốt nhất tôi từng dùng tính đến giờ. Highly recommend cho ai bán hàng online.',
  'Không có nền tảng về code hay design nhưng vẫn tự làm được banner chuẩn. TaoPage giải quyết vấn đề này hoàn toàn.',
  'Export ra xong paste vào WordPress Elementor rất mượt. Không bị vỡ layout hay mất style. Dùng mỗi ngày không thấy lỗi.',
  'Dùng cho dự án freelance, khách hài lòng với tốc độ deliver. Tôi hoàn thiện được nhiều project hơn trong cùng khoảng thời gian.',
  'Nền tảng thân thiện và ổn định. Mỗi lần có feature mới đều thấy cải tiến rõ rệt. Team phát triển lắng nghe người dùng.',
]

const PLANS = ['basic', 'basic', 'basic', 'pro', 'pro', 'pro', 'designer', 'designer', 'free', 'free']
// 60% 5-sao, 30% 4-sao, 10% 3-sao → avg ≈ 4.5
const RATINGS = [5, 5, 5, 5, 5, 5, 4, 4, 4, 3]

function buildBulkReviews(): any[] {
  const start = new Date('2024-09-01').getTime()
  const end   = new Date('2025-06-12').getTime()
  const reviews: any[] = []

  for (let i = 0; i < 185; i++) {
    const n = i + 1
    reviews.push({
      userId:    `seed_bulk_${String(n).padStart(3, '0')}`,
      userEmail: `u${n}@seed.internal`,
      userName:  NAMES[i % NAMES.length],
      plan:      PLANS[i % PLANS.length],
      rating:    RATINGS[i % RATINGS.length],
      content:   CONTENTS[i % CONTENTS.length],
      isApproved: true,
      createdAt:  new Date(start + ((end - start) * i) / 185),
    })
  }
  return reviews
}

export async function POST(req: NextRequest) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const allReviews = [...DETAILED, ...buildBulkReviews()]

  // Lấy danh sách userId đã tồn tại để bỏ qua, tránh duplicate error
  const existing = await Review.find(
    { userId: { $in: allReviews.map((r) => r.userId) } },
    { userId: 1 }
  ).lean() as { userId: string }[]
  const existingSet = new Set(existing.map((r) => r.userId))
  const toInsert = allReviews.filter((r) => !existingSet.has(r.userId))

  if (toInsert.length === 0) {
    return NextResponse.json({
      inserted: 0,
      total: allReviews.length,
      message: `Tất cả ${allReviews.length} review đã tồn tại trong DB rồi.`,
    })
  }

  const result = await Review.insertMany(toInsert)
  return NextResponse.json({
    inserted: result.length,
    total: allReviews.length,
    message: `Đã chèn ${result.length} review mới. Tổng trong DB: ${existingSet.size + result.length}.`,
  })
}
