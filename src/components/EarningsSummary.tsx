import { Card, CardContent } from '@/components/ui/card'

interface EarningsSummaryProps {
  total: number
  awaited: number
  overdue: number
}

export const EarningsSummary = ({ total, awaited, overdue }: EarningsSummaryProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <Card className='bg-white'>
        <CardContent>
          <p className=' text-xs font-semibold tracking-wide uppercase'>Total Earnings</p>
          <h3 className='text-2xl font-bold text-purple-600'>₹{total.toLocaleString('en-IN')}</h3>
        </CardContent>
      </Card>
      <Card className='bg-white'>
        <CardContent>
          <p className=' text-xs font-semibold tracking-wide uppercase'>Payment Awaited</p>
          <h3 className='text-xl font-bold text-orange-600'>₹{awaited.toLocaleString('en-IN')}</h3>
        </CardContent>
      </Card>
      <Card className='bg-white'>
        <CardContent>
          <p className=' text-xs font-semibold tracking-wide uppercase'>Payment Overdue</p>
          <h3 className='text-xl font-bold text-pink-600'>₹{overdue.toLocaleString('en-IN')}</h3>
        </CardContent>
      </Card>
    </div>
  )
}
