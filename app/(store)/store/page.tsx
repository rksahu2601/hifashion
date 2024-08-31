import { ColorVariant } from "@/components/constants";
import ProductsDisplay from "@/components/store/products/ProductsDisplay";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const urlSchema = z.object({
  gender: z.enum(["male", "female", "both"]).optional(),
  sort: z.enum(["asc", "dsc"]).optional(),
  color: z.string().optional(),
  categorySlug: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
});

 type dataType = z.infer<typeof urlSchema>

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { data, error } = urlSchema.safeParse(searchParams);

  if(error) {
    console.log("error", error)
    redirect("/store")
  }

  const gender = data?.gender;
  const search = data?.search;
  const color = data?.color;
  const sort = data?.sort;
  const categorySlug = data?.categorySlug;
  const page = data?.page ?? 1;

  const filtereData = Object.fromEntries(Object.entries(data as dataType ).filter(([key])=>key !== "sort" && key !== "page" && key !== "search"))
  const colorValue = ColorVariant.find((col)=>col.name === color)?.value

    let matchObj = filtereData;
    if(data?.color){
      matchObj={...matchObj, color: colorValue as string}
    }

    let orderObj ={
      column: "created_at",
      option: { ascending: false }
    }

    if(sort === "asc"){
      orderObj ={
        column: "price",
        option: { ascending: true }
      }
    }
    if(sort === "dsc"){
      orderObj ={
        column: "price",
        option: { ascending: false }
      }
    }
    
  const ITEMS_PER_PAGE = 6;
  const startIndex = ITEMS_PER_PAGE * (page - 1);
  const endIndex = ITEMS_PER_PAGE * page - 1;

  const supabase = createClient();
  const {data: categories} = await supabase.from("categories").select()

  const {data:products,count  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .match(matchObj)
    .ilike("name", `%${search || ""}%`)
    .order(orderObj.column, orderObj.option)
    .range(startIndex, endIndex);

  const noOfPages = Math.ceil(count! / ITEMS_PER_PAGE);

  return (
    <main className="contain mt-11">
      <ProductsDisplay
        noOfPages={noOfPages}
        page={page}
        categorySlug={categorySlug}
        products={products}
        categories={categories}
        gender={gender}
        search={search}
        color={color}
      />
    </main>
  );
}
