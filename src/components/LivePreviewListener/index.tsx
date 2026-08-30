'use client'

import React, { useSyncExternalStore } from 'react'

const DynamicLivePreview = React.lazy(() =>
  import('@payloadcms/live-preview-react').then((mod) => ({
    default: function LivePreviewInner() {
      mod.useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        depth: 2,
        initialData: {},
      })
      return null
    },
  }))
)

const subscribe = () => () => {}
const getSnapshot = () =>
  process.env.NODE_ENV === 'development' ||
  (typeof window !== 'undefined' && window.self !== window.top)
const getServerSnapshot = () => process.env.NODE_ENV === 'development'

export const LivePreviewListener: React.FC = () => {
  const shouldLoad = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!shouldLoad) return null

  return (
    <React.Suspense fallback={null}>
      <DynamicLivePreview />
    </React.Suspense>
  )
}
