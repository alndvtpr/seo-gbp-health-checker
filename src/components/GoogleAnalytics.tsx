'use client'

import React from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import {
  GoogleAnalytics as NextGoogleAnalytics,
  sendGAEvent,
} from '@next/third-parties/google'

const DEFAULT_GA_MEASUREMENT_ID = 'G-2VK6KQNJGH'

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0]

const reportWebVitals: ReportWebVitalsCallback = (metric) => {
  window.dataLayer = window.dataLayer || []
  sendGAEvent('event', 'web_vital', {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_name: metric.name,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
    page_path: window.location.pathname,
    non_interaction: true,
  })
}

export const GoogleAnalytics: React.FC = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID
  useReportWebVitals(reportWebVitals)

  return <NextGoogleAnalytics gaId={gaId} />
}
