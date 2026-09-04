import type { CollectionConfig } from 'payload'
import { CodeInjection } from '../blocks/CodeInjection'
import { pingIndexNow } from '../lib/indexnow'
import { env } from '../lib/env'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = env.NEXT_PUBLIC_SITE_URL
        return `${baseUrl}/api/preview?url=${data.slug || ''}&secret=${env.PREVIEW_SECRET}`
      },
    },
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc?.slug) {
          const pagePath = doc.slug === 'home' || doc.slug === 'index' ? '/' : `/${doc.slug}/`
          pingIndexNow(pagePath).catch((err) => {
            console.error('[Payload IndexNow Hook Error]', err)
          })
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc?.slug) {
          const pagePath = doc.slug === 'home' || doc.slug === 'index' ? '/' : `/${doc.slug}/`
          pingIndexNow(pagePath).catch((err) => {
            console.error('[Payload IndexNow Delete Hook Error]', err)
          })
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [CodeInjection],
    },
  ],
}
