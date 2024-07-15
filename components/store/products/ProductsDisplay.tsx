import MobileProductsFilter from './MobileProductsFilter';
import Products from './Products';
import ProductsFilter from './ProductsFilter';

export default function ProductsDisplay() {
  return (
    <div>
      <div className='flex justify-between items-center mb-6 mt-20'>
        <h2 className='text-2xl md:text-3xl font-semibold'>
          Explore All Collections
        </h2>
        <MobileProductsFilter />
      </div>
      <div className='md:grid md:grid-cols-5 gap-20 mt-3'>
        <ProductsFilter />
        <Products />
      </div>
    </div>
  );
}
