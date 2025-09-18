import { Card, CardContent } from '@/components/ui/card'
import { type ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
  actionButton?: ReactNode
  className?: string
}

export const EmptyState = ({ icon, title, description, className = '' }: EmptyStateProps) => {
  return (
    <Card className={`rounded-xl ${className}`}>
      <CardContent className='flex flex-col items-center justify-center py-8 text-center'>
        <div className='mx-auto mb-3 text-gray-500'>{icon}</div>
        <h3 className='text-sm font-medium text-gray-700'>{title}</h3>
        {description && <p className='mt-1 text-xs text-gray-500'>{description}</p>}
      </CardContent>
    </Card>
  )
}
