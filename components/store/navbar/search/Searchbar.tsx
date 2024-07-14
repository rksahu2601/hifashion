"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Searchbar() {
  return (
    <div>
      {/* for large screens */}
      <div className="hidden md:flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
        <motion.input
          initial={{
            width: "8rem",
          }}
          whileFocus={{
            width: "16rem",
          }}
          className=" bg-transparent outline-none focus:w-[13rem] transition placeholder:text-xs"
          placeholder="Search products..."
          type="search"
        />
        <button>
          <Search className="w-4 h-4 opacity-40" />
        </button>
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
