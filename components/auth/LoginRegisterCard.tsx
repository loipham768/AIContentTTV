"use client";

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Logo from "@/components/Logo";
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Crown,
} from "lucide-react";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

type PlanOption = "free" | "designer" | "basic" | "pro";

const PLAN_OPTIONS: {
  id: PlanOption;
  label: string;
  price: string;
  desc: string;
}[] = [
  { id: "free", label: "Miễn phí", price: "0đ", desc: "4 lượt AI/tháng" },
  {
    id: "designer",
    label: "Designer",
    price: "59.000đ",
    desc: "Editor, không AI",
  },
  { id: "basic", label: "Basic", price: "99.000đ", desc: "25 lượt AI/tháng" },
  { id: "pro", label: "Pro", price: "199.000đ", desc: "AI không giới hạn" },
];

interface LoginRegisterCardProps {
  callbackUrl?: string;
  initialPlan?: string;
}

type Tab = "login" | "register";
type Step = "form" | "otp";

export function LoginRegisterCard({
  callbackUrl = "/editor",
  initialPlan = "",
}: LoginRegisterCardProps) {
  const isCreditsIntent = initialPlan.startsWith("credits:");
  const creditsPackId = isCreditsIntent ? initialPlan.split(":")[1] : "";
  const validInitial: PlanOption =
    initialPlan === "designer" ||
    initialPlan === "basic" ||
    initialPlan === "pro"
      ? initialPlan
      : "free";

  const [tab, setTab] = useState<Tab>(
    validInitial !== "free" || isCreditsIntent ? "register" : "login",
  );
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(validInitial);
  const otpRef = useRef<HTMLInputElement>(null);

  // Countdown for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(
      () => setResendCooldown((v) => Math.max(0, v - 1)),
      1000,
    );
    return () => clearInterval(t);
  }, [resendCooldown]);

  // Focus OTP input when step changes
  useEffect(() => {
    if (step === "otp") setTimeout(() => otpRef.current?.focus(), 80);
  }, [step]);

  function switchTab(t: Tab) {
    setTab(t);
    setStep("form");
    setError("");
    setFieldErrors({});
    setOtp("");
    if (t === "register") setSelectedPlan(validInitial);
  }

  function validateFields() {
    const errors: { email?: string; password?: string } = {};
    if (!emailSchema.safeParse(email).success)
      errors.email = "Email không hợp lệ";
    if (!passwordSchema.safeParse(password).success)
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleLogin() {
    if (!validateFields()) return;
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Email hoặc mật khẩu không đúng");
        setLoading(false);
      } else {
        window.location.href = callbackUrl;
      }
    } catch {
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    if (!validateFields()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gửi OTP thất bại");
        return;
      }
      setStep("otp");
      setResendCooldown(60);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      setError("Vui lòng nhập đủ 6 chữ số");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 410 || res.status === 429) {
          setStep("form");
          setOtp("");
        }
        setError(data.error || "Xác minh thất bại");
        setLoading(false);
        return;
      }
      // Account created — auto login
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Tài khoản đã tạo. Vui lòng đăng nhập.");
        setLoading(false);
      } else if (isCreditsIntent && creditsPackId) {
        window.location.href = `/upgrade?type=credits&pack=${creditsPackId}`;
      } else if (
        selectedPlan === "designer" ||
        selectedPlan === "basic" ||
        selectedPlan === "pro"
      ) {
        window.location.href = `/upgrade?plan=${selectedPlan}`;
      } else {
        window.location.href = callbackUrl;
      }
    } catch {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError("");
    setOtp("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Gửi lại thất bại");
      else setResendCooldown(60);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900
    bg-white placeholder:text-slate-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
    transition-colors hover:border-slate-300
  `.trim();

  const submitBtn = `
    w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold
    bg-gradient-to-r from-indigo-600 to-violet-600 text-white
    hover:from-indigo-500 hover:to-violet-500
    shadow-md shadow-indigo-500/20 active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    transition-all
  `.trim();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c4b5fd 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-violet-300/35 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-indigo-300/30 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute top-1/2 right-10 w-56 h-56 bg-sky-200/40 rounded-full blur-2xl animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <Logo iconSize={44} uid="login" />
          <p className="text-sm text-slate-500">
            Tạo khối nội dung HTML chuẩn từ mô tả tiếng Việt
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-violet-200/50 border border-white p-8 w-full">
          {/* ── OTP step ── */}
          {step === "otp" ? (
            <div className="space-y-5">
              <button
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setError("");
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors -mt-1 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
              </button>

              <div className="flex flex-col items-center gap-3 text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Nhập mã xác nhận
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Mã 6 chữ số đã được gửi đến{" "}
                    <span className="font-medium text-slate-700">{email}</span>
                  </p>
                </div>
              </div>

              <input
                ref={otpRef}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleVerifyOtp();
                }}
                placeholder="000000"
                className={`${inputClass} text-center text-2xl font-mono tracking-[0.5em] py-3`}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className={submitBtn}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Xác nhận
              </button>

              <p className="text-center text-xs text-slate-400">
                Không nhận được email?{" "}
                {resendCooldown > 0 ? (
                  <span className="text-slate-500">
                    Gửi lại sau {resendCooldown}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-indigo-600 font-medium hover:text-indigo-700 disabled:opacity-50"
                  >
                    Gửi lại
                  </button>
                )}
              </p>
            </div>
          ) : (
            /* ── Login / Register form step ── */
            <>
              {/* Tabs */}
              <div className="flex mb-6 border-b border-slate-100">
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                      tab === t
                        ? "border-indigo-600 text-indigo-700"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {t === "login" ? "Đăng nhập" : "Đăng ký"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {/* Plan selector (register tab only) */}
                {tab === "register" && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                      Chọn gói của bạn
                    </p>
                    <div className="grid grid-cols-2 gap-2 justify-items-center">
                      {PLAN_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedPlan(opt.id)}
                          className={`relative w-full flex flex-col justify-center items-center gap-0.5 rounded-xl border-2 py-3 px-2 text-center transition-all ${
                            selectedPlan === opt.id
                              ? opt.id === "free"
                                ? "border-slate-400 bg-slate-50"
                                : "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {opt.id !== "free" && (
                            <Crown
                              className={`w-3 h-3 mb-0.5 ${selectedPlan === opt.id ? "text-indigo-500" : "text-slate-400"}`}
                            />
                          )}
                          <span
                            className={`text-xs font-bold ${selectedPlan === opt.id && opt.id !== "free" ? "text-indigo-700" : "text-slate-800"}`}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={`text-[10px] font-semibold ${selectedPlan === opt.id && opt.id !== "free" ? "text-indigo-600" : "text-slate-500"}`}
                          >
                            {opt.price}
                          </span>
                          <span className="text-[9px] text-slate-400 leading-tight">
                            {opt.desc}
                          </span>
                          {selectedPlan === opt.id && (
                            <CheckCircle2
                              className={`absolute top-1.5 right-1.5 w-3 h-3 ${opt.id === "free" ? "text-slate-500" : "text-indigo-500"}`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    {(selectedPlan === "designer" ||
                      selectedPlan === "basic" ||
                      selectedPlan === "pro") && (
                      <p className="mt-2 text-[11px] text-indigo-600 bg-indigo-50 rounded-lg px-3 py-1.5 border border-indigo-100">
                        Sau đăng ký bạn sẽ được chuyển đến trang thanh toán để
                        kích hoạt gói{" "}
                        {selectedPlan === "designer"
                          ? "Designer"
                          : selectedPlan === "basic"
                            ? "Basic"
                            : "Pro"}
                        .
                      </p>
                    )}
                    {selectedPlan === "free" && (
                      <p className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 rounded-lg px-3 py-1.5 border border-emerald-100 leading-relaxed">
                        Muốn nạp credit dùng thêm sau? Không vấn đề — chúng tôi
                        fairplay: dùng bao nhiêu trả bấy nhiêu, không gói cước,
                        không ràng buộc.
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email)
                          setFieldErrors((p) => ({ ...p, email: undefined }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          tab === "login" ? handleLogin() : handleSendOtp();
                      }}
                      className={`${inputClass} pl-10 ${fieldErrors.email ? "border-red-300 focus:border-red-400 focus:ring-red-500/20" : ""}`}
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((p) => ({
                            ...p,
                            password: undefined,
                          }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          tab === "login" ? handleLogin() : handleSendOtp();
                      }}
                      className={`${inputClass} pl-10 pr-11 ${fieldErrors.password ? "border-red-300 focus:border-red-400 focus:ring-red-500/20" : ""}`}
                      placeholder="••••••••"
                      autoComplete={
                        tab === "login" ? "current-password" : "new-password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  onClick={tab === "login" ? handleLogin : handleSendOtp}
                  disabled={loading}
                  className={`${submitBtn} mt-1`}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading
                    ? "Đang xử lý..."
                    : tab === "login"
                      ? "Đăng nhập"
                      : "Tiếp theo →"}
                </button>

                {tab === "register" && (
                  <p className="text-center text-xs text-slate-400">
                    Chúng tôi sẽ gửi mã xác nhận đến email của bạn.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
