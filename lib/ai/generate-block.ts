import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { MOCK_BLOCK } from '@/lib/mockBlock'
import { GrapesBlockSchema, type GrapesBlock } from '@/lib/ai/schema'
import type { ContentType } from '@/lib/ai/gemini'

// Re-export schema and type so existing server-side imports remain unchanged
export { GrapesBlockSchema } from '@/lib/ai/schema'
export type { GrapesBlock } from '@/lib/ai/schema'

const SYSTEM_PROMPT = `Bạn là một công cụ tạo nội dung HTML cho CMS Việt Nam.

Nhiệm vụ: Tạo một GrapesJS project data JSON dựa trên prompt của người dùng.

QUY TẮC BẮT BUỘC:
1. Toàn bộ nội dung text (content) PHẢI bằng tiếng Việt — phù hợp với prompt
2. Cấu trúc JSON PHẢI giống hệt ví dụ bên dưới (wrapper → section → [h2, p, button])
3. Chỉ thay đổi: giá trị "content" và giá trị trong "style" (màu sắc, font-size, padding...)
4. TUYỆT ĐỐI KHÔNG thêm thẻ <script>, JavaScript, hay code động bất kỳ
5. KHÔNG thêm hoặc bớt component — chỉ đúng 1 section với đúng 3 con: h2, p, button
6. Tất cả CSS phải là inline style object (key là CSS property dạng kebab-case)

VÍ DỤ OUTPUT ĐÚNG (sao chép cấu trúc này, thay nội dung theo prompt):
${JSON.stringify(MOCK_BLOCK, null, 2)}
`

// ads → haiku (nhanh + rẻ, HTML block đơn giản)
// landing/article/portfolio → sonnet (cần hiểu ngữ cảnh phức tạp hơn)
const CLAUDE_ROUTES: Record<ContentType, string> = {
  ads: 'claude-haiku-4-5-20251001',
  landing: 'claude-sonnet-4-6',
  article: 'claude-sonnet-4-6',
  portfolio: 'claude-sonnet-4-6',
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateBlock(prompt: string, contentType?: ContentType): Promise<GrapesBlock> {
  // DEV MOCK: returns MOCK_BLOCK until a real ANTHROPIC_API_KEY is configured
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.startsWith('your-')) {
    await new Promise(r => setTimeout(r, 1500)) // simulate network delay
    return MOCK_BLOCK as unknown as GrapesBlock
  }

  const model = contentType ? CLAUDE_ROUTES[contentType] : 'claude-sonnet-4-6'
  console.log(`[Claude] content=${contentType ?? 'default'} → ${model}`)

  const response = await client.messages.parse({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
    output_config: {
      format: zodOutputFormat(GrapesBlockSchema),
    },
  })

  if (!response.parsed_output) {
    throw new Error('Claude returned null parsed_output — Zod validation failed')
  }

  return response.parsed_output
}
