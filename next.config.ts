import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'alaintapiru.com',
          },
        ],
        destination: 'https://www.alaintapiru.com/:path*',
        permanent: true,
      },
      {
        source: '/facebook.com',
        destination: 'https://www.facebook.com/dcrazedave',
        permanent: true,
      },
      {
        source: '/facebook.com/:path*',
        destination: 'https://www.facebook.com/dcrazedave',
        permanent: true,
      },
      {
        source: '/www.facebook.com',
        destination: 'https://www.facebook.com/dcrazedave',
        permanent: true,
      },
      {
        source: '/www.facebook.com/:path*',
        destination: 'https://www.facebook.com/dcrazedave',
        permanent: true,
      },
      {
        source: '/projects/claimscale-ai-resume-portfolio',
        destination: '/projects/alaintapiru-portfolio/',
        permanent: true,
      },
      {
        source: '/projects/claimscale-ai-resume-portfolio/:path*',
        destination: '/projects/alaintapiru-portfolio/',
        permanent: true,
      },
      {
        source: '/projects/claimscale-ai-portfolio',
        destination: '/projects/alaintapiru-portfolio/',
        permanent: true,
      },
      {
        source: '/projects/claimscale-ai-portfolio/:path*',
        destination: '/projects/alaintapiru-portfolio/',
        permanent: true,
      },
      {
        source: '/projects/executive-optical-local-seo',
        destination: '/projects/local-seo-gbp-checker/',
        permanent: true,
      },
      {
        source: '/projects/executive-optical-local-seo/:path*',
        destination: '/projects/local-seo-gbp-checker/',
        permanent: true,
      },
      {
        source: '/projects/saas-growth-engine-seo',
        destination: '/projects/angat-sikat-studio/',
        permanent: true,
      },
      {
        source: '/projects/saas-growth-engine-seo/:path*',
        destination: '/projects/angat-sikat-studio/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';",
          },
        ],
      },
      {
        source: '/(hero-frames|_next/static|media)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    localPatterns: [
      {
        pathname: '/**',
      },
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
