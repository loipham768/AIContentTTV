// Browser-only: uses DOMParser — import only from 'use client' components

/**
 * Resolve CSS custom properties (var(--x)) in a CSS string.
 * juice cannot inline var() references, so we replace them with literal
 * values before handing the CSS to juice.
 * Also exported so callers can pre-resolve CSS before loading into GrapesJS
 * (GrapesJS may drop :root declarations, losing variable definitions on getCss()).
 */
export function resolveCssVariables(css: string): string {
  // 1. Collect all --name: value declarations from :root and * selectors
  const vars: Record<string, string> = {}
  const declPattern = /--([\w-]+)\s*:\s*([^;}\n]+)/g
  let m: RegExpExecArray | null
  while ((m = declPattern.exec(css)) !== null) {
    vars[`--${m[1]}`] = m[2].trim()
  }

  if (Object.keys(vars).length === 0) return css

  // 2. Replace var(--name) and var(--name, fallback) with resolved values.
  //    Do multiple passes so nested vars (var inside var fallback) also resolve.
  let resolved = css
  for (let pass = 0; pass < 5; pass++) {
    resolved = resolved.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\s*\)/g,
      (_, name: string, fallback: string | undefined) =>
        vars[name] ?? fallback?.trim() ?? name,
    )
    // Stop early if no var() references remain
    if (!resolved.includes('var(')) break
  }

  return resolved
}

export async function isolateCss(html: string, css: string): Promise<string> {
  // Dynamic import keeps juice out of the initial bundle; fixes Turbopack dev compatibility
  const { default: juice } = await import('juice')

  // Resolve CSS custom properties before inlining — juice does not handle var()
  const resolvedCss = resolveCssVariables(css)

  const inlined = juice.inlineContent(html, resolvedCss)

  const parser = new DOMParser()
  const doc = parser.parseFromString(inlined, 'text/html')

  doc.querySelectorAll('script').forEach(el => el.remove())

  doc.body.querySelectorAll('*').forEach(el => {
    el.removeAttribute('class')
    Array.from(el.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .forEach(attr => el.removeAttribute(attr.name))
  })

  return doc.body.innerHTML
}
