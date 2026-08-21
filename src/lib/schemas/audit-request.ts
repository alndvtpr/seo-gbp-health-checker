import { z } from 'zod'

export const websiteAuditRequestSchema = z.object({
  website: z
    .string()
    .min(1, 'Please enter your website URL')
    .transform((val) => {
      if (!val || val.trim() === '') return ''
      const trimmed = val.trim()
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`
      }
      return trimmed
    })
    .pipe(
      z
        .string()
        .url('Please enter a valid website URL (e.g. https://yourwebsite.com or domain.com)'),
    ),
  email: z.string().email('Please enter a valid email address'),
  name: z.string().max(100, 'Name is too long').optional().or(z.literal('')),
  focus: z.string().max(100).optional().or(z.literal('')),
  notes: z.string().max(1000).optional().or(z.literal('')),
  hp_website: z.string().max(0).optional().or(z.literal('')),
})

export type WebsiteAuditRequestData = z.infer<typeof websiteAuditRequestSchema>
