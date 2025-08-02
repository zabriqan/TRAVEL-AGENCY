"use client";

import React, { useEffect, useState, useTransition } from "react";
import Form from "@/app/components/form";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/utils/supabase/browser";
import { toast } from "sonner";
import { updateExpense } from "@/app/lib/actions";
import { ExpenseType } from "@/app/lib/types";

export default function EditExpensePage({ params }: { params: { id: string } }) {
  const [expenseData, setExpenseData] = useState<ExpenseType | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorType>({ errors: [] });
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function fetchExpense() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("expenses")
        .select("id,amount,expense_type,chart_of_account_id")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching expense:", error);
        toast.error("Failed to fetch expense data.");
        return;
      }

      setExpenseData(data as ExpenseType);
    }

    fetchExpense();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateExpense(params.id, fd);
      if (!res.ok) {
        toast.error(res.error || "Error");
        setFieldErrors(res.fieldErrors ?? { errors: [] });
        return;
      }

      toast.success(res.message || "Expense updated successfully");
      router.push("/admin-panel/expenses"); // ✅ Redirect to expense list
    });
  }

  if (!expenseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {fieldErrors.errors.length > 0 && (
        <span className="text-red-500 px-1 py-0.5 text-sm rounded-md border bg-red-100 border-red-400 mb-2">
          {fieldErrors.errors.join(", ")}
        </span>
      )}
      <Form
        fields={[
          {
            id: "expense_type",
            label: "Expense Type",
            type: "select",
            options: [{ value: "internal" }, { value: "external" }],
            required: true,
            defaultValue: expenseData.expense_type,
            error: fieldErrors?.properties?.expense_type,
          },
          {
            id: "amount",
            label: "Amount",
            type: "number",
            required: true,
            defaultValue: String(expenseData.amount),
            error: fieldErrors?.properties?.amount,
          },
        ]}
        button={{
          type: "submit",
          children: pending ? "Updating..." : "Update Expense",
          disabled: pending,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
