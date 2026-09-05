import React from 'react'
import Image from 'next/image'

export function ProjectGallery({ gallery, title }: { gallery?: string[]; title: string }) {
  if (!gallery || gallery.length <= 1) return null

  return (
    <section className="space-y-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-black/10 dark:border-white/10 motion-reveal shadow-sm">
      <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
        Visual Captures
      </span>
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
        Staging &amp; Interface Screenshots
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gallery.map((img, idx) => (
          <div
            key={idx}
            className="relative h-60 sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40"
          >
            <Image
              src={img}
              alt={`${title} Preview ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain bg-black/5 dark:bg-black/60"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
