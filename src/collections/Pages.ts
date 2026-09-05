import type { Access, CollectionConfig } from 'payload'
import { CodeInjection } from '../blocks/CodeInjection'
import { pingIndexNow } from '../lib/indexnow'
import { env } from '../lib/env'

const authenticatedOnly: Access = ({ req: { user } }) => Boolean(user)

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticatedOnly,
    delete: authenticatedOnly,
    read: authenticatedOnly,
    readVersions: authenticatedOnly,
    update: authenticatedOnly,
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = env.NEXT_PUBLIC_SITE_URL
        const slug = data?.slug || ''
        const path = slug === 'home' || slug === 'index' ? '/' : slug.startsWith('/') ? slug : `/${slug}`
        return `${baseUrl}/api/preview?url=${encodeURIComponent(path)}&secret=${env.PREVIEW_SECRET}`
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
