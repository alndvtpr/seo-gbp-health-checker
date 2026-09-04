import type {
  CanonicalCertification,
  ResumeCertificationGroup,
  ResumeCertificationItem,
} from '../types'

/**
 * Authoritative Canonical Certifications Dataset
 * Serves both the interactive visual About showcase and the structured Resume page.
 */
export const CANONICAL_CERTIFICATIONS: CanonicalCertification[] = [
  // Google AI Professional Certificate & Modular Courses
  {
    id: 'google-ai-professional',
    title: 'Google AI Professional Certificate',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Professional Certificate (8 Courses)',
    resumeBadge: 'Professional Certificate',
    imageSrc: '/assets/certificates/alain-dave-tapiru-google-ai-professional-certificate-2026.webp',
    imageAlt:
      'Google AI Professional Certificate awarded to Alain Dave Gallo Tapiru in September 2026',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-professional-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-professional-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/professional-cert/YIC92ES1TX9D',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-fundamentals',
    title: 'AI Fundamentals',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/alain-dave-tapiru-google-ai-fundamentals-certificate-2026.webp',
    imageAlt:
      'Google AI Fundamentals certificate awarded to Alain Dave Gallo Tapiru in September 2026',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-fundamentals-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-fundamentals-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/NXBZIK64UH68',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-brainstorming-planning',
    title: 'AI for Brainstorming and Planning',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-brainstorming-planning-certificate-2026.webp',
    imageAlt:
      'Google AI for Brainstorming and Planning certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-brainstorming-planning-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-brainstorming-planning-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/9V7CXE9TY9Q3',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-research-insights',
    title: 'AI for Research and Insights',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-research-insights-certificate-2026.webp',
    imageAlt:
      'Google AI for Research and Insights certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-research-insights-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-research-insights-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/WZ8JT0GOU77C',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-writing-communicating',
    title: 'AI for Writing and Communicating',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-writing-communicating-certificate-2026.webp',
    imageAlt:
      'Google AI for Writing and Communicating certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-writing-communicating-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-writing-communicating-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/CDKORGFE2FYM',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-content-creation',
    title: 'AI for Content Creation',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-content-creation-certificate-2026.webp',
    imageAlt:
      'Google AI for Content Creation certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-content-creation-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-content-creation-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/WAIC1EUCYM0N',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-data-analysis',
    title: 'AI for Data Analysis',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-data-analysis-certificate-2026.webp',
    imageAlt:
      'Google AI for Data Analysis certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-data-analysis-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-data-analysis-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/PJ7VK0VXUH3D',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-app-building',
    title: 'AI for App Building',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-app-building-certificate-2026.webp',
    imageAlt:
      'Google AI for App Building certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-app-building-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-app-building-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/DKD3F3CDN9SB',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'google-ai-app-deployment',
    title: 'AI for App Deployment',
    issuer: 'Google | Coursera',
    issuedDate: 'Issued Sept 2026',
    category: 'google-ai',
    badge: 'Verified Credential',
    imageSrc:
      '/assets/certificates/alain-dave-tapiru-google-ai-app-deployment-certificate-2026.webp',
    imageAlt:
      'Google AI for App Deployment certificate awarded to Alain Dave Gallo Tapiru',
    downloadUrl:
      '/assets/certificates/alain-dave-tapiru-google-ai-app-deployment-certificate-2026.pdf',
    downloadFilename:
      'alain-dave-tapiru-google-ai-app-deployment-certificate-2026.pdf',
    verifyUrl: 'https://coursera.org/verify/XMTWQX3OZ7I4',
    buttonText: 'View / Verify',
    showInAbout: true,
  },

  // SEO, Inbound & Digital Marketing Certifications
  {
    id: 'seo-bootcamp',
    title: 'Online SEO Bootcamp (Batch 32)',
    resumeTitle: 'SEO Bootcamp Completion',
    issuer: 'PinoySEO & SOVA Training',
    resumeIssuer: 'Pinoy SEO & SOVA Training (Batch 32)',
    issuedDate: 'Issued Sept 2025',
    category: 'seo-inbound',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/Alain Dave Tapiru -SEO Specialist Philippines Certificate.webp',
    imageAlt:
      'Online SEO Bootcamp Batch 32 certificate earned by Alain Dave Tapiru from PinoySEO and SOVA Training',
    downloadUrl: '/assets/certificates/Alain Dave Tapiru -SEO Specialist Philippines Certificate.webp',
    downloadFilename: 'Alain Dave Tapiru - SEO Specialist Philippines Certificate.webp',
    verifyUrl:
      'https://www.sova.ph/search-engine-optimization-bootcamp-graduates/search-engine-optimization-graduates-batch-32/#:~:text=Alain%20Dave%20Tapiru',
    buttonText: 'View Certificate',
    showInAbout: true,
  },
  {
    id: 'hubspot-inbound',
    title: 'Inbound Certification',
    issuer: 'HubSpot Academy',
    issuedDate: 'Issued Sept 2026',
    category: 'seo-inbound',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/hubspot-inbound-certification-alain-dave-tapiru.avif',
    imageAlt: 'HubSpot Academy Inbound Certification awarded to Alain Dave Tapiru',
    downloadUrl: '/assets/certificates/hubspot-inbound-certification-alain-dave-tapiru.avif',
    downloadFilename: 'hubspot-inbound-certification-alain-dave-tapiru.avif',
    verifyUrl: 'https://app.hubspot.com/academy/achievements/8453e7bb6ba841ba814f77c8a976d34c/inbound',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'meta-social-media',
    title: 'Introduction to Social Media Marketing',
    issuer: 'Meta | Coursera',
    issuedDate: 'Issued Dec 2020',
    category: 'seo-inbound',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/Introduction to Social Media Marketing.avif',
    imageAlt:
      'Introduction to Social Media Marketing Coursera certificate from Meta earned by Alain Dave Tapiru',
    downloadUrl: '/assets/certificates/Introduction to Social Media Marketing.pdf',
    downloadFilename: 'Introduction to Social Media Marketing - Alain Dave Tapiru.pdf',
    verifyUrl: 'https://www.coursera.org/verify/D48TRWWUSJJZ',
    buttonText: 'View / Verify',
    showInAbout: true,
  },

  // Communications & Professional Foundations
  {
    id: 'grammar-punctuation-uci',
    title: 'Grammar and Punctuation',
    issuer: 'UC Irvine | Coursera',
    issuedDate: 'Issued Oct 2020',
    category: 'communications',
    badge: 'Verified Credential',
    imageSrc: '/assets/certificates/Grammar and Punctuation Certificate Alain Dave Tapiru.avif',
    imageAlt:
      'Grammar and Punctuation Coursera certificate from UCI earned by Alain Dave Tapiru',
    downloadUrl:
      '/assets/certificates/Grammar and Punctuation Coursera Certificate - Alain Dave Tapiru.pdf',
    downloadFilename:
      'Grammar and Punctuation Coursera Certificate - Alain Dave Tapiru.pdf',
    verifyUrl: 'https://coursera.org/verify/P4ZJK54AY7WD',
    buttonText: 'View / Verify',
    showInAbout: true,
  },
  {
    id: 'english-communications',
    title: 'English Communications',
    issuer: 'ERC Global',
    issuedDate: 'Issued 2023',
    category: 'communications',
    badge: 'Corporate Training',
    showInAbout: false,
  },
]

