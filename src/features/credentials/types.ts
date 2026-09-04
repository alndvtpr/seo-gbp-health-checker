/**
 * Canonical Credential & Education Domain Types
 * Shared between About and Resume user journeys.
 */

export type CredentialCategory = 'seo-inbound' | 'google-ai' | 'communications'

export interface CanonicalCertification {
  id: string
  title: string
  /** Alternate formal title for structured resume presentation */
  resumeTitle?: string
  issuer: string
  /** Alternate formal issuer name for structured resume presentation */
  resumeIssuer?: string
  issuedDate: string
  category: CredentialCategory
  badge: string
  /** Alternate compact badge for resume badges */
  resumeBadge?: string
  imageSrc?: string
  imageAlt?: string
  downloadUrl?: string
  downloadFilename?: string
  verifyUrl?: string
  buttonText?: string
  /** Whether this certificate is presented on the visual About credentials showcase */
  showInAbout?: boolean
}

export interface CanonicalEducation {
  id: string
  degree: string
  /** Alternate title for resume card presentation */
  resumeDegree?: string
  specialization?: string
  /** Alternate specialization title for resume card presentation */
  resumeSpecialization?: string
  institution: string
  details?: string
  statusHighlight?: string
  timeline?: string
  expectedYear?: string
  badge: string
  /** Alternate badge text for resume */
  resumeBadge?: string
  badgeVariant?: 'primary' | 'muted'
}

export interface ResumeCertificationItem {
  title: string
  issuer: string
  date: string
  verifyUrl?: string
  badge: string
}

export interface ResumeCertificationGroup {
  category: string
  items: ResumeCertificationItem[]
}
