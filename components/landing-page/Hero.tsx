import Image from "next/image";
import React from "react";
import Button from "../Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-16 contain">
      <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl xl:tracking-[1.52rem] lg:tracking-[.7rem] sm:tracking-[.4rem] tracking-tight text-center font-normal mt-10 mb-4 text-primary">EXPERIENCE EXCELLENCE</h1>
      <div className="h-[85vh] sm:h-[70vh] md:h-[50vh] lg:h-[70vh] flex flex-col sm:flex-row items-center">
        <div className="relative w-full group h-full transition overflow-hidden">
          <Image 
            className="object-top object-cover group-hover:scale-125 group-hover:object-center transition duration-500"
            src="/image6.jpg"
            alt="men image"
            fill
          />
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
        <div className="relative w-full group h-full transition overflow-hidden">
          <Image 
             className="object-top object-cover group-hover:scale-125 group-hover:object-center transition duration-500"
            src="/image1.jpg"
            alt="women image"
            fill
          />
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
