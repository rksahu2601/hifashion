"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchResultBox from "./SearchResultBox";
import { createClient } from "@/lib/supabase/client";
import { TProducts } from "@/types/supabaseTypes";

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
      <MobileSearchResultBox setSearchInput={setSearchInput} products={products} searchInput={searchInput} />
    </div>
  );
}
