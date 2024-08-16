import { DataTable } from '@/components/DataTable/data-table'
import { createClient } from '@/lib/supabase/server'
import { columns, statuses } from './table-data'
import { deleteProduct } from '@/actions/productActions'
import PageHeader from '@/components/backoffice/PageHeader'

export default async function Products() {
  const supabase = createClient()
  const {data: products} = await supabase.from("products").select()

  return (
    <div>
      <PageHeader linkUrl='/dashboard/products/new' title='Products' />
      {products && <DataTable deleteAction={deleteProduct} data={products} filterField="name" columns={columns} facetedFilterOptions={statuses} facetedFilterValue="status" facetedFilterTitle="Status"/>}
    </div>
  )
}
