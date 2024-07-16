import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export default function ProductsPaginaton() {
  return (
    <div className="w-full flex justify-center my-6 mb-6 gap-1">
        <button className='w-8 h-8 rounded-full flex items-center justify-center border border-slate-400 hover:bg-cyan-600 hover:text-white transition duration-500'>
            <ChevronLeft className='w-4 h-4' />
        </button>
        <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            1
        </button>
        <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-600 text-white hover:text-white transition duration-500'>
            2
        </button>
        <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            3
        </button>
        <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            4
        </button>
        <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            5
        </button>

            
        <button className='w-8 h-8 rounded-full flex items-center justify-center border border-slate-400 hover:bg-cyan-600 hover:text-white transition'>
            <ChevronRight className='w-4 h-4' />
        </button>
    </div>
  )
}
