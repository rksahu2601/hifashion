"use client";

import { MenuSquare, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signout } from "@/actions/authActions";
import { User } from "@supabase/supabase-js";

type PropType = { user: User | null };

export default function MobileMenu({ user }: PropType) {
  const [showNav, setShowNav] = useState(false);

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
        <div className="h-full flex flex-col justify-between relative">
          <h2>Links</h2>
        {user ? (
        <button
          onClick={() => signout()}
          className="absolute bottom-[150px] text-white w-full rounded px-3 py-2 bg-secondary hover:shadow transition-smooth"
        >
          Log out
        </button>
      ) : (
        <Link className="absolute bottom-[150px] text-white w-full rounded px-3 py-2 bg-secondary hover:shadow transition-smooth" href="/signin">Sign In</Link>
      )}
        </div>
      </nav>
    </>
  );
}
