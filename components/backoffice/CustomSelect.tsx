import { cn } from "@/lib/utils";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputType = {
  label: string;
  options: string[];
  name: string;
  className?: string;
  required?: boolean;
  mutedLabel?: boolean;
  register: UseFormRegister<FieldValues>;
};

export default function CustomSelect({
  label,
  options,
  name,
  className,
  required,
  mutedLabel,
  register
}: InputType) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <label htmlFor={name} className={cn("font-semibold", mutedLabel ? "text-sm text-slate-500" : "" )}>{label}{required && <span className="text-red-600">*</span>}</label>
      <select {...register(name)} id={name} className={cn("w-full border p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm bg-transparent", className)}>
        {options.map(option=>(
            <option key={option} className="">{option}</option>
        ))}
      </select>
    </div>
  );
}
