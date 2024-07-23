'use server'

import { prisma } from '@/prisma/client'
import { newCaseFormSchema } from './form-schema'
import { revalidatePath } from 'next/cache'

export type FormState = {
  message: string
  error: boolean
  fields?: Record<string, string>
}

export async function createNewCase(
  userId: string,
  _prevStat: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsedData = newCaseFormSchema.safeParse(formData)

  if (!userId) {
    return {
      message: 'No user found. Please try again.',
      error: true,
    }
  }

  if (!parsedData.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      message: 'Invalid form data',
      error: true,
      fields,
    }
  }

  const { client, defendant, case_number } = parsedData.data

  await prisma.case.create({
    data: {
      plaintiffs: ['John Doe'],
      defendants: [defendant],
      case_number,
      clientId: client,
      attorneyId: userId,
    },
  })

  revalidatePath('/dashboard/cases')

  return {
    message: `Case successfully created!`,
    error: false,
  }
}
