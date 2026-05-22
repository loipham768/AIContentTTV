import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import RateLimit from '@/models/RateLimit'
import Project from '@/models/Project'
import { generateBlock } from '@/lib/ai/generate-block'

export const runtime = 'nodejs'

const generateSchema = z.object({
  prompt: z.string().min(1).max(500),
})

export async function POST(req: NextRequest) {
  // 1. Auth check — runs before any DB connection (T-03-03)
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = session.user.id

  // 2. Input validation
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = generateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
      { status: 400 }
    )
  }
  const { prompt } = parsed.data

  // 3. Rate limit — atomic test-and-set BEFORE calling Claude (CR-02)
  //    RateLimit has a unique index on userId; a duplicate-key error (11000) means
  //    a TTL doc already exists → user is still within the cooldown window.
  await dbConnect()
  try {
    await RateLimit.create({ userId, createdAt: new Date() })
  } catch (dupErr: any) {
    if (dupErr?.code === 11000) {
      return NextResponse.json(
        { error: 'Vui lòng đợi vài giây trước khi tạo nội dung mới.' },
        { status: 429 }
      )
    }
    throw dupErr
  }

  // 4. Call Claude — generateBlock propagates all errors (D-05)
  try {
    const block = await generateBlock(prompt)

    // Auto-save to history — failure does not block the generation response
    try {
      await Project.create({ userId, name: prompt.slice(0, 50), prompt, blockData: block })
    } catch (saveErr) {
      console.error('[/api/generate] auto-save failed:', saveErr)
    }

    return NextResponse.json({ block }, { status: 200 })
  } catch (err) {
    // On Claude failure, remove the rate-limit doc so the user can retry immediately
    await RateLimit.deleteOne({ userId }).catch(() => {})
    console.error('[/api/generate] generateBlock error:', err)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
