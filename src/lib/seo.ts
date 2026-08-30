import type { Metadata } from 'next'

export const SITE_ORIGIN = 'https://www.alaintapiru.com'
export const SITE_URL = `${SITE_ORIGIN}/`
export const WEBSITE_ID = `${SITE_URL}#website`
export const PERSON_ID = `${SITE_URL}#person`
export const PROFILE_PAGE_ID = `${SITE_URL}#profilepage`

export interface SeoBreadcrumbItem {
  name: string
  url: string
}

export const serializeJsonLd = (value: object): string =>
  JSON.stringify(value).replace(/</g, '\\u003c')

export const normalizeCanonicalUrl = (rawUrl?: string): string => {
  if (!rawUrl) return SITE_URL
  try {
    const parsed = new URL(rawUrl, SITE_ORIGIN)
    let pathname = parsed.pathname.toLowerCase()
    if (!pathname.endsWith('/')) {
      pathname += '/'
    }
    return `${SITE_ORIGIN}${pathname}`
  } catch {
    return SITE_URL
  }
}

export const buildBreadcrumbJsonLd = (
  items: readonly SeoBreadcrumbItem[],
  id?: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  ...(id ? { '@id': id } : {}),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: normalizeCanonicalUrl(item.url),
  })),
})

export const generateMetadata = ({
  title,
  description,
  url,
  image = '/alain-dave-tapiru-seo-specialist-philippines.avif',
  type = 'website',
}: {
  title: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata => {
  const siteName = 'Alain Dave Tapiru'
  const fullTitle = title
  const defaultDesc =
    'Practical SEO and website support for small businesses and agencies. Clear scope, direct communication, and hands-on optimization by Alain Dave Tapiru.'
  const canonicalUrl = normalizeCanonicalUrl(url)

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: fullTitle,
    description: description || defaultDesc,
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': `${SITE_ORIGIN}/rss.xml`,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo.webp', type: 'image/webp' },
        { url: '/logo.png', type: 'image/png' },
      ],
      apple: [{ url: '/logo.png', type: 'image/png' }],
    },
    openGraph: {
      title: fullTitle,
      description: description || defaultDesc,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDesc,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
