'use client'

import * as React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

const newClientFormSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: 'First Name must be at least 1 character.' })
    .max(50, { message: 'First Name must be less than 50 characters.' })
    .trim(),
  lastname: z
    .string()
    .min(1, { message: 'Last Name must be at least 1 character.' })
    .max(50, { message: 'Last Name must be less than 50 characters.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email address.' }).trim(),
  phonenumber: z.string().min(7, { message: 'Phone Number must be at least 7 digits.' }).trim(),
})

export default function NewClientForm({ className }: React.ComponentProps<'form'>) {
  const form = useForm<z.infer<typeof newClientFormSchema>>({
    resolver: zodResolver(newClientFormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
    },
  })

  function onSubmit(values: z.infer<typeof newClientFormSchema>) {
    console.log('Values: ', values)
  }

  return (
    <Form {...form}>
      <form
        className={cn('grid items-start gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstname"
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
          name="lastname"
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
          name="phonenumber"
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
        <Button type="submit">Add New Client</Button>
      </form>
    </Form>
  )
}
