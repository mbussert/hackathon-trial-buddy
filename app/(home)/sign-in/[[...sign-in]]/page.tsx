'use server'

import { Navbar } from '@/components/layout/navbar'
import { SignIn } from '@clerk/nextjs'

export default async function Page() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center py-24">
        <SignIn forceRedirectUrl="/dashboard" />
      </div>
    </>
  )
}
