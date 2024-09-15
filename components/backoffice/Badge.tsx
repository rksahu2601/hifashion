import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function Badge({ value }: { value: number }) {
  const isPositive = value >= 1;
  const isNegative = value < 1;

  return (
    <div
      className={cn(
        "px-2 py-1 text-xs rounded-md border",
        isPositive
          ? "bg-green-600/10 text-green-600 border-green-200"
          : isNegative
          ? "bg-red-600/10 text-red-600 border-red-200"
          : "bg-gray-600/10 text-gray-600 border-gray-200"
      )}
    >
        {isPositive ? <ArrowUp className="w-3 h-3 text-green-600 mr-1 inline" /> : isNegative ? <ArrowDown className="w-3 h-3 text-red-600 mr-1 inline"/> : ""}
      {isPositive && "+"}
      {value.toFixed(0)}%
    </div>
  );
}
