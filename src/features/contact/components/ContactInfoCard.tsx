import React from 'react'

export function ContactInfoCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 shadow-lg motion-reveal ${className}`}>
      {/* Availability Status Badge */}
      <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5 border border-primary-container/30 flex items-center gap-3">
        <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <div>
          <span className="font-heading text-xs font-bold text-on-surface block">Current Availability</span>
          <span className="font-sans text-xs text-on-surface/70">Open for small business sprints, website support &amp; agency overflow tasks</span>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <div>
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
            Direct Email
          </span>
          <a
            href="mailto:alaintapiru@gmail.com"
            className="font-heading text-base sm:text-lg font-bold text-on-surface hover:text-primary-container transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded"
          >
            alaintapiru@gmail.com
          </a>
        </div>

        <div>
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
            Direct Phone / WhatsApp
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:+639063249560"
              className="font-heading text-base sm:text-lg font-bold text-on-surface hover:text-primary-container transition-colors tracking-tight flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded"
            >
              <span>+63 906 324 9560</span>
            </a>
            <a
              href="https://wa.me/639063249560"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.06em] bg-emerald-500/15 text-emerald-700 dark:text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
              title="Message on WhatsApp"
              aria-label="Message on WhatsApp (opens in new tab)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="font-sans text-xs text-on-surface/60 mt-1">
            Direct line for voice calls, SMS, and WhatsApp messages
          </p>
        </div>

        <div>
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
            Location &amp; Collaboration
          </span>
          <p className="font-sans text-sm text-on-surface/75">
            Mabalacat City, Pampanga, Philippines (GMT+8) • Remote Worldwide
          </p>
        </div>
      </div>

      {/* What Happens Next Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 space-y-3">
        <span className="font-heading text-xs text-primary-container uppercase tracking-wider font-bold block">
          What Happens After You Submit
        </span>
        <ul className="space-y-2.5 font-sans text-xs text-on-surface/80">
          <li className="flex items-start gap-2">
            <span className="font-heading font-bold text-primary-container shrink-0">1.</span>
            <span><strong>Personal Review:</strong> I will personally inspect your message, website URL, and task notes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-heading font-bold text-primary-container shrink-0">2.</span>
            <span><strong>Honest Reply:</strong> You will receive a direct email response confirming scope fit and clarifying next steps.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-heading font-bold text-primary-container shrink-0">3.</span>
            <span><strong>Transparent Agreement:</strong> If you decide to move forward, we agree on deliverables and pricing upfront. No obligation.</span>
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <div className="pt-2">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Connect Directly
        </span>
        <div className="flex flex-wrap gap-3">
          {/* Gmail Direct */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary-container/30 bg-black/5 text-primary-container shadow-sm transition-all hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:bg-white/5"
            title="Gmail"
            aria-label="Gmail (opens compose in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          
          {/* WhatsApp */}
          <a
            href="https://wa.me/639063249560"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary-container/30 bg-black/5 text-primary-container shadow-sm transition-all hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:bg-white/5"
            title="WhatsApp"
            aria-label="WhatsApp (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.16-.48-.29z" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a
            href="https://www.facebook.com/dcrazedave"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary-container/30 bg-black/5 text-primary-container shadow-sm transition-all hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:bg-white/5"
            title="Facebook"
            aria-label="Facebook Profile (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary-container/30 bg-black/5 text-primary-container shadow-sm transition-all hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:bg-white/5"
            title="LinkedIn"
            aria-label="LinkedIn Profile (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
