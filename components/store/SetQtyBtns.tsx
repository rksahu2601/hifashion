import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function SetQtyBtns() {
  return (
    <div className='flex items-center bg-white border rounded-sm overflow-hidden h-8'>
        <button className='px-3 hover:bg-slate-100 h-full w-full transition duration-500 active:scale-75'><Minus className="w-4" /></button>
        <div className="px-2 border border-slate-100 border-t-0 border-b-0">2</div>
        <button className='px-3 hover:bg-slate-100 h-full w-full transition duration-500 active:scale-75 '><Plus className="w-4" /></button>
    </div>
  )
}
