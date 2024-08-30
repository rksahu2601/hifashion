import { User2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProfileIcon() {
  return (
    <Link href="/dashboard/overview" >
        <User2Icon className="w-6 h-6 opacity-60" />
    </Link>
  )
}
