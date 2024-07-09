'use client'

import _ from 'lodash'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { PanelLeft, Search, Settings } from 'lucide-react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NavLinks } from './sidebar'
import HeaderBreadcrumb from './header-breadcrumb'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet'
import { cn } from '@/lib/utils'

export default function DashboardNav() {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  const sideNavLinks = [
    ...NavLinks,
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ]
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <h1>TB</h1>
            </Link>
            {_.map(sideNavLinks, navLink => {
              return (
                <SheetClose key={navLink.name} asChild>
                  <Link
                    href={navLink.path}
                    className={cn(
                      'flex items-center gap-4 px-2.5 hover:text-foreground',
                      isActive(navLink.path) ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {navLink.icon}
                    {navLink.name}
                  </Link>
                </SheetClose>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <HeaderBreadcrumb />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  )
}
