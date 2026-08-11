import { NextRequest, NextResponse } from 'next/server'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuditPillar {
  name: string
  score: number
  maxScore: number
  details: string[]
}

interface GBPAuditResponse {
  success: boolean
  businessName: string
  location: string
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  placeId: string | null
  foundInMapPack: boolean
  mapPackPosition: number | null
  error?: string
}

// Google Places API – Place Details field shape (subset we care about)
interface PlaceDetails {
  id?: string
  displayName?: { text: string }
  formattedAddress?: string
  nationalPhoneNumber?: string
  internationalPhoneNumber?: string
  websiteUri?: string
  rating?: number
  userRatingCount?: number
  currentOpeningHours?: { weekdayDescriptions?: string[] }
  regularOpeningHours?: { weekdayDescriptions?: string[] }
  businessStatus?: string
  primaryType?: string
  location?: { latitude: number; longitude: number }
  addressComponents?: Array<{ longText: string; shortText: string; types: string[] }>
}

// Serper Maps API – local result shape
interface SerperLocalResult {
  title: string
  address?: string
  rating?: number
  reviews?: number
  position?: number
}

interface SerperMapsResponse {
  localResults?: SerperLocalResult[]
}

// ─── Scoring Engine ──────────────────────────────────────────────────────────

/**
 * Calculates a 100-point GBP audit score across three pillars:
 * - NAP & Completeness (40 pts)
 * - Reputation (30 pts)
 * - Map Pack Visibility (30 pts)
 */
function calculateGBPScore(
  placeData: PlaceDetails,
  serperData: SerperMapsResponse,
  businessName: string,
): {
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  foundInMapPack: boolean
  mapPackPosition: number | null
} {
  // ── Pillar 1: NAP & Completeness (max 40) ─────────────────────────────
  let completenessScore = 0
  const completenessDetails: string[] = []

  const hasWebsite = Boolean(placeData.websiteUri)
  if (hasWebsite) {
    completenessScore += 10
    completenessDetails.push(`✓ Website linked: ${placeData.websiteUri}`)
  } else {
    completenessDetails.push('✗ No website URL detected on GBP')
  }

  const hasPhone = Boolean(placeData.nationalPhoneNumber || placeData.internationalPhoneNumber)
  if (hasPhone) {
    completenessScore += 10
    completenessDetails.push(
      `✓ Phone number: ${placeData.nationalPhoneNumber ?? placeData.internationalPhoneNumber}`,
    )
  } else {
    completenessDetails.push('✗ No phone number found on GBP')
  }

  const hasHours = Boolean(
    placeData.regularOpeningHours?.weekdayDescriptions?.length ||
      placeData.currentOpeningHours?.weekdayDescriptions?.length,
  )
  if (hasHours) {
    completenessScore += 10
    completenessDetails.push('✓ Business hours are set')
  } else {
    completenessDetails.push('✗ Business hours not configured')
  }

  const hasAddress = Boolean(placeData.formattedAddress && placeData.location)
  if (hasAddress) {
    completenessScore += 10
    completenessDetails.push(`✓ Address: ${placeData.formattedAddress}`)
  } else {
    completenessDetails.push('✗ Address or coordinates missing')
  }

  // ── Pillar 2: Reputation (max 30) ─────────────────────────────────────
  let reputationScore = 0
  const reputationDetails: string[] = []

  const rating = placeData.rating ?? 0
  const reviewCount = placeData.userRatingCount ?? 0

  if (rating >= 4.5) {
    reputationScore += 15
    reputationDetails.push(`✓ Excellent rating: ${rating.toFixed(1)} ⭐ (+15 pts)`)
  } else if (rating >= 4.0) {
    reputationScore += 10
    reputationDetails.push(`~ Good rating: ${rating.toFixed(1)} ⭐ (+10 pts)`)
  } else {
    reputationDetails.push(`✗ Rating below 4.0: ${rating.toFixed(1)} ⭐ (0 pts)`)
  }

  if (reviewCount >= 20) {
    reputationScore += 15
    reputationDetails.push(`✓ Strong review count: ${reviewCount} reviews (+15 pts)`)
  } else if (reviewCount >= 1) {
    reputationScore += 10
    reputationDetails.push(`~ Moderate reviews: ${reviewCount} reviews (+10 pts)`)
  } else {
    reputationDetails.push('✗ No reviews found (0 pts)')
  }

  // ── Pillar 3: Map Pack Visibility (max 30) ────────────────────────────
  let visibilityScore = 0
  const visibilityDetails: string[] = []
  let foundInMapPack = false
  let mapPackPosition: number | null = null

  const localResults = serperData.localResults ?? []
  const normalizedTarget = businessName.toLowerCase().trim()

  // Find the business in Serper results (fuzzy match on title)
  const matchIndex = localResults.findIndex((r) => {
    const title = r.title?.toLowerCase().trim() ?? ''
    return title.includes(normalizedTarget) || normalizedTarget.includes(title.split(' ')[0] ?? '')
  })

  if (matchIndex !== -1) {
    foundInMapPack = true
    mapPackPosition = localResults[matchIndex]?.position ?? matchIndex + 1

    if (mapPackPosition <= 3) {
      visibilityScore = 30
      visibilityDetails.push(`✓ Ranked #${mapPackPosition} in the Local Map Pack (+30 pts)`)
    } else {
      visibilityScore = 15
      visibilityDetails.push(`~ Found in Map Pack position #${mapPackPosition} (+15 pts)`)
    }
  } else {
    visibilityDetails.push('✗ Not found in Local Pack top 10 results (0 pts)')
  }

  // ── Assemble ──────────────────────────────────────────────────────────
  const totalScore = completenessScore + reputationScore + visibilityScore

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
    pillars: [
      { name: 'NAP & Completeness', score: completenessScore, maxScore: 40, details: completenessDetails },
      { name: 'Reputation', score: reputationScore, maxScore: 30, details: reputationDetails },
      { name: 'Map Pack Visibility', score: visibilityScore, maxScore: 30, details: visibilityDetails },
    ],
    foundInMapPack,
    mapPackPosition,
  }
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export const runtime = 'nodejs'

