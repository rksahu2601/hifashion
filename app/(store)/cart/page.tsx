import SetQtyBtns from '@/components/store/SetQtyBtns'
import Image from 'next/image'

export default function page() {
  return (
    <div className='contain md:grid grid-cols-12 py-4 mt-[5rem]'>
      <section className='col-span-8 px-2 md:pr-6 md:px-0'>
        <div className="flex justify-between items-center mb-3 md:mb-6 w-full">
          <h2 className='font-semibold text-2xl md:text-3xl'>Shopping Cart</h2>
          <h2 className='font-semibold text-2xl md:text-3xl'>3 items</h2>
        </div>
        <hr />
        <article className="my-6 flex items-center justify-between">
          <div className="flex gap-2">
            <div className='w-[4rem] bg-slate-200 relative'>
              <Image src="/test1.jpg" className='object-cover' fill alt="" />
            </div>
            <div className="flex flex-col gap-1 items-start">
                <h2 className='line-clamp-1 font-semibold text-sm'>Essential Shirt</h2>
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
      </section>
      <section className='bg-cyan-600/10 px-2 md:px-3 col-span-4'></section>
    </div>
  )
}
