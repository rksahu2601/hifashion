import { TProducts } from "@/types/supabaseTypes"
import ProductDetails from "./ProductDetails";

type PropType = {
    product: TProducts | null;
}

export default function Details({product}:PropType) {
  return (
    <>
    <ProductDetails product={product} />
    </>
  )
}
