import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "AITaoPage <onboarding@resend.dev>";
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://aitaopage.vn";
const SUPPORT_EMAIL = "support@aitaopage.vn";
const CURRENT_YEAR = new Date().getFullYear();

// Logo SVG encoded as base64 data URI for maximum email client compatibility
const LOGO_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDQnIGhlaWdodD0nNDQnIHZpZXdCb3g9JzAgMCA0MCA0MCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2UtYmcnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMDgwNjFhJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMTcwYzM4Jy8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9J2UtbGVnJyB4MT0nMCcgeTE9JzAnIHgyPScwJyB5Mj0nMSc+PHN0b3Agb2Zmc2V0PScwJScgc3RvcC1jb2xvcj0nI2ZmZmZmZicvPjxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0nI2E1YjRmYycvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSdlLWJhcicgeDE9JzExJyB5MT0nMjInIHgyPScyOScgeTI9JzIyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZSc+PHN0b3Agb2Zmc2V0PScwJScgc3RvcC1jb2xvcj0nIzIyZDNlZScvPjxzdG9wIG9mZnNldD0nNTAlJyBzdG9wLWNvbG9yPScjYTc4YmZhJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjZjBhYmZjJy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzQwJyBoZWlnaHQ9JzQwJyByeD0nMTAnIGZpbGw9J3VybCgjZS1iZyknLz48ZWxsaXBzZSBjeD0nMjAnIGN5PScyMicgcng9JzE0JyByeT0nMTEnIGZpbGw9JyM3YzNhZWQnIGZpbGwtb3BhY2l0eT0nMC4xNCcvPjxyZWN0IHg9JzAuNScgeT0nMC41JyB3aWR0aD0nMzknIGhlaWdodD0nMzknIHJ4PSc5LjUnIHN0cm9rZT0nd2hpdGUnIHN0cm9rZS1vcGFjaXR5PScwLjA4JyBzdHJva2Utd2lkdGg9JzEnLz48bGluZSB4MT0nMjAnIHkxPSc2JyB4Mj0nNycgeTI9JzM1JyBzdHJva2U9J3VybCgjZS1sZWcpJyBzdHJva2Utd2lkdGg9JzMuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJy8+PGxpbmUgeDE9JzIwJyB5MT0nNicgeDI9JzMzJyB5Mj0nMzUnIHN0cm9rZT0ndXJsKCNlLWxlZyknIHN0cm9rZS13aWR0aD0nMy41JyBzdHJva2UtbGluZWNhcD0ncm91bmQnLz48bGluZSB4MT0nMTEnIHkxPScyMicgeDI9JzI5JyB5Mj0nMjInIHN0cm9rZT0ndXJsKCNlLWJhciknIHN0cm9rZS13aWR0aD0nMTEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgb3BhY2l0eT0nMC4wNycvPjxsaW5lIHgxPScxMScgeTE9JzIyJyB4Mj0nMjknIHkyPScyMicgc3Ryb2tlPSd1cmwoI2UtYmFyKScgc3Ryb2tlLXdpZHRoPSc2LjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgb3BhY2l0eT0nMC4xNicvPjxsaW5lIHgxPScxMScgeTE9JzIyJyB4Mj0nMjknIHkyPScyMicgc3Ryb2tlPSd1cmwoI2UtYmFyKScgc3Ryb2tlLXdpZHRoPSczLjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPjxjaXJjbGUgY3g9JzIwJyBjeT0nNS44JyByPScyJyBmaWxsPSd3aGl0ZScgZmlsbC1vcGFjaXR5PScwLjU1Jy8+PC9zdmc+";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function formatDate(d = new Date()) {
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PLAN_LABEL: Record<string, string> = { basic: "Basic", pro: "Pro" };
const BILLING_LABEL: Record<string, string> = {
  monthly: "Tháng",
  yearly: "Năm",
};

