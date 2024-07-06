'use server'

import { SignUp } from '@clerk/nextjs'

export default async function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  )
}
