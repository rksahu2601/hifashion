"use client";

import { MenuSquare, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MobileMenu() {
  const [showNav, setShowNav] = useState(false);
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
        <div className="h-full flex flex-col justify-between">
          <h2>Links</h2>
        <Link className="text-white w-full rounded px-3 py-2 bg-secondary hover:shadow transition-smooth mb-16" href="/signin">Sign In</Link>
        </div>
      </nav>
    </>
  );
}
