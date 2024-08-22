import { TCategory, TProducts } from "@/types/supabaseTypes";
import MobileProductsFilter from "./MobileProductsFilter";
import Products from "./Products";
import ProductsFilter from "./ProductsFilter";

type PropType = {
  page: number | undefined;
  categorySlug: string | undefined;
  noOfPages: number;
  products: TProducts[] | null;
  categories: TCategory[] | null;
};

export default function ProductsDisplay({
  products,
  page,
  noOfPages,
  categories,
  categorySlug
}: PropType) {
  const currentCategory = categories?.find((cat)=>cat.slug === categorySlug)

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold capitalize">
          {currentCategory ? `${currentCategory.name} Collections` : "Explore All Collections"}
        </h2>
        <MobileProductsFilter />
      </div>
      <div className="md:grid md:grid-cols-5 gap-10 mt-3">
        <ProductsFilter categories={categories} />
        <Products page={page} noOfPages={noOfPages} products={products} />
      </div>
    </div>
  );
}
