"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchResultBox from "./SearchResultBox";

export default function Searchbar() {
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const inPutRef = useRef<HTMLInputElement>(null)

  const handleSearchBox = ()=>{
    // const formFocused = inPutRef.current?.focus()
    // setOpenSearchDropdown(formFocused ? true : false)

    // console.log("block : ", openSearchDropdown)
  }

// useEffect(() => {
//       const formFocused = inPutRef.current?.focus()
//   if(formFocused){
//     setOpenSearchDropdown(true)
//   }else{
//     setOpenSearchDropdown
//   }

  
// }, [inPutRef])


  console.log(openSearchDropdown)


  return (
    <div>
      {/* for large screens */}
      <div onClick={handleSearchBox} className="relative">
        <div
        className="hidden md:flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <motion.input
          onFocus={()=>setOpenSearchDropdown(true)}
          // onBlur={()=>setOpenSearchDropdown(false)}
          ref={inPutRef}
            initial={{
              width: "15rem",
            }}
            whileFocus={{
              width: "30rem",
            }}
            className=" bg-transparent outline-none focus:w-[13rem] transition placeholder:text-xs"
            placeholder="Search products..."
            type="search"
          />
          <button>
            <Search className="w-4 h-4 opacity-40" />
          </button>
        </div>
        {openSearchDropdown && (
          <SearchResultBox
            openSearchDropdown={openSearchDropdown}
            setOpenSearchDropdown={setOpenSearchDropdown}
          />
        )}
      </div>

      {/* for smaller screens */}
      <div className="flex items-center">
        <Link href="/">
          <Search className="md:hidden w-6 h-6 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
