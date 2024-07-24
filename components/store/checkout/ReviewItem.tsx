import Image from 'next/image'
import React from 'react'

export default function ReviewItem() {
  return (
    <article className='flex items-center justify-between mb-4 border-b pb-4'>
        <div className="flex gap-4 md:gap-6 ">
            <div className='w-[6rem] aspect-square bg-slate-200 relative rounded-md overflow-hidden'>
                <Image className='object-cover' fill src="/test1.jpg" alt="" />
            </div>
            <div className="flex flex-col justify-center gap-1">
                <h2 className='text-lg md:text-xl font-semibold'>Airpod Max</h2>
                <p className='text-sm'>Category</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold">$450.00</p>
            <p className="text-sm font-medium opacity-75">Quantity: 01</p>
        </div>
    </article>
  )
}
