import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
    .or(z.null()),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  hp_website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
