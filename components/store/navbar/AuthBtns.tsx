"use client";

import { signout } from "@/actions/authActions";
import { User } from "@supabase/supabase-js";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Button from "@/components/Button";

type PropType = { user: User | null };

export default function AuthBtns({ user }: PropType) {
  console.log("user:", user);

  return (
    <div className="hidden md:flex items-center gap-3">
      {user ? (
        <button
          onClick={() => signout()}
          className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2"
        >
          Sign out
        </button>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button solid label="Sign in" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log in as either User or Admin</DialogTitle>
                <DialogDescription>
                 You have to log in as an admin in order to view the admin dashboard or log in as a user to purchase a product.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-end gap-3 justify-end">
                <DialogClose asChild>
                  <Link className="bg-primary px-3 py-2 rounded-md shadow-sm text-white font-semibold text-sm" href="/signin?role=admin">Log in as Admin</Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link className="bg-white border border-primary px-3 py-2 rounded-md shadow-sm text-primary font-semibold text-sm" href="/signin?role=user">Log in as User</Link>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
