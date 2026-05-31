import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/models/Order'

export const runtime = 'nodejs'

const MAX_SIZE = 3 * 1024 * 1024 // 3 MB

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orderId } = await params

  await dbConnect()
  const order = await Order.findOne({ orderId, userId: session.user.id })
  if (!order) return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 })
  if (order.status !== 'pending') return NextResponse.json({ error: 'Đơn hàng không ở trạng thái chờ thanh toán' }, { status: 409 })
  if (new Date(order.expiresAt) < new Date()) return NextResponse.json({ error: 'Đơn hàng đã hết hạn' }, { status: 409 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Không đọc được dữ liệu' }, { status: 400 })
  }

  const file = formData.get('proof') as File | null
  if (!file) return NextResponse.json({ error: 'Chưa chọn ảnh' }, { status: 400 })
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'File phải là ảnh' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Ảnh quá lớn (tối đa 3MB)' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`

  order.paymentProofUrl = dataUrl
  order.status = 'awaiting_confirmation'
  await order.save()

  return NextResponse.json({ success: true })
}
