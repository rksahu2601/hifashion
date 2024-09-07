import ProductDetails from '@/components/store/productDetail/ProductDetails'
import ProductImages from '@/components/store/productDetail/ProductImages'
import React from 'react'
import ProductCard from './../../../../components/store/products/ProductCard';
import Reviews from './../../../../components/store/productDetail/Reviews';
import { createClient } from '@/lib/supabase/server';
import Details from '@/components/store/productDetail/Details';

export default async function page({params:{id}}:{params:{id:number}}) {
  const supabase = createClient()
  const {data: product} = await supabase.from("products").select().eq("id",id ).single()
  const {data: reviews} = await supabase.from("reviews").select().eq("productId",id )
    const {data: relatedProduct} = await supabase.from("products").select().eq("id",id ).eq("categorySlug", product?.categorySlug || "")

  return (
    <div className='contain mt-[5rem]'>
        <section className='flex flex-col lg:flex-row gap-9'>
          <ProductImages images={product?.images || []}/>
          <Details reviews={reviews} product={product} />
        </section>
    {/* <section className='my-4 md:my-[6rem]'>
        <h1 className='text-2xl md:text-3xl font-semibold'>Similar items you might like</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-6 mt-3'>
        </div>
    </section> */}
    </div>
  )
}
