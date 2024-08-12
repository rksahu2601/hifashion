"use client";

import { signout } from "@/actions/authActions";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

type PropType = { user: User | null };

export default function AuthBtns({ user }: PropType) {
console.log("user:", user)

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <button
          onClick={() => signout()}
          className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2"
        >
          Sign out
        </button>
      ) : (
        <Link
          className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2"
          href="/signin"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
