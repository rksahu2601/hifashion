"use client"

import SetQtyBtns from '@/components/store/SetQtyBtns'
import { Badge } from '@/components/ui/badge'
import { TCartItem, useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import Link from 'next/link'

export default function CartItem({cartItem}:{cartItem: TCartItem}) {
  const {removeFromCart} = useCartStore(state=>{
    return {removeFromCart: state.removeFromCart,}
  })
  
  return (
    <article className="my-6 flex items-center justify-between border-b pb-6">
          <div className="flex gap-2">
            <Link href={`/product/${cartItem.id}`} className='w-[4rem] bg-gray-200 relative'>
              <Image src={cartItem.images[0]} className='object-cover' fill alt="" />
            </Link>
            <div className="flex flex-col gap-1 items-start">
                <Link href={`/product/${cartItem.id}`} className='line-clamp-1 md:w-[20rem] font-semibold text-sm'>{cartItem.name}</Link>
                {cartItem.variant && <Badge variant="outline"><span className='text-xs'>{cartItem.variant}</span></Badge>}
                <p className='text-xs opacity-60'>{cartItem.category}</p>
                <button onClick={()=>removeFromCart(cartItem.itemId)} className='text-red-600 text-sm'>remove</button>
            </div>
          </div>
          <div className="md:flex item-center gap-12">
            <SetQtyBtns cartItem={cartItem} />
            <div className='font-semibold mt-3 md:mt-0 text-right text-sm flex items-center gap-1'>${cartItem.price?.toFixed(2)}</div>
          </div>
          <div className='font-semibold hidden md:flex text-sm items-center gap-1'>${(cartItem?.price! * cartItem.qty).toFixed(2)}</div>
        </article>
  )
}
