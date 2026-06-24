import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import PendingRegistration from '@/models/PendingRegistration'
import { sendOtpEmail } from '@/lib/email'

export const runtime = 'nodejs'

const schema = z.object({
  email:         z.string().email(),
  password:      z.string().min(8),
  referralEmail: z.string().email().optional().or(z.literal('')),
})

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const { email, password, referralEmail } = parsed.data

  await dbConnect()

  // Block if email already registered
  const existing = await User.findOne({ email }).lean()
  if (existing) {
    return NextResponse.json({ error: 'Email này đã được sử dụng' }, { status: 409 })
  }

  // Validate referral email if provided
  let validatedReferralEmail = ''
  if (referralEmail && referralEmail !== email) {
    const referrer = await User.findOne({ email: referralEmail }).lean()
    if (!referrer) {
      return NextResponse.json({ error: 'Email giới thiệu không tồn tại trong hệ thống' }, { status: 400 })
    }
    validatedReferralEmail = referralEmail.toLowerCase().trim()
  }

  // Rate-limit: don't resend within 60 seconds
  const pending = await PendingRegistration.findOne({ email }).lean() as any
  if (pending) {
    const secondsSinceSent = (Date.now() - new Date(pending.sentAt).getTime()) / 1000
    if (secondsSinceSent < 60) {
      const wait = Math.ceil(60 - secondsSinceSent)
      return NextResponse.json({ error: `Vui lòng đợi ${wait} giây trước khi gửi lại.` }, { status: 429 })
    }
  }

  const otp = generateOtp()
  const passwordHash = await bcrypt.hash(password, 12)
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000)

  await PendingRegistration.findOneAndUpdate(
    { email },
    { email, passwordHash, otp, attempts: 0, expiresAt, sentAt: now, referralEmail: validatedReferralEmail },
    { upsert: true, new: true },
  )

  try {
    await sendOtpEmail(email, otp)
  } catch (err: any) {
    console.error('[send-otp] email error:', err?.message ?? err)
    return NextResponse.json({ error: `Không thể gửi email: ${err?.message ?? 'lỗi không xác định'}` }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
