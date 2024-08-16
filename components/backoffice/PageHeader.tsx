import Link from 'next/link'

import { Plus } from 'lucide-react'

type TProp = {
    title: string;
    linkUrl: string;
}

export default function PageHeader({title, linkUrl}: TProp) {

  return (
    <div className='flex items-center justify-between mb-8'>
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
      <Link href={linkUrl} className="px-4 py-2 rounded-md text-sm font-semibold bg-secondary text-white hover:opacity-70 transition duration-500 active:scale-75 disabled:pointer-events-none disabled:opacity-50 flex gap-3 justify-center items-center"><span>New</span> <Plus className='w-4 h-4'/></Link>
      </div>
  )
}
