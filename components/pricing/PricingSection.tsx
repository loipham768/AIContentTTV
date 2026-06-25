"use client";
import { useState } from "react";
import Link from "next/link";
import { Crown, Star, CheckCircle2, Minus, Plus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  PLAN_PRICES,
  CREDIT_PRICE_PER_UNIT,
  CREDIT_MIN_QTY,
  CREDIT_MAX_QTY,
} from "@/lib/planConfig";

interface Props {
  isLoggedIn: boolean;
}

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function PricingSection({ isLoggedIn }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [creditQty, setCreditQty] = useState(5);

  const isYearly = billing === "yearly";

  const basic = {
    monthly: PLAN_PRICES.basic.monthly,
    yearlyTotal: PLAN_PRICES.basic.yearly,
    perMonth: Math.round(PLAN_PRICES.basic.yearly / 12),
    saved: PLAN_PRICES.basic.monthly * 12 - PLAN_PRICES.basic.yearly,
  };
  const pro = {
    monthly: PLAN_PRICES.pro.monthly,
    yearlyTotal: PLAN_PRICES.pro.yearly,
    perMonth: Math.round(PLAN_PRICES.pro.yearly / 12),
    saved: PLAN_PRICES.pro.monthly * 12 - PLAN_PRICES.pro.yearly,
  };

  const creditTotal = creditQty * CREDIT_PRICE_PER_UNIT;

  const changeQty = (val: number) => {
    setCreditQty(Math.max(CREDIT_MIN_QTY, Math.min(CREDIT_MAX_QTY, val)));
  };

  return (
    <section
      id="pricing"
      className="py-24"
      style={{
        background:
          "linear-gradient(160deg, #f5f3ff 0%, #fafaff 50%, #ede9fe 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Bảng giá
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Tạo bài viết, Portfolio, CV, Landing page, Quảng cáo chuyên nghiệp —
            bắt đầu miễn phí, nâng cấp khi cần
          </p>
        </ScrollReveal>

        {/* Info banner */}
        <ScrollReveal className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-xl px-4 py-2 text-sm text-gray-600 shadow-sm">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-indigo-700">
              Mua theo năm tiết kiệm ~20%
            </span>
            <span className="text-xs text-gray-400">
              · Thanh toán chuyển khoản ngân hàng
            </span>
          </div>
        </ScrollReveal>

        {/* Billing toggle */}
        <ScrollReveal className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                !isYearly
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Hàng tháng
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Hàng năm
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                  isYearly
                    ? "bg-white/20 text-white"
                    : "text-emerald-600 bg-emerald-100"
                }`}
              >
                -20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* Plans — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2 mb-20">
          {/* Free */}
          <ScrollReveal from="left" className="h-full">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 card-lift h-full flex flex-col">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Miễn phí
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  0đ
                </span>
                <span className="text-gray-400 mb-1 text-sm">/tháng</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500">
                Không cần thẻ ngân hàng
              </p>
              <Link
                href={isLoggedIn ? "/create" : "/login?plan=free"}
                className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                {isLoggedIn ? "Tạo nội dung ngay" : "Bắt đầu miễn phí"}
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  "Editor kéo thả đầy đủ tính năng",
                  "Toàn bộ template mẫu",
                  "Sao chép & xuất HTML, PDF",
                  "Xuất bản link công khai",
                ].map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>{text}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm mt-1 pt-2 border-t border-gray-100">
                  <span className="text-orange-400 text-base leading-none mt-0.5 flex-shrink-0">
                    ⚡
                  </span>
                  <span className="text-gray-500">
                    Giới hạn{" "}
                    <span className="font-semibold text-gray-700">
                      5 lượt tạo AI
                    </span>
                    /tháng — mua thêm hoặc nâng cấp khi cần
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Cơ bản — featured */}
          <ScrollReveal delay={80} className="h-full">
            <div
              className="rounded-2xl p-7 shadow-2xl relative card-lift text-white h-full flex flex-col"
              style={{
                background:
                  "linear-gradient(145deg, #0f0a2e 0%, #1a0f4e 45%, #2d1b69 100%)",
              }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-400 text-gray-900 rounded-full shadow">
                  <Star className="w-3 h-3 fill-gray-900" /> Phổ biến nhất
                </span>
              </div>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-violet-300 uppercase tracking-wide">
                  Cơ bản
                </p>
                {isYearly && (
                  <span className="text-xs font-bold text-gray-900 bg-amber-400 px-2 py-0.5 rounded-full">
                    Tiết kiệm {fmt(basic.saved)}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {fmt(isYearly ? basic.perMonth : basic.monthly)}
                </span>
                <span className="text-indigo-200 mb-1 text-sm">/tháng</span>
              </div>
              <p className="mt-1.5 text-sm text-violet-300">
                {isYearly
                  ? `${fmt(basic.yearlyTotal)}/năm · thanh toán 1 lần`
                  : `hoặc ${fmt(basic.perMonth)}/tháng khi mua năm`}
              </p>
              <Link
                href={`/upgrade?plan=basic&billing=${billing}`}
                className="mt-5 block text-center py-2.5 text-sm font-bold bg-white text-indigo-900 rounded-xl hover:bg-violet-50 transition-colors shadow-md"
              >
                Đăng ký Cơ bản
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  "20 lượt tạo nội dung/tháng",
                  "Sao chép & xuất file HTML",
                  "Xuất PDF chất lượng cao",
                  "Xuất bản link công khai",
                  "Toàn bộ template mẫu",
                  "Hỗ trợ trực tiếp nhanh chóng",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-white/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-300 shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Pro */}
          <ScrollReveal from="right" className="h-full">
            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-7 card-lift h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-bl-full" />
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  Pro
                </p>
                {isYearly && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Tiết kiệm {fmt(pro.saved)}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  {fmt(isYearly ? pro.perMonth : pro.monthly)}
                </span>
                <span className="text-gray-500 mb-1 text-sm">/tháng</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500">
                {isYearly
                  ? `${fmt(pro.yearlyTotal)}/năm · thanh toán 1 lần`
                  : `hoặc ${fmt(pro.perMonth)}/tháng khi mua năm`}
              </p>
              <Link
                href={`/upgrade?plan=pro&billing=${billing}`}
                className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-700 border-2 border-indigo-400 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Nâng cấp Pro
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  "Không giới hạn lượt tạo nội dung",
                  "Tất cả tính năng Cơ bản",
                  "Lịch sử không giới hạn",
                  "Hỗ trợ ưu tiên",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Credits — custom qty */}
        <ScrollReveal className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Hoặc mua lượt theo nhu cầu
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Không cần đăng ký tháng — chọn đúng số lượt cần dùng, không hết hạn.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Số lượt cần mua
              </span>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                {fmt(CREDIT_PRICE_PER_UNIT)}/lượt · không hết hạn
              </span>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => changeQty(creditQty - 1)}
                disabled={creditQty <= CREDIT_MIN_QTY}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center gap-2">
                <input
                  type="number"
                  min={CREDIT_MIN_QTY}
                  max={CREDIT_MAX_QTY}
                  value={creditQty}
                  onChange={(e) =>
                    changeQty(parseInt(e.target.value) || CREDIT_MIN_QTY)
                  }
                  className="w-20 text-center text-3xl font-extrabold text-gray-900 border-0 outline-none bg-transparent"
                />
                <span className="text-base text-gray-400 font-medium">
                  lượt
                </span>
              </div>
              <button
                onClick={() => changeQty(creditQty + 1)}
                disabled={creditQty >= CREDIT_MAX_QTY}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick-select */}
            <div className="flex gap-2 mb-5">
              {[1, 5, 10, 20].map((q) => (
                <button
                  key={q}
                  onClick={() => setCreditQty(q)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    creditQty === q
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {q} lượt
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
              <span className="text-sm text-gray-500">Tổng thanh toán</span>
              <span className="text-2xl font-extrabold text-gray-900">
                {fmt(creditTotal)}
              </span>
            </div>

            <Link
              href={`/upgrade?type=credits&qty=${creditQty}`}
              className="block text-center py-3 text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              Mua {creditQty} lượt — {fmt(creditTotal)}
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Mua từ 1 lượt · Không hết hạn · Thanh toán chuyển khoản · Kích hoạt trong 1–4 giờ
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
