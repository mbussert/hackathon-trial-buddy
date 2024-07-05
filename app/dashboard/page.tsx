'use server'

import { DashboardContent } from '@/components/dashboard/content'

export default async function DashboardHome() {
  return (
    <main>
      <DashboardContent />
    </main>
  )
}
