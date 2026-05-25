import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(to: string, otp: string) {
  const { error } = await resend.emails.send({
    from:
      process.env.EMAIL_FROM ?? "AI Content Booster <onboarding@resend.dev>",
    to,
    subject: `${otp} là mã xác nhận của bạn — AI Content Booster`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:16px;">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="display:inline-block;">
            <div style="display:inline-block;vertical-align:middle;width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#db2777);line-height:36px;text-align:center;">
              <span style="color:white;font-size:18px;font-weight:bold;">⚡</span>
            </div>
            <span style="display:inline-block;vertical-align:middle;font-weight:800;font-size:1rem;color:#1e293b;margin-left:10px;">AI Content Booster</span>
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
