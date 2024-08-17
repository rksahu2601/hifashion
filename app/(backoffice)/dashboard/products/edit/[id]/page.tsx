import NewHeader from "@/components/backoffice/NewHeader";
import CreateNewProductForm from "@/components/forms/CreateNewProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditProduct({params:{id}}:{params:{id: string}}) {
  const supabase = createClient()
  const {data: product} = await supabase.from("products").select().eq("id", id).single()
  console.log(product)
  const {data: categories} = await supabase.from("categories").select()
  

  return (
    <div className="max-w-6xl mx-auto">
      <NewHeader title="Edit Product" subTitle="product list" />
      <CreateNewProductForm categories={categories} product={product}/>
    </div>
  );
}
