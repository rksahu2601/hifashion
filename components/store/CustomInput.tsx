import { cn } from "@/lib/utils";

type InputType = {
    label: string;
    name: string;
    type?:string;
    className?:string;
    placeholder: string;
    required?: boolean;
}

export default function CustomInput({label, name, type="text", className, placeholder, required}: InputType) {
  return (
    <div className="flex flex-col gap-2 items-start flex-1">
        <label htmlFor={name} className="font-semibold">{label}{required && "*"}</label>
        <input id={name}  placeholder={placeholder} className={cn("w-full border p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm", className)} type={type} />
    </div>
  )
}
