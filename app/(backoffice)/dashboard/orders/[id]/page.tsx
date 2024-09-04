import NewHeader from "@/components/backoffice/NewHeader";
import { DataTable } from "@/components/DataTable/data-table";
import { formatDateTime } from "@/lib/formatDate";
import { createClient } from "@/lib/supabase/server";
import { TCartItem } from "@/store/cart-store";
import { columns } from "./table-data";
import SetOrderAsCompletedBtn from "@/components/backoffice/orders/SetOrderAsCompletedBtn";
import { TOrder } from "@/types/supabaseTypes";
import toast from "react-hot-toast";

export default async function OrderPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();
  const { error, data: order } = await supabase
    .from("orders")
    .select()
    .eq("orderId", params.id)
    .single();

  if(error){
    return
  }

    const {data: orderProducts} = await supabase.from("orderProduct").select().eq("orderId", order?.orderId)

  return (
    <main className="max-w-6xl mx-auto">
      <NewHeader title={`Order ${order?.orderId}`} subTitle="Order List" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border shadow rounded-md p-3 md:p-4 max-md:min-h-[12rem] flex flex-col justify-between gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-xl">{`Order ${order?.orderId}`}</h2>
              <p className="text-xs mt-1.5">
                {order?.status === "completed" ? (
                  <span className="bg-green-600/10 px-2 py-1 rounded-md text-green-600">
                    Completed
                  </span>
                ) : (
                  <span className="bg-red-600/10 px-2 py-1 rounded-md text-red-600">
                    Pending
                  </span>
                )}
              </p>
            </div>
            {order.status!=="completed" && <SetOrderAsCompletedBtn id={params.id} />}
          </div>
          <div className="bg-gray-600/10 px-4 py-1 rounded-md text-gray-600 flex items-center justify-between gap-1">
            <p className="font-semibold">placed on:</p>{" "}
            <span className="text-sm">
              {formatDateTime(order?.created_at!)}
            </span>
          </div>
        </div>
        <div className="border shadow rounded-md p-3 md:p-4">
          <h2 className="font-semibold text-lg mb-3">CUSTOMER & ORDER</h2>
          <div className="flex items-center mb-2">
            <p className="font-medium flex-1">Name</p>
            <div className="flex items-center gap-2 flex-1">
              <span>:</span>
              <p className="text-gray-600">
                {order?.firstname} {order?.lastname}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <p className="font-medium flex-1">Email</p>
            <div className="flex items-center gap-2 flex-1">
              <span>:</span>
              <p className="text-gray-600">
                {order?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <p className="font-medium flex-1">Phone</p>
            <div className="flex items-center gap-2 flex-1">
              <span>:</span>
              <p className="text-gray-600">
                {order?.phone}
              </p>
            </div>
          </div>
          {order?.zipcode && <div className="flex items-center">
            <p className="font-medium flex-1">Zipcode</p>
            <div className="flex items-center gap-2 flex-1">
              <span>:</span>
              <p className="text-gray-600">
                {order.zipcode}
              </p>
            </div>
          </div>}
          <div className="flex items-center">
            <p className="font-medium flex-1">Payment Terms</p>
            <div className="flex items-center gap-2 flex-1">
              <span>:</span>
              <p className="text-gray-600">
                {order?.paymentType}
              </p>
            </div>
          </div>
        </div>
        <div className="border shadow rounded-md p-3 md:p-4 max-md:min-h-[12rem]">
        <h2 className="font-semibold text-lg mb-3">SHIPPING ADDRESS</h2>
        <p className="text-gray-600">{order?.address}</p>
        </div>
      </div>
      <div className="border shadow rounded-md mt-4 p-3">
      <h2 className="font-semibold text-lg mb-3">ITEMS ORDERED</h2>
{   orderProducts &&   <DataTable showPagination={false} filterField="name" data={orderProducts} columns={columns} />}
      </div>
    </main>
  );
}
