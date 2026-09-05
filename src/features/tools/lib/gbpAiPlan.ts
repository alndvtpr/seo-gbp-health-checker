import { GoogleGenAI } from '@google/genai'
import type {
  ActionItem,
  AuditPillar,
  Competitor,
  ReviewTemplates,
  WebsiteSeo,
} from '@/types/gbp'

export function generateOptimizedBusinessDescription(
  businessName: string,
  targetLocation: string,
  category?: string,
  secondaryCategories?: string[],
): string {
  const niche = category || 'trusted local establishment'
  const subServices =
    secondaryCategories && secondaryCategories.length > 0
      ? `specializing in ${secondaryCategories.slice(0, 3).join(', ')}`
      : 'dedicated to exceptional customer satisfaction'
  return `Welcome to ${businessName}, your premier ${niche} in ${targetLocation}. We deliver top-rated local services, modern amenities, and professional client care, ${subServices}. Conveniently situated in ${targetLocation}, ${businessName} provides accessible facilities and responsive service for families, visitors, and local clients. Whether you are seeking trusted recommendations, reliable appointments, or premium solutions, our team is committed to unmatched quality. Browse our services, check customer reviews, or reach out today for rates and bookings!`
}

export function generateReviewResponseTemplates(
  businessName: string,
  targetLocation: string,
): ReviewTemplates {
  return {
    positive: `Hi [Customer Name]! Thank you so much for the 5-star review and kind words about your experience with ${businessName} in ${targetLocation}. Our entire team takes immense pride in delivering top-tier service and memorable customer satisfaction. We truly appreciate your patronage and look forward to welcoming you back soon!`,
    constructive: `Hello [Customer Name], thank you for taking the time to share your honest feedback regarding your visit to ${businessName} in ${targetLocation}. We strive to provide the best possible experience and sincerely regret that we fell short of your expectations. We would love the opportunity to make this right. Please contact our management directly so we can address your concerns immediately.`,
  }
}

export function generateHighIntentKeywords(
  businessName: string,
  targetLocation: string,
  category?: string,
  additionalCategories?: string[],
): string[] {
  const cat = category?.toLowerCase() || 'local services'
  const sub1 = additionalCategories?.[0]?.toLowerCase() || `${cat} near me`
  const sub2 = additionalCategories?.[1]?.toLowerCase() || `best ${cat}`

  return [
    `${businessName} ${targetLocation}`,
    `best ${cat} in ${targetLocation}`,
    `${sub1} in ${targetLocation}`,
    `${businessName} rates and reviews`,
    `top rated ${cat} near me`,
    `${targetLocation} ${sub2} contact and booking`,
  ]
}

export function generateLocalSeoActionPlan(
  businessName: string,
  targetLocation: string,
  totalScore: number,
  grade: string,
  pillars: AuditPillar[],
  actionItems: ActionItem[],
  competitors?: Competitor[],
  websiteSeo?: WebsiteSeo,
  deepCheckAnswers?: boolean[],
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
    plan += `- **Add Official Website URL**: Link your verified domain or optimized local landing page to your Google Business Profile to unlock organic authority transference.\n`
  }
  if (failedItems.some((i) => i.message.toLowerCase().includes('phone'))) {
    plan += `- **Configure Primary Local Phone Number**: Add a direct local telephone or mobile contact line to enhance Google trust validation and mobile click-to-call conversions.\n`
  }
  if (
    failedItems.some(
      (i) => i.message.toLowerCase().includes('category') || i.message.toLowerCase().includes('details'),
    )
  ) {
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
  plan += `- **Review Map & Schema Markup**: Add a useful map when it helps customers and use \`LocalBusiness\` JSON-LD only when the verified business details and schema eligibility support it.\n\n`

  plan += `> 💡 **Next Steps**: Focus on High Priority items first to trigger faster ranking recalculations on Google Maps!`

  return plan
}

export interface AiRecommendationsParams {
  businessName: string
  targetLocation: string
  totalScore: number
  grade: string
  primaryCategory?: string
  actionItems: ActionItem[]
  competitors?: Competitor[]
  deepCheckAnswers?: boolean[]
  websiteSeo?: WebsiteSeo
  pillars: AuditPillar[]
}

export async function generateAiRecommendations(
  params: AiRecommendationsParams,
): Promise<string> {
  const {
    businessName,
    targetLocation,
    totalScore,
    grade,
    primaryCategory,
    actionItems,
    competitors,
    deepCheckAnswers,
    websiteSeo,
    pillars,
  } = params

  let aiRecommendations: string | undefined = undefined

  if (process.env.GEMINI_API_KEY) {
    const prompt = `You are an expert Local SEO consultant.
The user just audited their Google Business Profile for "${businessName}" in "${targetLocation}".
Their automated audit score is ${totalScore}/100 (Grade: ${grade}).
Their detected primary category is "${primaryCategory}".

Here are the specific action items from our audit:
${actionItems.map((a) => `- [${a.priority.toUpperCase()}] ${a.message}`).join('\n')}

${competitors && competitors.length > 0 ? `Top Competitors:\n${competitors.map((c) => `- #${c.position} ${c.name} (${c.rating || 0}★, ${c.reviews || 0} reviews, Category: ${c.category || 'Local Business'})`).join('\n')}` : ''}

${deepCheckAnswers ? `Deep Check Answers:\n- Responds to reviews: ${deepCheckAnswers[0] ? 'Yes' : 'No'}\n- Services descriptions: ${deepCheckAnswers[1] ? 'Yes' : 'No'}\n- Recent Google Post: ${deepCheckAnswers[2] ? 'Yes' : 'No'}\n- Description filled: ${deepCheckAnswers[3] ? 'Yes' : 'No'}` : ''}

Write a highly encouraging, authoritative, and personalized 30-day action plan for them in Markdown.
Break it into Week 1 (Foundation, Primary Category & NAP), Week 2 (Reputation & Reviews), Week 3 (Services & Google Updates), and Week 4 (Website Synergy & Citations).
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
      businessName,
      targetLocation,
      totalScore,
      grade,
      pillars,
      actionItems,
      competitors,
      websiteSeo,
      deepCheckAnswers,
    )
  }

  return aiRecommendations
}
