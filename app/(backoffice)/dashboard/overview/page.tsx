import AnalyticCard from "@/components/backoffice/AnalyticCard";
import OverviewBarChart from "@/components/backoffice/OverviewBarChart";
import OverviewPieChart from "@/components/backoffice/OverviewPieChart";
import {
  getDataThisWeek,
  getRevenueThisWeek,
  getRevenueToday,
  getTotalToday,
} from "@/lib/analytics/analyticsData";
import { getUserSession } from "@/lib/getSession";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

type TWeekRevenue = {
  key: string;
  value: number;
};
type TCountArr = {
  id: number |undefined;
  image: string |undefined | null;
  name: string |undefined | null;
  price: number |undefined | null;
  count: number;
};

export default async function Overview() {
  const supabase = createClient();

  const user = await getUserSession();

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
        value: Number(value.toFixed(2)),
      };
    })[0];
  });

  console.log("Array", weekRevenueArr);

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

  // most bought products
  const orderProducts = await supabase
    .from("orderProduct")
    .select()
    .eq("status", "completed");

  const countMap = orderProducts.data?.reduce((acc, curr) => {
    if (acc[curr.name as string]) {
      acc[curr.name as string]++;
    } else {
      acc[curr.name as string] = 1;
    }

    return acc;
  }, {} as Record<string, number>);

  const countArr = Object.keys(countMap as Record<string, number>)
    .map((name) => {
      const product = orderProducts.data?.find(
        (product) => product.name === name
      );

      return {
        id: product?.id,
        image: product?.image,
        name: product?.name,
        price: product?.price,
        count: countMap![name],
      };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-[90rem] mx-auto">
      <h1 className="text-2xl md:text-3xl font-medium mt-6">
        Welcome back, {user?.firstname} {user?.lastname}
      </h1>
      <p className="mb-6 text-muted-foreground">Here&apos;s what your store is saying today</p>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full md:col-span-9">
          <div className="grid grid-cols-3 gap-6 items-start">
            <AnalyticCard
            className="col-span-full md:col-span-1"
              currency
              label="Total Revenue"
              totalvalue={totalRevenue || 0}
              totalToday={totalRevenueToday}
              weeklyAvg={avgRevenueThisWeek}
              badgeValue={
                ((totalRevenueToday - avgRevenueThisWeek) /
                  avgRevenueThisWeek) *
                100
              }
            />
            <AnalyticCard
             className="col-span-full md:col-span-1"
              label="Total Orders"
              totalvalue={orderData.count || 0}
              totalToday={totalOrdersToday}
              weeklyAvg={avgOrderThisWeek}
              badgeValue={
                ((totalOrdersToday - avgOrderThisWeek) / avgOrderThisWeek) * 100
              }
            />
              <AnalyticCard
               className="col-span-full md:col-span-1"
                label="Total Products"
                totalvalue={productsData.count || 0}
                totalToday={totalProductsToday}
                weeklyAvg={avgProductsThisWeek}
              />
          </div>

          <div className="w-full h-fit border shadow p-2 rounded-lg mt-6">
            <h2 className="text-2xl mb-4 font-semibold">
              Earnings in the last seven days
            </h2>
            <div className="w-full h-[18rem]">
            <OverviewBarChart<TWeekRevenue> data={weekRevenueArr.reverse()} />
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3 mb-4">
          <div className="border shadow rounded-lg p-2">
            <h2 className="text-xl mb-4 font-semibold">Top selling products</h2>
              <div className="relative flex w-full h-[12rem] justify-center items-center mb-4">
                <OverviewPieChart<TCountArr> data={countArr.slice(0, 5)} />
              </div>
              
              {countArr.slice(0, 5).map(({ name, image, id, price }) => (
                <Link
                  key={id}
                  href={`/product/${id}`}
                  className="h-10 w-full rounded-md pb-1 mb-2 flex items-center hover:bg-slate-100 transition px-1"
                >
                  <div className="relative h-full w-8 mr-4 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={image as string}
                      className="object-cover"
                      alt={"product image"}
                      fill
                    />
                  </div>
                  <h2 className="line-clamp-1 mr-8 text-xs font-semibold">
                    {name}
                  </h2>
                  <p className="ml-auto font-semibold text-sm">
                    ${price!.toFixed(2)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
