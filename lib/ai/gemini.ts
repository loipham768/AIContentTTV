export type ContentType = "landing" | "article" | "ads";

interface ModelRoute {
  models: string[];
  temperature: number;
}

// Model routing: chọn model tốt nhất cho từng loại nội dung
// landing/ads → gemini-2.5-pro (reasoning phức tạp, creativity cao)
// article → gemini-2.5-flash (viết cấu trúc, nhanh, tiết kiệm)
const ROUTE: Record<ContentType, ModelRoute> = {
  landing: {
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    temperature: 0.8,
  },
  ads: {
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    temperature: 0.9,
  },
  article: {
    models: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
    temperature: 0.6,
  },
};

const DEFAULT_ROUTE: ModelRoute = {
  models: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
  temperature: 0.7,
};

function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

const SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn nội dung & thiết kế web, nhiệm vụ là hỏi đủ thông tin để tạo ra sản phẩm hoàn thiện 80–90% ngay lần đầu. Hãy hỏi như một người tư vấn thật sự — thân thiện, cụ thể, không hỏi chung chung.

═══════════════════════════════════════
QUY TẮC HỎI BẮT BUỘC
═══════════════════════════════════════

QUAN TRỌNG: KHÔNG BAO GIỜ tạo HTML ngay từ đầu, dù user cung cấp nhiều thông tin. Phải hỏi đủ các mục trong checklist tương ứng loại content trước.

Mỗi lượt chỉ 1 câu hỏi (có thể gộp 2 ý liên quan nếu chúng đi cùng nhau tự nhiên).

Cách đặt câu hỏi:
- Luôn kèm ví dụ cụ thể trong hint để user dễ hình dung
- Hỏi tự nhiên như đang tư vấn: "Bạn muốn khách hàng làm gì sau khi xem trang — đăng ký, mua ngay, hay liên hệ tư vấn?"
- Đừng hỏi những gì user đã nói rõ trong yêu cầu ban đầu

═══════════════════════════════════════
CHECKLIST THEO LOẠI CONTENT
═══════════════════════════════════════

📄 LANDING PAGE — phải hỏi đủ 6 mục sau:
1. Tên thương hiệu / sản phẩm / dịch vụ (nếu chưa có)
2. Đối tượng khách hàng mục tiêu
3. CTA chính (mua ngay / đăng ký / liên hệ / nhận tư vấn / tải app...)
4. Phong cách thiết kế & màu sắc
5. Điểm nổi bật / USP (lý do khách hàng nên chọn)
6. Sections cần có (hero, tính năng, giá, testimonial, FAQ, footer...)

✍️ BÀI VIẾT — phải hỏi đủ 5 mục:
1. Mục tiêu bài viết (SEO tăng traffic / giới thiệu sản phẩm / chia sẻ kiến thức / bán hàng)
2. Đối tượng độc giả chính
3. Phong cách & màu sắc (chuyên nghiệp, thân thiện, hài hước, tối giản...)
4. Độ dài & cấu trúc mong muốn
5. Các điểm/thông điệp chính cần đề cập

📢 QUẢNG CÁO — phải hỏi đủ 5 mục:
1. Nền tảng chạy (Facebook / Instagram / Google / TikTok / Zalo / khác)
2. Mục tiêu chiến dịch (tăng nhận diện / thu lead / chốt sale / tăng follow)
3. Đối tượng mục tiêu & insight nổi bật
4. Ưu đãi / USP chính muốn truyền tải
5. Phong cách sáng tạo & CTA

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

⚠️ CẢNH BÁO QUAN TRỌNG NHẤT: TUYỆT ĐỐI không bao giờ trả về text thường (plain text). Mọi response đều PHẢI là một JSON object hợp lệ duy nhất. Không được viết câu chào, câu giải thích, hay bất kỳ text nào ngoài JSON.

SAI (không bao giờ làm thế này):
Tuyệt vời! Bạn có thể cho tôi biết...

ĐÚNG (luôn làm thế này):
{"type":"question","question":"Câu hỏi?","hint":"...","options":["A","B","C"]}

