import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import RateLimit from '@/models/RateLimit'
import Project from '@/models/Project'
import { generateBlock } from '@/lib/ai/generate-block'
import { checkAndIncrementHtmlBlock } from '@/lib/planGate'

export const runtime = 'nodejs'

const generateSchema = z.object({
  prompt: z.string().min(1).max(500),
})

export async function POST(req: NextRequest) {
  // 1. Auth
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

  // 3. Plan gate — check quota before calling AI
  const gate = await checkAndIncrementHtmlBlock(userId)
  if (!gate.allowed) {
    return NextResponse.json(
      { error: gate.reason, code: gate.code, upgradeRequired: gate.upgradeRequired },
      { status: 402 }
    )
  }

  // 4. Rate limit — cooldown between requests
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

  // 5. Call Claude
  try {
    const block = await generateBlock(prompt)

    let projectId: string | null = null
    try {
      const saved = await Project.create({ userId, name: prompt.slice(0, 50), prompt, blockData: block })
      projectId = saved._id.toString()
    } catch (saveErr) {
      console.error('[/api/generate] auto-save failed:', saveErr)
    }

    return NextResponse.json({ block, projectId }, { status: 200 })
  } catch (err) {
    await RateLimit.deleteOne({ userId }).catch(() => {})
    console.error('[/api/generate] generateBlock error:', err)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
