import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'

export const runtime = 'nodejs'

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  await dbConnect()
  const user = await User.findById(session.user.id)
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ok = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
  if (!ok) return NextResponse.json({ error: 'Mật khẩu hiện tại không đúng' }, { status: 400 })

  user.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
  await user.save()

  return NextResponse.json({ ok: true })
}
