import Navbar from '@/components/store/navbar/Navbar';
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='overflow-y-hidden'>
      <Navbar />
      {children}
    </div>
  )
}
