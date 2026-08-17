import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL (e.g. https://example.com)' })
    .or(z.literal(''))
    .optional(),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  hp_website: z.string().max(0, { message: 'Spam detected.' }).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
