import NewHeader from '@/components/backoffice/NewHeader'
import CreateNewCategoryForm from '@/components/forms/CreateNewCategoryForm'
import React from 'react'

export default function NewCategory() {
  return (
    <div className="md:px-16 max-w-6xl mx-auto">
    <NewHeader title="Add New Category" subTitle="category list" />
    <CreateNewCategoryForm />
  </div>
  )
}
