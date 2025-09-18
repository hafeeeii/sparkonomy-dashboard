import { Upload as UploadIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface UploadInvoiceButtonProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadInvoiceButton = ({ onUpload }: UploadInvoiceButtonProps) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Label htmlFor='upload' className='cursor-pointer'>
        <div className='flex items-center gap-2 rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50'>
          <UploadIcon className='h-4 w-4' />
          Upload Invoice
        </div>
        <input id='upload' type='file' accept='.pdf,.jpg,.jpeg,.png' className='hidden' onChange={onUpload} />
      </Label>
    </div>
  )
}
