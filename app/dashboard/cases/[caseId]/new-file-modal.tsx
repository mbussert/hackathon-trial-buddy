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
import { Upload } from 'lucide-react'
import NewFileForm from './new-file-form'
import { useParams } from 'next/navigation'

export function NewFileModal({ caseId }: { caseId: string }) {
  const [open, setOpen] = React.useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" title="Upload Document">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={e => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Add a new file or document to the case.</DialogDescription>
          </DialogHeader>
          <NewFileForm caseId={caseId} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="outline" title="Upload Document">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Upload Document</DrawerTitle>
          <DrawerDescription>Add a new file or document to the case.</DrawerDescription>
        </DrawerHeader>
        <NewFileForm caseId={caseId} className="px-4" onSuccess={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
