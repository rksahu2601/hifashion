import { DataTable } from "@/components/DataTable/data-table"
import { createClient } from "@/lib/supabase/server"
import { columns, statuses } from "./table-data"
import AnalyticCard from "@/components/backoffice/AnalyticCard"

import { MdOutlineBusAlert } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default async function Orders() {
  const supabase = createClient()
  const {data: orders, count} = await supabase.from("orders").select("*", {count:"exact"}).order("created_at", {ascending: false})

  const pendingOrders = orders?.filter(order=>order.status === "pending")
  const completedOrders = orders?.filter(order=>order.status === "completed")
  
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Your Orders</h1>
        <div className="flex flex-wrap gap-6 items-center mb-8">
        <AnalyticCard
        className="flex-1"
          label="Total Orders"
          totalvalue={count || 0}
          icon={FaBagShopping}
          iconColor="text-purple-600"
          iconBg="bg-purple-600/10"
        />
        <AnalyticCard
        className="flex-1"
          label="Completed Orders"
          totalvalue={completedOrders?.length || 0}
          icon={IoMdCheckmarkCircleOutline}
          iconColor="text-red-600"
          iconBg="bg-red-600/10"
        />
        <AnalyticCard
        className="flex-1"
          label="Pending Orders"
          totalvalue={pendingOrders?.length || 0}
          icon={MdOutlineBusAlert}
          iconColor="text-red-600"
          iconBg="bg-red-600/10"
        />
      </div>
        {orders && 
        <div className='bg-white rounded-xl p-3 shadow-md'>
        <DataTable data={orders} filterField="orderId" columns={columns} facetedFilterOptions={statuses} facetedFilterValue="status" facetedFilterTitle="Filter" />
        </div>}
      </div>
    )
  }
  