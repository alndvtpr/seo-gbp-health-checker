import React from 'react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Free SEO Tools for Website Growth | Alain Dave Tapiru',
  description:
    'Find the SEO opportunities your competitors may miss. Use Alain Dave Tapiru’s free tools to audit, analyze and optimize your site for organic growth.',
  url: 'https://www.alaintapiru.com/tools/',
})

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
