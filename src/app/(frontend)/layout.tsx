import React from 'react'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './styles.css'

import { ThemeProvider } from '@/components/ThemeProvider'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { ScrollRevealInit } from '@/components/ScrollRevealInit'
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
  title: 'SEO Specialist Philippines | Technical & Local SEO | Alain Dave Tapiru',
  description:
    'Build search-ready websites that get discovered. Alain Dave Tapiru provides practical technical, on-page, and local SEO solutions tailored for modern search.',
})

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var theme = (saved === 'light' || saved === 'dark') ? saved : 'light';
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.backgroundColor = '#0f1111';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.backgroundColor = '#fafaf8';
    }
  } catch (e) {}
})();
`

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`light ${inter.variable} ${jakarta.variable}`}
      data-theme="light"
      style={{ backgroundColor: '#fafaf8' }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#fafaf8" />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        {/* Zero-Flash SSR Theme Initialization Script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* RSS 2.0 Delta Feed Autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Alain Dave Tapiru | RSS Feed"
          href="/rss.xml"
        />
        <JsonLd />
        {/* No-JS Accessibility Fallback for Scroll Reveal */}
        <noscript>
          <style>{`.motion-reveal, .motion-reveal-fast { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen min-h-[100dvh] flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        <ThemeProvider>
          {/* Interaction and idle-deferred Google Analytics (Zero TBT impact) */}
          <GoogleAnalytics />
          {/* Global Scroll Reveal Initializer (Zero TBT impact) */}
          <ScrollRevealInit />

          {/* WebGL Background Canvas Container */}
          <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent">
            <ShaderBackground />
          </div>
          
          <Navbar />
          
          <main className="flex-1 relative z-20 w-full">{children}</main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
