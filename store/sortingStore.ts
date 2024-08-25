import { TProducts } from '@/types/supabaseTypes'
import { create } from 'zustand'


export interface TCartItem extends TProducts { 
    variant?: string;
    qty: number;
}

type TState = {
    cart: TCartItem[]
}

type TAction = {
    addToCart: (product: TProducts, variant?: string)=>void
}

export const useCartStore = create<TState & TAction>()((set)=>({
    cart: [],
    addToCart: (product, variant)=>set((state)=>({cart: [...state.cart, {...product, variant: variant, qty: 1}]}))
}))