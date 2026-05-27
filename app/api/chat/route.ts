import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import { chatWithGemini, type GeminiMessage } from '@/lib/ai/gemini'
import { checkAndIncrementLandingPage } from '@/lib/planGate'

export const runtime = 'nodejs'

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.tuple([z.object({ text: z.string() })]),
})

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
  initialPrompt: z.string().max(500).optional(),
  isFinal: z.boolean().optional(), // true only when the conversation produces HTML
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = chatSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
      { status: 400 }
    )
  }

  const { messages, initialPrompt, isFinal } = parsed.data

  try {
    const result = await chatWithGemini(messages as GeminiMessage[])

    if (result.type === 'html') {
      // Plan gate — only when AI actually produces the final HTML output
      const gate = await checkAndIncrementLandingPage(session.user.id)
      if (!gate.allowed) {
        return NextResponse.json(
          { error: gate.reason, code: gate.code, upgradeRequired: gate.upgradeRequired },
          { status: 402 }
        )
      }

      const name = (initialPrompt ?? 'Trang web').slice(0, 50)
      const prompt = (initialPrompt ?? 'Generated via Gemini chat').slice(0, 500)
      let projectId: string | null = null

      try {
        await dbConnect()
        const project = await Project.create({
          userId: session.user.id,
          name,
          prompt,
          blockData: { type: 'html', html: result.content },
        })
        projectId = project._id.toString()
      } catch (saveErr) {
        console.error('[/api/chat] project save failed:', saveErr)
      }

      return NextResponse.json({ type: 'html', content: result.content, projectId })
    }

    // question type — pass through to client
    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/chat] Gemini error:', err)
    return NextResponse.json({ error: 'Đã xảy ra lỗi. Vui lòng thử lại.' }, { status: 500 })
  }
}
