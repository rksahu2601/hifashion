import { DataTable } from '@/components/DataTable/data-table'
import { createClient } from '@/lib/supabase/server'
import { columns, statuses } from './table-data'
import { deleteProduct, editProduct, setProductAsActive } from '@/actions/productActions'
import PageHeader from '@/components/backoffice/PageHeader'
import AnalyticCard from '@/components/backoffice/AnalyticCard'

import { AiFillProduct } from 'react-icons/ai'
import { VscIssueDraft } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";

export default async function Products() {
  const supabase = createClient()
  const {data: products, count} = await supabase.from("products").select("*", {count: "exact"}).order("created_at", {ascending: false})

  const activeProducts = products?.filter(product=>product.status === "active")
  const inactiveProducts = products?.filter(product=>product.status === "draft")
  const scheduledProducts = products?.filter(product=>product.status === "scheduled")

  if(scheduledProducts && scheduledProducts.length){
    
    for (const product of scheduledProducts){
      if(new Date(product.scheduleDate as string) > new Date()){
        const time = new Date(product.scheduleDate as string).getTime() - new Date().getTime()

        setTimeout(async ()=>{
          await setProductAsActive(product.id)
        }, time)
      
    }
  }
}

  return (
    <div className='max-w-6xl mx-auto'>
      <PageHeader linkUrl='/dashboard/products/new' title='Products' />
      <div className="flex items-center flex-wrap gap-6 mb-8">
        <AnalyticCard
        className="flex-1 min-w-[12rem]"
          label="Total Products"
          totalvalue={count || 0}
          icon={AiFillProduct}
          iconColor="text-blue-600"
          iconBg="bg-blue-600/10"
        />
        <AnalyticCard
          className="flex-1 min-w-[12rem]"
          label="Active Products"
          totalvalue={activeProducts?.length || 0}
          icon={IoMdCheckmarkCircleOutline}
          iconColor="text-green-600"
          iconBg="bg-green-600/10"
        />
        <AnalyticCard
        className="flex-1 min-w-[12rem]"
          label="Inactive Products"
          totalvalue={inactiveProducts?.length || 0}
          icon={VscIssueDraft}
          iconColor="text-red-600"
          iconBg="bg-red-600/10"
        />
        <AnalyticCard
        className="flex-1 min-w-[12rem]"
          label="Scheduled Products"
          totalvalue={scheduledProducts?.length || 0}
          icon={GrSchedule}
          iconColor="text-purple-600"
          iconBg="bg-purple-600/10"
        />
      </div>
      {products && <div className='bg-white rounded-xl p-3 shadow-md'>
        <DataTable deleteAction={deleteProduct} data={products} filterField="name" columns={columns} facetedFilterOptions={statuses} facetedFilterValue="status" facetedFilterTitle="Status"/></div>}
    </div>
  )
}
