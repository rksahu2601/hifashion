"use client"

import { TProducts } from '@/types/supabaseTypes';
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type PropType = {
  product: TProducts | null;
  setOpenSearchDropdown: Dispatch<SetStateAction<boolean>>
};

export default function SearchResultBoxItem({setOpenSearchDropdown, product}:PropType) {

  return (
    <Link href={`/product/${product?.id}`} onClick={()=> setOpenSearchDropdown(false)} className='h-10 w-full rounded border-b last:border-none pb-1 mb-2 flex items-center hover:bg-slate-100 transition px-1'>
        <div className='relative h-full w-8 mr-4 rounded-sm overflow-hidden bg-slate-200'>
            <Image src={product?.images[0] as string} className="object-cover" alt="" fill />
        </div>
        <h2 className='line-clamp-1 mr-8 text-xs font-semibold'>{product?.name}</h2>

        <p className="ml-auto font-semibold text-sm">${product?.price?.toFixed(2)}</p>
    </Link>
  )
}
