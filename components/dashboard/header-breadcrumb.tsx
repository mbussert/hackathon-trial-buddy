'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function HeaderBreadcrumb() {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathNames.length === 1 ? (
          <BreadcrumbPage>
            {pathNames[0][0].toUpperCase() + pathNames[0].slice(1, pathNames[0].length)}
          </BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
        {pathNames.slice(1).map((link, index) => {
          const href = pathNames.slice(0, index + 2).join('/')
          const linkName = link[0].toUpperCase() + link.slice(1, link.length)
          const isLastPath = index === pathNames.length - 2
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLastPath ? (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < pathNames.length - 2 && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
