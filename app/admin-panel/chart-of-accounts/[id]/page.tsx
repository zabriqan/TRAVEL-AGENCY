"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Form from '@/app/components/form';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/utils/supabase/browser';
import { toast } from 'sonner';
import { updateChartOfAccount } from '@/app/lib/actions';
import { ChartOfAccount } from '@/app/lib/types';

export default function Page({ params }: { params: { id: string } }) {
  const [chartOfAccount, setChartOfAccount] = useState<ChartOfAccount | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
  const [pending, start] = useTransition();


  useEffect(() => {
    async function fetchChartOfAccount() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('chart_of_accounts')
        .select('id, account_code, account_name, account_type')
        .eq('id', params.id)
        .single();

      if (error) {
        toast.error('Failed to fetch account data.');
        return;
      }

      setChartOfAccount(data as ChartOfAccount);
    }

    fetchChartOfAccount();
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
      redirect('/admin-panel/chart-of-accounts');
    });
  }

  if (!chartOfAccount) {
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
            defaultValue: chartOfAccount.account_code,
            error: fieldErrors?.properties?.account_code,
          },
          {
            id: "account_name",
            label: "Account Name",
            type: "text",
            required: true,
            defaultValue: chartOfAccount.account_name,
            error: fieldErrors?.properties?.account_name,
          },
          {
            id: "account_type",
            label: "Account Type",
            type: "select",
            options: [{ value: "debit" }, { value: "credit" }],
            required: true,
            defaultValue: chartOfAccount.account_type,
            error: fieldErrors?.properties?.account_type,
          },
        ]}
        button={{
          type: "submit",
          children: pending ? "Updating..." : "Update account",
          disabled: pending,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
