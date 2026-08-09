// Force TS re-evaluation
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
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
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'index',
      },
    },
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <>
      <LivePreviewListener />
      <ScrollHero />
      <div className="max-w-7xl mx-auto px-8 relative z-20">
        <RenderBlocks blocks={page.layout} />
      </div>
    </>
  )
}
