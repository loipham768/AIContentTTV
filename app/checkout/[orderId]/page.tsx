import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import { BANK_INFO } from '@/lib/planConfig'
import Link from 'next/link'
import { CheckCircle2, Clock, Copy, ArrowLeft, Banknote, AlertCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import CheckoutCopyButton from '@/components/checkout/CheckoutCopyButton'

export const runtime = 'nodejs'

const PLAN_LABEL: Record<string, string> = {
  basic: 'Basic',
  pro:   'Pro',
}
const BILLING_LABEL: Record<string, string> = {
  monthly: 'Tháng',
  yearly:  'Năm',
}

function formatVnd(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { orderId } = await params

  await dbConnect()
  const order = await Order.findOne({ orderId, userId: session.user.id }).lean() as any

  if (!order) redirect('/editor')

  const isPaid      = order.status === 'paid'
  const isExpired   = order.status === 'expired' || (order.status === 'pending' && new Date(order.expiresAt) < new Date())
  const isCancelled = order.status === 'cancelled'

  function orderTitle() {
    if (order.type === 'subscription') {
      return `Gói ${PLAN_LABEL[order.plan]} — ${BILLING_LABEL[order.billing]}`
    }
    return `Nạp credits (${order.creditsHtml} bài viết${order.creditsLandingPages ? ` + ${order.creditsLandingPages} landing page` : ''})`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo iconSize={28} uid="checkout-h" />
          <Link href="/editor" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Trình soạn thảo
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* Status banner */}
        {isPaid && (
          <div className="mb-8 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">Đã kích hoạt thành công!</p>
              <p className="text-sm text-emerald-700">Gói của bạn đã được kích hoạt. Hãy vào trình soạn thảo để bắt đầu.</p>
            </div>
            <Link href="/editor" className="ml-auto px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors whitespace-nowrap">
              Vào soạn thảo →
            </Link>
          </div>
        )}

        {isExpired && (
          <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800">Đơn hàng đã hết hạn</p>
              <p className="text-sm text-red-700">Thời hạn 24h đã qua. Vui lòng tạo đơn hàng mới.</p>
            </div>
          </div>
        )}

        {isCancelled && (
          <div className="mb-8 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
            <AlertCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">Đơn hàng đã bị huỷ.</p>
          </div>
        )}

        <div className="grid md:grid-cols-5 gap-6">

          {/* Order details */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã đơn</span>
                <span className="font-mono font-bold text-indigo-700">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gói</span>
                <span className="font-semibold text-gray-900">{orderTitle()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số tiền</span>
                <span className="font-bold text-gray-900 text-base">{formatVnd(order.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Trạng thái</span>
                <span className={`font-semibold ${isPaid ? 'text-emerald-600' : isExpired ? 'text-red-500' : 'text-amber-600'}`}>
                  {isPaid ? 'Đã thanh toán' : isExpired ? 'Hết hạn' : isCancelled ? 'Đã huỷ' : 'Chờ thanh toán'}
                </span>
              </div>
              {!isPaid && !isExpired && !isCancelled && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Hết hạn lúc</span>
                  <span className="text-gray-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(order.expiresAt).toLocaleString('vi-VN', { hour12: false })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment instructions */}
          {!isPaid && !isExpired && !isCancelled && (
            <div className="md:col-span-3 bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Banknote className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Hướng dẫn chuyển khoản</h2>
              </div>

              <div className="space-y-3 text-sm mb-6">
                {[
                  { label: 'Ngân hàng',     value: BANK_INFO.bank },
                  { label: 'Số tài khoản',  value: BANK_INFO.accountNumber },
                  { label: 'Chủ tài khoản', value: BANK_INFO.accountHolder },
                  { label: 'Chi nhánh',     value: BANK_INFO.branch },
                  { label: 'Số tiền',       value: formatVnd(order.amount) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Nội dung CK</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{order.orderId}</span>
                    <CheckoutCopyButton text={order.orderId} />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">Lưu ý quan trọng</p>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>Ghi đúng mã đơn hàng <strong>{order.orderId}</strong> vào nội dung chuyển khoản</li>
                  <li>Sau khi chuyển khoản, đội ngũ sẽ kích hoạt gói trong vòng 1–4 giờ</li>
                  <li>Đơn hàng hết hạn sau 24 giờ nếu chưa thanh toán</li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-gray-400 text-center">
                Cần hỗ trợ? Email:{' '}
                <a href="mailto:support@aicontentbooster.vn" className="underline hover:text-gray-600">
                  support@aicontentbooster.vn
                </a>
              </p>
            </div>
          )}

          {isPaid && (
            <div className="md:col-span-3 bg-emerald-50 rounded-2xl border border-emerald-100 p-6 flex flex-col items-center justify-center text-center gap-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              <p className="text-xl font-bold text-emerald-800">Cảm ơn bạn!</p>
              <p className="text-sm text-emerald-700">Gói của bạn đã được kích hoạt thành công.</p>
              <Link href="/editor" className="mt-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                Bắt đầu tạo nội dung →
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
