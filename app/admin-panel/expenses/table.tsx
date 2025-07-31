"use client";

import StandardTable from '@/app/components/standard-table';
import React from 'react'


type ExpenseType = {
    id: string;
    amount: number;
    expense_type: string;
    created_at: string;
    coa_id: string;
}


export default function Table({ data }: { data: ExpenseType[] | null }) {
    return (
        <div>
            {data ? <StandardTable<ExpenseType>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'amount', title: 'Amount', searchable: true },
                    { key: 'expense_type', title: 'Expense Type', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    { key: 'coa_id', title: 'COA ID' }
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No expenses found.
                </div>
            )}
        </div>
    )
}