const PLAN_FEATURES: Record<string, string[]> = {
  basic: [
    "Tạo nội dung AI không giới hạn mỗi ngày",
    "Kéo & thả trực quan với GrapesJS Editor",
    "Xuất HTML/CSS chuẩn sạch",
    "Thư viện 50+ block thiết kế sẵn",
    "Hỗ trợ qua email trong giờ hành chính",
  ],
  pro: [
    "Tất cả tính năng của gói Basic",
    "Ưu tiên xử lý AI nhanh hơn 3×",
    "Lưu trữ không giới hạn trên cloud",
    "Xuất code tối ưu cho SEO",
    "Tích hợp đa nền tảng (WordPress, Shopify...)",
    "Hỗ trợ ưu tiên 24/7 qua chat trực tiếp",
    "Truy cập sớm các tính năng mới",
  ],
};

/* ── Shared layout wrapper ───────────────────────────────────────────── */
function emailWrapper(content: string, previewText = "") {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>AITaoPage</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#eef2f7;">${previewText}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ""}

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:48px 16px 32px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%);border-radius:20px 20px 0 0;padding:32px 48px 28px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;padding-right:14px;">
                          <img src="${LOGO_BASE64}" width="44" height="44" alt="A" style="display:block;border:0;border-radius:10px;" />
                        </td>
                        <td style="vertical-align:middle;">
                          <span style="font-size:20px;font-weight:900;letter-spacing:-0.5px;">
                            <span style="color:#7dd3fc;">AI</span><span style="color:#f1f5f9;">Tao</span><span style="color:#94a3b8;font-weight:600;">Page</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <span style="font-size:11px;color:#94a3b8;font-weight:500;letter-spacing:0.5px;">NỀN TẢNG TẠO NỘI DUNG AI</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ BODY ═══ -->
          <tr>
            <td style="background:#ffffff;padding:44px 48px;border-left:1px solid #dde3ed;border-right:1px solid #dde3ed;">
              ${content}
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background:#f8fafc;border:1px solid #dde3ed;border-top:none;border-radius:0 0 20px 20px;padding:28px 48px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-bottom:1px solid #e2e8f0;padding-bottom:20px;margin-bottom:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td>
                          <a href="${BASE_URL}" style="text-decoration:none;font-size:13px;font-weight:700;color:#4f46e5;">AITaoPage</a>
                          <span style="font-size:12px;color:#94a3b8;"> &mdash; Tạo nội dung chuyên nghiệp bằng AI</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td>
                          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.7;">
                            Bạn nhận email này vì đã đăng ký tài khoản tại
                            <a href="${BASE_URL}" style="color:#6366f1;text-decoration:none;">${BASE_URL.replace("https://","")}</a>.
                            Email được gửi tự động, vui lòng không trả lời trực tiếp.
                          </p>
                          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.7;">
                            Cần hỗ trợ? Liên hệ đội ngũ của chúng tôi qua
                            <a href="mailto:${SUPPORT_EMAIL}" style="color:#6366f1;text-decoration:none;">${SUPPORT_EMAIL}</a>
                            &mdash; Thời gian phản hồi: trong vòng 24 giờ làm việc.
                          </p>
                          <p style="margin:0;font-size:11px;color:#cbd5e1;">
                            © ${CURRENT_YEAR} AITaoPage. Tất cả quyền được bảo lưu.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- spacing -->
          <tr><td style="height:24px;"></td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Shared components ───────────────────────────────────────────────── */
function sectionTitle(text: string) {
  return `<p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.2px;">${text}</p>`;
}

function divider(my = "32px") {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:${my} 0 0;">
    <tr><td style="border-top:1px solid #f1f5f9;height:1px;"></td></tr>
  </table><div style="height:${my};"></div>`;
}

function ctaButton(text: string, href: string, color = "#4f46e5") {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="border-radius:12px;background:${color};mso-padding-alt:0;">
        <a href="${href}" target="_blank" style="display:inline-block;padding:15px 36px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:12px;letter-spacing:-0.2px;line-height:1;">${text}</a>
      </td>
    </tr>
  </table>`;
}

