"use client"

import { Search } from "lucide-react";
import { useState } from "react";

export default function AdminSearchBox() {
    const [showSearchBox, setShowSearchBox ] = useState(false)
  return (
    <div className="md:hidden">
        <Search onClick={()=>setShowSearchBox(prev=>!prev)} className="cursor-pointer" />
        {
            showSearchBox && <div className="absolute bg-white top-20 right-2 left-2 flex items-center transition duration-500 hover:border-primary/40 hover:shadow-md border border-slate-300 rounded h-9 px-2">
            <input
              type="search"
              placeholder="Search"
              className="w-full border-none focus:outline-none h-full"
            />
            <Search className="cursor-pointer w-4 h-4 text-muted-foreground" />
          </div>
        }
    </div>
  )
}
