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

      {/* 2. TOOLS I USE MARQUEE */}
      <section className="py-12 sm:py-16 bg-background border-y border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 text-center mb-6 sm:mb-8">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Technical Stack
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface">
            Tools &amp; Technologies I Master
          </h2>
        </div>

        {/* Marquee Container with Mask */}
        <div 
          className="w-full relative flex flex-col gap-6"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          {/* TOP ROW (Scroll Left) */}
          <div className="flex w-[200%] animate-marquee-left marquee-row">
            <div className="flex flex-nowrap w-1/2 justify-around items-center gap-3 sm:gap-4 px-2">
              {[
                { name: 'HTML5', svg: <svg viewBox="0 0 24 24" fill="#E34F26" className="w-full h-full"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.59l.23-2.588H5.255L6.18 12.34v.001h9.33l-.364 4.092-3.176.85-3.149-.85-.205-2.316H5.978l.346 4.349 5.642 1.566 5.66-1.566 1.05-11.758H8.531z"/></svg> },
                { name: 'CSS3', svg: <svg viewBox="0 0 24 24" fill="#1572B6" className="w-full h-full"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-9.64l.214 2.588h9.179l-.366 4.091-3.179.851-3.149-.851-.206-2.316H5.978l.346 4.35L11.965 20l5.66-1.566 1.051-11.758-.086-2.263z"/></svg> },
                { name: 'Tailwind CSS', svg: <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-full h-full"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg> },
                { name: 'React', svg: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-full h-full"><path d="M11.954 18.066c-5.836 0-10.741-2.091-10.741-4.664 0-2.571 4.905-4.661 10.741-4.661 5.835 0 10.741 2.09 10.741 4.66 0 2.574-4.906 4.665-10.741 4.665Zm0-8.324c-5.26 0-9.741 1.636-9.741 3.66 0 2.023 4.48 3.663 9.741 3.663 5.259 0 9.741-1.64 9.741-3.663 0-2.024-4.482-3.66-9.741-3.66Zm8.064 12.384c-2.916 2.917-8.307 1.83-12.022-2.428-3.715-4.257-4.364-10.082-1.448-12.999 2.918-2.917 8.308-1.83 12.023 2.428 3.715 4.257 4.364 10.081 1.447 12.999Zm-1.413-11.583c-2.316-2.656-6.691-3.553-9.771-2.007-3.083 1.546-3.705 5.045-1.389 7.7 2.316 2.656 6.69 3.552 9.771 2.006 3.082-1.545 3.704-5.044 1.389-7.699Zm-11.895 11.583c-2.916-2.917-2.268-8.742 1.448-12.999 3.715-4.258 9.105-5.345 12.022-2.428 2.917 2.917 2.268 8.742-1.447 12.999-3.716 4.258-9.106 5.345-12.023 2.428Zm1.412-1.414c2.317 2.655 6.69 3.552 9.771 2.006 3.082-1.545 3.704-5.044 1.389-7.699-2.316-2.656-6.691-3.553-9.771-2.007-3.083 1.546-3.705 5.045-1.389 7.7Z"/><circle cx="11.954" cy="13.402" r="2.158"/></svg> },
                { name: 'Node.js', svg: <svg viewBox="0 0 24 24" fill="#339933" className="w-full h-full"><path d="M11.859.043l-9.8 5.67A1.91 1.91 0 0 0 1.1 7.378v9.244a1.91 1.91 0 0 0 .959 1.665l9.8 5.67a1.94 1.94 0 0 0 1.92 0l9.8-5.67a1.91 1.91 0 0 0 .959-1.665V7.378a1.91 1.91 0 0 0-.96-1.665l-9.8-5.67a1.94 1.94 0 0 0-1.919 0zm5.12 11.233c-.15 3.32-2.312 5.09-5.46 5.09-3.266 0-5.267-1.857-5.267-5.118v-2.091h2.17v2.1c0 2 1.157 3.122 3.097 3.122 1.832 0 3.256-1.077 3.256-3.111v-.136c0-1.821-1.228-2.648-3.322-2.648H9.373v-1.924h2.155c1.696 0 2.871-.7 2.871-2.228v-.106c0-1.391-.842-2.179-2.525-2.179-1.606 0-2.585.83-2.585 2.148v.89H7.135v-1c0-2.328 1.803-3.957 4.743-3.957 3.036 0 4.673 1.542 4.673 4.01v.121c0 1.527-.857 2.62-2.343 3.064 1.741.348 2.771 1.48 2.771 3.27v.143z"/></svg> },
                { name: 'Next.js', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg> },
                { name: 'WordPress', svg: <svg viewBox="0 0 24 24" fill="#21759b" className="w-full h-full"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg> },
                { name: 'Elementor', svg: <svg viewBox="0 0 24 24" fill="#D63384" className="w-full h-full"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3-13.5v7H7v-7h2zm8 0v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5z"/></svg> },
                { name: 'Figma', svg: <svg viewBox="0 0 24 24" fill="#F24E1E" className="w-full h-full"><path d="M8 12.5a3.5 3.5 0 1 0 0-7h4v7H8z" /><path fill="#FF7262" d="M12 5.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" /><path fill="#1ABCFE" d="M12 12.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" /><path fill="#0ACF83" d="M8 19.5a3.5 3.5 0 1 0 7 0v-7H8v7z" /><path fill="#A259FF" d="M8 12.5a3.5 3.5 0 1 0 0 7h4v-7H8z" /></svg> },
                { name: 'Cloudflare', svg: <svg viewBox="0 0 24 24" fill="#F38020" className="w-full h-full"><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg> },
                { name: 'Payload CMS', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L1 22h22L12 2zm0 3.8l8.2 14.8H3.8L12 5.8zM12 9l-4 7h8l-4-7z"/></svg> },
              ].map((tool, idx) => (
                <div
                  key={`${tool.name}-1-${idx}`}
                  title={tool.name}
                  className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] p-2.5 sm:p-3.5 rounded-xl bg-[#181a1b] border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)] hover:border-primary-container/40 hover:bg-[#1e2022] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center shrink-0"
                >
                  <div className="w-full h-full flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_12px_currentColor]">
                    {tool.svg}
                  </div>
                </div>
              ))}
            </div>
            {/* DUPLICATE FOR SEAMLESS LOOP */}
            <div className="flex flex-nowrap w-1/2 justify-around items-center gap-3 sm:gap-4 px-2">
              {[
                { name: 'HTML5', svg: <svg viewBox="0 0 24 24" fill="#E34F26" className="w-full h-full"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.59l.23-2.588H5.255L6.18 12.34v.001h9.33l-.364 4.092-3.176.85-3.149-.85-.205-2.316H5.978l.346 4.349 5.642 1.566 5.66-1.566 1.05-11.758H8.531z"/></svg> },
                { name: 'CSS3', svg: <svg viewBox="0 0 24 24" fill="#1572B6" className="w-full h-full"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-9.64l.214 2.588h9.179l-.366 4.091-3.179.851-3.149-.851-.206-2.316H5.978l.346 4.35L11.965 20l5.66-1.566 1.051-11.758-.086-2.263z"/></svg> },
                { name: 'Tailwind CSS', svg: <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-full h-full"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg> },
                { name: 'React', svg: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-full h-full"><path d="M11.954 18.066c-5.836 0-10.741-2.091-10.741-4.664 0-2.571 4.905-4.661 10.741-4.661 5.835 0 10.741 2.09 10.741 4.66 0 2.574-4.906 4.665-10.741 4.665Zm0-8.324c-5.26 0-9.741 1.636-9.741 3.66 0 2.023 4.48 3.663 9.741 3.663 5.259 0 9.741-1.64 9.741-3.663 0-2.024-4.482-3.66-9.741-3.66Zm8.064 12.384c-2.916 2.917-8.307 1.83-12.022-2.428-3.715-4.257-4.364-10.082-1.448-12.999 2.918-2.917 8.308-1.83 12.023 2.428 3.715 4.257 4.364 10.081 1.447 12.999Zm-1.413-11.583c-2.316-2.656-6.691-3.553-9.771-2.007-3.083 1.546-3.705 5.045-1.389 7.7 2.316 2.656 6.69 3.552 9.771 2.006 3.082-1.545 3.704-5.044 1.389-7.699Zm-11.895 11.583c-2.916-2.917-2.268-8.742 1.448-12.999 3.715-4.258 9.105-5.345 12.022-2.428 2.917 2.917 2.268 8.742-1.447 12.999-3.716 4.258-9.106 5.345-12.023 2.428Zm1.412-1.414c2.317 2.655 6.69 3.552 9.771 2.006 3.082-1.545 3.704-5.044 1.389-7.699-2.316-2.656-6.691-3.553-9.771-2.007-3.083 1.546-3.705 5.045-1.389 7.7Z"/><circle cx="11.954" cy="13.402" r="2.158"/></svg> },
                { name: 'Node.js', svg: <svg viewBox="0 0 24 24" fill="#339933" className="w-full h-full"><path d="M11.859.043l-9.8 5.67A1.91 1.91 0 0 0 1.1 7.378v9.244a1.91 1.91 0 0 0 .959 1.665l9.8 5.67a1.94 1.94 0 0 0 1.92 0l9.8-5.67a1.91 1.91 0 0 0 .959-1.665V7.378a1.91 1.91 0 0 0-.96-1.665l-9.8-5.67a1.94 1.94 0 0 0-1.919 0zm5.12 11.233c-.15 3.32-2.312 5.09-5.46 5.09-3.266 0-5.267-1.857-5.267-5.118v-2.091h2.17v2.1c0 2 1.157 3.122 3.097 3.122 1.832 0 3.256-1.077 3.256-3.111v-.136c0-1.821-1.228-2.648-3.322-2.648H9.373v-1.924h2.155c1.696 0 2.871-.7 2.871-2.228v-.106c0-1.391-.842-2.179-2.525-2.179-1.606 0-2.585.83-2.585 2.148v.89H7.135v-1c0-2.328 1.803-3.957 4.743-3.957 3.036 0 4.673 1.542 4.673 4.01v.121c0 1.527-.857 2.62-2.343 3.064 1.741.348 2.771 1.48 2.771 3.27v.143z"/></svg> },
                { name: 'Next.js', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg> },
                { name: 'WordPress', svg: <svg viewBox="0 0 24 24" fill="#21759b" className="w-full h-full"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg> },
                { name: 'Elementor', svg: <svg viewBox="0 0 24 24" fill="#D63384" className="w-full h-full"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3-13.5v7H7v-7h2zm8 0v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5zm0 2.75v1.5h-5v-1.5h5z"/></svg> },
                { name: 'Figma', svg: <svg viewBox="0 0 24 24" fill="#F24E1E" className="w-full h-full"><path d="M8 12.5a3.5 3.5 0 1 0 0-7h4v7H8z" /><path fill="#FF7262" d="M12 5.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" /><path fill="#1ABCFE" d="M12 12.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" /><path fill="#0ACF83" d="M8 19.5a3.5 3.5 0 1 0 7 0v-7H8v7z" /><path fill="#A259FF" d="M8 12.5a3.5 3.5 0 1 0 0 7h4v-7H8z" /></svg> },
                { name: 'Cloudflare', svg: <svg viewBox="0 0 24 24" fill="#F38020" className="w-full h-full"><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg> },
                { name: 'Payload CMS', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L1 22h22L12 2zm0 3.8l8.2 14.8H3.8L12 5.8zM12 9l-4 7h8l-4-7z"/></svg> },
              ].map((tool, idx) => (
                <div
                  key={`${tool.name}-1-dup-${idx}`}
                  title={tool.name}
                  className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] p-2.5 sm:p-3.5 rounded-xl bg-[#181a1b] border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)] hover:border-primary-container/40 hover:bg-[#1e2022] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center shrink-0"
                >
                  <div className="w-full h-full flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_12px_currentColor]">
                    {tool.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW (Scroll Right) */}
          <div className="flex w-[200%] animate-marquee-right marquee-row -ml-[100%]">
            <div className="flex flex-nowrap w-1/2 justify-around items-center gap-3 sm:gap-4 px-2">
              {[
                { name: 'Ahrefs', svg: <svg viewBox="0 0 24 24" fill="#F89D22" className="w-full h-full"><path d="M14.07 15.65c-.81.65-2.02.9-3.23.9-1.2 0-2.42-.25-3.23-.9-.67-.53-.98-1.12-.98-1.74 0-1.1.92-2.14 3.03-2.58l.65-.13V9.67l-.74.15c-1.33.27-2.17.65-2.5 1.1-.09.12-.13.25-.13.38H5c.01-.84.44-1.6 1.17-2.15C7.22 8.35 8.95 8 10.84 8c1.9 0 3.62.35 4.67 1.15.73.55 1.16 1.3 1.17 2.15v5.33c0 1.25.46 2 1.34 2v1.34c-.87 0-1.54-.25-2.01-.76-.43.51-1.1.76-2 .76s-1.52-.2-1.94-.56v-3.76zm-1.84-2.83l-.53.1c-1.14.23-1.63.63-1.63 1.25 0 .34.19.64.55.85.43.25.97.38 1.6.38.93 0 1.58-.2 1.95-.57.34-.36.5-.83.5-1.42v-1.15l-.44.56zM24 12c0 6.63-5.37 12-12 12S0 18.63 0 12 5.37 0 12 0s12 5.37 12 12zm-2.83 0c0-5.06-4.11-9.17-9.17-9.17-5.06 0-9.17 4.11-9.17 9.17 0 5.06 4.11 9.17 9.17 9.17 5.06 0 9.17-4.11 9.17-9.17z"/></svg> },
                { name: 'SEMrush', svg: <svg viewBox="0 0 24 24" fill="#F2672A" className="w-full h-full"><path d="M22.062 13.916c0 5.176-4.168 9.344-9.344 9.344-3.14 0-5.918-1.562-7.587-3.957-.488-.696-1.536-2.28-1.536-2.28s1.611-.904 2.274-1.28c0 0 .808 1.157 1.156 1.625 1.258 1.693 3.326 2.766 5.693 2.766 3.84 0 6.949-3.109 6.949-6.949 0-3.84-3.109-6.949-6.949-6.949-2.25 0-4.25 1.077-5.502 2.716l-3.376-3.377C5.69 3.585 8.956 2.227 12.718 2.227c5.176 0 9.344 4.168 9.344 9.344v2.345zm-14.717.382l4.89-4.89c.642.641 1.682.641 2.324 0 .641-.642.641-1.682 0-2.324-.642-.641-1.682-.641-2.324 0l-4.89 4.89c-.641-.642-1.682-.642-2.324 0-.641.642-.641 1.682 0 2.324.642.641 1.683.641 2.324 0z"/></svg> },
                { name: 'Yoast SEO', svg: <svg viewBox="0 0 24 24" fill="#A4286A" className="w-full h-full"><path d="M16.61 0 11.4 14.477 8.806 6.36H5.941l3.804 9.77a4.017 4.017 0 0 1 0 2.925c-.387.993-1.073 2.158-2.96 2.505V24c1.512-.06 2.692-.562 3.694-1.57 1.032-1.036 1.919-2.655 2.79-5.091L19.739 0ZM5.357 3.274a3.706 3.706 0 0 0-3.695 3.695v10.358a3.706 3.706 0 0 0 3.695 3.694h.817l.26-.034c1.76-.237 2.37-1.224 2.733-2.158a3.4 3.4 0 0 0 0-2.475L5.035 5.738H9.26l2.174 6.81 3.339-9.274Zm13.792.08L13.853 17.55c-.502 1.403-1.015 2.54-1.559 3.47h10.044V6.97a3.706 3.706 0 0 0-3.19-3.616Z"/></svg> },
                { name: 'Screaming Frog', svg: <svg viewBox="0 0 24 24" fill="#99C83B" className="w-full h-full"><path d="M12 2c-3.3 0-6 2.7-6 6v3H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v1c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-1h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2v-3c0-3.3-2.7-6-6-6zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" /></svg> },
                { name: 'Ubersuggest', svg: <svg viewBox="0 0 24 24" fill="#F2672A" className="w-full h-full"><path d="M6 4v8a6 6 0 0 0 12 0V4h-3v8a3 3 0 0 1-6 0V4H6z"/></svg> },
                { name: 'Search Console', svg: <svg viewBox="0 0 24 24" fill="#4285F4" className="w-full h-full"><path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z" /></svg> },
                { name: 'Analytics', svg: <svg viewBox="0 0 24 24" fill="#F9AB00" className="w-full h-full"><path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" /></svg> },
                { name: 'Rich Results', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/><path d="M16 5l-1.5 3.5L11 10l3.5 1.5L16 15l1.5-3.5L21 10l-3.5-1.5z"/></svg> },
                { name: 'Claude AI', svg: <svg viewBox="0 0 24 24" fill="#D97757" className="w-full h-full"><path d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.369-3.553h7.005l1.37 3.553h3.744L10.536 3.54Zm-.371 10.223 2.291-5.945 2.292 5.945Z" /></svg> },
                { name: 'Antigravity IDE', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#A4286A]"><path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zM8 10l-2 2 2 2M16 10l2 2-2 2M11 15l2-6"/></svg> },
              ].map((tool, idx) => (
                <div
                  key={`${tool.name}-2-${idx}`}
                  title={tool.name}
                  className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] p-2.5 sm:p-3.5 rounded-xl bg-[#181a1b] border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)] hover:border-primary-container/40 hover:bg-[#1e2022] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center shrink-0"
                >
                  <div className="w-full h-full flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_12px_currentColor]">
                    {tool.svg}
                  </div>
                </div>
              ))}
            </div>
            {/* DUPLICATE FOR SEAMLESS LOOP */}
            <div className="flex flex-nowrap w-1/2 justify-around items-center gap-3 sm:gap-4 px-2">
              {[
                { name: 'Ahrefs', svg: <svg viewBox="0 0 24 24" fill="#F89D22" className="w-full h-full"><path d="M14.07 15.65c-.81.65-2.02.9-3.23.9-1.2 0-2.42-.25-3.23-.9-.67-.53-.98-1.12-.98-1.74 0-1.1.92-2.14 3.03-2.58l.65-.13V9.67l-.74.15c-1.33.27-2.17.65-2.5 1.1-.09.12-.13.25-.13.38H5c.01-.84.44-1.6 1.17-2.15C7.22 8.35 8.95 8 10.84 8c1.9 0 3.62.35 4.67 1.15.73.55 1.16 1.3 1.17 2.15v5.33c0 1.25.46 2 1.34 2v1.34c-.87 0-1.54-.25-2.01-.76-.43.51-1.1.76-2 .76s-1.52-.2-1.94-.56v-3.76zm-1.84-2.83l-.53.1c-1.14.23-1.63.63-1.63 1.25 0 .34.19.64.55.85.43.25.97.38 1.6.38.93 0 1.58-.2 1.95-.57.34-.36.5-.83.5-1.42v-1.15l-.44.56zM24 12c0 6.63-5.37 12-12 12S0 18.63 0 12 5.37 0 12 0s12 5.37 12 12zm-2.83 0c0-5.06-4.11-9.17-9.17-9.17-5.06 0-9.17 4.11-9.17 9.17 0 5.06 4.11 9.17 9.17 9.17 5.06 0 9.17-4.11 9.17-9.17z"/></svg> },
                { name: 'SEMrush', svg: <svg viewBox="0 0 24 24" fill="#F2672A" className="w-full h-full"><path d="M22.062 13.916c0 5.176-4.168 9.344-9.344 9.344-3.14 0-5.918-1.562-7.587-3.957-.488-.696-1.536-2.28-1.536-2.28s1.611-.904 2.274-1.28c0 0 .808 1.157 1.156 1.625 1.258 1.693 3.326 2.766 5.693 2.766 3.84 0 6.949-3.109 6.949-6.949 0-3.84-3.109-6.949-6.949-6.949-2.25 0-4.25 1.077-5.502 2.716l-3.376-3.377C5.69 3.585 8.956 2.227 12.718 2.227c5.176 0 9.344 4.168 9.344 9.344v2.345zm-14.717.382l4.89-4.89c.642.641 1.682.641 2.324 0 .641-.642.641-1.682 0-2.324-.642-.641-1.682-.641-2.324 0l-4.89 4.89c-.641-.642-1.682-.642-2.324 0-.641.642-.641 1.682 0 2.324.642.641 1.683.641 2.324 0z"/></svg> },
                { name: 'Yoast SEO', svg: <svg viewBox="0 0 24 24" fill="#A4286A" className="w-full h-full"><path d="M16.61 0 11.4 14.477 8.806 6.36H5.941l3.804 9.77a4.017 4.017 0 0 1 0 2.925c-.387.993-1.073 2.158-2.96 2.505V24c1.512-.06 2.692-.562 3.694-1.57 1.032-1.036 1.919-2.655 2.79-5.091L19.739 0ZM5.357 3.274a3.706 3.706 0 0 0-3.695 3.695v10.358a3.706 3.706 0 0 0 3.695 3.694h.817l.26-.034c1.76-.237 2.37-1.224 2.733-2.158a3.4 3.4 0 0 0 0-2.475L5.035 5.738H9.26l2.174 6.81 3.339-9.274Zm13.792.08L13.853 17.55c-.502 1.403-1.015 2.54-1.559 3.47h10.044V6.97a3.706 3.706 0 0 0-3.19-3.616Z"/></svg> },
                { name: 'Screaming Frog', svg: <svg viewBox="0 0 24 24" fill="#99C83B" className="w-full h-full"><path d="M12 2c-3.3 0-6 2.7-6 6v3H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v1c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-1h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2v-3c0-3.3-2.7-6-6-6zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" /></svg> },
                { name: 'Ubersuggest', svg: <svg viewBox="0 0 24 24" fill="#F2672A" className="w-full h-full"><path d="M6 4v8a6 6 0 0 0 12 0V4h-3v8a3 3 0 0 1-6 0V4H6z"/></svg> },
                { name: 'Search Console', svg: <svg viewBox="0 0 24 24" fill="#4285F4" className="w-full h-full"><path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z" /></svg> },
                { name: 'Analytics', svg: <svg viewBox="0 0 24 24" fill="#F9AB00" className="w-full h-full"><path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" /></svg> },
                { name: 'Rich Results', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/><path d="M16 5l-1.5 3.5L11 10l3.5 1.5L16 15l1.5-3.5L21 10l-3.5-1.5z"/></svg> },
                { name: 'Claude AI', svg: <svg viewBox="0 0 24 24" fill="#D97757" className="w-full h-full"><path d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.369-3.553h7.005l1.37 3.553h3.744L10.536 3.54Zm-.371 10.223 2.291-5.945 2.292 5.945Z" /></svg> },
                { name: 'Antigravity IDE', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#A4286A]"><path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zM8 10l-2 2 2 2M16 10l2 2-2 2M11 15l2-6"/></svg> },
              ].map((tool, idx) => (
                <div
                  key={`${tool.name}-2-dup-${idx}`}
                  title={tool.name}
                  className="w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] p-2.5 sm:p-3.5 rounded-xl bg-[#181a1b] border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)] hover:border-primary-container/40 hover:bg-[#1e2022] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center shrink-0"
                >
                  <div className="w-full h-full flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_12px_currentColor]">
                    {tool.svg}
                  </div>
                </div>
              ))}
            </div>
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
