import ProductCard from './ProductCard';
import ProductsPaginaton from './ProductsPaginaton';

export default function Products() {
  return (
    <div className='md:col-span-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3 md:gap-6'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <ProductsPaginaton />
    </div>
  );
}
