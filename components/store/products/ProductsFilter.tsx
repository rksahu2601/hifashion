"use client"
import { categories } from "../navbar/NavCategories";

export default function ProductsFilter() {
  return (
    <aside className='hidden md:block md:col-span-1'>
        <div className='sticky top-20 w-full'>
          <div className='mb-6'>
            <h2 className='uppercase font-medium mb-3 border-b-2 border-gray-400'>
              Categories
            </h2>
            <ul>
              {categories.map((cat) => {
                return <li key={cat.id} className='mb-1 text-sm'>{cat.name}</li>;
              })}
            </ul>
          </div>
          <div className='mb-6'>
            <h2 className='uppercase font-medium mb-3 border-b-2 border-gray-400'>
              Gender
            </h2>
            <ul>
              <li className='flex items-center gap-2'>
                <input type='checkbox' />
                <span>Male</span>
              </li>
              <li className='flex items-center gap-2'>
                <input type='checkbox' />
                <span>Female</span>
              </li>
              <li className='flex items-center gap-2'>
                <input type='checkbox' />
                <span>Unisex</span>
              </li>
            </ul>
          </div>
          <div className='mb-6'>
            <h2 className='uppercase font-medium mb-6 border-b-2 border-gray-400'>
              colors
            </h2>

            <div className='flex items-center gap-2'>
              <div className='w-4 rounded-full aspect-square cursor-pointer border-slate-400 bg-red-700' />
              <div className='w-4 rounded-full aspect-square border-slate-400 bg-blue-700' />
              <div className='w-4 rounded-full aspect-square border-slate-400 bg-green-700' />
              <div className='w-4 rounded-full aspect-square border border-slate-400 bg-white' />
              <div className='w-4 rounded-full aspect-square border-slate-400 bg-black' />
              <div className='w-4 rounded-full aspect-square border-slate-400 bg-yellow-500' />
            </div>
          </div>
        </div>
      </aside>
  )
}
