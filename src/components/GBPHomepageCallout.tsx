'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Zap, FileText } from 'lucide-react'

export const GBPHomepageCallout = () => {
  return (
    <section className="py-12 sm:py-20 bg-transparent relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#181a1b] via-[#141617] to-[#121414] border border-primary-container/30 p-6 sm:p-10 md:p-14 shadow-[0_0_60px_rgba(230,126,34,0.15)] overflow-hidden">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Left Content Area */}
            <div className="space-y-4 sm:space-y-6 max-w-2xl text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-widest bg-primary-container/15 text-primary-container border border-primary-container/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Diagnostic Tool</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-3 h-3" />
                  <span>2026 Engine</span>
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
                Audit Your Google Business Profile &amp;{' '}
                <span className="text-primary-container">Outrank Local Rivals</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface/80 leading-relaxed">
                Identify critical category misclassifications, verify 10 essential public trust signals, benchmark against top Map Pack competitors, and instantly generate an executive 30-Day Action Plan with exportable PDF deliverables.
              </p>

              {/* Feature Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10-Point Public Signal Audit</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Semantic Category AI &amp; Mismatch Alerts</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Map Pack Competitor Benchmarking</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3-Page Executive PDF Roadmap Export</span>
                </div>
              </div>
            </div>

            {/* Right Action Card / Interactive Preview */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center sm:items-stretch gap-3 sm:gap-4 p-6 sm:p-8 rounded-2xl bg-[#1a1c1e]/90 border border-white/10 shadow-2xl text-center max-w-sm">
              <div className="space-y-1">
                <span className="font-heading text-[10px] uppercase tracking-widest text-primary-container font-bold">
                  Zero Cost • Instant Execution
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                  Live GBP Health Checker
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-left">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-on-surface/60">Audit Speed:</span>
                  <span className="font-bold text-emerald-400">~3 seconds</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-on-surface/60">Export Format:</span>
                  <span className="font-bold text-on-surface">Multi-Page PDF</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-on-surface/60">Access:</span>
                  <span className="font-bold text-primary-container">100% Free</span>
                </div>
              </div>

              <Link
                href="/tools/"
                className="w-full min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-[0_0_25px_rgba(230,126,34,0.4)] hover:bg-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Launch Audit Tool Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="text-[10px] text-on-surface/50 font-sans">
                No credit card or registration required. Instant analysis.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
