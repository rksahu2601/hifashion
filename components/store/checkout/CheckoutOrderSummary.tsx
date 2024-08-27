"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button";
import CardPaymentForm from "@/components/forms/CardPaymentForm";
import { useCartStore } from "@/store/cart-store";
import NairaSvg from "@/components/NairaSvg";

type PropsType={
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
}

enum PaymentTypes {
  CASH = "Cash on Delivery",
  PAYPAL = "Paypal",
  CARD = "Credit or Debit card",
}

const PaymentTypesArr = [
  PaymentTypes.CASH,
  PaymentTypes.CARD,
  PaymentTypes.PAYPAL,
];

export default function CheckoutOrderSummary({setOpenPopUp}:PropsType) {
  const [paymentType, setPaymentType] = useState<PaymentTypes>(
    PaymentTypes.CASH
  );

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
      animate="animate"
      className="border shadow rounded-md p-3 md:p-4 md:col-span-4"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-5">
        Order Summary
      </h2>
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-5">
          Payment Details
        </h2>
        <div className="">
          {PaymentTypesArr.map((type) => (
            <div key={type} className="mb-3">
              <input
                type="radio"
                onChange={() => setPaymentType(type)}
                checked={type === paymentType}
                className="mr-2"
              />
              {type}
            </div>
          ))}
        </div>
      </div>
      {paymentType === PaymentTypes.CARD && (
        <CardPaymentForm />
      )}
      <div className="mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-3 opacity-70">
          <p className="font-semibold">Sub Total</p>
          <p className="font-semibold text-sm flex items-center gap-1"><NairaSvg />{cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between mb-3 opacity-70">
          <p className="font-semibold">Coupon Discount</p>
          <p className="font-semibold text-sm flex items-center gap-1"><NairaSvg />0.00</p>
        </div>
        <div className="flex items-center justify-between mb-3 opacity-70">
          <p className="font-semibold">Shipping Cost</p>
          <p className="font-semibold text-sm flex items-center gap-1"><NairaSvg />0.00</p>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Total</p>
          <p className="font-semibold text-sm flex items-center gap-1"><NairaSvg/>{cartTotal.toFixed(2)}</p>
        </div>
        <Button onClick={()=>setOpenPopUp(true)} label="Proceed" solid className="w-full" />
      </div>
    </motion.section>
  );
}
