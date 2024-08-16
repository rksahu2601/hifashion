import NewHeader from "@/components/backoffice/NewHeader";
import CreateNewProductForm from "@/components/forms/CreateNewProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewProduct() {
  const supabase = createClient()
  const {data: categories} = await supabase.from("categories").select()
  console.log(categories)
  

  return (
    <div className="max-w-6xl mx-auto">
      <NewHeader title="Add New Products" subTitle="product list" />
      <CreateNewProductForm categories={categories} />
    </div>
  );
}
