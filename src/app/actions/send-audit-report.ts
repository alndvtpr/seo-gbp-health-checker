'use server'

import { z } from 'zod'

const publicCheckSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(['passed', 'failed', 'warning']),
  value: z.string().optional(),
  scoreEarned: z.number(),
  maxScore: z.number(),
  impactMessage: z.string(),
})

const pillarSchema = z.object({
  name: z.string(),
  score: z.number(),
  maxScore: z.number(),
  details: z.array(z.string()).optional(),
})

const actionItemSchema = z.object({
  priority: z.enum(['high', 'medium', 'low', 'passed']),
  message: z.string(),
})

const competitorSchema = z.object({
  name: z.string(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  position: z.number(),
  category: z.string().optional(),
})

const websiteSeoSchema = z.object({
  url: z.string(),
  title: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(['success', 'error', 'no_website']).optional(),
})

const reviewTemplatesSchema = z.object({
  positive: z.string(),
  constructive: z.string(),
})

const categoryBenchmarkSchema = z.object({
  isCategoryAlignedWithTopCompetitors: z.boolean().optional(),
  topCompetitorCategories: z.array(z.string()).optional(),
  categoryOptimizationTip: z.string().optional(),
  rawGoogleCategory: z.string().optional(),
  isCategoryMismatchDetected: z.boolean().optional(),
  recommendedPrimaryCategory: z.string().optional(),
  recommendedSecondaryCategories: z.array(z.string()).optional(),
})

const auditEmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(1, 'Business name is required'),
  location: z.string().optional(),
  totalScore: z.number(),
  grade: z.string(),
  primaryCategory: z.string().optional(),
  additionalCategories: z.array(z.string()).optional(),
  foundInMapPack: z.boolean().optional(),
  mapPackPosition: z.number().nullable().optional(),
  pillars: z.array(pillarSchema).optional(),
  publicChecks: z.array(publicCheckSchema).optional(),
  actionItems: z.array(actionItemSchema).optional(),
  competitors: z.array(competitorSchema).optional(),
  websiteSeo: websiteSeoSchema.optional(),
  aiRecommendations: z.string().optional(),
  aiDescription: z.string().optional(),
  aiReviewTemplates: reviewTemplatesSchema.optional(),
  aiKeywords: z.array(z.string()).optional(),
  categoryBenchmark: categoryBenchmarkSchema.optional(),
  topActionItems: z.array(z.string()).optional(),
  hp_website: z.string().optional(),
})

export type AuditEmailData = z.infer<typeof auditEmailSchema>

export interface SendAuditResponse {
  success: boolean
  error?: string
}

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'

function getGradeColor(grade: string): { hex: string; bg: string } {
  const g = grade.trim().toUpperCase()
  if (g.startsWith('A')) {
    return { hex: '#10b981', bg: '#064e3b' }
  }
  if (g.startsWith('B')) {
    return { hex: '#e07b20', bg: '#451a03' }
  }
  if (g.startsWith('C')) {
    return { hex: '#f59e0b', bg: '#451a03' }
  }
  return { hex: '#f43f5e', bg: '#4c0519' }
}

