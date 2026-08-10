'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-[#0b0d0d] text-on-surface w-full pt-16 pb-12 px-6 md:px-16 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5">
              <Image
                src="/Alain-Dave-Tapiru-SEO-Specialist-Philippines-Logo.webp"
                alt="Alain Dave Tapiru SEO Specialist Philippines Logo"
                width={40}
                height={40}
                className="object-contain p-0.5 w-full h-full"
              />
            </div>
            <span className="font-heading font-bold text-on-surface text-xl">
              Alain Dave <span className="text-primary-container">Tapiru</span>
            </span>
          </div>
          <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
            SEO Specialist, Web Designer, &amp; Cybersecurity Enthusiast. Crafting high-converting digital experiences through data-driven search strategies.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-primary-container uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 font-sans text-xs text-on-surface/70">
            <li>
              <Link href="/" className="hover:text-primary-container transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-container transition-colors">About Me</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary-container transition-colors">Projects &amp; Case Studies</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary-container transition-colors">Blog / SEO News</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary-container transition-colors">Contact / Hire Me</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Tools & Services */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-primary-container uppercase tracking-wider">
            Tools &amp; Services
          </h4>
          <ul className="space-y-2 font-sans text-xs text-on-surface/70">
            <li>
              <Link href="/services" className="hover:text-primary-container transition-colors">Technical SEO Audit</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary-container transition-colors">AI Web Design</Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-primary-container transition-colors">SEO Specialist Salary Calculator</Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-primary-container transition-colors">Website Audit Request</Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-primary-container transition-colors">Local SEO / GBP Auditor</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-primary-container uppercase tracking-wider">
            Stay Updated
          </h4>
          <p className="font-sans text-xs text-on-surface/70">
            Subscribe for technical SEO tips, AI workflow guides, and performance optimization insights.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary-container"
            />
            <button
              type="submit"
              className="bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-primary transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-on-surface/50">
        <div>
          © {new Date().getFullYear()} Alain Dave Tapiru. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="hover:text-on-surface/80 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-on-surface/80 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
