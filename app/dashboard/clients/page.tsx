'use server'

import { ClientTable } from './client-table'
import { columns, Payment } from './client-columns'

import { Button } from '@/components/ui/button'
import { NewClientModal } from './new-client-modal'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '3242efa',
      amount: 200,
      status: 'success',
      email: 'ooga@booga.com',
    },
  ]
}

export default async function ClientsPage() {
  const data = await getData()

  return (
    <section className="flex-1 p-4 md:p-6">
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>
        <NewClientModal />
      </header>
      <div className="mt-6">
        <ClientTable columns={columns} data={data} />
      </div>
    </section>
  )
}
