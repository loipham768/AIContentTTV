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

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? ''
}

async function getGeoInfo(ip: string): Promise<Record<string, string>> {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === '') return {}
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`,
      { signal: controller.signal }
    )
    clearTimeout(timer)
    const data = await res.json() as { status: string; country: string; countryCode: string; regionName: string; city: string }
    if (data.status === 'success') {
      return {
        registrationCountry:     data.country,
        registrationCountryCode: data.countryCode,
        registrationRegion:      data.regionName,
        registrationCity:        data.city,
      }
    }
  } catch { /* geo lookup is best-effort */ }
  return {}
}

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

  // Bonus credits awarded on referral (adjust amounts here)
  const REFERRAL_BONUS_NEW_USER = 5
  const REFERRAL_BONUS_REFERRER = 5

  // OTP correct — create the user
  const alreadyExists = await User.findOne({ email }).lean()
  if (!alreadyExists) {
    const ip = getClientIp(req)
    const geo = await getGeoInfo(ip)
    const referralEmail = pending.referralEmail || ''

    const newUser: Record<string, unknown> = {
      email,
      passwordHash: pending.passwordHash,
      registrationIp: ip,
      ...geo,
    }

    if (referralEmail) {
      newUser.referredBy = referralEmail
      newUser.credits = REFERRAL_BONUS_NEW_USER
      newUser.creditsTotal = REFERRAL_BONUS_NEW_USER

      // Track referral count for referrer (no credit bonus)
      await User.updateOne(
        { email: referralEmail },
        { $inc: { referralCount: 1 } }
      )
    }

    await User.create(newUser)
  }
  await PendingRegistration.deleteOne({ email })

  return NextResponse.json({ ok: true })
}
