import NewHeader from "@/components/backoffice/NewHeader";
import CreateNewCategoryForm from "@/components/forms/CreateNewCategoryForm";
import CreateNewProductForm from "@/components/forms/CreateNewProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditProduct({params:{id}}:{params:{id: string}}) {
  const supabase = createClient()
  const {data: category} = await supabase.from("categories").select().eq("id", id).single()
  

  return (
    <div className="max-w-6xl mx-auto">
      <NewHeader title="Edit Category" subTitle="category list" />
      <CreateNewCategoryForm category={category}/>
    </div>
  );
}
