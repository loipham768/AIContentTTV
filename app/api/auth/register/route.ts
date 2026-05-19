import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'

export const runtime = 'nodejs'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    await dbConnect()

    const existing = await User.findOne({ email }).lean()
    if (existing) {
      return NextResponse.json(
        { error: 'Email này đã được sử dụng' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)
    await User.create({ email, passwordHash })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
