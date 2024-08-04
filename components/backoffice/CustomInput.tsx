import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Ban } from "lucide-react";

type InputType = {
    label: string;
    name: string;
    type?:string;
    className?:string;
    placeholder: string;
    required?: boolean;
    mutedLabel?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}



export default function CustomInput({label, name, type="text", className, placeholder, required, mutedLabel, register, errors}: InputType) {
  return (
    <div className="flex flex-col gap-2 items-start flex-1">
        <label htmlFor={name} className={cn("font-semibold", mutedLabel ? "text-sm text-slate-500" : "" )}>{label}{required && <span className="text-red-600">*</span>}</label>
        <input {...register(name)} id={name}  placeholder={placeholder} className={cn("w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm", className)} type={type} />
        {errors[name] && <div className="flex items-center text-rose-600 gap-1">
            <Ban className="w-3 h-3" />
            <p className="text-xs  ">
              {errors[name].message as string}
            </p>
          </div>}
    </div>
  )
}
