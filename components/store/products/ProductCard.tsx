"use client";
import { Heart, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { TProducts } from "@/types/supabaseTypes";
import NairaSvg from "@/components/NairaSvg";
import Button from "@/components/Button";

type PropType = {
  product: TProducts | null;
};

export default function ProductCard({ product }: PropType) {
  const [imgUrl, setImgUrl] = useState(product?.images[0]);

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween" }}
      viewport={{ once: true }}
      className=" overflow-hidden border border-slate-300"
    >
      <Link href={`product/${product?.id}`}>
        <div
          onMouseOver={() => setImgUrl(product?.images.length! > 1 ? product?.images[1] : product?.images[0])}
          onMouseLeave={() => setImgUrl(product?.images[0])}
          className="relative h-[14rem] md:h-[20rem]"
        >
          <Image className="object-cover" src={imgUrl as string} alt="" fill />
          <div className="absolute z-10 flex items-center justify-between w-full p-2 md:p-4">
            <span className="uppercase bg-secondary/30 px-3 py-1 text-xs rounded-full text-secondary font-bold">
              New
            </span>
            <span className="text-muted-foreground cursor-pointer">
              <Heart />
            </span>
          </div>
        </div>
      </Link>
      <div className="p-2 md:p-4">
        <h2 className="text-base md:text-lg font-semibold truncate">
          {product?.name}
        </h2>
        <div className="md:flex justify-between items-end">
          <div>
            <span className="text-muted-foreground text-xs">{product?.category}</span>
            <h2 className="text-xl font-semibold flex gap-1 items-center ">
              <NairaSvg />
              <span>{product?.price}</span>
            </h2>
          </div>
          {/* <button className="bg-secondary text-white rounded p-2 active:scale-75 transition duration-500  ">
            <ShoppingBagIcon className="w-4 h-4" />
          </button> */}
          <Button label="Add to cart" className="border-gray-400 py-1 rounded-none text-gray-900 max-md:mt-2 max-md:text-xs max-md:w-full" />
        </div>
      </div>
    </motion.article>
  );
}
