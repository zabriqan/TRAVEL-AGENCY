"use client";
import React from 'react'
import StandardTable from '@/app/components/standard-table';
type CoaType = {
    id: string;
    created_at: string;
    account_code: string;
    account_name: string;
    account_type: string;
}

export default function coaTable({ data }: { data: CoaType[] | null }) {
    return (
        <div>
            {data ? <StandardTable<CoaType>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'account_code', title: 'Account_Code', searchable: true },
                    { key: 'account_name', title: 'Account_Name', searchable: true },
                    { key: 'account_type', title: 'Account_Type', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No Chart Of Accountent found.
                </div>
            )}
        </div>
    )
}

