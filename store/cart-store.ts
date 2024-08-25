import { TProducts } from '@/types/supabaseTypes'
import { create } from 'zustand'

import { v4 as uuidv4 } from 'uuid';

export type Gender = "male" | "female" | "both";

export interface TCartItem extends TProducts { 
    variant?: string;
    qty: number;
    itemId: string;
}

type TState = {
    cart: TCartItem[]
}

type TAction = {
    addToCart: (product: TProducts, variant?: string)=>void
    increaseCartQuantity: (itemId: string)=>void
    decreaseCartQuantity: (itemId: string)=>void
    removeFromCart: (itemId: string)=>void
    clearCart: ()=>void
}

export const useCartStore = create<TState & TAction>()((set)=>({
    cart: [],
    addToCart: (product, variant)=>set((state)=>({cart: [...state.cart, {...product, variant: variant, qty: 1, itemId: uuidv4() }]})),
    increaseCartQuantity: (itemId: string)=>set((state)=>{
        let updatedCart;
        const itemInCart = state.cart.some((item)=>item.itemId === itemId)
        if(!itemInCart) {
            return {cart: state.cart}
        }
            
         updatedCart = state.cart.map((item)=>item.itemId === itemId ? {...item, qty: item.qty < +item.quantity! ? item.qty + 1 : +item.quantity!} : item)          
        return {cart: updatedCart}
    }),
    decreaseCartQuantity: (itemId: string)=>set((state)=>{
        let updatedCart;
        const itemInCart = state.cart.some((item)=>item.itemId === itemId)
        if(!itemInCart) {
            return {cart: state.cart}
        }
            
         updatedCart = state.cart.map((item)=>item.itemId === itemId ? {...item, qty: item.qty > 1  ? item.qty - 1 : 1} : item)           
        return {cart: updatedCart}
    }),
    removeFromCart: (itemId: string)=>set(state=>{
        let updatedCart;
        const itemInCart = state.cart.find((item)=>item.itemId === itemId)
        if(!itemInCart) {
            return {cart: state.cart}
        }

        updatedCart = state.cart.filter((item)=>item.itemId !== itemId)
        return {cart: updatedCart}
    }),
    clearCart: ()=>set({cart: []}),
}))