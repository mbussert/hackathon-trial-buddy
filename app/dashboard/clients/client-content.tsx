import { prisma } from '@/prisma/client'
import { columns } from './client-columns'
import { ClientTable } from './client-table'
import { NewClientModal } from './new-client-modal'
import { Loader2 } from 'lucide-react'
import { Client } from '@/types'

async function getData(userId: string): Promise<any[]> {
  try {
    const userClients: Client[] = await prisma.client.findMany({
      where: {
        attorneyId: userId,
      },
    })
    return userClients
  } catch (error: any) {
    console.error('ERROR: ', error.message)
    return []
  }
}

export default async function ClientContent({ user }: { user: string | null }) {
  if (!user) {
    return (
      <div className="mt-6">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  const data: Client[] = await getData(user)

  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>
        <NewClientModal />
      </header>
      <div className="mt-6">
        <ClientTable columns={columns} data={data} />
      </div>
    </>
  )
}
