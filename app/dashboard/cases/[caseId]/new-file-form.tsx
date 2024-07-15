'use client'

import * as React from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormState, useFormStatus } from 'react-dom'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { uploadFile } from './actions'
import { newFileSchema } from './new-file-schema'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { caseFileTypes } from '@/lib/constants'

type NewFileFormProps = {
  className?: string
  onSuccess: () => void
  caseId: string
}

export default function NewFileForm({ className, onSuccess, caseId }: NewFileFormProps) {
  const createNewCaseWithId = uploadFile.bind(null, caseId)
  const [state, formAction] = useFormState(createNewCaseWithId, { message: '', error: false })
  const { pending } = useFormStatus()

  const form = useForm<z.output<typeof newFileSchema>>({
    resolver: zodResolver(newFileSchema),
    defaultValues: {
      file: null,
      type: '',
    },
    mode: 'all',
  })

  React.useEffect(() => {
    if (state?.message) {
      if (state?.error) {
        toast.error(state.message, { id: 'newClientError' })
      } else {
        onSuccess()
        toast.success(state.message, { id: 'newClientCreated' })
      }
    }
  }, [state, onSuccess])

  return (
    <Form {...form}>
      <form action={formAction} className={cn('grid items-start gap-4', className)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input {...field} type="file" accept="application/pdf" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a document type for this file." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {caseFileTypes.map(type => {
                    return (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!form.formState.isValid || pending} type="submit">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add New File'}
        </Button>
      </form>
    </Form>
  )
}
