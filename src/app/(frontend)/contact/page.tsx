import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/ContactForm'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'Contact Alain Dave Tapiru | SEO & Web Development Expert Philippines',
  description:
    'Your next customer is searching. Contact Alain Dave Tapiru for SEO, web design and development services in the Philippines built to create opportunities.',
  url: 'https://www.alaintapiru.com/contact/',
})

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Get In Touch
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-tight">
          Let&apos;s Build &amp; Rank Together
        </h1>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Have an SEO project, web design inquiry, or consultation request? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Contact Info & Status */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-white/10 shadow-xl">
          {/* Availability Status Badge */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-primary-container/30 flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
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
                className="font-heading text-base sm:text-lg font-bold text-on-surface hover:text-primary-container transition-colors break-all"
              >
                alaintapiru@gmail.com
              </a>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-1 font-semibold">
                Primary Focus
              </span>
              <p className="font-sans text-sm text-on-surface/75 leading-relaxed">
                Comprehensive SEO Packages (Technical, On-Page, &amp; Off-Page), AI-Powered Web Development, Executive Virtual Assistance, and Dedicated Customer Service.
              </p>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-1 font-semibold">
                Connect on Socials
              </span>
              <div className="flex gap-4 pt-2">
                {/* Gmail Direct */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)]"
                  title="Gmail"
                  aria-label="Gmail"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/dcrazedave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)]"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)]"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
                
                {/* GitHub */}
                <a
                  href="https://github.com/alndvtpr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center min-w-[44px] min-h-[44px] shadow-[0_0_15px_rgba(230,126,34,0.1)] hover:shadow-[0_0_25px_rgba(230,126,34,0.4)]"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-7 rounded-3xl border border-neutral-800 bg-neutral-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
