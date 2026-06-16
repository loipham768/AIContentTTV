import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import Project from '@/models/Project'
import RateLimit from '@/models/RateLimit'
import { chatWithGemini, type GeminiMessage, type ContentType } from '@/lib/ai/gemini'
import { generateBannerImage } from '@/lib/ai/imagen'
import { checkAndIncrementGeneration } from '@/lib/planGate'

export const runtime = 'nodejs'

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.tuple([z.object({ text: z.string() })]),
})

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
  initialPrompt: z.string().max(500).optional(),
  isFinal: z.boolean().optional(), // true only when the conversation produces HTML
  contentType: z.enum(['landing', 'article', 'ads', 'portfolio']).optional(),
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

  const { messages, initialPrompt, contentType } = parsed.data

  try {
    const result = await chatWithGemini(messages as GeminiMessage[], contentType as ContentType | undefined)

    if (result.type === 'html' || result.type === 'ready_for_image') {
      // Rate limit — prevents concurrent requests from double-spending quota
      await dbConnect()
      try {
        await RateLimit.create({ userId: session.user.id, createdAt: new Date() })
      } catch (dupErr: any) {
        if (dupErr?.code === 11000) {
          return NextResponse.json(
            { error: 'Vui lòng đợi vài giây trước khi tạo nội dung mới.' },
            { status: 429 }
          )
        }
        throw dupErr
      }

      // Plan gate — only when AI actually produces the final output
      const gate = await checkAndIncrementGeneration(session.user.id)
      if (!gate.allowed) {
        await RateLimit.deleteOne({ userId: session.user.id }).catch(() => {})
        return NextResponse.json(
          { error: gate.reason, code: gate.code, upgradeRequired: gate.upgradeRequired },
          { status: 402 }
        )
      }

      const name = (initialPrompt ?? 'Quảng cáo').slice(0, 50)
      const prompt = (initialPrompt ?? 'Generated via Gemini chat').slice(0, 500)
      let projectId: string | null = null

      // ── Banner image via Imagen 3 ──
      if (result.type === 'ready_for_image') {
        let imageData: string
        let mimeType: string
        try {
          const img = await generateBannerImage(result.imagePrompt, result.aspectRatio)
          imageData = img.base64
          mimeType = img.mimeType
        } catch (imgErr) {
          await RateLimit.deleteOne({ userId: session.user.id }).catch(() => {})
          console.error('[/api/chat] Imagen error:', imgErr)
          return NextResponse.json(
            { error: 'Không thể tạo ảnh banner. Vui lòng thử lại.' },
            { status: 500 }
          )
        }

        try {
          await dbConnect()
          const project = await Project.create({
            userId: session.user.id,
            name,
            prompt,
            blockData: { type: 'image', mimeType, imageData },
          })
          projectId = project._id.toString()
        } catch (saveErr) {
          console.error('[/api/chat] image project save failed:', saveErr)
        }

        return NextResponse.json({ type: 'image', imageData, mimeType, projectId })
      }

      // ── HTML content ──
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

    // question / confirm — pass through to client
    return NextResponse.json(result)
  } catch (err) {
    console.error('[/api/chat] Gemini error:', err)
    return NextResponse.json({ error: 'Đã xảy ra lỗi. Vui lòng thử lại.' }, { status: 500 })
  }
}
