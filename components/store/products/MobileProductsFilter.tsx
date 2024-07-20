"use client";

import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

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

export default function MobileProductsFilter() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div  className="relative">
      <div onClick={()=>setOpenFilter((prev)=>!prev)} className="text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none cursor-pointer">
        <span>Filter</span> <ArrowUpDown className="w-4 h-4 ml-2" />
      </div>
      {openFilter && (
        <div className="absolute top-8 z-20 bg-white rounded-md shadow-lg border p-4 right-0">
          <div className="mb-3">
            <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-400">
              Gender
            </h2>
            <ul>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Male</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Female</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Unisex</span>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="uppercase font-medium mb-6 border-b-2 border-gray-400">
              colors
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-4 rounded-full aspect-square cursor-pointer border-slate-400 bg-red-700" />
              <div className="w-4 rounded-full aspect-square border-slate-400 bg-blue-700" />
              <div className="w-4 rounded-full aspect-square border-slate-400 bg-green-700" />
              <div className="w-4 rounded-full aspect-square border border-slate-400 bg-white" />
              <div className="w-4 rounded-full aspect-square border-slate-400 bg-black" />
              <div className="w-4 rounded-full aspect-square border-slate-400 bg-yellow-500" />
            </div>
          </div>
          <div className="mb-3">
            <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-400">
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
          <button onClick={()=>setOpenFilter(false)} className="w-full px-3 py-1 text-white text-sm rounded bg-cyan-600">Apply</button>
        </div>
      )}
    </div>
  );
}