function infoTable(rows: [string, string, boolean?][]) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    ${rows.map(([label, value, mono]) => `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;width:38%;vertical-align:top;">
        <span style="font-size:13px;color:#94a3b8;font-weight:500;">${label}</span>
      </td>
      <td style="padding:11px 0 11px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
        <span style="font-size:14px;color:#1e293b;font-weight:600;${mono ? "font-family:'Courier New',Courier,monospace;" : ""}">${value}</span>
      </td>
    </tr>`).join("")}
  </table>`;
}

function featureList(features: string[], color = "#4338ca", bgColor = "#eef2ff") {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${bgColor};border-radius:12px;">
    <tr>
      <td style="padding:20px 24px;">
        ${features.map((f) => `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:10px;">
          <tr>
            <td style="width:22px;vertical-align:top;padding-top:1px;">
              <span style="font-size:14px;color:${color};">✓</span>
            </td>
            <td style="vertical-align:top;">
              <span style="font-size:13px;color:${color};line-height:1.5;">${f}</span>
            </td>
          </tr>
        </table>`).join("")}
      </td>
    </tr>
  </table>`;
}

function alertBox(text: string, type: "warning" | "info" | "danger" = "info") {
  const styles = {
    warning: { bg: "#fffbeb", border: "#f59e0b", color: "#92400e" },
    info:    { bg: "#eff6ff", border: "#3b82f6", color: "#1e40af" },
    danger:  { bg: "#fef2f2", border: "#ef4444", color: "#991b1b" },
  };
  const s = styles[type];
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${s.bg};border-radius:10px;border-left:4px solid ${s.border};">
    <tr>
      <td style="padding:14px 18px;">
        <p style="margin:0;font-size:13px;color:${s.color};line-height:1.6;">${text}</p>
      </td>
    </tr>
  </table>`;
}

/* ── OTP ─────────────────────────────────────────────────────────────── */
export async function sendOtpEmail(to: string, otp: string) {
  const content = `
    <h1 style="margin:0 0 6px;font-size:26px;font-weight:900;color:#0f172a;letter-spacing:-0.8px;">Xác nhận tài khoản của bạn</h1>
    <p style="margin:0 0 32px;font-size:15px;color:#64748b;line-height:1.7;">
      Chào mừng bạn đến với <strong style="color:#4f46e5;">AITaoPage</strong>! Chúng tôi rất vui khi có bạn đồng hành.
      Để hoàn tất quá trình đăng ký và bảo mật tài khoản, vui lòng nhập mã xác nhận dưới đây vào trang đăng ký.
    </p>

    ${sectionTitle("Mã xác nhận OTP của bạn")}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:10px;">
      <tr>
        <td style="background:linear-gradient(135deg,#eef2ff 0%,#f5f3ff 100%);border:2px solid #c7d2fe;border-radius:16px;padding:32px 24px;text-align:center;">
          <span style="font-size:52px;font-weight:900;letter-spacing:0.5em;color:#4338ca;font-family:'Courier New',Courier,monospace;display:block;padding-left:0.5em;">${otp}</span>
          <p style="margin:12px 0 0;font-size:12px;color:#818cf8;font-weight:500;">Nhập chính xác 6 chữ số này để xác nhận</p>
        </td>
      </tr>
    </table>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:32px;">
      ${alertBox("⏱&nbsp; <strong>Quan trọng:</strong> Mã OTP này chỉ có hiệu lực trong <strong>10 phút</strong> kể từ thời điểm nhận email. Sau khi hết hạn, bạn cần yêu cầu gửi lại mã mới.", "warning")}
    </table>

    ${sectionTitle("Hướng dẫn sử dụng mã")}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:32px;">
      <tr>
        <td style="background:#f8fafc;border-radius:12px;padding:24px;">
          ${[
            ["Quay lại trang đăng ký trên trình duyệt của bạn"],
            ["Tìm ô nhập \"Mã xác nhận\" hoặc \"OTP\""],
            [`Nhập đúng 6 chữ số: <strong style="font-family:monospace;color:#4338ca;font-size:15px;">${otp}</strong>`],
            ["Nhấn nút \"Xác nhận\" để hoàn tất"],
          ].map(([step], i) => `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:${i < 3 ? "14px" : "0"};">
            <tr>
              <td style="width:32px;vertical-align:top;">
                <span style="display:inline-block;width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:white;">${i + 1}</span>
              </td>
              <td style="vertical-align:top;padding-left:12px;padding-top:3px;">
                <span style="font-size:14px;color:#374151;line-height:1.5;">${step}</span>
              </td>
            </tr>
          </table>`).join("")}
        </td>
      </tr>
    </table>

    ${divider("24px")}

    ${sectionTitle("Bảo mật tài khoản")}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px;">
      <tr>
        <td style="background:#fef2f2;border-radius:12px;border-left:4px solid #ef4444;padding:20px 24px;">
          <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#991b1b;">🔒 Lưu ý bảo mật quan trọng</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${[
              "AITaoPage <strong>không bao giờ</strong> yêu cầu bạn cung cấp mã OTP qua điện thoại, chat, hay bất kỳ kênh nào khác",
              "Không chia sẻ mã này với bất kỳ ai kể cả nhân viên hỗ trợ",
              "Nếu bạn không yêu cầu đăng ký, hãy bỏ qua email này &mdash; tài khoản sẽ không được tạo",
            ].map((item) => `
            <tr>
              <td style="padding:4px 0;vertical-align:top;width:20px;"><span style="font-size:13px;color:#ef4444;">•</span></td>
              <td style="padding:4px 0 4px 8px;vertical-align:top;"><span style="font-size:13px;color:#7f1d1d;line-height:1.5;">${item}</span></td>
            </tr>`).join("")}
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
      Gặp khó khăn khi đăng ký? Liên hệ ngay đội hỗ trợ của chúng tôi qua
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#6366f1;text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>
      — chúng tôi luôn sẵn sàng giúp bạn!
    </p>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `${otp} là mã xác nhận AITaoPage của bạn (hết hạn sau 10 phút)`,
    html: emailWrapper(content, `Mã xác nhận của bạn là ${otp}. Nhập ngay trong 10 phút trước khi hết hạn.`),
  });

  if (error) {
    console.error("[Resend] sendOtpEmail failed:", error);
    throw new Error(error.message);
  }
}

