"use client";

import { MenuSquare, X } from "lucide-react";
import React, { useState } from "react";
import { animate, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [showNav, setShowNav] = useState(true);
  // const variants = {
  //   initial: {
  //     width: 0
  //   },
  //   animate:{
  //     width: "80%"
  //   }
  // }
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
      </nav>
    </>
  );
}
