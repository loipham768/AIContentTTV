"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Send,
  Pencil,
  LayoutTemplate,
  Info,
  Crown,
  Gem,
  PenTool,
  Download,
  ImageIcon,
  Globe,
  Link2,
} from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeminiMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

interface DisplayPair {
  question: string;
  answer: string;
}

interface CurrentQuestion {
  question: string;
  hint?: string;
  options: string[];
  items?: string[]; // bullet-point summary for confirm step
  isConfirm?: boolean;
}

type Phase = "initial" | "questioning" | "generating" | "done" | "error";
type Mode = "describe" | "clone";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type SampleItem = { text: string; desc: string };
type ContentTypeId = "landing" | "article" | "ads" | "portfolio";

const CONTENT_META: Record<ContentTypeId, { label: string; desc: string }> = {
  landing: { label: "Landing page", desc: "Trang giới thiệu, bán hàng" },
  article: { label: "Bài viết", desc: "Blog, CMS, tin tức" },
  ads: { label: "Quảng cáo", desc: "Facebook, Google Ads" },
  portfolio: { label: "Portfolio & CV", desc: "Trang cá nhân, xin việc" },
};

const CONTENT_POOL: Record<ContentTypeId, SampleItem[]> = {
  landing: [
    // Mỹ phẩm & làm đẹp
    {
      text: "Landing page bán sản phẩm skincare thuần chay cho phụ nữ 25–35 tuổi",
      desc: "Skincare",
    },
    {
      text: "Trang bán mỹ phẩm handmade thiên nhiên không hóa chất",
      desc: "Organic beauty",
    },
    {
      text: "Landing page ra mắt dòng nước hoa nội địa cao cấp",
      desc: "Perfume",
    },
    {
      text: "Trang bán bộ dưỡng da dành riêng cho nam giới",
      desc: "Men grooming",
    },
    {
      text: "Landing page đặt lịch spa & chăm sóc da mặt tại nhà",
      desc: "Spa / Beauty",
    },
    // Giáo dục & đào tạo
    {
      text: "Landing page đăng ký khóa học lập trình web fullstack",
      desc: "Giáo dục",
    },
    {
      text: "Landing page khóa học tiếng Anh giao tiếp online",
      desc: "Ngoại ngữ",
    },
    {
      text: "Trang đăng ký khóa học thiết kế Figma & UI/UX",
      desc: "Design course",
    },
    {
      text: "Landing page khóa học chạy quảng cáo Facebook & TikTok Ads",
      desc: "Marketing course",
    },
    {
      text: "Trang giới thiệu trường mầm non tư thục chất lượng cao",
      desc: "Giáo dục",
    },
    {
      text: "Landing page đăng ký lớp học đàn piano cho trẻ em",
      desc: "Năng khiếu",
    },
    // Dịch vụ chuyên nghiệp
    {
      text: "Trang giới thiệu dịch vụ thiết kế nội thất cao cấp",
      desc: "Nội thất",
    },
    {
      text: "Trang giới thiệu dịch vụ chụp ảnh cưới chuyên nghiệp",
      desc: "Nhiếp ảnh",
    },
    {
      text: "Trang giới thiệu agency marketing digital tại Việt Nam",
      desc: "Agency",
    },
    {
      text: "Landing page dịch vụ thiết kế logo & nhận diện thương hiệu",
      desc: "Branding",
    },
    {
      text: "Trang giới thiệu công ty vệ sinh công nghiệp & văn phòng",
      desc: "Cleaning service",
    },
    {
      text: "Landing page dịch vụ kế toán thuế cho hộ kinh doanh",
      desc: "Kế toán",
    },
    { text: "Trang đặt lịch tư vấn pháp lý miễn phí", desc: "Luật" },
    {
      text: "Landing page dịch vụ dịch thuật công chứng đa ngôn ngữ",
      desc: "Dịch thuật",
    },
    // Bất động sản
    { text: "Trang bán căn hộ chung cư mới tại TP.HCM", desc: "Bất động sản" },
    {
      text: "Landing page cho thuê văn phòng coworking trung tâm Hà Nội",
      desc: "Văn phòng",
    },
    {
      text: "Trang giới thiệu khu nghỉ dưỡng biển cao cấp Phú Quốc",
      desc: "Resort",
    },
    { text: "Landing page bán đất nền dự án khu đô thị mới", desc: "Đất nền" },
    // Startup & app
    { text: "Landing page ra mắt app đặt đồ ăn nhanh", desc: "Food tech" },
    {
      text: "Trang giới thiệu app quản lý tài chính cá nhân",
      desc: "Fintech app",
    },
    {
      text: "Landing page ra mắt nền tảng học online cho học sinh THPT",
      desc: "EdTech",
    },
    {
      text: "Trang giới thiệu app kết nối thợ sửa chữa tại nhà",
      desc: "Home service app",
    },
    {
      text: "Landing page ra mắt phần mềm quản lý nhà hàng & POS",
      desc: "SaaS F&B",
    },
    // Sức khỏe & wellness
    { text: "Trang đặt lịch tư vấn tài chính cá nhân", desc: "Tài chính" },
    {
      text: "Landing page bán thực phẩm chức năng tăng cường sức khỏe",
      desc: "Health & Wellness",
    },
    { text: "Trang giới thiệu phòng khám nha khoa thẩm mỹ", desc: "Nha khoa" },
    {
      text: "Landing page đăng ký gói tập gym & yoga theo tháng",
      desc: "Fitness",
    },
    {
      text: "Trang bán thực phẩm hữu cơ sạch giao tận nhà",
      desc: "Organic food",
    },
    // Thời trang & lifestyle
    { text: "Landing page bán đồng hồ chính hãng giá tốt", desc: "Đồng hồ" },
    { text: "Trang bán giày sneaker limited edition", desc: "Sneaker" },
    {
      text: "Landing page ra mắt thương hiệu thời trang nữ công sở",
      desc: "Fashion",
    },
    {
      text: "Trang bán đồ gia dụng thông minh nhập khẩu Nhật Bản",
      desc: "Gia dụng",
    },
    // Du lịch & sự kiện
    {
      text: "Landing page đăng ký tour du lịch Đà Nẵng 4 ngày 3 đêm",
      desc: "Travel",
    },
    { text: "Trang bán vé sự kiện âm nhạc & festival mùa hè", desc: "Event" },
    {
      text: "Landing page đặt phòng homestay phong cách Nhật tại Đà Lạt",
      desc: "Homestay",
    },
  ],
  article: [
    // Làm đẹp & sức khỏe
    {
      text: "Bài review 5 sản phẩm dưỡng da tốt nhất mùa hè 2025",
      desc: "Review / Blog",
    },
    {
      text: "Hướng dẫn chăm sóc da mùa khô từ A đến Z",
      desc: "Tutorial làm đẹp",
    },
    {
      text: "Top 10 kem chống nắng SPF50+ tốt nhất cho da Việt",
      desc: "Review skincare",
    },
    { text: "Routine dưỡng da ban đêm cho da hỗn hợp", desc: "Beauty guide" },
    {
      text: "5 sai lầm khi chăm sóc da mà bạn đang mắc phải",
      desc: "Tips làm đẹp",
    },
    {
      text: "Bài review bộ sản phẩm chăm sóc tóc hư tổn",
      desc: "Review haircare",
    },
    {
      text: "Thực đơn giảm cân 7 ngày cho dân văn phòng",
      desc: "Health & Diet",
    },
    {
      text: "Hướng dẫn tập yoga tại nhà cho người mới bắt đầu",
      desc: "Fitness",
    },
    // Thời trang & phong cách
    { text: "Tin ra mắt BST thời trang thu đông mới", desc: "Press release" },
    {
      text: "10 cách phối đồ basic vẫn ra chất, không bao giờ lỗi thời",
      desc: "Fashion tips",
    },
    {
      text: "Xu hướng màu sắc thời trang nổi bật mùa thu 2025",
      desc: "Trend report",
    },
    {
      text: "Hướng dẫn chọn đồ đi làm thanh lịch với ngân sách 2 triệu",
      desc: "Fashion guide",
    },
    {
      text: "Review túi xách Việt Nam chất lượng cao thay thế hàng hiệu",
      desc: "Review fashion",
    },
    // Công nghệ & AI
    {
      text: "Top 7 công cụ AI giúp tăng năng suất làm việc 2025",
      desc: "Tech / Productivity",
    },
    {
      text: "Hướng dẫn dùng AI viết content hiệu quả cho marketer",
      desc: "AI Guide",
    },
    {
      text: "So sánh iPhone 16 Pro vs Samsung S25 Ultra: nên mua cái nào?",
      desc: "Tech review",
    },
    {
      text: "Top 5 phần mềm quản lý công việc miễn phí tốt nhất 2025",
      desc: "Productivity",
    },
    {
      text: "Hướng dẫn bảo mật tài khoản mạng xã hội cơ bản cho SME",
      desc: "Cybersecurity",
    },
    {
      text: "Canva vs Adobe Express: marketer nên dùng cái nào?",
      desc: "Tool comparison",
    },
    // Marketing & kinh doanh
    {
      text: "Bài viết xu hướng marketing 2025 dành cho SMB",
      desc: "Insight / Trend",
    },
    {
      text: "Hướng dẫn viết content Facebook Ads chuyển đổi cao",
      desc: "Content Marketing",
    },
    {
      text: "Cách xây dựng phễu bán hàng hiệu quả cho shop online",
      desc: "Sales funnel",
    },
    {
      text: "7 chiến lược giữ chân khách hàng cũ hiệu quả nhất",
      desc: "Retention",
    },
    {
      text: "Câu chuyện thương hiệu: hành trình 5 năm xây dựng startup",
      desc: "Brand Story",
    },
    {
      text: "Case study dự án thiết kế website thương hiệu F&B",
      desc: "Portfolio",
    },
    {
      text: "Bài học từ 3 chiến dịch viral của thương hiệu Việt 2024",
      desc: "Case study",
    },
    {
      text: "Hướng dẫn xây kênh TikTok từ 0 cho thương hiệu mới",
      desc: "Social media",
    },
    // F&B & ẩm thực
    { text: "Bài viết giới thiệu menu mới nhà hàng mùa hè", desc: "F&B" },
    {
      text: "Top 15 quán cà phê view đẹp tại Hà Nội không thể bỏ lỡ",
      desc: "F&B review",
    },
    {
      text: "Công thức nấu 5 món ăn Việt truyền thống dễ làm tại nhà",
      desc: "Recipe",
    },
    {
      text: "Review nhà hàng buffet hải sản mới mở tại TP.HCM",
      desc: "Restaurant review",
    },
    // Tài chính & đầu tư
    {
      text: "Hướng dẫn đầu tư chứng khoán cho người mới bắt đầu",
      desc: "Tài chính",
    },
    {
      text: "Insight thị trường bất động sản TP.HCM quý 3/2025",
      desc: "Bất động sản",
    },
    {
      text: "Cách lập kế hoạch tài chính cá nhân 6 tháng cuối năm",
      desc: "Personal finance",
    },
    {
      text: "So sánh gửi tiết kiệm vs mua vàng: lựa chọn nào tốt hơn?",
      desc: "Investment",
    },
    // Du lịch & lifestyle
    {
      text: "Lịch trình khám phá Đà Lạt 3 ngày 2 đêm tiết kiệm",
      desc: "Travel guide",
    },
    {
      text: "Kinh nghiệm du lịch Phú Quốc tự túc dưới 5 triệu đồng",
      desc: "Travel tips",
    },
    {
      text: "Top 10 điểm picnic lý tưởng gần TP.HCM cuối tuần",
      desc: "Lifestyle",
    },
    {
      text: "Hướng dẫn mua vé máy bay giá rẻ đúng thời điểm",
      desc: "Travel hack",
    },
    // Giáo dục & phát triển bản thân
    {
      text: "Cách học tiếng Anh mỗi ngày 30 phút mà vẫn tiến bộ",
      desc: "Học tập",
    },
    {
      text: "5 thói quen buổi sáng giúp tăng năng suất cả ngày",
      desc: "Self-improvement",
    },
    {
      text: "Hướng dẫn đọc sách hiệu quả và ghi nhớ lâu hơn",
      desc: "Learning",
    },
    {
      text: "Review khóa học lập trình Python online tốt nhất 2025",
      desc: "Education review",
    },
  ],
  ads: [
    // Flash sale & khuyến mãi
    {
      text: "Banner Flash Sale giảm 50% cho shop thời trang online",
      desc: "Facebook Ads",
    },
    {
      text: "Quảng cáo ưu đãi sinh nhật 20% dịch vụ spa & massage",
      desc: "Local business",
    },
    {
      text: "Banner khuyến mãi mua 2 tặng 1 sản phẩm chăm sóc da",
      desc: "Skincare promo",
    },
    {
      text: "Post quảng cáo giảm giá cuối mùa thời trang hè 70%",
      desc: "Fashion sale",
    },
    {
      text: "Banner Double Day 12.12 cho sàn thương mại điện tử",
      desc: "E-commerce",
    },
    {
      text: "Quảng cáo freeship toàn quốc dịp lễ 30/4 cho shop online",
      desc: "Promo",
    },
    // Giáo dục & khóa học
    {
      text: "Post quảng cáo khai giảng khóa học online tháng 6",
      desc: "Facebook / Zalo",
    },
    {
      text: "Banner tuyển sinh khóa học thiết kế đồ họa cấp tốc",
      desc: "Design course",
    },
    {
      text: "Quảng cáo học bổng 50% khóa học lập trình Python",
      desc: "EdTech",
    },
    {
      text: "Post quảng cáo lớp IELTS cấp tốc 3 tháng lên 6.5",
      desc: "Ngoại ngữ",
    },
    // Bất động sản
    { text: "Banner mở bán đợt 1 căn hộ view sông", desc: "Bất động sản" },
    { text: "Quảng cáo nhận giữ chỗ đất nền dự án ven biển", desc: "Đất nền" },
    {
      text: "Banner ra mắt dự án căn hộ thông minh smarthome",
      desc: "Real estate",
    },
    {
      text: "Post quảng cáo cho thuê văn phòng linh hoạt không cần cọc",
      desc: "Văn phòng",
    },
    // F&B
    { text: "Quảng cáo app giao đồ ăn nhanh trong 30 phút", desc: "Food tech" },
    {
      text: "Banner ra mắt menu mùa hè nhà hàng buffet Nhật",
      desc: "Nhà hàng",
    },
    {
      text: "Post quảng cáo combo trà sữa 2 ly 99k dịp cuối tuần",
      desc: "F&B",
    },
    {
      text: "Quảng cáo đăng ký gói cà phê văn phòng theo tháng",
      desc: "Coffee B2B",
    },
    // Tài chính & bảo hiểm
    {
      text: "Quảng cáo ra mắt dòng sản phẩm bảo hiểm nhân thọ mới",
      desc: "Bảo hiểm",
    },
    {
      text: "Banner mở tài khoản chứng khoán miễn phí trong tháng 6",
      desc: "Fintech",
    },
    {
      text: "Post quảng cáo vay tín chấp nhanh, lãi suất 0% tháng đầu",
      desc: "Tín dụng",
    },
    {
      text: "Quảng cáo thẻ tín dụng hoàn tiền 5% mọi giao dịch",
      desc: "Banking",
    },
    // Tech & SaaS
    {
      text: "Banner giới thiệu phần mềm quản lý bán hàng cho SME",
      desc: "SaaS / B2B",
    },
    {
      text: "Quảng cáo dùng thử miễn phí 30 ngày phần mềm kế toán",
      desc: "SaaS",
    },
    {
      text: "Post quảng cáo hosting + domain miễn phí 1 năm cho startup",
      desc: "Hosting",
    },
    {
      text: "Banner ra mắt tính năng AI mới của app quản lý công việc",
      desc: "Productivity app",
    },
    // Du lịch & sự kiện
    {
      text: "Post quảng cáo combo du lịch Đà Nẵng 3 ngày 2 đêm",
      desc: "Du lịch",
    },
    {
      text: "Quảng cáo tour Hàn Quốc 6 ngày 5 đêm giá tốt tháng 9",
      desc: "Travel",
    },
    {
      text: "Banner bán vé sự kiện âm nhạc lớn nhất mùa hè 2025",
      desc: "Event",
    },
    {
      text: "Post quảng cáo gói nghỉ dưỡng couple 2 ngày 1 đêm Đà Lạt",
      desc: "Homestay",
    },
    // Tuyển dụng & HR
    {
      text: "Banner tuyển dụng nhân viên kinh doanh toàn quốc",
      desc: "Tuyển dụng",
    },
    {
      text: "Quảng cáo tuyển cộng tác viên bán hàng online, hoa hồng 20%",
      desc: "CTV",
    },
    {
      text: "Post quảng cáo việc làm freelance thiết kế đồ họa",
      desc: "Freelance",
    },
    // Sức khỏe & thể thao
    {
      text: "Quảng cáo sản phẩm đèn LED tiết kiệm điện cho hộ gia đình",
      desc: "Tiêu dùng",
    },
    {
      text: "Banner đăng ký gói tập gym 6 tháng tặng 1 tháng miễn phí",
      desc: "Fitness",
    },
    {
      text: "Post quảng cáo thực phẩm bổ sung protein cho người tập gym",
      desc: "Supplement",
    },
    {
      text: "Quảng cáo dịch vụ khám sức khỏe tổng quát giá ưu đãi",
      desc: "Healthcare",
    },
  ],
  portfolio: [
    { text: "Portfolio cho lập trình viên Frontend React 3 năm kinh nghiệm", desc: "Frontend Dev" },
    { text: "CV online cho Backend Developer Python & NodeJS", desc: "Backend Dev" },
    { text: "Portfolio fullstack developer tìm việc tại công ty startup", desc: "Fullstack Dev" },
    { text: "Portfolio UI/UX Designer với showcase dự án Figma", desc: "Designer" },
    { text: "Portfolio Graphic Designer với các dự án branding & logo", desc: "Graphic Design" },
    { text: "CV online cho Digital Marketing Manager 5 năm kinh nghiệm", desc: "Marketing" },
    { text: "Portfolio Content Creator & Copywriter", desc: "Content" },
    { text: "CV chuyên nghiệp cho Business Analyst tìm việc mới", desc: "Business" },
    { text: "Trang cá nhân Freelancer đa lĩnh vực tìm khách hàng", desc: "Freelancer" },
    { text: "Portfolio nhiếp ảnh gia chụp ảnh cưới & sự kiện", desc: "Photography" },
    { text: "CV cho giáo viên tiếng Anh với chứng chỉ IELTS 8.0", desc: "Giáo viên" },
    { text: "CV chuyên nghiệp cho Kế toán trưởng 7 năm kinh nghiệm", desc: "Kế toán" },
    { text: "Portfolio tư vấn chiến lược & quản lý dự án", desc: "Consultant" },
    { text: "Portfolio Mobile Developer iOS & Android", desc: "Mobile Dev" },
    { text: "Trang cá nhân cho SEO Specialist xin việc", desc: "SEO" },
  ],
};

