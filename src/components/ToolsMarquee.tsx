import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

const TECHNICAL_TOOLS = [
  {
    name: 'WordPress',
    svg: (
      <svg viewBox="0 0 24 24" fill="#21759b" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
      </svg>
    ),
  },
  {
    name: 'Elementor',
    svg: (
      <svg viewBox="0 0 24 24" fill="#92003B" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-2.4 16.8H7.2V7.2h2.4v9.6zm7.2 0h-4.8v-2.4h4.8v2.4zm0-3.6h-4.8v-2.4h4.8v2.4zm0-3.6h-4.8V7.2h4.8v2.4z" />
      </svg>
    ),
  },
  {
    name: 'Ahrefs',
    svg: (
      <svg viewBox="0 0 128 128" fill="#FF8000" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="m24 8v24h64v16l-26.104 0.456c-35.096 3.256-45.896 11.624-45.896 36.504v6.512c0 19.064 14.328 28.528 32 28.528 7.984 0 16.32-1.56 25.04-5.976l14.96-6.024v12h24v-112zm64 76-18.112 7.472c-6.296 3.488-12.832 5.344-17.92 5.344-6.288 0-11.968-1.136-11.968-8.816v-5.12c0.48-8.136 7.376-11.176 26.256-13.032l21.744-1.848z" />
      </svg>
    ),
  },
  {
    name: 'SEMrush',
    svg: (
      <svg viewBox="0 0 24 24" fill="#FF642D" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M20.698 11.911c0 .444-.226.516-.79.516-.596 0-.706-.1-.77-.554-.118-1.152-.896-2.13-2.201-2.24-.418-.034-.518-.19-.518-.706 0-.48.074-.708.446-.708 2.265.01 3.833 1.832 3.833 3.69v.002zm3.3 0c0-3.456-2.338-7.11-7.74-7.11H5.52c-.218 0-.354.11-.354.31 0 .109.082.209.156.26.388.31.97.654 1.73 1.036.743.372 1.323.616 1.903.852.246.1.336.208.336.344 0 .19-.136.308-.4.308H.372c-.254 0-.372.164-.372.326 0 .136.044.254.162.372.69.726 1.796 1.596 3.4 2.604 1.466.91 2.98 1.74 4.533 2.492.236.11.308.236.308.372-.008.154-.126.28-.4.28H4.1c-.216 0-.344.12-.344.3 0 .1.08.226.19.326.888.808 2.311 1.688 4.207 2.494 2.53 1.08 5.094 1.721 7.98 1.721 5.465 0 7.867-4.087 7.867-7.289l-.002.002zm-7.133 5.104c-2.794 0-5.132-2.276-5.132-5.114 0-2.794 2.33-5.04 5.132-5.04 2.863 0 5.111 2.24 5.111 5.04a5.086 5.086 0 0 1-5.111 5.114z" />
      </svg>
    ),
  },
  {
    name: 'Screaming Frog',
    svg: (
      <svg viewBox="0 0 24 24" fill="#72B134" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M12 2c-3.3 0-6 2.7-6 6v3H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v1c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-1h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2v-3c0-3.3-2.7-6-6-6zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
      </svg>
    ),
  },
  {
    name: 'Search Console',
    svg: (
      <svg viewBox="0 0 24 24" fill="#458CF5" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z" />
      </svg>
    ),
  },
  {
    name: 'Analytics',
    svg: (
      <svg viewBox="0 0 24 24" fill="#E37400" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" />
      </svg>
    ),
  },
  {
    name: 'Yoast SEO',
    svg: (
      <svg viewBox="0 0 24 24" fill="#A4286A" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M16.61 0 11.4 14.477 8.806 6.36H5.941l3.804 9.77a4.017 4.017 0 0 1 0 2.925c-.387.993-1.073 2.158-2.96 2.505V24c1.512-.06 2.692-.562 3.694-1.57 1.032-1.036 1.919-2.655 2.79-5.091L19.739 0ZM5.357 3.274a3.706 3.706 0 0 0-3.695 3.695v10.358a3.706 3.706 0 0 0 3.695 3.694h.817l.26-.034c1.76-.237 2.37-1.224 2.733-2.158a3.4 3.4 0 0 0 0-2.475L5.035 5.738H9.26l2.174 6.81 3.339-9.274Zm13.792.08L13.853 17.55c-.502 1.403-1.015 2.54-1.559 3.47h10.044V6.97a3.706 3.706 0 0 0-3.19-3.616Z" />
      </svg>
    ),
  },
  {
    name: 'Ubersuggest',
    svg: (
      <svg viewBox="0 0 24 24" fill="#FF6600" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M6 4v8a6 6 0 0 0 12 0V4h-3v8a3 3 0 0 1-6 0V4H6z" />
      </svg>
    ),
  },
  {
    name: 'Rich Results',
    svg: (
      <svg viewBox="0 0 24 24" fill="#34A853" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        <path d="M16 5l-1.5 3.5L11 10l3.5 1.5L16 15l1.5-3.5L21 10l-3.5-1.5z" />
      </svg>
    ),
  },
  {
    name: 'Claude AI',
    svg: (
      <svg viewBox="0 0 24 24" fill="#D97757" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    ),
  },
  {
    name: 'Payload CMS',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-on-surface" aria-hidden="true" focusable="false">
        <path d="M11.068 0 22.08 6.625v12.573L13.787 24V11.427L2.769 4.808 11.068 0ZM1.92 18.302l8.31-4.812v9.812l-8.31-5Z" />
      </svg>
    ),
  },
  {
    name: 'Antigravity IDE',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden="true" focusable="false">
        <path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zM8 10l-2 2 2 2M16 10l2 2-2 2M11 15l2-6" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-on-surface" aria-hidden="true" focusable="false">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
] as const

