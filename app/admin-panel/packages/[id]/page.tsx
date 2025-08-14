"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Form from '@/app/components/form';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { toast } from 'sonner';
import { redirect, useParams } from 'next/navigation';
import { updatePackage } from '@/app/lib/actions';
import { Package } from '@/app/lib/types';

export default function EditPackagePage() {
    const params: { id: string } = useParams();

    const [packageData, setPackageData] = useState<Package | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
    const [pending, start] = useTransition();

    useEffect(() => {
        async function fetchPackage() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('packages')
                .select("id, created_at, heading, subheading, route, duration, pdf_url, poster_url, package_type, misc_text")
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching package:', error);
                toast.error('Failed to fetch package data.');
                return;
            }

            setPackageData(data as Package);
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

    if (!packageData) {
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
                    { id: "heading", label: "Package Title", placeholder: "e.g. Weekend Getaway Trip", type: "text", required: true, defaultValue: packageData.heading, error: fieldErrors?.properties?.heading },
                    { id: "subheading", label: "Sub Heading", placeholder: "e.g. A small 3 day trip to Murree and Nathia Gali", type: "text", required: true, defaultValue: packageData.subheading, error: fieldErrors?.properties?.sub_heading },
                    { id: "route", label: "Route", placeholder: "e.g. Murree → Nathia Gali", type: "text", required: true, defaultValue: packageData.route, error: fieldErrors?.properties?.route },
                    { id: "duration", label: "Duration", placeholder: "e.g. 2 Days/3 Nights", type: "text", required: true, defaultValue: packageData.duration, error: fieldErrors?.properties?.duration },
                    {
                        id: "package_type", label: "Package Type", type: "select", required: true, defaultValue: packageData.package_type, error: fieldErrors?.properties?.package_type, options: [
                            { value: "domestic", label: "Domestic" },
                            { value: "international", label: "International" },
                            { value: "umrah", label: "Umrah" }
                        ]
                    },
                    { id: "misc_text", label: "Description", type: "textarea", required: true, defaultValue: packageData.misc_text, error: fieldErrors?.properties?.misc_text },
                    { id: "pdf_url", label: "PDF URL", type: "text", required: true, defaultValue: packageData.pdf_url, error: fieldErrors?.properties?.pdf_url, disabled: true },
                    { id: "poster_url", label: "Poster URL", type: "text", required: true, defaultValue: packageData.poster_url, error: fieldErrors?.properties?.poster_url, disabled: true },
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