Khi hỏi — BẮT BUỘC luôn có options (3–4 lựa chọn cụ thể):
{"type":"question","question":"Câu hỏi tự nhiên, thân thiện?","hint":"Ví dụ cụ thể giúp user dễ hình dung — hoặc bỏ trống nếu câu hỏi đã đủ rõ","options":["Lựa chọn cụ thể A","Lựa chọn cụ thể B","Lựa chọn cụ thể C","Lựa chọn cụ thể D"]}

Lưu ý options: KHÔNG cần thêm "Tự nhập" vào options — giao diện đã tự động hiển thị ô nhập tự do bên cạnh. Chỉ đưa ra các lựa chọn nội dung thực sự hữu ích.

Khi đã hỏi đủ tất cả mục trong checklist, TRƯỚC KHI tạo HTML hãy xác nhận lại:
{"type":"confirm","items":["Tên / sản phẩm: ...","Đối tượng: ...","CTA: ...","Phong cách: ...","Màu sắc: ...","Sections: ..."],"question":"Mình đã có đủ thông tin để tạo cho bạn rồi! Xem lại nhé — bạn muốn chỉnh gì thêm không?","options":["Hãy tạo nội dung ngay!","Muốn chỉnh tone","Muốn đổi màu","Bổ sung thêm thông tin"]}

Khi user xác nhận (chọn "Hãy tạo nội dung ngay!" hoặc câu tương tự) → tạo HTML:
{"type":"html","content":"<!DOCTYPE html>...toàn bộ mã HTML..."}

