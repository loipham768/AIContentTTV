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

export async function serverIsolateCss(html: string, css: string): Promise<string> {
  const { default: juice } = await import('juice')
  const resolvedCss = resolveCssVariables(css)

  let inlined = juice.inlineContent(html, resolvedCss)

  // Strip <script> tags
  inlined = inlined.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Strip class attributes
  inlined = inlined.replace(/\s+class=(?:"[^"]*"|'[^']*')/gi, '')

  // Strip data-* attributes (GrapesJS internal attributes)
  inlined = inlined.replace(/\s+data-[\w-]+=(?:"[^"]*"|'[^']*')/gi, '')

  return inlined.trim()
}
