'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/icons'
import { PROJECTS, type Project } from '@/data/projects'

const CATEGORIES = ['All', 'WordPress', 'Technical SEO', 'Local SEO'] as const

export function ProjectsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModalProject(null)
    setActiveGalleryImage(null)
  }, [])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeModalProject, closeModal])

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory || p.tags.includes(selectedCategory))

  const renderModal = () => {
    if (!activeModalProject || !mounted) return null

    const currentImage = activeGalleryImage || activeModalProject.image

    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{ zIndex: 999999 }}
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#141414] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#181818] z-10 flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-1.5 pr-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {activeModalProject.status === 'Ongoing' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Ongoing Build
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live Project
                  </span>
                )}
                <span className="font-heading text-[11px] text-primary-container uppercase tracking-wider font-bold">
                  {activeModalProject.category}
                </span>
                <span className="text-[11px] font-sans text-on-surface/60">•</span>
                <span className="text-[11px] font-sans text-on-surface/75">
                  {activeModalProject.role}
                </span>
              </div>
              <h2
                id="project-modal-title"
                className="font-heading text-lg sm:text-2xl md:text-3xl font-extrabold text-on-surface"
              >
                {activeModalProject.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-primary-container font-medium">
                &ldquo;{activeModalProject.tagline}&rdquo;
              </p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close project modal"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-on-surface/70 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-[#121414]/90">
            {/* Primary Visual Preview */}
            <div className="relative w-full h-[220px] sm:h-[340px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl">
              <Image
                src={currentImage}
                alt={activeModalProject.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain object-center"
              />
            </div>

            {/* Gallery Thumbnails if Available */}
            {activeModalProject.gallery && activeModalProject.gallery.length > 1 && (
              <div className="space-y-2">
                <span className="font-heading text-[10px] sm:text-xs text-on-surface/50 uppercase tracking-widest block font-bold">
                  Preview Screenshots ({activeModalProject.gallery.length})
                </span>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {activeModalProject.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryImage(img)}
                      className={`relative h-16 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        currentImage === img
                          ? 'border-primary-container ring-2 ring-primary-container/40'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${activeModalProject.title} screenshot ${idx + 1}`}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Project Overview */}
            <div className="space-y-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-primary-container uppercase tracking-widest">
                Project Architecture &amp; Overview
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
                {activeModalProject.fullDescription}
              </p>
            </div>

            {/* PageSpeed Performance Highlight for alaintapiru-portfolio */}
            {activeModalProject.slug === 'alaintapiru-portfolio' && (
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#181a1b] to-emerald-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span> Google PageSpeed Insights Benchmark
                  </span>
                  <span className="text-[10px] font-heading font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    100% Passed Vitals
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-base sm:text-lg font-black font-heading text-amber-400">99 / 100</div>
                    <div className="text-[10px] font-heading text-on-surface/60 uppercase">Desktop Score</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-base sm:text-lg font-black font-heading text-emerald-400">96 / 100</div>
                    <div className="text-[10px] font-heading text-on-surface/60 uppercase">Mobile Score</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-base sm:text-lg font-black font-heading text-emerald-400">100 / 100</div>
                    <div className="text-[10px] font-heading text-on-surface/60 uppercase">Best Practices</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-base sm:text-lg font-black font-heading text-emerald-400">100 / 100</div>
                    <div className="text-[10px] font-heading text-on-surface/60 uppercase">SEO Health</div>
                  </div>
                </div>
              </div>
            )}

            {/* 3-Pillar Methodology (ANGAT, MAKITA, MASIKAT) */}
            {activeModalProject.pillars && activeModalProject.pillars.length > 0 && (
              <div className="space-y-3">
                <span className="font-heading text-[10px] sm:text-xs text-primary-container uppercase tracking-widest block font-bold">
                  Core Methodology &amp; Execution Framework
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {activeModalProject.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-container/30 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading text-sm sm:text-base font-black text-on-surface tracking-wider">
                          {pillar.name}
                        </span>
                        <span className="font-heading text-xs font-bold text-primary-container/60">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                        {pillar.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Services & Capabilities */}
            {activeModalProject.coreServices && activeModalProject.coreServices.length > 0 && (
              <div className="space-y-3">
                <span className="font-heading text-[10px] sm:text-xs text-on-surface/50 uppercase tracking-widest block font-bold">
                  Structured Service Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {activeModalProject.coreServices.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <Icon name="check_circle" size={14} className="text-primary-container shrink-0" />
                      <span className="font-sans text-xs text-on-surface/80">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2.5">
              <span className="font-heading text-[10px] sm:text-xs text-on-surface/50 uppercase tracking-widest block font-bold">
                Technologies &amp; Platform Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-heading font-medium text-on-surface/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#181818] flex flex-wrap items-center justify-between gap-3 shrink-0 z-10">
            <div className="text-[11px] font-sans text-on-surface/50">
              Role: <span className="text-on-surface/80 font-medium">{activeModalProject.role}</span>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              <Link
                href={`/projects/${activeModalProject.slug}/`}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-surface hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Full Case Study</span>
                <Icon name="arrow_forward" size={14} />
              </Link>

              <a
                href={activeModalProject.liveUrl}
                target={activeModalProject.liveUrl.startsWith('http') ? '_blank' : undefined}
                rel={
                  activeModalProject.rel ||
                  (activeModalProject.liveUrl.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined)
                }
                aria-label={`Open ${activeModalProject.title} external build (opens in new tab)`}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-primary-container bg-primary-container hover:bg-primary px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all cursor-pointer"
              >
                <span>{activeModalProject.ctaText || 'View Live Build'}</span>
                <Icon name="north_east" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-heading tracking-[0.04em] transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_25px_rgba(224,123,32,0.35)] scale-105'
                  : 'bg-surface-1/90 text-on-surface/70 hover:text-white hover:bg-surface-2 border border-white/10'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-2xl sm:rounded-3xl bg-surface-1/80 border border-white/5 hover:border-primary-container/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div>
              {/* Project Card Image Preview */}
              <div
                className="relative w-full h-48 sm:h-52 bg-black/40 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalProject(proj)}
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent opacity-80" />

                {/* Floating Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  {proj.status === 'Ongoing' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-[#121414]/90 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Ongoing Build
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-[#121414]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live Project
                    </span>
                  )}
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading text-[11px] text-primary-container uppercase tracking-[0.08em] font-semibold">
                    {proj.category}
                  </span>
                  <span className="text-xs font-sans text-on-surface/70">
                    {proj.role}
                  </span>
                </div>

                <h2
                  className="font-heading text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setActiveModalProject(proj)}
                >
                  {proj.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-primary-container/90 italic">
                  &ldquo;{proj.tagline}&rdquo;
                </p>

                <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed line-clamp-3">
                  {proj.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-heading text-on-surface/70 uppercase tracking-wider font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProject(proj)}
                className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-[0.06em] font-bold text-on-surface hover:text-primary-container transition-colors py-1 cursor-pointer"
              >
                <span>Details &amp; Framework</span>
                <Icon name="arrow_forward" size={14} />
              </button>

              <a
                href={proj.liveUrl}
                target={proj.liveUrl.startsWith('http') ? '_blank' : undefined}
                rel={
                  proj.rel ||
                  (proj.liveUrl.startsWith('http')
                     ? 'noopener noreferrer'
                     : undefined)
                }
                aria-label={`Open ${proj.title} external build (opens in new tab)`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-primary-container/20 border border-white/10 hover:border-primary-container/30 text-xs font-heading font-bold text-on-surface hover:text-primary-container transition-all"
              >
                <span>{proj.ctaText || 'Live Build'}</span>
                <Icon name="north_east" size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Render React Portal Modal */}
      {renderModal()}
    </div>
  )
}
