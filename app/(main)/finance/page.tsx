import React from 'react'
import { DataTable } from '@/components/data-table'
import { Payment, columns } from './dataType'

const Finance = () => {
    const data: Payment[] = [
        {
          id: "728ed52f",
          amount: 100,
          status: "pending",
          email: "m@example.com",
        },
        {
          id: "489e1d42",
          amount: 125,
          status: "processing",
          email: "example@gmail.com",
        },
        
    ]

  return (
    <div className='h-screen grid-cols-12 p-6'>
       <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Finance