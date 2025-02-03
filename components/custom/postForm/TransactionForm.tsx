"use client"
 
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { reload } from '@/lib/actions'
import { usePathname } from 'next/navigation'

const formSchema = z.object({
    description: z.string({required_error: "Description is required"}).min(2).max(255),
    amount: z
    .string({ required_error: "Amount is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Amount must be a number",
    })
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value), {
      message: "Must be an integer",
    }),
    paymentMethod: z.optional(z.string().max(50)),
    referenceNo: z.optional(z.string().max(200))
})

const TransactionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        description: "",
        amount: 0,
        paymentMethod: "",
        referenceNo: "",
      },
  })

  const currentPath = usePathname();
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const response = await fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        
        form.reset();
        reload(currentPath);
        return response;
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className='mb-2 space-y-1'>
              <FormLabel>Amount <span className='text-rose-600'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction amount" {...field} />
              </FormControl>
              <FormDescription className='mb-1'>
                Please remember to add "-" for negative amounts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='mb-2 space-y-1'>
              <FormLabel>Description <span className='text-rose-600'>*</span></FormLabel>
              <FormControl>
                <Textarea className='resize-none' placeholder="Enter transaction description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className='mb-2 space-y-1'>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Input placeholder="Enter payment method if needed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referenceNo"
          render={({ field }) => (
            <FormItem className='mb-2 space-y-1'>
              <FormLabel>Reference Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g.Bank transaction I.D,..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-end'>
            <Button type="submit" className='mt-2'>Confirm</Button>
        </div>
      </form>
    </Form>
  )
}

export default TransactionForm