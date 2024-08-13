import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Categories() {
  const supabase = await createClient()
  const categories = await supabase.from("categories").select()
  console.log(categories)
  return (
    <div>
      <Link href="/dashboard/categories/new" className="px-3 py-2 border rounded">New</Link>
    </div>
  )
}