/** Selectors for the About Page visual presentation */
export const GOOGLE_AI_CERTIFICATIONS = CANONICAL_CERTIFICATIONS.filter(
  (c) => c.category === 'google-ai' && c.showInAbout !== false
)

export const SEO_CERTIFICATIONS = CANONICAL_CERTIFICATIONS.filter(
  (c) => (c.category === 'seo-inbound' || c.id === 'grammar-punctuation-uci') && c.showInAbout !== false
)

/** Selectors and grouped dataset for the Resume Page */
export const RESUME_CERTIFICATION_GROUPS: ResumeCertificationGroup[] = [
  {
    category: 'SEO, Inbound & Digital Marketing',
    items: CANONICAL_CERTIFICATIONS.filter((c) => c.category === 'seo-inbound').map((c) => ({
      title: c.resumeTitle ?? c.title,
      issuer: c.resumeIssuer ?? c.issuer,
      date: c.issuedDate,
      verifyUrl: c.verifyUrl,
      badge: c.resumeBadge ?? c.badge,
    })),
  },
  {
    category: 'Google AI & Practical Automation',
    items: CANONICAL_CERTIFICATIONS.filter((c) => c.category === 'google-ai').map((c) => ({
      title: c.resumeTitle ?? c.title,
      issuer: c.resumeIssuer ?? c.issuer,
      date: c.issuedDate,
      verifyUrl: c.verifyUrl,
      badge: c.resumeBadge ?? c.badge,
    })),
  },
  {
    category: 'Communications & Professional Foundations',
    items: CANONICAL_CERTIFICATIONS.filter((c) => c.category === 'communications').map((c) => ({
      title: c.resumeTitle ?? c.title,
      issuer: c.resumeIssuer ?? c.issuer,
      date: c.issuedDate,
      verifyUrl: c.verifyUrl,
      badge: c.resumeBadge ?? c.badge,
    })),
  },
]

export const RESUME_CERTIFICATIONS: ResumeCertificationItem[] =
  RESUME_CERTIFICATION_GROUPS.flatMap((group) => group.items)
