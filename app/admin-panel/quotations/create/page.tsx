"use client";

import Form from '@/app/components/form'
import { createQuotation } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react'
import { toast } from 'sonner';

export default function Page() {
   const [pending, start] = useTransition();
   const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] })

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

   return (
      <div>
         {fieldErrors.errors.length > 0 && <span className="text-red-500 px-1 py-0.5 text-sm rounded-md border bg-red-100 border-red-400 mb-2">{fieldErrors.errors.join(', ')}</span>}
         <Form
            fields={[
               { id: "booking_no", label: "Booking no." },
               { id: "stops", label: "Stops", placeholder: "comma separated values", error: fieldErrors?.properties?.stops },
               { id: "prices", label: "Prices", }
            ]}
            button={{
               type: "submit",
               children: "Add Expense",
               disabled: pending
            }}
            onSubmit={handleSubmit}
         />
      </div>
   )
}
