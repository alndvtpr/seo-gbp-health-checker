import type { GBPAuditResponse } from '@/types/gbp'

export interface AuditDeliverables {
  defaultActionPlan: string
  defaultDescription: string
  defaultPositiveTemplate: string
  defaultConstructiveTemplate: string
  defaultKeywords: string[]
}

/**
 * Pure fallback content and keyword generator for GBP audit deliverables.
 * Generates local SEO action plans, business descriptions, review response templates,
 * and high-intent local keywords when AI-generated deliverables are absent.
 */
export function getAuditDeliverables(result: GBPAuditResponse): AuditDeliverables {
  const defaultActionPlan = `### 🎯 30-Day Local SEO Action Plan for ${result.businessName}

**Location:** ${result.location} | **Audit Score:** ${result.totalScore}/100 (**Grade: ${result.grade}**)

#### 📊 Executive Diagnosis
${result.businessName} has an active local presence in ${result.location}. Executing this 4-week structured sprint will resolve high-priority ranking gaps, establish consistent review velocity, and improve local Map Pack visibility.

#### 🗓️ Week 1: Core Foundation & NAP Integrity (Days 1–7)
- **Primary & Secondary Categories**: Align primary category to high-intent search volume and add 2–3 relevant subcategories.
- **Geo-Tagged High-Resolution Media**: Upload 10–15 verified exterior, interior, and team photos.
- **750-Character Description**: Deploy the keyword-optimized description generated in Deliverable 02.

#### 🗓️ Week 2: Review Velocity & Social Proof (Days 8–14)
- **Review Response Checklist**: Work through unanswered customer reviews using the adaptable templates in Deliverable 03.
- **Automated Review Link Flow**: Send direct review shortlinks to recent satisfied customers.

#### 🗓️ Week 3: Service Menu & Google Updates (Days 15–21)
- **Detailed Service Catalog**: Populate every service with itemized descriptions and pricing indicators.
- **Weekly Google Posts**: Publish weekly updates and offers featuring the high-intent keywords in Deliverable 04.

#### 🗓️ Week 4: Website Authority & Local Sync (Days 22–30)
- **Geo-Targeted Meta Tags**: Ensure website title tags and headers mention ${result.location}.
- **Local Citations & Schema**: Validate NAP consistency across key business directories and verify LocalBusiness JSON-LD markup.`

  const defaultDescription =
    result.aiDescription ||
    `Welcome to ${result.businessName}, your premier ${result.primaryCategory || 'local business'} in ${result.location}. We deliver top-rated services, exceptional quality, and dedicated customer care crafted to exceed expectations. Conveniently situated in ${result.location}, our team is committed to unmatched quality. Browse our services, check customer reviews, or contact us today for rates, bookings, and inquiries!`

  const defaultPositiveTemplate = `Hi [Customer Name]! Thank you so much for the 5-star review and kind words about your experience with ${result.businessName} in ${result.location}. Our entire team takes immense pride in delivering top-tier service and memorable customer satisfaction. We truly appreciate your patronage and look forward to welcoming you back soon!`

  const defaultConstructiveTemplate = `Hello [Customer Name], thank you for taking the time to share your honest feedback regarding your visit to ${result.businessName} in ${result.location}. We strive to provide the best possible experience and sincerely regret that we fell short of your expectations. We would love the opportunity to make this right. Please contact our management directly so we can address your concerns immediately.`

  const defaultKeywords =
    result.aiKeywords && result.aiKeywords.length > 0
      ? result.aiKeywords
      : [
          `${result.businessName} ${result.location}`,
          `best ${result.primaryCategory?.toLowerCase() || 'services'} in ${result.location}`,
          `${result.businessName} rates and reviews`,
          `top rated ${result.primaryCategory?.toLowerCase() || 'services'} near me`,
          `${result.location} contact and booking`,
        ]

  return {
    defaultActionPlan,
    defaultDescription,
    defaultPositiveTemplate,
    defaultConstructiveTemplate,
    defaultKeywords,
  }
}

export const getAuditFallbackDeliverables = getAuditDeliverables
