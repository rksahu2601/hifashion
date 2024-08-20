"use client";
import { ColorVariant, genderOptions } from "@/components/constants";
// import { categories } from "../navbar/NavCategories";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PropType = {
  gender: string | undefined;
  color: string | undefined;
  sort: string | undefined;
};

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

export default function ProductsFilter({ gender, color, sort }: PropType) {
  return (
    <aside className="hidden md:block md:col-span-1">
      <div className="sticky top-20 w-full">
        {/* <div className="mb-6">
          <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-400">
            Categories
          </h2>
          <ul>
            {categories.map((cat) => {
              return (
                <li key={cat.id} className="mb-1 text-sm">
                  {cat.name}
                </li>
              );
            })}
          </ul>
        </div> */}
        <div className="mb-6">
          <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-400">
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
                  className={cn("h-8 px-3 capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth", gen === gender && "text-white bg-secondary border-transparent" )}
                >
                    {gen}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="uppercase font-medium mb-6 border-b-2 border-gray-400">
            colors
          </h2>

          <div className="flex flex-wrap items-center justify-start gap-2">
            {ColorVariant.map((item) => {
              return (
                <div 
                style={{ borderColor: `${item.value}` }}
                key={item.value}                
                className={cn("w-8 grid place-items-center rounded-full aspect-square cursor-pointer hover:border-2 transition-smooth", color === item.name? "border-2" : "border-transparent")}>
   
                  <Link
                  href={`?${new URLSearchParams({
                    color: item.name,
                  })}`}
                  style={{ background: `${item.value}` }}
                  className={cn("w-6 rounded-full aspect-square", item.name === "White" && "border")}
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
        className="uppercase underline"
        href={`?${new URLSearchParams({})}`}
      >
        Reset
      </Link>
      </div>
    </aside>
  );
}
