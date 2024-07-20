'use client';
import {
  BaggageClaim,
  BaggageClaimIcon,
  Heart,
  ShoppingBagIcon,
  ShoppingBasket,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const images = ['/test1.jpg', '/test4.jpg'];

export default function ProductCard() {
  const [imgUrl, setImgUrl] = useState(images[0]);
  return (
    <article className=' overflow-hidden rounded-lg border border-slate-300'>
      <Link href={`product/1`}>
      <div
        onMouseOver={() => setImgUrl(images[1])}
        onMouseLeave={() => setImgUrl(images[0])}
        className='relative h-[14rem] md:h-[20rem]'
      >
        <Image className='object-cover' src={imgUrl} alt='' fill />
        <div className='absolute z-10 flex items-center justify-between w-full p-2 md:p-4'>
          <span className='uppercase bg-blue-600/30 px-3 py-1 text-xs rounded-full text-blue-600 font-bold'>
            New
          </span>
          <span className='text-muted-foreground cursor-pointer'>
            <Heart />
          </span>
        </div>
      </div>
      </Link>
      <div className='p-2 md:p-4'>
        <h2 className='text-base md:text-lg font-semibold'>Line Patterned Sweatshirt</h2>
        <div className='flex justify-between items-end'>
          <div>
            <span className='text-muted-foreground text-xs'>Clothes</span>
            <span className='block text-2xl md:text-3xl font-semibold'>$200</span>
          </div>
          <button className='bg-blue-600 text-white rounded p-2'>
            <ShoppingBagIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </article>
  );
}
