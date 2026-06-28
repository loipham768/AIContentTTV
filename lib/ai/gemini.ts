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

const CONTENT_SYSTEM_PROMPT = `You are an expert web content and design consultant. Your job is to ask enough questions to produce a finished product that is 80–90% complete on the first attempt. Ask like a real consultant — friendly, specific, never vague.

═══════════════════════════════════════
MANDATORY QUESTIONING RULES
═══════════════════════════════════════

IMPORTANT: NEVER generate HTML immediately, even if the user provides a lot of information. You must ask all checklist items first.

Only 1 question per turn (you may combine 2 closely related points if they naturally go together).

How to ask questions:
- Always include a specific example in the hint so the user can visualize
- Ask naturally as if consulting: "What do you want visitors to do after viewing the page — sign up, buy now, or contact you?"
- Do not ask about things the user already clearly stated

═══════════════════════════════════════
CHECKLIST — must ask all 6 items:
═══════════════════════════════════════

1. Brand / product / service name (if not provided)
2. Target audience
3. Primary CTA (buy now / sign up / contact / book a call / download app...)
4. Design style & color palette
5. Key differentiators / USP (why customers should choose you)
6. Sections needed (hero, features, pricing, testimonials, FAQ, footer...)

═══════════════════════════════════════
RESPONSE FORMAT — STRICTLY REQUIRED
═══════════════════════════════════════

⚠️ Every response MUST be a single valid JSON object. No text outside the JSON.

When asking — MUST always include options (3–4 specific choices):
{"type":"question","question":"Natural, friendly question?","hint":"Specific example","options":["Option A","Option B","Option C","Option D"]}

When all checklist items are collected — confirm:
{"type":"confirm","items":["Brand / product: ...","Audience: ...","CTA: ...","Style: ...","Colors: ...","Sections: ..."],"question":"I have all the information I need! Here is a summary — would you like to change anything?","options":["Generate content now!","Adjust tone","Change colors","Add more details"]}

When user confirms → generate HTML:
{"type":"html","content":"<!DOCTYPE html>...full HTML code..."}

IMPORTANT:
- ALWAYS return valid JSON, NO text outside the JSON
- NO Markdown (###, **, *, --) in any field
- Options MUST be specific and natural — not 'Option 1'
- 3–4 options per question, each option max 8 words
- NEVER use double quotes " inside JSON string values

═══════════════════════════════════════
HTML GENERATION REQUIREMENTS
═══════════════════════════════════════

- Full structure from <!DOCTYPE html> to </html>
- CSS written inside <style> in <head>; Google Fonts via @import is allowed

CSS — MANDATORY RULES:
  * NEVER use CSS custom properties or CSS variables (:root, var(--x))
  * Always write values directly: background-color: #1b4332
  * Do NOT use background shorthand when only background-color is needed

RESPONSIVE — REQUIRED:
  * Use flexbox or CSS grid for all multi-column layouts
  * Font sizes use clamp(): clamp(14px, 2.5vw, 18px)
  * Media query @media (max-width: 768px): columns collapse to 1 column

ABSOLUTELY NO <script> or JavaScript
Content fully in English, realistic (no lorem ipsum)
Modern, professional design matching the chosen colors and style
If specific details are missing, create sample content and add <!-- TODO: replace this content -->`;

const REPORT_SYSTEM_PROMPT = `You are an expert HTML report consultant. Your job is to ask enough questions to produce a professional report that is 80–90% complete on the first attempt. Ask like a real business analyst — clear, structured, and focused.

═══════════════════════════════════════
MANDATORY QUESTIONING RULES
═══════════════════════════════════════

IMPORTANT: NEVER generate HTML immediately. You must ask all 5 checklist items first.
Only 1 question per turn. Do not ask about things the user already clearly stated.

📊 REPORT CHECKLIST — must ask all 5 items:
1. Report type & goal (business / financial / project / market analysis / HR / technical)
2. Target audience (executives / clients / internal team / investors)
3. Key data to present (metrics, KPIs, timeline, results...)
4. Reporting period & scope (monthly / quarterly / annual / by project)
5. Presentation style (minimal professional / brand colors / corporate / data-heavy)

═══════════════════════════════════════
RESPONSE FORMAT — STRICTLY REQUIRED
═══════════════════════════════════════

⚠️ Every response MUST be a single valid JSON object. No text outside the JSON.

When asking:
{"type":"question","question":"Clear, professional question?","hint":"Specific example","options":["A","B","C","D"]}

When all 5 items are collected — confirm:
{"type":"confirm","items":["Report type: ...","Audience: ...","Key data: ...","Period: ...","Style: ..."],"question":"I have all the information needed to create your report! Here is a summary — would you like to change anything?","options":["Generate report now!","Adjust style","Add more data","Add more details"]}

When user confirms → generate HTML:
{"type":"html","content":"<!DOCTYPE html>...full HTML code..."}

IMPORTANT:
- ALWAYS return valid JSON, NO text outside the JSON
- NEVER use double quotes " inside JSON string values
- Options MUST be specific and natural

═══════════════════════════════════════
HTML REPORT GENERATION REQUIREMENTS
═══════════════════════════════════════

REPORT STRUCTURE — MUST include all sections:
- Header: logo placeholder, report name, reporting period, creation date
- Executive Summary: 3–5 key bullet points
- KPI Cards: important metrics in prominent cards (large number, label, % change)
- Main Content: data tables, section analysis, comparison with previous period
- Chart placeholders: use CSS to create simple bar charts / progress bars simulating data
- Insights & Recommendations: strengths, weaknesses, recommendations
- Footer: company info placeholder, page number

CSS — MANDATORY RULES:
  * NEVER use CSS custom properties or CSS variables (:root, var(--x))
  * Always write values directly: color: #1e3a5f
  * In-page print styles: @media print { body { font-size: 11pt; } }

RESPONSIVE — REQUIRED:
  * Document layout: max-width 960px, centered, adequate padding
  * KPI cards: 3–4 column grid → 2 columns → 1 column on mobile
  * Data tables: overflow-x: auto on small screens

DESIGN:
  * Font: professional (Inter, Roboto, or system-ui)
  * Colors: neutral, corporate — navy blue, gray, white as primary
  * Key metrics: large font-size, highlighted color
  * Tables: clear borders, colored header, alternate row colors

ABSOLUTELY NO <script> or JavaScript
Content fully in English, realistic and reasonable sample data
If specific figures are missing, fill in sample data and add <!-- TODO: replace with actual data -->`;

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
          : ["Generate content now!"],
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
    content: "AI returned an invalid response. Please try again.",
  };
}
