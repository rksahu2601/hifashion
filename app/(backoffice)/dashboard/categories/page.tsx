import { DataTable } from '@/components/DataTable/data-table'
import { createClient } from '@/lib/supabase/server'
import { columns } from './table-data'
import PageHeader from '@/components/backoffice/PageHeader'
import { deleteCategory } from '@/actions/categoryActions'

export default async function Products() {
  const supabase = createClient()
  const {data: categories} = await supabase.from("categories").select()

  return (
    <div>
      <PageHeader linkUrl='/dashboard/categories/new' title='Categories' />
      {categories && <DataTable deleteAction={deleteCategory} data={categories} filterField="name" columns={columns} />}
    </div>
  )
}
