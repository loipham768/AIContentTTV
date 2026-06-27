import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import { generateBlock } from '@/lib/ai/generate-block'

export const runtime = 'nodejs'

const generateSchema = z.object({
  prompt: z.string().min(1).max(500),
  contentType: z.enum(['content', 'report']).optional(),
})

export async function POST(req: NextRequest) {
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

  const { prompt, contentType } = parsed.data

  try {
    const block = await generateBlock(prompt, contentType)

    let projectId: string | null = null
    try {
      await dbConnect()
      const saved = await Project.create({ name: prompt.slice(0, 50), prompt, blockData: block })
      projectId = saved._id.toString()
    } catch (saveErr) {
      console.error('[/api/generate] auto-save failed:', saveErr)
    }

    return NextResponse.json({ block, projectId }, { status: 200 })
  } catch (err) {
    console.error('[/api/generate] generateBlock error:', err)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
