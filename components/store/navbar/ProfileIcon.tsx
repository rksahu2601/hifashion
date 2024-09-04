import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { TUserSession } from "@/lib/getSession";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function ProfileIcon({ user }: { user: TUserSession | null }) {
  const isAdmin = user && user.role === "admin";

  return isAdmin ? (
    <Link
      className="flex items-center gap-2 border border-secondary justify-center bg-secondary/10 px-3 py-1.5 rounded-md "
      href="/dashboard/overview"
    >
      <LayoutDashboard className="w-4 h-4 text-secondary" />
      <span className="text-secondary font-semibold text-sm">Dashboard</span>
    </Link>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
      <button
      className="flex items-center gap-2 border border-secondary justify-center bg-secondary/10 px-3 py-1.5 rounded-md "
    >
      <LayoutDashboard className="w-4 h-4 text-secondary" />
      <span className="text-secondary font-semibold text-sm">Dashboard</span>
    </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in as Admin to view dashboard</DialogTitle>
          <DialogDescription>
            You have to log in as an admin in order to view the admin dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end gap-3 justify-end">
          <DialogClose asChild>
            <Link
              className="bg-primary px-3 py-2 rounded-md shadow-sm text-white font-semibold text-sm"
              href="/signin?role=admin"
            >
              Log in as Admin
            </Link>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
