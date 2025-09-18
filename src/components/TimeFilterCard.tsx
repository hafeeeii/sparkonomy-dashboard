import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Crown } from 'lucide-react'
import { useState } from 'react'

export type Period = '1 Month' | '3 Months' | '1 Year' | 'Custom'

interface TimeFilterCardProps {
  dateFrom: Date | undefined
  dateTo: Date | undefined
  showCustomPicker: boolean
  onFilterChange: (period: Period) => void
  onDateFromChange: (date: Date | undefined) => void
  onDateToChange: (date: Date | undefined) => void
}

export const TimeFilterCard = ({
  dateFrom,
  dateTo,
  showCustomPicker,
  onFilterChange,
  onDateFromChange,
  onDateToChange
}: TimeFilterCardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1 Year')

  return (
    <Card className='rounded-2xl'>
      <CardContent>
        <div className='mb-3 flex items-center justify-between'>
          <span className='text-sm font-medium'>Time Period</span>
          {dateFrom && dateTo && (
            <span className='text-xs text-gray-500'>
              {dateFrom.toLocaleDateString()} – {dateTo.toLocaleDateString()}
            </span>
          )}
        </div>
        <div className='flex flex-wrap gap-2'>
          {(['1 Month', '3 Months', '1 Year', 'Custom'] as const).map(period => (
            <Button
              key={period}
              size='sm'
              variant={'outline'}
              className={cn(
                'text-muted-foreground rounded-full shadow-none',
                selectedPeriod === period ? 'bg-accent/10' : ''
              )}
              onClick={() => {
                onFilterChange(period)
                setSelectedPeriod(period)
              }}
            >
              <div className={period === selectedPeriod ? 'gradient-text' : ''}>
                {period === '1 Year' ? (
                  <div className='flex items-center gap-1'>
                    <span>1 Year</span>
                    <Crown className='size-4 text-yellow-500' />
                  </div>
                ) : (
                  <span>{period}</span>
                )}
              </div>
            </Button>
          ))}
        </div>

        {showCustomPicker && (
          <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='flex-1 justify-start text-left font-normal'>
                  {dateFrom ? dateFrom.toLocaleDateString() : 'From Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={dateFrom} onSelect={onDateFromChange} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='flex-1 justify-start text-left font-normal'>
                  {dateTo ? dateTo.toLocaleDateString() : 'To Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={dateTo} onSelect={onDateToChange} />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
