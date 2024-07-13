'use client'

import { ColumnDef, FilterFn } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
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
import { Client } from '@/types'
import Link from 'next/link'
import { deleteClient } from './actions'
import { toast } from 'sonner'

const multiColumnFilterFn: FilterFn<Client> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.first_name} ${row.original.last_name} ${row.original.email} ${row.original.id} ${row.original.telephone}`
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase())
}

export const columns: ColumnDef<Client>[] = [
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
    header: 'Name',
    accessorFn: row => `${row.first_name} ${row.last_name}`,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: 'telephone',
    header: 'Telephone',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const handleDeleteClient = async () => {
        const response = await deleteClient(row.original.id)
        if (!response.error) {
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      }
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
              <Link href={`/dashboard/clients/${row.original.id}`}>View Client</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Case</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 " onClick={handleDeleteClient}>
              Delete Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
