import { TCartItem, useCartStore } from '@/store/cart-store'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function SetQtyBtns({cartItem}:{cartItem: TCartItem}) {
const {increaseCartQty, decreaseCartQty}=useCartStore(state=>{
  return{
    increaseCartQty: state.increaseCartQuantity,
    decreaseCartQty: state.decreaseCartQuantity,
  }
})

  return (
    <div className='flex items-center bg-white border rounded-sm overflow-hidden h-8'>
        <button onClick={()=>decreaseCartQty(cartItem.itemId)} className='px-3 hover:bg-slate-100 h-full w-full transition duration-500 active:scale-75'><Minus className="w-4" /></button>
        <div className="px-2 border border-slate-100 border-t-0 border-b-0">{cartItem.qty}</div>
        <button onClick={()=>increaseCartQty(cartItem.itemId)} className='px-3 hover:bg-slate-100 h-full w-full transition duration-500 active:scale-75 '><Plus className="w-4" /></button>
    </div>
  )
}
