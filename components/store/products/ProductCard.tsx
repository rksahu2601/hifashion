'use client';
import {
  Heart,
  ShoppingBagIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const images = ['/test1.jpg', '/test4.jpg'];

export default function ProductCard() {
  const [imgUrl, setImgUrl] = useState(images[0]);
  return (
    <motion.article
    initial={{ opacity: 0, scale:.8 }}
  whileInView={{ opacity: 1, scale:1 }}
  transition={{ type: "tween"}}
  viewport={{ once: true }} className=' overflow-hidden rounded-lg border border-slate-300'>
      <Link href={`product/1`}>
      <div
        onMouseOver={() => setImgUrl(images[1])}
        onMouseLeave={() => setImgUrl(images[0])}
        className='relative h-[14rem] md:h-[20rem]'
      >
        <Image className='object-cover' src={imgUrl} alt='' fill />
        <div className='absolute z-10 flex items-center justify-between w-full p-2 md:p-4'>
          <span className='uppercase bg-secondary/30 px-3 py-1 text-xs rounded-full text-secondary font-bold'>
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
          <button className='bg-secondary text-white rounded p-2 active:scale-75 transition duration-500  '>
            <ShoppingBagIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
