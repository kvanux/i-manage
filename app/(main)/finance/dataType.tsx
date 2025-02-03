"use client"

import { useState, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Transactions } from "@prisma/client"
import { reload } from '@/lib/actions'
import { usePathname } from 'next/navigation'

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Logged at",
    cell: ({row}) => {
      const [formattedDate, setFormattedDate] = useState("")
      const createdDateValue = row.getValue("createdAt")

      useEffect(() => {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Ho_Chi_Minh',
        }).format(createdDateValue as Date)
        setFormattedDate(formatted)
      }, [createdDateValue])

      return <div className="text-neutral-600">{formattedDate}</div>
    }
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({row}) => {
      return <Badge variant="secondary">{row.getValue("paymentMethod")}</Badge>
    }
  },
  {
    accessorKey: "referenceNo",
    header: "Reference No.",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original

      const currentPath = usePathname();

      const deleteHandler = async (transactionId: number) => {
        try {
          const response = await fetch(`/api/transactions?id=${transaction.id}`, {
            method: "DELETE",
          })
          reload(currentPath);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteHandler(transaction.id)}
            >
              <Trash2/>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]