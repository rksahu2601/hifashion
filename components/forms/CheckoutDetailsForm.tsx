"use client"

import CustomInput from "../store/CustomInput";
import Button from "../Button";
import { motion } from "framer-motion";

export default function CheckoutDetailsForm() {
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate:{ opacity: 1, y: 0,       
    transition:{duration: .5}}
  }

  return (
    <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
     className="border shadow rounded-md p-3 md:p-4">
      <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-3xl font-semibold mb-3 md:mb-5">
              Delivery information
            </h2>
            <Button label="Save information" className="text-xs px-2 py-1" />
          </div>
          <form className="">
      <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
        <CustomInput
          label="First Name"
          name="firstName"
          placeholder="John"
          required
        />
        <CustomInput
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          required
        />
      </div>
      <CustomInput
        label="Address"
        name="address"
        placeholder="PMB 42 Oshikawa street"
        required
      />
      <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
        <CustomInput label="city" name="city" placeholder="Tokyo" required />
        <CustomInput
          label="Zip code"
          name="zipcode"
          placeholder="129874"
          required
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
        <CustomInput
          label="Phone Number"
          name="phone"
          placeholder="+234 123 1354 245"
          required
        />
        <CustomInput
          label="Email"
          name="email"
          placeholder="johndoe@example.com"
          required
          type="email"
        />
      </div>
    </form>
    </motion.div>

  );
}
