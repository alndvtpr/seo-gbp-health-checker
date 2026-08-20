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
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-container/15 text-primary-container border border-primary-container/30 hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
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
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-heading text-xs uppercase tracking-[0.06em] font-bold bg-primary-container/15 text-primary-container border border-primary-container/30 hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(224,123,32,0.4)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
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
      className={`flex items-center justify-center rounded-full text-primary-container bg-primary-container/15 border border-primary-container/30 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${className}`}
    >
      <Icon name="rss_feed" size={iconSize || 16} className="shrink-0" />
    </a>
  )
}

export default RssButton
