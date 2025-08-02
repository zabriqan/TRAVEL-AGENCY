"use client";

import React from 'react'
import StandardTable, { EditButton } from '@/app/components/standard-table';
import { Customer } from '@/app/lib/types';


export default function customerTable({ data }: { data: Customer[] | null }) {
    return (
        <div>
            {data ? <StandardTable<Customer>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'customer_name', title: 'Customer Name', searchable: true },
                    { key: 'contact_no', title: 'Contact no.', searchable: true },
                    { key: 'email_address', title: 'Email Address', searchable: true },
                    { key: 'created_at', title: 'Created at', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    {
                        key: 'actions', title: 'Actions', render: (row) => (
                            <EditButton href={`/admin-panel/customers/${row.id}`} />
                        )
                    }
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No customer found.
                </div>
            )}
        </div>
    )
}

