"use client"

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type PropType = {
  setOpenSearchDropdown: Dispatch<SetStateAction<boolean>>
};

export default function SearchResultBoxItem({setOpenSearchDropdown}:PropType) {
  const router = useRouter()

  const handleClick =()=>{
    router.push("/")
    setOpenSearchDropdown(false)
    console.log("clicked")
  }

  return (
    <button onClick={handleClick} className='h-10 w-full rounded border-b last:border-none pb-1 mb-2 flex items-center hover:bg-slate-100 transition px-1'>
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
    </button>
  )
}
