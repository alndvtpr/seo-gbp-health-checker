import { describe, it, expect } from 'vitest'
import {
  calculateGBPScore,
  type SerperMapsResponse,
  type SerperPlace,
} from '@/features/tools/lib/gbpScoring'
import {
  detectAndNormalizeCategory,
  GBP_TAXONOMY_MAP,
} from '@/features/tools/lib/gbpTaxonomy'
import {
  generateOptimizedBusinessDescription,
  generateReviewResponseTemplates,
  generateHighIntentKeywords,
  generateLocalSeoActionPlan,
} from '@/features/tools/lib/gbpAiPlan'

describe('GBP Audit Parity & Scoring Engine', () => {
  describe('Taxonomy & Category Normalization', () => {
    it('accurately identifies and normalizes category matches from business name and category', () => {
      const dentalMatch = detectAndNormalizeCategory('Dentist', 'Bright Smile Dental Care')
      expect(dentalMatch.primaryCategory).toBe('Dental clinic')
      expect(dentalMatch.isMismatchDetected).toBe(false)
      expect(dentalMatch.confidenceScore).toBe(0.95)
      expect(dentalMatch.additionalCategories).toContain('Cosmetic dentist')

      const resortMatch = detectAndNormalizeCategory('Resort hotel', 'Paradise Island Resort')
      expect(resortMatch.primaryCategory).toBe('Resort hotel')
      expect(resortMatch.isMismatchDetected).toBe(false)
    })

    it('detects category anomaly / mismatch when profile category contradicts name semantics', () => {
      const anomaly = detectAndNormalizeCategory('Garden', 'Dap-ayan Resort')
      expect(anomaly.isMismatchDetected).toBe(true)
      expect(anomaly.primaryCategory).toBe('Resort hotel')
      expect(anomaly.rawGoogleCategory).toBe('Garden')
      expect(anomaly.confidenceScore).toBe(0.99)
      expect(anomaly.optimizationMessage).toContain('Critical Category Mismatch')
    })

    it('falls back gracefully for generic local businesses without taxonomy match', () => {
      const fallback = detectAndNormalizeCategory(undefined, 'Acme Horizon Alpha 123')
      expect(fallback.primaryCategory).toBe('Local Business')
      expect(fallback.isMismatchDetected).toBe(false)
      expect(fallback.confidenceScore).toBe(0.75)
    })
  })

  describe('Scoring Engine Calculation Parity', () => {
    it('calculates score and pillars for a high-performing business in Map Pack', () => {
      const placeData: SerperPlace = {
        title: 'Manila Smile Dental Care',
        address: '123 Taft Ave, Manila',
        phoneNumber: '+63 917 123 4567',
        website: 'https://www.manilasmiledental.com',
        rating: 4.8,
        ratingCount: 85,
        category: 'Dentist',
        cid: 'cid-dental-12345',
        position: 1,
      }

      const serperData: SerperMapsResponse = {
        places: [
          {
            title: 'Manila Smile Dental Care',
            address: '12 Taft Ave, Manila',
            position: 1,
            rating: 4.8,
            ratingCount: 85,
            category: 'Dental clinic',
          },
          {
            title: 'Rival Dental Studio',
            address: '456 Taft Ave, Manila',
            position: 2,
            rating: 4.5,
            ratingCount: 40,
            category: 'Dental clinic',
          },
        ],
      }

      const result = calculateGBPScore(
        placeData,
        serperData,
        'Manila Smile Dental Care',
        'Manila',
      )

      expect(result.foundInMapPack).toBe(true)
      expect(result.mapPackPosition).toBe(1)
      expect(result.totalScore).toBe(100) // 40 foundation + 30 reputation + 30 prominence = 100
      expect(result.grade).toBe('A+')
      expect(result.pillars).toHaveLength(3)
      expect(result.pillars[0].name).toBe('NAP & Completeness')
      expect(result.pillars[0].score).toBe(40) // 8 + 8 + 8 + 10 + 6
      expect(result.pillars[1].name).toBe('Reputation')
      expect(result.pillars[1].score).toBe(30) // 15 rating + 15 volume
      expect(result.pillars[2].name).toBe('Map Pack Visibility')
      expect(result.pillars[2].score).toBe(30) // 12 category + 8 photo + 10 map pack = 30
      expect(result.publicChecks).toHaveLength(10)
      expect(result.competitors).toHaveLength(1)
      expect(result.competitors[0].name).toBe('Rival Dental Studio')
    })

    it('calculates score accurately for low-performing / unlisted profile', () => {
      const placeData: SerperPlace = {
        title: 'Ghost Business',
      }
      const serperData: SerperMapsResponse = { places: [] }

      const result = calculateGBPScore(
        placeData,
        serperData,
        'Ghost Business',
        'Cebu',
      )

      expect(result.foundInMapPack).toBe(false)
      expect(result.mapPackPosition).toBeNull()
      expect(result.totalScore).toBe(8) // only operational_status passes (8 pts)
      expect(result.grade).toBe('F')
      expect(result.actionItems.length).toBeGreaterThan(3)
    })

    it('incorporates deep check answers when provided', () => {
      const placeData: SerperPlace = {
        title: 'Sample Cafe',
        address: 'Main Rd, Baguio',
        phoneNumber: '+63 920 111 2222',
        website: 'https://samplecafe.ph',
        rating: 4.2,
        ratingCount: 15,
        category: 'Cafe',
        cid: 'cid-sample-cafe',
      }
      const serperData: SerperMapsResponse = { places: [] }

      const resultWithDeepCheck = calculateGBPScore(
        placeData,
        serperData,
        'Sample Cafe',
        'Baguio',
        [true, false, true, false],
      )

      expect(resultWithDeepCheck.pillars).toHaveLength(4)
      expect(resultWithDeepCheck.pillars[3].name).toBe('Deep Check Authenticity')
      expect(resultWithDeepCheck.pillars[3].score).toBe(10) // 5 + 5
    })
  })

  describe('AI Action Plan & Deliverables Template Generation', () => {
    it('generates consistent business descriptions within bounds', () => {
      const desc = generateOptimizedBusinessDescription(
        'Apex SEO Studio',
        'Makati',
        'Marketing agency',
        ['SEO service', 'Web design'],
      )
      expect(desc).toContain('Apex SEO Studio')
      expect(desc).toContain('Makati')
      expect(desc).toContain('Marketing agency')
      expect(desc.length).toBeGreaterThan(150)
      expect(desc.length).toBeLessThan(750)
    })

    it('generates review templates with business and location placeholders resolved', () => {
      const templates = generateReviewResponseTemplates('Apex Studio', 'Makati')
      expect(templates.positive).toContain('Apex Studio')
      expect(templates.positive).toContain('Makati')
      expect(templates.constructive).toContain('Apex Studio')
      expect(templates.constructive).toContain('Makati')
    })

    it('generates 6 high-intent local keywords', () => {
      const keywords = generateHighIntentKeywords('Apex Studio', 'Makati', 'marketing agency', [
        'seo audit',
        'local ranking',
      ])
      expect(keywords).toHaveLength(6)
      expect(keywords[0]).toBe('Apex Studio Makati')
    })

    it('has all core industries defined in GBP_TAXONOMY_MAP', () => {
      expect(GBP_TAXONOMY_MAP.length).toBeGreaterThan(10)
      const ids = GBP_TAXONOMY_MAP.map((t) => t.id)
      expect(ids).toContain('dental_practice')
      expect(ids).toContain('resort_hospitality')
      expect(ids).toContain('pediatric_therapy')
    })

    it('generates a full local SEO 30-day action plan markdown structure', () => {
      const plan = generateLocalSeoActionPlan(
        'Apex Studio',
        'Makati',
        85,
        'A+',
        [],
        [{ priority: 'high', message: 'Add phone number' }],
      )
      expect(plan).toContain('### 🎯 30-Day Local SEO Action Plan for Apex Studio')
      expect(plan).toContain('Week 1: Core Foundation')
      expect(plan).toContain('Week 2: Review Velocity')
      expect(plan).toContain('Week 3: Service Catalog')
      expect(plan).toContain('Week 4: Website Synergy')
    })
  })
})
