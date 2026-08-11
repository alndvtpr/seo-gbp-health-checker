import React from 'react'
import { Inter, Montserrat } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
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
    <html lang="en" className={`dark ${inter.variable} ${montserrat.variable} bg-[#121414]`} style={{ backgroundColor: '#121414' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#121414" />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        <GoogleAnalytics gaId="G-2VK6KQNJGH" />

        {/* WebGL Background Canvas Container */}
        <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent">
          <ShaderBackground />
        </div>
        
        <Navbar />
        
        <main className="flex-grow relative z-10 w-full">{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}
