"use client";

import { motion } from "framer-motion";
import SearchResultBoxItem from "./SearchResultBoxItem";
import { Dispatch, SetStateAction } from "react";
import { Search, X } from "lucide-react";
import { TProducts } from "@/types/supabaseTypes";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

type PropType = {
  openSearchDropdown: boolean;
  setOpenSearchDropdown: Dispatch<SetStateAction<boolean>>;
  products: TProducts[] | null;
  searchInput: string | null;
};

export default function SearchResultBox({
  openSearchDropdown,
  setOpenSearchDropdown,
  products,
  searchInput
}: PropType) {
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const params = useSearchParams()
  const router = useRouter()

  const handleSearch = ()=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  
    const updatedQuery:any = {
      ...currentQuery, 
        search: searchInput,
        page: null
    }
  
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true, skipEmptyString: true})
    router.push(url)
    setOpenSearchDropdown(false)
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={openSearchDropdown ? "animate" : "initial"}
      transition={{ duration: 0.5 }}
      className="md:w-[33rem] p-4 bg-white border h-fit rounded absolute top-[3.2rem] right-0 shadow-md"
    >
      <div className="flex justify-between items-center mb-2">
        {products && products?.length > 0 && searchInput && <button className="bg-primary/10 hover:bg-primary/40 transition-smooth px-3 text-sm rounded-full py-1" onClick={handleSearch}>See all results</button>}
        <X onClick={()=>setOpenSearchDropdown(false)} className="cursor-pointer"/>
      </div>
      <div>
        {products && products.length > 0 && searchInput ? products.slice(0, 5).map((product)=>(
          <SearchResultBoxItem key={product?.id} product={product} setOpenSearchDropdown={setOpenSearchDropdown} />
        )): (<div className="w-full h-full flex gap-2 items-center justify-center">Type something to search <Search className="w-5 h-5 text-slate-500"/></div>)}
      </div>
    </motion.div>
  );
}
