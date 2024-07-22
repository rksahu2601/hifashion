import React from 'react'

export default function CartOrderSummary() {
  return (
    <div className='p-2 md:py-8 md:px-4 flex flex-col justify-center'>
        <h1 className='text-2xl md:text-3xl font-semibold '>Order Summary</h1>
        <hr className='my-4 md:my-6 bg-gray-600'/>
        <div className='flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8'>
            <h2>Items 3</h2>
            <p>$457.98</p>
        </div>
        <div className='flex flex-col gap-4 md:gap-6 mb-8'>
            <h2 className='md:text-lg font-semibold uppercase'>shipping</h2>
            <select  className='bg-white py-2 px-3 rounded text-muted-foreground'>
                <option className=''>Standard Delivery - $5.00</option>
                <option className=''>Standard Delivery - $5.00</option>
            </select>
        </div>
        <div className='flex flex-col gap-4 md:gap-6'>
            <h2 className='md:text-lg font-semibold uppercase'>promo code</h2>
            <input className="bg-white py-2 px-3 rounded focus:outline-none border border-transparent focus:border-secondary" placeholder="Enter your code" />
        </div>
        <button className='mt-4 md:mt-6 px-4 py-2 text-white bg-secondary hover:bg-secondary/80 w-fit text-sm md:text-base'>APPLY</button>
        <hr className='my-4 md:my-6'/>
        <div className='flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8'>
            <h2 className='uppercase'>Total cost</h2>
            <p>$457.98</p>
        </div>
        <button className='px-4 py-2 text-white bg-primary hover:bg-primary/80 text-sm md:text-base font-semibold'>CHECKOUT</button>
    </div>
  )
}
