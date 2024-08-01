"use client";

import Link from "next/link";
import CustomInput from "../CustomInput";
import Button from "@/components/Button";

import { motion } from "framer-motion";
import CustomSelect from "../CustomSelect";

export default function CartOrderSummary() {

const selectOptions = ["Standard Delivery - $5.00", "Premium Delivery - $10.00"]

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      className="border shadow rounded-md p-3 md:p-4 col-span-4"
    >
      <div className="p-2 md:py-8 md:px-4 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-semibold ">Order Summary</h1>
        <hr className="my-4 md:my-6 bg-gray-600" />
        <div className="flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8">
          <h2>Items 3</h2>
          <p>$457.98</p>
        </div>
        <CustomSelect name="deliveryOption" label="Delivery Options" options={selectOptions} />
        <CustomInput
          label="PROMO CODE"
          name="promoCode"
          className=""
          placeholder="Enter your code"
        />
        <Button solid label="APPLY" className="my-6 w-fit" />
        <div className="flex items-center justify-between font-semibold md:text-lg uppercase mb-4 md:mb-8">
          <h2 className="uppercase">Total cost</h2>
          <p>$457.98</p>
        </div>
        <Link
          href="/checkout"
          className="px-4 py-2 text-white bg-secondary hover:bg-secondary/80 text-sm md:text-base font-semibold text-center rounded-full active:scale-75 transition duration-500"
        >
          CHECKOUT
        </Link>
      </div>
    </motion.section>
  );
}
