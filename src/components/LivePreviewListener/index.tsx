'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const isPreviewContext = typeof window !== 'undefined' ? window.self !== window.top : false
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev || isPreviewContext) {
    return <LivePreviewInner />
  }
  return null
}

const LivePreviewInner: React.FC = () => {
  useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    depth: 2,
    initialData: {},
  })
  return null
}

