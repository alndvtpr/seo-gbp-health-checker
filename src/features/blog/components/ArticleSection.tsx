import React from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { CodeBlock } from '@/components/CodeBlock'
import type { BlogSection } from '../types'

export interface ArticleSectionProps {
  section: BlogSection
  index: number
}

export function ArticleSection({ section, index }: ArticleSectionProps) {
  return (
    <section
      id={`section-${index + 1}`}
      className="space-y-6 scroll-mt-28 motion-reveal"
    >
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-snug">
        {section.heading}
      </h2>

      {section.body.map((para, pIdx) => (
        <p key={pIdx} className="leading-relaxed">
          {para}
        </p>
      ))}

      {section.codeBlock && (
        <CodeBlock
          code={section.codeBlock.code}
          language={section.codeBlock.language}
          filename={section.codeBlock.filename}
        />
      )}

      {section.highlight && (
        <div className="p-6 rounded-2xl bg-surface-1/90 border border-primary-container/30 border-l-4 border-l-primary-container my-6 space-y-2 shadow-lg">
          <span className="font-heading text-xs uppercase tracking-[0.08em] text-primary-container font-semibold block">
            {section.highlight.title}
          </span>
          <p className="text-sm sm:text-base text-on-surface/90 italic font-medium leading-relaxed">
            &ldquo;{section.highlight.text}&rdquo;
          </p>
        </div>
      )}

      {section.takeaways && section.takeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 space-y-3 my-6 shadow-sm">
          <span className="font-heading text-xs uppercase tracking-[0.08em] text-on-surface/70 font-semibold block">
            Key Takeaways
          </span>
          <ul className="space-y-2.5 text-sm sm:text-base">
            {section.takeaways.map((item, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2.5">
                <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-1" />
                <span className="text-on-surface/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section Image */}
      {section.image && (
        <figure className="w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg my-6">
          <Image
            src={section.image.src}
            alt={section.image.alt}
            width={800}
            height={450}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          {(section.image.caption || section.image.attribution) && (
            <figcaption className="px-4 py-3 bg-surface-1/95 border-t border-black/10 dark:border-white/10 text-xs font-sans text-on-surface/60 flex items-center justify-between gap-4">
              {section.image.caption && <span>{section.image.caption}</span>}
              {section.image.attribution && (
                <span className="text-on-surface/40 italic shrink-0">{section.image.attribution}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Source Attribution */}
      {section.sources && section.sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs font-sans text-on-surface/40">
          <span className="font-heading uppercase tracking-[0.08em] font-semibold text-on-surface/30">Sources:</span>
          {section.sources.map((source, sIdx) => (
            <a
              key={sIdx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-on-surface/50 hover:text-primary-container transition-colors underline underline-offset-2 decoration-on-surface/20 hover:decoration-primary-container/50"
            >
              {source.label}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
