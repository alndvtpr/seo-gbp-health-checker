import React from 'react'
import Image from 'next/image'
import type { BlogImage } from '../types'

export interface ArticleHeroImageProps {
  image: BlogImage
}

export function ArticleHeroImage({ image }: ArticleHeroImageProps) {
  return (
    <figure className="w-full max-w-4xl rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg motion-reveal">
      <Image
        src={image.src}
        alt={image.alt}
        width={1200}
        height={630}
        priority
        className="w-full h-auto object-cover"
      />
      {(image.caption || image.attribution) && (
        <figcaption className="px-4 py-3 bg-surface-1/95 border-t border-black/10 dark:border-white/10 text-xs font-sans text-on-surface/60 flex items-center justify-between gap-4">
          {image.caption && <span>{image.caption}</span>}
          {image.attribution && (
            <span className="text-on-surface/40 italic shrink-0">{image.attribution}</span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
