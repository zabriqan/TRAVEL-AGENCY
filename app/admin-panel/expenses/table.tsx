"use client";

import StandardTable, { EditButton } from '@/app/components/standard-table';
import React from 'react'
import { ExpenseType } from '@/app/lib/types';
import Link from 'next/link';
import { defaultTableDataRenderer } from '@/app/lib/utils';


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
                    {
                        key: 'chart_of_account_id', title: 'Account', render(row) {
                            return (
                                !!row.chart_of_account_id ?
                                    <Link href={`/admin-panel/customers/${row.chart_of_account_id}`} className="text-primary hover:underline">
                                        {row.chart_of_account_id}
                                    </Link> : defaultTableDataRenderer(row, this)
                            )
                        }
                    },
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
