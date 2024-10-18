"use client"

import Image from "next/image";
import Link from "next/link";

import Button from "../Button";
import { motion } from "framer-motion";

export default function Hero() {

  return (
    <section className="mt-16 contain">
      <motion.h1 initial={{y: "-200px", opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: "spring"}} className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl xl:tracking-[1.52rem] lg:tracking-[.7rem] sm:tracking-[.4rem] tracking-tight text-center font-normal mt-10 mb-4 text-primary">EXPERIENCE EXCELLENCE</motion.h1>
      <div className="h-[85vh] sm:h-[70vh] md:h-[50vh] lg:h-[70vh] flex flex-col sm:flex-row items-center">
        {/* MEN */}
        <div className="relative w-full group h-full transition overflow-hidden">
                   {/* MEN IMAGE 1 */}
          <motion.div
            whileInView={{opacity: 1, }}
            transition={{ repeat: Infinity, repeatType: "mirror", repeatDelay: 6, ease: "backInOut"}}
            className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-top object-cover"
              src="/men1.jpg"
              alt="men image"
              fill
            />
          </motion.div>
                    {/* MEN IMAGE 2 */}
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{delay: 3, repeat: Infinity, repeatType: "mirror", repeatDelay: 6, ease: "backInOut"}}
            className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-center object-cover"
              src="/men2.jpg"
              alt="men image"
              fill
            />
          </motion.div>
                    {/* MEN IMAGE 3 */}
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{delay: 6, repeat: Infinity, repeatType: "mirror", repeatDelay: 6, ease: "backInOut"}}
            className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-cover object-center"
              src="/men3.jpg"
              alt="men image"
              fill
            />
          </motion.div>
          <div className="flex flex-col justify-center items-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-xl text-white text-center font-bold tracking-wider">MEN</h2>
            <Link href="/store">
              <Button 
              label="SHOP NOW"
              className="rounded-none bg-white text-primary border-none text-xs font-bold px-6"
              />
            </Link>
          </div>
        </div>
        {/* WOMEN */}
        <div className="relative w-full group h-full transition overflow-hidden">
                   {/* WOMEN IMAGE 1 */}
          <motion.div
              whileInView={{opacity: 1, }}
              transition={{ repeat: Infinity, repeatType: "mirror", repeatDelay: 4, ease: "backInOut"}}
              className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-top object-cover"
              src="/women1.jpg"
              alt="women image"
              fill
            />
          </motion.div>
                    {/* WOMEN IMAGE 2 */}
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{delay: 2, repeat: Infinity, repeatType: "mirror", repeatDelay: 4, ease: "backInOut"}}
            className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-top object-cover"
              src="/women2.jpg"
              alt="women image"
              fill
            />
          </motion.div>
                    {/* WOMEN IMAGE 3 */}
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{delay: 4, repeat: Infinity, repeatType: "mirror", repeatDelay: 4, ease: "backInOut"}}
            className="absolute inset-0 w-full h-full bg-slate-100">
            <Image 
              className="object-cover object-center"
              src="/women3.jpg"
              alt="women image"
              fill
            />
          </motion.div>
          <div className="flex flex-col justify-center items-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-xl text-white text-center font-bold tracking-wider">WOMEN</h2>
           <Link href="/store">
            <Button 
              label="SHOP NOW"
              className="rounded-none bg-white text-primary border-none text-xs font-bold px-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
