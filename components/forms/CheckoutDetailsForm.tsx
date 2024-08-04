"use client";

import { FieldValues, useForm } from "react-hook-form";
import CustomInput from "../backoffice/CustomInput";
import Button from "../Button";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "minimum of 2 characters"),
  lastName: z.string().min(2, "minimum of 2 characters"),
  address: z.string().min(2, "minimum of 2 characters"),
  city: z.string().min(2, "minimum of 2 characters"),
  zipcode: z.string().min(2, "minimum of 2 characters"),
  phone: z.string().min(2, "minimum of 2 characters"),
  email: z.string().email(),
});

export default function CheckoutDetailsForm() {
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
    },
  });

  const onSubmit = (data: FieldValues)=>{
    console.log(data)
    reset()
}

  return (
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
        <Button label="Save information" className="text-xs px-2 py-1" />
      </div>
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="">
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
          <CustomInput
            label="First Name"
            name="firstName"
            placeholder="John"
            required
            register={register}
            errors={errors}
          />
          <CustomInput
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            required
            register={register}
            errors={errors}
          />
        </div>
        <CustomInput
          label="Address"
          name="address"
          placeholder="PMB 42 Oshikawa street"
          required
          register={register}
          errors={errors}
        />
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
          <CustomInput label="city" name="city" placeholder="Tokyo" required register={register}
          errors={errors} />
          <CustomInput
            label="Zip code"
            name="zipcode"
            placeholder="129874"
            required
            register={register}
            errors={errors}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
          <CustomInput
            label="Phone Number"
            name="phone"
            placeholder="+234 123 1354 245"
            required
            register={register}
            errors={errors}
          />
          <CustomInput
            label="Email"
            name="email"
            placeholder="johndoe@example.com"
            required
            type="email"
            register={register}
            errors={errors}
          />
        </div>
        <button>submit</button>
      </form>
    </motion.div>
  );
}
