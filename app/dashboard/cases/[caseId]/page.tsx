import prisma from '@/prisma/client'
import CaseContent from './case-content'

async function getData(caseId: string) {
  try {
    const data = await prisma.cases.findUnique({
      where: {
        id: caseId,
      },
    })
    return data
  } catch (error: any) {
    console.log('Error: ', error.message)
    return []
  }
}

export default async function CasePage({ params }: { params: { caseId: string } }) {
  const caseData = await getData(params.caseId)
  return (
    <section className="flex-1 p-4 md:p-6">
      <CaseContent caseData={caseData} />
    </section>
  )
}
