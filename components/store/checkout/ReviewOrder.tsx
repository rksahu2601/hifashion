"use client";

import ReviewItem from "./ReviewItem";
import CheckoutDetailsForm from "@/components/forms/CheckoutDetailsForm";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ReviewOrder() {
  const [isReturning, setIsReturning] = useState(false);

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate:{ opacity: 1, y: 0,           
    transition:{duration: .5}}
  }

  return (
    <section className="md:col-span-8 ">
      <motion.div
              variants={variants}
              initial="initial"
              animate="animate" className="border shadow rounded-md p-3 md:p-4 max-h-[30rem] overflow-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-5">
          Review items and shipping
        </h2>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </motion.div>
      <motion.div
      variants={variants}
      initial="initial"
      animate="animate" className="flex gap-2 items-center my-6">
        <input
          type="checkbox"
          checked={isReturning}
          onChange={(e) => setIsReturning(e.target.checked)}
        />
        <p>Returning Custormer ?</p>
      </motion.div>
      {isReturning ? (
        <motion.div
        variants={variants}
          initial="initial"
          animate="animate"
          className="border shadow rounded-md p-3 md:p-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-3xl font-semibold mb-3 md:mb-5">
              Delivery information
            </h2>
            <Link
              href="/"
              className="text-xs px-4 py-1 rounded-full border border-primary text-primary font-semibold"
            >
              Edit
            </Link>
          </div>
          <p className="my-3 font-semibold">Kamado Tanjiro</p>
            <p className="my-2">44, Osakawa street Tokyo, Japan.</p>
            <p className="my-2">+2341234432</p>
            <p className="my-2">Kamado@gmail.com</p>
        </motion.div>
      ) : (
        <CheckoutDetailsForm />
      )}
    </section>
  );
}

// {isReturning ? (<motion.div initial={{opacity: 0, x:20}} animate={{opacity: 1, x: 0}} className="border shadow rounded-md p-3 md:p-4">
//     <div className="flex justify-between items-center">
//         <h2 className='text-xl md:text-3xl font-semibold mb-3 md:mb-5'>Delivery information</h2>
//         <Link href="/" className="text-xs px-4 py-1 rounded-full border border-primary text-primary font-semibold">Edit</Link>
//     </motion.div>
// </div>) : ()}
