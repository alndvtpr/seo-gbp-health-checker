import React from 'react'
import { Icon } from '@/components/icons'
import { WebsiteAuditRequestForm } from './WebsiteAuditRequestForm'

export function WebsiteAuditCard() {
  return (
    <div id="website-audit" className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 space-y-4 sm:space-y-6 flex flex-col justify-between motion-reveal shadow-sm scroll-mt-28">
      <div className="space-y-3">
        <Icon name="travel_explore" size={36} className="text-primary-container" />
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
          Request an SEO Website Audit
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
          Enter your domain below for a manual preliminary audit inspecting indexation status, Core Web Vitals speed, security headers, metadata, and AI search entity readiness.
        </p>
      </div>

      <WebsiteAuditRequestForm />
    </div>
  )
}
