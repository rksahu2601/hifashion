import { getUserSession } from '@/lib/getSession';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
const user = await getUserSession()
console.log("user from home", user)

  return (
    <div className="flex justify-center items-center h-screen overflow-y-hidden gap-2">
      <Link href="/store" className="px-4 py-2 rounded bg-black text-white">Store</Link>
      <Link href="/dashboard/overview" className="px-4 py-2 rounded bg-cyan-600 text-white">Admin</Link>
      {user && <div>{user.email} <span>{user.role}</span></div> }
    </div>

  );
}