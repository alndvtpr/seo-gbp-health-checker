import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',
        surface: 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'surface-container-low': 'var(--color-surface-container-low)',
        primary: 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        'secondary-fixed-dim': 'var(--color-secondary-fixed-dim)',
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'headline-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body-md': ['1rem', { lineHeight: '1.5' }],
        'label-sm': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      spacing: {
        'margin-desktop': '4rem',
        gutter: '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
