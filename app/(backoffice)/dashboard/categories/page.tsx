import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const supabase = createClient()
  const {data: categories} = await supabase.from("categories").select()

  return (
    <div>
      <Link href="/dashboard/categories/new" className="px-3 py-2 border rounded">New</Link>
      <div className="mt-6">{categories?.map(cat=>(
        <div key={cat.id} className='flex items-center gap-3 my-3'>
          <Image width={400} height={400} alt="" src={cat.image as string} className='w-[100px] aspect-square object-cover rounded-md'/>
          <h2 className="font-semibold">{cat.name}</h2>
        </div>
      ))}</div>
    </div>
  )
}
