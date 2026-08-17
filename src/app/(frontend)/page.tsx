// @ts-ignore: IDE cache bug with PNPM
import { getPayload } from 'payload'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { OpenToOpportunities } from '@/components/OpenToOpportunities'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | SEO Specialist & Web Designer',
  description: 'BSIT Network & Cybersecurity student, Technical SEO Specialist, Web Designer, and AI Tech Enthusiast.',
  url: 'https://alaintapiru.com'
})

export const revalidate = 3600 // Revalidate every hour

export default async function Page() {
  let page: PayloadPage | null = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'index',
        },
      },
    })
    page = docs[0] ?? null
  } catch (err) {
    console.error('Payload DB check:', err)
  }

  return (
    <>
      <LivePreviewListener />
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

      {/* 2. TOOLS I USE GRID */}
      <section className="py-12 sm:py-16 bg-transparent border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 text-center">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Technical Stack
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface mb-6 sm:mb-8">
            Tools &amp; Technologies I Master
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { 
                name: 'Ahrefs', 
                cat: 'SEO & Audit', 
                svg: <><text x="40%" y="52%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontFamily="sans-serif" fontSize="22" fill="currentColor">a</text><circle cx="18" cy="16" r="2.5" fill="currentColor" /></> 
              },
              { 
                name: 'Cloudflare', 
                cat: 'CDN & Security', 
                svg: <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/> 
              },
              { 
                name: 'Next.js', 
                cat: 'Web Framework', 
                svg: <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/> 
              },
              { 
                name: 'WordPress', 
                cat: 'CMS Platform', 
                svg: <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/> 
              },
              { 
                name: 'Yoast / RankMath', 
                cat: 'On-Page SEO', 
                svg: <path d="M16.61 0 11.4 14.477 8.806 6.36H5.941l3.804 9.77a4.017 4.017 0 0 1 0 2.925c-.387.993-1.073 2.158-2.96 2.505V24c1.512-.06 2.692-.562 3.694-1.57 1.032-1.036 1.919-2.655 2.79-5.091L19.739 0ZM5.357 3.274a3.706 3.706 0 0 0-3.695 3.695v10.358a3.706 3.706 0 0 0 3.695 3.694h.817l.26-.034c1.76-.237 2.37-1.224 2.733-2.158a3.4 3.4 0 0 0 0-2.475L5.035 5.738H9.26l2.174 6.81 3.339-9.274Zm13.792.08L13.853 17.55c-.502 1.403-1.015 2.54-1.559 3.47h10.044V6.97a3.706 3.706 0 0 0-3.19-3.616Z"/> 
              },              { 
                name: 'Elementor', 
                cat: 'Page Builder', 
                svg: <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3-13.5v7H7v-7h2zm8 0v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5z" /> 
              },
              { 
                name: 'Antigravity IDE', 
                cat: 'AI Engineering', 
                svg: <path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zM8 10l-2 2 2 2M16 10l2 2-2 2M11 15l2-6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              },
              { 
                name: 'Claude', 
                cat: 'AI Assistant', 
                svg: <path d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.369-3.553h7.005l1.37 3.553h3.744L10.536 3.54Zm-.371 10.223 2.291-5.945 2.292 5.945Z" /> 
              },
              { 
                name: 'Google Analytics', 
                cat: 'Data Analytics', 
                svg: <path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" /> 
              },
              { 
                name: 'Ubersuggest', 
                cat: 'Keyword Research', 
                svg: <path d="M6 4v8a6 6 0 0 0 12 0V4h-3v8a3 3 0 0 1-6 0V4H6z" /> 
              },
              { 
                name: 'Search Console', 
                cat: 'Technical SEO', 
                svg: <path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z" /> 
              },
              { 
                name: 'Screaming Frog', 
                cat: 'Site Auditing', 
                svg: <path d="M12 2c-3.3 0-6 2.7-6 6v3H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v1c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-1h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2v-3c0-3.3-2.7-6-6-6zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" /> 
              },
              { 
                name: 'Rich Results', 
                cat: 'Schema Testing', 
                svg: <><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/><path d="M16 5l-1.5 3.5L11 10l3.5 1.5L16 15l1.5-3.5L21 10l-3.5-1.5z" /></> 
              },
              {
                name: 'Google Stitch',
                cat: 'AI UI Generation',
                svg: <path d="M18.8 2.3c-.4-.4-1-.4-1.4 0l-12 12c-.2.2-.3.4-.3.7v3.5c0 .5.4 1 1 1h3.5c.3 0 .5-.1.7-.3l12-12c.4-.4.4-1 0-1.4l-3.5-3.5zm-2.8 1.4l2.1 2.1L16 7.9l-2.1-2.1 2.1-2.1zM6.6 17.4H5.5v-1.1l8.3-8.3 1.1 1.1-8.3 8.3z" />
              },
              {
                name: 'Google Labm Studio',
                cat: 'AI Model Prototyping',
                svg: <path d="M19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z" />
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#181a1b]/60 border border-white/5 hover:border-primary-container/40 hover:bg-[#181a1b] transition-all duration-300 group flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-container mb-2 sm:mb-3 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(230,126,34,0.3)]" viewBox="0 0 24 24" fill="currentColor">
                  {tool.svg}
                </svg>
                <h3 className="font-heading text-[11px] sm:text-xs font-bold text-on-surface leading-tight">{tool.name}</h3>
                <p className="font-sans text-[9px] sm:text-[10px] text-on-surface/80 mt-1">{tool.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT ME SNAPSHOT WITH METRIC COUNTERS */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
          <div className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] md:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/about_me.jpg"
              alt="Alain Dave Tapiru Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#121414]/90 border border-white/10">
              <p className="font-heading text-[10px] sm:text-xs text-primary-container uppercase tracking-widest mb-1 font-bold">
                About Alain Dave Tapiru
              </p>
              <h3 className="font-heading text-xs sm:text-base font-bold text-on-surface">
                Data-Driven SEO Specialist &amp; Technical Web Designer
              </h3>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
              Background &amp; Expertise
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface leading-tight">
              Ranking Websites &amp; Building Robust Web Infrastructure.
            </h2>
            <p className="font-sans text-on-surface/80 text-xs sm:text-sm leading-relaxed">
              Combining technical SEO, modern web development, and cybersecurity principles to deliver end-to-end digital growth for brands and agencies.
            </p>

            {/* Honest Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-sm sm:text-base md:text-lg font-bold text-primary-container block mb-1">
                  4 Core Disciplines
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  SEO, Web Dev, Support &amp; Bookkeeping
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-sm sm:text-base md:text-lg font-bold text-primary-container block mb-1">
                  AI-Powered Workflows
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  Leveraging modern tools for faster, smarter builds.
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-sm sm:text-base md:text-lg font-bold text-primary-container block mb-1">
                  24hr Response Time
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  Dedicated, fast communication.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest font-bold text-primary-container hover:underline"
              >
                Read Full Biography <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SEO PROCESS CYCLE (6-STEP GRID) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Methodology
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface mb-3 sm:mb-4">
            The 6-Step SEO Process
          </h2>
          <p className="font-sans text-xs sm:text-sm text-on-surface/70">
            A systematic engineering approach to search engine ranking and organic traffic expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              step: '01',
              title: 'Website Audit',
              desc: 'Comprehensive technical review analyzing site health, speed, indexing, crawlability, and schema implementation.',
              icon: 'find_in_page',
            },
            {
              step: '02',
              title: 'Keyword Research',
              desc: 'High-intent search query discovery tailored to target buyer personas and search volume dynamics.',
              icon: 'key',
            },
            {
              step: '03',
              title: 'Competitive Analysis',
              desc: 'Deconstructing top-ranking competitor strategies, backlink profiles, and content gaps.',
              icon: 'equalizer',
            },
            {
              step: '04',
              title: 'On-Page SEO',
              desc: 'Optimizing titles, headers, internal linking structure, metadata, and core web vitals.',
              icon: 'edit_note',
            },
            {
              step: '05',
              title: 'Off-Page SEO',
              desc: 'Authoritative backlink acquisition, brand mention building, and local citations.',
              icon: 'hub',
            },
            {
              step: '06',
              title: 'Reporting & Data Analysis',
              desc: 'Monthly transparent rank tracking, conversion metrics, and continuous performance tuning.',
              icon: 'monitoring',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-heading text-xl sm:text-2xl font-black text-white/10 group-hover:text-primary-container/30 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 sm:mb-3">{item.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-16 sm:py-24 bg-transparent border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4">
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
                Portfolio Showcase
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface">
                Featured SEO &amp; Web Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-heading text-xs uppercase tracking-widest font-bold text-primary-container hover:underline flex items-center gap-1"
            >
              View All Case Studies <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {[
              {
                title: 'Executive Optical Local SEO',
                cat: 'Local Search Optimization',
                desc: 'Scaled organic search visibility across 100+ retail locations nationwide.',
                slug: 'executive-optical-local-seo',
              },
              {
                title: 'Claimscale.ai Resume Portfolio',
                cat: 'AI Web Design & Tech SEO',
                desc: 'Custom high-performance web architecture built with film-noir aesthetics and AI features.',
                slug: 'claimscale-ai-portfolio',
              },
            ].map((proj) => (
              <div
                key={proj.slug}
                className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#181a1b]/60 border border-white/5 hover:border-primary-container/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-2">
                    {proj.cat}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2 sm:mb-3">{proj.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed mb-4 sm:mb-6">{proj.desc}</p>
                </div>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-2 font-heading text-xs uppercase font-bold text-on-surface group-hover:text-primary-container transition-colors py-1"
                >
                  Explore Case Study <span className="material-symbols-outlined text-sm">north_east</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Client Feedback
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface mb-3 sm:mb-4">
            What Clients &amp; Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {[
            {
              quote: "[PLACEHOLDER - EDIT LATER] Alain's technical SEO insight transformed our organic reach. His systematic approach to site audits and Keyword strategy brought us to page one.",
              author: '[PLACEHOLDER - Client Name]',
              title: '[PLACEHOLDER - Business Title]',
            },
            {
              quote: "[PLACEHOLDER - EDIT LATER] Working with Alain on web design and optimization was effortless. He delivers high-end aesthetics backed by fast, clean code.",
              author: '[PLACEHOLDER - Partner Name]',
              title: '[PLACEHOLDER - Agency Director]',
            },
          ].map((test, idx) => (
            <div key={idx} className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#181a1b]/70 border border-white/5 relative">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container/30 mb-3 sm:mb-4 block">
                format_quote
              </span>
              <p className="font-sans text-xs sm:text-sm text-on-surface/80 italic leading-relaxed mb-4 sm:mb-6">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-on-surface">{test.author}</h4>
                <p className="font-sans text-[11px] sm:text-xs text-on-surface/50">{test.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <OpenToOpportunities />

      {/* 7. CALL TO ACTION */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
        <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#181a1b]/40 border border-primary-container/30 shadow-[0_0_50px_rgba(230,126,34,0.1)]">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest mb-2 block font-bold">
            Get Started
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface mb-4 sm:mb-6">
            Ready to Elevate Your Search Rankings?
          </h2>
          <p className="font-sans text-on-surface/70 max-w-xl mx-auto mb-8 sm:mb-10 text-xs sm:text-sm leading-relaxed">
            Whether you need a full technical SEO audit, a custom Next.js web application, or ongoing optimization, let&apos;s talk strategy.
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Book A Consultation <span className="material-symbols-outlined text-sm">calendar_month</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PAYLOAD CMS BLOCKS FALLBACK */}
      {page?.layout != null && page.layout.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 relative z-20 py-12">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </section>
      )}
    </>
  )
}
