import { z } from 'zod'

const MAX_FILE_SIZE = 5000000 // 5 mb
const ACCEPTED_FILE_TYPES = ['application/pdf']

export const newFileSchema = z.object({
  type: z.string(),
  file: z.any(),
  // .refine(
  //   file => ACCEPTED_FILE_TYPES.includes(file?.type),
  //   'Only .pdf files are supported at this time.',
  // ),
})
