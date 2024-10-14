"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/data-table-column-header";
import Image from "next/image";
import {  TOrderProduct } from "@/types/supabaseTypes";

export const columns: ColumnDef<TOrderProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM NAME" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            className="w-[50px] bg-gray-100 aspect-square rounded-md object-cover"
            src={row.original.image as string}
            width={400}
            height={400}
            alt="Product Image"
          />
          <h2 className="max-w-[500px] truncate font-semibold">
            {row.original.name}
          </h2>
        </div>
      );
    },
  },
  {
    accessorKey: "qty",
    header: "QUANTITY",
    cell: ({ row }) => {
      return (

          <p className="font-semibold">
            {row.original.quantity}
          </p>

      );
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      return <div className="">
        <span>${row.original.price && row.original?.price.toFixed(2)}</span>
        </div>;
    },
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => {
      return <div className="">
        <span>${row.original.price && row.original.quantity && (row.original?.price * row.original.quantity).toFixed(2)}</span>
        </div>;
    },
  },
];
