import Link from 'next/link'

export default function AuthBtns() {
  return (
    <div>
        <Link className="hidden md:block border rounded px-3 py-2 hover:border-slate-400 hover:shadow transition-smooth ml-2" href="/signin">Sign In</Link>
    </div>
  )
}