function shufflePick(items: SampleItem[], n: number): SampleItem[] {
  return [...items].sort(() => Math.random() - 0.5).slice(0, n);
}

const CONTENT_TYPE_IDS: ContentTypeId[] = ["landing", "article", "ads", "portfolio"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreatePageClient({ plan = "free" }: { plan?: string }) {
  const router = useRouter();

  // Full message history sent to Gemini
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  // Pairs of (question, answer) for display only
  const [history, setHistory] = useState<DisplayPair[]>([]);
  // Current question card shown to user
  const [current, setCurrent] = useState<CurrentQuestion | null>(null);
  // Custom text input value
  const [custom, setCustom] = useState("");
  // Initial user request (for project naming)
  const [initialPrompt, setInitialPrompt] = useState("");

  const [phase, setPhase] = useState<Phase>("initial");
  const [errorMsg, setErrorMsg] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [longWait, setLongWait] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const longWaitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial screen state
  const [selectedType, setSelectedType] = useState<ContentTypeId | null>(null);
  const [displayedSamples, setDisplayedSamples] = useState<SampleItem[]>([]);
  const [initialInput, setInitialInput] = useState("");

  const [mode, setMode] = useState<Mode>("describe");
  const [cloneUrl, setCloneUrl] = useState("");
  const [cloneError, setCloneError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLTextAreaElement>(null);
  const initialInputRef = useRef<HTMLTextAreaElement>(null);
  const cloneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, current, phase]);

  // ── Core: send a user answer to Gemini ──────────────────────────────────────

  async function sendAnswer(answerText: string, currentQ: CurrentQuestion) {
    const trimmed = answerText.trim();
    if (!trimmed) return;

    // Add to display history
    setHistory((prev) => [
      ...prev,
      { question: currentQ.question, answer: trimmed },
    ]);
    setCurrent(null);
    setCustom("");

    // Reconstruct the JSON that Gemini originally returned so history stays consistent
    const modelJson = currentQ.isConfirm
      ? JSON.stringify({ type: "confirm", question: currentQ.question, items: currentQ.items ?? [], options: currentQ.options })
      : JSON.stringify({ type: "question", question: currentQ.question, ...(currentQ.hint ? { hint: currentQ.hint } : {}), options: currentQ.options });

    const modelMsg: GeminiMessage = {
      role: "model",
      parts: [{ text: modelJson }],
    };
    const userMsg: GeminiMessage = {
      role: "user",
      parts: [{ text: trimmed }],
    };
    const updatedMessages = [...messages, modelMsg, userMsg];
    setMessages(updatedMessages);

    setPhase("questioning");
    setErrorMsg("");

    await callGemini(updatedMessages);
  }

  // ── First message (initial request) ─────────────────────────────────────────

  async function sendInitial(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInitialPrompt(trimmed);
    setPhase("questioning");
    setErrorMsg("");

    const userMsg: GeminiMessage = { role: "user", parts: [{ text: trimmed }] };
    const newMessages = [userMsg];
    setMessages(newMessages);

    await callGemini(newMessages);
  }

  // ── Call Gemini API ──────────────────────────────────────────────────────────

  async function callGemini(msgs: GeminiMessage[]) {
    // Show a friendly waiting message after 5 s (HTML generation is slow; questions are fast)
    setLongWait(false);
    longWaitTimer.current = setTimeout(() => setLongWait(true), 5000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs, initialPrompt, contentType: selectedType ?? undefined }),
      });

      const data = await res.json();

      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);

      if (!res.ok) {
        setErrorMsg(data.error ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
        setPhase("error");
        return;
      }

      if (data.type === "question") {
        setCurrent({
          question: data.question,
          hint: data.hint,
          options: data.options ?? [],
        });
        setPhase("questioning");
        setTimeout(() => customInputRef.current?.focus(), 150);
        return;
      }

      if (data.type === "confirm") {
        setCurrent({
          question: data.question,
          options: data.options ?? ["Hãy tạo nội dung ngay!"],
          items: data.items ?? [],
          isConfirm: true,
        });
        setPhase("questioning");
        setTimeout(() => customInputRef.current?.focus(), 150);
        return;
      }

      if (data.type === "html") {
        setProjectId(data.projectId ?? null);
        setGeneratedImage(null);
        setPhase("done");
        return;
      }

      if (data.type === "image") {
        setProjectId(data.projectId ?? null);
        setGeneratedImage({ base64: data.imageData, mimeType: data.mimeType });
        setPhase("done");
        return;
      }

      if (data.type === "error") {
        setErrorMsg(data.content ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
        setPhase("error");
        return;
      }

      setErrorMsg("Phản hồi không hợp lệ. Vui lòng thử lại.");
      setPhase("error");
    } catch {
      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);
      setErrorMsg("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setPhase("error");
    }
  }

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleTypeClick(typeId: ContentTypeId) {
    if (selectedType === typeId) {
      setSelectedType(null);
      setDisplayedSamples([]);
    } else {
      setSelectedType(typeId);
      setDisplayedSamples(shufflePick(CONTENT_POOL[typeId], 5));
    }
  }

  function handleOptionClick(option: string) {
    if (!current) return;
    sendAnswer(option, current);
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!current || !custom.trim()) return;
    sendAnswer(custom, current);
  }

  function handleCustomKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (current && custom.trim()) sendAnswer(custom, current);
    }
  }

  function handleInitialKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (initialInput.trim()) sendInitial(initialInput);
    }
  }

  function handleReset() {
    setMessages([]);
    setHistory([]);
    setCurrent(null);
    setCustom("");
    setInitialPrompt("");
    setProjectId(null);
    setGeneratedImage(null);
    setPhase("initial");
    setErrorMsg("");
    setSelectedType(null);
    setDisplayedSamples([]);
    setInitialInput("");
    setCloneUrl("");
    setCloneError("");
    setTimeout(() => {
      if (mode === "clone") cloneInputRef.current?.focus();
      else initialInputRef.current?.focus();
    }, 100);
  }

  async function handleCloneSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = cloneUrl.trim();
    if (!trimmed) return;
    setCloneError("");

    // Basic URL validation on client
    try {
      new URL(trimmed);
    } catch {
      setCloneError("URL không hợp lệ. Ví dụ: https://example.com");
      return;
    }

    setInitialPrompt(trimmed);
    setPhase("questioning"); // reuse loading UI (questioning + no current = dots)
    setCurrent(null);
    setLongWait(false);
    longWaitTimer.current = setTimeout(() => setLongWait(true), 5000);

    try {
      const res = await fetch("/api/clone-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();

      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);

      if (!res.ok) {
        setErrorMsg(data.error ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
        setPhase("error");
        return;
      }

      setProjectId(data.projectId ?? null);
      setGeneratedImage(null);
      setPhase("done");
    } catch {
      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);
      setErrorMsg("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setPhase("error");
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  // Designer plan cannot use AI generation
  if (plan === "designer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
          <Logo iconSize={28} uid="create-logo" dark />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm shadow-teal-500/30">
              <PenTool className="w-2.5 h-2.5" /> Designer
            </span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <PenTool className="w-8 h-8 text-teal-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Gói Designer không có AI
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gói{" "}
                <span className="text-teal-400 font-semibold">Designer</span>{" "}
                được thiết kế cho việc tự tay thiết kế — không bao gồm tính năng
                tạo nội dung bằng AI. Để dùng AI, bạn cần nâng cấp lên gói{" "}
                <span className="text-indigo-400 font-semibold">Basic</span>{" "}
                hoặc <span className="text-amber-400 font-semibold">Pro</span>.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/editor"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-all"
              >
                <Pencil className="w-4 h-4" />
                Mở trình soạn thảo
              </a>
              <a
                href="/templates"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-all"
              >
                <LayoutTemplate className="w-4 h-4" />
                Dùng mẫu có sẵn
              </a>
              <a
                href="/upgrade"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                <Crown className="w-4 h-4" />
                Nâng cấp để dùng AI
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
        <Logo iconSize={28} uid="create-logo" dark />
        <div className="flex items-center gap-3">
          <a
            href="/templates"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mẫu có sẵn</span>
          </a>
          <a
            href="/editor"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Soạn thảo trống</span>
          </a>
          <Link
            href="/profile"
            title={`Gói ${plan === "free" ? "Miễn phí" : plan === "designer" ? "Designer" : plan === "basic" ? "Basic" : "Pro"} · Xem profile`}
          >
            {plan === "free" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors">
                <Sparkles className="w-2.5 h-2.5" /> Free
              </span>
            )}
            {plan === "designer" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm shadow-teal-500/30">
                <PenTool className="w-2.5 h-2.5" /> Designer
              </span>
            )}
            {plan === "basic" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-sm shadow-indigo-500/30">
                <Crown className="w-2.5 h-2.5" /> Basic
              </span>
            )}
            {plan === "pro" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm shadow-amber-500/30">
                <Gem className="w-2.5 h-2.5" /> Pro
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8 overflow-hidden">
        {/* ── Initial screen ── */}
        {phase === "initial" && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                Tạo Landing page/Bài viết/Quảng cáo với AI
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                Bạn muốn tạo gì hôm nay?
              </h1>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Chọn nhanh bên dưới hoặc nhập yêu cầu của bạn
              </p>
            </div>

            {/* Mode toggle */}
            <div className="w-full flex gap-2 mb-5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
              <button
                onClick={() => setMode("describe")}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all",
                  mode === "describe"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200",
                ].join(" ")}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Mô tả nội dung
              </button>
              <button
                onClick={() => { setMode("clone"); setTimeout(() => cloneInputRef.current?.focus(), 100); }}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all",
                  mode === "clone"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200",
                ].join(" ")}
              >
                <Globe className="w-3.5 h-3.5" />
                Clone từ URL
              </button>
            </div>

            {/* Clone URL mode */}
            {mode === "clone" && (
              <div className="w-full flex flex-col gap-4">
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl px-4 py-3 flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nhập URL bất kỳ — AI sẽ tải trang, phân tích cấu trúc và tạo ra HTML tương tự để bạn chỉnh sửa trong editor.
                  </p>
                </div>

                <form onSubmit={handleCloneSubmit} className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <input
                      ref={cloneInputRef}
                      type="url"
                      value={cloneUrl}
                      onChange={(e) => { setCloneUrl(e.target.value); setCloneError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleCloneSubmit(); }}
                      placeholder="https://example.com"
                      className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                  {cloneError && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {cloneError}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-slate-500">Tốt nhất với trang server-rendered (không cần JS)</span>
                    <button
                      type="submit"
                      disabled={!cloneUrl.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all"
                    >
                      <Globe className="w-3 h-3" />
                      Phân tích
                    </button>
                  </div>
                </form>

                <div className="flex items-start gap-2 px-1">
                  <Info className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tính năng này tái tạo <span className="text-slate-400">cấu trúc & phong cách</span> trang gốc, không phải clone chính xác 100%. Kết quả ~70–80% giống. Sử dụng 1 lượt tạo.
                  </p>
                </div>
              </div>
            )}

            {/* Type selector — only in describe mode */}
            {mode === "describe" && (<>
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              {CONTENT_TYPE_IDS.map((typeId) => {
                const meta = CONTENT_META[typeId];
                const active = selectedType === typeId;
                return (
                  <button
                    key={typeId}
                    onClick={() => handleTypeClick(typeId)}
                    className={[
                      "text-left px-3 py-3 rounded-xl border transition-all",
                      active
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-white/[0.03] border-white/[0.06] text-slate-400 hover:bg-white/[0.06] hover:border-white/10 hover:text-slate-200",
                    ].join(" ")}
                  >
                    <div className="text-sm font-semibold leading-tight">
                      {meta.label}
                    </div>
                    <div
                      className={`text-xs mt-0.5 leading-tight ${active ? "text-indigo-200" : "text-slate-500"}`}
                    >
                      {meta.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Samples for selected type — click to send directly */}
            {selectedType && displayedSamples.length > 0 && (
              <div className="w-full space-y-1.5 mb-4">
                {displayedSamples.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => sendInitial(sample.text)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-indigo-600/20 hover:border-indigo-500/30 transition-all flex items-baseline gap-2 group"
                  >
                    <span className="text-sm text-slate-200 group-hover:text-white flex-1 transition-colors">
                      {sample.text}
                    </span>
                    <span className="text-xs text-slate-500 flex-shrink-0">
                      {sample.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4">
              <textarea
                ref={initialInputRef}
                autoFocus
                value={initialInput}
                onChange={(e) => setInitialInput(e.target.value)}
                placeholder={
                  selectedType
                    ? "Không thấy gợi ý phù hợp? Nhập yêu cầu của bạn vào đây..."
                    : "Nhập yêu cầu của bạn vào đây, hoặc chọn nhanh một loại nội dung bên trên"
                }
                rows={5}
                maxLength={5000}
                onKeyDown={handleInitialKeyDown}
                className="w-full resize-none bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none leading-relaxed"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-slate-500">
                  Enter để gửi · Shift+Enter xuống dòng
                </span>
                <button
                  onClick={() => {
                    if (initialInput.trim()) sendInitial(initialInput);
                  }}
                  disabled={!initialInput.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all"
                >
                  <Send className="w-3 h-3" />
                  Bắt đầu
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="w-full mt-3 space-y-2 px-1">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  AI sẽ tạo khung nội dung dựa trên ý tưởng của bạn — chưa hoàn
                  chỉnh 100%. Sau khi tạo xong, bạn có thể kéo thả, chỉnh sửa
                  từng đoạn văn, thay hình ảnh và tinh chỉnh tự do trong trình
                  soạn thảo để ra sản phẩm cuối cùng theo đúng ý mình.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-amber-600/70 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Một số block có hiệu ứng động như{" "}
                  <span className="text-slate-400">slider, tab, accordion</span>
                  ... cần JavaScript để hoạt động. Nếu trang web hoặc nền tảng
                  bạn nhúng nội dung không cho phép script, các block này có thể
                  hiển thị không như mong muốn.
                </p>
              </div>
            </div>
            </>)}
          </div>
        )}

        {/* ── Conversation + current question ── */}
        {phase !== "initial" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Initial request bubble */}
            {initialPrompt && (
              <div className="flex justify-end mb-4 flex-shrink-0">
                <div className="max-w-[80%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                  {initialPrompt}
                </div>
              </div>
            )}

            {/* Q&A history */}
            <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-1">
              {history.map((pair, i) => (
                <div key={i} className="space-y-2">
                  {/* AI question */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/[0.06] border border-white/10 text-slate-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 leading-relaxed max-w-[85%]">
                      {pair.question}
                    </div>
                  </div>
                  {/* User answer */}
                  <div className="flex justify-end">
                    <div className="max-w-[75%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                      {pair.answer}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {(phase === "questioning" && !current) ||
              phase === "generating" ? (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                    {longWait && (
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        Bạn đợi xíu nha!., nội dung của bạn đang được tạo...
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Done state */}
              {phase === "done" && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm rounded-2xl rounded-tl-sm px-4 py-3 space-y-1.5">
                      {generatedImage ? (
                        <>
                          <p className="font-medium">Banner quảng cáo đã tạo xong!</p>
                          <p className="text-emerald-400/80 text-xs leading-relaxed">
                            Ảnh banner được tạo bằng Imagen 3. Tải về để dùng ngay trên Facebook, Instagram, Zalo...
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium">Khung nội dung đã được tạo xong!</p>
                          <p className="text-emerald-400/80 text-xs leading-relaxed">
                            Đây là bản thảo ~80% theo ý bạn. Mở trình soạn thảo để kéo thả, thay hình ảnh, chỉnh từng đoạn văn.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Banner image preview */}
                  {generatedImage && (
                    <div className="rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`}
                        alt="Banner quảng cáo"
                        className="w-full h-auto block"
                      />
                    </div>
                  )}

                  {generatedImage ? (
                    <a
                      href={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`}
                      download={`banner-${Date.now()}.${generatedImage.mimeType.split('/')[1] ?? 'jpg'}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      Tải banner về
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (isNavigating) return;
                        setIsNavigating(true);
                        router.push(projectId ? `/editor?project=${projectId}` : "/editor");
                      }}
                      disabled={isNavigating}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                    >
                      {isNavigating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Đang mở...
                        </>
                      ) : (
                        <>
                          Mở trình soạn thảo
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {generatedImage ? "Tạo banner mới" : mode === "clone" ? "Clone trang mới" : "Tạo trang mới"}
                  </button>
                </div>
              )}

              {/* Error state */}
              {phase === "error" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Bắt đầu lại
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Current question card ── */}
            {current && phase === "questioning" && (
              <div className="flex-shrink-0 space-y-3">
                {/* Question + optional confirm bullets */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    {/* Bullet summary for confirm step */}
                    {current.isConfirm &&
                      current.items &&
                      current.items.length > 0 && (
                        <ul className="mb-2 space-y-1">
                          {current.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-sm text-slate-300 leading-snug"
                            >
                              <span className="text-indigo-400 mt-0.5 flex-shrink-0">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {current.question}
                    </p>
                    {current.hint && (
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                        {current.hint}
                      </p>
                    )}
                  </div>
                </div>

                {/* Option buttons */}
                {current.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-9">
                    {current.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className={[
                          "px-4 py-2 rounded-xl border text-sm transition-all active:scale-[0.97]",
                          current.isConfirm && i === 0
                            ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500"
                            : "bg-white/[0.06] border-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200 hover:text-white",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom input */}
                <div className="pl-9 space-y-1.5">
                  {current.options.length > 0 && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="inline-block w-3 h-px bg-slate-600" />
                      Hoặc tự nhập câu trả lời của bạn
                    </p>
                  )}
                  <form
                    onSubmit={handleCustomSubmit}
                    className="flex items-end gap-2"
                  >
                    <textarea
                      ref={customInputRef}
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      onKeyDown={handleCustomKeyDown}
                      placeholder={
                        current.options.length > 0
                          ? "Nhập câu trả lời của bạn..."
                          : "Nhập câu trả lời..."
                      }
                      rows={1}
                      maxLength={300}
                      className="flex-1 resize-none bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!custom.trim()}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
