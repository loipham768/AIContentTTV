'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Crown, Star, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { PLAN_PRICES, CREDIT_PACKS } from '@/lib/planConfig'

interface Props {
  isLoggedIn: boolean
}

function fmt(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function PricingSection({ isLoggedIn }: Props) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const isYearly = billing === 'yearly'

  const designer = {
    monthly: PLAN_PRICES.designer.monthly,
    yearlyTotal: PLAN_PRICES.designer.yearly,
    perMonth: Math.round(PLAN_PRICES.designer.yearly / 12),
    saved: PLAN_PRICES.designer.monthly * 12 - PLAN_PRICES.designer.yearly,
  }
  const basic = {
    monthly: PLAN_PRICES.basic.monthly,
    yearlyTotal: PLAN_PRICES.basic.yearly,
    perMonth: Math.round(PLAN_PRICES.basic.yearly / 12),
    saved: PLAN_PRICES.basic.monthly * 12 - PLAN_PRICES.basic.yearly,
  }
  const pro = {
    monthly: PLAN_PRICES.pro.monthly,
    yearlyTotal: PLAN_PRICES.pro.yearly,
    perMonth: Math.round(PLAN_PRICES.pro.yearly / 12),
    saved: PLAN_PRICES.pro.monthly * 12 - PLAN_PRICES.pro.yearly,
  }

  return (
    <section
      id="pricing"
      className="py-24"
      style={{
        background:
          'linear-gradient(135deg, #e0e7ff 0%, #faf5ff 50%, #ede9fe 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Bảng giá
          </h2>
          <p className="text-gray-500">
            Bắt đầu miễn phí — nâng cấp khi bạn cần nhiều hơn
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
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                !isYearly
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hàng tháng
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hàng năm
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                  isYearly
                    ? 'bg-white/20 text-white'
                    : 'text-emerald-600 bg-emerald-100'
                }`}
              >
                -20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* Subscription plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-2 mb-16">

          {/* Free */}
          <ScrollReveal from="left" className="h-full">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 card-lift h-full flex flex-col">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Miễn phí
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">0đ</span>
                <span className="text-gray-400 mb-1 text-sm">/tháng</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500">Không cần thẻ ngân hàng</p>
              <Link
                href={isLoggedIn ? '/create' : '/login?plan=free'}
                className="mt-5 block text-center py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-300 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                {isLoggedIn ? 'Tạo nội dung ngay' : 'Bắt đầu miễn phí'}
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  { text: '4 lượt tạo nội dung/tháng', ok: true },
                  { text: 'Chỉnh sửa trong editor', ok: true },
                  { text: '3 template mẫu', ok: false },
                  { text: 'Sao chép / xuất HTML', ok: false },
                ].map(({ text, ok }) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${ok ? 'text-emerald-500' : 'text-gray-300'}`}
                    />
                    <span className={ok ? '' : 'text-gray-400'}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Designer */}
          <ScrollReveal delay={60} className="h-full">
            <div className="rounded-2xl border-2 border-teal-200 bg-white p-7 card-lift h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-bl-full" />
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  Designer
                </p>
                {isYearly && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Tiết kiệm {fmt(designer.saved)}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  {fmt(isYearly ? designer.perMonth : designer.monthly)}
                </span>
                <span className="text-gray-500 mb-1 text-sm">/tháng</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500">
                {isYearly
                  ? `${fmt(designer.yearlyTotal)}/năm · thanh toán 1 lần`
                  : `hoặc ${fmt(designer.perMonth)}/tháng khi mua năm`}
              </p>
              <Link
                href={`/upgrade?plan=designer&billing=${billing}`}
                className="mt-5 block text-center py-2.5 text-sm font-semibold text-teal-700 border-2 border-teal-400 rounded-xl hover:bg-teal-50 transition-colors"
              >
                Đăng ký Designer
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  'Kéo thả không giới hạn',
                  'Sao chép & xuất file HTML',
                  'Toàn bộ template mẫu',
                  'Lưu lịch sử 30 ngày',
                  { text: 'Tạo nội dung bằng AI', disabled: true },
                ].map((f) => {
                  const disabled = typeof f === 'object' && f.disabled
                  const text = typeof f === 'string' ? f : f.text
                  return (
                    <li key={text} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${disabled ? 'text-gray-300' : 'text-emerald-500'}`}
                      />
                      <span className={disabled ? 'text-gray-400' : ''}>{text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </ScrollReveal>

          {/* Basic — featured */}
          <ScrollReveal delay={80} className="h-full">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-7 shadow-2xl relative card-lift text-white h-full flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-400 text-gray-900 rounded-full shadow">
                  <Star className="w-3 h-3 fill-gray-900" /> Phổ biến nhất
                </span>
              </div>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">
                  Basic
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
              <p className="mt-1.5 text-sm text-indigo-300">
                {isYearly
                  ? `${fmt(basic.yearlyTotal)}/năm · thanh toán 1 lần`
                  : `hoặc ${fmt(basic.perMonth)}/tháng khi mua năm`}
              </p>
              <Link
                href={`/upgrade?plan=basic&billing=${billing}`}
                className="mt-5 block text-center py-2.5 text-sm font-bold bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors shadow-md"
              >
                Nâng cấp Basic
              </Link>
              <ul className="mt-6 space-y-2.5 flex-1">
                {[
                  '25 lượt tạo nội dung/tháng',
                  'Sao chép & xuất file HTML',
                  'Toàn bộ template mẫu',
                  'Lưu lịch sử 30 ngày',
                  'Hỗ trợ qua email',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-indigo-200 shrink-0" /> {f}
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
                  'Không giới hạn bài viết HTML',
                  'Không giới hạn lượt tạo nội dung',
                  'Toàn bộ tính năng Basic',
                  'Lưu lịch sử không giới hạn',
                  'Hỗ trợ Zalo ưu tiên trong 4h',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Credits */}
        <ScrollReveal className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Hoặc nạp credits</h3>
          <p className="text-gray-500 text-sm">
            Không cần đăng ký tháng — nạp khi cần, dùng bao nhiêu trả bấy nhiêu.
            Credits không hết hạn.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDIT_PACKS.map((pack) => {
            const highlight = (pack as any).featured === true
            const badge = highlight ? 'Tiết kiệm nhất' : undefined
            return (
              <ScrollReveal key={pack.id} className="h-full">
                <div
                  className={`rounded-2xl p-5 h-full flex flex-col gap-3 relative ${
                    highlight
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 bg-amber-400 text-gray-900 rounded-full shadow whitespace-nowrap">
                      {badge}
                    </span>
                  )}
                  <p className={`text-2xl font-extrabold ${highlight ? 'text-white' : 'text-gray-900'}`}>
                    {fmt(pack.amount)}
                  </p>
                  <p className={`text-sm flex-1 ${highlight ? 'text-emerald-50' : 'text-gray-600'}`}>
                    {pack.label}
                  </p>
                  <Link
                    href={`/upgrade?type=credits&pack=${pack.id}`}
                    className={`block text-center py-2 text-xs font-semibold rounded-xl transition-colors ${
                      highlight
                        ? 'bg-white text-emerald-700 hover:bg-emerald-50'
                        : 'text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
                    }`}
                  >
                    Nạp ngay
                  </Link>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Chúng tôi rất fairplay — dùng bao nhiêu trả bấy nhiêu, không gói cước, không
            ràng buộc, không phí ẩn.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
