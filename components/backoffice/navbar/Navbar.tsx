"use client"

import { Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import AdminSearchBox from "./AdminSearchBox";
import { Dispatch, SetStateAction } from "react";
import Logo from "@/components/Logo";

type NavType = {
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({setShowSideBar}:NavType) {
  return (
    <nav className="box-shadow bg-white p-2 h-16 fixed top-0 left-0 w-full z-[999]">
      <div className="dashboardContain flex justify-between h-full gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="w-full flex gap-2 items-center md:justify-between">
            <Logo />
            <span onClick={()=>setShowSideBar(prev=>!prev)}>
              <Menu className="w-8 h-8 cursor-pointer" />
            </span>
          </div>
          <div className="hidden w-full md:flex items-center transition duration-500 hover:border-primary/40 hover:shadow-md border border-slate-300 rounded h-9 px-2">
            <input
              type="search"
              placeholder="Search"
              className="w-full border-none focus:outline-none h-full"
            />
            <Search className="cursor-pointer w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="w-full ">
          <div className="ml-auto flex items-center gap-2 w-fit">
            <AdminSearchBox />
            <Link
              className="flex items-center gap-2 border rounded p-3 hover:border-slate-400 hover:shadow transition duration-500"
              href="/store"
            >
              <ShoppingBag className="text-muted-foreground w-5 h-5" />
              <span className="font-semibold text-sm">View Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
