'use server';

import { createClient } from '@/app/lib/utils/supabase/server';
import { CoaCreateSchema, CustomerCreateSchema, ExpenseCreateSchema } from './schema';
import z from 'zod';
import { redirect } from 'next/navigation';



/* Miscellaneous actions ────────── */

export async function signIn(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string }> {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // TODO: Validate email and password using zod

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    console.log('Sign In Data:', data);

    return { ok: true, message: "Sign in successful!" };
  } catch (error) {
    console.error('Sign In Error:', error);
    return { ok: false, error: "Failed to sign in." };
  }
}


/* Expense actions ──────────────── */

export async function createExpense(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const parsed = ExpenseCreateSchema.safeParse({
    expense_type: formData.get('expense_type'),
    amount: formData.get('amount'),
  })

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error)
    }
  }

  const { error } = await supabase.from('expenses').insert({
    amount: parsed.data.amount,
    expense_type: parsed.data.expense_type
  });

  if (error) {
    console.log(error);
    return {
      ok: false,
      error: "Server error. Try again."
    }
  }

  return { ok: true, message: "Expense added successfully" }
}

export async function createCustomer(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const parsed = CustomerCreateSchema.safeParse({
    customer_name: formData.get('customer_name'),
    contact_no: formData.get('contact_no'),
    email_address: formData.get('email_address'),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase.from('customer_master').insert({
    customer_name: parsed.data.customer_name,
    contact_no: parsed.data.contact_no,
    email_address: parsed.data.email_address,
    created_at: new Date().toISOString(), 
  });

  if (error) {
    console.log(error);
    return {
      ok: false,
      error: "Server error. Try again.",
    };
  }

  return { ok: true, message: "Customer added successfully" };
}

export async function createCoa(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const parsed = CoaCreateSchema.safeParse({
    account_code: formData.get('account_code'),
    account_name: formData.get('account_name'),
    account_type: formData.get('account_type'),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase.from('chart_of_accounts').insert({
    account_code: parsed.data.account_code,
    account_name: parsed.data.account_name,
    account_type: parsed.data.account_type,
    created_at: new Date().toISOString(), 
  });

  if (error) {
    console.log(error);
    return {
      ok: false,
      error: "Server error. Try again.",
    };
  }

  return { ok: true, message: "Chart of Account added successfully" };
}
