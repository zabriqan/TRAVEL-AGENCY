"use client";

import StandardTable, { EditButton } from "@/app/components/standard-table";
import { Quotation } from "@/app/lib/types";
import { defaultTableDataRenderer } from "@/app/lib/utils";
import Link from "next/link";


export default function Table({ data }: { data: Quotation[] | null }) {
   return (
      <div>
         {data ? <StandardTable<Quotation>
            data={data}
            columns={[
               { key: 'id', title: 'ID', render: (row) => <span className='font-mono'>{row.id}</span> },
               { key: 'booking_no', title: 'Booking no.', searchable: true },
               { key: 'stops', title: 'Stops', searchable: true, render: (row) => row.stops.join(',') },
               { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString() },
               {
                  key: 'customer_id', title: 'Customer ID', searchable: true, render(row) {
                     return (
                        !!row.customer_id ?
                        <Link href={`/admin-panel/customers/${row.customer_id}`} className="text-primary hover:underline">
                           {row.customer_id}
                        </Link> : defaultTableDataRenderer(row, this)
                     )
                  },
               },
               {
                  key: 'actions', title: 'Actions', render(row) {
                     return <EditButton href={`/admin-panel/quotations/${row.id}`} />
                  },
               }
            ]}
         /> : (
            <div className="p-4 text-center md:text-lg text-gray-500">
               No quotations found.
            </div>
         )}
      </div>
   )
}