/* ── Admin: new order notification ──────────────────────────────────── */
export async function sendNewOrderAdminEmail(order: {
  orderId: string;
  userEmail: string;
  type: string;
  plan?: string | null;
  billing?: string;
  amount: number;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const planDisplay =
    order.type === "subscription"
      ? `Gói ${PLAN_LABEL[order.plan ?? ""] ?? order.plan} / ${BILLING_LABEL[order.billing ?? ""] ?? order.billing}`
      : "Nạp Credits";

  const subject =
    order.type === "subscription"
      ? `[Đơn mới] Gói ${PLAN_LABEL[order.plan ?? ""] ?? order.plan} — ${formatVnd(order.amount)}`
      : `[Đơn mới] Nạp Credits — ${formatVnd(order.amount)}`;

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;">
      ${alertBox(`🔔&nbsp; <strong>Hành động cần thiết:</strong> Có một đơn hàng mới đang chờ bạn xem xét và xác nhận. Vui lòng kiểm tra thông tin chuyển khoản và kích hoạt đơn hàng cho khách hàng.`, "warning")}
    </table>

    <h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Đơn hàng mới cần xác nhận</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#64748b;">Nhận lúc ${formatDate()} &middot; Cần xử lý trong 24 giờ</p>

    ${sectionTitle("Thông tin đơn hàng")}
    <div style="margin-bottom:28px;">
      ${infoTable([
        ["Mã đơn hàng", order.orderId, true],
        ["Email khách hàng", order.userEmail],
        ["Loại đơn", planDisplay],
        ["Số tiền", `<span style="color:#059669;font-size:15px;font-weight:800;">${formatVnd(order.amount)}</span>`],
        ["Trạng thái", '<span style="background:#fef3c7;color:#92400e;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;">⏳ Chờ xác nhận</span>'],
        ["Thời gian tạo", formatDate()],
      ])}
    </div>

    ${sectionTitle("Quy trình xác nhận")}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
      <tr>
        <td style="padding:24px;">
          ${[
            ["Kiểm tra ảnh chụp màn hình chuyển khoản trong trang Admin", "#4f46e5"],
            ["Xác minh số tiền và nội dung chuyển khoản khớp với đơn hàng", "#4f46e5"],
            ["Nhấn \"Kích hoạt\" để cấp quyền truy cập cho khách hàng", "#4f46e5"],
            ["Hệ thống sẽ tự động gửi email thông báo đến khách hàng", "#94a3b8"],
          ].map(([step, color], i) => `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:${i < 3 ? "14px" : "0"};">
            <tr>
              <td style="width:32px;vertical-align:top;">
                <span style="display:inline-block;width:24px;height:24px;background:${color};border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:white;">${i + 1}</span>
              </td>
              <td style="vertical-align:top;padding-left:12px;padding-top:3px;">
                <span style="font-size:14px;color:#374151;line-height:1.5;">${step}</span>
              </td>
            </tr>
          </table>`).join("")}
        </td>
      </tr>
    </table>

    ${ctaButton("Vào trang Admin để xử lý →", `${BASE_URL}/admin`, "#4f46e5")}

    ${divider("28px")}

    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
      Email này được gửi tự động khi có đơn hàng mới. Nếu bạn cần hỗ trợ kỹ thuật, liên hệ nhóm phát triển.
    </p>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to: adminEmail,
    subject,
    html: emailWrapper(content, `Đơn mới: ${planDisplay} — ${formatVnd(order.amount)} — cần xác nhận ngay`),
  });

  if (error) console.error("[Resend] sendNewOrderAdminEmail failed:", error);
}

