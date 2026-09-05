// ─── 2026 Category Taxonomy & Intelligent Normalizer ─────────────────────────

export interface TaxonomyItem {
  id: string
  namePattern: RegExp
  primary: string
  secondary: string[]
  invalidRawKeywords?: RegExp
}

export interface NormalizedCategoryResult {
  primaryCategory: string
  additionalCategories: string[]
  confidenceScore: number
  rawGoogleCategory?: string
  isMismatchDetected: boolean
  optimizationMessage?: string
}

export const GBP_TAXONOMY_MAP: TaxonomyItem[] = [
  {
    id: 'resort_hospitality',
    namePattern: /\b(resort|villas?|suites?|lodge|staycation|haven|springs?|retreat|inn|hotel|residences?|hideaway|glamping|pool|palace|resort\s*hotel)\b/i,
    primary: 'Resort hotel',
    secondary: ['Private resort', 'Hotel', 'Event venue', 'Swimming pool', 'Villa'],
    invalidRawKeywords: /\b(garden|park|point of interest|establishment|tourist attraction|farm|store)\b/i,
  },
  {
    id: 'pediatric_therapy',
    namePattern: /\b(therapy|pediatric|occupational|speech|special ed|behavioral|developmental|weeplay|autism|child dev|spd|neurodev|pt|ot|st)\b/i,
    primary: 'Pediatric clinic',
    secondary: ['Occupational therapist', 'Speech pathologist', 'Child development center', 'Physical therapy clinic'],
    invalidRawKeywords: /\b(school|learning center|training|establishment|store)\b/i,
  },
  {
    id: 'dental_practice',
    namePattern: /\b(dental|dentist|orthodontic|teeth|smile|oral care|tooth|implant)\b/i,
    primary: 'Dental clinic',
    secondary: ['Dentist', 'Cosmetic dentist', 'Orthodontist', 'Dental laboratory', 'Teeth whitening service'],
  },
  {
    id: 'medical_healthcare',
    namePattern: /\b(clinic|medical|doctor|hospital|physician|wellness|healthcare|diagnostics?|pediatrics?|pharmacy|maternity)\b/i,
    primary: 'Medical clinic',
    secondary: ['Doctor', 'Health consultant', 'Medical center', 'Diagnostic center'],
  },
  {
    id: 'digital_marketing_seo',
    namePattern: /\b(seo|digital marketing|marketing agency|media|advertising|web design|software|tech|creative studio|agency)\b/i,
    primary: 'Marketing agency',
    secondary: ['Internet marketing service', 'Website designer', 'Advertising agency', 'Software company'],
  },
  {
    id: 'legal_services',
    namePattern: /\b(law|legal|attorney|lawyer|notary|advocate|counsel|juridical|solicitor|notarial)\b/i,
    primary: 'Law firm',
    secondary: ['Legal services', 'Lawyer', 'Attorney', 'Notary public'],
  },
  {
    id: 'restaurant_food',
    namePattern: /\b(restaurant|cafe|coffee|grill|bistro|diner|kitchen|bakery|eatery|food|bar|samgyupsal|ramen|pizza|burger|eatery|lomi|lechon|bakeshop)\b/i,
    primary: 'Restaurant',
    secondary: ['Coffee shop', 'Cafe', 'Family restaurant', 'Caterer', 'Fast food restaurant'],
  },
  {
    id: 'fitness_gym',
    namePattern: /\b(gym|fitness|workout|crossfit|training|sports|boxing|yoga|pilates|martial arts)\b/i,
    primary: 'Gym / Fitness center',
    secondary: ['Personal trainer', 'Fitness center', 'Sports club', 'Yoga studio'],
  },
  {
    id: 'beauty_salon_spa',
    namePattern: /\b(salon|spa|beauty|barber|hair|lashes|nails|massage|aesthetic|skincare|derma|glow)\b/i,
    primary: 'Beauty salon',
    secondary: ['Spa', 'Hair salon', 'Nail salon', 'Massage therapist', 'Facial spa'],
  },
  {
    id: 'auto_repair',
    namePattern: /\b(auto|car|motor|repair|mechanic|garage|tire|detailing|vulcanizing|carwash|autoworks|motors)\b/i,
    primary: 'Auto repair shop',
    secondary: ['Car repair and maintenance', 'Tire shop', 'Car wash', 'Auto body shop'],
  },
  {
    id: 'real_estate',
    namePattern: /\b(realty|real estate|properties|homes|broker|realtor|developer|subdivision|condo|housing)\b/i,
    primary: 'Real estate agency',
    secondary: ['Commercial real estate agency', 'Property management company', 'Real estate appraiser'],
  },
  {
    id: 'accounting_finance',
    namePattern: /\b(accounting|cpa|bookkeeping|tax|audit|financial|finance|auditing|wealth|loans)\b/i,
    primary: 'Accounting firm',
    secondary: ['Bookkeeping service', 'Tax preparation service', 'Financial consultant'],
  },
  {
    id: 'education_training',
    namePattern: /\b(school|academy|college|university|institute|learning|education|daycare|tutorial|kindergarten|montessori)\b/i,
    primary: 'Educational institution',
    secondary: ['Learning center', 'Training centre', 'Private school'],
  },
  {
    id: 'retail_shopping',
    namePattern: /\b(store|shop|boutique|retail|mart|market|supermarket|hardware|supplies|trading|enterprise)\b/i,
    primary: 'Retail store',
    secondary: ['Shopping mall', 'Convenience store', 'Hardware store'],
  },
]

