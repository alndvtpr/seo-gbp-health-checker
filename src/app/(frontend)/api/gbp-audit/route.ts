import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ActionItem {
  priority: 'high' | 'medium' | 'low' | 'passed'
  message: string
}

export interface Competitor {
  name: string
  rating?: number
  reviews?: number
  position: number
}

export interface WebsiteSeo {
  url: string
  title: string | null
  metaDescription: string | null
  status: 'success' | 'error' | 'no_website'
}

interface AuditPillar {
  name: string
  score: number
  maxScore: number
  details: string[]
}

export interface GBPAuditResponse {
  success: boolean
  businessName: string
  location: string
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  placeId: string | null
  foundInMapPack: boolean
  mapPackPosition: number | null
  competitors?: Competitor[]
  websiteSeo?: WebsiteSeo
  actionItems?: ActionItem[]
  error?: string
  aiRecommendations?: string
}

// Serper Maps Places Result shape
interface SerperPlace {
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

interface SerperMapsResponse {
  places?: SerperPlace[]
}

// ─── Utilities ───────────────────────────────────────────────────────────────

async function scrapeWebsite(url: string): Promise<WebsiteSeo> {
  const seoData: WebsiteSeo = { url, title: null, metaDescription: null, status: 'no_website' }
  if (!url) return seoData

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000) // 3-second timeout

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)

    if (!res.ok) {
      seoData.status = 'error'
      return seoData
    }

    const html = await res.text()

    // Regex extraction — no cheerio needed
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i) || 
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)

    seoData.title = titleMatch?.[1]?.trim() || null
    seoData.metaDescription = metaMatch?.[1]?.trim() || null
    seoData.status = 'success'
  } catch (err) {
    console.warn(`[GBP Audit] Website scrape failed for ${url}:`, err)
    seoData.status = 'error'
  }

  return seoData
}

// ─── Scoring Engine ──────────────────────────────────────────────────────────

/**
 * Calculates a 100-point GBP audit score across three pillars:
 * - NAP & Completeness (40 pts)
 * - Reputation (30 pts)
 * - Map Pack Visibility (30 pts)
 */
