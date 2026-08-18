import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alaintapiru.com'
  const currentDate = new Date()

  const routes = [
    '/',
    '/about/',
    '/projects/',
    '/projects/angat-sikat-studio/',
    '/projects/local-seo-gbp-checker/',
    '/projects/alaintapiru-portfolio/',
    '/tools/',
    '/services/',
    '/blog/',
    '/contact/',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
  }))
}
