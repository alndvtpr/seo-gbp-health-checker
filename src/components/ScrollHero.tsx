'use client'

import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export const ScrollHero = () => {
  return (
    <div className="relative w-full min-h-[90vh] min-h-[90dvh] sm:min-h-screen bg-transparent flex flex-col justify-center">
      {/* Hero Content Section */}
      <div className="flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-16 lg:px-24 pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 relative z-20 max-w-7xl mx-auto w-full">
        <div className="max-w-md space-y-4 sm:space-y-6">
          {/* Interactive Announcement Pill */}
          <div className="hero-animate-in hero-delay-1">
            <Link
              href="/tools/"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1/90 hover:bg-surface-2 border border-primary-container/40 hover:border-primary-container text-xs font-sans text-on-surface shadow-[0_0_20px_rgba(230,126,34,0.2)] hover:shadow-[0_0_30px_rgba(230,126,34,0.4)] transition-all duration-300 max-w-full"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-heading text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-extrabold text-primary-container shrink-0">
                ✨ Free Tool:
              </span>
              <span className="text-on-surface text-[11px] sm:text-xs font-semibold truncate group-hover:text-primary-container transition-colors">
                Google Business Profile Auditor
              </span>
              <span className="text-primary-container font-bold text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
                →
              </span>
            </Link>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl tracking-[-0.025em] leading-[1.12] sm:leading-[1.08] drop-shadow-2xl hero-animate-in hero-delay-2">
            <span className="font-extrabold text-on-surface">SEO Specialist</span>{' '}
            <span className="font-semibold text-on-surface/90">in the Philippines</span>{' '}
            <span className="font-extrabold text-primary-container block sm:inline">Building Search-Ready Websites</span>
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant drop-shadow-lg font-normal leading-relaxed max-w-2xl hero-animate-in hero-delay-3">
            Building search-ready websites through hands-on technical SEO, local search optimization, and modern web development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 w-full hero-animate-in hero-delay-4">
            <Link
              href="/projects/"
              data-agent-action="view-portfolio-projects"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              View My Work <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>
            <Link
              href="/contact/"
              data-agent-action="start-seo-inquiry"
              className="w-full sm:w-auto min-h-[48px] border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              Let&apos;s Work Together
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-3 sm:gap-4 pt-6 mt-2 border-t border-black/10 dark:border-white/10 w-full sm:w-auto hero-animate-in hero-delay-5">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Gmail"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/dcrazedave"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href="https://github.com/alndvtpr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
