import SetQtyBtns from '@/components/store/SetQtyBtns'
import { TCartItem } from '@/store/sortingStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartItem({cartItem}:{cartItem: TCartItem}) {
  console.log("CARTITEM", cartItem)
  console.log("CARTITEM VARIANT", cartItem.variant)
  return (
    <article className="my-6 flex items-center justify-between border-b pb-6">
          <div className="flex gap-2">
            <Link href={`/product/${cartItem.id}`} className='w-[4rem] bg-slate-200 relative'>
              <Image src={cartItem.images[0]} className='object-cover' fill alt="" />
            </Link>
            <div className="flex flex-col gap-1 items-start">
                <Link href={`/product/1`} className='line-clamp-1 font-semibold text-sm'>{cartItem.name} {cartItem.variant}</Link>
                <p className='text-xs opacity-60'>{cartItem.category}</p>
                <button className='text-red-600 text-sm'>remove</button>
            </div>
          </div>
          <div className="md:flex item-center gap-12">
            <SetQtyBtns />
            <div  className='font-semibold mt-3 md:mt-0 text-right '>${cartItem.price}</div>
          </div>
          <div className='font-semibold hidden md:block'>${+cartItem.price! * cartItem.qty}</div>
        </article>
  )
}
