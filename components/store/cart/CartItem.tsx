import SetQtyBtns from '@/components/store/SetQtyBtns'
import Image from 'next/image'
import Link from 'next/link'

export default function CartItem() {
  return (
    <article className="my-6 flex items-center justify-between border-b pb-6">
          <div className="flex gap-2">
            <Link href={`/product/1`} className='w-[4rem] bg-slate-200 relative'>
              <Image src="/test1.jpg" className='object-cover' fill alt="" />
            </Link>
            <div className="flex flex-col gap-1 items-start">
                <Link href={`/product/1`} className='line-clamp-1 font-semibold text-sm'>Essential Shirt</Link>
                <p className='text-xs opacity-60'>Joggers</p>
                <button className='text-red-600 text-sm'>remove</button>
            </div>
          </div>
          <div className="md:flex item-center gap-12">
            <SetQtyBtns />
            <div  className='font-semibold mt-3 md:mt-0 text-right '>$50.00</div>
          </div>
          <div className='font-semibold hidden md:block'>$50.00</div>
        </article>
  )
}
