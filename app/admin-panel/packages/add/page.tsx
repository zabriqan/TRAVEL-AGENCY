"use client";

import Form from '@/app/components/form';
import { createPackage } from '@/app/lib/actions';
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
            const res = await createPackage(fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'Success');
            redirect('/admin-panel/packages');
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
                    { id: "heading", label: "Package Title", placeholder: "e.g. Weekend Getaway Trip", type: "text", required: true, error: fieldErrors?.properties?.heading },
                    { id: "subheading", label: "Sub Heading", placeholder: "e.g. A small 3 day trip to Murree and Nathia Gali", type: "text", required: true, error: fieldErrors?.properties?.sub_heading },
                    { id: "route", label: "Route", placeholder: 'e.g. Murree → Nathia Gali', type: "text", required: true, error: fieldErrors?.properties?.route },
                    { id: "duration", label: "Duration", placeholder: 'e.g. 2 Days/3 Nights', type: "text", required: true, error: fieldErrors?.properties?.duration},
                    { id: "misc_text", label: "Description", type: "textarea", required: true, error: fieldErrors?.properties?.misc_text },
                ]}
                button={{
                    type: "submit",
                    children: "Add package",
                    disabled: pending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}