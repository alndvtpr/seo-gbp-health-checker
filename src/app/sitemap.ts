import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'
import { BLOG_POSTS } from '@/data/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alaintapiru.com'

  const coreRoutes = [
    '/',
    '/about/',
    '/resume/',
    '/projects/',
    '/tools/',
    '/services/',
    '/blog/',
    '/contact/',
  ]

  const serviceRoutes = [
    '/services/technical-seo/',
    '/services/on-page-seo/',
    '/services/local-seo/',
    '/services/ai-search-optimization/',
    '/services/web-development/',
  ]

  const projectRoutes = PROJECTS.map((project) => `/projects/${project.slug}/`)
  const blogRoutes = BLOG_POSTS.map((post) => ({
    route: `/blog/${post.slug}/`,
    lastModified: post.dateModified ?? post.datePublished,
  }))

  const stableRoutes = [...coreRoutes, ...serviceRoutes, ...projectRoutes]

  return [
    ...stableRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: route.startsWith('/projects/') ? ('monthly' as const) : ('weekly' as const),
      priority:
        route === '/' ? 1.0 : route.startsWith('/services/') || route.startsWith('/tools/') ? 0.9 : 0.8,
    })),
    ...blogRoutes.map(({ route, lastModified }) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
