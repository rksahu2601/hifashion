import { TProducts } from '@/types/supabaseTypes';
import MobileProductsFilter from './MobileProductsFilter';
import Products from './Products';
import ProductsFilter from './ProductsFilter';

type PropType = {
  page: number | undefined;
  gender: string | undefined;
  color: string | undefined;
  products: TProducts[] | null;
}

export default function ProductsDisplay({products, page, gender, color}: PropType) {
  return (
    <div>
      <div className='flex justify-between items-center mb-6 mt-20'>
        <h2 className='text-2xl md:text-3xl font-semibold'>
          Explore All Collections
        </h2>
        <MobileProductsFilter color={color} gender={gender} />
      </div>
      <div className='md:grid md:grid-cols-5 gap-20 mt-3'>
        <ProductsFilter color={color} gender={gender} />
        <Products products={products} />
      </div>
    </div>
  );
}
