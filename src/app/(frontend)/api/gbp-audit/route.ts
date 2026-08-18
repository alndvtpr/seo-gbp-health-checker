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

export interface ReviewTemplates {
  positive: string
  constructive: string
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
  aiDescription?: string
  aiReviewTemplates?: ReviewTemplates
  aiKeywords?: string[]
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

// ─── Local SEO Action Plan Intelligence Generator ───────────────────────────

function generateOptimizedBusinessDescription(
  businessName: string,
  targetLocation: string,
  category?: string
): string {
  const niche = category || 'trusted local establishment'
  return `Welcome to ${businessName}, your premier ${niche} in ${targetLocation}. We specialize in delivering exceptional service, top-rated facilities, and dedicated customer care crafted to exceed expectations. Conveniently situated in ${targetLocation}, ${businessName} provides easy access, modern amenities, and a relaxing ambiance for families, tourists, and private events. Whether you are planning a visit, organizing group celebrations, or looking for reliable local solutions, our team is committed to unmatched quality. Browse our services, check customer reviews, or reach out today for rates and reservations!`
}

function generateReviewResponseTemplates(
  businessName: string,
  targetLocation: string
): ReviewTemplates {
  return {
    positive: `Hi [Customer Name]! Thank you so much for the 5-star review and kind words about your experience with ${businessName} in ${targetLocation}. Our entire team takes immense pride in delivering top-tier service and memorable customer satisfaction. We truly appreciate your patronage and look forward to welcoming you back soon!`,
    constructive: `Hello [Customer Name], thank you for taking the time to share your honest feedback regarding your visit to ${businessName} in ${targetLocation}. We strive to provide the best possible experience and sincerely regret that we fell short of your expectations. We would love the opportunity to make this right—please contact our management directly so we can address your concerns immediately.`,
  }
}

function generateHighIntentKeywords(
  businessName: string,
  targetLocation: string,
  category?: string
): string[] {
  const cat = category?.toLowerCase() || 'local services'
  return [
    `${businessName} ${targetLocation}`,
    `best ${cat} in ${targetLocation}`,
    `${businessName} rates and reviews`,
    `top rated ${cat} near me`,
    `${targetLocation} ${cat} contact and booking`,
  ]
}

function generateLocalSeoActionPlan(
  businessName: string,
  targetLocation: string,
  totalScore: number,
  grade: string,
  pillars: AuditPillar[],
  actionItems: ActionItem[],
  competitors?: Competitor[],
  websiteSeo?: WebsiteSeo,
  deepCheckAnswers?: boolean[]
): string {
  const failedItems = actionItems.filter((a) => a.priority !== 'passed')

  let plan = `### 🎯 30-Day Local SEO Action Plan for ${businessName}\n\n`
  plan += `**Location:** ${targetLocation} | **Audit Score:** ${totalScore}/100 (**Grade: ${grade}**)\n\n`

  // Summary / Diagnosis
  plan += `#### 📊 Executive Diagnosis\n`
  if (totalScore >= 75) {
    plan += `${businessName} possesses a solid foundational Google Business Profile with strong local signals in ${targetLocation}. However, implementing high-intent local optimization and proactive review acquisition will help solidify top Map Pack placements against local rivals.\n\n`
  } else if (totalScore >= 50) {
    plan += `${businessName} has an active local presence, but critical ranking trust factors are currently missing or under-optimized. Addressing high-priority gaps will yield immediate ranking and lead conversion gains in ${targetLocation}.\n\n`
  } else {
    plan += `${businessName} is currently underperforming in local search visibility in ${targetLocation}. By executing this structured 4-week optimization sprint, you can fix critical NAP & visibility gaps and start competing for high-value Map Pack traffic.\n\n`
  }

  // Week 1: Foundation & NAP Alignment
  plan += `#### 🗓️ Week 1: Core Foundation & NAP Integrity (Days 1–7)\n`
  if (failedItems.some((i) => i.message.toLowerCase().includes('website'))) {
    plan += `- **Add Official Website URL**: Link your verified domain or high-converting local landing page to your Google Business Profile to unlock organic authority transference.\n`
  }
  if (failedItems.some((i) => i.message.toLowerCase().includes('phone'))) {
    plan += `- **Configure Primary Local Phone Number**: Add a direct local telephone or mobile contact line to enhance Google trust validation and mobile click-to-call conversions.\n`
  }
  if (failedItems.some((i) => i.message.toLowerCase().includes('category') || i.message.toLowerCase().includes('details'))) {
    plan += `- **Primary & Secondary Categories**: Verify your primary business category perfectly matches customer search intent, and add 2–3 relevant secondary categories.\n`
  }
  if (failedItems.some((i) => i.message.toLowerCase().includes('photo'))) {
    plan += `- **High-Resolution Geo-Tagged Photos**: Upload at least 10–15 high-quality photos (exterior entrance, interior amenities, team, and branding) to boost user engagement.\n`
  }
  if (deepCheckAnswers && !deepCheckAnswers[3]) {
    plan += `- **750-Character Description Optimization**: Write a rich business description incorporating primary local keywords (e.g., "${businessName} in ${targetLocation}") and your core value proposition within the 750-character limit.\n`
  }
  if (failedItems.length === 0) {
    plan += `- **Audit Baseline Details**: Double-check holiday hours, service areas, and attribute tags (e.g., Wi-Fi, parking, payment options) for complete accuracy.\n`
  }
  plan += `\n`

  // Week 2: Reputation Engine & Review Velocity
  plan += `#### 🗓️ Week 2: Review Velocity & Social Proof (Days 8–14)\n`
  if (deepCheckAnswers && !deepCheckAnswers[0]) {
    plan += `- **Respond to 100% of Past Reviews**: Reply professionally to all existing Google reviews (both positive and negative), weaving in relevant service and location keywords naturally.\n`
  }
  plan += `- **Automated Review Request Flow**: Generate a direct Google review shortlink and set up an automated follow-up for recent clients.\n`
  if (competitors && competitors.length > 0) {
    const topComp = competitors[0]
    plan += `- **Outpace Competitor Review Velocity**: Your top competitor (**${topComp.name}**) has **${topComp.reviews || 0} reviews** (${topComp.rating ? `${topComp.rating}⭐` : 'unrated'}). Target acquiring 5–10 new 5-star reviews every month to close the gap.\n`
  }
  plan += `\n`

  // Week 3: Service Catalog & Local Content
  plan += `#### 🗓️ Week 3: Service Catalog & Google Posts (Days 15–21)\n`
  if (deepCheckAnswers && !deepCheckAnswers[1]) {
    plan += `- **Itemized Service & Product Menu**: Populate the GBP Services section with clear descriptions, pricing brackets, and benefits for every service offering.\n`
  }
  if (deepCheckAnswers && !deepCheckAnswers[2]) {
    plan += `- **Publish Weekly Google Updates**: Create weekly Google Posts featuring current promotions, case studies, or seasonal announcements with a clear Call-To-Action button.\n`
  } else {
    plan += `- **Maintain Regular Google Posts**: Keep publishing weekly Google Updates (Offers, Events, or What's New) to maintain a fresh activity signal for Google's local algorithm.\n`
  }
  plan += `- **Seed Local Q&A Section**: Pre-populate 3–5 Frequently Asked Questions and authoritative answers directly on your Google Business Profile.\n\n`

  // Week 4: Local Landing Page & Citation Authority
  plan += `#### 🗓️ Week 4: Website Synergy & Local Citation Sync (Days 22–30)\n`
  if (websiteSeo && websiteSeo.status === 'success') {
    if (!websiteSeo.title || !websiteSeo.title.toLowerCase().includes(targetLocation.toLowerCase())) {
      plan += `- **Targeted Title Tag Optimization**: Update your homepage/landing page title tag to include "${targetLocation}" and primary service terms for stronger geo-relevance.\n`
    }
    if (!websiteSeo.metaDescription) {
      plan += `- **Engaging Meta Description**: Write a compelling meta description highlighting local availability, key services, and contact details.\n`
    }
  }
  plan += `- **Top Local & Industry Citations**: Ensure consistent Name, Address, and Phone (NAP) across major local directories, social profiles, and industry listings.\n`
  plan += `- **Embed Google Map & Schema Markup**: Add a responsive Google Maps embed and \`LocalBusiness\` JSON-LD structured data to your website's contact page.\n\n`

  plan += `> 💡 **Next Steps**: Focus on High Priority items first to trigger faster ranking recalculations on Google Maps!`

  return plan
}

// ─── Route Handler ───────────────────────────────────────────────────────────

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
        {
          title: businessName,
          position: mapPackPosition,
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

    const { totalScore, grade, pillars, foundInMapPack, actionItems, competitors } =
      calculateGBPScore(placeData, serperData, businessName, targetLocation, deepCheckAnswers)

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
      deepCheckAnswers
    )

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
      websiteSeo: demoSeo,
      aiRecommendations: demoRecommendations,
      aiDescription: generateOptimizedBusinessDescription(businessName, targetLocation, placeData.category),
      aiReviewTemplates: generateReviewResponseTemplates(businessName, targetLocation),
      aiKeywords: generateHighIntentKeywords(businessName, targetLocation, placeData.category),
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
  const { totalScore, grade, pillars, foundInMapPack, mapPackPosition, actionItems, competitors } =
    calculateGBPScore(
      placeData,
      serperData,
      resolvedDisplayName,
      targetLocation,
      deepCheckAnswers
    )

