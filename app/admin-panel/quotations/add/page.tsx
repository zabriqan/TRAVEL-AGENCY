"use client";

import Button from '@/app/components/button';
import Form from '@/app/components/form'
import { createQuotation } from '@/app/lib/actions';
import { Customer } from '@/app/lib/types';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { TrashIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';
import RowInput from '../row-input';
import { pricesAndCostsRowStarter } from '@/app/lib/utils';

export default function Page() {
   const [pending, start] = useTransition();
   const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] })

   const [pricesAndCostsRows, setPricesAndCostsRows] = useState<({ id: string; price: string; cost: string })[]>([{ ...pricesAndCostsRowStarter }])

   const [customers, setCustomers] = useState<Customer[]>([])

   useEffect(() => {
      async function fetchCustomers() {
         const supabase = createClient();
         const { data, error } = await supabase.from("customer_master")
            .select("id,customer_name,contact_no,email_address")

         if (error) {
            toast.error("Failed to fetch customers.");
            return;
         }

         setCustomers(data as Customer[]);
      }

      fetchCustomers();
   }, []);

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const fd = new FormData(e.currentTarget);

      start(async () => {
         const res = await createQuotation(fd);
         if (!res.ok) {
            toast.error(res.error || 'Error');
            setFieldErrors(res.fieldErrors ?? { errors: [] });
            return;
         }
         toast.success(res.message || 'Success');
         redirect('/admin-panel/quotations');
      })
   }

   function addRow() {
      setPricesAndCostsRows(prev => ([...prev, pricesAndCostsRowStarter]))
   }

   function removeRow(i: number) {
      setPricesAndCostsRows(prev => prev.filter((_, idx) => idx !== i))
   }

   function handleChange(value: string, i: number, key: 'id' | 'cost' | 'price') {
      setPricesAndCostsRows(prev => {
         const temp = [...prev]
         if (key in temp[i]) {
            temp[i][key] = value
         }
         return temp;
      })
   }

   return (
      <div>
         {fieldErrors.errors.length > 0 && <span className="text-red-500 px-1 py-0.5 text-sm rounded-md border bg-red-100 border-red-400 mb-2">{fieldErrors.errors.join(', ')}</span>}
         <Form
            fields={[
               { id: "booking_no", label: "Booking no.", required: true },
               { id: "stops", label: "Stops", placeholder: "comma separated values", error: fieldErrors?.properties?.stops, required: true },
               { id: "customer_id", type: "select", label: "Customer", options: customers.map(cust => ({ value: cust.id, label: `${cust.customer_name} - ${cust.contact_no}` })), required: true },
               { id: "prices_and_costs", type: "hidden", value: JSON.stringify(pricesAndCostsRows) },
            ]}
            button={{
               type: "submit",
               children: "Create Quotation",
               disabled: pending
            }}
            onSubmit={handleSubmit}
         >
            <div className='mt-5'>
               <div className="flex items-center justify-between">
                  <h6 className='font-semibold text-lg'>Prices and costs for services</h6>
                  <Button size='sm' onClick={addRow}>Add row</Button>
               </div>
               <div className='my-3 flex flex-col gap-2'>
                  {pricesAndCostsRows.map((pacr, i) => (
                     <div className="flex items-center gap-4" key={i}>
                        <button disabled={i === 0} type='button' onClick={() => removeRow(i)} className='grid place-items-center bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-red-500 transition cursor-pointer h-7 w-7 rounded-md'>
                           <TrashIcon className='w-4' />
                        </button>
                        <div className='text-sm font-semibold'>{i + 1}.</div>
                        <div className='grid flex-1 grid-cols-3 items-center gap-2'>
                           <RowInput value={pacr.id} onChange={e => handleChange(e.target.value, i, 'id')} type='text' placeholder='Service ID' />
                           <RowInput value={pacr.price} onChange={e => handleChange(e.target.value, i, 'price')} type='number' placeholder='Price' />
                           <RowInput value={pacr.cost} onChange={e => handleChange(e.target.value, i, 'cost')} type='number' placeholder='Cost' />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </Form>
      </div>
   )
}
