"use client"

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type TProps ={
    title: string;
    subTitle: string;
}

export default function NewHeader({title, subTitle}:TProps) {
    const router = useRouter()

  return (
        <div className='flex gap-3 items-center mb-8'>
            <div onClick={()=>router.back()} className="p-3 rounded border cursor-pointer transition duration-500 hover:border-gray-400">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
                <p className="text-sm">Back to {subTitle}</p>
                <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            </div>
        </div>
  )
}
