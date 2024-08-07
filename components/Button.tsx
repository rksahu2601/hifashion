import { cn } from "@/lib/utils";

type PropType = {
  label: string;
  solid?: boolean;
  className?: string;
  onClick?: ()=>void;
};

export default function Button({ label, solid, className, onClick }: PropType) {
  return (
    <button
    onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md border border-primary text-sm font-semibold hover:opacity-70 transition duration-500 active:scale-75",
        solid ? "bg-primary text-white" : "bg-white text-primary",
        className
      )}
    >
      {label}
    </button>
  );
}
