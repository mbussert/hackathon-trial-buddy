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

import { createNewCase } from './actions'
import { newCaseFormSchema } from './form-schema'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Client } from '@/types'

type NewCaseFormProps = {
  className?: string
  onSuccess: () => void
  clients: Client[]
}

export default function NewCaseForm({ className, onSuccess, clients }: NewCaseFormProps) {
  const { user } = useUser()
  const router = useRouter()
  const userId = user?.id || ''
  const createNewCaseWithId = createNewCase.bind(null, userId)
  const [state, formAction] = useFormState(createNewCaseWithId, { message: '', error: false })
  const { pending } = useFormStatus()

  const form = useForm<z.output<typeof newCaseFormSchema>>({
    resolver: zodResolver(newCaseFormSchema),
    defaultValues: {
      client: '',
      defendant: state?.fields?.defendant || '',
      case_number: state?.fields?.case_number || '',
    },
    mode: 'all',
  })

  React.useEffect(() => {
    if (state?.message) {
      if (state?.error) {
        toast.error(state.message, { id: 'newCaseError' })
      } else {
        router.refresh()
        onSuccess()
        toast.success(state.message, { id: 'newCaseCreated' })
      }
    }
  }, [state, onSuccess, router])

  return (
    <Form {...form}>
      <form action={formAction} className={cn('grid items-start gap-4', className)}>
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client to associate this case to." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map(client => {
                    return (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {`${client.first_name} ${client.last_name}`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defendant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Defendant</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="case_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid || pending} type="submit">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add New Case'}
        </Button>
      </form>
    </Form>
  )
}
