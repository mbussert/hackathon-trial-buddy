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

import { createNewClient } from './actions'
import { newClientFormSchema } from './form-schema'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

type NewClientFormProps = {
  className?: string
  onSuccess: () => void
}

export default function NewClientForm({ className, onSuccess }: NewClientFormProps) {
  const { user } = useUser()
  const router = useRouter()
  const userId = user?.id || ''
  const createNewClientWithId = createNewClient.bind(null, userId)
  const [state, formAction] = useFormState(createNewClientWithId, { message: '', error: false })
  const { pending } = useFormStatus()

  const form = useForm<z.output<typeof newClientFormSchema>>({
    resolver: zodResolver(newClientFormSchema),
    defaultValues: {
      first_name: state?.fields?.first_name || '',
      last_name: state?.fields?.last_name || '',
      email: state?.fields?.email || '',
      telephone: state?.fields?.telephone || '',
    },
    mode: 'all',
  })

  React.useEffect(() => {
    if (state?.message) {
      if (state?.error) {
        toast.error(state.message, { id: 'newClientError' })
      } else {
        router.refresh()
        onSuccess()
        toast.success(state.message, { id: 'newClientCreated' })
      }
    }
  }, [state, onSuccess, router])

  return (
    <Form {...form}>
      <form action={formAction} className={cn('grid items-start gap-4', className)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jane@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid || pending} type="submit">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add New Client'}
        </Button>
      </form>
    </Form>
  )
}
