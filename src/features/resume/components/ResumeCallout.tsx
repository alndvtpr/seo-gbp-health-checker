import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function ResumeCallout() {
  return (
    <div className="bg-surface-1 rounded-2xl sm:rounded-3xl border border-primary-container/30 p-6 sm:p-8 text-center space-y-4 shadow-md relative overflow-hidden motion-reveal">
      <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
        Ready to Discuss a Role, Sprint, or Overflow Task?
      </h2>
      <p className="font-sans text-xs sm:text-sm text-on-surface/80 max-w-xl mx-auto leading-relaxed">
        I am available for full-time technical virtual assistant positions, agency SEO sprints, and web maintenance overflow tasks. Let&apos;s connect to review fit and requirements.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
        <Link
          href="/contact/"
          className="h-11 px-7 inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] rounded-full shadow-[0_0_20px_rgba(224,123,32,0.3)] hover:bg-primary btn-motion transition-all"
        >
          Get in Touch <Icon name="arrow_forward" size={15} className="btn-icon" />
        </Link>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="h-11 px-6 inline-flex items-center justify-center gap-2 bg-surface-2 hover:bg-black/5 dark:hover:bg-white/10 text-on-surface font-heading text-xs font-semibold uppercase tracking-[0.06em] rounded-full border border-black/10 dark:border-white/15 transition-colors"
        >
          <Icon name="mail" size={15} className="text-primary-container" />
          Direct Email
        </a>
      </div>
    </div>
  )
}
