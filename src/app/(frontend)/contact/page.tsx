'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Get In Touch
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6">
          Let&apos;s Build &amp; Rank Together
        </h1>
        <p className="font-sans text-on-surface/70 text-xs sm:text-base leading-relaxed">
          Have an SEO project, web design inquiry, or consultation request? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Contact Info & Status */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/10">
          {/* Availability Status Badge */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-primary-container/30 flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="font-heading text-xs font-bold text-on-surface block">Current Availability</span>
              <span className="font-sans text-[11px] sm:text-xs text-on-surface/70">Open for freelance SEO audits &amp; full-time roles</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-1 font-semibold">
                Direct Email
              </span>
              <a
                href="mailto:alaindavetapiru@gmail.com"
                className="font-heading text-base sm:text-lg font-bold text-on-surface hover:text-primary-container transition-colors break-all"
              >
                alaindavetapiru@gmail.com
              </a>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-1 font-semibold">
                Primary Focus
              </span>
              <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                Technical SEO Audits, Next.js Web Development, Local SEO Strategy, &amp; AI Integration.
              </p>
            </div>

            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-3 font-semibold">
                Connect Online
              </span>
              <div className="flex gap-3 sm:gap-4">
                {[
                  { name: 'Email', icon: 'mail', href: 'mailto:alaindavetapiru@gmail.com' },
                  { name: 'LinkedIn', icon: 'badge', href: '#' },
                  { name: 'GitHub', icon: 'code', href: '#' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-primary-container hover:text-primary-container text-on-surface transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
                    title={s.name}
                  >
                    <span className="material-symbols-outlined text-lg">{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/10">
          {submitted ? (
            <div className="py-12 sm:py-16 text-center space-y-4">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary-container">
                check_circle
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">Message Received!</h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70">
                Thank you for reaching out. I will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2">Send a Message</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-semibold">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container min-h-[44px]"
                />
              </div>

              <div>
                <label className="font-heading text-xs text-on-surface/80 uppercase tracking-wider block mb-2 font-semibold">
                  Project Details / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your SEO goals, technical requirements, or budget..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest py-3.5 sm:py-4 rounded-xl shadow-[0_0_25px_rgba(230,126,34,0.4)] hover:bg-primary transition-colors flex items-center justify-center gap-2 min-h-[48px]"
              >
                Send Inquiry <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
