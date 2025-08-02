"use client";

import Form from '@/app/components/form'
import { createExpense } from '@/app/lib/actions';
import { ChartOfAccount } from '@/app/lib/types';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';

export default function Page() {
    const [pending, start] = useTransition();
    const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] })
    const [chartOfAccounts, setChartOfAccounts] = useState<ChartOfAccount[]>([])

    useEffect(() => {
        async function fetchChartOfAccounts() {
            const supabase = createClient();
            const { data, error } = await supabase.from("chart_of_accounts")
                .select("id,account_code,account_name,account_type")

            if (error) {
                toast.error("Failed to fetch chart of accounts.");
                return;
            }

            setChartOfAccounts(data as ChartOfAccount[]);
        }

        fetchChartOfAccounts();
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        start(async () => {
            const res = await createExpense(fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'Success');
            redirect('/admin-panel/expenses');
        })
    }

    return (
        <div>
            {fieldErrors.errors.length > 0 && <span className="text-red-500 px-1 py-0.5 text-sm rounded-md border bg-red-100 border-red-400 mb-2">{fieldErrors.errors.join(', ')}</span>}
            <Form
                fields={[
                    { id: "chart_of_account_id", label: "Account", type: "select", options: chartOfAccounts.map(coa => ({ value: coa.id, label: `${coa.account_code} - ${coa.account_name} - ${coa.account_type}` })), required: true },
                    { id: "expense_type", label: "Expense Type", type: "select", options: [{ value: "internal" }, { value: "external" }], required: true, error: fieldErrors?.properties?.expense_type },
                    { id: "amount", label: "Amount", type: "number", required: true, error: fieldErrors?.properties?.amount },
                ]}
                button={{
                    type: "submit",
                    children: "Add Expense",
                    disabled: pending
                }}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
