import React from 'react'
import { Icon } from '@/components/icons'

export interface RssButtonProps {
  variant?: 'icon' | 'button' | 'chip'
  href?: string
  className?: string
  iconSize?: number
  showText?: boolean
  label?: string
}

export const RssButton: React.FC<RssButtonProps> = ({
  variant = 'icon',
  href = '/rss.xml',
  className = '',
  iconSize,
  showText = true,
  label = 'Subscribe via RSS',
}) => {
  const commonProps = {
    href,
    target: '_blank',
    rel: 'noopener noreferrer alternate',
    'aria-label': 'Subscribe to RSS Feed',
    title: 'Subscribe to RSS Feed (Delta Feed)',
  }

  if (variant === 'chip') {
    return (
      <a
        {...commonProps}
        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-primary-container/30 bg-primary-container/15 px-3 py-1 text-xs font-medium text-primary-container transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
      >
        <Icon name="rss_feed" size={iconSize || 14} className="shrink-0" />
        {showText && <span>{label}</span>}
      </a>
    )
  }

  if (variant === 'button') {
    return (
      <a
        {...commonProps}
        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary-container/30 bg-primary-container/15 px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(224,123,32,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
      >
        <Icon name="rss_feed" size={iconSize || 16} className="shrink-0" />
        {showText && <span>{label}</span>}
      </a>
    )
  }

  // Default: 'icon'
  return (
    <a
      {...commonProps}
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary-container/30 bg-primary-container/15 text-primary-container transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
    >
      <Icon name="rss_feed" size={iconSize || 16} className="shrink-0" />
    </a>
  )
}

export default RssButton
