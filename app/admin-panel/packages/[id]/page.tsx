"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Form from '@/app/components/form';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { toast } from 'sonner';
import { redirect, useParams } from 'next/navigation';
import { updatePackage } from '@/app/lib/actions';
import { packages } from '@/app/lib/types';

export default function EditPackagePage() {
    const params: { id: string } = useParams();

    const [PackageData, setPackageData] = useState<packages | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
    const [pending, start] = useTransition();

    useEffect(() => {
        async function fetchPackage() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('packages')
                .select("id, created_at, heading, subheading, route, duration, pdf_url, poster_url, misc_text")
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching package:', error);
                toast.error('Failed to fetch package data.');
                return;
            }

            setPackageData(data as packages);
        }

        fetchPackage();
    }, [params.id]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        start(async () => {
            const res = await updatePackage(params.id, fd);
            if (!res.ok) {
                toast.error(res.error || 'Error');
                setFieldErrors(res.fieldErrors ?? { errors: [] });
                return;
            }
            toast.success(res.message || 'Package updated successfully');
            redirect('/admin-panel/packages');
        });
    }

    if (!PackageData) {
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
                    { id: "heading", label: "Customer Name", type: "text", required: true, defaultValue: PackageData.heading ,error: fieldErrors?.properties?.heading },
                    { id: "sub_heading", label: "Sub Heading", type: "text", required: true,  defaultValue: PackageData.subheading, error: fieldErrors?.properties?.sub_heading },
                    { id: "route", label: "Route", type: "text", required: true,defaultValue: PackageData.route, error: fieldErrors?.properties?.route },
                    { id: "duration", label: "Duration", type: "text", required: true, defaultValue: PackageData.duration, error: fieldErrors?.properties?.duration},
                    { id: "misc_text", label: "Misc_Text", type: "textarea", required: true, defaultValue: PackageData.misc_text, error: fieldErrors?.properties?.misc_text },
                    { id: "pdf_url", label: "pdf_url", type: "text", required: true, defaultValue: PackageData.pdf_url, error: fieldErrors?.properties?.pdf_url },
                    { id: "poster_url", label: "poster_url", type: "text", required: true, defaultValue: PackageData.poster_url, error: fieldErrors?.properties?.poster_url },
                ]}
                button={{
                    type: "submit",
                    children: "Update Package",
                    disabled: pending,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}