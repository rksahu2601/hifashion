"use client";

import { FieldValues, useForm } from "react-hook-form";
import CustomInput from "../backoffice/CustomInput";
import Button from "../Button";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TUserSession } from "@/lib/getSession";
import { useCheckoutStore } from "@/store/checkout-details-store";
import { editProfile } from "@/actions/profileAction";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart-store";

const formSchema = z.object({
  firstname: z.string().min(2, "minimum of 2 characters"),
  lastname: z.string().min(2, "minimum of 2 characters"),
  address: z.string().min(2, "minimum of 2 characters"),
  city: z.string().min(2, "minimum of 2 characters"),
  zipcode: z.string().optional(),
  phone: z.coerce.number({message: "please add a valid phone number"}),
  email: z.string().email(),
});
export type CheckOutDetailsFormType = z.infer< typeof formSchema>

type PropType = {
  user: TUserSession | null;
};

export default function CheckoutDetailsForm({user}: PropType) {
  

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
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      address: user?.address || "",
      city: user?.city || "",
      zipcode: user?.zipcode || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  const setDeliveryDetails = useCheckoutStore(state=>state.setDeliveryDetails)
  const isLoading = useCheckoutStore(state=>state.isLoading)
  const setIsLoading = useCheckoutStore(state=>state.setIsLoading)

  const onSubmit = (data: FieldValues)=>{
    setIsLoading(true)
    setDeliveryDetails(data)
    editProfile(data).then((res)=>{
      if(!res.success){
       toast.error(res.message)
       setIsLoading(false)
       return
      }
      toast.success(res.message)
    }).finally(()=>{
      setIsLoading(false)
    })
}

// console.log("[STORE DELIVERY DETAILS]", )

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
        
      </div>
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="">
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
          <CustomInput
            label="First Name"
            name="firstname"
            placeholder="John"
            required
            register={register}
            errors={errors}
          />
          <CustomInput
            label="Last Name"
            name="lastname"
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
        <Button loading={isLoading} type="submit" label={isLoading ? "Saving information" :"Save information"} className="text-xs px-2 py-1" />
      </form>
    </motion.div>
  );
}
