"use client";

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Ban, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputType = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  placeholder: string;
  required?: boolean;
  mutedLabel?: boolean;
  isPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export default function CustomInput({
  label,
  name,
  type = "text",
  className,
  placeholder,
  required,
  mutedLabel,
  register,
  errors,
  isPrice,
}: InputType) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col gap-2 items-start flex-1">
      <label
        htmlFor={name}
        className={cn(
          "font-semibold",
          mutedLabel ? "text-sm text-slate-500 " : ""
        )}
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div
        className={cn(
          "w-full",
          isPrice || type === "password"
            ? "flex items-center gap-2 border border-slate-300 p-1 rounded"
            : ""
        )}
      >
        {isPrice && (
          <div className="bg-slate-100 py-1 px-4 rounded font-semibold text-slate-500">
            $
          </div>
        )}
        <input
          {...register(name)}
          id={name}
          placeholder={placeholder}
          className={cn(
            "w-full border border-slate-300 rounded focus:outline-none placeholder:text-sm",
            isPrice || type === "password"
              ? "border-transparent"
              : "border-slate-300 focus:border-secondary p-2",
              type === "password" && "p-1",
            className
          )}
          type={showPass ? "text" : type}
        />
        {type === "password" && (
          <button
            onClick={()=>setShowPass(prev=>!prev)}
            type="button"
            className="font-semibold text-slate-400"
          >
            {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[name] && (
        <div className="flex items-center text-rose-600 gap-1">
          <Ban className="w-3 h-3" />
          <p className="text-xs  ">{errors[name].message as string}</p>
        </div>
      )}
    </div>
  );
}
