import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import { MOCK_BLOCK } from '@/lib/mockBlock'

// Recursive component schema — matches MOCK_BLOCK structure
// Using 'any' annotation to allow z.lazy() recursive self-reference without TypeScript cycle errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GrapesComponentSchema: z.ZodType<any, any, any> = z.lazy(() =>
  z.object({
    tagName: z.string().optional(),
    type: z.string().optional(),
    draggable: z.boolean().optional(),
    droppable: z.boolean().optional(),
    // Zod v4: z.record requires both key and value types
    style: z.record(z.string(), z.string()).optional(),
    components: z.array(GrapesComponentSchema).optional(),
    content: z.string().optional(),
  })
)

export const GrapesBlockSchema = z.object({
  assets: z.array(z.any()),
  styles: z.array(z.any()),
  pages: z.array(
    z.object({
      frames: z.array(
        z.object({
          component: GrapesComponentSchema,
        })
      ),
    })
  ),
})

export type GrapesBlock = z.infer<typeof GrapesBlockSchema>

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

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateBlock(prompt: string): Promise<GrapesBlock> {
  const response = await client.messages.parse({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
    output_config: {
      // Zod v4 SDK: zodOutputFormat accepts only the schema (no name argument)
      format: zodOutputFormat(GrapesBlockSchema),
    },
  })

  if (!response.parsed_output) {
    throw new Error('Claude returned null parsed_output — Zod validation failed')
  }

  return response.parsed_output
}
