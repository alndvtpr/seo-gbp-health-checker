import type { CanonicalEducation } from '../types'

/**
 * Authoritative Canonical Education Dataset
 * Single source of truth for both AboutCredentials and resume page.
 */
export const CANONICAL_EDUCATION: CanonicalEducation[] = [
  {
    id: 'mmdc-bsit',
    degree: 'Bachelor of Science in Information Technology',
    resumeDegree: 'BS in Information Technology',
    specialization: 'Network & Cybersecurity Specialization',
    resumeSpecialization: 'Major in Network and Cybersecurity',
    institution: 'Mapua Malayan Digital College',
    statusHighlight: 'Currently Studying Part-Time',
    expectedYear: 'Expected 2029',
    badge: 'In Progress',
    resumeBadge: 'Ongoing Degree',
    badgeVariant: 'primary',
  },
  {
    id: 'smu-bsit',
    degree: 'Bachelor of Science in Information Technology (Undergraduate Coursework)',
    resumeDegree: 'BS in Information Technology (Undergraduate)',
    institution: "Saint Mary's University, Bayombong, Nueva Vizcaya, Philippines",
    details: "Saint Mary's University, Bayombong, Nueva Vizcaya",
    timeline: '2014 – 2017',
    badge: 'Undergraduate Studies',
    resumeBadge: 'Undergraduate',
    badgeVariant: 'muted',
  },
]
