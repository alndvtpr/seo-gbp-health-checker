import React from 'react'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import './styles.css'

import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ShaderBackground } from '@/components/ShaderBackground'
import { JsonLd } from '@/components/JsonLd'
import { generateMetadata } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['500', '600', '700', '800'],
})

export const metadata = generateMetadata({
  title: 'SEO Specialist Philippines | Technical SEO Expert – Alain Dave Tapiru',
  description:
    'Get found by customers searching for what you offer. Alain Dave Tapiru helps businesses in the Philippines grow with technical, on-page and local SEO.',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable} ${jakarta.variable} bg-[#0f1111]`} style={{ backgroundColor: '#0f1111' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#121414" />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        {/* RSS 2.0 Delta Feed Autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Alain Dave Tapiru | RSS Feed"
          href="/rss.xml"
        />
        <JsonLd />
        {/* LCP Discovery Preload */}
        <link
          rel="preload"
          as="image"
          href="/hero-frames/frame-0000.webp"
          type="image/webp"
          // @ts-ignore
          fetchPriority="high"
        />
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen min-h-[100dvh] flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        {/* Interaction and idle-deferred Google Analytics (Zero TBT impact) */}
        <GoogleAnalytics />

        {/* WebGL Background Canvas Container */}
        <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent">
          <ShaderBackground />
        </div>
        
        <Navbar />
        
        <main className="flex-1 relative z-20 w-full">{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}