export function ToolsMarquee() {
  return (
    <section
      id="tools-marquee"
      aria-label="Technical Stack and Tools"
      className="relative z-20 overflow-hidden border-y border-primary-container/20 bg-transparent py-12 shadow-[0_0_30px_rgba(224,123,32,0.08),inset_0_0_20px_rgba(224,123,32,0.03)] sm:py-16"
    >
      {/* Mild Amber/Orange Ambient Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(224,123,32,0.08)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-3xl motion-reveal">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
            Technical Stack
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-4xl">
            Tools I Use to Turn SEO Into Action
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
            A practical toolkit for research, optimization, analytics, content, and modern web development.
          </p>

          {/* Category Navigation Links */}
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
            <Link
              href="/services/technical-seo/"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-colors hover:bg-surface-1"
            >
              <Icon name="search" size={14} className="text-primary-container transition-transform group-hover:scale-110" />
              <span className="font-heading font-semibold uppercase tracking-[0.06em] text-on-surface/80 group-hover:text-primary-container">
                SEO &amp; Analytics
              </span>
              <span className="hidden font-sans text-on-surface/60 sm:inline">
                &bull; Google Search Console &bull; GA4 &bull; Semrush &bull; Ahrefs
              </span>
            </Link>
            <Link
              href="/services/web-development/"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-colors hover:bg-surface-1"
            >
              <Icon name="code" size={14} className="text-primary-container transition-transform group-hover:scale-110" />
              <span className="font-heading font-semibold uppercase tracking-[0.06em] text-on-surface/80 group-hover:text-primary-container">
                Web &amp; SEO
              </span>
              <span className="hidden font-sans text-on-surface/60 sm:inline">
                &bull; WordPress &bull; Elementor &bull; Next.js &bull; React
              </span>
            </Link>
            <Link
              href="/tools/"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-colors hover:bg-surface-1"
            >
              <Icon name="auto_awesome" size={14} className="text-primary-container transition-transform group-hover:scale-110" />
              <span className="font-heading font-semibold uppercase tracking-[0.06em] text-on-surface/80 group-hover:text-primary-container">
                AI &amp; Diagnostics
              </span>
              <span className="hidden font-sans text-on-surface/60 sm:inline">
                &bull; Interactive GBP Auditor &bull; Gemini AI Sprints
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Infinite Loop Container with Gradient Mask */}
      <div
        className="relative z-10 mt-8 flex w-full flex-col py-1"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        {/* Single-line Row (Scroll Left, pause on hover) */}
        <div className="marquee-row animate-marquee-left flex w-max">
          {/* Primary Track */}
          <div className="flex shrink-0 items-center gap-3.5 pr-3.5 sm:gap-5 sm:pr-5">
            {TECHNICAL_TOOLS.map((tool, idx) => (
              <div
                key={`tool-${tool.name}-${idx}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-black/[0.08] bg-surface-1/95 px-3.5 py-2 shadow-sm backdrop-blur-md transition-[border-color,background-color,transform,box-shadow] duration-[var(--motion-normal)] ease-[var(--ease-organic)] hover:-translate-y-0.5 hover:border-primary-container/70 hover:bg-surface-2 hover:shadow-[0_0_20px_rgba(224,123,32,0.25)] dark:border-white/[0.08] sm:px-4 sm:py-2.5"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {tool.svg}
                </div>
                <span className="whitespace-nowrap font-heading text-xs font-semibold tracking-wide text-on-surface/90 transition-colors group-hover:text-on-surface sm:text-sm">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Duplicate Track for Seamless Looping */}
          <div className="flex shrink-0 items-center gap-3.5 pr-3.5 sm:gap-5 sm:pr-5" aria-hidden="true">
            {TECHNICAL_TOOLS.map((tool, idx) => (
              <div
                key={`tool-dup-${tool.name}-${idx}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-black/[0.08] bg-surface-1/95 px-3.5 py-2 shadow-sm backdrop-blur-md transition-[border-color,background-color,transform,box-shadow] duration-[var(--motion-normal)] ease-[var(--ease-organic)] hover:-translate-y-0.5 hover:border-primary-container/70 hover:bg-surface-2 hover:shadow-[0_0_20px_rgba(224,123,32,0.25)] dark:border-white/[0.08] sm:px-4 sm:py-2.5"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {tool.svg}
                </div>
                <span className="whitespace-nowrap font-heading text-xs font-semibold tracking-wide text-on-surface/90 transition-colors group-hover:text-on-surface sm:text-sm">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