/**
 * POST /api/gbp-audit
 *
 * Body: { businessName: string; targetLocation: string }
 *
 * Integrations:
 *   1. Google Places API (Text Search + Place Details)
 *   2. Serper.dev Google Maps API
 *
 * Returns: GBPAuditResponse
 */
export async function POST(req: NextRequest): Promise<NextResponse<GBPAuditResponse>> {
  // ── 0. Parse & validate request body ──────────────────────────────────
  let businessName: string
  let targetLocation: string

  try {
    const body = await req.json()
    businessName = String(body.businessName ?? '').trim()
    targetLocation = String(body.targetLocation ?? '').trim()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body', businessName: '', location: '', totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
      { status: 400 },
    )
  }

  if (!businessName || !targetLocation) {
    return NextResponse.json(
      { success: false, error: 'Both businessName and targetLocation are required.', businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
      { status: 400 },
    )
  }

  // ── 1. Read API keys from environment ─────────────────────────────────
  const googleApiKey = process.env.GOOGLE_PLACES_API_KEY
  const serperApiKey = process.env.SERPER_API_KEY

  const isDemoMode =
    !googleApiKey ||
    !serperApiKey ||
    googleApiKey.includes('your-google') ||
    serperApiKey.includes('your-serper')

  if (isDemoMode) {
    // Generate a realistic demo score based on business name string length to feel dynamic
    const hash = businessName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const isHighPerformer = hash % 2 === 0

    const mockWebsite = `https://www.${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    const mockPhone = '+63 917 123 4567'
    const rating = isHighPerformer ? 4.7 : 4.2
    const reviewCount = isHighPerformer ? 84 : 14
    const mapPackPosition = isHighPerformer ? 2 : 5

    const placeData: PlaceDetails = {
      displayName: { text: businessName },
      formattedAddress: `123 Main St, ${targetLocation}, Philippines`,
      nationalPhoneNumber: mockPhone,
      websiteUri: mockWebsite,
      rating,
      userRatingCount: reviewCount,
      regularOpeningHours: { weekdayDescriptions: ['Monday: 8:00 AM – 8:00 PM'] },
      location: { latitude: 14.5995, longitude: 120.9842 },
      primaryType: 'Local Business',
    }

    const serperData: SerperMapsResponse = {
      localResults: [
        { title: `${businessName} ${targetLocation}`, position: mapPackPosition },
      ],
    }

    const { totalScore, grade, pillars, foundInMapPack } = calculateGBPScore(
      placeData,
      serperData,
      businessName,
    )

    // Add a note in details indicating Demo Mode
    pillars[0]?.details.unshift('ℹ Demo Mode: Real API keys not set in .env')

    return NextResponse.json({
      success: true,
      businessName,
      location: targetLocation,
      totalScore,
      grade,
      pillars,
      placeId: 'demo-place-id-12345',
      foundInMapPack,
      mapPackPosition,
    })
  }

  // ── 2. Google Places – Text Search (New) ──────────────────────────────
  let placeData: PlaceDetails = {}
  let resolvedPlaceId: string | null = null
  let resolvedDisplayName = businessName

  try {
    const textSearchUrl = 'https://places.googleapis.com/v1/places:searchText'
    const textSearchBody = {
      textQuery: `${businessName} in ${targetLocation}`,
      maxResultCount: 1,
    }

    const textSearchRes = await fetch(textSearchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': googleApiKey,
        // Request specific fields to minimise billing cost
        'X-Goog-FieldMask': 'places.id,places.displayName,places.primaryType',
      },
      body: JSON.stringify(textSearchBody),
    })

    if (!textSearchRes.ok) {
      const errText = await textSearchRes.text()
      throw new Error(`Google Places Text Search failed (${textSearchRes.status}): ${errText}`)
    }

    const textSearchData = await textSearchRes.json()
    const firstPlace = textSearchData.places?.[0]

    if (!firstPlace?.id) {
      return NextResponse.json(
        { success: false, error: `Could not find "${businessName}" in "${targetLocation}" on Google Maps. Please verify the exact business name.`, businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
        { status: 404 },
      )
    }

    resolvedPlaceId = firstPlace.id as string
    resolvedDisplayName = firstPlace.displayName?.text ?? businessName

    // ── 3. Google Places – Place Details (New) ─────────────────────────
    const detailsUrl = `https://places.googleapis.com/v1/places/${resolvedPlaceId}`
    const detailsRes = await fetch(detailsUrl, {
      headers: {
        'X-Goog-Api-Key': googleApiKey,
        'X-Goog-FieldMask': [
          'id',
          'displayName',
          'formattedAddress',
          'nationalPhoneNumber',
          'internationalPhoneNumber',
          'websiteUri',
          'rating',
          'userRatingCount',
          'regularOpeningHours',
          'currentOpeningHours',
          'businessStatus',
          'primaryType',
          'location',
          'addressComponents',
        ].join(','),
      },
    })

    if (!detailsRes.ok) {
      const errText = await detailsRes.text()
      throw new Error(`Google Places Details failed (${detailsRes.status}): ${errText}`)
    }

    placeData = (await detailsRes.json()) as PlaceDetails
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[GBP Audit] Google Places error:', msg)
    return NextResponse.json(
      { success: false, error: `Google Places API error: ${msg}`, businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
      { status: 502 },
    )
  }

  // ── 4. Serper – Google Maps local results ─────────────────────────────
  let serperData: SerperMapsResponse = {}

  try {
    const primaryType = placeData.primaryType ?? businessName
    const serperQuery = `${primaryType} in ${targetLocation}`

    const serperRes = await fetch('https://google.serper.dev/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': serperApiKey,
      },
      body: JSON.stringify({ q: serperQuery, gl: 'ph', hl: 'en', num: 10 }),
    })

    if (!serperRes.ok) {
      // Non-fatal: we can still return a partial score without visibility data
      console.warn('[GBP Audit] Serper API returned non-OK:', serperRes.status)
    } else {
      serperData = (await serperRes.json()) as SerperMapsResponse
    }
  } catch (err: unknown) {
    // Non-fatal: log and continue with empty serperData
    console.warn('[GBP Audit] Serper API error (non-fatal):', err)
  }

  // ── 5. Score calculation ───────────────────────────────────────────────
  const { totalScore, grade, pillars, foundInMapPack, mapPackPosition } = calculateGBPScore(
    placeData,
    serperData,
    resolvedDisplayName,
  )

  // ── 6. Return response ─────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    businessName: resolvedDisplayName,
    location: targetLocation,
    totalScore,
    grade,
    pillars,
    placeId: resolvedPlaceId,
    foundInMapPack,
    mapPackPosition,
  })
}
