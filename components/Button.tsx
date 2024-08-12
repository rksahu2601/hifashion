import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";

type PropType = {
  label: string;
  solid?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: ()=>void;
};

export default function Button({ label, solid, className,disabled,loading, onClick }: PropType) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-md border border-primary text-sm font-semibold hover:opacity-70 transition duration-500 active:scale-75 disabled:pointer-events-none disabled:opacity-50 flex gap-3 justify-center items-center",
        solid ? "bg-primary text-white" : "bg-white text-primary",
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{label}</span>
      
    </button>
  );
}
