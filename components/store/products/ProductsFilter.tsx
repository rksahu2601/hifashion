"use client";
import { ColorVariant, genderOptions } from "@/components/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Gender } from "@/store/cart-store";
import { useRouter, useSearchParams } from "next/navigation";

import queryString from "query-string"
import { TCategory } from "@/types/supabaseTypes";

type PropType = {
  categories: TCategory[] | null;
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

export default function ProductsFilter({ categories }: PropType) {
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
      gender: gen,
      page: null
  }

  if(params?.get("gender") === gen){
    delete updatedQuery.gender
  }

  const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
  router.push(url)

}
const handleSort = ( value: string)=>{
  let currentQuery = {};

  if(params){
    currentQuery = queryString.parse(params.toString())
    console.log("current query", currentQuery);
  }

  const updatedQuery:any = {
    ...currentQuery, 
      sort: value,
      page: null
  }

  if(params?.get("sort") === value){
    delete updatedQuery.sort
  }

  const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
  router.push(url)

}
const handleCategory = ( value: string | null)=>{
  let currentQuery = {};

  if(params){
    currentQuery = queryString.parse(params.toString())
    console.log("current query", currentQuery);
  }

  const updatedQuery:any = {
    ...currentQuery, 
      categorySlug: value,
      page: null
  }

  if(params?.get("categorySlug") === value){
    delete updatedQuery.categorySlug
  }

  const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
  router.push(url)

}
const handleColor = ( value: string)=>{
  let currentQuery = {};

  if(params){
    currentQuery = queryString.parse(params.toString())
    console.log("current query", currentQuery);
  }

  const updatedQuery:any = {
    ...currentQuery, 
      color: value,
      page: null
  }

  if(params?.get("color") === value){
    delete updatedQuery.color
  }

  const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
  router.push(url)

}

  return (
    <aside className="hidden md:block md:col-span-1">
      <div className="sticky top-20 w-full h-[80vh] scroll-bar">
        <div className="mb-6">
          <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
            Categories
          </h2>
          <div>
            {categories && categories.map((cat) => {
              return (
                <button onClick={()=>handleCategory(cat?.slug)} key={cat.id} className={cn("px-2 py-1 text-sm text-left rounded-md block w-full hover:bg-slate-100 transition-smooth", params.get("categorySlug") === cat.slug && "bg-slate-100 ")}>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-6">
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
        <div className="mb-6">
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
        className="uppercase underline text-sm"
        href={`?${new URLSearchParams({})}`}
      >
        Reset
      </Link>
      </div>
    </aside>
  );
}
