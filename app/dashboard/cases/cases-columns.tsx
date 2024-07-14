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

const multiColumnFilterFn: FilterFn<TCase> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.defendant} ${row.original.case_number} ${row.original.id} ${row.original.client.first_name} ${row.original.client.last_name} ${row.original.client.email}`
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
    accessorKey: 'defendant',
    header: 'Defendant',
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
