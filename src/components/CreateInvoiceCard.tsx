import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface CreateInvoiceCardProps {
  onClick: () => void
}

export const CreateInvoiceCard = ({ onClick }: CreateInvoiceCardProps) => {
  return (
    <Card className='rounded-3xl bg-gray-100'>
      <CardContent className='flex h-40 flex-col items-center justify-center gap-3 text-center'>
        <PlusCircle className='h-8 w-8 text-purple-600' />
        <div className='space-y-1'>
        <h2 className='gradient-text text-2xl font-bold text-gray-800'>Create New Invoice</h2>
        <p className='text-sm text-gray-500'>Start by creating and sending new invoices</p>
        </div>
        <Button size='sm' onClick={onClick}>
          Create Invoice
        </Button>
      </CardContent>
    </Card>
  )
}
