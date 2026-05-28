import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import { getUserPlanInfo } from '@/lib/planGate'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const user = await User.findById(session.user.id, { passwordHash: 0 }).lean() as any
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const planInfo = await getUserPlanInfo(session.user.id)

  return NextResponse.json({
    email:     user.email,
    fullName:  user.fullName  ?? '',
    phone:     user.phone     ?? '',
    avatarUrl: user.avatarUrl ?? '',
    plan:             planInfo?.plan ?? 'free',
    planExpiresAt:    planInfo?.planExpiresAt ?? null,
    generationsUsed:  planInfo?.generationsUsed ?? 0,
    generationsLimit: planInfo?.generationsLimit ?? 4,
    credits:          planInfo?.credits ?? 0,
  })
}

const patchSchema = z.object({
  fullName:  z.string().max(80).optional(),
  phone:     z.string().max(20).optional(),
  avatarUrl: z.string().max(500).optional(),
})

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 })

  await dbConnect()
  const update: Record<string, string> = {}
  if (parsed.data.fullName  !== undefined) update.fullName  = parsed.data.fullName.trim()
  if (parsed.data.phone     !== undefined) update.phone     = parsed.data.phone.trim()
  if (parsed.data.avatarUrl !== undefined) update.avatarUrl = parsed.data.avatarUrl

  await User.findByIdAndUpdate(session.user.id, { $set: update })
  return NextResponse.json({ ok: true })
}
