import { cn } from "@/lib/utils";

type InputType = {
    label: string;
    name: string;
    type?:string;
    className?:string;
    placeholder: string;
    required?: boolean;
    mutedLabel?: boolean;
}

export default function CustomInput({label, name, type="text", className, placeholder, required, mutedLabel}: InputType) {
  return (
    <div className="flex flex-col gap-2 items-start flex-1">
        <label htmlFor={name} className={cn("font-semibold", mutedLabel ? "text-sm text-slate-500" : "" )}>{label}{required && <span className="text-red-600">*</span>}</label>
        <input id={name}  placeholder={placeholder} className={cn("w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm", className)} type={type} />
    </div>
  )
}
