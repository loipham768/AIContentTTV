import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import PendingRegistration from '@/models/PendingRegistration'

export const runtime = 'nodejs'

const schema = z.object({
  email: z.string().email(),
  otp:   z.string().length(6),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  const { email, otp } = parsed.data

  await dbConnect()

  const pending = await PendingRegistration.findOne({ email }) as any
  if (!pending) {
    return NextResponse.json({ error: 'Mã OTP đã hết hạn. Vui lòng đăng ký lại.' }, { status: 410 })
  }

  if (new Date() > pending.expiresAt) {
    await PendingRegistration.deleteOne({ email })
    return NextResponse.json({ error: 'Mã OTP đã hết hạn. Vui lòng đăng ký lại.' }, { status: 410 })
  }

  if (pending.attempts >= 5) {
    await PendingRegistration.deleteOne({ email })
    return NextResponse.json({ error: 'Quá nhiều lần thử. Vui lòng đăng ký lại.' }, { status: 429 })
  }

  if (pending.otp !== otp) {
    await PendingRegistration.updateOne({ email }, { $inc: { attempts: 1 } })
    const left = 4 - pending.attempts
    return NextResponse.json({ error: `Mã OTP không đúng. Còn ${left} lần thử.` }, { status: 400 })
  }

  // OTP correct — create the user
  const alreadyExists = await User.findOne({ email }).lean()
  if (!alreadyExists) {
    await User.create({ email, passwordHash: pending.passwordHash })
  }
  await PendingRegistration.deleteOne({ email })

  return NextResponse.json({ ok: true })
}
