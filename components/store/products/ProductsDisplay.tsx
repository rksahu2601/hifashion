import { TProducts } from "@/types/supabaseTypes";
import MobileProductsFilter from "./MobileProductsFilter";
import Products from "./Products";
import ProductsFilter from "./ProductsFilter";

type PropType = {
  page: number | undefined;
  noOfPages: number;
  gender: string | undefined;
  color: string | undefined;
  sort: string | undefined;
  products: TProducts[] | null;
};

export default function ProductsDisplay({
  products,
  page,
  noOfPages,
  gender,
  color,
  sort
}: PropType) {

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Explore All Collections
        </h2>
        <MobileProductsFilter sort={sort} color={color} gender={gender} />
      </div>
      <div className="md:grid md:grid-cols-5 gap-20 mt-3">
        <ProductsFilter sort={sort} color={color} gender={gender} />
        <Products page={page} noOfPages={noOfPages} products={products} />
      </div>
    </div>
  );
}
