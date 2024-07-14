import prisma from '@/prisma/client'

import { Loader2 } from 'lucide-react'
import { Client, TCase } from '@/types'
import { NewCaseModal } from './new-case-modal'
import { CasesTable } from './cases-table'
import { casesColumns } from './cases-columns'

async function getClientData(userId: string): Promise<any[]> {
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

async function getCasesData(userId: string): Promise<any[]> {
  try {
    const userCases: TCase[] = await prisma.cases.findMany({
      where: {
        attorneyId: userId,
      },
      include: {
        client: true,
      },
    })
    return userCases
  } catch (error: any) {
    console.error('ERROR: ', error.message)
    return []
  }
}

export default async function CasesContent({ user }: { user: string | null }) {
  if (!user) {
    return (
      <div className="mt-6">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  const clientData: Client[] = await getClientData(user)
  const casesData: TCase[] = await getCasesData(user)

  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Cases</h1>
        </div>
        <NewCaseModal clientList={clientData} />
      </header>
      <div className="mt-6">
        <CasesTable columns={casesColumns} data={casesData} />
      </div>
    </>
  )
}
