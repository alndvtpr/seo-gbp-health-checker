import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        // 2026 SEO Best Practice: Block AI scrapers from training on your content
        userAgent: [
          'GPTBot',
          'CCBot',
          'ClaudeBot',
          'Applebot-Extended',
          'Google-Extended',
          'Amazonbot',
          'FacebookBot',
          'Bytespider',
          'anthropic-ai',
          'PerplexityBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://alaintapiru.com/sitemap.xml',
    host: 'https://alaintapiru.com',
  }
}
