import { Bus, File, FormInput, LucideTruck, Star, StarIcon, StarOff, Truck } from "lucide-react";
import React from "react";
import SetQtyBtns from "../SetQtyBtns";
import Button from "@/components/Button";
import Link from "next/link";

export default function ProductDetails() {
  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mt-3">Airpods max</h1>
        <p className=" my-3 text-accent-foreground md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          voluptas cum corporis voluptates beatae culpa nisi minima optio quae
          reiciendis!
        </p>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
          <Star className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="my-6 text-2xl md:text-3xl font-bold">$300.00</div>
      <div className="flex gap-3 items-center w-full">
        <SetQtyBtns />
        <p className="text-xs">
          Only <span className="text-orange-600 font-semibold">12 items</span>{" "}
          left <br />
          Dont miss it
        </p>
      </div>
      <div className="flex items-center my-6 gap-3 lg:w-[60%]">
        <Button label="Buy Now" solid className="flex-1" />
        <Button label="Add To Cart" className="flex-1" />
      </div>
      <div className="border rounded w-full md:w-[80%]">
        <div className="border-b flex gap-3 items-start p-3">
          <LucideTruck className="w-5 h-5 text-orange-600" />
          <div>
            <h2 className="font-semibold">Free Delivery</h2>
            <Link href="#" className="underline text-sm text-accent-foreground">
              Enter your postal code for delivery avalaibility.
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3">
          <FormInput className="w-5 h-5 text-orange-600" />
          <div>
            <h2 className="font-semibold">Return Delivery</h2>
            <p className="text-sm text-accent-foreground">
              Free 30 days delivery returns.
            </p>
          </div>
        </div>
      </div>
      <button className="underline text-sm mt-6">Continue Shopping</button>
    </div>
  );
}
