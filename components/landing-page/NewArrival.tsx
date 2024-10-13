import Image from 'next/image'
import Button from '../Button'
import Link from 'next/link'

export default function NewArrival() {
  return (
    <section className='mt-[16rem] sm:mt-[18rem] mb-20 max-w-[60rem] mx-auto px-2 flex gap-10 sm:gap-6 flex-col sm:flex-row'>
       <div className='w-full flex flex-col'>
            <Image
                src="/image4.jpg"
                alt="fashion image"
                width={500}
                height={1000}
                className='object-cover object-top transition h-[25rem] w-full'
            />
        <div className='sm:mt-4 mb-2 sm:mb-0 max-sm:-order-1'>
          <h2 className='font-extrabold text-sm'>FASHION UP YOUR LOOK</h2>
          <p className='text-sm mt-2 opacity-70'>Step into fashion that merges elegance with ease, offering the ideal harmony of bold design and timeless trends. Shop today and make a statement with clothing that redefines the ordinary.</p>
        </div>
       </div>
       <div className='w-full'>
            <div className='flex flex-col gap-2 sm:gap-3 mb-4'>
                <h2 className='font-extrabold text-sm'>NEW COLLECTION</h2>
                <p className='font-semibold text-2xl'>Best sweatshirt and <br />tracksuit for everyone!</p>
                <p className='text-sm opacity-70'>Discover fashion that unites style and comfort, presenting a flawless mix of modern trends and classic sophistication. Elevate your style with fashion that blends effortless comfort and trend-forward design.</p>
                <Link href="/store">
                    <Button 
                    label="SHOP NOW"
                    className="rounded-none border bg-white text-primary text-xs font-bold px-6"
                    />
                </Link>
            </div>
            <Image
                src="/image10.jpg"
                alt="new collection"
                width={500}
                height={1000}
                className='object-cover object-top h-[25rem] sm:h-[18rem] mt-4 w-full'
            />
       </div>
    </section>
  )
}
