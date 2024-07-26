"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

type PropsType={
    setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  }

export default function OrderPlacedPopup({setOpenPopUp}:PropsType) {
  return (
    <div
    className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 grid place-items-center z-[1000]">
        <motion.div
        initial={{scale: .5, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: .5}} className="relative w-[300px] md:w-[350px] h-[400px] shadow-md rounded-2xl overflow-hidden bg-slate-100">
          <div className="bg-gradient-to-r from-primary/40 to-secondary/40 w-full h-[40%] blur-[30px]"/>
          <Image src="/check-mark.gif" alt="" className="w-28 mx-auto mt-10 absolute top-6 left-1/2 -translate-x-[50%] border-4 border-slate-100 rounded-full shadow-md" height={200} width={200} />
          <div className="w-full flex flex-col items-center mt-[50px] text-center gap-y-4">
          <p className="font-semibold text-xl w-[70%]">Your order has been accepted</p>
          <p className="text-xs opacity-70">Transaction ID: <span></span>MD86979167</p>
          <Link onClick={()=>setOpenPopUp(false)} href="/store" className="cursor-pointer bg-secondary px-3 py-2 rounded-full text-sm text-white font-semibold hover:opacity-70 active:scale-75 transition duration-500">Continue Shopping</Link></div>
        </motion.div>
      </div>
  )
}
