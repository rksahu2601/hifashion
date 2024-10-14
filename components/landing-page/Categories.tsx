"use client"
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import {  MoveRight } from 'lucide-react';

import { TCategory } from '@/types/supabaseTypes'
import { useEffect, useState } from 'react';

export default function Categories({categories}:{categories: TCategory[] | null}) {
const [width, setWidth] = useState<number>(640)

  useEffect(()=>{
    const handleResize = ()=>{
            const windowWidth = window.innerWidth;
            setWidth(windowWidth)
    }

    window.addEventListener("resize", handleResize)
    
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
}, [])

const slidesPerView = width > 1024 ? 4 : width > 640 ? 3 : 1

  return (
    <section className='h-[200px] mt-20'>
        <h2 className='font-semibold text-xl mb-5 contain'>SHOP BY CATEGORY</h2>
   <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="h-[400px]"
      >
        {categories?.map((category)=>(
            <SwiperSlide key={category.id} className='group'>
                <Image
                    className='mb-3 h-[80%] w-full object-cover'
                    src={category.image!} 
                    alt={category.name!}
                    width={500}
                    height={500}
                />
                <Link 
                    href={`/store?categorySlug=${category.slug}`} className='text-lg font-medium flex items-center gap-2'>
                        <span className='uppercase'>{category.name}</span>
                        <span className='group-hover:translate-x-2 transition'><MoveRight strokeWidth={"1px"} /></span>
                </Link>
            </SwiperSlide>
        ))}
      </Swiper>
    </> 
    </section>
  )
}
