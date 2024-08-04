import Link from 'next/link'

export default function Categories() {
  return (
    <div>
      <Link href="/dashboard/categories/new" className="px-3 py-2 border rounded">New</Link>
    </div>
  )
}
