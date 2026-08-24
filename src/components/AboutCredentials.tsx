'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/icons'

interface Certification {
  id: string
  title: string
  issuer: string
  issuedDate: string
  badge: string
  imageSrc: string
  downloadUrl: string
  downloadFilename: string
  verifyUrl?: string
  buttonText: string
}

interface EducationItem {
  degree: string
  details: string
  timeline?: string
  badge: string
  badgeVariant?: 'primary' | 'muted'
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'seo-bootcamp',
    title: 'Online SEO Bootcamp (Batch 32)',
    issuer: 'PinoySEO & SOVA Training',
    issuedDate: 'Issued Sept 2025',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/Alain Dave Tapiru -SEO Specialist Philippines Certificate.webp',
    downloadUrl: '/assets/certificates/Alain Dave Tapiru -SEO Specialist Philippines Certificate.webp',
    downloadFilename: 'Alain Dave Tapiru - SEO Specialist Philippines Certificate.webp',
    verifyUrl:
      'https://www.sova.ph/search-engine-optimization-bootcamp-graduates/search-engine-optimization-graduates-batch-32/#:~:text=Alain%20Dave%20Tapiru',
    buttonText: 'View Certificate',
  },
  {
    id: 'meta-social-media',
    title: 'Introduction to Social Media Marketing',
    issuer: 'Meta | Coursera',
    issuedDate: 'Issued Dec 2020',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/Introduction to Social Media Marketing.webp',
    downloadUrl: '/assets/certificates/Introduction to Social Media Marketing.pdf',
    downloadFilename: 'Introduction to Social Media Marketing - Alain Dave Tapiru.pdf',
    verifyUrl: 'https://www.coursera.org/verify/D48TRWWUSJJZ',
    buttonText: 'View / Verify',
  },
]

const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Information Technology',
    details: 'Specialization in Network & Cybersecurity',
    badge: 'In Progress',
    badgeVariant: 'primary',
  },
  {
    degree: 'Bachelor of Science in Information Technology (Undergraduate Coursework)',
    details: "Saint Mary's University, Bayombong, Nueva Vizcaya",
    timeline: '2014 – 2017',
    badge: 'Undergraduate Studies',
    badgeVariant: 'muted',
  },
]

