import { getUserSession } from '@/lib/getSession';
import Link from 'next/link';

export default async function Home() {
const user = await getUserSession()
// console.log("user from home", user)

  return (
    <div className="flex max-md:flex-col justify-center items-center h-screen overflow-y-hidden gap-2">
      <Link href="/store" className="px-4 py-2 rounded bg-black text-white">Store</Link>
      {user && <div>Logged in as {user.email} <span className='bg-green-600/10 text-green-600 px-2 py-1.5 rounded-md uppercase text-xs font-semibold'>{user.role}</span></div> }
    </div>
  );
}