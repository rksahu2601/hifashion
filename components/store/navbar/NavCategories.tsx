"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TCategory } from "@/types/supabaseTypes";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NavCategories({categories}:{categories: TCategory[] | null}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-muted-foreground flex items-center text-sm hover:text-black outline-none">
        <span>Categories</span> <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-muted-foreground">
        {categories?.map((item) => (
          <DropdownMenuItem key={item.id}>
            <Link href={`/category/${item.slug}`}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
