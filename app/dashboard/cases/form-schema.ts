import { z } from 'zod'

export const newCaseFormSchema = z.object({
  client: z.string(),
  defendant: z
    .string()
    .trim()
    .min(1, { message: 'Defendant must be at least 1 character.' })
    .max(50, { message: 'Defendant must be less than 50 characters.' }),
  case_number: z
    .string()
    .trim()
    .min(1, { message: 'Case Number must be at least 1 character.' })
    .max(50, { message: 'Case Number must be less than 50 characters.' }),
})
