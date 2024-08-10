"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "../backoffice/CustomInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { object, z } from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { signup } from "@/actions/authActions";

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "minimum of 6 characters!"),
  firstname: z.string().min(2, "minimum of 2 characters!"),
  lastname: z.string().min(2, "minimum of 2 characters!"),
});

export type signUpT = typeof signUpFormSchema



export default function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    try {
      setLoading(true);
      await signup(data);
      setLoading(false);
      // reset();
      toast.success("Sign in successful");
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-2 font-semibold"
        onClick={() => router.back()}
      >
        <ChevronLeft /> <span>Back</span>
      </button>
      <div className="grid place-items-center mt-1 mb-6">
        <motion.form
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="md:shadow md:border md:p-10 mt-4 md:mt-10 rounded-3xl max-md:w-full md:min-w-[500px]"
        >
          <div className="text-center">
            <h1 className="font-semibold text-lg ">Sign Up</h1>
            <p className="text-gray-500">Create an account to continue</p>
          </div>
          <div className="mt-6 md:mt-10 flex flex-col gap-3">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />
            <CustomInput
              label="First Name"
              name="firstname"
              placeholder="John"
              register={register}
              errors={errors}
            />
            <CustomInput
              label="Last Name"
              name="lastname"
              placeholder="Doe"
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
            <Button disabled={loading} className="mt-4 bg-secondary border-secondary py-3" solid label={loading ? "Signing un..." :"Sign Up"} />
          </div>
          <div className="mt-6 text-center text-gray-500">
            Already have an account ?{" "}
            <Link className="font-semibold text-secondary" href="/signin">
              Sign in
            </Link>
          </div>
        </motion.form>
      </div>
    </>
  );
}
