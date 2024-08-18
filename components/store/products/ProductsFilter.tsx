"use client";
import { ColorVariant, genderOptions } from "@/components/constants";
import { categories } from "../navbar/NavCategories";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PropType = {
  gender: string | undefined;
  color: string | undefined;
};

export default function ProductsFilter({ gender, color }: PropType) {
  return (
    <aside className="hidden md:block md:col-span-1">
      <div className="sticky top-20 w-full">
        <div className="mb-6">
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
        </div>
        <div className="mb-6">
          <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-400">
            Gender
          </h2>
          <div>
            {genderOptions.map((gen) => {
              return (
                <Link
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
        <div className="mb-6">
          <h2 className="uppercase font-medium mb-6 border-b-2 border-gray-400">
            colors
          </h2>

          <div className="flex flex-wrap items-center justify-start gap-2">
            {ColorVariant.map((item) => {
              return (
                <div 
                key={item.value}                
                className={cn("w-8 grid place-items-center rounded-full aspect-square cursor-pointer border-2 hover:border-slate-600/40 transition-smooth", color === item.name ? "border-slate-600/80" : "border-transparent")}>
   
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
