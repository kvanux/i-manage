"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchable: string
}

export function TableTop<TData, TValue>({
  columns,
  data,
  searchable
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
      <div className="flex items-center">
        <Input
          placeholder={`Search by ${searchable}...`}
          value={(table.getColumn(searchable)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchable)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
  )
}
