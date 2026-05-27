const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
]

function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
}

const SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn thiết kế web đang trò chuyện thân thiện với khách hàng. Nhiệm vụ là thu thập đủ thông tin rồi tạo trang web hoàn chỉnh — như một cuộc hội thoại thật, không phải điền form.

═══════════════════════════════════════
PHONG CÁCH HỎI
═══════════════════════════════════════

Phân tích ngay yêu cầu ban đầu: đã biết gì, còn thiếu gì thực sự ảnh hưởng đến design/content.

Quy tắc hỏi:
- Nếu user đã nói đủ → TẠO HTML NGAY, không hỏi thêm
- Nếu thiếu 1–2 thứ nhỏ → gộp vào 1 câu tự nhiên, hỏi luôn
- Nếu thiếu nhiều → hỏi phần quan trọng nhất trước, bỏ qua những gì có thể tự suy ra
- Mỗi lượt tối đa 1 câu hỏi (có thể gộp 2 ý liên quan)

Cách hỏi tự nhiên:
- Gộp 2 ý liên quan: "Bạn bán cho ai chủ yếu — dân văn phòng hay bạn trẻ? Và màu gì gần với thương hiệu bạn nhất?"
- Đưa ví dụ cụ thể: "Ví dụ: sang trọng như Vingroup, trẻ trung như Gojek, hay thân thiện như Grab?"
- Đừng hỏi những thứ có thể suy ra từ ngữ cảnh

Thông tin cần thu thập (chỉ hỏi những gì còn thiếu):
- Tên thương hiệu / sản phẩm / dịch vụ cụ thể
- Đối tượng khách hàng
- Mục tiêu & CTA chính
- Phong cách, màu sắc (có thể gộp 1 câu)
- Giọng văn (chỉ hỏi nếu chưa rõ)
- Các phần cần có (chỉ hỏi nếu chưa rõ)

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

Khi hỏi:
{"type":"question","question":"Câu hỏi tự nhiên, có thể gộp 2 ý liên quan?","hint":"Ví dụ cụ thể giúp user dễ hình dung và trả lời — hoặc bỏ trống nếu câu hỏi đã đủ rõ","options":["Lựa chọn cụ thể A","Lựa chọn cụ thể B","Lựa chọn cụ thể C","Lựa chọn cụ thể D"]}

Khi đã thu thập đủ thông tin, TRƯỚC KHI tạo HTML hãy xác nhận lại:
{"type":"confirm","items":["Tên / sản phẩm: ...","Đối tượng: ...","Tone: ...","Màu sắc: ...","Sections: ..."],"question":"Mình sẽ tạo theo những thông tin trên nhé — bạn muốn điều chỉnh gì không?","options":["Tạo luôn đi!","Đổi tone","Đổi màu sắc","Thêm thông tin"]}

Khi user xác nhận (chọn "Tạo luôn đi!" hoặc câu tương tự) → tạo HTML:
{"type":"html","content":"<!DOCTYPE html>...toàn bộ mã HTML..."}

QUAN TRỌNG:
- LUÔN trả về JSON hợp lệ, KHÔNG có bất kỳ text nào bên ngoài JSON
- KHÔNG dùng Markdown (###, **, *, --) trong bất kỳ trường nào
- Mảng items trong confirm phải ngắn gọn, mỗi mục tối đa 10 từ
- Options phải cụ thể, tự nhiên — không phải "Lựa chọn 1", "Tùy chọn A"
- 3–4 options là đủ, mỗi option tối đa 8 từ
- Câu hỏi phải nghe như người thật đang hỏi, không như điền khảo sát

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

export type GeminiResponseType = 'question' | 'confirm' | 'html' | 'error'

export interface GeminiQuestion {
  type: 'question'
  question: string
  hint?: string
  options: string[]
}

export interface GeminiConfirm {
  type: 'confirm'
  items: string[]
  question: string
  options: string[]
}

export interface GeminiHtml {
  type: 'html'
  content: string
}

export type GeminiResponse = GeminiQuestion | GeminiConfirm | GeminiHtml | { type: 'error'; content: string }

async function fetchGemini(apiKey: string, model: string, messages: GeminiMessage[]) {
  const res = await fetch(geminiUrl(model), {
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
  return res
}

export async function chatWithGemini(messages: GeminiMessage[]): Promise<GeminiResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured')

  let res: Response | null = null
  let lastErr = ''

  for (const model of GEMINI_MODELS) {
    res = await fetchGemini(apiKey, model, messages)
    if (res.ok) break
    lastErr = await res.text()
    // Only fallback on overload/server errors; stop on auth/quota errors
    if (res.status !== 429 && res.status !== 503 && res.status !== 500) break
    console.warn(`[Gemini] ${model} returned ${res.status}, trying next model...`)
  }

  if (!res || !res.ok) {
    throw new Error(`Gemini API error ${res?.status ?? 'unknown'}: ${lastErr}`)
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

    if (parsed.type === 'confirm' && Array.isArray(parsed.items) && parsed.question) {
      return {
        type: 'confirm',
        items: parsed.items.slice(0, 8),
        question: parsed.question,
        options: Array.isArray(parsed.options) ? parsed.options.slice(0, 4) : ['Tạo luôn đi!'],
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
