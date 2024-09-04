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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Button from "@/components/Button";

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
        categorySlug: value,
        page: null
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
                <button onClick={()=>handleCategory(cat?.slug)} key={cat.id} className={cn("px-2 py-2 text-left rounded-md block w-full hover:bg-slate-100 transition-smooth", params.get("categorySlug") === cat.slug && "bg-slate-100 ")}>
                  {cat.name}
                </button>
              );
            })}
        </div>
        <div className="mb-[100px]">
        {user ? (
        <button
          onClick={() => signout()}
          className="text-white text-sm w-full rounded px-3 py-1.5 bg-secondary hover:shadow transition-smooth flex gap-1 justify-center items-center"
        >
          <LogOut className="w-4 h-4"/>
          Log out
        </button>
      ) : (
        <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" solid label="Sign in" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log in as either User or Admin</DialogTitle>
            <DialogDescription>
             You have to log in as an admin in order to view the admin dashboard or log in as a user to purchase a product.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-end gap-3 justify-center">
            <DialogClose asChild>
              <Link onClick={()=> setShowNav(false)} className="bg-primary px-3 py-2 rounded-md shadow-sm text-white font-semibold text-sm" href="/signin?role=admin">Log in as Admin</Link>
            </DialogClose>
            <DialogClose asChild>
              <Link onClick={()=> setShowNav(false)} className="bg-white border border-primary px-3 py-2 rounded-md shadow-sm text-primary font-semibold text-sm" href="/signin?role=user">Log in as User</Link>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      )}
        </div>
        </div>
      </nav>
    </>
  );
}
