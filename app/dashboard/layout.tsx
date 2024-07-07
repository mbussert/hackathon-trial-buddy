import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '../../styles/globals.css'

import { cn } from '@/lib/utils'
import Sidebar from '@/components/dashboard/sidebar'
import DashboardNav from '@/components/dashboard/dashboard-nav'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Trial-Buddy | PXCI Hackathon 2024',
  description: 'Powered by Prisma, Xata, Clerk, and Inngest.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <div className="flex min-h-screen w-full flex-col bg-background">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <DashboardNav />
              <main>{children}</main>
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  )
}
