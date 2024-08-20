import Products from "@/components/store/products/Products";
import { createClient } from "@/lib/supabase/server";

export default async function Category({
    params: {slug},
  }: {
    params: {slug: string},
  }) {
    const supabase = createClient();
    
       let { data: category, error, count } = await supabase
    .from('categories')
    .select(`
      *,
      products(*)
    `).eq("slug", slug).single()
            

    if(error){
      console.log("category", error)
      return
    }

  return (
    <main className="contain mt-11">
      <h2 className="text-2xl md:text-3xl font-semibold mt-20 mb-6 capitalize">
          {category?.name} Collections
        </h2>
    <Products
      products={category?.products || []}
    />
  </main>
  )
}
