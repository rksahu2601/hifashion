import {  ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <Link href="/">
        <ShoppingBagIcon className="w-6 h-6 opacity-60" />
    </Link>
  )
}
