'use client'

import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'

import NewCaseForm from './new-case-form'
import { Client } from '@/types'

export function NewCaseModal({ clientList }: { clientList: Client[] }) {
  const [open, setOpen] = React.useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Case</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={e => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>New Case</DialogTitle>
            <DialogDescription>Complete all required fields to add a new case.</DialogDescription>
          </DialogHeader>
          <NewCaseForm clients={clientList} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>New Case</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Case</DrawerTitle>
          <DrawerDescription>Complete all required fields to add a new case.</DrawerDescription>
        </DrawerHeader>
        <NewCaseForm clients={clientList} className="px-4" onSuccess={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
