// @ts-ignore: IDE cache bug with PNPM
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | Portfolio',
  description: 'Multidisciplinary software engineer specializing in Next.js, React, and high-performance WebGL experiences.',
  url: 'https://alaintapiru.com'
})

export const dynamic = 'force-dynamic'

export default async function Page() {
  let page: { layout?: unknown[] } | null = null

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
  } catch (err) {
    // DB not ready yet or connection issue — render the static portfolio anyway
    console.error('Payload DB error on page load:', err)
  }

  return (
    <>
      <LivePreviewListener />
      <ScrollHero />
      {page?.layout && page.layout.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </div>
      )}
    </>
  )
}
