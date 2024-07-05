'use server'

import { Navbar } from '@/components/layout/navbar'
import { SignUp } from '@clerk/nextjs'

export default async function Page() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center py-24">
        <SignUp />
      </div>
    </>
  )
}
