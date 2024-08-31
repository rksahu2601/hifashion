"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ColorVariant, genderOptions } from "@/components/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Gender } from "@/store/cart-store";
import queryString from "query-string";
import { TCategory } from "@/types/supabaseTypes";

export const priceRange = [
  {
    id: 1,
    label: "High to low",
    value: "dsc",
  },
  {
    id: 2,
    label: "Low to High",
    value: "asc",
  },
];

const variants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function MobileProductsFilter() {
  const [openFilter, setOpenFilter] = useState(false);

  const params = useSearchParams()
  const router = useRouter()
  
  const handleGender = ( gen: Gender)=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  
    const updatedQuery:any = {
      ...currentQuery, 
        gender: gen
    }
  
    if(params?.get("gender") === gen){
      delete updatedQuery.gender
    }
  
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
    setOpenFilter(false)
  
  }
  const handleSort = ( value: string)=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  
    const updatedQuery:any = {
      ...currentQuery, 
        sort: value
    }
  
    if(params?.get("sort") === value){
      delete updatedQuery.sort
    }
  
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
    setOpenFilter(false)
  }
  const handleColor = ( value: string)=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  
    const updatedQuery:any = {
      ...currentQuery, 
        color: value
    }
  
    if(params?.get("color") === value){
      delete updatedQuery.color
    }
  
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
    setOpenFilter(false)
  }

  return (
    <div className="relative md:hidden">
      <div
        onClick={() => setOpenFilter((prev) => !prev)}
        className="text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none cursor-pointer "
      >
        <span>Filter</span> <Filter className="w-4 h-4 ml-2" />
      </div>
      {openFilter && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 grid place-items-end z-[1000]">
          <motion.div
            variants={variants}
            initial="initial"
            animate={openFilter ? "animate" : "initial"}
            transition={{ duration: 0.3 }}
            className="w-full h-[60vh] shadow-lg bg-gray-100 p-4 z-[1001]"
          >
            <button onClick={() => setOpenFilter(false)}>
              <X className="w-4 h-4 text-muted-foreground"/>
            </button>
            <div className="my-3">
              <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
                Gender
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
            {genderOptions.map((gen) => {
              return (
                <button
                onClick={()=>handleGender(gen)}
                  key={gen}
                  className={cn("h-6 px-2 capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth text-sm", gen === params.get("gender") && "text-white bg-secondary/50 border-transparent" )}
                >
                    {gen}
                </button>
              );
            })}
          </div>
            </div>
            <div className="mb-3">
              <h2 className="uppercase font-medium mb-6 border-b-2 border-gray-200">
                colors
              </h2>

              <div className="flex flex-wrap items-center justify-start gap-2">
            {ColorVariant.map((item) => {
              return (
                <div 
                style={{ borderColor: `${item.value}` }}
                key={item.value}                
                className={cn("w-8 grid place-items-center rounded-full aspect-square cursor-pointer hover:border-2 transition-smooth", params.get("color") === item.name? "border-2" : "border-transparent")}>
   
                  <button
                  onClick={()=>handleColor(item.name)}
                  style={{ background: `${item.value}` }}
                  className={cn("w-6 rounded-full aspect-square", item.name === "White" && "border")}
                ></button>
                </div>
              );
            })}
          </div>
            </div>
            <div className="mb-6">
            <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
              Prices
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
            {priceRange.map((range) => {
              return (
                <button
                onClick={()=>handleSort(range.value)}
                  key={range.id}
                  className={cn("h-6 px-2 text-sm capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth", params.get("sort") === range.value && "text-white bg-secondary/50 border-transparent" )}
                >
                    {range.label}
                </button>
              );
            })}
          </div>
          </div>
            <Link
              onClick={() => setOpenFilter(false)}
              className="uppercase underline text-xs"
              href={`?${new URLSearchParams({})}`}
            >
              Reset
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
