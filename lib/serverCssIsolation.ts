// Node.js-safe CSS isolation — no DOMParser, uses regex cleanup + juice

function resolveCssVariables(css: string): string {
  const vars: Record<string, string> = {}
  const declPattern = /--([\w-]+)\s*:\s*([^;}\n]+)/g
  let m: RegExpExecArray | null
  while ((m = declPattern.exec(css)) !== null) {
    vars[`--${m[1]}`] = m[2].trim()
  }
  if (Object.keys(vars).length === 0) return css

  let resolved = css
  for (let pass = 0; pass < 5; pass++) {
    resolved = resolved.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\s*\)/g,
      (_, name: string, fallback: string | undefined) =>
        vars[name] ?? fallback?.trim() ?? name,
    )
    if (!resolved.includes('var(')) break
  }
  return resolved
}

/**
 * Extract @keyframes blocks using brace-depth tracking so nested
 * keyframe stops (0% { } 100% { }) are captured correctly.
 * Also extracts @font-face blocks which juice cannot inline.
 */
function extractUninlineable(css: string): string[] {
  const blocks: string[] = []
  // Match any at-rule that requires a block and cannot be inlined
  const atPattern = /@(?:-webkit-|-moz-|-ms-|-o-)?(?:keyframes|font-face)\s+[^{]*/g
  let match: RegExpExecArray | null

  while ((match = atPattern.exec(css)) !== null) {
    const start = match.index
    let depth = 0
    let i = start
    let found = false
    while (i < css.length) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') {
        depth--
        if (depth === 0) {
          blocks.push(css.slice(start, i + 1))
          found = true
          break
        }
      }
      i++
    }
    // Advance regex past this block to avoid re-matching inner content
    if (found) atPattern.lastIndex = i + 1
  }

  return blocks
}

export async function serverIsolateCss(html: string, css: string): Promise<string> {
  const { default: juice } = await import('juice')
  const resolvedCss = resolveCssVariables(css)

  // Pull out @keyframes / @font-face before juice runs — juice drops them
  // because they are at-rules that cannot be inlined into element style attrs.
  const uninlineable = extractUninlineable(resolvedCss)

  let inlined = juice.inlineContent(html, resolvedCss)

  // Strip <script> tags
  inlined = inlined.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Strip class attributes
  inlined = inlined.replace(/\s+class=(?:"[^"]*"|'[^']*')/gi, '')

  // Strip data-* attributes (GrapesJS internal attributes)
  inlined = inlined.replace(/\s+data-[\w-]+=(?:"[^"]*"|'[^']*')/gi, '')

  // Re-inject @keyframes / @font-face so animations and custom fonts work
  if (uninlineable.length > 0) {
    const styleTag = `<style>${uninlineable.join('\n')}</style>`
    return styleTag + '\n' + inlined.trim()
  }

  return inlined.trim()
}

/**
 * Inline CSS into element style attributes for GrapesJS editor loading.
 * Unlike serverIsolateCss, this KEEPS class attributes so GrapesJS can
 * identify components. The result has both inline styles (editable via
 * GrapesJS Style Manager) and a <style> tag with original CSS rules
 * (for non-inlineable rules like @keyframes, @media, :root).
 * Returns a full HTML document string.
 */
export async function preprocessTemplateForEditor(fullHtml: string): Promise<string> {
  const { default: juice } = await import('juice')

  // Extract all <style> content
  const styleTags = fullHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) ?? []
  const rawCss = styleTags.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n')

  if (!rawCss.trim()) return fullHtml

  const resolvedCss = resolveCssVariables(rawCss)
  const uninlineable = extractUninlineable(resolvedCss)

  // Extract body HTML
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyHtml = bodyMatch?.[1] ?? ''
  if (!bodyHtml.trim()) return fullHtml

  // Inline CSS into elements — keep class attributes (no stripping)
  let inlined = juice.inlineContent(bodyHtml, resolvedCss)

  // Strip only <script> tags
  inlined = inlined.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Re-inject non-inlineable at-rules (@keyframes, @font-face) as <style> tag
  const stylePrefix = uninlineable.length > 0
    ? `<style>${uninlineable.join('\n')}</style>\n`
    : ''

  // Return full HTML doc: original <style> in <head> for fallback rendering,
  // plus inlined body so GrapesJS Style Manager can read/edit each element's styles.
  return `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><style>${resolvedCss}</style></head><body>${stylePrefix}${inlined.trim()}</body></html>`
}
