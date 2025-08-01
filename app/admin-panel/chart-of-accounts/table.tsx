"use client";
import React from 'react'
import StandardTable from '@/app/components/standard-table';
import Link from 'next/link';
type ChartOfAccount = {
    id: string;
    created_at: string;
    account_code: string;
    account_name: string;
    account_type: string;
    actions?: string;
}

export default function coaTable({ data }: { data: ChartOfAccount[] | null }) {
    return (
        <div>
            {data ? <StandardTable<ChartOfAccount>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'account_code', title: 'Account_Code', searchable: true },
                    { key: 'account_name', title: 'Account_Name', searchable: true },
                    { key: 'account_type', title: 'Account_Type', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    { key: 'actions', title: 'Actions', render: (row) => ( <Link href={`/admin-panel/chart-of-accounts/${row.id}`}><button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">Edit </button></Link>)}
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No accounts found.
                </div>
            )}
        </div>
    )
}

