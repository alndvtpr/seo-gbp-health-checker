import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/(payload)/'],
      },
    ],
    sitemap: 'https://alaintapiru.com/sitemap.xml',
    host: 'https://alaintapiru.com',
  }
}
