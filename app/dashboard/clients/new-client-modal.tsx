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

import NewClientForm from './new-client-form'

export function NewClientModal() {
  const [open, setOpen] = React.useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Client</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={e => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>New Client</DialogTitle>
            <DialogDescription>Complete all required fields to add a new client.</DialogDescription>
          </DialogHeader>
          <NewClientForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>New Client</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Client</DrawerTitle>
          <DrawerDescription>Complete all required fields to add a new client.</DrawerDescription>
        </DrawerHeader>
        <NewClientForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
