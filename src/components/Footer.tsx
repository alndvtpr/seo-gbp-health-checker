'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RssButton } from '@/components/RssButton'

export const Footer = () => {
  return (
    <footer
      className="bg-[#0b0d0d]/40 backdrop-blur-md text-on-surface w-full pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 border-t border-white/10 relative z-30 overflow-hidden"
      style={{ paddingBottom: 'max(3rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))' }}
    >
      {/* Top Border Dual Ambient Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-container/50 via-white/10 to-emerald-500/40 pointer-events-none" />

      {/* Left Ambient Radial Glow (Orange / Amber) */}
      <div className="absolute -top-24 -left-24 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-[radial-gradient(ellipse_at_center,rgba(230,126,34,0.16)_0%,transparent_70%)] pointer-events-none blur-3xl animate-glow-pulse" />

      {/* Right Ambient Radial Glow (Emerald / Green) */}
      <div className="absolute -bottom-24 -right-24 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.13)_0%,transparent_70%)] pointer-events-none blur-3xl animate-glow-pulse" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12 relative z-10">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
              <Image
                src="/Alain-Dave-Tapiru-SEO-Specialist-Philippines-Logo.webp"
                alt="Alain Dave Tapiru SEO Specialist Philippines Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <span className="font-heading font-bold text-on-surface text-lg sm:text-xl">
              Alain Dave <span className="text-primary-container">Tapiru</span>
            </span>
          </div>
          <p className="font-sans text-sm text-on-surface/75 leading-relaxed">
            SEO Specialist, Web Designer, &amp; Cybersecurity Enthusiast. Crafting high-converting digital experiences through data-driven search strategies.
          </p>
          
          {/* Socials */}
          <div className="flex gap-3 sm:gap-4 pt-2 items-center">
            {/* Gmail */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alaintapiru@gmail.com" target="_blank" rel="noopener noreferrer nofollow" className="w-9 h-9 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="Gmail">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/dcrazedave" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/alain-dave-tapiru-seo-specialist-philippines/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.36V9H12.8v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.45a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13h-3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/alndvtpr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center shadow-[0_0_10px_rgba(230,126,34,0.1)] hover:shadow-[0_0_20px_rgba(230,126,34,0.4)]" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            {/* RSS Feed */}
            <RssButton
              variant="icon"
              className="w-9 h-9 bg-white/5 border-primary-container/30 shadow-[0_0_10px_rgba(238,128,47,0.1)] hover:shadow-[0_0_20px_rgba(238,128,47,0.4)]"
              iconSize={18}
            />
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-3">
          <h3 className="font-heading text-xs sm:text-sm font-bold text-primary-container uppercase tracking-[0.06em]">
            Quick Links
          </h3>
          <ul className="space-y-2 font-sans text-sm text-on-surface/70">
            <li>
              <Link href="/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Home</Link>
            </li>
            <li>
              <Link href="/about/" className="hover:text-primary-container transition-colors py-0.5 inline-block">About Me</Link>
            </li>
            <li>
              <Link href="/projects/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Projects &amp; Case Studies</Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Blog / SEO News</Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Contact / Hire Me</Link>
            </li>
            <li>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer alternate"
                className="hover:text-primary-container text-on-surface/70 transition-colors py-0.5 inline-flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                RSS Delta Feed
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Tools & Services */}
        <div className="space-y-3">
          <h3 className="font-heading text-xs sm:text-sm font-bold text-primary-container uppercase tracking-[0.06em]">
            Tools &amp; Services
          </h3>
          <ul className="space-y-2 font-sans text-sm text-on-surface/70">
            <li>
              <Link href="/services/#pillar-foundation" className="hover:text-primary-container transition-colors py-0.5 inline-block">Technical SEO &amp; Schema</Link>
            </li>
            <li>
              <Link href="/services/#pillar-visibility" className="hover:text-primary-container transition-colors py-0.5 inline-block">AEO, GEO &amp; On-Page SEO</Link>
            </li>
            <li>
              <Link href="/services/#pillar-execution" className="hover:text-primary-container transition-colors py-0.5 inline-block">Web Design &amp; Development</Link>
            </li>
            <li>
              <Link href="/tools/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Local SEO &amp; GBP Auditor</Link>
            </li>
            <li>
              <Link href="/projects/" className="hover:text-primary-container transition-colors py-0.5 inline-block">Case Studies &amp; Live Builds</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-3">
          <h3 className="font-heading text-xs sm:text-sm font-bold text-primary-container uppercase tracking-[0.06em]">
            Stay Updated
          </h3>
          <p className="font-sans text-sm text-on-surface/70 leading-relaxed">
            Subscribe for technical SEO tips, AI workflow guides, and performance optimization insights.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[46px]"
            />
            <button
              type="submit"
              className="bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] py-2.5 rounded-lg hover:bg-primary transition-colors min-h-[46px] flex items-center justify-center cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-on-surface/70 relative z-10">
        <div>
          © {new Date().getFullYear()} Alain Dave Tapiru. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="hover:text-on-surface cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-on-surface cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
