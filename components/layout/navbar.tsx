import Link from 'next/link'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

export function Navbar() {
  return (
    <div className="w-full border-b shadow">
      <header className="container flex justify-between  h-16 items-center bg-background">
        <nav className="flex font-medium items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black">
            Trial-Buddy
          </Link>
        </nav>
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-row items-center">
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
          <div className="w-full flex flex-row gap-4 items-center">
            <SignedIn>
              <Link
                href="/dashboard"
                className="font-semibold text-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>
    </div>
  )
}
