export type ContentType = "content" | "report";

interface ModelRoute {
  models: string[];
  temperature: number;
}

const ROUTE: Record<ContentType, ModelRoute> = {
  content: {
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    temperature: 0.8,
  },
  report: {
    models: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
    temperature: 0.5,
  },
};

const DEFAULT_ROUTE: ModelRoute = {
  models: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
  temperature: 0.7,
};

function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

const CONTENT_SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn nội dung & thiết kế web, nhiệm vụ là hỏi đủ thông tin để tạo ra sản phẩm hoàn thiện 80–90% ngay lần đầu. Hãy hỏi như một người tư vấn thật sự — thân thiện, cụ thể, không hỏi chung chung.

═══════════════════════════════════════
QUY TẮC HỎI BẮT BUỘC
═══════════════════════════════════════

QUAN TRỌNG: KHÔNG BAO GIỜ tạo HTML ngay từ đầu, dù user cung cấp nhiều thông tin. Phải hỏi đủ các mục trong checklist trước.

Mỗi lượt chỉ 1 câu hỏi (có thể gộp 2 ý liên quan nếu chúng đi cùng nhau tự nhiên).

Cách đặt câu hỏi:
- Luôn kèm ví dụ cụ thể trong hint để user dễ hình dung
- Hỏi tự nhiên như đang tư vấn: "Bạn muốn khách hàng làm gì sau khi xem trang — đăng ký, mua ngay, hay liên hệ tư vấn?"
- Đừng hỏi những gì user đã nói rõ trong yêu cầu ban đầu

═══════════════════════════════════════
CHECKLIST — phải hỏi đủ 6 mục:
═══════════════════════════════════════

1. Tên thương hiệu / sản phẩm / dịch vụ (nếu chưa có)
2. Đối tượng khách hàng mục tiêu
3. CTA chính (mua ngay / đăng ký / liên hệ / nhận tư vấn / tải app...)
4. Phong cách thiết kế & màu sắc
5. Điểm nổi bật / USP (lý do khách hàng nên chọn)
6. Sections cần có (hero, tính năng, giá, testimonial, FAQ, footer...)

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

⚠️ Mọi response PHẢI là một JSON object hợp lệ duy nhất. Không được viết text nào ngoài JSON.

Khi hỏi — BẮT BUỘC luôn có options (3–4 lựa chọn cụ thể):
{"type":"question","question":"Câu hỏi tự nhiên, thân thiện?","hint":"Ví dụ cụ thể","options":["Lựa chọn A","Lựa chọn B","Lựa chọn C","Lựa chọn D"]}

Khi đã hỏi đủ tất cả mục — xác nhận lại:
{"type":"confirm","items":["Tên / sản phẩm: ...","Đối tượng: ...","CTA: ...","Phong cách: ...","Màu sắc: ...","Sections: ..."],"question":"Mình đã có đủ thông tin để tạo cho bạn rồi! Xem lại nhé — bạn muốn chỉnh gì thêm không?","options":["Hãy tạo nội dung ngay!","Muốn chỉnh tone","Muốn đổi màu","Bổ sung thêm thông tin"]}

Khi user xác nhận → tạo HTML:
{"type":"html","content":"<!DOCTYPE html>...toàn bộ mã HTML..."}

