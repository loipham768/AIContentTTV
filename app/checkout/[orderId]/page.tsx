import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'
import { BANK_INFO, CREDIT_PACKS } from '@/lib/planConfig'
import Link from 'next/link'
import { CheckCircle2, Clock, ArrowLeft, Banknote, AlertCircle, Hourglass, RefreshCw } from 'lucide-react'
import Logo from '@/components/Logo'
import CheckoutCopyButton from '@/components/checkout/CheckoutCopyButton'
import ConfirmPaymentModal from '@/components/checkout/ConfirmPaymentModal'
import BankQRCode from '@/components/checkout/BankQRCode'
import { toTransferContent } from '@/lib/orderUtils'

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

  const isPaid            = order.status === 'paid'
  const isAwaitingConfirm = order.status === 'awaiting_confirmation'
  const isExpired         = order.status === 'expired' || (order.status === 'pending' && new Date(order.expiresAt) < new Date())
  const isCancelled       = order.status === 'cancelled'

  // Build re-order URL so user can quickly create a new order for same plan/pack
  const reorderUrl = order.type === 'subscription'
    ? `/upgrade?plan=${order.plan}&billing=${order.billing ?? 'monthly'}`
    : (() => {
        const pack = CREDIT_PACKS.find(p => p.amount === order.amount)
        return pack ? `/upgrade?type=credits&pack=${pack.id}` : '/#pricing'
      })()

  function orderTitle() {
    if (order.type === 'subscription') {
      return `Gói ${PLAN_LABEL[order.plan]} — ${BILLING_LABEL[order.billing]}`
    }
    return `Nạp ${order.creditsHtml} lượt tạo nội dung`
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

        {isAwaitingConfirm && (
          <div className="mb-8 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4">
            <Hourglass className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-blue-800">Đang chờ xác nhận thanh toán</p>
              <p className="text-sm text-blue-700">Chúng tôi đã nhận được ảnh chuyển khoản của bạn. Gói sẽ được kích hoạt trong vòng 1–4 giờ.</p>
            </div>
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

        <div className="grid md:grid-cols-2 gap-6">

          {/* Left — order details + QR */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h2>

            <div className="space-y-0 text-sm">
              {[
                { label: 'Mã đơn',    value: <span className="font-mono font-bold text-indigo-700">{order.orderId}</span> },
                { label: 'Gói',       value: <span className="font-semibold text-gray-900">{orderTitle()}</span> },
                { label: 'Số tiền',   value: <span className="font-bold text-gray-900 text-base">{formatVnd(order.amount)}</span> },
                { label: 'Trạng thái', value: (
                  <span className={`font-semibold ${isPaid ? 'text-emerald-600' : isExpired ? 'text-red-500' : isAwaitingConfirm ? 'text-blue-600' : isCancelled ? 'text-gray-500' : 'text-amber-600'}`}>
                    {isPaid ? 'Đã thanh toán' : isExpired ? 'Hết hạn' : isCancelled ? 'Đã huỷ' : isAwaitingConfirm ? 'Chờ xác nhận' : 'Chờ thanh toán'}
                  </span>
                )},
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="text-gray-500">{label}</span>
                  {value}
                </div>
              ))}
              {!isPaid && !isExpired && !isCancelled && (
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-gray-500">Hết hạn lúc</span>
                  <span className="text-gray-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(order.expiresAt).toLocaleString('vi-VN', { hour12: false })}
                  </span>
                </div>
              )}
            </div>

            {/* QR code — only when pending payment */}
            {!isPaid && !isExpired && !isCancelled && !isAwaitingConfirm && (
              <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col items-center">
                <p className="text-xs font-medium text-gray-500 mb-3">Quét mã để thanh toán nhanh</p>
                <BankQRCode
                  bankId={BANK_INFO.bankId}
                  accountNumber={BANK_INFO.accountNumber}
                  accountHolder={BANK_INFO.accountHolder}
                  amount={order.amount}
                  transferContent={toTransferContent(order.orderId)}
                />
              </div>
            )}
          </div>

          {/* Right — payment instructions */}
          {!isPaid && !isExpired && !isCancelled && !isAwaitingConfirm && (
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <Banknote className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Hướng dẫn chuyển khoản</h2>
              </div>

              <div className="space-y-0 text-sm mb-5">
                {[
                  { label: 'Ngân hàng',     value: BANK_INFO.bank },
                  { label: 'Số tài khoản',  value: BANK_INFO.accountNumber },
                  { label: 'Chủ tài khoản', value: BANK_INFO.accountHolder },
                  { label: 'Chi nhánh',     value: BANK_INFO.branch },
                  { label: 'Số tiền',       value: formatVnd(order.amount) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-50">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center py-2.5">
                  <span className="text-gray-500">Nội dung CK</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{toTransferContent(order.orderId)}</span>
                    <CheckoutCopyButton text={toTransferContent(order.orderId)} />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
                <p className="font-semibold mb-1">Lưu ý quan trọng</p>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>Nhập đúng nội dung <strong>{toTransferContent(order.orderId)}</strong></li>
                  <li>Gói kích hoạt trong 1–4 giờ sau khi chuyển khoản</li>
                  <li>Đơn hết hạn sau 24 giờ nếu chưa thanh toán</li>
                </ul>
              </div>

              <div className="mt-auto">
                <ConfirmPaymentModal orderId={order.orderId} />
                <p className="mt-2 text-xs text-gray-400 text-center">
                  Cần hỗ trợ?{' '}
                  <a href="mailto:support@aicontentbooster.vn" className="underline hover:text-gray-600">
                    support@aicontentbooster.vn
                  </a>
                </p>
              </div>
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

          {isAwaitingConfirm && (
            <div className="md:col-span-3 bg-blue-50 rounded-2xl border border-blue-100 p-6 flex flex-col items-center justify-center text-center gap-3">
              <Hourglass className="w-16 h-16 text-blue-400" />
              <p className="text-xl font-bold text-blue-800">Đã nhận ảnh xác nhận!</p>
              <p className="text-sm text-blue-700 max-w-xs">
                Chúng tôi sẽ kiểm tra và kích hoạt gói trong vòng <strong>1–4 giờ</strong>. Bạn sẽ nhận email thông báo khi gói được kích hoạt.
              </p>
              <p className="text-xs text-blue-500">Bạn có thể đóng trang này và quay lại sau.</p>
            </div>
          )}

          {(isExpired || isCancelled) && (
            <div className="md:col-span-3 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800 mb-1">
                  {isExpired ? 'Đơn hàng đã hết hạn' : 'Đơn hàng đã bị huỷ'}
                </p>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  {isExpired
                    ? 'Đơn hàng này không còn hiệu lực. Tạo đơn mới để tiếp tục thanh toán.'
                    : 'Đơn hàng này đã bị huỷ. Tạo đơn mới để tiếp tục.'}
                </p>
              </div>
              <Link
                href={reorderUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Tạo đơn hàng mới
              </Link>
              <p className="text-xs text-gray-400">
                Đơn mới sẽ có hiệu lực trong 24 giờ kể từ khi tạo.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
