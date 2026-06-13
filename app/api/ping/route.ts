import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import PageView from '@/models/PageView'

export const runtime = 'nodejs'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    ''
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const sid: string = typeof body?.sid === 'string' ? body.sid.slice(0, 64) : ''
    const path: string = typeof body?.path === 'string' ? body.path.slice(0, 200) : '/'
    if (!sid) return NextResponse.json({ ok: false })

    const session = await auth()
    const userId = session?.user?.id ?? null
    const ip = getIp(req)
    const date = todayStr()

    await dbConnect()

    await PageView.updateOne(
      { sessionId: sid, date },
      { $set: { userId, ip, path } },
      { upsert: true }
    )

    if (userId) {
      const startOfToday = new Date(date + 'T00:00:00.000Z')
      await User.updateOne(
        {
          _id: userId,
          $or: [{ lastActiveAt: null }, { lastActiveAt: { $lt: startOfToday } }],
        },
        { $set: { lastActiveAt: new Date() } }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
