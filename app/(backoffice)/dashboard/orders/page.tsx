import { DataTable } from "@/components/DataTable/data-table"
import { createClient } from "@/lib/supabase/server"
import { columns, statuses } from "./table-data"

export default async function Orders() {
  const supabase = createClient()
  const {data: orders} = await supabase.from("orders").select().order("created_at", {ascending: false})

  // const orderItems = orders![0].orderItems.map((items)=>JSON.parse(items as string))
  // console.log("Orders Items", orderItems)
  
    return (
      <div className="">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Your Orders</h1>
        {orders && <DataTable data={orders} filterField="orderId" columns={columns} facetedFilterOptions={statuses} facetedFilterValue="status" facetedFilterTitle="Filter" />}
      </div>
    )
  }
  