"use client"

import { cn } from "@/lib/utils";
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

  const handlePagination = (type?: "plus" | "minus" | "index" , index?: number)=>{
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
  } else if (type === "index" && index){
    const updatedQuery:any = {
      ...currentQuery, 
        page: index
    }
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
  }
  
  }

  return (
    <div className="w-full flex items-center justify-between my-6 mb-6 gap-2">
      <button
      disabled={page === 1}
      className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
        onClick={()=>handlePagination("minus")}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="max-md:sr-only">Previous</span>
      </button>
      <div className="flex items-center justify-center gap-2">
      {
        Array.from({length: noOfPages!}, (_, i)=>(
          <button
          key={i}
          onClick={()=>handlePagination("index", i+1)}
          className={cn('w-8 h-8 text-xs rounded-md flex items-center justify-center bg-slate-200 hover:bg-secondary hover:text-white transition duration-500', page === (i + 1) && "text-white bg-secondary")}>
            {i + 1}
        </button>
        ))
      }
      </div>
      <button
      
      disabled={page === noOfPages}
        onClick={()=>handlePagination("plus")}
        className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none"
      >
                <span className="max-md:sr-only">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
