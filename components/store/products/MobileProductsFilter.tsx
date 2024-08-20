"use client";

import { ArrowUpDown, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
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
  sort: string | undefined;
};

export default function MobileProductsFilter({ gender, color, sort }: PropType) {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="relative md:hidden">
      <div
        onClick={() => setOpenFilter((prev) => !prev)}
        className="text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none cursor-pointer "
      >
        <span>Filter</span> <ArrowUpDown className="w-4 h-4 ml-2" />
      </div>
      {openFilter && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 grid place-items-end z-[1000]">
          <motion.div
            variants={variants}
            initial="initial"
            animate={openFilter ? "animate" : "initial"}
            transition={{ duration: 0.5 }}
            className="w-full  h-[80vh] bg-gray-100 rounded-[1rem_1rem_0_0] shadow-lg border p-4 inse z-[1001]"
          >
            <button onClick={() => setOpenFilter(false)}>
              <X />
            </button>
            <div className="my-3">
              <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
                Gender
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {genderOptions.map((gen) => {
                  return (
                    <Link
                      key={gen}
                      href={`?${new URLSearchParams({
                        gender: gen,
                      })}`}
                      className={cn(
                        "h-8 px-3 capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth",
                        gen === gender && "text-white bg-secondary"
                      )}
                    >
                      {gen}
                    </Link>
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
                      className={cn(
                        "w-8 grid place-items-center rounded-full aspect-square cursor-pointer hover:border-2 transition-smooth",
                        color === item.name ? "border-2" : "border-transparent"
                      )}
                    >
                      <Link
                        href={`?${new URLSearchParams({
                          color: item.name,
                        })}`}
                        style={{ background: `${item.value}` }}
                        className={cn(
                          "w-6 rounded-full aspect-square",
                          item.name === "White" && "border"
                        )}
                      ></Link>
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
                <Link
                  key={range.id}
                  href={`?${new URLSearchParams({
                    sort: range.value,
                  })}`}
                  className={cn("h-8 px-3 capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth", sort === range.value && "text-white bg-secondary border-transparent" )}
                >
                    {range.label}
                </Link>
              );
            })}
          </div>
          </div>
            <Link
              onClick={() => setOpenFilter(false)}
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
