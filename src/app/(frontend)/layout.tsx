import React from 'react'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import './styles.css'

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

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['600', '700', '800'],
})

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | Portfolio',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable} ${montserrat.variable} bg-[#121414]`} style={{ backgroundColor: '#121414' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#121414" />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <JsonLd />
        {/* LCP Discovery Preload */}
        <link
          rel="preload"
          as="image"
          href="/hero-frames/frame-0000.webp"
          type="image/webp"
          // @ts-ignore
          fetchpriority="high"
        />
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        {/* Lazy load GTM to eliminate FCP/TBT main thread contention */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2VK6KQNJGH"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2VK6KQNJGH', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        {/* WebGL Background Canvas Container */}
        <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent">
          <ShaderBackground />
        </div>
        
        <Navbar />
        
        <main className="flex-grow relative z-30 w-full">{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}
