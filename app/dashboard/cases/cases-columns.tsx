'use client'

import { ColumnDef, FilterFn } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TCase } from '@/types'
import Link from 'next/link'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const multiColumnFilterFn: FilterFn<TCase> = (row, columnId, filterValue) => {
  const plaintiffs = row.original.plaintiffs.join(' ')
  const defendants = row.original.defendants.join(' ')

  const searchableRowContent = `${plaintiffs} ${defendants} ${row.original.court} ${row.original.case_number} ${row.original.id} ${row.original.client.first_name} ${row.original.client.last_name} ${row.original.client.email}`
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase())
}

export const casesColumns: ColumnDef<TCase>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Case Number',
    accessorKey: 'case_number',
    filterFn: multiColumnFilterFn,
  },
  {
    accessorFn: row => `${row.client.first_name} ${row.client.last_name}`,
    header: 'Client',
  },
  {
    accessorKey: 'plaintiffs',
    header: 'Plaintiff(s)',
    cell: ({ row }) => {
      const plaintiffsArr: string[] = row.original.plaintiffs
      let displayValue = plaintiffsArr[0]

      if (plaintiffsArr.length > 1) {
        displayValue = `${plaintiffsArr[0]}, et al.`
      }

      return plaintiffsArr.length > 1 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>{displayValue}</p>
            </TooltipTrigger>
            <TooltipContent>
              {row.original.plaintiffs.map((plaintiff, index) => {
                return <p key={plaintiff + index}>{plaintiff}</p>
              })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p>{displayValue}</p>
      )
    },
  },
  {
    accessorKey: 'defendants',
    header: 'Defendant(s)',
    cell: ({ row }) => {
      const defendantsArr: string[] = row.original.defendants
      let displayValue = defendantsArr[0]

      if (defendantsArr.length > 1) {
        displayValue = `${defendantsArr[0]}, et al.`
      }

      return defendantsArr.length > 1 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>{displayValue}</p>
            </TooltipTrigger>
            <TooltipContent>
              {row.original.defendants.map((defendant, index) => {
                return <p key={defendant + index}>{defendant}</p>
              })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p>{displayValue}</p>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/cases/${row.original.id}`}>View Case</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 ">Delete Case</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
