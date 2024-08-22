"use client";

import { LogIn, LogOut, MenuSquare, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signout } from "@/actions/authActions";
import { User } from "@supabase/supabase-js";
import { TCategory } from "@/types/supabaseTypes";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

type PropType = { user: User | null , categories: TCategory[] | null};

export default function MobileMenu({ user, categories }: PropType) {
  const [showNav, setShowNav] = useState(false);
  const params = useSearchParams()
  const router = useRouter()

  const handleCategory = ( value: string | null)=>{
    let currentQuery = {};
  
    if(params){
      currentQuery = queryString.parse(params.toString())
      console.log("current query", currentQuery);
    }
  
    const updatedQuery:any = {
      ...currentQuery, 
        categorySlug: value
    }
  
    if(params?.get("categorySlug") === value){
      delete updatedQuery.categorySlug
    }
  
    const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true})
    router.push(url)
    setShowNav(false)
  }

  return (
    <>
      <div onClick={() => setShowNav(true)} className="md:hidden">
        <MenuSquare className="text-muted-foreground w-6 h-6 cursor-pointer" />
      </div>
      <nav
        className={cn(
          "md:hidden absolute w-[80%] bg-white shadow-md h-screen top-0 right-0 p-2 border-l transition",
          !showNav && "translate-x-[100%]"
        )}
      >
        <button onClick={() => setShowNav(false)}>
          <X className="w-6 h-6" />
        </button>
       <div className="h-full flex flex-col justify-between">
        <div className="my-6">
            {categories && categories.map((cat) => {
              return (
                <button onClick={()=>handleCategory(cat?.slug)} key={cat.id} className={cn("px-2 py-1 text-sm text-left rounded-md block w-full hover:bg-slate-100 transition-smooth", params.get("categorySlug") === cat.slug && "bg-slate-100 ")}>
                  {cat.name}
                </button>
              );
            })}
        </div>
        <div className="mb-[150px]">
        {user ? (
        <button
          onClick={() => signout()}
          className="text-white text-sm w-full rounded px-3 py-1.5 bg-secondary hover:shadow transition-smooth flex gap-1 justify-center items-center"
        >
          <LogOut className="w-4 h-4"/>
          Log out
        </button>
      ) : (
        <Link className="text-white text-sm w-full rounded px-3 py-1.5 bg-secondary hover:shadow transition-smooth flex gap-1 justify-center items-center" href="/signin">
          <LogIn className="w-4 h-4" />
          Sign In
        </Link>
      )}
        </div>
        </div>
      </nav>
    </>
  );
}
