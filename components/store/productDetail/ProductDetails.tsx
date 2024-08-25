"use client"

import {
  Bus,
  File,
  FormInput,
  LucideTruck,
  Star,
  StarIcon,
  StarOff,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import SetQtyBtns from "../SetQtyBtns";
import Button from "@/components/Button";
import { TProducts } from "@/types/supabaseTypes";
import { cn } from "@/lib/utils";

type PropType = {
  product: TProducts | null;
};

export default function ProductDetails({ product }: PropType) {
  const [showFullDesc, setShowFullDesc] = useState(false)
  
  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-medium">
          {product?.name}
        </h1>
        <p className={cn(" mt-3 text-accent-foreground md:w-[80%] ", !showFullDesc && "line-clamp-3")}>
          {product?.description}
        </p>
        <button onClick={()=>setShowFullDesc(prev=>!prev)} className="text-xs underline mb-3">{showFullDesc ? "show less" : "show more"}</button>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="my-6 text-2xl md:text-3xl font-bold">${product?.price}</p>
      <div className="flex gap-3 items-center w-full">
        <SetQtyBtns />
        <p className="text-xs">
          Only{" "}
          <span className="text-secondary font-semibold">
            {product?.quantity} items
          </span>{" "}
          left <br />
          Dont miss it
        </p>
      </div>
      {product?.variants && product.variants.length > 0 && (
        <div className="my-6">
          <h2 className="text-xl font-semibold">Select Variant</h2>
          <div className="flex gap-2 items-center mt-3 justify-start">{
            product.variants.map((variant, i)=>{
              return(
                <div key={i} className="h-8 text-sm font-semibold flex items-center justify-center border-2 rounded-md cursor-pointer px-3 bg-white hover:bg-primary hover:text-white transition-smooth hover:border-transparent">{variant}</div>
              )
            })
            }</div>
        </div>
      )}
      <div className="flex items-center my-6 gap-3 lg:w-[60%]">
        <Button label="Buy Now" solid className="flex-1" />
        <Button label="Add To Cart" className="flex-1" />
      </div>
      {product?.deliveryInfo && <div className="border rounded w-full md:w-[80%]">
        <div className="flex gap-3 items-start p-3">
          <LucideTruck className="w-5 h-5 text-secondary" />
            <div>
            <h2 className="font-semibold">Delivery details</h2>
            <p className="text-sm text-accent-foreground">
              {product.deliveryInfo}
            </p>
          </div>
        </div>
      </div>}
      <button className="underline text-sm mt-6">Continue Shopping</button>
    </div>
  );
}
