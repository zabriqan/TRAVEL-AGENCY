"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Form from '@/app/components/form';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { toast } from 'sonner';
import { updateChartOfAccount } from '@/app/lib/actions';

type CoaType = {
  id: string;
  created_at: string;
  account_code: string;
  account_name: string;
  account_type: string;
};

export default function EditCoaPage({ params }: { params: { id: string } }) {
  const [coaData, setCoaData] = useState<CoaType | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
  const [pending, start] = useTransition();


  useEffect(() => {
    async function fetchCoa() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('chart_of_accounts')
        .select('id, account_code, account_name, account_type')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching COA:', error);
        toast.error('Failed to fetch account data.');
        return;
      }

      setCoaData(data as CoaType);
    }

    fetchCoa();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    start(async () => {
      const res = await updateChartOfAccount(params.id, fd);
      if (!res.ok) {
        toast.error(res.error || 'Error');
        setFieldErrors(res.fieldErrors ?? { errors: [] });
        return;
      }

      toast.success(res.message || 'Account updated successfully');
      redirect('/admin-panel/chart-of-accounts'); // ✅ redirect to COA list
    });
  }

  if (!coaData) {
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
          {
            id: "account_code",
            label: "Account Code",
            type: "text",
            required: true,
            defaultValue: coaData.account_code,
            error: fieldErrors?.properties?.account_code,
          },
          {
            id: "account_name",
            label: "Account Name",
            type: "text",
            required: true,
            defaultValue: coaData.account_name,
            error: fieldErrors?.properties?.account_name,
          },
          {
            id: "account_type",
            label: "Account Type",
            type: "select",
            options: ["debit", "credit"],
            required: true,
            defaultValue: coaData.account_type,
            error: fieldErrors?.properties?.account_type,
          },
        ]}
        button={{
          type: "submit",
          children: pending ? "Updating..." : "Update COA",
          disabled: pending,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
