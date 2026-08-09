import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params
  const payload = await getPayload({ config })
  const urlSlug = slug ? slug.join('/') : 'index'

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: urlSlug,
      },
    },
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <main>
      <LivePreviewListener />
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
