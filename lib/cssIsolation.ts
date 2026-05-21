// Browser-only: uses DOMParser — import only from 'use client' components
export async function isolateCss(html: string, css: string): Promise<string> {
  // Dynamic import keeps juice out of the initial bundle; fixes Turbopack dev compatibility
  const { default: juice } = await import('juice')
  const inlined = juice.inlineContent(html, css)

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