  const websiteSeo = await scrapeWebsite(placeData.website || '')

  // ── 4. Gemini AI Recommendations (with Local SEO Intelligence Engine fallback) ──
  let aiRecommendations: string | undefined = undefined

  if (process.env.GEMINI_API_KEY) {
    const prompt = `You are an expert Local SEO consultant.
The user just audited their Google Business Profile for "${resolvedDisplayName}" in "${targetLocation}".
Their automated audit score is ${totalScore}/100 (Grade: ${grade}).

Here are the specific action items from our audit:
${actionItems.map((a) => `- [${a.priority.toUpperCase()}] ${a.message}`).join('\n')}

${competitors && competitors.length > 0 ? `Top Competitors:\n${competitors.map((c) => `- #${c.position} ${c.name} (${c.rating || 0}★, ${c.reviews || 0} reviews)`).join('\n')}` : ''}

${deepCheckAnswers ? `Deep Check Answers:\n- Responds to reviews: ${deepCheckAnswers[0] ? 'Yes' : 'No'}\n- Services descriptions: ${deepCheckAnswers[1] ? 'Yes' : 'No'}\n- Recent Google Post: ${deepCheckAnswers[2] ? 'Yes' : 'No'}\n- Description filled: ${deepCheckAnswers[3] ? 'Yes' : 'No'}` : ''}

Write a highly encouraging, authoritative, and personalized 30-day action plan for them in Markdown.
Break it into Week 1 (Foundation & NAP), Week 2 (Reputation & Reviews), Week 3 (Services & Google Updates), and Week 4 (Website Synergy & Citations).
Jump straight into the action plan without pleasantries.`

    const candidateModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash']

    // Try @google/genai SDK
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
      for (const model of candidateModels) {
        try {
          const aiResult = await ai.models.generateContent({
            model,
            contents: prompt,
          })
          if (aiResult.text) {
            aiRecommendations = aiResult.text
            break
          }
        } catch {
          // try next model
        }
      }
    } catch (e) {
      console.warn('[GBP Audit] Gemini SDK invocation failed, attempting REST/fallback:', e)
    }

