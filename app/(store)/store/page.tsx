import { ColorVariant } from "@/components/constants";
import ProductsDisplay from "@/components/store/products/ProductsDisplay";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const urlSchema = z.object({
  gender: z.enum(["male", "female", "both"]).optional(),
  sort: z.enum(["asc", "dsc"]).optional(),
  color: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { data, error } = urlSchema.safeParse(searchParams);

  const gender = data?.gender;
  const color = data?.color;
  const sort = data?.sort;
  const page = data?.page ?? 1;

  const ITEMS_PER_PAGE = 6;
  const startIndex = ITEMS_PER_PAGE * (page - 1);
  const endIndex = ITEMS_PER_PAGE * page - 1;

  let products;
  let noOfCount;

  const supabase = createClient();

  const response = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);
  products = response.data;
  noOfCount = response.count;

  if (gender) {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .eq("gender", gender)
      .range(startIndex, endIndex);
    products = data;
    noOfCount = count;
  }
  if (color) {
    const color_object = ColorVariant.find((item) => item.name === color);
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .eq("color", color_object?.value!)
      .range(startIndex, endIndex);
    products = data;
    noOfCount = count;
  }
  if (sort === "dsc") {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("price", { ascending: false })
      .range(startIndex, endIndex);
    products = data;
    noOfCount = count;
  }
  if (sort === "asc") {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("price", { ascending: true })
      .range(startIndex, endIndex);
    products = data;
    noOfCount = count;
  }

  const noOfPages = Math.ceil(noOfCount! / ITEMS_PER_PAGE);

  return (
    <main className="contain mt-11">
      <ProductsDisplay
        noOfPages={noOfPages}
        page={page}
        color={color}
        sort={sort}
        gender={gender}
        products={products}
      />
    </main>
  );
}
