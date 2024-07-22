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

// Functions exported from this file are exposed to Inngest
// See: @/app/api/inngest/route.ts

export const syncUser = inngest.createFunction(
  {
    id: 'sync-user-from-clerk',
    throttle: { limit: 4, period: '60s', key: 'event.data.id' },
    concurrency: { limit: 15 },
    retries: 2,
  },
  { event: 'clerk/user.created' },

  async ({ event, prisma }) => {
    const user = event.data
    const { id, first_name, last_name } = user

    let email = user.email_addresses.find((e: any) => e.id === user.primary_email_address_id).email

    if (!email) {
      email = user.email_addresses[0].email_address
    }

    const userFirst = first_name || 'John'
    const userLast = last_name || 'Doe'

    const saveUser = await prisma.users.create({
      data: { id, email, first_name: userFirst, last_name: userLast },
    })

    return { event, body: `Welcome, ${saveUser?.email}!` }
  },
)

export const deleteUser = inngest.createFunction(
  { id: 'delete-user-from-clerk' },
  { event: 'clerk/user.deleted' },

  async ({ event, prisma }) => {
    const user = event.data
    const { id } = user

    const deletedUser = await prisma.users.delete({ where: { id } })

    return { event, body: deletedUser }
  },
)

export const pdfParse = inngest.createFunction(
  { id: 'parse-pdf-text' },
  { event: 'pdf/parse' },

  async ({ event, step, prisma }) => {
    const parsedText = await step.run('parse-text', async () => {
      return 'Hello'
    })
  },
)

export const summarizePdf = inngest.createFunction(
  {
    id: 'summarize-pdf-text',
    throttle: { limit: 4, period: '60s', key: 'event.data.type' },
    concurrency: { limit: 15 },
    retries: 2,
    onFailure: async ({error, event, step }) => {
      // Failed to summarize, should restore user tokens here
    }
  },
  { event: 'pdf/summarize' },

  async ({ event, step, prisma }) => {
    const { text, title, docId, type } = event.data
    const summary = await step.run('summarize-text', async () => {
      const { prompt, schema }: any = getAiPrompt(type, text, title)

      const { object } = await generateObject({
        model: openai(OPEN_AI_COMPLETION_MODEL),
        schema,
        prompt,
        temperature: 0,
        maxTokens: 1000,
        mode: 'json',
      })

      return object
    })

    await prisma.case_docs.update({
      where: {
        xata_id: docId,
      },
      data: {
        summary: JSON.parse(JSON.stringify(summary)),
      },
    })
  },
)
