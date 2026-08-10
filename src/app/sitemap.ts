import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alaintapiru.com'
  const currentDate = new Date()

  const routes = [
    '',
    '/about',
    '/projects',
    '/projects/executive-optical-local-seo',
    '/projects/claimscale-ai-resume-portfolio',
    '/projects/saas-growth-engine-seo',
    '/tools',
    '/services',
    '/blog',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/projects/') ? 0.9 : 0.8,
  }))
}
