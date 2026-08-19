import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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

  const breadcrumbItems = slug
    ? slug.map((segment, idx) => ({
        name:
          idx === slug.length - 1 && page.title
            ? page.title
            : segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        url: `/${slug.slice(0, idx + 1).join('/')}/`,
      }))
    : []

  return (
    <main>
      {breadcrumbItems.length > 0 && (
        <div className="pt-24 sm:pt-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}
      <LivePreviewListener />
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}

