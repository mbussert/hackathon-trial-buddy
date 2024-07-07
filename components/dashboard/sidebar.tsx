'use client'

import _ from 'lodash'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { BriefcaseBusiness, Contact, Home, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NavLinks = [
  { name: 'Home', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
  {
    name: 'My Cases',
    path: '/dashboard/cases',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    name: 'Clients',
    path: '/dashboard/clients',
    icon: <Contact className="h-5 w-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <h1>TB</h1>
          </Link>
          {_.map(NavLinks, navLink => {
            return (
              <Tooltip key={navLink.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={navLink.path}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                      isActive(navLink.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {navLink.icon}
                    <span className="sr-only">{navLink.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{navLink.name}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                  isActive('/dashboard/settings')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  )
}
