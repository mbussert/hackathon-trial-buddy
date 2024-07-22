'use server'

import { prisma } from '@/prisma/client'
import { newClientFormSchema } from './form-schema'
import { revalidatePath, revalidateTag } from 'next/cache'

export type FormState = {
  message: string
  error: boolean
  fields?: Record<string, string>
}

export async function createNewClient(
  userId: string,
  _prevStat: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsedData = newClientFormSchema.safeParse(formData)

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

  const { first_name, last_name, email, telephone } = parsedData.data

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      client: {
        create: {
          first_name,
          last_name,
          email,
          telephone,
        },
      },
    },
  })

  revalidatePath('/dashboard/clients')
  revalidateTag('clients')

  return {
    message: `${parsedData.data.first_name} ${parsedData.data.last_name} successfully created!`,
    error: false,
  }
}

export async function deleteClient(clientId: string): Promise<FormState> {
  if (!clientId) {
    return {
      message: 'No client ID provided. Please try again.',
      error: true,
    }
  }

  const client = await prisma.client.delete({ where: { id: clientId } })

  revalidatePath('/dashboard/clients')

  return {
    message: `${client.first_name} ${client.last_name} has been successfully deleted!`,
    error: false,
  }
}
