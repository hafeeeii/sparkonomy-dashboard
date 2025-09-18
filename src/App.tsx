import { useState } from 'react'

import { CreateInvoiceCard } from './components/CreateInvoiceCard'
import { CreateInvoiceModal } from './components/CreateInvoiceModal'
import { EarningsSummary } from './components/EarningsSummary'
import Header from './components/Header'
import { IncomeTrendChart, type IncomeData } from './components/IncomeTrendChart'
import type { Invoice } from './components/InvoiceItem'
import { InvoicesListCard } from './components/InvoicesListCard'
import { TimeFilterCard, type Period } from './components/TimeFilterCard'
import { Separator } from './components/ui/separator'
import { UploadInvoiceButton } from './components/UploadInvoiceButton'

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateFrom, setDateFrom] = useState<Date | undefined>(() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)
    return d
  })

  const [dateTo, setDateTo] = useState<Date | undefined>(new Date())

  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const [, setSelectedFile] = useState<File | null>(null)

  const invoices: Invoice[] = [
    { id: 'inv1', client: 'Acme Corp', amount: 125000, due: '2025-06-15', status: 'Unpaid' },
    { id: 'inv2', client: 'Beta LLC', amount: 125000, due: '2025-01-15', status: 'Disputed' },
    { id: 'inv3', client: 'Gamma Inc', amount: 125000, due: '2025-02-15', status: 'Paid' },
    { id: 'inv4', client: 'Delta Ltd', amount: 125000, due: '2025-03-15', status: 'Partially Paid' },
    { id: 'inv5', client: 'Epsilon Co', amount: 125000, due: '2025-04-15', status: 'Overdue' },
    { id: 'inv6', client: 'Zeta Works', amount: 125000, due: '2025-06-15', status: 'Awaited' },
    { id: 'inv7', client: 'Theta Pvt', amount: 125000, due: '2025-01-15', status: 'Draft' }
  ]

  const filteredInvoices = invoices.filter(inv => {
    const dueDate = new Date(inv.due)
    if (!dateFrom || !dateTo) return true
    return dueDate >= dateFrom && dueDate <= dateTo
  })

  const earnings = {
    total: filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
    awaited: filteredInvoices.filter(inv => inv.status === 'Awaited').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: filteredInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0)
  }

  const handleFilterChange = (period: Period) => {
    setShowCustomPicker(period === 'Custom')
    if (period === 'Custom') return

    const now = new Date()
    const from = new Date()

    if (period === '1 Month') from.setMonth(now.getMonth() - 1)
    else if (period === '3 Months') from.setMonth(now.getMonth() - 3)
    else if (period === '1 Year') from.setFullYear(now.getFullYear() - 1)

    setDateFrom(from)
    setDateTo(now)
  }

  const handleEditInvoice = (id: string) => alert(`Editing draft invoice: ${id}`)
  const handleSendReminder = (id: string) => alert(`Reminder sent for invoice: ${id}`)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      alert(`Uploaded: ${file.name}`)
    }
  }

  // Generate income trend data based on date range
  const generateIncomeData = () => {
    const data: IncomeData[] = []

    if (!dateFrom || !dateTo) return []

    const start = new Date(dateFrom)
    const end = new Date(dateTo)

    // Group invoices by month within range
    const monthlyMap: Record<string, number[]> = {}

    filteredInvoices.forEach(inv => {
      const due = new Date(inv.due)
      if (due < start || due > end) return

      const key = due.toLocaleString('default', { month: 'short', year: '2-digit' })
      if (!monthlyMap[key]) monthlyMap[key] = []
      monthlyMap[key].push(inv.amount)
    })

    // Convert to chart data
    const months = Object.keys(monthlyMap)
    months.sort((a, b) => {
      const [monthA, yearA] = a.split(' ')
      const [monthB, yearB] = b.split(' ')
      const dateA = new Date(`${monthA} 1, 20${yearA}`)
      const dateB = new Date(`${monthB} 1, 20${yearB}`)
      return dateA.getTime() - dateB.getTime()
    })

    months.forEach((key, i) => {
      const amounts = monthlyMap[key]
      const total = amounts.reduce((sum, val) => sum + val, 0)
      const prevTotal = i > 0 ? data[i - 1].income : total
      const growth = prevTotal === 0 ? 0 : Math.round(((total - prevTotal) / prevTotal) * 100)

      data.push({
        month: key,
        income: total,
        momGrowth: growth
      })
    })

    return data
  }

  return (
    <div className='relative flex h-screen w-screen flex-col'>
      {/* Gradient Background */}
      <div className='gradient-bg absolute top-0 left-0 h-[500px] w-full sm:hidden'></div>

      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <div className='z-10 flex-1 space-y-6 overflow-y-auto rounded-t-3xl bg-gray-50 p-4 sm:rounded-none sm:px-20'>
        <CreateInvoiceCard onClick={() => setShowInvoiceModal(true)} />
        <UploadInvoiceButton onUpload={handleFileUpload} />
        <TimeFilterCard
          dateFrom={dateFrom}
          dateTo={dateTo}
          showCustomPicker={showCustomPicker}
          onFilterChange={handleFilterChange}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />
        <EarningsSummary total={earnings.total} awaited={earnings.awaited} overdue={earnings.overdue} />
        <IncomeTrendChart data={generateIncomeData()} />
        <InvoicesListCard invoices={filteredInvoices} onEdit={handleEditInvoice} onRemind={handleSendReminder} />

        <Separator orientation='horizontal' className='mt-20' />
        {/* Footer */}
        <div className='pb-5 text-center text-xs text-gray-400'>
          <img src='/logo.svg' alt='Logo' className='mb-1 inline-block' />
          <p className='text-[10px]'>sparking the creator economy</p>
        </div>
      </div>

      <CreateInvoiceModal
        open={showInvoiceModal}
        onOpenChange={setShowInvoiceModal}
        dueDate={date}
        onDueDateChange={setDate}
      />
    </div>
  )
}

export default App