QUAN TRỌNG:
- LUÔN trả về JSON hợp lệ, KHÔNG có bất kỳ text nào bên ngoài JSON
- KHÔNG dùng Markdown (###, **, *, --) trong bất kỳ trường nào
- Options PHẢI cụ thể, tự nhiên — không phải 'Lựa chọn 1'
- 3–4 options mỗi câu, mỗi option tối đa 8 từ
- TUYỆT ĐỐI KHÔNG dùng dấu nháy kép " bên trong giá trị string của JSON

═══════════════════════════════════════
YÊU CẦU KHI TẠO HTML
═══════════════════════════════════════

- Cấu trúc đầy đủ từ <!DOCTYPE html> đến </html>
- CSS viết trong thẻ <style> trong <head>; có thể dùng Google Fonts qua @import

CSS — QUY TẮC BẮT BUỘC:
  * TUYỆT ĐỐI KHÔNG dùng CSS custom properties hay CSS variables (:root, var(--x))
  * Luôn viết giá trị trực tiếp: background-color: #1b4332
  * KHÔNG dùng shorthand background khi chỉ cần background-color

RESPONSIVE — BẮT BUỘC:
  * Dùng flexbox hoặc CSS grid cho mọi layout nhiều cột
  * Font size dùng clamp(): clamp(14px, 2.5vw, 18px)
  * Media query @media (max-width: 768px): các cột chuyển về 1 cột

TUYỆT ĐỐI không có <script> hay JavaScript
Nội dung hoàn toàn bằng tiếng Việt, thực tế (không dùng lorem ipsum)
Thiết kế hiện đại, chuyên nghiệp, đúng màu sắc và phong cách đã chọn
Nếu thiếu thông tin cụ thể, tạo nội dung mẫu và thêm comment HTML <!-- TODO: thay thế nội dung này -->`;

const REPORT_SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn tạo báo cáo chuyên nghiệp dạng HTML, nhiệm vụ là hỏi đủ thông tin để tạo ra báo cáo hoàn thiện 80–90% ngay lần đầu. Hãy hỏi như một business analyst thật sự — rõ ràng, có cấu trúc, đúng trọng tâm.

═══════════════════════════════════════
QUY TẮC HỎI BẮT BUỘC
═══════════════════════════════════════

QUAN TRỌNG: KHÔNG BAO GIỜ tạo HTML ngay từ đầu. Phải hỏi đủ 5 mục trong checklist trước.
Mỗi lượt chỉ 1 câu hỏi. Đừng hỏi những gì user đã nói rõ.

📊 CHECKLIST BÁO CÁO — phải hỏi đủ 5 mục:
1. Loại báo cáo & mục tiêu (kinh doanh / tài chính / dự án / phân tích thị trường / nhân sự / kỹ thuật)
2. Đối tượng đọc (ban lãnh đạo / khách hàng / nội bộ team / nhà đầu tư)
3. Dữ liệu chính cần trình bày (số liệu, KPI, timeline, kết quả...)
4. Kỳ báo cáo & phạm vi (tháng / quý / năm / theo dự án)
5. Phong cách trình bày (tối giản chuyên nghiệp / màu sắc thương hiệu / corporate / data-heavy)

═══════════════════════════════════════
ĐỊNH DẠNG PHẢN HỒI — BẮT BUỘC TUYỆT ĐỐI
═══════════════════════════════════════

⚠️ Mọi response PHẢI là một JSON object hợp lệ duy nhất. Không text nào ngoài JSON.

Khi hỏi:
{"type":"question","question":"Câu hỏi rõ ràng, chuyên nghiệp?","hint":"Ví dụ cụ thể","options":["A","B","C","D"]}

Khi đã hỏi đủ 5 mục — xác nhận:
{"type":"confirm","items":["Loại báo cáo: ...","Đối tượng: ...","Dữ liệu chính: ...","Kỳ báo cáo: ...","Phong cách: ..."],"question":"Mình đã có đủ thông tin để tạo báo cáo cho bạn! Xem lại nhé?","options":["Tạo báo cáo ngay!","Muốn chỉnh phong cách","Muốn thêm dữ liệu","Bổ sung thêm thông tin"]}

Khi user xác nhận → tạo HTML:
{"type":"html","content":"<!DOCTYPE html>...toàn bộ mã HTML..."}

QUAN TRỌNG:
- LUÔN trả về JSON hợp lệ, KHÔNG text nào bên ngoài JSON
- TUYỆT ĐỐI KHÔNG dùng dấu nháy kép " bên trong string value của JSON
- Options PHẢI cụ thể, tự nhiên

═══════════════════════════════════════
YÊU CẦU KHI TẠO HTML BÁO CÁO
═══════════════════════════════════════

STRUCTURE BÁO CÁO — BẮT BUỘC có đầy đủ:
- Header: logo placeholder, tên báo cáo, kỳ báo cáo, ngày tạo
- Executive Summary: tóm tắt điểm chính 3–5 bullet points
- KPI Cards: các chỉ số quan trọng hiển thị dạng card nổi bật (số lớn, label, % thay đổi)
- Nội dung chính: bảng dữ liệu, phân tích theo mục, so sánh kỳ trước
- Chart placeholders: dùng CSS để tạo bar chart / progress bar đơn giản mô phỏng dữ liệu
- Nhận xét & Đề xuất: phân tích điểm mạnh, điểm yếu, khuyến nghị
- Footer: thông tin công ty placeholder, trang số

CSS — QUY TẮC BẮT BUỘC:
  * TUYỆT ĐỐI KHÔNG dùng CSS custom properties hay CSS variables (:root, var(--x))
  * Luôn viết giá trị trực tiếp: color: #1e3a5f
  * In-page print styles: @media print { body { font-size: 11pt; } }

RESPONSIVE — BẮT BUỘC:
  * Layout dạng tài liệu: max-width 960px, căn giữa, padding đủ
  * KPI cards: grid 3–4 cột → 2 cột → 1 cột trên mobile
  * Bảng dữ liệu: overflow-x: auto khi màn hình nhỏ

THIẾT KẾ:
  * Font: chuyên nghiệp (Inter, Roboto, hoặc system-ui)
  * Màu sắc: neutral, corporate — xanh navy, xám, trắng là chủ đạo
  * Số liệu quan trọng: font-size lớn, màu nổi bật
  * Bảng: border rõ ràng, header có nền màu, alternate row colors

TUYỆT ĐỐI không có <script> hay JavaScript
Nội dung tiếng Việt, dữ liệu mẫu thực tế và hợp lý
Nếu thiếu số liệu cụ thể, điền dữ liệu mẫu và thêm <!-- TODO: thay số liệu thực -->`;

export interface GeminiMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

export type GeminiResponseType = "question" | "confirm" | "html" | "error";

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

export type GeminiResponse =
  | GeminiQuestion
  | GeminiConfirm
  | GeminiHtml
  | { type: "error"; content: string };

function extractFirstJson(text: string): unknown | null {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\" && inString) { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }

  if (end === -1) return null;
  const slice = text.slice(start, end + 1);

  try {
    return JSON.parse(slice);
  } catch {
    return extractFieldsViaRegex(slice);
  }
}

function extractFieldsViaRegex(text: string): unknown | null {
  const typeMatch = text.match(/"type"\s*:\s*"(question|confirm|html)"/);
  if (!typeMatch) return null;
  const type = typeMatch[1];

  function extractArray(key: string): string[] {
    const m = text.match(new RegExp(`"${key}"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
    if (!m) return [];
    const items: string[] = [];
    const re = /"((?:[^"\\]|\\.)*)"/g;
    let match;
    while ((match = re.exec(m[1])) !== null) items.push(match[1]);
    return items;
  }

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
      const chunk = text.slice(valueStart, valueStart + 400);
      const m = chunk.match(/^([\s\S]*?)"[\s,}\]]/);
      return m ? m[1] : chunk;
    }
    return text.slice(valueStart, bestEnd);
  }

  if (type === "html") {
    const content = extractStringBetweenKeys("content", ["type"]);
    if (content) return { type: "html", content: content.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\") };
    return null;
  }

  if (type === "question") {
    const question = extractStringBetweenKeys("question", ["hint", "options", "items", "confirm"]);
    const hint = extractStringBetweenKeys("hint", ["options", "items", "type"]);
    const options = extractArray("options");
    return { type: "question", question, hint: hint || undefined, options };
  }

  if (type === "confirm") {
    const question = extractStringBetweenKeys("question", ["hint", "options", "items"]);
    const items = extractArray("items");
    const options = extractArray("options");
    return { type: "confirm", question, items, options };
  }

  return null;
}

const RETRYABLE = new Set([429, 500, 503]);
const MAX_ATTEMPTS = 3;
const RETRY_BASE_MS = 1000;

async function fetchGeminiWithPrompt(
  apiKey: string,
  model: string,
  messages: GeminiMessage[],
  temperature: number = 0.7,
  systemPrompt: string = CONTENT_SYSTEM_PROMPT,
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
      const delay = RETRY_BASE_MS * 2 ** (attempt - 1);
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
    if (!RETRYABLE.has(res.status)) return res;
    console.warn(`[Gemini] ${model} attempt ${attempt + 1} status ${res.status}`);
  }

  return lastRes!;
}

export async function chatWithGemini(
  messages: GeminiMessage[],
  contentType?: ContentType,
): Promise<GeminiResponse> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_AI_API_KEY is not configured");

  const { models, temperature } = contentType ? ROUTE[contentType] : DEFAULT_ROUTE;
  const systemPrompt = contentType === "report" ? REPORT_SYSTEM_PROMPT : CONTENT_SYSTEM_PROMPT;

  console.log(`[Gemini] content=${contentType ?? "default"} → primary=${models[0]} temp=${temperature}`);

  let res: Response | null = null;
  let lastErr = "";

  for (const model of models) {
    res = await fetchGeminiWithPrompt(apiKey, model, messages, temperature, systemPrompt);
    if (res.ok) break;
    lastErr = await res.text();
    if (res.status !== 429 && res.status !== 503 && res.status !== 500) break;
    console.warn(`[Gemini] ${model} returned ${res.status}, trying next model...`);
  }

  if (!res || !res.ok) {
    throw new Error(`Gemini API error ${res?.status ?? "unknown"}: ${lastErr}`);
  }

  const data = await res.json();
  const rawText: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = extractFirstJson(cleaned);

  if (parsed !== null) {
    if (
      (parsed as Record<string, unknown>).type === "question" &&
      (parsed as Record<string, unknown>).question &&
      Array.isArray((parsed as Record<string, unknown>).options)
    ) {
      const p = parsed as Record<string, unknown>;
      return {
        type: "question",
        question: p.question as string,
        hint: (p.hint as string | undefined) ?? undefined,
        options: (p.options as string[]).filter(Boolean).slice(0, 4),
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
  }

  if (/^\s*<!DOCTYPE\s+html/i.test(cleaned) || /^\s*<html/i.test(cleaned)) {
    return { type: "html", content: cleaned };
  }

  const htmlIdx = rawText.search(/<!DOCTYPE\s+html/i);
  if (htmlIdx !== -1) {
    let extracted = rawText.slice(htmlIdx);
    extracted = extracted.replace(/"\s*\}?\s*$/, "").trimEnd();
    extracted = extracted
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
    return { type: "html", content: extracted };
  }

  console.warn("[Gemini] Could not parse response, raw text:", rawText.slice(0, 200));
  return {
    type: "error",
    content: "AI trả về phản hồi không hợp lệ. Vui lòng thử lại.",
  };
}
