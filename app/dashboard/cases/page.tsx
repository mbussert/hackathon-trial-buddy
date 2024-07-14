'use server'

import { auth } from '@clerk/nextjs/server'
import CasesContent from './cases-content'

export default async function CasesPage() {
  const { userId } = auth()
  return (
    <section className="flex-1 p-4 md:p-6">
      <CasesContent user={userId || null} />
    </section>
  )
}
