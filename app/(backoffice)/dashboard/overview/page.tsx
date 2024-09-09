import AnalyticCard from "@/components/backoffice/AnalyticCard";
import { createClient } from "@/lib/supabase/server";

import { AiFillProduct, AiTwotoneMoneyCollect } from "react-icons/ai";
import { FaBagShopping, FaUsers } from "react-icons/fa6";

export default async function Overview() {
  const supabase = createClient();

  const [productsData, orderData, profilesData] = await Promise.all([
    supabase.from("products").select("*", { count: "exact" }),
    supabase.from("orders").select("*", { count: "exact" }).eq("status", "completed"),
    supabase.from("profiles").select("*", { count: "exact" }),
  ]);

  const totalIncome = orderData.data?.reduce((acc, order) => {
    return acc + order.totalPrice!;
  }, 0);

  return (
    <div className="max-w-[75rem] mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 mt-6">Overview</h1>
      <div className="flex flex-wrap gap-6 items-center">
        <AnalyticCard
          label="Total Products"
          value={productsData.count || 0}
          icon={AiFillProduct}
          iconColor="text-green-600"
          iconBg="bg-green-600/10"
        />
        <AnalyticCard
          label="Total Orders"
          value={orderData.count || 0}
          icon={FaBagShopping}
          iconColor="text-red-600"
          iconBg="bg-red-600/10"
        />
        <AnalyticCard
          label="Total Earnings"
          currency
          value={totalIncome || 0}
          icon={AiTwotoneMoneyCollect}
          iconColor="text-purple-600"
          iconBg="bg-purple-600/10"
        />
        <AnalyticCard
          label="Custormers"
          value={profilesData.count || 0}
          icon={FaUsers}
          iconColor="text-blue-600"
          iconBg="bg-blue-600/10"
        />
      </div>
    </div>
  );
}
