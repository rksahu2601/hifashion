"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Shirts",
  },
  {
    id: 1,
    name: "Shoes",
  },
  {
    id: 1,
    name: "Hoodies",
  },
  {
    id: 1,
    name: "Bags",
  },
];

export default function NavCategories() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-muted-foreground flex items-center text-sm hover:text-black outline-none">
        <span>Categories</span> <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-muted-foreground">
        {categories.map((item) => (
          <DropdownMenuItem key={item.id}>{item.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
