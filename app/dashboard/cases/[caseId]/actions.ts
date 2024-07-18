'use server'

import { newFileSchema } from './new-file-schema'
import { revalidatePath } from 'next/cache'
import { getXataClient } from '@/src/xata'
import { TCase } from '@/types'
import { inngest } from '@/inngest'

export type FormState = {
  message: string
  error: boolean
  fields?: Record<string, string>
}

const xata = getXataClient()

export async function uploadFile(
  caseData: TCase,
  _prevStat: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsedData = newFileSchema.safeParse(formData)

  if (!caseData.id) {
    return {
      message: 'No case found. Please try again.',
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

  const { file, type } = parsedData.data
  const extension = file.name.split('.')[1]
  const fileName = file.name.split('.')[0]

  const record: any = await xata.db.case_docs.create(
    {
      fileName,
      extension,
      type,
      caseId: caseData.id,
      case: caseData.xata_id,
      document: {
        name: fileName,
        mediaType: file.type,
        base64Content: '',
        enablePublicUrl: false,
        signedUrlTimeout: 600,
      },
    },
    ['*', 'document.uploadUrl'],
  )

  await fetch(record?.document?.uploadUrl, { method: 'PUT', body: file })

  const serialized = record.toSerializable()

  const pdfDocument = (await xata.db.case_docs.read(serialized.id, [
    '*',
    'document.signedUrl',
  ])) as any

  const serializedDoc = pdfDocument.toSerializable()

  const parseUrl = `https://r.jina.ai/${serializedDoc.document.signedUrl}`

  const parsedText = await fetch(parseUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.JINA_KEY}`,
      Accept: 'application/json',
    },
  })

  const jsonText = await parsedText.json()

  await xata.db.case_docs.update(serialized.id, { parsedText: jsonText.data })

  await inngest.send({
    name: 'pdf/summarize',
    data: {
      title: jsonText?.data?.title,
      text: jsonText?.data?.content,
      docId: serialized.id,
    },
  })

  revalidatePath(`/dashboard/cases/${caseData.id}`)

  return {
    message: `${fileName}.${extension} successfully uploaded!`,
    error: false,
  }
}