QUAN TRỌNG:
- LUÔN trả về JSON hợp lệ, KHÔNG có bất kỳ text nào bên ngoài JSON
- KHÔNG dùng Markdown (###, **, *, --) trong bất kỳ trường nào
- Options PHẢI cụ thể, tự nhiên, gợi ý thực tế — không phải 'Lựa chọn 1', 'Tùy chọn A'
- 3–4 options mỗi câu, mỗi option tối đa 8 từ
- TUYỆT ĐỐI KHÔNG dùng dấu nháy kép " bên trong giá trị string của JSON. Nếu cần ví dụ, dùng dấu nháy đơn ' hoặc ngoặc góc «»
- Mảng items trong confirm: mỗi mục tối đa 10 từ, tóm tắt đúng thông tin đã thu thập
- Câu hỏi phải nghe như người thật đang tư vấn, không như điền khảo sát

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
Nếu thiếu thông tin cụ thể (giá, tên nhân vật...), tạo nội dung mẫu và thêm comment HTML <!-- TODO: thay thế nội dung này -->`;

export interface GeminiMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

export type GeminiResponseType = "question" | "confirm" | "html" | "ready_for_image" | "error";

export interface GeminiQuestion {
  type: "question";
  question: string;
  hint?: string;
  options: string[];
}

export interface GeminiConfirm {
  type: "confirm";
  items: string[];
  question: string;
  options: string[];
}

export interface GeminiHtml {
  type: "html";
  content: string;
}

export interface GeminiReadyForImage {
  type: "ready_for_image";
  imagePrompt: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3";
}

export type GeminiResponse =
  | GeminiQuestion
  | GeminiConfirm
  | GeminiHtml
  | GeminiReadyForImage
  | { type: "error"; content: string };

const ADS_SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn quảng cáo, nhiệm vụ là hỏi đủ thông tin để tạo ra banner quảng cáo đẹp mắt bằng AI image generation.

═══════════════════════════════════════
QUY TẮC HỎI BẮT BUỘC
═══════════════════════════════════════

QUAN TRỌNG: KHÔNG BAO GIỜ tạo banner ngay từ đầu. Phải hỏi đủ 5 mục bên dưới.
Mỗi lượt chỉ 1 câu hỏi (có thể gộp 2 ý liên quan).
Luôn kèm ví dụ cụ thể. Đừng hỏi những gì user đã nói rõ.

📢 QUẢNG CÁO — phải hỏi đủ 5 mục:
1. Nền tảng chạy (Facebook / Instagram / Google / TikTok / Zalo / khác)
2. Mục tiêu chiến dịch (tăng nhận diện / thu lead / chốt sale / tăng follow)
3. Đối tượng mục tiêu & insight nổi bật
4. Ưu đãi / USP chính muốn truyền tải (giảm giá bao nhiêu %, thông điệp gì)
5. Phong cách sáng tạo & màu sắc chủ đạo

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

⚠️ Mọi response PHẢI là một JSON object hợp lệ duy nhất. Không được viết text nào ngoài JSON.

Khi hỏi:
{"type":"question","question":"Câu hỏi?","hint":"Ví dụ cụ thể","options":["A","B","C","D"]}

Khi đã hỏi đủ 5 mục — xác nhận lại:
{"type":"confirm","items":["Nền tảng: ...","Mục tiêu: ...","Đối tượng: ...","USP: ...","Phong cách: ..."],"question":"Mình đã có đủ thông tin để tạo banner cho bạn! Xem lại nhé?","options":["Tạo banner ngay!","Muốn chỉnh màu sắc","Muốn đổi thông điệp","Bổ sung thêm thông tin"]}

Khi user xác nhận → tạo image prompt cho Imagen 3:
{"type":"ready_for_image","imagePrompt":"...prompt tiếng Anh chi tiết...","aspectRatio":"1:1"}

═══════════════════════════════════════
QUY TẮC TẠO IMAGE PROMPT
═══════════════════════════════════════

imagePrompt PHẢI bằng tiếng Anh, 80-150 từ, mô tả đầy đủ:
- Loại: "Professional advertising banner for [product/service]"
- Visual chính: sản phẩm, hình ảnh gợi cảm xúc, bối cảnh
- Màu sắc & phong cách: màu cụ thể (hex hoặc tên màu tiếng Anh), modern/vibrant/elegant/bold...
- Text trên banner: headline ngắn gọn (<=5 từ), offer (VD: "50% OFF"), CTA button text
- Style: "commercial advertising photography, clean layout, high quality, sharp, professional"
- KHÔNG dùng dấu nháy kép " bên trong imagePrompt — dùng dấu nháy đơn ' hoặc bỏ qua

aspectRatio theo nền tảng:
- Facebook/Instagram feed, Zalo, mặc định: "1:1"
- Facebook/Instagram Story, TikTok, Reels: "9:16"
- Google Display, YouTube, banner ngang: "16:9"
- Pinterest: "4:3"

QUAN TRỌNG:
- TUYỆT ĐỐI KHÔNG dùng dấu nháy kép " bên trong string value của JSON
- options PHẢI cụ thể, tự nhiên — không phải 'Lựa chọn 1'
- 3-4 options mỗi câu`

// Walk character-by-character to extract the first balanced JSON object.
// Handles the case where Gemini returns multiple JSON objects in one response.
function extractFirstJson(text: string): unknown | null {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\" && inString) {
      escaped = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) return null;
  const slice = text.slice(start, end + 1);

  try {
    return JSON.parse(slice);
  } catch {
    // JSON.parse failed — likely Gemini put unescaped " inside a string value.
    // Try regex-based field extraction as a resilient fallback.
    return extractFieldsViaRegex(slice);
  }
}

