import Image from "next/image";
import React from "react";

export default function ProductImages() {
  return (
    <div className="w-full">
      <div className="relative w-full h-[25rem] mb-3 border rounded ">
        <Image src="/test1.jpg" className="object-contain" fill alt="" />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-[8rem] aspect-square border-[3px] border-primary rounded cursor-pointer">
          <Image src="/test1.jpg" className="object-cover" fill alt="" />
        </div>
        <div className="relative w-[8rem] aspect-square">
          <Image src="/test1.jpg" fill alt="" />
        </div>
        <div className="relative w-[8rem] aspect-square">
          <Image src="/test1.jpg" fill alt="" />
        </div>
        <div className="relative w-[8rem] aspect-square">
          <Image src="/test1.jpg" fill alt="" />
        </div>
      </div>
    </div>
  );
}
