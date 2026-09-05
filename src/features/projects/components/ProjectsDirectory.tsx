'use client'

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/icons'
import { PROJECTS, type Project } from '../data/projects'
import { useModalFocus } from '@/hooks/useModalFocus'

const CATEGORIES = ['All', 'WordPress', 'Technical SEO', 'Local SEO'] as const
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ProjectsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null)
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const modalRef = useRef<HTMLDivElement>(null)
  const modalTitleRef = useRef<HTMLHeadingElement>(null)

  const closeModal = useCallback(() => {
    setActiveModalProject(null)
    setActiveGalleryImage(null)
  }, [])

  useModalFocus({
    active: Boolean(activeModalProject),
    containerRef: modalRef,
    initialFocusRef: modalTitleRef,
    onEscape: closeModal,
  })

  // Body scroll lock while the modal is active.
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModalProject])

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory || p.tags.includes(selectedCategory))

  const renderModal = () => {
    if (!activeModalProject || !mounted) return null

    const currentImage = activeGalleryImage || activeModalProject.image

    return createPortal(
      <div
        ref={modalRef}
        id="project-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{ zIndex: 999999 }}
        onClick={closeModal}
      >
        <div
          className="relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-black/10 bg-surface-1 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:max-h-[92dvh] sm:rounded-3xl dark:border-white/15"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-black/10 dark:border-white/10 bg-surface-2 z-10 flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-1.5 pr-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-black/5 dark:bg-white/5 text-on-surface/80 border border-black/10 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  {activeModalProject.proofLabel}
                </span>
                {activeModalProject.status === 'Ongoing' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Ongoing Build
                  </span>
                )}
                <span className="font-heading text-[11px] text-primary-container uppercase tracking-wider font-bold">
                  {activeModalProject.category}
                </span>
              </div>
              <h2
                ref={modalTitleRef}
                id="project-modal-title"
                tabIndex={-1}
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
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-on-surface border border-black/10 dark:border-white/10 transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-surface-1">
            {/* Primary Visual Preview */}
            <div className="relative w-full h-[220px] sm:h-[340px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/60 shadow-md">
              <Image
                src={currentImage}
                alt={activeModalProject.imageAlt || activeModalProject.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain object-center"
              />
            </div>

            {/* Gallery Thumbnails if Available */}
            {activeModalProject.gallery && activeModalProject.gallery.length > 1 && (
              <div className="space-y-2">
                <span className="font-heading text-[10px] sm:text-xs text-on-surface/70 uppercase tracking-[0.08em] block font-semibold">
                  Preview Captures ({activeModalProject.gallery.length})
                </span>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {activeModalProject.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryImage(img)}
                      aria-label={`Show ${activeModalProject.title} preview image ${idx + 1}`}
                      aria-pressed={currentImage === img}
                      className={`relative h-16 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        currentImage === img
                          ? 'border-primary-container ring-2 ring-primary-container/40'
                          : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-black/30 dark:hover:border-white/30'
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

            {/* 1. Problem / Goal */}
            <div className="space-y-2.5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-2 border border-black/10 dark:border-white/10">
              <span className="font-heading text-[11px] text-primary-container font-bold uppercase tracking-wider block">
                01. Problem &amp; Project Goal
              </span>
              <h3 className="font-heading text-sm sm:text-base font-bold text-on-surface">
                What Was Being Solved
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
                {activeModalProject.problemOrGoal}
              </p>
            </div>

            {/* 2. Alain's Exact Role */}
            <div className="space-y-2.5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-2 border border-black/10 dark:border-white/10">
              <span className="font-heading text-[11px] text-primary-container font-bold uppercase tracking-wider block">
                02. Exact Role &amp; Ownership
              </span>
              <h3 className="font-heading text-sm sm:text-base font-bold text-on-surface">
                {activeModalProject.exactRole}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">
                {activeModalProject.fullDescription}
              </p>
            </div>

            {/* 3. Work Completed */}
            {activeModalProject.workCompleted && activeModalProject.workCompleted.length > 0 && (
              <div className="space-y-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-2 border border-black/10 dark:border-white/10">
                <span className="font-heading text-[11px] text-primary-container font-bold uppercase tracking-wider block">
                  03. Hands-On Work Completed
                </span>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-on-surface/80">
                  {activeModalProject.workCompleted.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Icon name="check_circle" size={15} className="text-primary-container shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Methods & Tools Used */}
            <div className="space-y-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-2 border border-black/10 dark:border-white/10">
              <span className="font-heading text-[11px] text-primary-container font-bold uppercase tracking-wider block">
                04. Tools &amp; Methods Applied
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.methodsAndTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-surface-1 border border-black/10 dark:border-white/10 text-xs font-heading font-medium text-on-surface"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Empirical Validation & Benchmarks */}
            <div className="space-y-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <span className="font-heading text-[11px] text-emerald-700 dark:text-emerald-500 font-bold uppercase tracking-wider block">
                05. Practical Validation &amp; Link
              </span>
              <p className="font-sans text-xs sm:text-sm text-on-surface/85 leading-relaxed">
                {activeModalProject.validationNotes}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-black/10 dark:border-white/10 bg-surface-2 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10">
            <div className="text-[11px] font-sans text-on-surface/70">
              Role: <span className="text-on-surface font-medium">{activeModalProject.role}</span>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              <Link
                href={`/projects/${activeModalProject.slug}/`}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-surface hover:text-primary-container bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Full Project Breakdown</span>
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
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-primary-container bg-primary-container hover:bg-primary px-4 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer"
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
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 motion-reveal">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isActive}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-heading tracking-[0.04em] transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_25px_rgba(224,123,32,0.35)]'
                  : 'bg-surface-1/90 text-on-surface/80 hover:text-primary-container hover:bg-surface-2 border border-black/10 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((proj, idx) => (
          <div
            key={proj.id}
            style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
            className="group rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 flex flex-col justify-between overflow-hidden shadow-lg card-interactive-glow card-image-zoom motion-reveal"
          >
            <div>
              {/* Project Card Image Preview */}
              <button
                type="button"
                aria-label={`Open ${proj.title} project breakdown`}
                className="relative block w-full h-48 sm:h-52 bg-black/40 overflow-hidden cursor-pointer text-left"
                onClick={() => setActiveModalProject(proj)}
              >
                <Image
                  src={proj.image}
                  alt={proj.imageAlt || proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Floating Status / Proof Badge */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-surface-1/90 text-on-surface border border-black/10 dark:border-white/10 backdrop-blur-md shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                    {proj.proofLabel}
                  </span>
                  {proj.status === 'Ongoing' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-surface-1/90 text-amber-700 dark:text-amber-500 border border-amber-500/40 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Ongoing Build
                    </span>
                  )}
                </div>
              </button>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading text-xs text-primary-container uppercase tracking-wider font-semibold">
                    {proj.category}
                  </span>
                  <span className="text-xs font-sans text-on-surface/70">
                    {proj.role}
                  </span>
                </div>

                <h2 className="font-heading text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(proj)}
                    className="text-left hover:text-primary-container"
                  >
                    {proj.title}
                  </button>
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
                      className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-heading text-on-surface/80 uppercase tracking-wider font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-5 sm:p-6 pt-0 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProject(proj)}
                className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-[0.06em] font-bold text-on-surface hover:text-primary-container transition-colors py-1 cursor-pointer"
              >
                <span>5-Part Breakdown</span>
                <Icon name="arrow_forward" size={14} />
              </button>

              <Link
                href={`/projects/${proj.slug}/`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-black/10 dark:border-white/10 hover:border-primary-container/30 text-xs font-heading font-bold text-on-surface hover:text-primary-container transition-all"
              >
                <span>Case Details</span>
                <Icon name="arrow_forward" size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Transparency Note: How Projects Become Case Studies */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-primary-container/20 shadow-md space-y-3 motion-reveal">
        <div className="flex items-center gap-2.5">
          <Icon name="verified_user" size={18} className="text-primary-container" />
          <h3 className="font-heading text-sm sm:text-base font-bold text-on-surface">
            How Projects Become Case Studies &amp; Data Transparency
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed">
          All projects displayed above represent real, verifiable implementations with defined scopes. To maintain strict client confidentiality and non-disclosure standards, commercial client data, private Search Console performance graphs, and proprietary business metrics are published only with explicit client permission and appropriate context.
        </p>
      </div>

      {/* Render React Portal Modal */}
      {renderModal()}
    </div>
  )
}
