'use server'

import HomepageContent from '@/components/home-page/content'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HomepageContent />
    </main>
  )
}
