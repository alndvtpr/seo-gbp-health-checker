import type { Metadata } from 'next'

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

  return {
    title: fullTitle,
    description: description || defaultDesc,
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
      url: url || 'https://alaintapiru.com',
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
