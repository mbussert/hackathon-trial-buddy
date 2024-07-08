'use server'

import { prisma } from '@/prisma/client'
import { z } from 'zod'

const validationSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'First Name must be at least 1 character.' })
    .max(50, { message: 'First Name must be less than 50 characters.' })
    .trim(),
  last_name: z
    .string()
    .min(1, { message: 'Last Name must be at least 1 character.' })
    .max(50, { message: 'Last Name must be less than 50 characters.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email address.' }).trim(),
  telephone: z.string().min(7, { message: 'Phone Number must be at least 7 digits.' }).trim(),
})

export default async function createClient(_prevState: any, params: FormData, userId: string) {
  const validatedFields = validationSchema.safeParse({
    first_name: params.get('first_name'),
    last_name: params.get('last_name'),
    email: params.get('email'),
    telephone: params.get('telephone'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    }
  }

  const first_name = params.get('first_name') as string
  const last_name = params.get('last_name') as string
  const email = params.get('email') as string
  const telephone = params.get('telephone') as string

  const newClient = await prisma.client.create({
    data: { first_name, last_name, email, telephone, attorneyId: userId },
  })

  console.log(newClient)
}