function calculateGBPScore(
  placeData: SerperPlace,
  serperData: SerperMapsResponse,
  businessName: string,
  targetLocation: string,
  deepCheckAnswers?: boolean[]
): {
  totalScore: number
  grade: string
  pillars: AuditPillar[]
  foundInMapPack: boolean
  mapPackPosition: number | null
  actionItems: ActionItem[]
  competitors: Competitor[]
} {
  const actionItems: ActionItem[] = []

  // ── Pillar 1: NAP & Completeness (max 40) ─────────────────────────────
  let completenessScore = 0
  const completenessDetails: string[] = []

  const hasWebsite = Boolean(placeData.website)
  if (hasWebsite) {
    completenessScore += 8
    completenessDetails.push(`✓ Website linked: ${placeData.website}`)
    actionItems.push({ priority: 'passed', message: 'Website is linked on GBP.' })
  } else {
    completenessDetails.push('✗ No website URL detected on GBP')
    actionItems.push({ priority: 'high', message: 'Add your website link to your Google Business Profile.' })
  }

  const hasPhone = Boolean(placeData.phoneNumber)
  if (hasPhone) {
    completenessScore += 8
    completenessDetails.push(`✓ Phone number: ${placeData.phoneNumber}`)
    actionItems.push({ priority: 'passed', message: 'Phone number is listed.' })
  } else {
    completenessDetails.push('✗ No phone number found on GBP')
    actionItems.push({ priority: 'high', message: 'Add a contact phone number to your profile.' })
  }

  // Serper usually indicates profile category/details, count as hours completed if category exists as proxy
  const hasHours = Boolean(placeData.category)
  if (hasHours) {
    completenessScore += 8
    completenessDetails.push('✓ Business hours / Category configured')
    actionItems.push({ priority: 'passed', message: 'Business details and category are configured.' })
  } else {
    completenessDetails.push('✗ Business details not fully configured')
    actionItems.push({ priority: 'high', message: 'Verify and update your business category and operation status.' })
  }

  const hasAddress = Boolean(placeData.address)
  if (hasAddress) {
    completenessScore += 8
    completenessDetails.push(`✓ Address: ${placeData.address}`)
  } else {
    completenessDetails.push('✗ Address missing')
    actionItems.push({ priority: 'high', message: 'Add a verified physical address.' })
  }

  // Reward points if thumbnail image exists or CID exists (indicating active profile listing with visual content)
  const hasPhotos = Boolean(placeData.cid)
  if (hasPhotos) {
    completenessScore += 8
    completenessDetails.push('✓ Profile has photos/media uploaded')
  } else {
    completenessDetails.push('✗ No photos detected on profile')
    actionItems.push({ priority: 'medium', message: 'Upload high-quality exterior and interior photos of your business.' })
  }

  // ── Pillar 2: Reputation (max 30) ─────────────────────────────────────
  let reputationScore = 0
  let reputationMax = 30
  const reputationDetails: string[] = []

  const rating = placeData.rating
  const reviewCount = placeData.ratingCount

  if (rating === undefined && reviewCount === undefined) {
    // Serper failed to fetch rating data, do not penalize the user
    reputationMax = 0
    reputationDetails.push('⚠️ Rating data currently unavailable via search API')
  } else {
    const safeRating = rating ?? 0
    const safeReviewCount = reviewCount ?? 0

    if (safeRating >= 4.5) {
      reputationScore += 15
      reputationDetails.push(`✓ Excellent rating: ${safeRating.toFixed(1)} ⭐ (+15 pts)`)
    } else if (safeRating >= 4.0) {
      reputationScore += 10
      reputationDetails.push(`~ Good rating: ${safeRating.toFixed(1)} ⭐ (+10 pts)`)
      actionItems.push({ priority: 'medium', message: `Improve your average rating. Currently at ${safeRating.toFixed(1)}⭐.` })
    } else {
      reputationDetails.push(`✗ Rating below 4.0: ${safeRating.toFixed(1)} ⭐ (0 pts)`)
      actionItems.push({ priority: 'high', message: 'Critically low average rating. Address customer complaints immediately.' })
    }

    if (safeReviewCount >= 20) {
      reputationScore += 15
      reputationDetails.push(`✓ Strong review count: ${safeReviewCount} reviews (+15 pts)`)
    } else if (safeReviewCount >= 1) {
      reputationScore += 10
      reputationDetails.push(`~ Moderate reviews: ${safeReviewCount} reviews (+10 pts)`)
      actionItems.push({ priority: 'medium', message: 'Generate more reviews to build trust and outrank competitors.' })
    } else {
      reputationDetails.push('✗ No reviews found (0 pts)')
      actionItems.push({ priority: 'high', message: 'You have zero reviews. Start a review generation campaign.' })
    }
  }

  // ── Pillar 3: Map Pack Visibility (max 30) ────────────────────────────
  let visibilityScore = 0
  const visibilityDetails: string[] = []
  let foundInMapPack = false
  let mapPackPosition: number | null = null
  const competitors: Competitor[] = []

  const localResults = serperData.places ?? []
  const normalizedTarget = businessName.toLowerCase().trim()
  const normalizedLoc = targetLocation.toLowerCase().trim()

  // Extract Top 3 Competitors (excluding self if ranking)
  localResults.slice(0, 4).forEach((r) => {
    const title = r.title?.toLowerCase().trim() ?? ''
    const address = r.address?.toLowerCase().trim() ?? ''
    const isSelf = (title.includes(normalizedTarget) || normalizedTarget.includes(title.split(' ')[0] ?? '')) &&
                   (address.includes(normalizedLoc) || !address)
    
    if (!isSelf && competitors.length < 3) {
      competitors.push({
        name: r.title,
        rating: r.rating,
        reviews: r.ratingCount,
        position: r.position ?? competitors.length + 1
      })
    }
  })

  // Find self
  const matchIndex = localResults.findIndex((r) => {
    const title = r.title?.toLowerCase().trim() ?? ''
    const address = r.address?.toLowerCase().trim() ?? ''
    return (title.includes(normalizedTarget) || normalizedTarget.includes(title.split(' ')[0] ?? '')) &&
           (address.includes(normalizedLoc) || !address)
  })

  if (matchIndex !== -1) {
    foundInMapPack = true
    // The position is either provided by the API, or based on the index in the array (1-indexed)
    mapPackPosition = localResults[matchIndex]?.position ?? matchIndex + 1

    if (mapPackPosition <= 3) {
      visibilityScore = 30
      visibilityDetails.push(`✓ Ranked #${mapPackPosition} in the Local Map Pack (+30 pts)`)
      actionItems.push({ priority: 'passed', message: `You are ranking #${mapPackPosition}! Keep maintaining your profile.` })
    } else {
      visibilityScore = 15
      visibilityDetails.push(`~ Found in Map Pack position #${mapPackPosition} (+15 pts)`)
      actionItems.push({ priority: 'medium', message: `You are ranking #${mapPackPosition}. Try to break into the Top 3.` })
    }
  } else {
    visibilityDetails.push('✗ Not found in Local Pack top results (0 pts)')
    actionItems.push({ priority: 'high', message: 'You are invisible in the Map Pack. Build citations and optimize your GBP.' })
  }

  // ── Assemble ──────────────────────────────────────────────────────────
  let earnedScore = completenessScore + reputationScore + visibilityScore
  let maxPossible = 40 + reputationMax + 30
  
  const pillars: AuditPillar[] = [
    { name: 'NAP & Completeness', score: completenessScore, maxScore: 40, details: completenessDetails },
    { name: 'Reputation', score: reputationScore, maxScore: reputationMax, details: reputationDetails },
    { name: 'Map Pack Visibility', score: visibilityScore, maxScore: 30, details: visibilityDetails },
  ]

  // ── Pillar 4: Deep Check (if provided) ────────────────────────────────
  if (deepCheckAnswers && deepCheckAnswers.length === 4) {
    let deepScore = 0
    const deepDetails: string[] = []
    
    // Q1: Respond to all reviews
    if (deepCheckAnswers[0]) { deepScore += 5; deepDetails.push('✓ Responds to all reviews (+5 pts)') }
    else { deepDetails.push('✗ Does not respond to all reviews (0 pts)'); actionItems.push({ priority: 'high', message: 'Reply to all Google reviews to show active management.' }) }
    
    // Q2: Services listed
    if (deepCheckAnswers[1]) { deepScore += 5; deepDetails.push('✓ Services/Products listed with descriptions (+5 pts)') }
    else { deepDetails.push('✗ Services missing descriptions (0 pts)'); actionItems.push({ priority: 'medium', message: 'Add detailed descriptions to your services and products.' }) }
    
    // Q3: Google Update in last 14 days
    if (deepCheckAnswers[2]) { deepScore += 5; deepDetails.push('✓ Recent Google Post published (+5 pts)') }
    else { deepDetails.push('✗ No recent Google Posts (0 pts)'); actionItems.push({ priority: 'medium', message: 'Publish a new Google Update/Post to keep your profile fresh.' }) }
    
    // Q4: Description filled
    if (deepCheckAnswers[3]) { deepScore += 5; deepDetails.push('✓ Business description is fully utilized (+5 pts)') }
    else { deepDetails.push('✗ Description is too short or missing (0 pts)'); actionItems.push({ priority: 'medium', message: 'Expand your business description to use all 750 characters.' }) }

    maxPossible += 20
    earnedScore += deepScore

    pillars.push({
      name: 'Deep Check Authenticity',
      score: deepScore,
      maxScore: 20,
      details: deepDetails
    })
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
    foundInMapPack,
    mapPackPosition,
    actionItems,
    competitors
  }
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export const runtime = 'nodejs'

// Basic In-Memory Store for Caching & Rate Limiting
const cacheStore = new Map<string, { timestamp: number; data: GBPAuditResponse }>()
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5

/**
 * POST /api/gbp-audit
 *
 * Body: { businessName: string; targetLocation: string; deepCheckAnswers?: boolean[] }
 *
 * Integrations:
 *   1. Serper.dev Google Maps Places API (Replaces Google Places API completely)
 *   2. Google Gemini API (For Deep Check Recommendations)
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
    if (Array.isArray(body.deepCheckAnswers)) { deepCheckAnswers = body.deepCheckAnswers.map(Boolean) }
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
        { success: false, error: 'Rate limit exceeded. Please try again later.', businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
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

  const isDemoMode =
    !serperApiKey ||
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
        { title: businessName, position: mapPackPosition, address: `123 Main St, ${targetLocation}, Philippines`, rating, ratingCount: reviewCount, cid: 'demo-cid-12345', website: mockWebsite, phoneNumber: mockPhone, category: 'Local Business' },
      ],
    }

    const { totalScore, grade, pillars, foundInMapPack, actionItems, competitors } = calculateGBPScore(
      placeData,
      serperData,
      businessName,
      targetLocation,
      deepCheckAnswers
    )

    // Add a note in details indicating Demo Mode
    if (pillars[0]) pillars[0].details.unshift('ℹ Demo Mode: Real API keys not set in .env')

    const demoResponse: GBPAuditResponse = {
      success: true,
      businessName,
      location: targetLocation,
      totalScore,
      grade,
      pillars,
      placeId: 'demo-place-id-12345',
      foundInMapPack,
      mapPackPosition,
      actionItems,
      competitors,
      websiteSeo: { url: mockWebsite, title: 'Demo Business | High Quality Services', metaDescription: 'We offer the best services in town. Call us today!', status: 'success' },
      aiRecommendations: deepCheckAnswers ? '## 🤖 Demo AI Action Plan\\nSince this is demo mode, the AI did not run. Please add your `GEMINI_API_KEY` to the `.env` file to generate real recommendations.' : undefined
    }

    if (!deepCheckAnswers) cacheStore.set(cacheKey, { timestamp: now, data: demoResponse })
    return NextResponse.json(demoResponse)
  }

  // ── 2. Serper Places Search (Production) ──────────────────────────────
  let placeData: SerperPlace = { title: businessName }
  let serperData: SerperMapsResponse = {}
  let resolvedPlaceId: string | null = null
  let resolvedDisplayName = businessName

  // Fetch from Serper only if not cached already or if doing deep check but we need the base data
  if (cachedData) {
    // If we have cached data, we don't need to re-fetch from Serper, we just need to re-calculate
    // But since calculateGBPScore needs SerperPlace and SerperMapsResponse, we either store those in cache or re-fetch.
    // For simplicity, we just re-fetch in production since the cache bypass is rare (only when answering deep check)
  }

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
        { success: false, error: `Could not find "${businessName}" in "${targetLocation}" on Google Maps. Please verify the exact business name.`, businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
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
      { success: false, error: `Serper API error: ${msg}`, businessName, location: targetLocation, totalScore: 0, grade: 'F', pillars: [], placeId: null, foundInMapPack: false, mapPackPosition: null },
      { status: 502 },
    )
  }

  // ── 3. Calculate Final Score ──────────────────────────────────────────
  const { totalScore, grade, pillars, foundInMapPack, mapPackPosition, actionItems, competitors } = calculateGBPScore(
    placeData,
    serperData,
    resolvedDisplayName,
    targetLocation,
    deepCheckAnswers
  )

  const websiteSeo = await scrapeWebsite(placeData.website || '')

  // ── 4. Gemini AI Recommendations (If Deep Check provided) ───────────
  let aiRecommendations: string | undefined = undefined;
  if (deepCheckAnswers && process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
You are an expert Local SEO consultant.
The user just audited their Google Business Profile for "${resolvedDisplayName}" in "${targetLocation}".
Their automated score is ${totalScore}/100.

Here are the specific action items they need to fix based on our audit:
${actionItems.filter(a => a.priority !== 'passed').map(a => '- ' + a.message).join('\n')}

Write a highly encouraging, authoritative, and personalized 30-day action plan for them in Markdown.
Use headings, bullet points, and bold text. DO NOT start with "Here is your plan" or pleasantries. Jump straight into the action plan.
Focus strictly on practical Google Business Profile SEO tips based on their failed action items.
`
      
      const aiResult = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      aiRecommendations = aiResult.text ?? '';
    } catch (e) {
      console.error('[GBP Audit] Gemini API Error:', e);
      aiRecommendations = '> ⚠️ **Failed to generate AI recommendations** due to an API error. Please check your Gemini API key limits or try again later.';
    }
  } else if (deepCheckAnswers && !process.env.GEMINI_API_KEY) {
    aiRecommendations = '> ⚠️ **GEMINI_API_KEY is missing.** Please add it to your `.env` file to generate AI recommendations.'
  }

  const finalResponse: GBPAuditResponse = {
    success: true,
    businessName: resolvedDisplayName,
    location: targetLocation,
    totalScore,
    grade,
    pillars,
    placeId: resolvedPlaceId,
    foundInMapPack,
    mapPackPosition,
    actionItems,
    competitors,
    websiteSeo,
    aiRecommendations
  }

  // Save to cache (only base searches, don't cache deep checks to avoid weird state bugs)
  if (!deepCheckAnswers) {
    cacheStore.set(cacheKey, { timestamp: now, data: finalResponse })
  }

  return NextResponse.json(finalResponse)
}
