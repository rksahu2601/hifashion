import { TProducts } from "@/types/supabaseTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type TProp = {
  noOfPages?: number;
  page?: number | undefined;
};

export default function ProductsPaginaton({
  noOfPages,
  page,
}: TProp) {

  return (
    <div className="w-full flex justify-center my-6 mb-6 gap-3">
      {page! > 1 && <Link
      className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth"
        href={`?${new URLSearchParams({
          page: (page! - 1).toString(),
        })}`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Link>}
      {/* <button className='w-8 h-8 text-xs rounded-full flex items-center justify-center bg-slate-200 hover:bg-cyan-600 hover:text-white transition duration-500'>
            1
        </button> */}
      {page! < noOfPages! && <Link
        href={`?${new URLSearchParams({
          page: (page! + 1).toString(),
        })}`}
        className="h-8 px-3 rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth"
      >
                <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </Link>}
    </div>
  );
}
