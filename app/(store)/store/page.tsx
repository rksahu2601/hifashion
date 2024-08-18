import { ColorVariant } from '@/components/constants';
import ProductsDisplay from '@/components/store/products/ProductsDisplay';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';


const urlSchema = z.object({
  gender: z.enum(["male", "female", "both"]).optional(),
  color: z.string().optional(),
  page: z.coerce.number().int().positive().optional()
})

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const {data, error} = urlSchema.safeParse(searchParams)

  const gender = data?.gender;
  const color = data?.color;
  const page = data?.page;

  console.log(data, error)

  const supabase = createClient()
  const {data: products} = await supabase.from("products").select().order("created_at", {ascending: false})
  
  let filteredProducts = products;

  if(error) filteredProducts = products;

  if(color && !gender) {
    const color_object = ColorVariant.find(item=>item.name === color) 
    filteredProducts = products?.filter(product=>product.color === color_object?.value)!
  }

  if(!color && gender) {
    filteredProducts = products?.filter(product=>product.gender === gender)!
  }

  if(color && gender) {
    const color_object = ColorVariant.find(item=>item.name === color) 
    filteredProducts = products?.filter(product=>product.color === color_object?.value && product.gender === gender)!
  }

  return (
    <main className='contain mt-11'>
      <ProductsDisplay page={page} color={color} gender={gender} products={filteredProducts} />
    </main>
  );
}
