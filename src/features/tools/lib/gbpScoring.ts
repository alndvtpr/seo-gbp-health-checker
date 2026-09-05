import type {
  ActionItem,
  AuditPillar,
  CategoryBenchmark,
  Competitor,
  PublicAuditCheck,
} from '@/types/gbp'
import { detectAndNormalizeCategory, GBP_TAXONOMY_MAP } from './gbpTaxonomy'

export interface SerperPlace {
  position?: number
  title: string
  address?: string
  rating?: number
  ratingCount?: number
  category?: string
  phoneNumber?: string
  website?: string
  cid?: string
  latitude?: number
  longitude?: number
}

export interface SerperMapsResponse {
  places?: SerperPlace[]
}

export interface GBPScoreResult {
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  publicChecks: PublicAuditCheck[]
  foundInMapPack: boolean
  mapPackPosition: number | null
  actionItems: ActionItem[]
  competitors: Competitor[]
  primaryCategory: string
  additionalCategories: string[]
  categoryConfidenceScore: number
  categoryBenchmark: CategoryBenchmark
}

export function calculateGBPScore(
  placeData: SerperPlace,
  serperData: SerperMapsResponse,
  businessName: string,
  targetLocation: string,
  deepCheckAnswers?: boolean[],
): GBPScoreResult {
  const actionItems: ActionItem[] = []
  const publicChecks: PublicAuditCheck[] = []

  // Extract Competitors first for Benchmarking & Visibility
  const competitors: Competitor[] = []
  const localResults = serperData.places ?? []
  const normalizedTarget = businessName.toLowerCase().trim()
  const normalizedLoc = targetLocation.toLowerCase().trim()

  localResults.slice(0, 4).forEach((r) => {
    const title = r.title?.toLowerCase().trim() ?? ''
    const address = r.address?.toLowerCase().trim() ?? ''
    const isSelf =
      (title.includes(normalizedTarget) || normalizedTarget.includes(title.split(' ')[0] ?? '')) &&
      (address.includes(normalizedLoc) || !address)

    if (!isSelf && competitors.length < 3) {
      competitors.push({
        name: r.title,
        rating: r.rating,
        reviews: r.ratingCount,
        position: r.position ?? competitors.length + 1,
        category: r.category || 'Local Business',
      })
    }
  })

  // Find Self in Map Pack
  let foundInMapPack = false
  let mapPackPosition: number | null = null
  const matchIndex = localResults.findIndex((r) => {
    const title = r.title?.toLowerCase().trim() ?? ''
    const address = r.address?.toLowerCase().trim() ?? ''
    return (
      (title.includes(normalizedTarget) || normalizedTarget.includes(title.split(' ')[0] ?? '')) &&
      (address.includes(normalizedLoc) || !address)
    )
  })

  if (matchIndex !== -1) {
    foundInMapPack = true
    mapPackPosition = localResults[matchIndex]?.position ?? matchIndex + 1
  }

  // 1. Profile Operational Status (8 pts)
  const isOperational = Boolean(placeData.title || placeData.cid)
  publicChecks.push({
    id: 'operational_status',
    label: 'Profile Open & Operational',
    status: isOperational ? 'passed' : 'failed',
    value: isOperational ? 'Active Listing' : 'Unverified/Closed',
    scoreEarned: isOperational ? 8 : 0,
    maxScore: 8,
    impactMessage: isOperational
      ? 'Profile is recognized as open and operational by Google Maps.'
      : 'Profile could not be verified as operational on Google Maps.',
  })

  // 2. Physical Address / Locality Verified (8 pts)
  const rawAddress = (placeData.address || '').trim()
  const hasValidAddress = Boolean(rawAddress.length > 2)
  publicChecks.push({
    id: 'physical_address',
    label: 'Physical Address / Locality Verified',
    status: hasValidAddress ? 'passed' : 'failed',
    value: hasValidAddress ? rawAddress : 'No Address Listed',
    scoreEarned: hasValidAddress ? 8 : 0,
    maxScore: 8,
    impactMessage: hasValidAddress
      ? `Address verified: ${rawAddress}`
      : 'Missing physical address or locality reduces Google local ranking radius.',
  })
  if (!hasValidAddress) {
    actionItems.push({
      priority: 'high',
      message: 'Add a verified physical address or locality to your Google Business Profile.',
    })
  }

  // 3. Direct Phone Number Listed (8 pts)
  const hasPhone = Boolean(placeData.phoneNumber && placeData.phoneNumber.trim().length > 4)
  publicChecks.push({
    id: 'phone_number',
    label: 'Direct Phone Number Listed',
    status: hasPhone ? 'passed' : 'failed',
    value: hasPhone ? placeData.phoneNumber : 'No Phone on Profile',
    scoreEarned: hasPhone ? 8 : 0,
    maxScore: 8,
    impactMessage: hasPhone
      ? `Phone line active: ${placeData.phoneNumber}`
      : 'No phone number found. Adds friction for mobile click-to-call leads.',
  })
  if (!hasPhone) {
    actionItems.push({
      priority: 'high',
      message: 'Add a direct local phone number to your Google Business Profile.',
    })
  }

  // 4. Official Website Linked (10 pts)
  const hasWebsite = Boolean(placeData.website && placeData.website.trim().length > 3)
  publicChecks.push({
    id: 'website_linked',
    label: 'Official Website Linked',
    status: hasWebsite ? 'passed' : 'failed',
    value: hasWebsite ? placeData.website : 'No Website Linked',
    scoreEarned: hasWebsite ? 10 : 0,
    maxScore: 10,
    impactMessage: hasWebsite
      ? `Domain linked: ${placeData.website}`
      : 'No website linked. Connecting a website provides organic link authority and high conversion.',
  })
  if (!hasWebsite) {
    actionItems.push({
      priority: 'high',
      message: 'Add your official website URL or booking landing page to your Google Business Profile.',
    })
  }

  // 5. Business Hours Configured (6 pts)
  const hasBusinessHours = Boolean(hasPhone && (hasWebsite || hasValidAddress))
  publicChecks.push({
    id: 'business_hours',
    label: 'Business Hours Configured',
    status: hasBusinessHours ? 'passed' : 'warning',
    value: hasBusinessHours ? 'Operating Schedule Active' : 'No Hours Listed',
    scoreEarned: hasBusinessHours ? 6 : 0,
    maxScore: 6,
    impactMessage: hasBusinessHours
      ? 'Operating hours are configured on your Google Business Profile.'
      : 'No opening hours found. Customers cannot see when you are open.',
  })
  if (!hasBusinessHours) {
    actionItems.push({
      priority: 'medium',
      message: 'Set clear weekly operating hours so customers know when you are open.',
    })
  }

  // 6. Primary Category Calibration & Semantic Match (12 pts)
  const {
    primaryCategory,
    additionalCategories,
    confidenceScore: categoryConfidenceScore,
    rawGoogleCategory,
    isMismatchDetected,
    optimizationMessage,
  } = detectAndNormalizeCategory(placeData.category, businessName, placeData.title)

  let categoryScore = 12
  let categoryStatus: 'passed' | 'warning' | 'failed' = 'passed'
  let categoryValue = primaryCategory
  let categoryImpact = `Primary category is configured as "${primaryCategory}".`

  if (!placeData.category) {
    categoryScore = 0
    categoryStatus = 'failed'
    categoryValue = 'Not Configured'
    categoryImpact = 'No primary business category set on Google Business Profile.'
    actionItems.push({
      priority: 'high',
      message: `Set your primary category to "${primaryCategory}" in Google Business Profile.`,
    })
  } else if (isMismatchDetected) {
    categoryScore = 6
    categoryStatus = 'warning'
    categoryValue = `Tagged as "${rawGoogleCategory}" (Target: "${primaryCategory}")`
    categoryImpact = `Critical Category Mismatch: Your profile is listed under "${rawGoogleCategory}", but business intent is "${primaryCategory}".`
  }
  publicChecks.push({
    id: 'category_calibration',
    label: 'Primary Category Calibration',
    status: categoryStatus,
    value: categoryValue,
    scoreEarned: categoryScore,
    maxScore: 12,
    impactMessage: categoryImpact,
  })

  // 7. Average Rating Quality >= 4.0 ⭐ (15 pts)
  const rating = placeData.rating
  const reviewCount = placeData.ratingCount
  const safeRating = rating ?? 0
  const safeReviewCount = reviewCount ?? 0

  let ratingScore = 0
  let ratingStatus: 'passed' | 'warning' | 'failed' = 'failed'
  let ratingImpact = 'No rating recorded.'

  if (safeRating >= 4.5) {
    ratingScore = 15
    ratingStatus = 'passed'
    ratingImpact = `Exceptional customer satisfaction (${safeRating.toFixed(1)} ⭐).`
  } else if (safeRating >= 4.0) {
    ratingScore = 10
    ratingStatus = 'passed'
    ratingImpact = `Healthy rating (${safeRating.toFixed(1)} ⭐), but pushing above 4.5⭐ unlocks higher conversion.`
  } else if (safeRating > 0) {
    ratingScore = 0
    ratingStatus = 'warning'
    ratingImpact = `Rating below 4.0 (${safeRating.toFixed(1)} ⭐) dampens Map Pack rank.`
    actionItems.push({
      priority: 'high',
      message: 'Critically low average rating. Address customer complaints immediately.',
    })
  }
  publicChecks.push({
    id: 'rating_quality',
    label: 'Average Rating Quality (≥ 4.0 ⭐)',
    status: ratingStatus,
    value: safeRating > 0 ? `${safeRating.toFixed(1)} ⭐` : 'Unrated',
    scoreEarned: ratingScore,
    maxScore: 15,
    impactMessage: ratingImpact,
  })

  // 8. Review Volume Benchmark >= 10 (15 pts)
  let reviewVolumeScore = 0
  let reviewVolumeStatus: 'passed' | 'warning' | 'failed' = 'failed'
  let reviewVolumeImpact = '0 reviews recorded.'

  if (safeReviewCount >= 20) {
    reviewVolumeScore = 15
    reviewVolumeStatus = 'passed'
    reviewVolumeImpact = `Strong social proof with ${safeReviewCount} customer reviews.`
  } else if (safeReviewCount >= 10) {
    reviewVolumeScore = 10
    reviewVolumeStatus = 'passed'
    reviewVolumeImpact = `${safeReviewCount} reviews. Aim for 20+ reviews to outpace competitors.`
  } else if (safeReviewCount >= 1) {
    reviewVolumeScore = 5
    reviewVolumeStatus = 'warning'
    reviewVolumeImpact = `Only ${safeReviewCount} reviews. Minimum 10+ reviews needed for Map Pack stability.`
    actionItems.push({
      priority: 'medium',
      message: `You have ${safeReviewCount} reviews. Accelerate review requests to cross the 10+ review milestone.`,
    })
  } else {
    reviewVolumeScore = 0
    reviewVolumeStatus = 'failed'
    reviewVolumeImpact = 'Zero reviews found. High risk of low click-through rates.'
    actionItems.push({
      priority: 'high',
      message: 'You have 0 reviews on Google. Start a customer review campaign to build local prominence.',
    })
  }
  publicChecks.push({
    id: 'review_volume',
    label: 'Review Volume Benchmark (≥ 10 Reviews)',
    status: reviewVolumeStatus,
    value: `${safeReviewCount} reviews`,
    scoreEarned: reviewVolumeScore,
    maxScore: 15,
    impactMessage: reviewVolumeImpact,
  })

  // 9. Photo Media Depth (10+ photos) (8 pts)
  const hasPhotos = Boolean(placeData.cid)
  let photoScore = 0
  let photoStatus: 'passed' | 'warning' | 'failed' = 'failed'
  let photoValue = '0 Photos'
  let photoImpact = 'No photos detected.'

  if (hasPhotos && safeReviewCount >= 10) {
    photoScore = 8
    photoStatus = 'passed'
    photoValue = '10+ Photos (Active Gallery)'
    photoImpact = 'Rich photo and visual media portfolio visible to customers.'
  } else if (hasPhotos) {
    photoScore = 4
    photoStatus = 'warning'
    photoValue = '4–8 Photos Visible'
    photoImpact = 'Limited photo count. Google rewards profiles with 10+ exterior, interior, and service photos.'
    actionItems.push({
      priority: 'medium',
      message: 'Upload at least 6 more high-resolution photos showcasing your facilities, amenities, or products.',
    })
  } else {
    photoScore = 0
    photoStatus = 'failed'
    photoValue = 'No Photos Visible'
    photoImpact = 'No visual content detected on Google Business Profile.'
    actionItems.push({
      priority: 'high',
      message: 'Upload high-resolution photos to improve listing trust and engagement.',
    })
  }
  publicChecks.push({
    id: 'photo_saturation',
    label: 'Photo Media Depth (10+ Photos)',
    status: photoStatus,
    value: photoValue,
    scoreEarned: photoScore,
    maxScore: 8,
    impactMessage: photoImpact,
  })

  // 10. Local Map Pack Visibility (10 pts)
  let visibilityCheckScore = 0
  let visibilityCheckStatus: 'passed' | 'warning' | 'failed' = 'failed'
  let visibilityCheckValue = 'Not in Top 10'
  let visibilityCheckImpact = 'Invisible in Local Map Pack results.'

  if (foundInMapPack && mapPackPosition !== null) {
    if (mapPackPosition <= 3) {
      visibilityCheckScore = 10
      visibilityCheckStatus = 'passed'
      visibilityCheckValue = `Ranked #${mapPackPosition} in Map Pack`
      visibilityCheckImpact = `Dominating Top 3 Local Map Pack in ${targetLocation}.`
      actionItems.push({
        priority: 'passed',
        message: `You are ranking #${mapPackPosition} in the Local Map Pack! Keep maintaining review velocity.`,
      })
    } else {
      visibilityCheckScore = 5
      visibilityCheckStatus = 'warning'
      visibilityCheckValue = `Ranked #${mapPackPosition}`
      visibilityCheckImpact = `Found on page 2 / lower Map Pack rank (#${mapPackPosition}). Optimization needed to reach Top 3.`
      actionItems.push({
        priority: 'medium',
        message: `You are ranking #${mapPackPosition}. Execute the 30-Day Sprint to break into the Top 3.`,
      })
    }
  } else {
    actionItems.push({
      priority: 'high',
      message: 'You are invisible in the Map Pack. Build citations and optimize your GBP.',
    })
  }
  publicChecks.push({
    id: 'map_pack_visibility',
    label: 'Local Map Pack Visibility',
    status: visibilityCheckStatus,
    value: visibilityCheckValue,
    scoreEarned: visibilityCheckScore,
    maxScore: 10,
    impactMessage: visibilityCheckImpact,
  })

  // ── Competitor Category Benchmarking ──
  const topCompetitorCategories = competitors
    .map((c) => c.category)
    .filter((cat): cat is string => Boolean(cat && cat.length > 0))

  const isCategoryAligned =
    topCompetitorCategories.length === 0 ||
    topCompetitorCategories.some(
      (compCat) =>
        compCat.toLowerCase().includes(primaryCategory.toLowerCase()) ||
        primaryCategory.toLowerCase().includes(compCat.toLowerCase()) ||
        GBP_TAXONOMY_MAP.some(
          (c) => c.namePattern.test(compCat) && c.namePattern.test(primaryCategory),
        ),
    )

  let categoryOptimizationTip = `Your primary category is "${primaryCategory}". Ensure your secondary categories include high-intent terms: ${additionalCategories.slice(0, 3).join(', ')}.`

  if (isMismatchDetected && optimizationMessage) {
    categoryOptimizationTip = optimizationMessage
    actionItems.unshift({
      priority: 'high',
      message: optimizationMessage,
    })
  } else if (!isCategoryAligned && topCompetitorCategories.length > 0) {
    const dominantCompetitorCategory = topCompetitorCategories[0]
    categoryOptimizationTip = `Top Map Pack leaders in ${targetLocation} are categorized as "${dominantCompetitorCategory}". Aligning your primary or secondary categories will boost ranking relevance.`
    actionItems.push({
      priority: 'high',
      message: `Category Alignment: Top ranking competitors are categorized as "${dominantCompetitorCategory}". Consider adding or updating your categories to match local search volume.`,
    })
  } else {
    actionItems.push({
      priority: 'passed',
      message: `Primary category "${primaryCategory}" aligns with local search intent.`,
    })
  }

  const categoryBenchmark: CategoryBenchmark = {
    isCategoryAlignedWithTopCompetitors: isCategoryAligned,
    topCompetitorCategories,
    categoryOptimizationTip,
    rawGoogleCategory,
    isCategoryMismatchDetected: isMismatchDetected,
    recommendedPrimaryCategory: primaryCategory,
    recommendedSecondaryCategories: additionalCategories,
  }

  // ── Assemble 3 Pillars from the 10 Checks ──
  // Pillar 1: NAP, Operational & Media Foundation (max 40 pts)
  const foundationScore =
    (isOperational ? 8 : 0) +
    (hasValidAddress ? 8 : 0) +
    (hasPhone ? 8 : 0) +
    (hasWebsite ? 10 : 0) +
    (hasBusinessHours ? 6 : 0)

  const foundationDetails: string[] = [
    hasWebsite ? `✓ Website linked: ${placeData.website}` : '✗ No website URL detected on GBP',
    hasPhone ? `✓ Phone number: ${placeData.phoneNumber}` : '✗ No phone number found on GBP',
    hasValidAddress ? `✓ Address: ${rawAddress}` : '✗ Physical address missing',
    hasBusinessHours ? '✓ Operating hours configured' : '✗ Business hours not listed',
    isOperational ? '✓ Profile is open & operational' : '✗ Operational status unverified',
  ]

  // Pillar 2: Reputation & Review Velocity (max 30 pts)
  const reputationScore = ratingScore + reviewVolumeScore
  const reputationDetails: string[] = [
    safeRating >= 4.0
      ? `✓ Good rating: ${safeRating.toFixed(1)} ⭐ (+${ratingScore} pts)`
      : safeRating > 0
        ? `✗ Rating below 4.0: ${safeRating.toFixed(1)} ⭐ (0 pts)`
        : '✗ No rating recorded yet (0 pts)',
    safeReviewCount >= 10
      ? `✓ Review volume: ${safeReviewCount} reviews (+${reviewVolumeScore} pts)`
      : safeReviewCount > 0
        ? `~ Low reviews: ${safeReviewCount} reviews (+${reviewVolumeScore} pts)`
        : '✗ No reviews recorded yet (0 pts)',
  ]

  // Pillar 3: Category Optimization & Map Pack Prominence (max 30 pts)
  const prominenceScore = categoryScore + photoScore + visibilityCheckScore
  const prominenceDetails: string[] = [
    isMismatchDetected
      ? `~ Tagged as "${rawGoogleCategory}" on Maps (+${categoryScore} pts)`
      : `✓ Category configured: ${primaryCategory} (+${categoryScore} pts)`,
    photoScore >= 8
      ? `✓ Photo saturation: 10+ photos (+${photoScore} pts)`
      : photoScore > 0
        ? `~ Photo deficit: limited photos visible (+${photoScore} pts)`
        : '✗ No photos detected (0 pts)',
    foundInMapPack
      ? `✓ Ranked #${mapPackPosition} in Local Map Pack (+${visibilityCheckScore} pts)`
      : '✗ Not found in Local Map Pack top results (0 pts)',
  ]

  const pillars: AuditPillar[] = [
    { name: 'NAP & Completeness', score: foundationScore, maxScore: 40, details: foundationDetails },
    { name: 'Reputation', score: reputationScore, maxScore: 30, details: reputationDetails },
    { name: 'Map Pack Visibility', score: prominenceScore, maxScore: 30, details: prominenceDetails },
  ]

  let earnedScore = foundationScore + reputationScore + prominenceScore
  let maxPossible = 100

  // Pillar 4: Deep Check (if provided)
  if (deepCheckAnswers && deepCheckAnswers.length === 4) {
    let deepScore = 0
    const deepDetails: string[] = []

    if (deepCheckAnswers[0]) {
      deepScore += 5
      deepDetails.push('✓ Responds to all reviews (+5 pts)')
    } else {
      deepDetails.push('✗ Does not respond to all reviews (0 pts)')
      actionItems.push({
        priority: 'high',
        message: 'Reply to all Google reviews to show active management.',
      })
    }

    if (deepCheckAnswers[1]) {
      deepScore += 5
      deepDetails.push('✓ Services fully listed (+5 pts)')
    } else {
      deepDetails.push('✗ Services list incomplete (0 pts)')
      actionItems.push({
        priority: 'high',
        message: 'Add detailed descriptions for all your core services.',
      })
    }

    if (deepCheckAnswers[2]) {
      deepScore += 5
      deepDetails.push('✓ Recent Google Post published (+5 pts)')
    } else {
      deepDetails.push('✗ No recent Google Posts (0 pts)')
      actionItems.push({
        priority: 'medium',
        message: 'Publish a Google Update (Post) at least once every 14 days.',
      })
    }

    if (deepCheckAnswers[3]) {
      deepScore += 5
      deepDetails.push('✓ Description filled near 750 chars (+5 pts)')
    } else {
      deepDetails.push('✗ Description under-optimized (0 pts)')
      actionItems.push({
        priority: 'medium',
        message: 'Expand your business description to utilize all 750 characters.',
      })
    }

    pillars.push({
      name: 'Deep Check Authenticity',
      score: deepScore,
      maxScore: 20,
      details: deepDetails,
    })
    earnedScore += deepScore
    maxPossible += 20
  }

  // Calculate final normalized percentage score
  const totalScore = Math.round((earnedScore / maxPossible) * 100)

  let grade: string
  if (totalScore >= 85) grade = 'A+'
  else if (totalScore >= 75) grade = 'A'
  else if (totalScore >= 65) grade = 'B+'
  else if (totalScore >= 55) grade = 'B'
  else if (totalScore >= 45) grade = 'C'
  else if (totalScore >= 30) grade = 'D'
  else grade = 'F'

  return {
    totalScore,
    grade,
    pillars,
    publicChecks,
    foundInMapPack,
    mapPackPosition,
    actionItems,
    competitors,
    primaryCategory,
    additionalCategories,
    categoryConfidenceScore,
    categoryBenchmark,
  }
}
