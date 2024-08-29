import { TCartItem } from '@/store/cart-store'
import Image from 'next/image'
import React from 'react'

export default function ReviewItem({cartItem}:{cartItem: TCartItem}) {
  return (
    <article className='flex items-center justify-between mb-4 border-b pb-4'>
        <div className="flex gap-4 md:gap-6 ">
            <div className='w-[6rem] aspect-square bg-slate-200 relative rounded-md overflow-hidden'>
                <Image className='object-cover' fill src={cartItem.images[0]} alt={cartItem.name || ""} />
            </div>
            <div className="flex flex-col justify-center gap-1">
                <h2 className='text-lg md:text-xl font-semibold line-clamp-1'>{cartItem.name}</h2>
                <p className='text-sm'>{cartItem.category}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold">${cartItem.price?.toFixed(2)}</p>
            <p className="text-sm font-medium opacity-75">Quantity: {cartItem.qty.toString().padStart(2, "0")}</p>
        </div>
    </article>
  )
}
