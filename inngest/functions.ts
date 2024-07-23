import { inngest } from './client'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import OpenAI from 'openai'
import z from 'zod'
import getAiPrompt from '@/lib/get-ai-prompt'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPEN_AI_EMBEDDING_MODEL = 'text-embedding-3-small'
const OPEN_AI_COMPLETION_MODEL = 'gpt-3.5-turbo-0125'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export const syncUser = inngest.createFunction(
  { id: 'sync-user-from-clerk', name: 'Clerk Sync User Event' },
  [{ event: 'clerk/user.created' }, { event: 'clerk/user.updated' }],

  async ({ event, prisma }) => {
    const { id, first_name, last_name, email_addresses, primary_email_address_id, avatar } =
      event.data

    const email = email_addresses?.find(
      (e: any) => e.id === primary_email_address_id,
    )?.email_address

    if (!email) {
      throw new Error(`No email found for user: ${id}`)
    }

    const saveUser = await prisma.user.upsert({
      where: { id: id },
      update: {
        first_name,
        last_name,
        email,
        avatar,
      },
      create: { id, email, first_name, last_name, avatar },
    })

    return { event, body: `Welcome, ${first_name} ${last_name}!` }
  },
)

export const deleteUser = inngest.createFunction(
  { id: 'delete-user-from-clerk' },
  { event: 'clerk/user.deleted' },

  async ({ event, prisma }) => {
    const user = event.data
    const { id } = user

    const deletedUser = await prisma.user.delete({ where: { id } })

    return { event, body: deletedUser }
  },
)

// export const pdfParse = inngest.createFunction(
//   { id: 'parse-pdf-text' },
//   { event: 'pdf/parse' },

//   async ({ event, step, prisma }) => {
//     const parsedText = await step.run('parse-text', async () => {
//       return 'Hello'
//     })
//   },
// )

// export const summarizePdf = inngest.createFunction(
//   {
//     id: 'summarize-pdf-text',
//     throttle: { limit: 4, period: '60s', key: 'event.data.type' },
//     concurrency: { limit: 15 },
//     retries: 2,
//     onFailure: async ({ error, event, step }) => {
//       // Failed to summarize, should restore user tokens here
//     },
//   },
//   { event: 'pdf/summarize' },

//   async ({ event, step, prisma }) => {
//     const { text, title, docId, type } = event.data
//     const summary = await step.run('summarize-text', async () => {
//       const { prompt, schema }: any = getAiPrompt(type, text, title)

//       const { object } = await generateObject({
//         model: openai(OPEN_AI_COMPLETION_MODEL),
//         schema,
//         prompt,
//         temperature: 0,
//         maxTokens: 1000,
//         mode: 'json',
//       })

//       return object
//     })

//     await prisma.case_File.update({
//       where: {
//         xata_id: docId,
//       },
//       data: {
//         summary: JSON.parse(JSON.stringify(summary)),
//       },
//     })
//   },
// )
