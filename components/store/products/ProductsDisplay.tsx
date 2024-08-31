import { TCategory, TProducts } from "@/types/supabaseTypes";
import MobileProductsFilter from "./MobileProductsFilter";
import Products from "./Products";
import ProductsFilter from "./ProductsFilter";

type PropType = {
  page: number | undefined;
  categorySlug: string | undefined;
  gender: string | undefined;
  search: string | undefined;
  color: string | undefined;
  noOfPages: number;
  products: TProducts[] | null;
  categories: TCategory[] | null;
};

export default function ProductsDisplay({
  products,
  page,
  noOfPages,
  categories,
  categorySlug,
  gender="",
  search="",
  color="",
}: PropType) {
  const currentCategory = categories?.find((cat)=>cat.slug === categorySlug)

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-20">
      {!search && <h2 className="text-2xl md:text-3xl font-semibold capitalize">
          {categorySlug ? `${color} ${gender} ${currentCategory?.name}` : `Explore All ${color} ${gender} Collections`}
        </h2>}
      {search && <h2 className="text-2xl md:text-3xl font-semibold capitalize">
          Search Results for {color} {gender} {search}
        </h2>}
        <MobileProductsFilter />
      </div>
      <div className="md:grid md:grid-cols-5 gap-10 mt-3">
        <ProductsFilter categories={categories} />
        <Products page={page} noOfPages={noOfPages} products={products} />
      </div>
    </div>
  );
}
