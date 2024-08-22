"use client"

import { TProducts } from "@/types/supabaseTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

type TProp = {
  noOfPages?: number;
  page?: number | undefined;
};

export default function ProductsPaginaton({
  noOfPages,
  page,
}: TProp) {
  const params = useSearchParams()
  const router = useRouter() 

  const handlePagination = (type: "plus" | "minus")=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  if(type === "plus"){
    const updatedQuery:any = {
      ...currentQuery, 
        page: page && page + 1
    }
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
  } else if(type ==="minus"){
    const updatedQuery:any = {
      ...currentQuery, 
        page: page && page - 1
    }
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
  }
  
  }

  return (
    <div className="w-full flex justify-center my-6 mb-6 gap-3">
      {page && page > 1 && <button
      className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth"
        onClick={()=>handlePagination("minus")}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>}
      {/* <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            1
        </button> */}
      {page! < noOfPages! && <button
        onClick={()=>handlePagination("plus")}
        className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth"
      >
                <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>}
    </div>
  );
}
