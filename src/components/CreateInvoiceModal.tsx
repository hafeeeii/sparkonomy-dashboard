import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface CreateInvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dueDate: Date | undefined
  onDueDateChange: (date: Date | undefined) => void
}

export const CreateInvoiceModal = ({ open, onOpenChange, dueDate, onDueDateChange }: CreateInvoiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='client'>Client Name</Label>
            <Input id='client' placeholder='Enter client name' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='amount'>Amount (₹)</Label>
            <Input id='amount' type='number' placeholder='10000' />
          </div>
          <div className='grid gap-2'>
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-full justify-start text-left font-normal'>
                  {dueDate ? dueDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={dueDate} onSelect={onDueDateChange} />
              </PopoverContent>
            </Popover>
          </div>
          <Button>Create Invoice</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
