import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Products() {
  const supabase = createClient()
  const {data: products} = await supabase.from("products").select()

  return (
    <div>
      <Link href="/dashboard/products/new" className="px-3 py-2 border rounded">New</Link>
      <div  className="mt-6">{products?.map(product=>(
        <div key={product.id} className='flex items-center gap-3 my-3'>
          <Image width={400} height={400} alt="" src={product.images[0] as string} className='w-[100px] aspect-square object-cover rounded-md'/>
          <h2 className="font-semibold">{product.name}</h2>
        </div>
      ))}</div>
    </div>
  )
}