    // Direct REST attempt if SDK failed
    if (!aiRecommendations) {
      for (const model of candidateModels) {
        try {
          const restRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY,
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            },
          )
          if (restRes.ok) {
            const json = await restRes.json()
            const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text
            if (candidateText) {
              aiRecommendations = candidateText
              break
            }
          }
        } catch {
          // continue
        }
      }
    }
  }

  // If Gemini was unavailable or failed, use our comprehensive Local SEO Intelligence Engine
  if (!aiRecommendations) {
    aiRecommendations = generateLocalSeoActionPlan(
      resolvedDisplayName,
      targetLocation,
      totalScore,
      grade,
      pillars,
      actionItems,
      competitors,
      websiteSeo,
      deepCheckAnswers
    )
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
    aiRecommendations,
    aiDescription: generateOptimizedBusinessDescription(resolvedDisplayName, targetLocation, placeData.category),
    aiReviewTemplates: generateReviewResponseTemplates(resolvedDisplayName, targetLocation),
    aiKeywords: generateHighIntentKeywords(resolvedDisplayName, targetLocation, placeData.category),
  }

  // Save to cache (only base searches, don't cache deep checks to avoid state bugs)
  if (!deepCheckAnswers) {
    cacheStore.set(cacheKey, { timestamp: now, data: finalResponse })
  }

  return NextResponse.json(finalResponse)
}

