import React from 'react'
import TransactionForm from '@/components/custom/postForm/TransactionForm'
import { DataTable } from '@/components/data-table'
import { columns } from './dataType'
import { Transactions } from '@prisma/client'
import prisma from "@/prisma/client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const Finance = async () => {
  const data: Transactions[] = await prisma.transactions.findMany()

  return (
    <div className='h-screen grid-cols-12 p-6'>
      <div className="fixed right-6 flex items-center justify-end">
        <Sheet>
            <SheetTrigger asChild>
              <Button variant={"default"}><PlusCircle/>New Transaction</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className='mb-4'>Log New Transaction</SheetTitle>
                <TransactionForm/>
              </SheetHeader>
            </SheetContent>
        </Sheet>
      </div>
      <DataTable columns={columns} data={data} searchable='description'/>
    </div>
  )
}

export default Finance