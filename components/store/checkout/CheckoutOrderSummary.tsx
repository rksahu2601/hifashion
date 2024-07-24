"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CustomInput from "../CustomInput";
import Button from "@/components/Button";

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

export default function CheckoutOrderSummary() {
  const [paymentType, setPaymentType] = useState<PaymentTypes>(
    PaymentTypes.CASH
  );

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
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
                onClick={() => setPaymentType(type)}
                checked={type === paymentType}
                className="mr-2"
              />
              {type}
            </div>
          ))}
        </div>
      </div>
      {paymentType === PaymentTypes.CARD && <div className="mt-6 md:mt-8">
        <div></div>
        <form>
            <CustomInput label="Email" name="email" type="email" placeholder="Your email address" className="mb-4" required />
            <CustomInput label="Card Holder Name" className="mb-4" name="cardHolderName" placeholder="John Doe" required />
            <CustomInput label="Card Number" name="cardNumber" placeholder="3554****54336" required />
            <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
        <CustomInput
          label="Expiry"
          name="expiryDate"
          placeholder=""
          required
          type="date"
        />
        <CustomInput
          label="CVC"
          name="cvc"
          placeholder="443"
          required
        />
      </div>
        </form>
        </div>}
        <div className="mt-6 md:mt-8">
            <div className="flex items-center justify-between mb-3 opacity-70">
                <p className="font-semibold">Sub Total</p>
                <p className="font-semibold">$547.00</p>
            </div>
            <div className="flex items-center justify-between mb-3 opacity-70">
                <p className="font-semibold">Coupon Discount</p>
                <p className="font-semibold">$-50.00</p>
            </div>
            <div className="flex items-center justify-between mb-3 opacity-70">
                <p className="font-semibold">Shipping Cost</p>
                <p className="font-semibold">$50.00</p>
            </div>
        </div>
        <div className="mt-6 md:mt-8">
            <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">$547.00</p>
            </div>
            <Button label="Pay $547.00" solid className="w-full" />
        </div>
    </motion.section>
  );
}
