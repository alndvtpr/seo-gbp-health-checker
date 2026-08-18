import type { Metadata } from 'next'

export const normalizeCanonicalUrl = (rawUrl?: string): string => {
  if (!rawUrl) return 'https://alaintapiru.com/'
  try {
    const parsed = new URL(rawUrl, 'https://alaintapiru.com')
    let pathname = parsed.pathname.toLowerCase()
    if (!pathname.endsWith('/')) {
      pathname += '/'
    }
    return `https://alaintapiru.com${pathname}`
  } catch {
    return 'https://alaintapiru.com/'
  }
}

export const generateMetadata = ({
  title,
  description,
  url,
  image = '/og-image.jpg',
}: {
  title: string
  description?: string
  url?: string
  image?: string
}): Metadata => {
  const siteName = 'Alain Dave Tapiru | Portfolio'
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`
  const defaultDesc = 'Multidisciplinary software engineer specializing in Next.js, React, and high-performance WebGL experiences.'
  const canonicalUrl = normalizeCanonicalUrl(url)

  return {
    metadataBase: new URL('https://alaintapiru.com'),
    title: fullTitle,
    description: description || defaultDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
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
      type: 'website',
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

