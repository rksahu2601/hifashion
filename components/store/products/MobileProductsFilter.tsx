'use client';

export const categories = [
  {
    id: 1,
    name: 'Shirts',
  },
  {
    id: 1,
    name: 'Shoes',
  },
  {
    id: 1,
    name: 'Hoodies',
  },
  {
    id: 1,
    name: 'Bags',
  },
];

export const priceRange = [
  {
    id: 1,
    label: 'High to low',
    value: "hightolow"
  },
  {
    id: 1,
        label: 'Low to High',
    value: "lowtohigh"
  },
];

export default function MobileProductsFilter() {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger className='text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none'>
    //     <span>Filter</span> <ArrowUpDown className='w-4 h-4 ml-2' />
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className=''>
    //       <DropdownMenuItem>
    //       <div className='mb-3'>
    //         <h2 className='uppercase font-medium mb-3 border-b-2 border-gray-400'>
    //           Gender
    //         </h2>
    //         <ul>
    //           <li className='flex items-center gap-2'>
    //             <input type='checkbox' />
    //             <span>Male</span>
    //           </li>
    //           <li className='flex items-center gap-2'>
    //             <input type='checkbox' />
    //             <span>Female</span>
    //           </li>
    //           <li className='flex items-center gap-2'>
    //             <input type='checkbox' />
    //             <span>Unisex</span>
    //           </li>
    //         </ul>
    //       </div>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //       <div className='mb-3'>
    //         <h2 className='uppercase font-medium mb-6 border-b-2 border-gray-400'>
    //           colors
    //         </h2>

    //         <div className='flex items-center gap-2'>
    //           <div className='w-4 rounded-full aspect-square cursor-pointer border-slate-400 bg-red-700' />
    //           <div className='w-4 rounded-full aspect-square border-slate-400 bg-blue-700' />
    //           <div className='w-4 rounded-full aspect-square border-slate-400 bg-green-700' />
    //           <div className='w-4 rounded-full aspect-square border border-slate-400 bg-white' />
    //           <div className='w-4 rounded-full aspect-square border-slate-400 bg-black' />
    //           <div className='w-4 rounded-full aspect-square border-slate-400 bg-yellow-500' />
    //         </div>
    //       </div>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //         <div className='mb-6'>
    //         <h2 className='uppercase font-medium mb-3 border-b-2 border-gray-400'>
    //           Prices
    //         </h2>
    //         <ul>
    //           {priceRange.map((range) => {
    //             return <li key={range.id} className='mb-1 text-sm'>{range.label}</li>;
    //           })}
    //         </ul>
    //       </div>
    //       </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div>Filter</div>
  );
}
