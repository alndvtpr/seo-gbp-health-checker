import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'
import { BLOG_POSTS } from '@/data/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alaintapiru.com'
  const currentDate = new Date()

  const coreRoutes = [
    '/',
    '/about/',
    '/projects/',
    '/tools/',
    '/services/',
    '/blog/',
    '/contact/',
  ]

  const projectRoutes = PROJECTS.map((p) => `/projects/${p.slug}/`)
  const blogRoutes = BLOG_POSTS.map((b) => `/blog/${b.slug}/`)

  const allRoutes = [...coreRoutes, ...projectRoutes, ...blogRoutes]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route.startsWith('/blog/') || route.startsWith('/projects/') ? 'weekly' : 'daily',
    priority: route === '/' ? 1.0 : route.startsWith('/services/') || route.startsWith('/tools/') ? 0.9 : 0.8,
  }))
}
