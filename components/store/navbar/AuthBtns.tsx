"use client"

import { signout } from '@/actions/authActions'
import Link from 'next/link'

// type PropType = { user: User | null }

export default function AuthBtns() {
  return (
    <div className="flex items-center gap-3">
        <Link className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2" href="/signin">Sign In</Link>
        <button onClick={()=>signout()} className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2" >Sign out</button>
    </div>
  )
}
