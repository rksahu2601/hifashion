"use client"

import { useRef } from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ProductImages({images}:{images: string[]}) {
  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )

  return (
    <div className="w-full">
    <Carousel
      plugins={[plugin.current]}
      className=""
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem key={i}>
            <div className="p-1">
              <Image className="w-full bg-slate-100 h-[20rem] lg:h-[40rem] object-cover" src={image || ""} width={500} height={500} alt="" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  
  );
}
