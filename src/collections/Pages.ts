import type { CollectionConfig } from 'payload'
import { CodeInjection } from '../blocks/CodeInjection'

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
