"use client";

import { Search, SearchCheckIcon, SearchSlashIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Searchbar() {
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const variants = {
    initial:{
      opacity: 0,
      y: 100
    },
    animate:{
      opacity: 1,
      y: 0
    }
  }
  return (
    <div>
      {/* for large screens */}
      <div className="relative">
        <div className="hidden md:flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <motion.input
            onFocus={() => setOpenSearchDropdown(true)}
            onBlur={() => setOpenSearchDropdown(false)}
            initial={{
              width: "8rem",
            }}
            whileFocus={{
              width: "25rem",
            }}
            className=" bg-transparent outline-none focus:w-[13rem] transition placeholder:text-xs"
            placeholder="Search products..."
            type="search"
          />
          <button>
            <Search className="w-4 h-4 opacity-40" />
          </button>
        </div>

          <motion.div variants={variants} initial="initial" animate={openSearchDropdown ? "animate" : "initial"} transition={{duration: .5}} className="w-[28rem] p-4 flex justify-center items-center bg-white border h-40 rounded absolute top-[3.2rem] right-0 shadow-md">
            <SearchSlashIcon className="w-4 h-4 text-muted-foreground mr-2" />
            No result found
          </motion.div>

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
