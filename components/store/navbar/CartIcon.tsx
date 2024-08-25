"use client"

import { useCartStore } from "@/store/sortingStore";
import {  ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
const cart = useCartStore(state=>state.cart)

  return (
    <Link href="/cart" className="relative">
        <ShoppingBagIcon className="w-6 h-6 opacity-60" />
        <div className="w-6 aspect-square bg-rose-600 rounded-full absolute -top-2 -right-2 grid place-items-center text-sm text-white font-semibold cursor-pointer">{cart.length}</div>
    </Link>
  )
}
