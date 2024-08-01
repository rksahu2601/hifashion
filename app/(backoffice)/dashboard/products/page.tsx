import Link from 'next/link'
import React from 'react'

export default function Products() {
  return (
    <div>
      <Link href="/dashboard/products/new" className="px-3 py-2 border rounded">New</Link>
    </div>
  )
}
