import { TProducts } from '@/types/supabaseTypes';
import ProductCard from './ProductCard';
import ProductsPaginaton from './ProductsPaginaton';

type PropType = {
  products: TProducts[] | null;
}

export default function Products({products}:PropType) {
  return (
    <div className='md:col-span-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1'>
        {
          products?.map((product)=>(
            <ProductCard key={product.id} product={product}/>
          ))
        }
      </div>
      <ProductsPaginaton />
    </div>
  );
}
