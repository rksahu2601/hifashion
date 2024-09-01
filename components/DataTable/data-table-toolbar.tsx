"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterField: string;
  facetedFilterValue?: string;
  facetedFilterTitle?: string;
  facetedFilterOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedFields: TData[];
  deleteAction?: (data: TData) => void;
}

export function DataTableToolbar<TData>({
  table,
  filterField,
  facetedFilterValue,
  facetedFilterTitle,
  facetedFilterOptions,
  selectedFields,
  deleteAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    selectedFields.map(async (item) => {
      deleteAction && deleteAction(item);
    });
    setLoading(false);
  };

  return (
    <div className="md:flex items-center justify-between">
      <div className="md:flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${filterField}...`}
          value={
            (table.getColumn(filterField)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterField)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[250px] focus:border-2 focus:border-secondary focus:outline-none"
        />
        {facetedFilterOptions &&
          facetedFilterTitle &&
          facetedFilterValue &&
          table.getColumn(facetedFilterValue) && (
            <DataTableFacetedFilter
              column={table.getColumn(facetedFilterValue)}
              title={facetedFilterTitle}
              options={facetedFilterOptions}
            />
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3 max-sm:mt-2">
        {selectedFields.length > 0 && (
         deleteAction && <Button
            disabled={loading}
            onClick={handleDelete}
            className="h-8 px-2 lg:px-3 bg-rose-600 text-white hover:bg-rose-600/70 transition-smooth"
          >
            {loading ? "Deleting..." : "Delete"}
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
