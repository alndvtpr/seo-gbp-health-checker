import React from 'react'
import { Icon } from '@/components/icons'

export function ResumeHeader() {
  return (
    <header className="bg-surface-1 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-5 sm:p-7 md:p-8 shadow-sm relative overflow-hidden motion-reveal">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 border border-emerald-500/20 uppercase tracking-[0.06em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Work
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Alain Dave G. Tapiru
          </h1>

          <p className="font-heading text-base sm:text-lg font-bold text-primary-container">
            Junior SEO Specialist | Technical &amp; On-Page SEO
          </p>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-sans text-on-surface/70 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <Icon name="location_on" size={13} className="text-primary-container shrink-0" />
              Mabalacat City, Pampanga, Philippines
            </span>
            <span className="text-on-surface/30 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="schedule" size={13} className="text-primary-container shrink-0" />
              UTC+8 (PHT)
            </span>
          </div>
        </div>
      </div>

      {/* Integrated Contact & Profiles Bar */}
      <div className="pt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
        <a
          href="mailto:alaintapiru@gmail.com"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
        >
          <Icon name="mail" size={13} className="text-primary-container shrink-0" />
          alaintapiru@gmail.com
        </a>
        <a
          href="tel:+639063249560"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
        >
          <Icon name="call" size={13} className="text-primary-container shrink-0" />
          +63 906 324 9560
        </a>
        <a
          href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true" focusable="false" className="text-primary-container shrink-0">
            <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="https://github.com/alndvtpr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-black/5 bg-surface-2 px-3 font-sans text-xs text-on-surface/85 transition-colors hover:bg-black/5 hover:text-primary-container dark:border-white/5 dark:hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true" focusable="false" className="text-primary-container shrink-0">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </a>
      </div>
    </header>
  )
}
