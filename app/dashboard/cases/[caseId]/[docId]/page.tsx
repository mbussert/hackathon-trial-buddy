import prisma from '@/prisma/client'
import DocumentContent from './document-content'

async function getData(docId: string) {
  try {
    const data = await prisma.case_docs.findUnique({
      where: {
        xata_id: docId,
      },
    })
    return data
  } catch (error: any) {
    console.log('Error: ', error.message)
    return []
  }
}

export default async function DocPage({ params }: { params: { docId: string } }) {
  const docData = await getData(params.docId)

  return (
    <section className="flex-1 p-4 md:p-6">
      <DocumentContent docData={docData} />
    </section>
  )
}
