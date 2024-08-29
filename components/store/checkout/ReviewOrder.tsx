"use client";

import ReviewItem from "./ReviewItem";
import CheckoutDetailsForm from "@/components/forms/CheckoutDetailsForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from './../../../store/cart-store';
import { TUserSession } from "@/lib/getSession";
import { useCheckoutStore } from "@/store/checkout-details-store";

type PropType = {
  user: TUserSession | null;
};

export default function ReviewOrder({user}:PropType) {
  const [isReturning, setIsReturning] = useState(false);
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate:{ opacity: 1, y: 0,           
    transition:{duration: .5}}
  }

  const cart = useCartStore(state=>state.cart)
  const setDeliveryDetails = useCheckoutStore(state=>state.setDeliveryDetails)

  useEffect(()=>{
      setDeliveryDetails({
        firstname: user?.firstname,
        lastname: user?.lastname,
        city: user?.city,
        zipcode: user?.zipcode,
        address: user?.address,
        phone: user?.phone,
        email: user?.email,
      })
  }, [])

  console.log("USER PROFILE", user)

  return (
    <section className="md:col-span-8 ">
      <motion.div
              variants={variants}
              initial="initial"
              animate="animate" className="border shadow rounded-md p-3 md:p-4 max-h-[30rem] overflow-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-5">
          Review items and shipping
        </h2>
        {
          cart.map(item=>(
            <ReviewItem key={item.itemId} cartItem={item} />
          ))
        }

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
          {
            user ? <>
            <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-3xl font-semibold mb-3 md:mb-5">
              Delivery information
            </h2>
            <button
              onClick={()=>setIsReturning(false)}
              className="text-xs px-4 py-1 rounded-md border border-primary text-primary font-semibold"
            >
              Edit
            </button>
          </div>
          <p className="my-3 font-semibold capitalize">{user.firstname} {user.lastname}</p>
            <p className="my-2">{user.address || "No address yet!"}</p>
            <p className="my-2">+{user.phone || "No phone number yet"}</p>
            <p className="my-2">{user.email || "No email yet"}</p>
            </> : <p>Sign in to see your details</p>
          }
        </motion.div>
      ) : (
        <CheckoutDetailsForm user={user} />
      )}
    </section>
  );
}
