import { TProducts } from '@/types/supabaseTypes';
import ProductCard from './ProductCard';
import ProductsPaginaton from './ProductsPaginaton';

type PropType = {
  products: TProducts[] | null;
  page?: number | undefined;
  noOfPages?: number;
}

export default function Products({products, page,noOfPages}:PropType) {

  return (
    <div className='md:col-span-4'>
      {products && products?.length > 0 ? <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1'>
        {
          products?.map((product)=>(
            <ProductCard key={product.id} product={product}/>
          ))
        }
      </div> : <div>Nothing to see here!</div>}
      {page && <ProductsPaginaton noOfPages={noOfPages} page={page} />}
    </div>
  );
}
