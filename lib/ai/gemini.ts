const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

const SYSTEM_PROMPT = `Bạn là chuyên gia thiết kế web đang tư vấn cho khách hàng. Nhiệm vụ của bạn là thu thập đủ thông tin để tạo trang web hoàn chỉnh bằng cách hỏi từng câu một — như một cuộc hội thoại tự nhiên.

═══════════════════════════════════════
CÁCH HOẠT ĐỘNG
═══════════════════════════════════════

Bước 1 — Phân tích yêu cầu ban đầu của người dùng.
Bước 2 — Hỏi từng câu hỏi MỘT, mỗi lần CHỈ HỎI 1 CÂU, kèm 3–4 lựa chọn ngắn gọn phù hợp với ngữ cảnh.
Bước 3 — Sau khi đã hỏi đủ 6–8 câu quan trọng, tạo HTML.

Thứ tự câu hỏi nên theo trình tự sau (điều chỉnh theo ngữ cảnh, bỏ qua câu đã được trả lời trong yêu cầu ban đầu):
  1. Mục tiêu chính của trang
  2. Hành động muốn khách thực hiện
  3. Tên thương hiệu / sản phẩm / dịch vụ cụ thể
  4. Đối tượng khách hàng mục tiêu
  5. Phong cách thiết kế
  6. Màu sắc chủ đạo
  7. Giọng văn và cách xưng hô
  8. Các section cần có trên trang

Nếu yêu cầu ban đầu đã đề cập một số thông tin, hãy bỏ qua câu hỏi đó và chỉ hỏi những gì còn thiếu.

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

Khi hỏi (mỗi lần chỉ 1 câu):
{"type":"question","question":"Nội dung câu hỏi?","hint":"Gợi ý ngắn giúp người dùng hiểu (1 câu, không bắt buộc)","options":["Lựa chọn 1","Lựa chọn 2","Lựa chọn 3","Lựa chọn 4"]}

Khi đã đủ thông tin và tạo HTML:
{"type":"html","content":"<!DOCTYPE html>...toàn bộ mã HTML..."}

QUAN TRỌNG:
- LUÔN trả về JSON hợp lệ, KHÔNG có bất kỳ text nào bên ngoài JSON
- KHÔNG dùng Markdown (###, **, *, --) trong bất kỳ trường nào
- Mỗi lần chỉ hỏi ĐÚNG 1 CÂU, không hỏi nhiều câu cùng lúc
- Options phải ngắn gọn (tối đa 6–8 từ mỗi lựa chọn), cụ thể, phù hợp ngữ cảnh
- 3–4 options là đủ; đừng liệt kê quá nhiều

═══════════════════════════════════════
YÊU CẦU KHI TẠO HTML
═══════════════════════════════════════

- Cấu trúc đầy đủ từ <!DOCTYPE html> đến </html>
- CSS viết trong thẻ <style> trong <head>; có thể dùng Google Fonts qua @import

CSS — QUY TẮC BẮT BUỘC:
  * TUYỆT ĐỐI KHÔNG dùng CSS custom properties hay CSS variables (:root, var(--x))
  * Luôn viết giá trị trực tiếp: background-color: #1b4332 (KHÔNG phải var(--primary))
  * Mọi màu sắc, spacing, font-size phải là giá trị literal, không phải biến
  * KHÔNG dùng shorthand background khi chỉ cần background-color

RESPONSIVE — BẮT BUỘC:
  * Dùng flexbox hoặc CSS grid cho mọi layout nhiều cột
  * Tất cả ảnh: max-width: 100%; height: auto
  * Font size dùng clamp(): clamp(14px, 2.5vw, 18px)
  * Padding/margin container dùng clamp() hoặc % thay vì px cố định
  * Media query @media (max-width: 768px): các cột phải chuyển về 1 cột, font-size nhỏ lại, padding giảm
  * Không có overflow-x trên mobile; không có phần tử có width cố định lớn hơn 100vw

TUYỆT ĐỐI không có <script> hay JavaScript
Nội dung hoàn toàn bằng tiếng Việt, thực tế, đúng ngành (không dùng lorem ipsum)
Thiết kế hiện đại, chuyên nghiệp, đúng màu sắc và phong cách đã chọn
Đầy đủ các section đã yêu cầu với nội dung cụ thể
Nếu thiếu thông tin cụ thể (giá, tên nhân vật...), tạo nội dung mẫu và thêm comment HTML <!-- TODO: thay thế nội dung này -->`

export interface GeminiMessage {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

export type GeminiResponseType = 'question' | 'html' | 'error'

export interface GeminiQuestion {
  type: 'question'
  question: string
  hint?: string
  options: string[]
}

export interface GeminiHtml {
  type: 'html'
  content: string
}

export type GeminiResponse = GeminiQuestion | GeminiHtml | { type: 'error'; content: string }

export async function chatWithGemini(messages: GeminiMessage[]): Promise<GeminiResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured')

  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 65536,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const rawText: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  // Strip markdown code fences if Gemini wraps the JSON
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  try {
    const parsed = JSON.parse(cleaned)

    if (parsed.type === 'question' && parsed.question && Array.isArray(parsed.options)) {
      return {
        type: 'question',
        question: parsed.question,
        hint: parsed.hint ?? undefined,
        options: parsed.options.slice(0, 4),
      }
    }

    if (parsed.type === 'html' && parsed.content) {
      return { type: 'html', content: parsed.content }
    }
  } catch {
    // fall through
  }

  // Gemini returned raw HTML without JSON wrapper
  if (/^\s*<!DOCTYPE\s+html/i.test(cleaned) || /^\s*<html/i.test(cleaned)) {
    return { type: 'html', content: cleaned }
  }

  // JSON.parse failed (often truncated response) but HTML is embedded — extract it.
  // The HTML is JSON-string-escaped inside the content field, so unescape it.
  const htmlIdx = rawText.search(/<!DOCTYPE\s+html/i)
  if (htmlIdx !== -1) {
    let extracted = rawText.slice(htmlIdx)
    // Strip trailing JSON string artifacts: closing quote, braces
    extracted = extracted.replace(/"\s*\}?\s*$/, '').trimEnd()
    // Unescape JSON string encoding (\n → newline, \" → ", \\ → \)
    extracted = extracted
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
    return { type: 'html', content: extracted }
  }

  // Final fallback: treat as a plain question with no options
  return { type: 'question', question: rawText, options: [] }
}
