import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchResultBoxItem() {
  return (
    <Link href="/" className='h-10 rounded border-b last:border-none pb-1 mb-2 flex items-center hover:bg-slate-100 transition px-1'>
        <div className='relative h-full w-8 mr-4 rounded-sm overflow-hidden bg-slate-200'>
            <Image src={"/test1.jpg"} className="object-cover" alt="" fill />
        </div>
        <h2 className='line-clamp-1 mr-8 text-xs font-semibold'>Wireless Earlessbuds</h2>
        <div className='flex items-center gap-2'>
            <Star className='w-4 h-4 text-green-600' />
            <Star className='w-4 h-4 text-green-600' />
            <Star className='w-4 h-4 text-green-600' />
            <Star className='w-4 h-4 text-green-600' />
            <Star className='w-4 h-4 text-green-600' />
        </div>
        <p className="ml-auto font-semibold text-sm">$99</p>
    </Link>
  )
}
