export type BannerAspectRatio = '1:1' | '16:9' | '9:16' | '4:3'

export interface ImagenResult {
  base64: string
  mimeType: string
}

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

// Gemini native image generation — available via standard Google AI Studio key
const IMAGE_GEN_MODELS = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp-image-generation',
]

const ASPECT_HINT: Record<BannerAspectRatio, string> = {
  '1:1':  'square format (1:1 aspect ratio)',
  '16:9': 'wide horizontal banner (16:9 aspect ratio)',
  '9:16': 'vertical story format (9:16 aspect ratio)',
  '4:3':  'standard rectangular (4:3 aspect ratio)',
}

export async function generateBannerImage(
  imagePrompt: string,
  aspectRatio: BannerAspectRatio = '1:1',
): Promise<ImagenResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not configured')

  const fullPrompt = `${imagePrompt}. Layout: ${ASPECT_HINT[aspectRatio]}.`

  let lastError = 'No models tried'
  for (const model of IMAGE_GEN_MODELS) {
    try {
      const res = await fetch(`${BASE_URL}/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { responseModalities: ['IMAGE'] },
        }),
      })

      if (!res.ok) {
        lastError = await res.text()
        console.warn(`[ImageGen] ${model} → ${res.status}`)
        continue
      }

      const data = await res.json()
      const part = (data.candidates?.[0]?.content?.parts ?? []).find(
        (p: Record<string, unknown>) => (p.inlineData as Record<string, unknown> | undefined)?.data,
      )
      if (!part) {
        lastError = 'No inlineData in response'
        continue
      }

      const inline = part.inlineData as { data: string; mimeType?: string }
      return { base64: inline.data, mimeType: inline.mimeType ?? 'image/png' }
    } catch (err) {
      lastError = String(err)
      console.warn(`[ImageGen] ${model} threw:`, err)
    }
  }

  throw new Error(`Image generation failed: ${lastError}`)
}
