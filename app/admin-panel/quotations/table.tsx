"use client";

import StandardTable from "@/app/components/standard-table";

type Quotation = {
   id: string;
   created_at: string;
   booking_no: string;
   stops: string[];
   prices: Record<string, any>;
   costs: Record<string, any>;
   customer_id: string;
}

export default function Table({ data }: { data: Quotation[] | null }) {
   return (
      <div>
         {data ? <StandardTable<Quotation>
            data={data}
            columns={[
               { key: 'id', title: 'ID' },
               { key: 'booking_no', title: 'Booking no.', searchable: true },
               { key: 'stops', title: 'Stops', searchable: true, render: (row) => row.stops.join(',') },
               { key: 'prices', title: 'Prices', searchable: true, render: (row) => JSON.stringify(row.prices) },
               { key: 'costs', title: 'Costs', searchable: true, render: (row) => JSON.stringify(row.prices) },
               { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString() },
               { key: 'customer_id', title: 'Customer ID', searchable: true }
            ]}
         /> : (
            <div className="p-4 text-center md:text-lg text-gray-500">
               No quotations found.
            </div>
         )}
      </div>
   )
}
