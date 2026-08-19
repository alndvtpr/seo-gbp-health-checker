import type { CollectionConfig } from 'payload'
import { CodeInjection } from '../blocks/CodeInjection'
import { pingIndexNow } from '../lib/indexnow'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        return `${baseUrl}/api/preview?url=${data.slug || ''}&secret=${process.env.PREVIEW_SECRET || 'secret'}`
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
