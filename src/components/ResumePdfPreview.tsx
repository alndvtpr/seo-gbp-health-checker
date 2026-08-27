'use client'

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/icons'

const RESUME_URL = '/Alain_Dave_Tapiru_Resume.pdf'
const RESUME_FILENAME = 'Alain_Dave_Tapiru_Resume.pdf'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ResumePdfPreview() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inlineOpen, setInlineOpen] = useState(false)
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const inlineIframeRef = useRef<HTMLIFrameElement>(null)
  const modalIframeRef = useRef<HTMLIFrameElement>(null)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  // Keyboard navigation & body scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal()
      }
    }

    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [modalOpen, closeModal])

  const handlePrint = (targetIframe: HTMLIFrameElement | null) => {
    if (targetIframe && targetIframe.contentWindow) {
      try {
        targetIframe.contentWindow.focus()
        targetIframe.contentWindow.print()
        return
      } catch {
        // Fallback
      }
    }
    const printWindow = window.open(RESUME_URL, '_blank')
    if (printWindow) {
      printWindow.focus()
    }
  }

  return (
    <>
      {/* In-Page Styled Resume PDF Preview Card */}
      <section
        id="resume-pdf-preview"
        aria-labelledby="resume-preview-title"
        className="overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-surface-1 shadow-sm motion-reveal"
      >
        {/* Header Bar matching video design */}
        <div className="flex flex-col gap-3.5 border-b border-black/10 bg-surface-1 p-4 sm:p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Document details */}
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-primary-container/30 bg-primary-container/10 text-primary-container">
              <Icon name="description" size={22} />
            </span>

            <div className="min-w-0 space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="resume-preview-title"
                  className="font-heading text-sm sm:text-base font-bold tracking-tight text-on-surface"
                >
                  Alain_Dave_Tapiru_Resume.pdf
                </h2>
                <span className="rounded-md border border-primary-container/30 bg-primary-container/10 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.06em] text-primary-container">
                  Official PDF
                </span>
              </div>
              <p className="truncate font-sans text-xs text-on-surface/65 sm:text-sm">
                Alain Dave G. Tapiru &bull; SEO Specialist &amp; Web Developer &bull; 1-Page PDF
              </p>
            </div>
          </div>

          {/* Right: Actions (Preview, Download, Print, Open Tab) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-primary-container px-3.5 sm:px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container shadow-xs"
            >
              <Icon name="visibility" size={15} />
              <span>Preview PDF</span>
            </button>

            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-2 px-3 sm:px-3.5 py-2 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface transition-colors hover:border-primary-container/40 hover:bg-surface-3 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:border-white/15"
            >
              <Icon name="download" size={14} />
              <span>Download</span>
            </a>

            <button
              type="button"
              onClick={() => handlePrint(inlineIframeRef.current)}
              className="inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-2 px-3 sm:px-3.5 py-2 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface transition-colors hover:border-primary-container/40 hover:bg-surface-3 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:border-white/15"
            >
              <Icon name="print" size={14} />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-2 px-3 sm:px-3.5 py-2 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface transition-colors hover:border-primary-container/40 hover:bg-surface-3 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:border-white/15"
            >
              <Icon name="north_east" size={13} />
              <span className="hidden sm:inline">Open Tab</span>
            </a>
          </div>
        </div>

        {/* In-Page Interactive Showcase Box (No auto-download on load) */}
        {!inlineOpen ? (
          <div className="p-4 sm:p-6 bg-surface-2/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0 border border-primary-container/20">
                <Icon name="picture_as_pdf" size={20} />
              </div>
              <div className="space-y-0.5 text-left">
                <p className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                  Verified Executive Resume &bull; 1-Page ATS Standard
                </p>
                <p className="font-sans text-[11px] sm:text-xs text-on-surface/65">
                  Click preview to view in fullscreen, or load the document in-page below.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex min-h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-primary-container px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container transition-colors hover:bg-primary shadow-xs"
              >
                <Icon name="fullscreen" size={15} />
                <span>Fullscreen View</span>
              </button>
              <button
                type="button"
                onClick={() => setInlineOpen(true)}
                className="flex-1 sm:flex-none inline-flex min-h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-1 px-3.5 py-2 font-heading text-xs font-semibold text-on-surface transition-colors hover:border-primary-container/40 hover:text-primary-container dark:border-white/15"
              >
                <Icon name="expand_more" size={15} />
                <span>Load In-Page</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-[#1e2227] p-2 sm:p-3">
            <div className="h-[65vh] min-h-[480px] max-h-[800px] w-full rounded-lg overflow-hidden bg-white shadow-md relative">
              <iframe
                ref={inlineIframeRef}
                src={`${RESUME_URL}#view=FitH`}
                title="Alain Dave G. Tapiru resume PDF inline preview"
                className="h-full w-full rounded-lg border-0 bg-white"
              />
            </div>

            <div className="flex items-center justify-between px-2 pt-2 text-[11px] font-sans text-white/60">
              <span>1-Page Document</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-1 text-primary-container hover:underline"
                >
                  <span>Fullscreen</span>
                  <Icon name="fullscreen" size={13} />
                </button>
                <span>&bull;</span>
                <button
                  type="button"
                  onClick={() => setInlineOpen(false)}
                  className="inline-flex cursor-pointer items-center gap-1 text-white/75 hover:text-white hover:underline"
                >
                  <span>Collapse</span>
                  <Icon name="expand_less" size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fullscreen Video-Matching Modal Overlay (React Portal) */}
      {modalOpen &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-resume-title"
            className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <div className="flex flex-col w-full max-w-5xl h-[92vh] max-h-[92vh] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/15 bg-surface-1 shadow-2xl overflow-hidden">
              {/* Modal Header Bar matching Jordan video */}
              <div className="flex flex-col gap-3 border-b border-black/10 bg-surface-1 p-3.5 sm:p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between shrink-0">
                {/* Left side details */}
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-container/30 bg-primary-container/10 text-primary-container">
                    <Icon name="description" size={20} />
                  </span>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        id="modal-resume-title"
                        className="font-heading text-sm sm:text-base font-bold tracking-tight text-on-surface"
                      >
                        Alain_Dave_Tapiru_Resume.pdf
                      </h3>
                      <span className="rounded-md border border-primary-container/30 bg-primary-container/10 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.06em] text-primary-container">
                        Official PDF
                      </span>
                    </div>
                    <p className="truncate font-sans text-xs text-on-surface/65">
                      Alain Dave G. Tapiru &bull; SEO Specialist &amp; Web Developer &bull; 1 Page
                    </p>
                  </div>
                </div>

                {/* Right side buttons: Download, Print, Open Tab, Close */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-end sm:self-auto">
                  <a
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-xl bg-primary-container px-3.5 sm:px-4 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container transition-colors hover:bg-primary shadow-xs"
                  >
                    <Icon name="download" size={14} />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handlePrint(modalIframeRef.current)}
                    className="inline-flex h-9 sm:h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-2 px-3 sm:px-3.5 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface transition-colors hover:border-primary-container/40 hover:bg-surface-3 hover:text-primary-container dark:border-white/15"
                  >
                    <Icon name="print" size={14} />
                    <span>Print</span>
                  </button>

                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-surface-2 px-3 sm:px-3.5 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface transition-colors hover:border-primary-container/40 hover:bg-surface-3 hover:text-primary-container dark:border-white/15"
                  >
                    <Icon name="north_east" size={13} />
                    <span>Open Tab</span>
                  </a>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close modal preview"
                    className="inline-flex h-9 w-9 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-surface-2 text-on-surface transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500 dark:border-white/15 ml-1"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Viewer Body */}
              <div className="flex-1 w-full bg-[#1e2227] p-2 sm:p-3 overflow-hidden">
                <div className="h-full w-full rounded-lg overflow-hidden bg-white shadow-inner relative">
                  <iframe
                    ref={modalIframeRef}
                    src={`${RESUME_URL}#view=FitH`}
                    title="Alain Dave G. Tapiru resume PDF modal preview"
                    className="h-full w-full rounded-lg border-0 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
