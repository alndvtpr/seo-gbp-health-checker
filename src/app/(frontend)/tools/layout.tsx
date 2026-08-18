import React from 'react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Free SEO & Digital Growth Calculators | Alain Dave Tapiru',
  description:
    'Interactive SEO and local search diagnostic tools for website owners, hiring managers, and SEO specialists in the Philippines.',
  url: 'https://alaintapiru.com/tools/',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
