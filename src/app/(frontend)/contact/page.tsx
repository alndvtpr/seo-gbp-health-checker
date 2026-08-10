import React from 'react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Contact Alain Dave Tapiru – Hire SEO Specialist',
  description:
    'Get in touch with Alain Dave Tapiru for Technical SEO audits, Next.js web application development, and executive virtual assistance.',
  url: 'https://alaintapiru.com/contact',
})

export default function ContactPage() {
  return (
    <main className="relative z-10 flex-grow pt-28 sm:pt-32 md:pt-36 pb-20 px-6 md:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-sm text-xs uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Currently open for freelance projects &amp; full-time roles
          </div>

          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-extrabold leading-tight">
            Initiate Project Collaboration
          </h1>
          <p className="font-body-lg text-on-surface-variant text-base">
            Have a technical SEO question, need a site audit, or looking to build a high-performance web platform? Send a direct inquiry below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-7 glass-panel p-8 rounded-2xl border border-white/10">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Your Full Name
                </label>
                <input
                  type="text" id="name" name="name" required placeholder="John Doe"
                  className="w-full bg-surface-container-high border-b-2 border-white/20 focus:border-primary-container text-on-surface px-4 py-3 text-sm focus:outline-none transition-colors rounded-t"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Email Address
                </label>
                <input
                  type="email" id="email" name="email" required placeholder="john@example.com"
                  className="w-full bg-surface-container-high border-b-2 border-white/20 focus:border-primary-container text-on-surface px-4 py-3 text-sm focus:outline-none transition-colors rounded-t"
                />
              </div>

              <div>
                <label htmlFor="website" className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Website URL (Optional)
                </label>
                <input
                  type="url" id="website" name="website" placeholder="https://yourwebsite.com"
                  className="w-full bg-surface-container-high border-b-2 border-white/20 focus:border-primary-container text-on-surface px-4 py-3 text-sm focus:outline-none transition-colors rounded-t"
                />
              </div>

              <div>
                <label htmlFor="service" className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Service Needed
                </label>
                <select
                  id="service" name="service"
                  className="w-full bg-surface-container-high border-b-2 border-white/20 focus:border-primary-container text-on-surface px-4 py-3 text-sm focus:outline-none transition-colors rounded-t"
                >
                  <option value="seo">Technical SEO &amp; Audit</option>
                  <option value="webdev">Next.js Web Engineering</option>
                  <option value="va">Executive Virtual Assistance</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Project Details / Inquiry Brief
                </label>
                <textarea
                  id="message" name="message" rows={4} required
                  placeholder="Describe your current search rankings, project goals, and timeline..."
                  className="w-full bg-surface-container-high border-b-2 border-white/20 focus:border-primary-container text-on-surface px-4 py-3 text-sm focus:outline-none transition-colors rounded-t resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e67e22] hover:bg-[#ff9436] text-white font-label-sm uppercase tracking-widest py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(230,126,34,0.4)] active:scale-95 cursor-pointer"
              >
                Send Message <span className="text-base">→</span>
              </button>
            </form>
          </div>

          {/* Details & Social Links */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
              <h3 className="font-headline-md text-xl text-on-surface font-bold">Direct Channels</h3>

              <div className="space-y-4 font-body-md text-on-surface-variant text-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-xl">mail</span>
                  <a href="mailto:alaintapiru@gmail.com" className="hover:text-primary transition-colors text-on-surface font-semibold">
                    alaintapiru@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-xl">location_on</span>
                  <span>Philippines (Serving Global Clients)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest block font-semibold">
                  Social Profiles
                </span>
                <div className="flex flex-col gap-2">
                  <a href="https://linkedin.com/in/alaintapiru" target="_blank" rel="noreferrer"
                    className="font-label-sm text-xs text-primary-container hover:text-primary transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">link</span> LinkedIn Profile
                  </a>
                  <a href="https://github.com/alndvtpr" target="_blank" rel="noreferrer"
                    className="font-label-sm text-xs text-primary-container hover:text-primary transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">code</span> GitHub Repository
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Response Guarantee</h4>
              <p className="font-body-md text-secondary-fixed-dim text-xs leading-relaxed">
                All client inquiries and technical audit requests receive a direct response within 12–24 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
