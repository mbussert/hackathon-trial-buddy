import { z } from 'zod'

export const newClientFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, { message: 'First Name must be at least 1 character.' })
    .max(50, { message: 'First Name must be less than 50 characters.' }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: 'Last Name must be at least 1 character.' })
    .max(50, { message: 'Last Name must be less than 50 characters.' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  telephone: z.string().trim().min(7, { message: 'Phone Number must be at least 7 digits.' }),
})