function formatMarkdownToHtml(md: string): string {
  if (!md) return ''
  return md
    .replace(/^#### (.*$)/gim, '<h5 style="color: #ffffff; font-size: 12px; font-weight: 700; margin: 12px 0 4px 0;">$1</h5>')
    .replace(/^### (.*$)/gim, '<h4 style="color: #e07b20; font-size: 13px; font-weight: 700; margin: 14px 0 4px 0; text-transform: uppercase; letter-spacing: 0.05em;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="color: #ffffff; font-size: 14px; font-weight: 800; margin: 16px 0 6px 0;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>')
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li style="margin-bottom: 4px; color: #d1d5db; line-height: 1.5; font-size: 13px;">$1</li>')
    .replace(/\n\n/g, '<br/>')
}

function generateAuditEmailHtml(data: AuditEmailData): string {
  const {
    businessName,
    location,
    totalScore,
    grade,
    primaryCategory,
    additionalCategories,
    foundInMapPack,
    mapPackPosition,
    pillars,
    publicChecks,
    actionItems,
    competitors,
    websiteSeo,
    aiRecommendations,
    aiDescription,
    aiReviewTemplates,
    aiKeywords,
    categoryBenchmark,
  } = data

  const gradeColor = getGradeColor(grade)
  const auditDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // 1. Pillars HTML
  const pillarsHtml =
    pillars && pillars.length > 0
      ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
        <tr>
          ${pillars
            .map(
              (p) => `
            <td style="padding: 6px; width: 33.33%;">
              <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 10px; padding: 14px 10px; text-align: center;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #e07b20; margin-bottom: 4px;">
                  ${p.name}
                </div>
                <div style="font-size: 18px; font-weight: 800; color: #ffffff;">
                  ${p.score}<span style="font-size: 11px; font-weight: 500; color: #9ca3af;">/${p.maxScore}</span>
                </div>
              </div>
            </td>
          `,
            )
            .join('')}
        </tr>
      </table>
    `
      : ''

  // 2. 10-Point Public Diagnostics HTML
  const checksHtml =
    publicChecks && publicChecks.length > 0
      ? `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 8px;">
          🔍 10-Point Public Diagnostic Breakdown
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; overflow: hidden;">
          ${publicChecks
            .map((chk, i) => {
              const icon = chk.status === 'passed' ? '✓' : chk.status === 'warning' ? '⚠️' : '✗'
              const iconColor = chk.status === 'passed' ? '#10b981' : chk.status === 'warning' ? '#f59e0b' : '#f43f5e'
              return `
              <tr style="border-bottom: ${i === publicChecks.length - 1 ? 'none' : '1px solid #232834'};">
                <td style="padding: 10px 14px; width: 28px; vertical-align: top; font-size: 13px; font-weight: bold; color: ${iconColor};">
                  ${icon}
                </td>
                <td style="padding: 10px 14px 10px 0; vertical-align: top;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                    <strong style="font-size: 13px; color: #ffffff;">${chk.label}</strong>
                    <span style="font-size: 11px; font-weight: 700; color: ${iconColor}; margin-left: 8px;">${chk.scoreEarned}/${chk.maxScore} pts</span>
                  </div>
                  ${chk.value ? `<div style="font-size: 12px; color: #9ca3af; font-family: monospace; margin-bottom: 2px;">${chk.value}</div>` : ''}
                  <div style="font-size: 11px; color: #d1d5db; line-height: 1.4;">${chk.impactMessage}</div>
                </td>
              </tr>
            `
            })
            .join('')}
        </table>
      </div>
    `
      : ''

  // 3. Competitors & Category Intelligence HTML
  const competitorsHtml =
    competitors && competitors.length > 0
      ? `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 8px;">
          🧭 Top Local Competitors in ${location || 'Your Area'}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
          ${competitors
            .map(
              (c, i) => `
            <tr style="border-bottom: ${i === competitors.length - 1 ? 'none' : '1px solid #232834'};">
              <td style="padding: 10px 14px; width: 32px; font-size: 12px; font-weight: 800; color: #e07b20;">
                #${c.position}
              </td>
              <td style="padding: 10px 10px 10px 0;">
                <div style="font-size: 13px; font-weight: 700; color: #ffffff;">${c.name}</div>
                ${c.category ? `<div style="font-size: 11px; color: #9ca3af;">🏷️ ${c.category}</div>` : ''}
              </td>
              <td align="right" style="padding: 10px 14px; font-size: 12px; color: #f59e0b; font-weight: 700; white-space: nowrap;">
                ${c.rating ? `${c.rating} ⭐` : 'Unrated'} <span style="font-size: 11px; color: #9ca3af; font-weight: normal;">(${c.reviews || 0})</span>
              </td>
            </tr>
          `,
            )
            .join('')}
        </table>

        ${
          categoryBenchmark?.categoryOptimizationTip
            ? `
          <div style="background-color: rgba(224, 123, 32, 0.1); border: 1px solid rgba(224, 123, 32, 0.3); border-radius: 10px; padding: 12px 14px; font-size: 12px; color: #fed7aa; line-height: 1.5;">
            <strong>🏷️ Category Strategy:</strong> ${categoryBenchmark.categoryOptimizationTip}
          </div>
        `
            : ''
        }
      </div>
    `
      : ''

  // 4. Action Items HTML
  const items = actionItems && actionItems.length > 0 ? actionItems : []
  const actionItemsHtml =
    items.length > 0
      ? `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 8px;">
          ⚡ Prioritized Optimization Action Items
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; overflow: hidden;">
          ${items
            .map((item, idx) => {
              const pColor = item.priority === 'high' ? '#f43f5e' : item.priority === 'medium' ? '#f59e0b' : item.priority === 'low' ? '#38bdf8' : '#10b981'
              const pIcon = item.priority === 'high' ? '🔴' : item.priority === 'medium' ? '🟡' : item.priority === 'low' ? '🔵' : '🟢'
              return `
              <tr style="border-bottom: ${idx === items.length - 1 ? 'none' : '1px solid #232834'};">
                <td style="padding: 10px 12px; width: 20px; vertical-align: top; font-size: 12px;">
                  ${pIcon}
                </td>
                <td style="padding: 10px 14px 10px 0; vertical-align: top;">
                  <div style="font-size: 13px; color: #e5e7eb; line-height: 1.45;">${item.message}</div>
                  <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${pColor}; margin-top: 3px;">
                    ${item.priority} Priority
                  </div>
                </td>
              </tr>
            `
            })
            .join('')}
        </table>
      </div>
    `
      : ''

  // 5. Website Signal HTML
  const websiteHtml =
    websiteSeo && websiteSeo.status !== 'no_website'
      ? `
      <div style="margin-bottom: 24px; background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 14px 16px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 8px;">
          🌐 Website & On-Page SEO Signal
        </div>
        <div style="font-size: 12px; color: #9ca3af; margin-bottom: 6px;">
          Linked URL: <a href="${websiteSeo.url}" style="color: #e07b20; text-decoration: underline;">${websiteSeo.url}</a>
        </div>
        ${websiteSeo.title ? `<div style="font-size: 12px; color: #ffffff; margin-bottom: 4px;"><strong>Title:</strong> ${websiteSeo.title}</div>` : '<div style="font-size: 12px; color: #f43f5e; margin-bottom: 4px;">⚠ Missing Website Title Tag</div>'}
        ${websiteSeo.metaDescription ? `<div style="font-size: 12px; color: #d1d5db; line-height: 1.4;"><strong>Meta Description:</strong> ${websiteSeo.metaDescription}</div>` : '<div style="font-size: 12px; color: #f43f5e;">⚠ Missing Meta Description</div>'}
      </div>
    `
      : ''

  // 6. AI Strategic Deliverables HTML
  const deliverablesHtml = `
    <div style="margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #e07b20; margin-bottom: 12px;">
        ✨ Alain's AI Strategic Growth Arsenal
      </div>

      <!-- Deliverable 1: 30-Day Sprint Roadmap -->
      ${
        aiRecommendations
          ? `
        <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 18px 20px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: #e07b20; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
            Deliverable 01 • 30-Day Strategic Sprint Roadmap
          </div>
          <div style="font-size: 13px; color: #d1d5db; line-height: 1.6;">
            ${formatMarkdownToHtml(aiRecommendations)}
          </div>
        </div>
      `
          : ''
      }

      <!-- Deliverable 2: 750-Char Bio -->
      ${
        aiDescription
          ? `
        <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 16px 18px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: #e07b20; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
            Deliverable 02 • Keyword-Optimized GBP Description
          </div>
          <div style="background-color: #0c0e12; border: 1px solid #232834; border-radius: 8px; padding: 12px 14px; font-size: 12px; color: #f3f4f6; line-height: 1.5; font-family: monospace; white-space: pre-wrap;">${aiDescription}</div>
        </div>
      `
          : ''
      }

      <!-- Deliverable 3: Review Playbook -->
      ${
        aiReviewTemplates
          ? `
        <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 16px 18px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: #e07b20; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">
            Deliverable 03 • AI Review Response Playbook
          </div>
          <div style="margin-bottom: 10px;">
            <div style="font-size: 11px; font-weight: 700; color: #10b981; margin-bottom: 4px;">5-Star Review Reply:</div>
            <div style="background-color: #0c0e12; border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #e5e7eb; line-height: 1.45;">${aiReviewTemplates.positive}</div>
          </div>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #f59e0b; margin-bottom: 4px;">Constructive / Critical Reply:</div>
            <div style="background-color: #0c0e12; border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #e5e7eb; line-height: 1.45;">${aiReviewTemplates.constructive}</div>
          </div>
        </div>
      `
          : ''
      }

      <!-- Deliverable 4: Keywords & Categories -->
      ${
        (aiKeywords && aiKeywords.length > 0) || (additionalCategories && additionalCategories.length > 0)
          ? `
        <div style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; padding: 16px 18px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: #e07b20; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
            Deliverable 04 • High-Intent Keywords &amp; Secondary Categories
          </div>
          ${
            aiKeywords && aiKeywords.length > 0
              ? `
            <div style="margin-bottom: 8px;">
              <div style="font-size: 11px; color: #9ca3af; margin-bottom: 6px;">Target Local Search Queries:</div>
              <div style="font-size: 12px; color: #f3f4f6; line-height: 1.8;">
                ${aiKeywords.map((kw) => `<span style="display: inline-block; background-color: #262b36; border: 1px solid #3b4252; border-radius: 6px; padding: 3px 8px; margin: 2px 4px 2px 0; font-size: 11px;">🔍 ${kw}</span>`).join('')}
              </div>
            </div>
          `
              : ''
          }
          ${
            additionalCategories && additionalCategories.length > 0
              ? `
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #2d3340;">
              <div style="font-size: 11px; color: #9ca3af; margin-bottom: 6px;">Recommended Secondary Categories:</div>
              <div style="font-size: 12px; color: #10b981; line-height: 1.8;">
                ${additionalCategories.map((c) => `<span style="display: inline-block; background-color: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; padding: 3px 8px; margin: 2px 4px 2px 0; font-size: 11px; font-weight: 600;">+ ${c}</span>`).join('')}
              </div>
            </div>
          `
              : ''
          }
        </div>
      `
          : ''
      }
    </div>
  `

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete GBP Audit Report - ${businessName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0e12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0c0e12; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #12151c; border: 1px solid #262b36; border-radius: 16px; overflow: hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 28px; background: linear-gradient(135deg, rgba(224, 123, 32, 0.18), rgba(16, 185, 129, 0.12)); border-bottom: 1px solid #262b36;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #e07b20; display: block; margin-bottom: 4px;">
                ⚡ Alain Dave Tapiru • Local SEO Engine
              </span>
              <h1 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                Complete GBP Audit &amp; Growth Blueprint
              </h1>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Audited on ${auditDateStr} for <strong style="color: #ffffff;">${businessName}</strong>
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 24px 28px;">
              
              <!-- Business Info & Score Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #171b24; border: 1px solid #2d3340; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle;">
                          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #ffffff;">
                            ${businessName}
                          </h2>
                          <div style="font-size: 13px; color: #9ca3af; margin-bottom: 8px;">
                            ${location ? `📍 ${location}` : ''} ${primaryCategory ? `• 🏷️ ${primaryCategory}` : ''}
                          </div>
                          <div>
                            ${
                              foundInMapPack
                                ? `<span style="display: inline-block; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">✓ Ranked #${mapPackPosition} in Local Map Pack</span>`
                                : `<span style="display: inline-block; background-color: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3); color: #f43f5e; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">✗ Not in Top 10 Local Map Pack</span>`
                            }
                          </div>
                        </td>
                        <td align="right" style="vertical-align: middle; width: 110px;">
                          <div style="display: inline-block; text-align: center; background-color: ${gradeColor.bg}; border: 2px solid ${gradeColor.hex}; border-radius: 12px; padding: 10px 16px;">
                            <div style="font-size: 26px; font-weight: 900; color: ${gradeColor.hex}; line-height: 1;">
                              ${totalScore}
                            </div>
                            <div style="font-size: 10px; font-weight: 600; color: #9ca3af; margin: 2px 0 3px 0;">
                              OUT OF 100
                            </div>
                            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${gradeColor.hex};">
                              Grade ${grade}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 3 Pillars Breakdown -->
              ${pillarsHtml}

              <!-- 10-Point Public Diagnostics -->
              ${checksHtml}

              <!-- Competitor Intelligence & Category -->
              ${competitorsHtml}

              <!-- Website Signals -->
              ${websiteHtml}

              <!-- Priority Action Plan -->
              ${actionItemsHtml}

              <!-- AI Growth Arsenal Deliverables -->
              ${deliverablesHtml}

              <!-- Call to Action Banner -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(224, 123, 32, 0.22), rgba(224, 123, 32, 0.08)); border: 1px solid rgba(224, 123, 32, 0.45); border-radius: 12px; text-align: center; margin-top: 10px;">
                <tr>
                  <td style="padding: 26px 20px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 800; color: #ffffff;">
                      Want Alain to Execute This Local SEO Sprint For You?
                    </h4>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #d1d5db; line-height: 1.5; max-width: 480px; display: inline-block;">
                      I focus on resolving local search citation inconsistencies, optimizing primary/secondary categories, and strengthening Google Map Pack visibility.
                    </p>
                    <div>
                      <a href="https://www.alaintapiru.com/contact/" style="background-color: #e07b20; color: #ffffff; text-decoration: none; padding: 13px 26px; border-radius: 8px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; display: inline-block; box-shadow: 0 4px 16px rgba(224, 123, 32, 0.45);">
                        Book a Free Discovery Call
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 28px; background-color: #0d0f14; border-top: 1px solid #262b36; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #9ca3af; font-weight: 500;">
                Alain Dave G. Tapiru • SEO Specialist &amp; Web Developer
              </p>
              <p style="margin: 0; font-size: 11px; color: #6b7280;">
                <a href="https://www.alaintapiru.com" style="color: #e07b20; text-decoration: none; font-weight: 600;">alaintapiru.com</a> • <a href="mailto:alaintapiru@gmail.com" style="color: #e07b20; text-decoration: none; font-weight: 600;">alaintapiru@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function generateAuditEmailText(data: AuditEmailData): string {
  const {
    businessName,
    location,
    totalScore,
    grade,
    primaryCategory,
    additionalCategories,
    foundInMapPack,
    mapPackPosition,
    pillars,
    publicChecks,
    actionItems,
    competitors,
    websiteSeo,
    aiRecommendations,
    aiDescription,
    aiReviewTemplates,
    aiKeywords,
    categoryBenchmark,
  } = data

  const divider = '=================================================='
  const subDivider = '--------------------------------------------------'

  let text = `${divider}
COMPLETE GBP AUDIT & GROWTH BLUEPRINT
Alain Dave Tapiru • Technical & Local SEO Specialist
${divider}

BUSINESS: ${businessName}
LOCATION: ${location || 'N/A'}
PRIMARY CATEGORY: ${primaryCategory || 'N/A'}
TOTAL HEALTH SCORE: ${totalScore}/100 (Grade ${grade})
MAP PACK RANK: ${foundInMapPack ? `Ranked #${mapPackPosition} in Local Map Pack` : 'Not in Top 10 Map Pack'}

`

  // Pillars
  if (pillars && pillars.length > 0) {
    text += `${subDivider}\nCORE RANKING PILLARS\n${subDivider}\n`
    pillars.forEach((p) => {
      text += `• ${p.name}: ${p.score}/${p.maxScore} pts\n`
    })
    text += '\n'
  }

  // 10-Point Public Diagnostics
  if (publicChecks && publicChecks.length > 0) {
    text += `${subDivider}\n10-POINT PUBLIC DIAGNOSTICS BREAKDOWN\n${subDivider}\n`
    publicChecks.forEach((chk) => {
      const statusIcon = chk.status === 'passed' ? '[PASS]' : chk.status === 'warning' ? '[WARN]' : '[FAIL]'
      text += `${statusIcon} ${chk.label} (${chk.scoreEarned}/${chk.maxScore} pts)\n`
      if (chk.value) text += `   Value: ${chk.value}\n`
      text += `   Impact: ${chk.impactMessage}\n\n`
    })
  }

  // Competitors
  if (competitors && competitors.length > 0) {
    text += `${subDivider}\nTOP LOCAL COMPETITORS IN ${location || 'YOUR AREA'}\n${subDivider}\n`
    competitors.forEach((c) => {
      text += `#${c.position} ${c.name} - ${c.rating || 'N/A'} ⭐ (${c.reviews || 0} reviews)${c.category ? ` [${c.category}]` : ''}\n`
    })
    if (categoryBenchmark?.categoryOptimizationTip) {
      text += `\nCategory Strategy: ${categoryBenchmark.categoryOptimizationTip}\n`
    }
    text += '\n'
  }

  // Website SEO
  if (websiteSeo && websiteSeo.status !== 'no_website') {
    text += `${subDivider}\nWEBSITE & ON-PAGE SEO SIGNAL\n${subDivider}\n`
    text += `URL: ${websiteSeo.url}\n`
    text += `Title: ${websiteSeo.title || 'Missing'}\n`
    text += `Meta Description: ${websiteSeo.metaDescription || 'Missing'}\n\n`
  }

  // Action Items
  if (actionItems && actionItems.length > 0) {
    text += `${subDivider}\nPRIORITIZED OPTIMIZATION ROADMAP\n${subDivider}\n`
    actionItems.forEach((item, i) => {
      text += `${i + 1}. [${item.priority.toUpperCase()}] ${item.message}\n`
    })
    text += '\n'
  }

  // AI Growth Arsenal
  if (aiRecommendations) {
    text += `${subDivider}\nDELIVERABLE 01: 30-DAY SPRINT ROADMAP\n${subDivider}\n${aiRecommendations}\n\n`
  }

  if (aiDescription) {
    text += `${subDivider}\nDELIVERABLE 02: KEYWORD-OPTIMIZED GBP DESCRIPTION\n${subDivider}\n${aiDescription}\n\n`
  }

  if (aiReviewTemplates) {
    text += `${subDivider}\nDELIVERABLE 03: REVIEW RESPONSE PLAYBOOK\n${subDivider}\n5-Star Reply:\n${aiReviewTemplates.positive}\n\nConstructive Reply:\n${aiReviewTemplates.constructive}\n\n`
  }

  if (aiKeywords && aiKeywords.length > 0) {
    text += `${subDivider}\nDELIVERABLE 04: HIGH-INTENT LOCAL KEYWORDS\n${subDivider}\n${aiKeywords.join(', ')}\n\n`
  }

  if (additionalCategories && additionalCategories.length > 0) {
    text += `Recommended Secondary Categories: ${additionalCategories.join(', ')}\n\n`
  }

  text += `${divider}
READY TO STRENGTHEN YOUR LOCAL MAP PACK VISIBILITY?
${divider}
Book a discovery call with Alain Dave Tapiru:
https://www.alaintapiru.com/contact/

Direct Contact:
Alain Dave G. Tapiru
SEO Specialist & Web Developer
Email: alaintapiru@gmail.com
Website: https://www.alaintapiru.com
`

  return text
}

