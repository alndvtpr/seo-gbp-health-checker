import React from 'react'
import { Inter, Montserrat } from 'next/font/google'
import './styles.css'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ShaderBackground } from '@/components/ShaderBackground'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | Portfolio',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark ${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Analytics (gtag.js) G-41RVF48NJ8 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-41RVF48NJ8"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-41RVF48NJ8');
            `,
          }}
        />
        <link rel="icon" href="/logo.webp" type="image/webp" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-transparent text-on-background font-sans min-h-screen flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        {/* Placeholder for WebGL Background Canvas (Phase 5) */}
        <div id="webgl-background-container" className="fixed inset-0 z-[-2] pointer-events-none bg-transparent"></div>
        <ShaderBackground />
        
        {/* Placeholder for Hero Canvas (Phase 4) - handled in specific pages, but keeping z-index scale in mind */}
        
        <Navbar />
        
        <main className="flex-grow relative z-10 w-full">{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}
