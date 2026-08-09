'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    depth: 2,
    initialData: {},
  })
  return null
}
