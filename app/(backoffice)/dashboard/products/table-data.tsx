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
import NairaSvg from "@/components/NairaSvg";

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
            className="w-[50px] bg-gray-100 aspect-square rounded-md object-cover"
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
            <span className="bg-green-600/10 px-4 py-1 rounded-md text-green-600">
              Active
            </span>
          ) : row.original.status === "not active" ? (
            <span className="bg-red-600/10 px-4 py-1 rounded-md text-red-600">
              Not Active
            </span>
          ) : (
            <span className="bg-purple-600/10 px-4 py-1 rounded-md text-purple-600">
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
        <NairaSvg />
        <span>{row.original.price && row.original?.price.toFixed(2)}</span>
        </div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      return <div className="">{(row.original.quantity)?.toString().padStart(3,"0")}</div>;
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
