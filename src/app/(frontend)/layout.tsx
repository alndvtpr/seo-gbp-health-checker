import React from 'react'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import './styles.css'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ShaderBackground } from '@/components/ShaderBackground'
import { generateMetadata } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | Portfolio',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        {/* Async Google Tag Manager Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-41RVF48NJ8"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-41RVF48NJ8');
          `}
        </Script>

        {/* WebGL Background Canvas Container */}
        <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent"></div>
        <ShaderBackground />
        
        <Navbar />
        
        <main className="flex-grow relative z-10 w-full">{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}
