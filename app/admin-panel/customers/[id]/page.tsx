"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Form from '@/app/components/form';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { updateCustomer } from '@/app/lib/actions';

type CustomerType = {
    id: string;
    customer_name: string;
    contact_no: string;
    email_address: string;
    created_at?: string; // Optional if not used
};

export default function EditCustomerPage({ params }: { params: { id: string } }) {
    const [customerData, setCustomerData] = useState<CustomerType | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
    const [pending, start] = useTransition();

    useEffect(() => {
        async function fetchCustomer() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('customer_master')
                .select('id, customer_name, contact_no, email_address')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching customer:', error);
                toast.error('Failed to fetch customer data.');
                return;
            }

            setCustomerData(data as CustomerType);
        }

        fetchCustomer();
    }, [params.id]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        start(async () => {
            const res = await updateCustomer(params.id, fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'Customer added successfully');
            redirect('/admin-panel/customers');
        });
    }

    if (!customerData) {
        return <div>Loading...</div>;
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
                    { id: "customer_name", label: "Customer Name", type: "text", required: true, defaultValue: customerData.customer_name, error: fieldErrors?.properties?.customer_name },
                    { id: "contact_no", label: "Contact Number", type: "text", required: true, defaultValue: customerData.contact_no, error: fieldErrors?.properties?.contact_no },
                    { id: "email_address", label: "Email Address", type: "email", required: true, defaultValue: customerData.email_address, error: fieldErrors?.properties?.email_address },
                ]}
                button={{
                    type: "submit",
                    children: "Update Customer",
                    disabled: pending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}