import { NextRequest, NextResponse } from 'next/server'
import type { GBPAuditResponse, WebsiteSeo } from '@/types/gbp'
import {
  calculateGBPScore,
  type SerperMapsResponse,
  type SerperPlace,
} from '@/features/tools/lib/gbpScoring'
import { scrapeWebsite } from '@/features/tools/lib/gbpScraper'
import {
  generateAiRecommendations,
  generateHighIntentKeywords,
  generateLocalSeoActionPlan,
  generateOptimizedBusinessDescription,
  generateReviewResponseTemplates,
} from '@/features/tools/lib/gbpAiPlan'

export const runtime = 'nodejs'

// Basic In-Memory Store for Caching & Rate Limiting
const cacheStore = new Map<string, { timestamp: number; data: GBPAuditResponse }>()
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_WINDOW = 20

/**
 * POST /api/gbp-audit
 *
 * Body: { businessName: string; targetLocation: string; deepCheckAnswers?: boolean[] }
 *
 * Integrations:
 *   1. Serper.dev Google Maps Places API (Replaces Google Places API completely)
 *   2. Google Gemini API (with Local SEO Intelligence Engine fallback)
 *
 * Returns: GBPAuditResponse
 */
export async function POST(req: NextRequest): Promise<NextResponse<GBPAuditResponse>> {
  // ── 0. Parse & validate request body ──────────────────────────────────
  let businessName: string
  let targetLocation: string
  let deepCheckAnswers: boolean[] | undefined

  try {
    const body = await req.json()
    businessName = String(body.businessName ?? '').trim().slice(0, 100)
    targetLocation = String(body.targetLocation ?? '').trim().slice(0, 100)
    if (Array.isArray(body.deepCheckAnswers)) {
      deepCheckAnswers = body.deepCheckAnswers.map(Boolean)
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON body',
        businessName: '',
        location: '',
        totalScore: 0,
        grade: 'F',
        pillars: [],
        placeId: null,
        foundInMapPack: false,
        mapPackPosition: null,
      },
      { status: 400 },
    )
  }

  if (!businessName || !targetLocation) {
    return NextResponse.json(
      {
        success: false,
        error: 'Both businessName and targetLocation are required.',
        businessName,
        location: targetLocation,
        totalScore: 0,
        grade: 'F',
        pillars: [],
        placeId: null,
        foundInMapPack: false,
        mapPackPosition: null,
      },
      { status: 400 },
    )
  }

  // ── 0.1 Rate Limiting (IP-based) ──────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous'
  const now = Date.now()
  const rateLimitRecord = rateLimitStore.get(ip)

  if (rateLimitRecord) {
    if (now > rateLimitRecord.resetAt) {
      // Reset window
      rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    } else if (rateLimitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          businessName,
          location: targetLocation,
          totalScore: 0,
          grade: 'F',
          pillars: [],
          placeId: null,
          foundInMapPack: false,
          mapPackPosition: null,
        },
        { status: 429 },
      )
    } else {
      rateLimitRecord.count += 1
    }
  } else {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  }

  // ── 0.2 Caching (Skip cache if requesting deep check score calculation)
  const cacheKey = `${businessName.toLowerCase()}|${targetLocation.toLowerCase()}`
  const cachedData = cacheStore.get(cacheKey)

  if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS && !deepCheckAnswers) {
    return NextResponse.json(cachedData.data)
  }

  // ── 1. Read API key from environment ─────────────────────────────────
  const serperApiKey = process.env.SERPER_API_KEY

  const isDemoMode = !serperApiKey || serperApiKey.includes('your-serper')

  if (isDemoMode) {
    // Generate a realistic demo score based on business name string length to feel dynamic
    const hash = businessName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const isHighPerformer = hash % 2 === 0

    const mockWebsite = `https://www.${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    const mockPhone = '+63 917 123 4567'
    const rating = isHighPerformer ? 4.7 : 4.2
    const reviewCount = isHighPerformer ? 84 : 14
    const mockMapPackPosition = isHighPerformer ? 2 : 5

    const placeData: SerperPlace = {
      title: businessName,
      address: `123 Main St, ${targetLocation}, Philippines`,
      phoneNumber: mockPhone,
      website: mockWebsite,
      rating,
      ratingCount: reviewCount,
      category: 'Local Business',
      cid: 'demo-cid-12345',
      latitude: 14.5995,
      longitude: 120.9842,
    }

    const serperData: SerperMapsResponse = {
      places: [
        {
          title: businessName,
          position: mockMapPackPosition,
          address: `123 Main St, ${targetLocation}, Philippines`,
          rating,
          ratingCount: reviewCount,
          cid: 'demo-cid-12345',
          website: mockWebsite,
          phoneNumber: mockPhone,
          category: 'Local Business',
        },
      ],
    }

    const {
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
    } = calculateGBPScore(placeData, serperData, businessName, targetLocation, deepCheckAnswers)

    // Add a note in details indicating Demo Mode
    if (pillars[0]) pillars[0].details.unshift('ℹ Demo Mode: Real API keys not set in .env')

    const demoSeo: WebsiteSeo = {
      url: mockWebsite,
      title: 'Demo Business | High Quality Services',
      metaDescription: 'We offer the best services in town. Call us today!',
      status: 'success',
    }

    const demoRecommendations = generateLocalSeoActionPlan(
      businessName,
      targetLocation,
      totalScore,
      grade,
      pillars,
      actionItems,
      competitors,
      demoSeo,
      deepCheckAnswers,
    )

    const demoResponse: GBPAuditResponse = {
      success: true,
      businessName,
      location: targetLocation,
      totalScore,
      grade,
      pillars,
      publicChecks,
      placeId: 'demo-place-id-12345',
      foundInMapPack,
      mapPackPosition,
      actionItems,
      competitors,
      websiteSeo: demoSeo,
      aiRecommendations: demoRecommendations,
      aiDescription: generateOptimizedBusinessDescription(
        businessName,
        targetLocation,
        primaryCategory,
        additionalCategories,
      ),
      aiReviewTemplates: generateReviewResponseTemplates(businessName, targetLocation),
      aiKeywords: generateHighIntentKeywords(
        businessName,
        targetLocation,
        primaryCategory,
        additionalCategories,
      ),
      primaryCategory,
      additionalCategories,
      categoryConfidenceScore,
      categoryBenchmark,
    }

    if (!deepCheckAnswers) cacheStore.set(cacheKey, { timestamp: now, data: demoResponse })
    return NextResponse.json(demoResponse)
  }

  // ── 2. Serper Places Search (Production) ──────────────────────────────
  let placeData: SerperPlace = { title: businessName }
  let serperData: SerperMapsResponse = {}
  let resolvedPlaceId: string | null = null
  let resolvedDisplayName = businessName

  try {
    const serperRes = await fetch('https://google.serper.dev/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': serperApiKey,
      },
      body: JSON.stringify({
        q: `${businessName} in ${targetLocation}`,
        gl: 'ph',
        hl: 'en',
      }),
    })

    if (!serperRes.ok) {
      const errText = await serperRes.text()
      throw new Error(`Serper Places Search failed (${serperRes.status}): ${errText}`)
    }

    serperData = (await serperRes.json()) as SerperMapsResponse
    const matchedPlace = serperData.places?.[0]

    if (!matchedPlace) {
      return NextResponse.json(
        {
          success: false,
          error: `Could not find "${businessName}" in "${targetLocation}" on Google Maps. Please verify the exact business name.`,
          businessName,
          location: targetLocation,
          totalScore: 0,
          grade: 'F',
          pillars: [],
          placeId: null,
          foundInMapPack: false,
          mapPackPosition: null,
        },
        { status: 404 },
      )
    }

    placeData = matchedPlace
    resolvedDisplayName = matchedPlace.title
    resolvedPlaceId = matchedPlace.cid ?? null
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[GBP Audit] Serper API error:', msg)
    return NextResponse.json(
      {
        success: false,
        error: `Serper API error: ${msg}`,
        businessName,
        location: targetLocation,
        totalScore: 0,
        grade: 'F',
        pillars: [],
        placeId: null,
        foundInMapPack: false,
        mapPackPosition: null,
      },
      { status: 502 },
    )
  }

  // ── 3. Calculate Final Score ──────────────────────────────────────────
  const {
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
  } = calculateGBPScore(
    placeData,
    serperData,
    resolvedDisplayName,
    targetLocation,
    deepCheckAnswers,
  )

  const websiteSeo = await scrapeWebsite(placeData.website || '')

  // ── 4. Gemini AI Recommendations (with Local SEO Intelligence Engine fallback) ──
  const aiRecommendations = await generateAiRecommendations({
    businessName: resolvedDisplayName,
    targetLocation,
    totalScore,
    grade,
    primaryCategory,
    actionItems,
    competitors,
    deepCheckAnswers,
    websiteSeo,
    pillars,
  })

  const finalResponse: GBPAuditResponse = {
    success: true,
    businessName: resolvedDisplayName,
    location: targetLocation,
    totalScore,
    grade,
    pillars,
    publicChecks,
    placeId: resolvedPlaceId,
    foundInMapPack,
    mapPackPosition,
    actionItems,
    competitors,
    websiteSeo,
    aiRecommendations,
    aiDescription: generateOptimizedBusinessDescription(
      resolvedDisplayName,
      targetLocation,
      primaryCategory,
      additionalCategories,
    ),
    aiReviewTemplates: generateReviewResponseTemplates(resolvedDisplayName, targetLocation),
    aiKeywords: generateHighIntentKeywords(
      resolvedDisplayName,
      targetLocation,
      primaryCategory,
      additionalCategories,
    ),
    primaryCategory,
    additionalCategories,
    categoryConfidenceScore,
    categoryBenchmark,
  }

  // Save to cache (only base searches, don't cache deep checks to avoid state bugs)
  if (!deepCheckAnswers) {
    cacheStore.set(cacheKey, { timestamp: now, data: finalResponse })
  }

  return NextResponse.json(finalResponse)
}
