import { createClient } from '@/lib/supabase/server';
import { TProducts } from '@/types/supabaseTypes'
import { create } from 'zustand'

type TState = {
    productss: TProducts[] | null;
    getProducts: ()=>void
}

export const useProductStore = create<TState>()((set)=>({
    productss: [],
    getProducts: ()=>{
        // const supabase = createClient()
        // const {data} = await supabase.from("products").select().order("created_at", {ascending: false})
        // set(()=>({productss: data}))
    }
}))