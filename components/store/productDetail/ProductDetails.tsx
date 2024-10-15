"use client";

import { LucideTruck, Star } from "lucide-react";
import React, { useState } from "react";
import Button from "@/components/Button";
import { TProducts, TReviews } from "@/types/supabaseTypes";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";
import CustomStarRating from "@/components/custom-star-rating";
import { useRouter } from "next/navigation";

type PropType = {
  product: TProducts | null;
  reviews: TReviews[] | null;
};

export default function ProductDetails({ product, reviews }: PropType) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const router = useRouter()

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const addSingleProductToCart = useCartStore((state) => state.addSingleProductToCart);

  const addItemWithVariantToCart = (product: TProducts)=>{
      if(!selectedVariant){
        toast.error("Select a variant")
        return;
      }

      addToCart(product, selectedVariant)
      setSelectedVariant(null)
      toast.success(`Size ${selectedVariant} added to cart.`)
  }

  const addItemToCart = (product: TProducts | null)=>{
    if(product){
      addToCart(product)
      toast.success("Item added to cart.")
    }
  }

  const handleBuyNow = (product: TProducts | null) => {
      if(product?.variants.length && !selectedVariant){
        toast.error("Select a variant")
        return;
      }

      if(product?.variants.length && selectedVariant){
        addSingleProductToCart(product, selectedVariant)
      } else {
        product && addSingleProductToCart(product)
      }

      router.push("/checkout")
  }

  const averageRating = reviews?.reduce((acc, item)=>{
    return acc + (item.rating ?? 0)/reviews.length
  }, 0) ?? 0
  const ratingValue = Math.ceil(averageRating)

  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-medium">{product?.name}</h1>
        <p
          className={cn(
            " mt-3 text-accent-foreground md:w-[80%] ",
            !showFullDesc && "line-clamp-3"
          )}
        >
          {product?.description}
        </p>
        <button
          onClick={() => setShowFullDesc((prev) => !prev)}
          className="text-xs underline mb-3"
        >
          {showFullDesc ? "show less" : "show more"}
        </button>
        <CustomStarRating readonly rating={ratingValue} />
      </div>
      <p className="my-6 text-2xl md:text-3xl font-bold">${product?.price?.toFixed(2)}</p>
      <div className="flex gap-3 items-center w-full">
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
          <div className="flex gap-2 items-center mt-3 justify-start">
            {product.variants.map((variant, i) => {
              const inCart = cart.some((item)=>item.id === product?.id && item.variant === variant)

              return (
                <button
                  disabled={inCart}
                  onClick={()=>setSelectedVariant(variant)}
                  key={i}
                  className={cn("h-8 text-sm font-semibold flex items-center justify-center border-2 rounded-md cursor-pointer px-3 bg-white hover:bg-primary hover:text-white transition-smooth hover:border-transparent disabled:opacity-35 disabled:bg-primary disabled:border-transparent disabled:text-white disabled:cursor-not-allowed disabled:pointer-events-none", variant === selectedVariant && "bg-primary text-white border-transparent")}
                >
                  {variant}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex items-center my-6 gap-3 lg:w-[60%]">
        {product?.variants.length ? (
          <>
            <Button
            onClick={()=> handleBuyNow(product)}           
            label="Buy Now" solid className="flex-1" />
            <Button
            onClick={()=>addItemWithVariantToCart(product)}
            label="Add To Cart" className="flex-1" />
          </>
        ) : (
          <>
            <Button onClick={()=> handleBuyNow(product)}  label="Buy Now" solid className="flex-1" />
            <Button
              disabled={cart.some((item) => item.id === product?.id)}
              onClick={() => addItemToCart(product)}
              label="Add To Cart"
              className="flex-1"
            />
          </>
        )}
      </div>
      {product?.deliveryInfo && (
        <div className="border rounded w-full md:w-[80%]">
          <div className="flex gap-3 items-start p-3">
            <LucideTruck className="w-5 h-5 text-secondary" />
            <div>
              <h2 className="font-semibold">Delivery details</h2>
              <p className="text-sm text-accent-foreground">
                {product.deliveryInfo}
              </p>
            </div>
          </div>
        </div>
      )}
      <button className="underline text-sm mt-6">Continue Shopping</button>
    </div>
  );
}
