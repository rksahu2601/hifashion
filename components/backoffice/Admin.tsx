"use client"

import { useState } from 'react';
import Navbar from '../../components/backoffice/navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { cn } from '@/lib/utils';

export default function Admin({children}: {
  children: React.ReactNode;
}) {
const [showSideBar, setShowSideBar] = useState(false)

  return (
    <div className="bg-[#f6f9ff] text-[#444444]">
      <Navbar setShowSideBar={setShowSideBar}/>
      <div className='mt-16 flex gap-6'>
        <Sidebar showSideBar={showSideBar} />
      <main className={cn("py-5 px-8", showSideBar && "md:ml-80")}>{children}</main>
      </div>
    </div>
  )
}