export function detectAndNormalizeCategory(
  rawCategory: string | undefined,
  businessName: string,
  placeTitle?: string,
): NormalizedCategoryResult {
  const combinedName = `${businessName} ${placeTitle || ''}`.trim()
  const cleanRaw = rawCategory?.trim() || ''

  // 1. Identify primary industry from business name semantics
  const nameMatchedTaxonomy = GBP_TAXONOMY_MAP.find((item) =>
    item.namePattern.test(combinedName),
  )

  // 2. Identify taxonomy from raw Google Places category
  const rawMatchedTaxonomy = cleanRaw
    ? GBP_TAXONOMY_MAP.find(
        (item) =>
          item.namePattern.test(cleanRaw) ||
          item.primary.toLowerCase() === cleanRaw.toLowerCase(),
      )
    : undefined

  // 3. Category Anomaly & Discrepancy Detection:
  // If the business name clearly denotes an industry (e.g. "Dap-ayan Resort"),
  // but Google Maps is tagged with an inaccurate, generic, or off-target category (e.g. "Garden", "Point of interest"):
  if (nameMatchedTaxonomy) {
    const isMismatched =
      !cleanRaw ||
      (nameMatchedTaxonomy.invalidRawKeywords && nameMatchedTaxonomy.invalidRawKeywords.test(cleanRaw)) ||
      (rawMatchedTaxonomy && rawMatchedTaxonomy.id !== nameMatchedTaxonomy.id) ||
      (!rawMatchedTaxonomy && !nameMatchedTaxonomy.namePattern.test(cleanRaw))

    if (isMismatched && cleanRaw && cleanRaw.toLowerCase() !== nameMatchedTaxonomy.primary.toLowerCase()) {
      return {
        primaryCategory: nameMatchedTaxonomy.primary,
        additionalCategories: nameMatchedTaxonomy.secondary,
        confidenceScore: 0.99,
        rawGoogleCategory: cleanRaw,
        isMismatchDetected: true,
        optimizationMessage: `Critical Category Mismatch: Your Google profile is currently indexed as "${cleanRaw}", but your business name and services indicate "${nameMatchedTaxonomy.primary}". Updating your primary category in Google Business Profile to "${nameMatchedTaxonomy.primary}" will immediately unlock high-intent local customer discovery.`,
      }
    }
  }

  // 4. If raw category is valid and consistent
  if (cleanRaw.length > 0) {
    const matched = rawMatchedTaxonomy || GBP_TAXONOMY_MAP.find((c) => c.namePattern.test(cleanRaw))
    return {
      primaryCategory: matched ? matched.primary : cleanRaw,
      additionalCategories: matched
        ? matched.secondary.filter((s) => s.toLowerCase() !== cleanRaw.toLowerCase())
        : ['Local business', 'Commercial service'],
      confidenceScore: 0.95,
      rawGoogleCategory: cleanRaw,
      isMismatchDetected: false,
    }
  }

  // 5. Fallback from name match
  if (nameMatchedTaxonomy) {
    return {
      primaryCategory: nameMatchedTaxonomy.primary,
      additionalCategories: nameMatchedTaxonomy.secondary,
      confidenceScore: 0.92,
      rawGoogleCategory: undefined,
      isMismatchDetected: false,
    }
  }

  return {
    primaryCategory: 'Local Business',
    additionalCategories: ['Commercial Service', 'Professional Services'],
    confidenceScore: 0.75,
    rawGoogleCategory: undefined,
    isMismatchDetected: false,
  }
}
