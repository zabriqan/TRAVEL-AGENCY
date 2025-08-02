"use client";

import Form from '@/app/components/form';
import { createCustomer } from '@/app/lib/actions';
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
            const res = await createCustomer(fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'Customer added successfully');
            redirect('/admin-panel/customers');
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
                    { id: "customer_name", label: "Customer Name", type: "text", required: true, error: fieldErrors?.properties?.customer_name },
                    { id: "contact_no", label: "Contact Number", type: "text", required: true, error: fieldErrors?.properties?.contact_no },
                    { id: "email_address", label: "Email Address", type: "email", error: fieldErrors?.properties?.email_address },

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