'use server'

import { UserProfile } from '@clerk/nextjs'

export default async function SettingsPage() {
  return (
    <section>
      <UserProfile />
    </section>
  )
}
