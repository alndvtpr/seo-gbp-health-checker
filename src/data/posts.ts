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
    title: 'How I Engineered a 99/100 Core Web Vitals Score on Next.js 15',
    category: 'Technical SEO & Web Perf',
    date: 'August 2026',
    datePublished: '2026-08-15',
    readTime: '6 min read',
    excerpt:
      'A deep dive into zero-CPU ambient CSS styling, delayed script hydration, sub-second First Contentful Paint, and zero-CLS layout architectures.',
    content: {
      lead:
        'Search engine optimization in 2026 requires uncompromising technical performance. Google’s Core Web Vitals algorithms directly evaluate user experience metrics—Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Here is how I achieved a verified 99 Desktop and 96 Mobile PageSpeed score.',
      sections: [
        {
          heading: '1. Eliminating Main-Thread Render Blocking',
          body: [
            'Traditional web applications frequently choke on complex WebGL canvas animations and excessive JavaScript bundles. During our initial benchmark, WebGL shader loops continuously consumed 100% of a single CPU core, elevating Total Blocking Time (TBT) to over 4,500ms.',
            'By replacing CPU-intensive WebGL animation loops with GPU-accelerated CSS ambient radial gradients and hardware-accelerated opacity transitions, we reduced main-thread blocking to a clean 0ms.',
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
            'Furthermore, converting legacy raster images to modern AVIF and WebP formats reduced initial asset payloads by more than 68% without sacrificing visual fidelity.',
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
            'Analytics trackers, chatbots, and non-critical tracking tags should never execute during critical path rendering. We implemented requestIdleCallback listeners with 8,000ms idle fallbacks, ensuring user interactions receive immediate main-thread priority.',
            'The result is a website that loads in under 0.9 seconds on desktop and sub-1.4 seconds on mobile connections.',
          ],
        },
      ],
    },
  },
  {
    slug: 'local-seo-google-business-profile-blueprint',
    title: 'The 2026 Google Business Profile Optimization Blueprint for Local Rankings',
    category: 'Local SEO',
    date: 'August 2026',
    datePublished: '2026-08-10',
    readTime: '8 min read',
    excerpt:
      'Mastering the 3 primary ranking vectors—Relevance, Prominence, and Distance—with calibrated primary categories, review velocity, and entity authority.',
    content: {
      lead:
        'Local search is no longer just about citations and keyword stuffing. Google’s local algorithm uses sophisticated entity resolution and real-time proximity clustering to decide which businesses earn top placement in the coveted Google Map 3-Pack.',
      sections: [
        {
          heading: '1. Primary Category Alignment & Subcategory Expansion',
          body: [
            'Your primary Google Business Profile category carries the heaviest ranking weight in local search algorithms. Selecting a slightly misaligned category can completely exclude your profile from high-intent local queries.',
            'Ensure your primary category accurately reflects your core revenue-driving offering, and use secondary categories to capture related search intent.',
          ],
          highlight: {
            title: 'Audit Insight',
            text:
              'Never guess your category. Inspect top-ranking competitors in your specific geographic radius to verify the primary category Google rewards in your niche.',
          },
          takeaways: [
            'Primary category accounts for over 30% of Map Pack ranking weight.',
            'Use secondary categories strategically without diluting core relevance.',
            'Keep NAP (Name, Address, Phone) strictly consistent across all major directories.',
          ],
        },
        {
          heading: '2. Review Sentiment & Keyword-Rich Customer Feedback',
          body: [
            'Review count is important, but review velocity and sentiment analysis are decisive ranking signals in 2026. Profiles that steadily earn organic reviews mentioning specific services consistently outperform static competitors.',
            'Encourage clients to mention specific deliverables, service locations, and outcomes in their feedback.',
          ],
          takeaways: [
            'Maintain consistent monthly review velocity rather than sporadic spikes.',
            'Always reply to 100% of reviews within 24–48 hours.',
            'Embed high-intent service keywords naturally in owner responses.',
          ],
        },
        {
          heading: '3. Entity Linking with Your Verified Website',
          body: [
            'A Google Business Profile is only as strong as the website backing it. By embedding LocalBusiness JSON-LD schemas linking your profile URL, service catalog, and exact geo-coordinates, you reinforce entity validation across search ecosystems.',
            'This bridges the gap between your local map presence and organic search indexing.',
          ],
        },
      ],
    },
  },
]
