import ProductCard from './ProductCard';

export default function Products() {
  return (
    <div className='md:col-span-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-6'>
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
    </div>
  );
}
