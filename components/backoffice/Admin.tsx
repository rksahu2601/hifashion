"use client"

import { useState } from 'react';
import Navbar from '../../components/backoffice/navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { cn } from '@/lib/utils';
import { getUserSession } from '@/lib/getSession';

export default function Admin({children}: {
  children: React.ReactNode;
}) {
const [showSideBar, setShowSideBar] = useState(false)
  return (
    <div className="">
      <Navbar setShowSideBar={setShowSideBar}/>
      <div className='mt-16 flex gap-6'>
        <Sidebar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      <main className={cn("py-5 px-3 w-full", showSideBar && "md:ml-80")}>{children}</main>
      </div>
    </div>
  )
}

// bg-[#f6f9ff] text-[#444444]