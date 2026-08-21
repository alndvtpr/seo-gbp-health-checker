import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/ContactForm'
import { CalendlyScheduler } from '@/components/CalendlyScheduler'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'Contact Alain Dave Tapiru | Free SEO Strategy Call & Inquiries',
  description:
    'Book a free 20-minute SEO strategy call with Alain Dave Tapiru or send a direct inquiry to discuss technical SEO, search visibility, and web development.',
  url: 'https://www.alaintapiru.com/contact/',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://www.alaintapiru.com/contact/#webpage',
      url: 'https://www.alaintapiru.com/contact/',
      name: 'Contact Alain Dave Tapiru | Free SEO Strategy Call & Inquiries',
      description:
        'Book a free 20-minute SEO strategy call with Alain Dave Tapiru or send a direct inquiry to discuss technical SEO, search visibility, and web development.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.alaintapiru.com/#website',
        name: 'Alain Dave Tapiru',
        url: 'https://www.alaintapiru.com',
      },
      mainEntity: {
        '@type': 'Person',
        name: 'Alain Dave Tapiru',
        jobTitle: 'SEO Specialist & Web Developer',
        url: 'https://www.alaintapiru.com',
        email: 'alaintapiru@gmail.com',
        telephone: '+639063249560',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mabalacat City',
          addressRegion: 'Pampanga',
          addressCountry: 'Philippines',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/contact/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.alaintapiru.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://www.alaintapiru.com/contact/',
        },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-3 font-semibold">
          CONTACT — FREE STRATEGY CALL
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto mb-4 sm:mb-6">
          <span className="font-extrabold text-on-surface">Your SEO </span>
          <span className="font-extrabold text-primary-container">strategy.</span>
          <span className="block font-medium text-on-surface/85 mt-1 sm:mt-2">Built for better search.</span>
        </h1>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Book a free 20-minute strategy call and let&apos;s look at the opportunities hiding in your current search presence, from technical issues and content gaps to the next moves worth prioritizing.
        </p>
      </div>

      {/* 1. Calendly Inline Scheduler Section (Positioned Above Inquiry Form) */}
      <CalendlyScheduler />

      {/* Ambient Section Separator */}
      <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      {/* 2. Low-Pressure Direct Message Section (Positioned Below Calendly) */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          NOT READY TO BOOK A CALL?
        </span>
        <h2 className="font-heading text-xl sm:text-3xl font-bold text-on-surface tracking-tight">
          That&apos;s completely fine.
        </h2>
        <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface/75 leading-relaxed max-w-xl mx-auto">
          Send me a quick note about your website, SEO goals, or project. You don&apos;t need to have everything figured out yet.
        </p>
      </div>

      {/* Direct Contact Info & Inquiry Form Grid (Positioned Below) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Contact Info & Status */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 shadow-xl">
          {/* Availability Status Badge */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-primary-container/30 flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="font-heading text-xs font-bold text-on-surface block">Current Availability</span>
              <span className="font-sans text-xs text-on-surface/70">Open for freelance SEO audits &amp; full-time roles</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
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
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.06em] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  title="Message on WhatsApp"
                  aria-label="Message on WhatsApp (opens in new tab)"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
              <p className="font-sans text-xs text-on-surface/60 mt-1">
                Direct line for voice calls, SMS, and WhatsApp messages
              </p>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
                Location &amp; Timezone
              </span>
              <p className="font-sans text-sm text-on-surface/75">
                Mabalacat City, Pampanga, Philippines (GMT+8) • Remote Worldwide
              </p>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
                Primary Focus
              </span>
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed">
                Technical SEO Audits, Search &amp; AI Engine Optimization (AEO/GEO), and Modern React &amp; WordPress Development.
              </p>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
                Connect on Socials
              </span>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                {/* Gmail Direct */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                  title="Gmail"
                  aria-label="Gmail (opens compose in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true" focusable="false">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/639063249560"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                  title="WhatsApp"
                  aria-label="WhatsApp (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.16-.48-.29z" />
                  </svg>
                </a>
                
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/dcrazedave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                  title="Facebook"
                  aria-label="Facebook Profile (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true" focusable="false">
                    <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" focusable="false">
                    <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
                
                {/* GitHub */}
                <a
                  href="https://github.com/alndvtpr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                  title="GitHub"
                  aria-label="GitHub Profile (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true" focusable="false">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-surface-1/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
