import {  ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <Link href="/cart" className="relative">
        <ShoppingBagIcon className="w-6 h-6 opacity-60" />
        <div className="w-6 aspect-square bg-rose-600 rounded-full absolute -top-2 -right-2 grid place-items-center text-sm text-white font-semibold cursor-pointer">3</div>
    </Link>
  )
}
