import { Bell, Pencil } from 'lucide-react'
import { StatusBadge, type Status } from './StatusBadge'

export interface Invoice {
  id: string
  client: string
  amount: number
  due: string
  status: Status
}

interface InvoiceItemProps {
  invoice: Invoice
  onEdit: (id: string) => void
  onRemind: (id: string) => void
}

export const InvoiceItem = ({ invoice, onEdit, onRemind }:InvoiceItemProps) => {
  return (
    <div className='flex items-center justify-between rounded-xl border px-3 py-2 hover:bg-gray-50 transition'>
      <div>
        <p className='text-sm font-medium'>{invoice.client}</p>
        <p className='text-xs text-gray-500'>
          ₹{invoice.amount.toLocaleString('en-IN')}, Due: {invoice.due}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <StatusBadge status={invoice.status} />
        {['Unpaid', 'Overdue'].includes(invoice.status) && (
          <Bell
            className='h-4 w-4 cursor-pointer text-gray-400 hover:text-orange-500'
            onClick={() => onRemind(invoice.id)}
          />
        )}
        {invoice.status === 'Draft' && (
          <Pencil
            className='h-4 w-4 cursor-pointer text-gray-400 hover:text-blue-500'
            onClick={() => onEdit(invoice.id)}
          />
        )}
      </div>
    </div>
  )
}