import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { PROJECTS } from '@/features/projects'

export const SelectedWorkSection = () => {
  return (
    <section className="relative z-20 border-y border-primary-container/15 bg-surface-1/35 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between motion-reveal">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
              Selected work
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
              Three real implementation projects
            </h2>
          </div>
          <Link
            href="/projects/"
            className="inline-flex min-h-[44px] items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            View all projects <Icon name="arrow_forward" size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <article
              key={project.slug}
              style={{ transitionDelay: `${index * 70}ms` }}
              className="card-interactive-glow motion-reveal overflow-hidden border border-black/10 bg-surface-1/95 dark:border-white/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} project preview`}
                  fill
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 380px"
                  className="object-cover object-top transition-transform duration-[var(--motion-slow)] ease-[var(--ease-organic)] hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-primary-container/30 bg-primary-container/10 px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.06em] text-primary-container">
                    {project.proofLabel}
                  </span>
                  <span className="font-sans text-xs text-on-surface/60">{project.status}</span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-on-surface">{project.title}</h3>
                <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-on-surface/85">
                  Role: {project.exactRole}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface/70">
                  {project.workCompleted[0]}
                </p>
                <Link
                  href={`/projects/${project.slug}/`}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                >
                  View project breakdown <Icon name="arrow_forward" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
