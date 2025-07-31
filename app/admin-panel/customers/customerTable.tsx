"use client";
import React from 'react'
import StandardTable from '@/app/components/standard-table';
import Link from 'next/link';
type CustomersType = {
    id: string;
    created_at: string;
    customer_name: string;
    contact_no: string;
    email_address: string;
    actions?: string;
}

export default function customerTable({ data }: { data: CustomersType[] | null }) {
    return (
        <div>
            {data ? <StandardTable<CustomersType>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'customer_name', title: 'Customer_Name', searchable: true },
                    { key: 'contact_no', title: 'Contact_No', searchable: true },
                    { key: 'email_address', title: 'Email_Address', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    { key: 'actions', title: 'Actions', render: (row) => ( <Link href={`/admin-panel/customers/${row.id}`}><button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Edit </button></Link>)}
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No customer found.
                </div>
            )}
        </div>
    )
}

