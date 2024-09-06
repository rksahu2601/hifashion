"use client";

import Link from "next/link";
import Button from "@/components/Button";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import NairaSvg from "@/components/NairaSvg";

export default function CartOrderSummary() {
  const selectOptions = [
    "Standard Delivery - $5.00",
    "Premium Delivery - $10.00",
  ];

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const cart = useCartStore(state => state.cart)
  const cartTotal = cart.reduce((acc, currVal)=>{
    return acc + (currVal.qty * currVal.price!)
  }, 0)

  return (
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      className=" bg-primary text-gray-200 rounded-md p-3 md:p-4 max-md:mt-3 col-span-4"
    >
      <div className="p-2 md:py-8 md:px-4 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-semibold ">Order Summary</h1>
        <hr className="my-4 md:my-6 bg-primary-70" />
        <div className="flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8">
          <h2>Items {cart.length}</h2>
          <p className="text-sm flex items-center gap-1">${cartTotal}</p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <label htmlFor="deliveryOption" className="font-semibold">
            Delivery Options
          </label>
          <select
            id="deliveryOption"
            className="w-full border p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm text-gray-200 bg-primary"
          >
            {selectOptions.map((option) => (
              <option key={option} className="">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 items-start flex-1">
          <label htmlFor="promoCode" className="font-semibold">
            PROMO CODE
          </label>
          <input
            id="promoCode"
            placeholder="Enter your code"
            className="w-full border border-slate-300 bg-primary/20 p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm"
          />
        </div>
        <Button solid label="APPLY" className="my-6 w-fit bg-white text-primary" />
        <div className="flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8">
          <h2 className="uppercase">Total cost</h2>
          <p className="text-sm flex items-center gap-1">${cartTotal}</p>
        </div>
        <Link
          href="/checkout"
          className="px-4 py-2 text-white bg-secondary hover:bg-secondary/80 text-sm md:text-base font-semibold text-center rounded-md active:scale-75 transition duration-500"
        >
          CHECKOUT
        </Link>
      </div>
    </motion.section>
  );
}
