export interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  datePublished: string
  readTime: string
  excerpt: string
  content: {
    lead: string
    sections: {
      heading: string
      body: string[]
      codeBlock?: {
        code: string
        language: string
        filename?: string
      }
      highlight?: {
        title: string
        text: string
      }
      takeaways?: string[]
    }[]
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-achieve-99-pagespeed-nextjs',
    title: 'How I Optimized for a 99/100 Core Web Vitals Score on Next.js 15',
    category: 'Technical SEO & Web Perf',
    date: 'August 2026',
    datePublished: '2026-08-15',
    readTime: '6 min read',
    excerpt:
      'A deep dive into zero-CPU ambient CSS styling, delayed script hydration, fast First Contentful Paint, and zero-CLS layout architectures.',
    content: {
      lead:
        'Search engine optimization in 2026 requires solid technical performance. Google’s Core Web Vitals algorithms evaluate direct user experience metrics: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Here is how I achieved a verified 99 Desktop and 96 Mobile PageSpeed score.',
      sections: [
        {
          heading: '1. Eliminating Main-Thread Render Blocking',
          body: [
            'Traditional web applications frequently encounter performance bottlenecks with complex WebGL canvas animations and excessive JavaScript bundles. During my initial benchmark, WebGL shader loops continuously consumed high CPU resources, elevating Total Blocking Time (TBT).',
            'By replacing CPU-intensive WebGL animation loops with GPU-accelerated CSS ambient radial gradients and hardware-accelerated opacity transitions, I reduced main-thread blocking to a clean 0ms.',
          ],
          highlight: {
            title: 'Technical Rule',
            text:
              'Never allow background decorative visuals to hijack the main JavaScript thread during initial page load and layout evaluation.',
          },
          takeaways: [
            'Avoid heavy WebGL loops during initial DOM reconciliation.',
            'Use CSS radial gradients and hardware-accelerated transforms for ambient backgrounds.',
            'Preserve 60fps mobile scroll performance by gating backdrop-filter blurs.',
          ],
        },
        {
          heading: '2. Zero-CLS Image Containers & AVIF Compression',
          body: [
            'Cumulative Layout Shift (CLS) occurs when visual elements pop into the DOM without reserved viewport bounding boxes. To achieve a 0.000 CLS score, every image container must enforce explicit aspect-ratio properties.',
            'Converting legacy raster images to modern AVIF and WebP formats reduced initial asset payloads by more than 68% without sacrificing visual fidelity.',
          ],
          takeaways: [
            'Explicitly specify width and height on next/image containers.',
            'Leverage next/image with decoding="async" and loading="lazy" for below-the-fold assets.',
            'Compress imagery under 80KB for instant mobile FCP.',
          ],
        },
        {
          heading: '3. Intelligent Script Deferral & Idle Hydration',
          body: [
            'Analytics trackers, chatbots, and non-critical tracking tags should never execute during critical path rendering. I implemented requestIdleCallback listeners with 8,000ms idle fallbacks, ensuring user interactions receive immediate main-thread priority.',
            'The result is a website that loads in under 0.9 seconds on desktop and sub-1.4 seconds on mobile connections.',
          ],
          codeBlock: {
            language: 'typescript',
            filename: 'src/lib/deferred-analytics.ts',
            code: `// Intelligent requestIdleCallback loader for non-critical analytics
export function scheduleIdleTask(callback: () => void, timeout = 8000) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 2500)
  }
}`,
          },
        },
      ],
    },
  },
  {
    slug: 'local-seo-google-business-profile-blueprint',
    title: 'A Practical 2026 Google Business Profile Optimization Guide for Local Visibility',
    category: 'Local SEO',
    date: 'August 2026',
    datePublished: '2026-08-10',
    readTime: '8 min read',
    excerpt:
      'Understanding the 3 primary ranking factors (Relevance, Prominence, and Distance) with calibrated primary categories, review velocity, and entity validation.',
    content: {
      lead:
        'Local search is no longer just about citations and keyword stuffing. Google’s local algorithm uses entity resolution and proximity clustering to decide which businesses earn placement in the Google Map 3-Pack.',
      sections: [
        {
          heading: '1. Primary Category Alignment & Subcategory Expansion',
          body: [
            'Your primary Google Business Profile category carries significant weight in local search algorithms. Selecting a slightly misaligned category can exclude your profile from high-intent local queries.',
            'Ensure your primary category accurately reflects your core offering, and use secondary categories to capture related search intent.',
          ],
          highlight: {
            title: 'Practical Insight',
            text:
              'Never guess your category. Inspect top-ranking competitors in your specific geographic radius to verify the primary category Google rewards in your niche.',
          },
          takeaways: [
            'Primary category accounts for a major portion of Map Pack ranking weight.',
            'Use secondary categories strategically without diluting core relevance.',
            'Keep NAP (Name, Address, Phone) strictly consistent across all major directories.',
          ],
        },
        {
          heading: '2. Review Sentiment & Keyword-Rich Customer Feedback',
          body: [
            'Review count is important, but review velocity and sentiment analysis are decisive signals in 2026. Profiles that steadily earn organic reviews mentioning specific services consistently outperform static competitors.',
            'Encourage clients to mention specific deliverables, service locations, and experiences in their feedback.',
          ],
          takeaways: [
            'Maintain consistent monthly review velocity rather than sporadic spikes.',
            'Always reply to 100% of reviews within 24–48 hours.',
            'Embed high-intent service terms naturally in owner responses.',
          ],
        },
        {
          heading: '3. Entity Linking with Your Verified Website',
          body: [
            'A Google Business Profile is strengthened by the website backing it. By embedding LocalBusiness JSON-LD schemas linking your profile URL, service catalog, and exact geo-coordinates, you reinforce entity validation across search engines.',
            'This bridges the gap between your local map presence and organic search indexing.',
          ],
          codeBlock: {
            language: 'json',
            filename: 'schema-local-business.json',
            code: `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Alain Dave Tapiru - Technical SEO",
  "url": "https://www.alaintapiru.com/",
  "telephone": "+639063249560",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tuguegarao City",
    "addressRegion": "Cagayan",
    "addressCountry": "PH"
  }
}`,
          },
        },
      ],
    },
  },
  {
    slug: 'nextjs-vs-wordpress-enterprise-seo',
    title: 'Next.js vs. WordPress for SEO: A Technical Architecture Guide',
    category: 'Technical SEO & Architecture',
    date: 'August 2026',
    datePublished: '2026-08-18',
    readTime: '7 min read',
    excerpt:
      'An architectural comparison evaluating static HTML crawl efficiency, render-blocking JavaScript, database overhead, and editorial workflows.',
    content: {
      lead:
        'Choosing between a modern Next.js architecture and a customized WordPress setup is one of the most critical structural decisions for web performance. While WordPress powers over 40% of the web, Next.js static site generation (SSG) delivers fast loading speeds and zero layout shift.',
      sections: [
        {
          heading: '1. Crawl Efficiency & Static HTML Prerendering',
          body: [
            'Search engine crawlers operate under domain crawl budgets. Traditional dynamic CMS architectures require server-side database lookups and template compilation for every bot request, which can increase Time to First Byte (TTFB).',
            'With Next.js App Router static site generation (SSG), routes are pre-compiled into lightweight static HTML, CSS, and minimal JSON payloads. Bots receive complete rendered DOM structures rapidly, maximizing crawl efficiency.',
          ],
          highlight: {
            title: 'Architectural Principle',
            text:
              'Fast TTFB and pure static HTML ensure Googlebot and Bingbot can crawl pages quickly without exhausting server resources.',
          },
          takeaways: [
            'Static HTML delivery reduces TTFB from 800ms to sub-100ms.',
            'Eliminates database connection pool bottlenecks during peak traffic and crawler surges.',
            'Maintains crawl accessibility even if headless backend databases experience temporary downtime.',
          ],
        },
        {
          heading: '2. Plugin Bloat vs. Granular Bundle Control',
          body: [
            'WordPress sites frequently accumulate dozens of third-party plugins for analytics, sliders, forms, and SEO tags. Each plugin can inject render-blocking CSS stylesheets and external scripts, which degrades Total Blocking Time (TBT) and Interaction to Next Paint (INP).',
            'In Next.js, every dependency is strictly bundled and tree-shaken. Critical path styling is injected inline, while third-party scripts utilize next/script with lazyOnload or worker threads to minimize main-thread interference.',
          ],
          takeaways: [
            'Avoid excessive page-builder DOM nesting.',
            'Enforce strict JavaScript bundle budgets under 150KB per route.',
            'Use native Web APIs rather than bloated monolithic libraries.',
          ],
        },
        {
          heading: '3. When to Use Which Platform',
          body: [
            'WordPress remains a great choice for rapid blog authoring, non-technical editorial workflows, and small local business websites. When paired with custom PHP themes, it achieves strong performance without high engineering overhead.',
            'Next.js is the ideal platform for modern web applications, custom portfolios, interactive tools, and platforms where fast Core Web Vitals and clean crawlability are primary requirements.',
          ],
        },
      ],
    },
  },
  {
    slug: 'generative-engine-optimization-aeo-geo-blueprint',
    title: 'How to Structure Schema Entity Graphs for Generative Engine Optimization (AEO & GEO)',
    category: 'AEO & GEO',
    date: 'August 2026',
    datePublished: '2026-08-20',
    readTime: '9 min read',
    excerpt:
      'Structuring interconnected Schema.org JSON-LD entity graphs, structured data, and llms.txt endpoints to improve discovery in Google AI Overviews, Perplexity, and ChatGPT Search.',
    content: {
      lead:
        'Generative AI search engines have expanded search discovery from keyword matching into multidimensional entity resolution. Google AI Overviews, Perplexity, and ChatGPT Search parse semantic relationships, citation sources, and structured knowledge graphs.',
      sections: [
        {
          heading: '1. The Evolution from Keywords to Entity Context',
          body: [
            'Traditional SEO focused on optimizing keyword density and backlink volume. In contrast, Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) evaluate whether a website represents an unambiguous entity with structured knowledge.',
            'Search LLMs evaluate entities across core axes: Topical Coverage, Factual Density, and Structured Semantic Linking.',
          ],
          highlight: {
            title: 'GEO Paradigm',
            text:
              'AI search engines reference sources that present clear entity definitions, verifiable author credentials, and machine-readable structured markup.',
          },
          takeaways: [
            'Define distinct entity IDs (@id URIs) for your brand, author, and service catalogs.',
            'Structure content into direct, factual answer blocks before deep analysis.',
            'Maintain public machine-readable /llms.txt and /llms-full.txt endpoints.',
          ],
        },
        {
          heading: '2. Structuring Interconnected Multi-Type Schema Graphs',
          body: [
            'Isolated, fragmented schema tags (e.g. standalone WebPage or Article markup) fail to communicate relationship hierarchy. An effective entity architecture uses a single unified JSON-LD graph connecting Person, WebSite, Organization, Service, and FAQPage nodes.',
            'By linking author credentials to verified social profiles via sameAs arrays and defining primary service offerings through Provider properties, you create a cohesive entity footprint.',
          ],
          codeBlock: {
            language: 'json',
            filename: 'unified-entity-graph.json',
            code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.alaintapiru.com/#person",
      "name": "Alain Dave Tapiru",
      "jobTitle": "SEO Specialist & Web Developer"
    },
    {
      "@type": "WebSite",
      "@id": "https://www.alaintapiru.com/#website",
      "name": "Alain Dave Tapiru",
      "publisher": { "@id": "https://www.alaintapiru.com/#person" }
    }
  ]
}`,
          },
          takeaways: [
            'Use @graph arrays to bundle multiple Schema.org types in a single script tag.',
            'Connect authors to external verified profiles (LinkedIn, GitHub, etc.).',
            'Cross-reference services to specific geographical service areas.',
          ],
        },
        {
          heading: '3. Actionable GEO Content Layout Architecture',
          body: [
            'Generative models prioritize content formatted with semantic headers, clear lists, concise takeaway boxes, and structured statistical metrics. Embedding explicit data points helps during LLM synthesis.',
            'By pairing clean schema markup with clear editorial content, your digital platform becomes easier for both traditional and AI-driven search engines to parse and reference.',
          ],
        },
      ],
    },
  },
]