/* ── User: order activated ───────────────────────────────────────────── */
export async function sendOrderActivatedEmail(
  to: string,
  order: {
    orderId: string;
    type: string;
    plan?: string | null;
    billing?: string;
    amount: number;
  },
) {
  const isSubscription = order.type === "subscription";
  const planKey = order.plan ?? "basic";
  const planName = isSubscription
    ? `Gói ${PLAN_LABEL[planKey] ?? planKey} (${BILLING_LABEL[order.billing ?? ""] ?? order.billing})`
    : "Credits";
  const features = PLAN_FEATURES[planKey] ?? PLAN_FEATURES.basic;

  const content = `
    <!-- Hero -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:36px;">
      <tr>
        <td style="text-align:center;padding:8px 0;">
          <div style="display:inline-block;width:80px;height:80px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:50%;text-align:center;line-height:80px;font-size:40px;margin-bottom:20px;">✅</div>
          <h1 style="margin:0 0 10px;font-size:28px;font-weight:900;color:#0f172a;letter-spacing:-0.8px;">Thanh toán thành công!</h1>
          <p style="margin:0;font-size:16px;color:#64748b;line-height:1.6;">
            Chúc mừng! <strong style="color:#059669;">${planName}</strong> đã được kích hoạt trên tài khoản của bạn.
            Bạn có thể bắt đầu sử dụng ngay bây giờ.
          </p>
        </td>
      </tr>
    </table>

    <!-- Order details -->
    ${sectionTitle("Chi tiết đơn hàng")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 28px;">
          ${infoTable([
            ["Mã đơn hàng", order.orderId, true],
            ["Dịch vụ", planName],
            ["Số tiền thanh toán", formatVnd(order.amount)],
            ["Ngày kích hoạt", formatDate()],
            ["Trạng thái", '<span style="background:#d1fae5;color:#065f46;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;">✓ Đã kích hoạt</span>'],
            isSubscription
              ? ["Gia hạn tiếp theo", `Tự động gia hạn theo ${BILLING_LABEL[order.billing ?? ""] ?? order.billing}`]
              : ["Loại", "Credits (không hết hạn)"],
          ])}
        </td>
      </tr>
    </table>

    ${isSubscription ? `
    <!-- Features -->
    ${sectionTitle(`Quyền lợi gói ${PLAN_LABEL[planKey] ?? planKey} của bạn`)}
    <div style="margin-bottom:32px;">
      ${featureList(features)}
    </div>
    ` : `
    <!-- Credits info -->
    ${sectionTitle("Thông tin Credits")}
    <div style="margin-bottom:32px;">
      ${alertBox("💡&nbsp; Credits được cộng trực tiếp vào tài khoản và <strong>không có thời hạn sử dụng</strong>. Bạn có thể kiểm tra số dư credits trong trang hồ sơ của mình.", "info")}
    </div>
    `}

    <!-- Getting started -->
    ${sectionTitle("Bắt đầu trong 3 bước đơn giản")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 28px;">
          ${[
            ["Mở Editor", `Vào <a href="${BASE_URL}/editor" style="color:#4f46e5;text-decoration:none;font-weight:600;">trang Editor</a> và chọn loại nội dung bạn muốn tạo`],
            ["Nhập yêu cầu AI", "Mô tả nội dung cần tạo, chọn giọng văn và phong cách phù hợp"],
            ["Xuất & sử dụng", "Chỉnh sửa với giao diện kéo thả rồi xuất HTML/CSS về máy"],
          ].map(([title, desc], i) => `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:${i < 2 ? "18px" : "0"};">
            <tr>
              <td style="width:42px;vertical-align:top;">
                <span style="display:inline-block;width:32px;height:32px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:900;color:white;">${i + 1}</span>
              </td>
              <td style="vertical-align:top;padding-left:14px;padding-top:5px;">
                <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;">${title}</p>
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">${desc}</p>
              </td>
            </tr>
          </table>`).join("")}
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:32px;">
      <tr>
        <td style="padding-bottom:12px;">
          ${ctaButton("Bắt đầu tạo nội dung ngay →", `${BASE_URL}/editor`)}
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding-right:20px;">
                <a href="${BASE_URL}/profile" style="font-size:13px;color:#6366f1;text-decoration:none;font-weight:600;">Xem hồ sơ &amp; credits →</a>
              </td>
              <td>
                <a href="mailto:${SUPPORT_EMAIL}" style="font-size:13px;color:#6366f1;text-decoration:none;font-weight:600;">Liên hệ hỗ trợ →</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${divider("24px")}

    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
      Cảm ơn bạn đã tin tưởng sử dụng <strong style="color:#6366f1;">AITaoPage</strong>.
      Nếu có bất kỳ thắc mắc nào về đơn hàng hoặc dịch vụ, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng tại
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#6366f1;text-decoration:none;">${SUPPORT_EMAIL}</a>.
    </p>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `✅ ${planName} đã kích hoạt thành công — Bắt đầu ngay với AITaoPage!`,
    html: emailWrapper(
      content,
      `${planName} của bạn đã được kích hoạt! Đăng nhập và bắt đầu tạo nội dung chuyên nghiệp ngay hôm nay.`,
    ),
  });

  if (error) console.error("[Resend] sendOrderActivatedEmail failed:", error);
}

/* ── User: order cancelled/rejected ─────────────────────────────────── */
export async function sendOrderCancelledEmail(
  to: string,
  order: {
    orderId: string;
    type: string;
    plan?: string | null;
    billing?: string;
    amount: number;
  },
  reason?: string,
) {
  const isSubscription = order.type === "subscription";
  const planName = isSubscription
    ? `Gói ${PLAN_LABEL[order.plan ?? ""] ?? order.plan}`
    : "Credits";

  const content = `
    <!-- Hero -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:36px;">
      <tr>
        <td style="text-align:center;padding:8px 0;">
          <div style="display:inline-block;width:80px;height:80px;background:linear-gradient(135deg,#fee2e2,#fecaca);border-radius:50%;text-align:center;line-height:80px;font-size:40px;margin-bottom:20px;">❌</div>
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0f172a;letter-spacing:-0.8px;">Đơn hàng đã bị huỷ</h1>
          <p style="margin:0;font-size:15px;color:#64748b;line-height:1.6;">
            Rất tiếc, chúng tôi không thể xử lý đơn hàng <strong style="font-family:monospace;color:#4338ca;">#${order.orderId}</strong> của bạn.
            Vui lòng đọc kỹ thông tin bên dưới.
          </p>
        </td>
      </tr>
    </table>

    <!-- Order details -->
    ${sectionTitle("Thông tin đơn hàng bị huỷ")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;margin-bottom:28px;">
      <tr>
        <td style="padding:24px 28px;">
          ${infoTable([
            ["Mã đơn hàng", order.orderId, true],
            ["Dịch vụ đăng ký", planName],
            ["Số tiền", formatVnd(order.amount)],
            ["Thời gian huỷ", formatDate()],
            ["Trạng thái", '<span style="background:#fee2e2;color:#991b1b;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;">✕ Đã huỷ</span>'],
          ])}
        </td>
      </tr>
    </table>

    ${reason ? `
    ${sectionTitle("Lý do huỷ đơn")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;">
      <tr>
        <td style="background:#fffbeb;border-radius:12px;border-left:4px solid #f59e0b;padding:20px 24px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;">Lý do từ đội ngũ AITaoPage</p>
          <p style="margin:0;font-size:14px;color:#78350f;line-height:1.7;">${reason}</p>
        </td>
      </tr>
    </table>
    ` : `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;">
      ${alertBox("Nếu bạn không rõ lý do tại sao đơn hàng bị huỷ, vui lòng liên hệ đội hỗ trợ của chúng tôi để được giải thích chi tiết.", "info")}
    </table>
    `}

    <!-- Refund info -->
    ${sectionTitle("Chính sách hoàn tiền")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f0fdf4;border-radius:12px;border-left:4px solid #10b981;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#065f46;">💚 Cam kết hoàn tiền của chúng tôi</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${[
              "Nếu bạn đã chuyển khoản, chúng tôi sẽ hoàn tiền đầy đủ trong vòng <strong>3–5 ngày làm việc</strong>",
              "Tiền sẽ được hoàn về đúng tài khoản ngân hàng bạn đã chuyển",
              "Bạn sẽ nhận được email xác nhận khi giao dịch hoàn tiền được xử lý",
              "Liên hệ ngay nếu sau 5 ngày bạn chưa nhận được tiền hoàn",
            ].map((item) => `
            <tr>
              <td style="padding:4px 0;vertical-align:top;width:20px;"><span style="font-size:13px;color:#10b981;">✓</span></td>
              <td style="padding:4px 0 4px 10px;vertical-align:top;"><span style="font-size:13px;color:#065f46;line-height:1.6;">${item}</span></td>
            </tr>`).join("")}
          </table>
        </td>
      </tr>
    </table>

    <!-- Next steps -->
    ${sectionTitle("Bước tiếp theo")}
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f8fafc;border-radius:14px;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 28px;">
          ${[
            ["Xem lại lý do huỷ", "Đọc kỹ thông tin phía trên để hiểu nguyên nhân đơn bị từ chối"],
            ["Kiểm tra thông tin thanh toán", "Đảm bảo thông tin chuyển khoản (số tài khoản, nội dung) chính xác khi tạo đơn mới"],
            ["Tạo đơn hàng mới", `Quay lại <a href="${BASE_URL}/#pricing" style="color:#4f46e5;text-decoration:none;font-weight:600;">trang bảng giá</a> và thực hiện thanh toán lại`],
            ["Liên hệ hỗ trợ nếu cần", `Đội ngũ chúng tôi sẵn sàng hỗ trợ bạn qua <a href="mailto:${SUPPORT_EMAIL}" style="color:#4f46e5;text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>`],
          ].map(([title, desc], i) => `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:${i < 3 ? "18px" : "0"};">
            <tr>
              <td style="width:42px;vertical-align:top;">
                <span style="display:inline-block;width:32px;height:32px;background:#e2e8f0;border-radius:50%;text-align:center;line-height:32px;font-size:14px;font-weight:900;color:#475569;">${i + 1}</span>
              </td>
              <td style="vertical-align:top;padding-left:14px;padding-top:5px;">
                <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;">${title}</p>
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">${desc}</p>
              </td>
            </tr>
          </table>`).join("")}
        </td>
      </tr>
    </table>

    <!-- CTA buttons -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:32px;">
      <tr>
        <td style="padding-bottom:14px;">
          ${ctaButton("Xem lại bảng giá & đặt lại →", `${BASE_URL}/#pricing`)}
        </td>
      </tr>
      <tr>
        <td>
          <a href="mailto:${SUPPORT_EMAIL}" style="font-size:13px;color:#6366f1;text-decoration:none;font-weight:600;">Liên hệ hỗ trợ để được giải đáp →</a>
        </td>
      </tr>
    </table>

    ${divider("24px")}

    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
      Chúng tôi xin lỗi vì sự bất tiện này và mong được tiếp tục phục vụ bạn.
      Nếu cho rằng đây là nhầm lẫn, hãy liên hệ ngay
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#6366f1;text-decoration:none;">${SUPPORT_EMAIL}</a>
      &mdash; chúng tôi sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>.
    </p>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `Đơn hàng #${order.orderId} đã bị huỷ — AITaoPage`,
    html: emailWrapper(
      content,
      `Đơn hàng ${planName} (${formatVnd(order.amount)}) đã bị huỷ. Xem chi tiết và hướng xử lý trong email này.`,
    ),
  });

  if (error) console.error("[Resend] sendOrderCancelledEmail failed:", error);
}
