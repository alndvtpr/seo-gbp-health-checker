import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address'),
  website: z
    .string()
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
        .url('Please enter a valid website URL (e.g. https://yourwebsite.com or yourwebsite.com)')
        .or(z.literal(''))
    )
    .optional()
    .or(z.literal(''))
    .or(z.null()),
  service: z.string().trim().min(1, 'Please select a service'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters long'),
  hp_website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

