import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import { chatWithGemini, type GeminiMessage, type ContentType } from '@/lib/ai/gemini'

export const runtime = 'nodejs'

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.tuple([z.object({ text: z.string() })]),
})

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
  initialPrompt: z.string().max(500).optional(),
  contentType: z.enum(['content', 'report']).optional(),
})

export async function POST(req: NextRequest) {
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

  const { messages, initialPrompt, contentType } = parsed.data

  try {
    const result = await chatWithGemini(messages as GeminiMessage[], contentType as ContentType | undefined)

    if (result.type === 'html') {
      const name = (initialPrompt ?? 'New Content').slice(0, 50)
      const prompt = (initialPrompt ?? 'Generated via Gemini chat').slice(0, 500)
      let projectId: string | null = null

      try {
        await dbConnect()
        const project = await Project.create({
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

    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/chat] Gemini error:', err)
    return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 })
  }
}
