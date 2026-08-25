import React from 'react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Free SEO Tools & Diagnostic Calculators | Alain Dave Tapiru',
  description:
    'Free, practical SEO tools and calculators. Audit Google Business Profile signals, estimate SEO compensation, and request website technical reviews.',
  url: 'https://www.alaintapiru.com/tools/',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
