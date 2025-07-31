"use client";

import Form from '@/app/components/form';
import { createCoa } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function Page() {
    const [pending, start] = useTransition();
    const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        start(async () => {
            const res = await createCoa(fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'chart of account added successfully');
            redirect('/admin-panel/COA');
        });
    }

    return (
        <div>
            {fieldErrors.errors.length > 0 && (
                <span className="text-red-500 px-1 py-0.5 text-sm rounded-md border bg-red-100 border-red-400 mb-2">
                    {fieldErrors.errors.join(', ')}
                </span>
            )}
            <Form
                fields={[
                    { id: "account_code", label: "Account Code", type: "text", required: true, error: fieldErrors?.properties?.account_code },
                    { id: "account_name", label: "Account Name", type: "text", required: true, error: fieldErrors?.properties?.account_name },
                    { id: "account_type", label: "Account Type", type: "select", options: ["debit", "credit"], required: true, error: fieldErrors?.properties?.expense_type }

                ]}
                button={{
                    type: "submit",
                    children: "Add COA",
                    disabled: pending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}