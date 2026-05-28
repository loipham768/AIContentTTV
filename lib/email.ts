import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "AITaoPage <onboarding@resend.dev>";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const PLAN_LABEL: Record<string, string> = { basic: "Basic", pro: "Pro" };
const BILLING_LABEL: Record<string, string> = { monthly: "Tháng", yearly: "Năm" };

/* ── OTP ─────────────────────────────────────────────────────────────── */
export async function sendOtpEmail(to: string, otp: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `${otp} là mã xác nhận của bạn — AITaoPage`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:16px;">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="display:inline-block;">
            <div style="display:inline-block;vertical-align:middle;width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#db2777);line-height:36px;text-align:center;">
              <span style="color:white;font-size:18px;font-weight:bold;">⚡</span>
            </div>
            <span style="display:inline-block;vertical-align:middle;font-weight:800;font-size:1rem;color:#1e293b;margin-left:10px;">AITaoPage</span>
          </div>
        </div>

        <div style="background:white;border-radius:12px;padding:28px;border:1px solid #e2e8f0;">
          <h2 style="margin:0 0 8px;font-size:1.1rem;color:#0f172a;">Xác nhận đăng ký</h2>
          <p style="margin:0 0 24px;color:#64748b;font-size:0.9rem;line-height:1.6;">
            Nhập mã OTP bên dưới để hoàn tất đăng ký tài khoản. Mã có hiệu lực trong <strong>10 phút</strong>.
          </p>

          <div style="background:#f1f5f9;border-radius:10px;padding:20px;text-align:center;margin-bottom:24px;">
            <span style="font-size:2.4rem;font-weight:800;letter-spacing:0.35em;color:#4f46e5;font-family:monospace;">
              ${otp}
            </span>
          </div>

          <p style="margin:0;color:#94a3b8;font-size:0.8rem;">
            Nếu bạn không yêu cầu đăng ký, hãy bỏ qua email này.
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Resend] send failed:", error);
    throw new Error(error.message);
  }
}

/* ── Admin: new order notification ──────────────────────────────────── */
export async function sendNewOrderAdminEmail(order: {
  orderId: string; userEmail: string; type: string
  plan?: string | null; billing?: string; amount: number
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return
  const subject =
    order.type === "subscription"
      ? `[Đơn mới] ${PLAN_LABEL[order.plan ?? ""] ?? order.plan} — ${formatVnd(order.amount)}`
      : `[Đơn mới] Nạp credits — ${formatVnd(order.amount)}`
  const { error } = await resend.emails.send({
    from: FROM,
    to: adminEmail,
    subject,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#0f172a;">Đơn hàng mới cần xác nhận</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#64748b;">Mã đơn</td><td style="font-family:monospace;font-weight:700;color:#4f46e5;">${order.orderId}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Người dùng</td><td>${order.userEmail}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Gói</td><td>${order.type === "subscription" ? `${PLAN_LABEL[order.plan ?? ""] ?? order.plan} — ${BILLING_LABEL[order.billing ?? ""] ?? order.billing}` : "Credits"}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Số tiền</td><td style="font-weight:700;">${formatVnd(order.amount)}</td></tr>
        </table>
        <a href="${process.env.NEXTAUTH_URL ?? ""}/admin" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#4f46e5;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Vào trang Admin →</a>
      </div>
    `,
  })
  if (error) console.error("[Resend] sendNewOrderAdminEmail failed:", error)
}

/* ── User: order activated ───────────────────────────────────────────── */
export async function sendOrderActivatedEmail(to: string, order: {
  orderId: string; type: string; plan?: string | null; billing?: string; amount: number
}) {
  const planName = order.type === "subscription"
    ? `Gói ${PLAN_LABEL[order.plan ?? ""] ?? order.plan} (${BILLING_LABEL[order.billing ?? ""] ?? order.billing})`
    : "Credits"
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `✅ ${planName} đã được kích hoạt — AITaoPage`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:#10b981;line-height:56px;text-align:center;font-size:28px;">✅</div>
        </div>
        <h2 style="text-align:center;margin:0 0 8px;color:#0f172a;">${planName} đã được kích hoạt!</h2>
        <p style="text-align:center;color:#64748b;margin:0 0 24px;">Mã đơn: <strong style="font-family:monospace;color:#4f46e5;">${order.orderId}</strong></p>
        <div style="text-align:center;">
          <a href="${process.env.NEXTAUTH_URL ?? ""}/editor" style="display:inline-block;padding:12px 28px;background:#4f46e5;color:white;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">Bắt đầu tạo nội dung →</a>
        </div>
      </div>
    `,
  })
  if (error) console.error("[Resend] sendOrderActivatedEmail failed:", error)
}

/* ── User: order cancelled/rejected ─────────────────────────────────── */
export async function sendOrderCancelledEmail(to: string, order: {
  orderId: string; type: string; plan?: string | null; billing?: string; amount: number
}, reason?: string) {
  const planName = order.type === "subscription"
    ? `Gói ${PLAN_LABEL[order.plan ?? ""] ?? order.plan}`
    : "Credits"
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `Đơn hàng ${order.orderId} đã bị huỷ — AITaoPage`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:16px;">
        <h2 style="margin:0 0 8px;color:#0f172a;">Đơn hàng đã bị huỷ</h2>
        <p style="color:#64748b;margin:0 0 16px;">Mã đơn: <strong style="font-family:monospace;color:#4f46e5;">${order.orderId}</strong> (${planName} — ${formatVnd(order.amount)})</p>
        ${reason ? `<div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin-bottom:16px;"><p style="margin:0;font-size:14px;color:#92400e;"><strong>Lý do:</strong> ${reason}</p></div>` : ""}
        <p style="color:#64748b;font-size:14px;">Nếu bạn vẫn muốn nâng cấp, hãy tạo đơn hàng mới. Nếu cần hỗ trợ, liên hệ <a href="mailto:support@aicontentbooster.vn">support@aicontentbooster.vn</a>.</p>
        <a href="${process.env.NEXTAUTH_URL ?? ""}/#pricing" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#4f46e5;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Xem lại bảng giá</a>
      </div>
    `,
  })
  if (error) console.error("[Resend] sendOrderCancelledEmail failed:", error)
}
