import ProductDetails from '@/components/store/productDetail/ProductDetails'
import ProductImages from '@/components/store/productDetail/ProductImages'
import React from 'react'
import ProductCard from './../../../../components/store/products/ProductCard';

export default function page() {
  return (
    <div className='contain mt-[5rem]'>
        <section className='flex flex-col lg:flex-row gap-9'>
        <ProductImages />
        <ProductDetails />
    </section>
    {/* <section className='my-4 md:my-[6rem]'>
        <h1 className='text-2xl md:text-3xl font-semibold'>Similar items you might like</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-6 mt-3'>
        </div>
    </section> */}
    </div>
  )
}
