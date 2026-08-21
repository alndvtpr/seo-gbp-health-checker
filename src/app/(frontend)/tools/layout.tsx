import React from 'react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Free SEO Diagnostic Tools & Calculators | Alain Dave Tapiru',
  description:
    'Explore practical SEO tools, local search diagnostic analyzers, and compensation calculators created by Alain Dave Tapiru.',
  url: 'https://www.alaintapiru.com/tools/',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
