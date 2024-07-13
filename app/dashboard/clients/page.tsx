import { auth } from '@clerk/nextjs/server'
import ClientContent from './client-content'

export default async function ClientsPage() {
  const { userId } = auth()
  return (
    <section className="flex-1 p-4 md:p-6">
      <ClientContent user={userId || null} />
    </section>
  )
}
