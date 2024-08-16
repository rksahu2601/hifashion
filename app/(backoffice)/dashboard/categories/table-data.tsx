"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/DataTable/data-table-column-header";

import { TCategory } from "@/types/supabaseTypes";
import Image from "next/image";
import { DataTableRowActions } from "@/components/DataTable/data-table-row-action";
import { deleteCategory } from "@/actions/categoryActions";

const handleDelete = async (cat: TCategory) => {
  await deleteCategory(cat)
};

export const columns: ColumnDef<TCategory>[] = [
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

          <h2 className="max-w-[500px] truncate font-semibold">
            {row.original.name}
          </h2>

      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
        className="w-[50px] aspect-square rounded-md object-cover"
        src={row.original.image as string}
        width={400}
        height={400}
        alt="Category Image"
      />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions
        editPageUrl={`/dashboard/categories/edit/${row.original.id}`}
        deleteFunction={()=>handleDelete(row.original)}
      />;
    },
  },
];
