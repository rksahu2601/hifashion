"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchResultBox from "./SearchResultBox";
import { createClient } from "@/lib/supabase/client";
import { TProducts } from "@/types/supabaseTypes";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileSearchResultBox from "./MobileSearchResultBox";

export default function Searchbar() {
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [products, setProducts] = useState<TProducts[] | null>([]);
  const inPutRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  useEffect(() => {
    const searchProduct = async () => {
      if (searchInput) {
        const { data: products } = await supabase
          .from("products")
          .select()
          .ilike("name", `%${searchInput}%`);
        setProducts(products);
      }
      if (searchInput === null || searchInput === "") {
        setProducts([]);
      }
    };
    searchProduct();
  }, [searchInput, supabase]);

  return (
    <div>
      {/* for large screens */}
      <div className="hidden md:block relative">
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <motion.input
            onFocus={() => setOpenSearchDropdown(true)}
            // onBlur={()=>setOpenSearchDropdown(false)}
            ref={inPutRef}
            initial={{
              width: "15rem",
            }}
            whileFocus={{
              width: "30rem",
            }}
            onChange={(e) => setSearchInput(e.target.value)}
            className=" bg-transparent outline-none focus:w-[13rem] transition placeholder:text-xs"
            placeholder="Search products..."
            type="search"
          />
          <button>
            <Search className="w-4 h-4 opacity-40" />
          </button>
        </div>
        {openSearchDropdown && (
          <SearchResultBox
            searchInput={searchInput}
            products={products}
            openSearchDropdown={openSearchDropdown}
            setOpenSearchDropdown={setOpenSearchDropdown}
          />
        )}
      </div>

      {/* for smaller screens */}
      <div className="flex md:hidden items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Search className=" w-6 h-6 text-muted-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh] ">
          <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
        
      </SheetDescription>
    </SheetHeader>
            <div className="flex items-center gap-3 bg-gray-100 mb-3 px-3 py-1 rounded-full mt-4">
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent outline-none w-full transition placeholder:text-xs"
                placeholder="Search products..."
                type="search"
              />
              <button>
                <Search className="w-4 h-4 opacity-40" />
              </button>
            </div>
            <MobileSearchResultBox
              searchInput={searchInput}
              products={products}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
