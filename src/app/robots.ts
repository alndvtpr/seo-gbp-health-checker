import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        // Explicitly allowed AI Search & Answer Bots
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'Applebot',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        // Scrapers & Unwanted Training Crawlers
        userAgent: [
          'Bytespider',
          'CCBot',
          'Diffbot',
          'ImagesiftBot',
          'PetalBot',
          'TurnitinBot',
          'Scrapy',
          'FacebookBot',
          'Amazonbot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: [
      'https://alaintapiru.com/sitemap.xml',
      'https://alaintapiru.com/rss.xml',
    ],
    host: 'https://alaintapiru.com',
  }
}

