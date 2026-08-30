export interface SiteNavChildItem {
  name: string
  href: string
  description?: string
  badge?: string
}

export interface SiteNavLeafItem {
  name: string
  href: string
}

export interface SiteNavParentItem {
  name: string
  href: string
  children: readonly SiteNavChildItem[]
}

export type SiteNavItem = SiteNavLeafItem | SiteNavParentItem

export const SITE_NAV_ITEMS: readonly SiteNavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  {
    name: 'Projects',
    href: '/projects/',
    children: [
      {
        name: 'All Projects & Case Studies',
        href: '/projects/',
        description: 'Complete directory of practical builds & breakdowns',
      },
      {
        name: 'AngatSikat Studio',
        href: '/projects/angat-sikat-studio/',
        description: 'Custom WordPress theme & SEO architecture',
        badge: 'WordPress',
      },
      {
        name: 'Local SEO & GBP Checker',
        href: '/projects/local-seo-gbp-checker/',
        description: 'Interactive signal diagnostic tool & analyzer',
        badge: 'Local SEO',
      },
      {
        name: 'AlainTapiru.com Architecture',
        href: '/projects/alaintapiru-portfolio/',
        description: 'Next.js App Router portfolio & technical SEO build',
        badge: 'Technical SEO',
      },
    ],
  },
  {
    name: 'Services',
    href: '/services/',
    children: [
      {
        name: 'All Services & Packages',
        href: '/services/',
        description: 'Practical SEO, local visibility & web support',
      },
      {
        name: 'Technical SEO',
        href: '/services/technical-seo/',
        description: 'Crawlability, Core Web Vitals & schema architecture',
        badge: 'Technical',
      },
      {
        name: 'On-Page SEO',
        href: '/services/on-page-seo/',
        description: 'Search intent mapping, headings & metadata CTR',
      },
      {
        name: 'Local SEO & GBP',
        href: '/services/local-seo/',
        description: 'Google Maps presence & 10-point signal diagnostics',
        badge: 'Local',
      },
      {
        name: 'AI Search (AEO & GEO)',
        href: '/services/ai-search-optimization/',
        description: 'Structured data, entities & machine discoverability',
        badge: 'AI Search',
      },
      {
        name: 'Web Development',
        href: '/services/web-development/',
        description: 'Next.js App Router & custom WordPress theme builds',
        badge: 'Next.js / WP',
      },
    ],
  },
  { name: 'Tools', href: '/tools/' },
  { name: 'Resume', href: '/resume/' },
  { name: 'Blog', href: '/blog/' },
]

const navRoutes = SITE_NAV_ITEMS.flatMap((item) => [
  item.href,
  ...('children' in item ? item.children.map((child) => child.href) : []),
])

// Project detail routes remain sourced from PROJECTS in sitemap.ts.
export const STATIC_SITEMAP_ROUTES = Array.from(new Set([...navRoutes, '/contact/'])).filter(
  (route) => route === '/projects/' || !route.startsWith('/projects/'),
)
