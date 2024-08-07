"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import CustomInput from "../backoffice/CustomInput"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../Button"
import { z } from "zod"
import Link from "next/link"
import { motion } from 'framer-motion';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "minimum of 6 characters!")
})

export default function SignInForm() {
const router = useRouter()

const {register, reset, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    resolver: zodResolver(formSchema)
})

const onSubmit = (data: FieldValues)=>{
    console.log(data)
    reset()
}

  return (
    <>
        <button className="flex items-center gap-2 font-semibold" onClick={()=>router.back()}><ChevronLeft  /> <span>Back</span></button>
        <div className="grid place-items-center mt-1">
                <motion.form
                initial={{
                    y: 30,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{duration: .5}}
                onSubmit={handleSubmit(onSubmit)} className="md:shadow md:border md:p-10 mt-4 md:mt-10 rounded-3xl max-md:w-full md:min-w-[500px]">
                   <div className="text-center">
                   <h1 className="font-semibold text-lg ">Welcome Back!</h1>
                   <p className="text-gray-500">We missed you! Please enter your details.</p>
                   </div>
                   <div className="mt-6 md:mt-10 flex flex-col gap-3">
                    <CustomInput
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />
                    <CustomInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                        type="password"
                    />
                    <Button className="mt-4 bg-secondary border-secondary py-3" solid label="Sign in" />
                   </div>
                   <div className="mt-6 text-center text-gray-500">
                    Dont have an account ? <Link className="font-semibold text-secondary" href="/signup">Sign up</Link>
                   </div>
                </motion.form>
        </div>
    </>
  )
}
