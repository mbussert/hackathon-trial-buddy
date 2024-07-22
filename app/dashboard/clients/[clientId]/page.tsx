import { prisma } from '@/prisma/client'

async function getData(clientId: string) {
  try {
    const data = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })
    return data
  } catch (error: any) {
    console.log('Error: ', error.message)
    return []
  }
}

export default async function ClientPage({ params }: { params: { clientId: string } }) {
  const clientData = await getData(params.clientId)
  return (
    <section className="flex-1 p-4 md:p-6">
      Client: {clientData?.first_name} {clientData?.last_name}
    </section>
  )
}
