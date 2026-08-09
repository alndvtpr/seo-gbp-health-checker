import React from 'react'
import { Metadata } from 'next'

import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Services',
  description: 'Digital engineering services including Frontend Architecture, WebGL, and Fullstack systems.',
  url: 'https://alaintapiru.com/services'
})

const services = [
  {
    title: 'Frontend Engineering',
    description: 'Building blazing fast, accessible, and responsive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.',
    icon: 'code'
  },
  {
    title: 'WebGL & Animation',
    description: 'Creating immersive digital experiences with vanilla WebGL, Three.js, and highly optimized requestAnimationFrame loops.',
    icon: 'animation'
  },
  {
    title: 'Fullstack Architecture',
    description: 'Designing scalable backend systems, APIs, and headless CMS integrations (Payload CMS) that seamlessly power frontend applications.',
    icon: 'architecture'
  },
  {
    title: 'Design Systems',
    description: 'Translating brand guidelines into robust, token-driven component libraries utilizing Material Design 3 principles.',
    icon: 'design_services'
  }
]

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <section className="mb-24 text-center">
          <h1 className="text-display-lg font-bold text-on-background mb-6 drop-shadow-md">
            Services & <span className="text-primary">Capabilities</span>.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Delivering end-to-end digital solutions that prioritize raw performance, striking aesthetics, and scalable engineering architecture.
          </p>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div 
              key={i}
              className="bg-surface/60 backdrop-blur-xl border border-on-surface/10 rounded-3xl p-8 md:p-10 hover:bg-surface-container-low hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary transition-colors duration-500">
                  {service.icon}
                </span>
              </div>
              <h2 className="text-headline-md font-bold text-on-surface mb-4">
                {service.title}
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
