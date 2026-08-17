import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        // 1. Explicitly ALLOW verified AI search engines and answer bots (GEO / AIO)
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        // 2. BLOCK aggressive, non-search scraping & cloning bots
        userAgent: [
          'Bytespider',
          'CCBot',
          'Diffbot',
          'ImagesiftBot',
          'PetalBot',
          'TurnitinBot',
          'Scrapy',
          'anthropic-ai',
          'FacebookBot',
          'Amazonbot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://alaintapiru.com/sitemap.xml',
    host: 'https://alaintapiru.com',
  }
}

