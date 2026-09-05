import type { WebsiteSeo } from '@/types/gbp'

export async function scrapeWebsite(url: string): Promise<WebsiteSeo> {
  const seoData: WebsiteSeo = { url, title: null, metaDescription: null, status: 'no_website' }
  if (!url) return seoData

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000) // 3-second timeout

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)

    if (!res.ok) {
      seoData.status = 'error'
      return seoData
    }

    const html = await res.text()

    // Regex extraction (no cheerio needed)
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const metaMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i) ||
      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)

    seoData.title = titleMatch?.[1]?.trim() || null
    seoData.metaDescription = metaMatch?.[1]?.trim() || null
    seoData.status = 'success'
  } catch (err) {
    console.warn(`[GBP Audit] Website scrape failed for ${url}:`, err)
    seoData.status = 'error'
  }

  return seoData
}