export async function sendAuditReportAction(data: AuditEmailData): Promise<SendAuditResponse> {
  const result = auditEmailSchema.safeParse(data)

  if (!result.success) {
    console.error('Audit report validation error:', result.error)
    return {
      success: false,
      error: result.error.issues[0]?.message || 'Invalid email data.',
    }
  }

  const validatedData = result.data
  const {
    email,
    businessName,
    location,
    totalScore,
    grade,
    primaryCategory,
    actionItems,
    topActionItems,
    hp_website,
  } = validatedData

  // Honeypot spam mitigation
  if (hp_website && hp_website.trim().length > 0) {
    return { success: true }
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL

  const allActions = actionItems?.map((a) => `[${a.priority.toUpperCase()}] ${a.message}`) || topActionItems || []

  const payload = {
    name: `GBP Lead: ${businessName}`,
    email,
    website: location || '',
    service: `GBP Full Audit (${totalScore}/100 - Grade ${grade})`,
    message: `Business: ${businessName}\nLocation: ${location || 'N/A'}\nScore: ${totalScore}/100 (Grade ${grade})\nPrimary Category: ${primaryCategory || 'N/A'}\nTop Action Items:\n${allActions.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
    submittedAt: new Date().toISOString(),
  }

  // 1. Google Sheets Webhook Dispatch (Lead Logging)
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      console.warn(`Google Sheet Webhook returned HTTP ${response.status}`)
    }
  } catch (error) {
    console.error('Google Sheet Webhook audit submission error:', error)
  }

  // 2. Resend Email Dispatch
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM_EMAIL || 'GBP Health Checker <onboarding@resend.dev>'
  const ownerRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'alaintapiru@gmail.com'

  if (resendApiKey) {
    try {
      const emailHtml = generateAuditEmailHtml(validatedData)
      const emailText = generateAuditEmailText(validatedData)

      // Dispatch 1: Send comprehensive report directly to recipient user
      const userResend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: email,
          reply_to: ownerRecipient,
          subject: `📊 Complete GBP Audit & Growth Blueprint: ${businessName} (${totalScore}/100 - Grade ${grade})`,
          html: emailHtml,
          text: emailText,
        }),
      })

      if (!userResend.ok) {
        const errorText = await userResend.text()
        console.error(`Resend user email delivery error (HTTP ${userResend.status}):`, errorText)
      }

      // Dispatch 2: Send lead notification to site owner
      const ownerResend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: ownerRecipient,
          reply_to: email,
          subject: `⚡ New GBP Audit Lead: ${businessName} (${totalScore}/100 - Grade ${grade})`,
          html: emailHtml,
          text: emailText,
        }),
      })

      if (!ownerResend.ok) {
        const errorText = await ownerResend.text()
        console.error(`Resend owner notification delivery error (HTTP ${ownerResend.status}):`, errorText)
      }
    } catch (resendErr) {
      console.error('Resend audit dispatch error:', resendErr)
    }
  } else {
    console.warn(
      `[sendAuditReportAction] RESEND_API_KEY environment variable is not configured. Audit report could not be emailed to ${email}. Lead was recorded to Google Sheets.`,
    )
  }

  return { success: true }
}
