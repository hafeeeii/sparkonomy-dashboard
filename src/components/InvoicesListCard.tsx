import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { InvoiceItem, type Invoice } from './InvoiceItem'
import { EmptyState } from './EmptyState'

interface InvoicesListCardProps {
  invoices: Invoice[]
  onEdit: (id: string) => void
  onRemind: (id: string) => void
}

export const InvoicesListCard = ({ invoices, onEdit, onRemind }: InvoicesListCardProps) => {
  if (invoices.length === 0) {
    return <EmptyState icon={<FileText />} title='No invoices found for selected period.' />
  }

  return (
    <Card className='rounded-2xl'>
      <CardContent className='p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>Your Invoices</h2>
          <Button size='sm' variant='outline'>
            See All
          </Button>
        </div>
        <div className='space-y-3'>
          {invoices.map(inv => (
            <InvoiceItem key={inv.id} invoice={inv} onEdit={onEdit} onRemind={onRemind} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
