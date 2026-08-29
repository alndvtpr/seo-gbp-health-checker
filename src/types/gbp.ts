/** Breakdown of the three audit pillars returned by the API. */
export interface AuditPillar {
  name: string
  score: number
  maxScore: number
  details: string[]
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low' | 'passed'
  message: string
}

export interface Competitor {
  name: string
  rating?: number
  reviews?: number
  position: number
  category?: string
}

export interface CategoryBenchmark {
  isCategoryAlignedWithTopCompetitors: boolean
  topCompetitorCategories: string[]
  categoryOptimizationTip: string
  rawGoogleCategory?: string
  isCategoryMismatchDetected?: boolean
  recommendedPrimaryCategory?: string
  recommendedSecondaryCategories?: string[]
}

export interface PublicAuditCheck {
  id: string
  label: string
  status: 'passed' | 'failed' | 'warning'
  value?: string
  scoreEarned: number
  maxScore: number
  impactMessage: string
}

export interface WebsiteSeo {
  url: string
  title: string | null
  metaDescription: string | null
  status: 'success' | 'error' | 'no_website'
}

export interface ReviewTemplates {
  positive: string
  constructive: string
}

/** Full API response payload from /api/gbp-audit */
export interface GBPAuditResponse {
  success: boolean
  businessName: string
  location: string
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  publicChecks?: PublicAuditCheck[]
  placeId: string | null
  foundInMapPack: boolean
  mapPackPosition: number | null
  actionItems?: ActionItem[]
  competitors?: Competitor[]
  websiteSeo?: WebsiteSeo
  error?: string
  aiRecommendations?: string
  aiDescription?: string
  aiReviewTemplates?: ReviewTemplates
  aiKeywords?: string[]

  // ─── ✨ 2026 Category Intelligence Module ──────────────────────
  primaryCategory?: string
  additionalCategories?: string[]
  categoryConfidenceScore?: number
  categoryBenchmark?: CategoryBenchmark
}
