import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import Badge from "./Badge";

type PropType = {
  currency?: boolean;
  label: string;
  totalvalue: number;
  totalToday?: number;
  weeklyAvg?: number;
  badgeValue?: number;
  className?: string;
  icon?: IconType;
  iconColor?: string;
  iconBg?: string;
};

export default function AnalyticCard({
  currency,
  label,
  totalvalue,
  totalToday,
  badgeValue,
  weeklyAvg,
  icon: Icon,
  iconBg,
  iconColor,
  className,
}: PropType) {
  return (
    <article
      className={cn(
        "bg-white rounded-xl p-3 py-6 border shadow w-full h-full",
        className
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col">
          {badgeValue && <div className="hidden md:block mb-3 w-fit">
            <Badge value={badgeValue} />
          </div>}
          <p className=" text-gray-400 mb-1.5">{label}</p>
          {currency ? (
            <h2 className="text-3xl font-medium mb-2">
              ${totalvalue.toFixed(2)}
            </h2>
          ) : (
            <h2 className="text-3xl font-medium mb-2">
              {totalvalue.toString().padStart(2, "0")}
            </h2>
          )}
          {totalToday !== undefined && (
            <div className="flex gap-2 items-center">
              <h2 className="text-xl font-medium">
                {totalToday.toString().padStart(2, "0")}
              </h2>
              <p className="text-sm text-gray-400">Today</p>
            </div>
          )}
          {weeklyAvg != undefined && (
            <div className="flex gap-2 items-center mb-1.5">
              <h2 className="font-medium text-sm">{weeklyAvg.toFixed(1)}</h2>
              <p className="text-sm text-gray-400">
                on average in the last 7 days
              </p>
            </div>
          )}
        </div>
        {badgeValue && (
          <div className="md:hidden">
            <Badge value={badgeValue} />
          </div>
        )}
        {Icon && (
          <div
            className={cn(
              "w-10 aspect-square rounded-md flex items-center justify-center",
              iconBg
            )}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        )}
      </div>
    </article>
  );
}
