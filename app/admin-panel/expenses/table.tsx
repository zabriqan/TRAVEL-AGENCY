"use client";

import StandardTable, { EditButton } from '@/app/components/standard-table';
import React from 'react'
import { ExpenseType } from '@/app/lib/types';


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
                    { key: 'chart_of_account_id', title: 'Account' },
                    { key: 'actions', title: 'Actions', render: (row) => <EditButton href={`/admin-panel/expenses/${row.id}`} /> }
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No expenses found.
                </div>
            )}
        </div>
    )
}
