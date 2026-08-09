import React from 'react'
import { Metadata } from 'next'

import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'About',
  description: 'Learn more about Alain Dave Tapiru, a multidisciplinary software engineer.',
  url: 'https://alaintapiru.com/about'
})

const competencies = [
  { category: 'Frontend Architecture', skills: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion, WebGL' },
  { category: 'Backend Systems', skills: 'Node.js, Payload CMS, PostgreSQL, MongoDB, RESTful APIs, GraphQL' },
  { category: 'Infrastructure', skills: 'Vercel, AWS, Docker, CI/CD Pipelines, Microservices' },
  { category: 'Design & UX', skills: 'Material Design 3 (M3), Figma, Design Systems, Typography, Motion Design' },
]

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <section className="mb-24">
          <h1 className="text-display-lg font-bold text-on-background mb-8 drop-shadow-md">
            About <span className="text-primary">Me</span>.
          </h1>
          <div className="max-w-3xl">
            <p className="text-body-lg text-on-surface-variant leading-relaxed mb-6">
              I am a multidisciplinary software engineer focused on crafting high-performance, visually stunning web applications. I bridge the gap between rigorous engineering and beautiful design.
            </p>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              With deep expertise in the React and Next.js ecosystem, alongside a strong foundation in modern CSS and WebGL, I build scalable systems that never compromise on user experience or aesthetic polish.
            </p>
          </div>
        </section>

        {/* Core Competencies Section */}
        <section className="bg-surface-container-low/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-on-surface/5 shadow-2xl mb-24">
          <h2 className="text-headline-lg font-bold text-on-surface mb-12">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {competencies.map((comp, i) => (
              <div key={i} className="group">
                <h3 className="text-headline-md font-semibold text-primary mb-4 flex items-center gap-4">
                  <span className="w-8 h-[2px] bg-primary/50 group-hover:w-12 transition-all duration-300"></span>
                  {comp.category}
                </h3>
                <p className="text-body-lg text-on-surface-variant leading-relaxed pl-12">
                  {comp.skills}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Resume / Experience Section Placeholder */}
        <section>
          <h2 className="text-headline-lg font-bold text-on-surface mb-12">
            Experience
          </h2>
          <div className="space-y-12">
            {[
              { role: 'Senior Frontend Engineer', company: 'Creative Studio', dates: '2023 - Present', desc: 'Spearheaded the development of a next-generation enterprise dashboard using Next.js and Tailwind v4. Improved rendering performance by 40% and implemented a comprehensive M3 design system.' },
              { role: 'Full Stack Developer', company: 'Tech Agency', dates: '2021 - 2023', desc: 'Architected and delivered high-traffic web applications. Integrated headless CMS solutions (Payload, Sanity) and built custom WebGL interactive marketing sites.' },
              { role: 'UI/UX Designer & Developer', company: 'Freelance', dates: '2019 - 2021', desc: 'Designed and developed custom portfolio sites, e-commerce platforms, and marketing pages with a heavy focus on animation and typography.' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12 pb-12 border-b border-on-surface/10 last:border-0 hover:bg-surface/30 p-6 -mx-6 rounded-2xl transition-colors">
                <div className="md:w-1/4 pt-1">
                  <span className="text-body-md font-medium text-on-surface-variant uppercase tracking-wider">
                    {item.dates}
                  </span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-headline-md font-bold text-on-surface mb-1">{item.role}</h3>
                  <h4 className="text-body-lg text-primary mb-4 font-medium">{item.company}</h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
