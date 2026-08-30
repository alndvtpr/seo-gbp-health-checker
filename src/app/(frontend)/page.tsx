import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page as PayloadPage } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { ToolsMarquee } from '@/components/ToolsMarquee'
import { HomeSections } from '@/components/home/HomeSections'
import {
  PERSON_ID,
  PROFILE_PAGE_ID,
  SITE_URL,
  WEBSITE_ID,
  generateMetadata,
  serializeJsonLd,
} from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'SEO Specialist & Web Developer Philippines | Alain Dave Tapiru',
  description:
    'Alain Dave Tapiru handles technical SEO, local search setup, on-page improvements, and WordPress or Next.js fixes for small businesses and agencies through clearly scoped projects.',
  url: SITE_URL,
})

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': PROFILE_PAGE_ID,
  url: SITE_URL,
  name: 'Alain Dave G. Tapiru - Profile',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
}

export default async function Page() {
  let page: PayloadPage | null = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'index',
        },
      },
    })
    page = docs[0] ?? null
  } catch {
    // Graceful offline/paused DB fallback: core portfolio sections are statically rendered below.
    page = null
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <LivePreviewListener />

      {/* 1. Hero */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

      {/* 2. Tools & Infinite Marquee */}
      <ToolsMarquee />

      <HomeSections />

      {/* Preserve any approved CMS-managed homepage blocks without adding another semantic section. */}
      {page?.layout != null && page.layout.length > 0 && (
        <div className="relative z-20 mx-auto max-w-7xl px-8 py-12" aria-label="Additional homepage content">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </div>
      )}
    </>
  )
}
