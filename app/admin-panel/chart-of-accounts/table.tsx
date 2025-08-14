"use client";
import React from 'react'
import StandardTable, { EditButton } from '@/app/components/standard-table';
import { ChartOfAccount } from '@/app/lib/types';


export default function Table({ data }: { data: ChartOfAccount[] | null }) {
    return (
        <div>
            {data ? <StandardTable<ChartOfAccount>
                data={data}
                columns={[
                    { key: 'id', title: 'ID', render: (row) => <span className='font-mono'>{row.id}</span> },
                    { key: 'account_code', title: 'Account_Code', searchable: true },
                    { key: 'account_name', title: 'Account_Name', searchable: true },
                    { key: 'account_type', title: 'Account_Type', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    { key: 'actions', title: 'Actions', render: (row) => <EditButton href={`/admin-panel/chart-of-accounts/${row.id}`} /> }
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No accounts found.
                </div>
            )}
        </div>
    )
}

