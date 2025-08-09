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
            toast.success(res.message || 'Package added successfully');
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
                    { id: "heading", label: "Customer Name", type: "text", required: true, error: fieldErrors?.properties?.heading },
                    { id: "sub_heading", label: "Sub Heading", type: "text", required: true, error: fieldErrors?.properties?.sub_heading },
                    { id: "route", label: "Route", type: "text", required: true, error: fieldErrors?.properties?.route },
                    { id: "duration", label: "Duration", type: "text", required: true, error: fieldErrors?.properties?.duration},
                    { id: "misc_text", label: "Misc_Text", type: "text", required: true, error: fieldErrors?.properties?.misc_text },
                    { id: "pdf_url", label: "pdf_url", type: "textarea", required: true, error: fieldErrors?.properties?.pdf_url },
                    { id: "poster_url", label: "poster_url", type: "text", required: true, error: fieldErrors?.properties?.poster_url },

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