// Regex-based fallback for when JSON.parse fails on Gemini's response.
// Extracts known fields by using adjacent key names as delimiters so that
// unescaped quotes inside string values don't break extraction.
function extractFieldsViaRegex(text: string): unknown | null {
  const typeMatch = text.match(/"type"\s*:\s*"(question|confirm|html)"/);
  if (!typeMatch) return null;
  const type = typeMatch[1];

  // Extract options/items arrays — these are short strings, rarely have unescaped quotes
  function extractArray(key: string): string[] {
    const m = text.match(new RegExp(`"${key}"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
    if (!m) return [];
    const items: string[] = [];
    const re = /"((?:[^"\\]|\\.)*)"/g;
    let match;
    while ((match = re.exec(m[1])) !== null) items.push(match[1]);
    return items;
  }

  // Extract a string value between two known adjacent key names.
  // Delimiter pattern: `","<nextKey>"` which is very unlikely to appear inside question text.
  function extractStringBetweenKeys(afterKey: string, beforeKeys: string[]): string {
    const startMarker = `"${afterKey}"`;
    const startIdx = text.indexOf(startMarker);
    if (startIdx === -1) return "";
    const valueStart = text.indexOf('"', startIdx + startMarker.length + 1) + 1;
    if (valueStart <= 0) return "";

    let bestEnd = -1;
    for (const k of beforeKeys) {
      const pattern = `","${k}"`;
      const idx = text.indexOf(pattern, valueStart);
      if (idx !== -1 && (bestEnd === -1 || idx < bestEnd)) bestEnd = idx;
    }

    if (bestEnd === -1) {
      // No delimiter found — grab up to 400 chars, stop at closing quote before structural char
      const chunk = text.slice(valueStart, valueStart + 400);
      const m = chunk.match(/^([\s\S]*?)"[\s,}\]]/);
      return m ? m[1] : chunk;
    }
    return text.slice(valueStart, bestEnd);
  }

  if (type === "html") {
    const question = extractStringBetweenKeys("content", ["type"]);
    if (question) return { type: "html", content: question.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\") };
    return null;
  }

  if (type === "question") {
    const question = extractStringBetweenKeys("question", ["hint", "options", "items", "confirm"]);
    const hint = extractStringBetweenKeys("hint", ["options", "items", "type"]);
    const options = extractArray("options");
    return {
      type: "question",
      question,
      hint: hint || undefined,
      options,
    };
  }

  if (type === "confirm") {
    const question = extractStringBetweenKeys("question", ["hint", "options", "items"]);
    const items = extractArray("items");
    const options = extractArray("options");
    return { type: "confirm", question, items, options };
  }

  return null;
}

// Statuses đáng retry: 503 (overload), 429 (rate limit), 500 (server error tạm thời)
const RETRYABLE = new Set([429, 500, 503]);
const MAX_ATTEMPTS = 3; // 1 lần gốc + 2 lần retry
const RETRY_BASE_MS = 1000; // 1s, 2s (exponential backoff)

async function fetchGeminiWithPrompt(
  apiKey: string,
  model: string,
  messages: GeminiMessage[],
  temperature: number = 0.7,
  systemPrompt: string = SYSTEM_PROMPT,
): Promise<Response> {
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: messages,
    generationConfig: {
      temperature,
      maxOutputTokens: 65536,
      responseMimeType: "application/json",
    },
  });

  let lastRes: Response | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_BASE_MS * 2 ** (attempt - 1); // 1000ms, 2000ms
      console.warn(`[Gemini] ${model} retry ${attempt}/${MAX_ATTEMPTS - 1} after ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }

    const res = await fetch(geminiUrl(model), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
      body,
    });

    if (res.ok) return res;
    lastRes = res;

    // Không retry với lỗi auth/bad request — lỗi đó retry cũng vô nghĩa
    if (!RETRYABLE.has(res.status)) return res;

    console.warn(`[Gemini] ${model} attempt ${attempt + 1} status ${res.status}`);
  }

  return lastRes!;
}

// Keep old name as alias so existing call sites (if any) don't break
const fetchGemini = fetchGeminiWithPrompt

export async function chatWithGemini(
  messages: GeminiMessage[],
  contentType?: ContentType,
): Promise<GeminiResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_AI_API_KEY is not configured");

  const { models, temperature } = contentType ? ROUTE[contentType] : DEFAULT_ROUTE;
  const systemPrompt = contentType === "ads" ? ADS_SYSTEM_PROMPT : SYSTEM_PROMPT;
  console.log(`[Gemini] content=${contentType ?? "default"} → primary=${models[0]} temp=${temperature}`);

  let res: Response | null = null;
  let lastErr = "";

  for (const model of models) {
    res = await fetchGeminiWithPrompt(apiKey, model, messages, temperature, systemPrompt);
    if (res.ok) break;
    lastErr = await res.text();
    // Only fallback on overload/server errors; stop on auth/quota errors
    if (res.status !== 429 && res.status !== 503 && res.status !== 500) break;
    console.warn(`[Gemini] ${model} returned ${res.status}, trying next model...`);
  }

  if (!res || !res.ok) {
    throw new Error(`Gemini API error ${res?.status ?? "unknown"}: ${lastErr}`);
  }

  const data = await res.json();
  const rawText: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  // Strip markdown code fences if Gemini wraps the JSON
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Extract the first complete JSON object from the response.
  // Gemini sometimes returns multiple JSON objects; we only need the first one.
  const parsed = extractFirstJson(cleaned);

  if (parsed !== null) {
    if (
      (parsed as Record<string, unknown>).type === "question" &&
      (parsed as Record<string, unknown>).question &&
      Array.isArray((parsed as Record<string, unknown>).options)
    ) {
      const p = parsed as Record<string, unknown>;
      const opts = (p.options as string[]).filter(Boolean).slice(0, 4);
      return {
        type: "question",
        question: p.question as string,
        hint: (p.hint as string | undefined) ?? undefined,
        // If Gemini returned empty options, inject generic fallbacks so the UI always shows choices
        options:
          opts.length >= 2
            ? opts
            : [
                "Đúng rồi, phù hợp",
                "Cần điều chỉnh thêm",
                "Bạn tư vấn giúp mình",
              ],
      };
    }

    if (
      (parsed as Record<string, unknown>).type === "confirm" &&
      Array.isArray((parsed as Record<string, unknown>).items) &&
      (parsed as Record<string, unknown>).question
    ) {
      const p = parsed as Record<string, unknown>;
      return {
        type: "confirm",
        items: (p.items as string[]).slice(0, 8),
        question: p.question as string,
        options: Array.isArray(p.options)
          ? (p.options as string[]).slice(0, 4)
          : ["Hãy tạo nội dung ngay!"],
      };
    }

    if (
      (parsed as Record<string, unknown>).type === "html" &&
      (parsed as Record<string, unknown>).content
    ) {
      const p = parsed as Record<string, unknown>;
      return { type: "html", content: p.content as string };
    }

    if (
      (parsed as Record<string, unknown>).type === "ready_for_image" &&
      (parsed as Record<string, unknown>).imagePrompt
    ) {
      const p = parsed as Record<string, unknown>;
      const validRatios = ["1:1", "16:9", "9:16", "4:3"];
      const aspectRatio = validRatios.includes(p.aspectRatio as string)
        ? (p.aspectRatio as "1:1" | "16:9" | "9:16" | "4:3")
        : "1:1";
      return { type: "ready_for_image", imagePrompt: p.imagePrompt as string, aspectRatio };
    }
  }

  // Gemini returned raw HTML without JSON wrapper
  if (/^\s*<!DOCTYPE\s+html/i.test(cleaned) || /^\s*<html/i.test(cleaned)) {
    return { type: "html", content: cleaned };
  }

  // JSON.parse failed (often truncated response) but HTML is embedded — extract it.
  // The HTML is JSON-string-escaped inside the content field, so unescape it.
  const htmlIdx = rawText.search(/<!DOCTYPE\s+html/i);
  if (htmlIdx !== -1) {
    let extracted = rawText.slice(htmlIdx);
    // Strip trailing JSON string artifacts: closing quote, braces
    extracted = extracted.replace(/"\s*\}?\s*$/, "").trimEnd();
    // Unescape JSON string encoding (\n → newline, \" → ", \\ → \)
    extracted = extracted
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
    return { type: "html", content: extracted };
  }

  // Final fallback: something unexpected — never expose raw JSON/text to UI
  console.warn("[Gemini] Could not parse response, raw text:", rawText.slice(0, 200));
  return {
    type: "question",
    question: "Bạn có thể mô tả thêm về nội dung bạn muốn tạo không?",
    options: ["Tiếp tục", "Bắt đầu lại", "Bạn tư vấn giúp mình"],
  };
}
