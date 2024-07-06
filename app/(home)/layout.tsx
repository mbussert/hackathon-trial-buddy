import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '../../styles/globals.css'

import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar'

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
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
