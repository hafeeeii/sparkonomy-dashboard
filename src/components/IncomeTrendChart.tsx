// src/components/IncomeTrendChart.tsx
import { Card, CardContent } from '@/components/ui/card'
import { BarChart2 } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { EmptyState } from './EmptyState'

export interface IncomeData {
  month: string
  income: number
  momGrowth: number
}

interface IncomeTrendChartProps {
  data: IncomeData[]
}

const CustomTooltip = ({
  active,
  payload
}: {
  active: boolean
  label?: string | number
  payload: {
    payload: {
      momGrowth: number
      income: number
      month: string
    }
  }[]
}) => {
  if (active && payload && payload.length > 0) {
    const dataPoint = payload[0].payload
    const { month, income, momGrowth } = dataPoint

    return (
      <div className='rounded-md border border-gray-200 bg-white p-2 shadow-lg'>
        <p className='text-sm font-medium text-gray-900'>{month}</p>
        <p className='text-xs text-purple-600'>Income: ₹{income.toLocaleString('en-IN')}</p>
        <p className='text-xs text-red-600'>MoM Growth: {momGrowth}%</p>
      </div>
    )
  }
  return null
}

export const IncomeTrendChart = ({ data }: IncomeTrendChartProps) => {
  if (data.length === 0) {
    return <EmptyState icon={<BarChart2 />} title='No data found for selected period.' />
  }

  return (
    <Card className='rounded-xl'>
      <CardContent>
        <h3 className='mb-2 text-sm font-medium'>Income Trend</h3>
        <p className='mb-4 text-xs text-gray-500'>Your monthly income and growth for the selected period.</p>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart data={data} barSize={12}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis dataKey='month' tick={{ fontSize: 10 }} />
            <YAxis
              domain={[0, 'auto']}
              tickFormatter={value => `₹${value.toLocaleString('en-IN')}`}
              tick={{ fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              domain={['auto', 'auto']}
              tickFormatter={value => `${value}%`}
              tick={{ fontSize: 10 }}
              tickLine={false}
            />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar dataKey='income' fill='#9810fa ' name='Income' />
            <Line yAxisId='right' dataKey='momGrowth' stroke='#DC2626' strokeWidth={2} dot={false} name='MoM Growth' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
