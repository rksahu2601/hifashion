import { cn } from "@/lib/utils";

type PropType = {
  label: string;
  solid?: boolean;
  className?: string;
};

export default function Button({ label, solid, className }: PropType) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full border border-primary text-sm font-semibold hover:opacity-70 transition duration-500 active:scale-75",
        solid ? "bg-primary text-white" : "bg-white text-primary",
        className
      )}
    >
      {label}
    </button>
  );
}
