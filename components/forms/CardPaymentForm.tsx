"use client"

import CustomInput from "@/components/backoffice/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    cvc: z.string().min(3, "minimum of 2 characters"),
    expiryDate: z.string().date(),
    cardHolderName: z.string().min(2, "minimum of 2 characters"),
    cardNumber: z.string().min(2, "minimum of 2 characters"),
    email: z.string().email(),
  });

export default function CardPaymentForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          
        },
      });

      const onSubmit = (data: FieldValues)=>{
        console.log(data)
        reset()
    }

  return (
    <div className="mt-6 md:mt-8">
          <div></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="Your email address"
              className="mb-4"
              required
              register={register}
              errors={errors}
            />
            <CustomInput
              label="Card Holder Name"
              className="mb-4"
              name="cardHolderName"
              placeholder="John Doe"
              required
              register={register}
              errors={errors}
            />
            <CustomInput
              label="Card Number"
              name="cardNumber"
              placeholder="3554****54336"
              required
              register={register}
              errors={errors}
            />
            <div className="w-full flex flex-col md:flex-row gap-4 md:items-center my-4">
              <CustomInput
                label="Expiry"
                name="expiryDate"
                placeholder=""
                required
                type="date"
                register={register}
                errors={errors}
              />
              <CustomInput label="CVC" name="cvc" placeholder="443" required register={register}
            errors={errors} />
            </div>
          </form>
        </div>
  )
}
