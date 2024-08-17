"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/DataTable/data-table-column-header";

import { CircleIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { TProducts } from "@/types/supabaseTypes";
import Image from "next/image";
import { deleteProduct } from "@/actions/productActions";
import { DataTableRowActions } from "@/components/DataTable/data-table-row-action";
import { Badge } from "@/components/ui/badge";

const handleDelete = async (product: TProducts) => {
  await deleteProduct(product);
};

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "not active",
    label: "Not Active",
    icon: CircleIcon,
  },
  {
    value: "scheduled",
    label: "Scheduled",
    icon: CircleIcon,
  },
];

export const columns: ColumnDef<TProducts>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            className="w-[50px] aspect-square rounded-md object-cover"
            src={row.original.images[0]}
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
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return (
        <div className="capitalize text-sm">
          <Badge className="font-medium" variant="outline">{row.original.gender}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.original.status === "active" ? (
            <span className="bg-green-600/10 px-4 py-1 rounded-full text-green-600">
              Active
            </span>
          ) : row.original.status === "not active" ? (
            <span className="bg-red-600/10 px-4 py-1 rounded-full text-red-600">
              Not Active
            </span>
          ) : (
            <span className="bg-purple-600/10 px-4 py-1 rounded-full text-purple-600">
              Scheduled
            </span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return <div className="flex gap-1 items-center">
        <svg className="w-3 h-3" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.09 122.88"><title>nigeria-naira</title><path d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/></svg>
        <span>{parseFloat(row.original.price as string).toFixed(2)}</span>
        </div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      return <div className="">{(row.original.quantity)?.padStart(3,"0")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions
        editPageUrl={`/dashboard/products/edit/${row.original.id}`}
        deleteFunction={()=>handleDelete(row.original)}
      />;
    },
  },
];
