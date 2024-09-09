import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

type PropType = {
    currency?:boolean;
    label: string;
    value: string | number;
    icon: IconType;
    iconColor: string;
    iconBg: string;
}

export default function AnalyticCard({currency, label, value, icon:Icon, iconColor, iconBg}:PropType) {
  return (
    <article className="bg-white flex-1 rounded-xl p-3 shadow-md">
      <div className="flex flex-col items-center gap-2">
        <div className={cn("w-10 aspect-square rounded-md flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
        <p className="text-gray-400 font-semibold">{label}</p>
        {currency ? <h2 className="text-3xl font-semibold">${value}</h2> : <h2 className="text-3xl font-semibold">{value.toString().padStart(2, "0")}</h2>}
      </div>
    </article>
  );
}
