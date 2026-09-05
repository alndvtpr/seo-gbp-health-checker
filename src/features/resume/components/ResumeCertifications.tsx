import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import {
  RESUME_CERTIFICATION_GROUPS,
  RESUME_CERTIFICATIONS,
} from '@/features/credentials'

export function ResumeCertifications() {
  return (
    <section className="space-y-6 motion-reveal" aria-labelledby="certifications-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="check_circle" size={18} className="text-primary-container" />
          <h2 id="certifications-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
            Certifications &amp; Specialized Training
          </h2>
          <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5">
            {RESUME_CERTIFICATIONS.length} Total
          </span>
        </div>

        <Link
          href="/about/"
          className="text-xs font-heading font-bold text-primary-container hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          View Certificate Previews on About Page <Icon name="arrow_forward" size={13} />
        </Link>
      </div>

      <div className="space-y-6">
        {RESUME_CERTIFICATION_GROUPS.map((group) => (
          <div key={group.category} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container inline-block" />
              <h3 className="font-heading text-xs uppercase tracking-[0.08em] font-semibold text-on-surface/80">
                {group.category}
              </h3>
              <span className="text-[11px] font-sans text-on-surface/50">
                ({group.items.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map((cert) => {
                const isProfessional = cert.badge === 'Professional Certificate'
                return (
                  <div
                    key={cert.title}
                    className={`bg-surface-1 rounded-2xl border p-4 space-y-2.5 shadow-xs hover:border-primary-container/40 transition-colors flex flex-col justify-between ${
                      isProfessional
                        ? 'border-primary-container/40 dark:border-primary-container/50 sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary-container/[0.04] to-transparent'
                        : 'border-black/10 dark:border-white/10'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                          {cert.title}
                        </h4>
                        <span
                          className={`text-[10px] font-heading font-medium px-2 py-0.5 rounded-full shrink-0 ${
                            isProfessional
                              ? 'bg-primary-container/15 text-primary-container border border-primary-container/30'
                              : 'bg-surface-2 text-on-surface/70 border border-black/5 dark:border-white/5'
                          }`}
                        >
                          {cert.badge}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <p className="font-sans text-xs text-primary-container font-medium">
                          {cert.issuer}
                        </p>
                        <span className="font-sans text-[11px] text-on-surface/50 shrink-0">
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    {cert.verifyUrl && (
                      <div className="pt-2 border-t border-black/5 dark:border-white/5">
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Verify Alain Dave Tapiru's ${cert.title} on official registry (opens in new tab)`}
                          className="inline-flex items-center gap-1 text-[11px] font-heading font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                        >
                          <Icon name="check_circle" size={12} />
                          Verify Official Registry
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
