"use client"

import { TProducts } from "@/types/supabaseTypes";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

type PropType = {
  products: TProducts[] | null;
  searchInput: string | null;
};

export default function MobileSearchResultBox({
  products,
  searchInput,
}: PropType) {

    const params = useSearchParams()
    const router = useRouter()
  
    const handleSearch = ()=>{
      let currentQuery = {};
    
      if(params){
        currentQuery = queryString.parse(params.toString())
        console.log("current query", currentQuery);
      }
    
      const updatedQuery:any = {
        ...currentQuery, 
          search: searchInput,
          page: null
      }
    
      const url = queryString.stringifyUrl({url: "/store", query: updatedQuery}, {skipNull: true, skipEmptyString: true})
      router.push(url)
    }

  return (
    <>
      <div>
        {products && products.length > 0 && searchInput ? (
          products.slice(0, 5).map((product) => (
            <Link
            key={product.id}
              href={`/product/${product?.id}`}
              className="h-10 w-full rounded border-b last:border-none pb-1 mb-2 flex items-center hover:bg-slate-100 transition px-1"
            >
              <div className="relative h-full w-8 mr-4 rounded-sm overflow-hidden bg-slate-200">
                <Image
                  src={product?.images[0] as string}
                  className="object-cover"
                  alt={product.name || ""}
                  fill
                />
              </div>
              <h2 className="line-clamp-1 mr-8 text-xs font-semibold">
                {product?.name}
              </h2>

              <p className="ml-auto font-semibold text-sm">${product?.price}</p>
            </Link>
          ))
        ) : (
          <div className="w-full h-full flex gap-2 items-center justify-center">
            Type something to search{" "}
            <Search className="w-5 h-5 text-slate-500" />
          </div>
        )}
      </div>
      {products && products?.length > 0 && searchInput && <button className="bg-primary/10 hover:bg-primary/40 transition-smooth px-3 text-sm rounded-full py-1 mt-3" onClick={handleSearch}>See all results</button>}
    </>
  );
}
