import { type FC } from 'react'

export type Status = 'Paid' | 'Unpaid' | 'Disputed' | 'Partially Paid' | 'Overdue' | 'Awaited' | 'Draft'

interface StatusBadgeProps {
  status: Status
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const colors: Record<Status, string> = {
    Paid: 'bg-green-100 text-green-600',
    Unpaid: 'bg-gray-100 text-gray-600',
    Disputed: 'bg-red-100 text-red-600',
    'Partially Paid': 'bg-yellow-100 text-yellow-600',
    Overdue: 'bg-pink-100 text-pink-600',
    Awaited: 'bg-orange-100 text-orange-600',
    Draft: 'bg-gray-200 text-gray-700'
  }

  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${colors[status]}`}>{status}</span>
}
