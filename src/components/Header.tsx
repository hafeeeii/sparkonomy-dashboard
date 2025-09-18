import { ChevronLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className='flex h-12 w-full items-center justify-between bg-white px-4 sm:border-b sm:shadow-sm sm:px-20'>
      <Button variant='ghost' className='-ml-4 text-black font-medium hover:bg-white hover:text-black'>
        <ChevronLeft className='size-6 mt-1 -mr-2' />
        Back
      </Button>
      <h1 className='text-xl font-semibold text-black'>Dashboard</h1>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
