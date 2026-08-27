import type { Metadata } from 'next'

export const normalizeCanonicalUrl = (rawUrl?: string): string => {
  if (!rawUrl) return 'https://www.alaintapiru.com/'
  try {
    const parsed = new URL(rawUrl, 'https://www.alaintapiru.com')
    let pathname = parsed.pathname.toLowerCase()
    if (!pathname.endsWith('/')) {
      pathname += '/'
    }
    return `https://www.alaintapiru.com${pathname}`
  } catch {
    return 'https://www.alaintapiru.com/'
  }
}

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
    metadataBase: new URL('https://www.alaintapiru.com'),
    title: fullTitle,
    description: description || defaultDesc,
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': 'https://www.alaintapiru.com/rss.xml',
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

