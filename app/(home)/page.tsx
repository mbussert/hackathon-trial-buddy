'use server'

import { Navbar } from '@/components/layout/navbar'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
    </main>
  )
}
