import type { CollectionConfig } from 'payload'

export const AIMemory: CollectionConfig = {
  slug: 'ai-memory',
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'brandVoice',
      type: 'textarea',
    },
    {
      name: 'targetAudience',
      type: 'textarea',
    },
    {
      name: 'targetKeywordClusters',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
  ],
}
