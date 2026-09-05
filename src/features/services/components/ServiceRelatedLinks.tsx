import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import type { RelatedService } from '../types'

export interface ServiceRelatedLinksProps {
  eyebrow?: string
  services: (RelatedService & { linkText?: string })[]
}

export function ServiceRelatedLinks({
  eyebrow = 'RELATED DISCIPLINES',
  services,
}: ServiceRelatedLinksProps) {
  return (
    <section className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold">
          {eyebrow}
        </span>
        <Link
          href="/services/"
          className="text-xs font-heading font-semibold text-on-surface/70 hover:text-primary-container transition-colors flex items-center gap-1"
        >
          <span>All Services Hub</span>
          <Icon name="arrow_forward" size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all group flex flex-col justify-between shadow-sm motion-reveal"
          >
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary-container mb-2 block">
                {service.badge}
              </span>
              <h3 className="font-heading text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                {service.title}
              </h3>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                {service.desc}
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>{service.linkText || `View ${service.title} Scope`}</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
