"use client";

import { ArrowUpDown, X } from "lucide-react";
import { useState } from "react";
import { motion } from 'framer-motion';
import { ColorVariant, genderOptions } from "@/components/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const categories = [
  {
    id: 1,
    name: "Shirts",
  },
  {
    id: 2,
    name: "Shoes",
  },
  {
    id: 3,
    name: "Hoodies",
  },
  {
    id: 4,
    name: "Bags",
  },
];

export const priceRange = [
  {
    id: 1,
    label: "High to low",
    value: "hightolow",
  },
  {
    id: 2,
    label: "Low to High",
    value: "lowtohigh",
  },
];

const variants = {
  initial: {
    opacity: 0,
    y: 150,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

type PropType = {
  gender: string | undefined;
  color: string | undefined;
};

export default function MobileProductsFilter({gender, color}:PropType) {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div  className="relative">
      <div onClick={()=>setOpenFilter((prev)=>!prev)} className="text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none cursor-pointer ">
        <span>Filter</span> <ArrowUpDown className="w-4 h-4 ml-2" />
      </div>
      {openFilter && (
        <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 grid place-items-end z-[1000]"
        >
          <motion.div
                variants={variants}
                initial="initial"
                animate={openFilter ? "animate" : "initial"}
                transition={{ duration: 0.5 }}
          className="w-full  h-[80vh] bg-gray-100 rounded-[1rem_1rem_0_0] shadow-lg border p-4 shadow-inset">
                      <button onClick={()=>setOpenFilter(false)}>
            <X />
          </button>
          <div className="md:hidden my-3">
            <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
              Gender
            </h2>
            <div>
            {genderOptions.map((gen) => {
              return (
                <Link
                onClick={()=>setOpenFilter(false)}
                  key={gen}
                  href={`?${new URLSearchParams({
                    gender: gen,
                  })}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <span
                    className={cn(
                      "uppercase hover:underline animate-smooth",
                      gen === gender && "text-red-500"
                    )}
                  >
                    {gen}
                  </span>
                </Link>
              );
            })}
          </div>
          </div>
          <div className="md:hidden mb-3">
            <h2 className="uppercase font-medium mb-6 border-b-2 border-gray-200">
              colors
            </h2>

            <div className="flex flex-wrap items-center justify-start gap-2">
            {ColorVariant.map((item) => {
              return (
                <div 
                key={item.value}                
                className={cn("w-8 grid place-items-center rounded-full aspect-square cursor-pointer border-2 hover:border-slate-600/40 transition-smooth", color === item.name ? "border-slate-600/80" : "border-transparent")}>
   
                  <Link
                  onClick={()=>setOpenFilter(false)}
                  href={`?${new URLSearchParams({
                    color: item.name,
                  })}`}
                  style={{ background: `${item.value}` }}
                  className={cn("w-6 rounded-full aspect-square", item.name === "White" && "border")}
                ></Link>
                </div>)})}
            </div>
          </div>
          <div className="mb-3">
            <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
              Prices
            </h2>
            <ul>
              {priceRange.map((range) => {
                return (
                  <li key={range.id} className="mb-1 text-sm cursor-pointer hover:opacity-70 text-cyan-600 font-bold">
                    {range.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <Link
          onClick={()=>setOpenFilter(false)}
        className="uppercase underline"
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
