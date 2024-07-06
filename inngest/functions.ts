import { inngest } from './client'
import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Functions exported from this file are exposed to Inngest
// See: @/app/api/inngest/route.ts

export const messageSent = inngest.createFunction(
  { id: 'message-sent' }, // Each function should have a unique ID
  { event: 'app/message.sent' }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    // Fetch data from the database
    const message = await prisma.messages.findUnique({
      where: {
        xata_id: event.data.messageId,
      },
    })

    if (!message) {
      return
    }

    // You can execute code that interacts with external services
    // All code is retried automatically on failure
    // Read more about Inngest steps: https://www.inngest.com/docs/learn/inngest-steps
    const reply = await step.run('create-reply', async () => {
      if (OPENAI_API_KEY) {
        const openai = new OpenAI()
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant. Create a funny reply to my message:',
            },
            { role: 'user', content: message?.text },
          ],
          model: 'gpt-3.5-turbo',
        })
        return completion.choices[0]?.message.content ?? 'Unexpected OpenAI response'
      } else {
        return 'Add OPENAI_API_KEY environment variable to get AI responses.'
      }
    })

    const newMessage = await step.run('add-reply-to-message', async () => {
      return await prisma.messages.create({
        data: { text: reply, author: 'AI' },
      })
    })

    return { event, body: `Here's your last message: ${newMessage?.text}!` }
  },
)

export const syncUser = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },

  async ({ event, prisma }) => {
    const user = event.data
    const { id, first_name, last_name } = user

    let email = user.email_addresses.find((e: any) => e.id === user.primary_email_address_id).email

    if (!email) {
      email = user.email_addresses[0].email_address
    }

    const saveUser = await prisma.users.create({ data: { id, email, first_name, last_name } })

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
