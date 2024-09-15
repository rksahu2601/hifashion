import AnalyticCard from "@/components/backoffice/AnalyticCard";
import OverviewChart from "@/components/backoffice/OverviewChart";
import {
  getDataThisWeek,
  getRevenueThisWeek,
  getRevenueToday,
  getTotalToday,
} from "@/lib/analytics/analyticsData";
import { createClient } from "@/lib/supabase/server";

type TWeekRevenue = {
  key: string;
  value: number;
}

export default async function Overview() {
  const supabase = createClient();

  const [productsData, orderData, profilesData] = await Promise.all([
    supabase.from("products").select("*", { count: "exact" }),
    supabase.from("orders").select("*", { count: "exact" }),
    supabase.from("profiles").select("*", { count: "exact" }),
  ]);

  const completedOrders = orderData.data?.filter(
    (order) => order.status === "completed"
  );
  const totalRevenue = completedOrders?.reduce((acc, order) => {
    return acc + order.totalPrice!;
  }, 0);

  // Daily Analytics
  const totalRevenueToday = await getRevenueToday();
  const totalOrdersToday = await getTotalToday("orders");
  const totalProductsToday = await getTotalToday("products");

  // Revenue in the last seven days
  const totalRevenueThisWeekArr = await getRevenueThisWeek();
  // restructure array
  const weekRevenueArr = totalRevenueThisWeekArr.map((obj) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key].reduce((acc, curr) => {
        return acc + curr.totalPrice!;
      }, 0);

      return {
        key,
        value
      };
    })[0];
  });

  console.log("Array", weekRevenueArr)

  const totalRevenueThisWeek = weekRevenueArr.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);
  const avgRevenueThisWeek = totalRevenueThisWeek / 7;

  // Orders in the last seven days
  const ordersThisWeek = await getDataThisWeek("orders");
  const totalOrdersThisWeek = ordersThisWeek.reduce((acc, curr) => {
    return acc + curr.dataPerDay.length;
  }, 0);
  const avgOrderThisWeek = totalOrdersThisWeek / 7;

  // Products in the last seven days
  const productsThisWeek = await getDataThisWeek("products");
  const totalProductsThisWeek = productsThisWeek.reduce((acc, curr) => {
    return acc + curr.dataPerDay.length;
  }, 0);
  const avgProductsThisWeek = totalProductsThisWeek / 7;

  return (
    <div className="max-w-[75rem] mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 mt-6">Overview</h1>
      <div className="flex flex-wrap gap-6 items-center">
        <AnalyticCard
          currency
          label="Total Revenue"
          totalvalue={totalRevenue || 0}
          totalToday={totalRevenueToday}
          weeklyAvg={avgRevenueThisWeek}
          badgeValue={
            ((totalRevenueToday - avgRevenueThisWeek) / avgRevenueThisWeek) *
            100
          }
        />
        <AnalyticCard
          label="Total Products"
          totalvalue={productsData.count || 0}
          totalToday={totalProductsToday}
          weeklyAvg={avgProductsThisWeek}
        />
        <AnalyticCard
          label="Total Orders"
          totalvalue={orderData.count || 0}
          totalToday={totalOrdersToday}
          weeklyAvg={avgOrderThisWeek}
          badgeValue={
            ((totalOrdersToday - avgOrderThisWeek) / avgOrderThisWeek) * 100
          }
        />
      </div>
      <OverviewChart<TWeekRevenue> data={weekRevenueArr} />
    </div>
  );
}