export function AboutCredentials() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedCert(null)
  }, [])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedCert, closeModal])

  const renderModal = () => {
    if (!selectedCert || !mounted) return null

    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{ zIndex: 999999 }}
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-surface-1 border border-black/10 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 bg-surface-2 z-10 flex items-center justify-between gap-4 shrink-0">
            <div className="space-y-1 pr-2 min-w-0">
              <div className="flex items-center gap-2">
                {selectedCert.verifyUrl ? (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify Alain Dave Tapiru's ${selectedCert.title} credential on official registry (opens in new tab)`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
                  >
                    <Icon name="check_circle" size={11} className="text-emerald-400" />
                    {selectedCert.badge}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Icon name="check_circle" size={11} className="text-emerald-400" />
                    {selectedCert.badge}
                  </span>
                )}
                <span className="text-[11px] font-sans text-on-surface/50">
                  {selectedCert.issuedDate}
                </span>
              </div>
              <h3
                id="cert-modal-title"
                className="font-heading text-sm sm:text-base md:text-lg font-bold text-on-surface truncate"
              >
                {selectedCert.title}
              </h3>
              <p className="font-sans text-xs text-on-surface/60 truncate">{selectedCert.issuer}</p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close certificate preview"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-3 hover:bg-surface-1 text-on-surface/70 hover:text-on-surface border border-black/10 dark:border-white/10 transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Modal Body: Certificate Image */}
          <div className="w-full flex-1 flex items-center justify-center bg-black/80 p-3 sm:p-5 overflow-auto min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedCert.imageSrc}
              alt={`${selectedCert.title} - ${selectedCert.issuer}`}
              className="max-h-[48vh] sm:max-h-[52vh] max-w-full w-auto h-auto object-contain rounded-lg sm:rounded-xl shadow-xl border border-white/10"
            />
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 border-t border-black/10 dark:border-white/10 bg-surface-2 flex flex-wrap items-center justify-between gap-2.5 shrink-0 z-10">
            <div className="text-[11px] font-sans text-on-surface/50">
              Official credential issued to <span className="text-on-surface/80 font-medium">Alain Dave Tapiru</span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {/* Download Option */}
              <a
                href={selectedCert.downloadUrl}
                download={selectedCert.downloadFilename}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${selectedCert.title} certificate`}
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-surface hover:text-primary-container bg-surface-3 hover:bg-surface-1 border border-black/10 dark:border-white/10 px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
                title="Download certificate"
              >
                <Icon name="download" size={14} />
                <span>Download</span>
              </a>

              {/* Direct Verification Link (SOVA / Meta) */}
              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify Alain Dave Tapiru's ${selectedCert.title} on official registry (opens in new tab)`}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-primary-container bg-primary-container hover:bg-primary px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <span>Verify Online</span>
                  <Icon name="north_east" size={13} />
                </a>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="px-3.5 py-2 text-xs font-heading font-semibold text-on-surface/70 hover:text-on-surface bg-surface-3 hover:bg-surface-1 border border-black/10 dark:border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <section className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Section Header */}
      <div className="relative z-10 mb-8 sm:mb-10 motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Training &amp; Credentials
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          SEO Training, Credentials &amp; Education
        </h2>
      </div>

      <div className="space-y-8 sm:space-y-10 relative z-10">
        {/* Category 1: SEO Training & Verified Credentials */}
        <div className="motion-reveal">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary-container inline-block" />
            <h3 className="font-heading text-xs uppercase tracking-[0.08em] font-semibold text-on-surface/90">
              SEO Training &amp; Verified Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={cert.id}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="group p-4 sm:p-5 rounded-xl bg-surface-1/95 backdrop-blur-sm hover:bg-surface-2 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all duration-300 flex flex-col justify-between gap-4 motion-reveal shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify Alain Dave Tapiru's ${cert.title} certification (opens in new tab)`}
                        className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
                      >
                        <Icon name="check_circle" size={12} className="text-emerald-400" />
                        {cert.badge}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-[10px] font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icon name="check_circle" size={12} className="text-emerald-400" />
                        {cert.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-on-surface/60">
                    {cert.issuer} • {cert.issuedDate}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    aria-label={`View ${cert.title} certificate image preview`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary-container hover:text-primary transition-colors py-1 px-2.5 rounded-lg bg-primary-container/10 hover:bg-primary-container/20 border border-primary-container/20 cursor-pointer"
                  >
                    <span>{cert.buttonText}</span>
                    <Icon name="north_east" size={13} />
                  </button>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify Alain Dave Tapiru's ${cert.title} on official registry (opens in new tab)`}
                      className="text-xs font-sans text-on-surface/60 hover:text-primary-container underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Direct Verification Link</span>
                      <Icon name="north_east" size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Formal Education & Academic Background */}
        <div className="motion-reveal">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary-container inline-block" />
            <h3 className="font-heading text-xs uppercase tracking-[0.08em] font-semibold text-on-surface/90">
              Formal Education &amp; Academic Background
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {EDUCATION_HISTORY.map((edu, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="p-4 sm:p-5 rounded-xl bg-surface-1/95 backdrop-blur-sm border border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-2 transition-colors motion-reveal shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface">
                    {edu.degree}
                  </h4>
                  <p className="font-sans text-xs text-on-surface/60">
                    {edu.details}
                    {edu.timeline && (
                      <span className="text-on-surface/65"> • {edu.timeline}</span>
                    )}
                  </p>
                </div>

                <div className="self-start sm:self-auto shrink-0">
                  {edu.badgeVariant === 'primary' ? (
                    <span className="inline-block font-heading text-[11px] sm:text-xs text-primary-container bg-primary-container/10 border border-primary-container/25 px-3 py-1 rounded-full font-bold">
                      {edu.badge}
                    </span>
                  ) : (
                    <span className="inline-block font-heading text-[11px] sm:text-xs text-on-surface/70 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full font-medium">
                      {edu.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Portal Modal */}
      {renderModal()}
    </section>
  )
}
