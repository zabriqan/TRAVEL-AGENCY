'use server';

import { createClient } from '@/app/lib/utils/supabase/server';
import { ChartOfAccountCreateSchema, CustomerCreateSchema, ExpenseCreateSchema, packageCreateSchema, QuotationCreateSchema } from './schema';
import z from 'zod';
import { redirect } from 'next/navigation';
import { safeParseToJSON } from './utils';



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
    chart_of_account_id: formData.get('chart_of_account_id'),
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
    chart_of_account_id: parsed.data.chart_of_account_id,
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

export async function updateExpense(id: string, formData: FormData): Promise<{ ok: true; message: string } | { ok: false; error: string; fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const parsed = ExpenseCreateSchema.safeParse({
    chart_of_account_id: formData.get('chart_of_account_id'),
    expense_type: formData.get("expense_type"),
    amount: formData.get("amount"),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase
    .from("expenses")
    .update({
      chart_of_account_id: parsed.data.chart_of_account_id,
      expense_type: parsed.data.expense_type,
      amount: parsed.data.amount,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { ok: false, error: "Server error. Try again." };
  }

  return { ok: true, message: "Expense updated successfully" };
}


/* Customer actions ─────────────── */

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
export async function updateCustomer(id: string, formData: FormData): Promise<{ ok: true; message: string } | { ok: false; error: string; fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const parsed = CustomerCreateSchema.safeParse({
    customer_name: formData.get("customer_name"),
    contact_no: formData.get("contact_no"),
    email_address: formData.get("email_address"),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase
    .from("customer_master")
    .update({
      customer_name: parsed.data.customer_name,
      contact_no: parsed.data.contact_no,
      email_address: parsed.data.email_address,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return {
      ok: false,
      error: "Server error. Try again.",
    };
  }

  return { ok: true, message: "Customer updated successfully" };
}


/* Chart of account actions ─────── */

export async function createChartOfAccount(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const parsed = ChartOfAccountCreateSchema.safeParse({
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

export async function updateChartOfAccount(id: string, formData: FormData): Promise<{ ok: true; message: string } | { ok: false; error: string; fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const parsed = ChartOfAccountCreateSchema.safeParse({
    account_code: formData.get("account_code"),
    account_name: formData.get("account_name"),
    account_type: formData.get("account_type"),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase
    .from("chart_of_accounts")
    .update({
      account_code: parsed.data.account_code,
      account_name: parsed.data.account_name,
      account_type: parsed.data.account_type,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { ok: false, error: "Server error. Try again." };
  }

  return { ok: true, message: "Chart of Account updated successfully" };
}


/* Quotation actions ────────────── */

export async function createQuotation(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const parsed = QuotationCreateSchema.safeParse({
    booking_no: formData.get('booking_no'),
    stops: formData.get('stops'),
    customer_id: formData.get('customer_id'),
    prices_and_costs: safeParseToJSON(formData.get('prices_and_costs')?.toString())
  })

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    console.log(z.prettifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase.from('quotations').insert({
    booking_no: parsed.data.booking_no,
    stops: parsed.data.stops.split(','),
    customer_id: parsed.data.customer_id,
    prices_and_costs: JSON.stringify(parsed.data.prices_and_costs),
  })

  if (error) {
    console.error(error);
    return { ok: false, error: "Server error. Try again." };
  }

  return { ok: true, message: "Quotation created successfully" }
}

export async function updateQuotation(id: string, formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const parsed = QuotationCreateSchema.safeParse({
    booking_no: formData.get('booking_no'),
    stops: formData.get('stops'),
    customer_id: formData.get('customer_id'),
    prices_and_costs: safeParseToJSON(formData.get('prices_and_costs')?.toString())
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    console.log(z.prettifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase.from('quotations').update({
    booking_no: parsed.data.booking_no,
    stops: parsed.data.stops.split(','),
    customer_id: parsed.data.customer_id,
    prices_and_costs: JSON.stringify(parsed.data.prices_and_costs),
  }).eq("id", id)

  if (error) {
    console.error(error);
    return { ok: false, error: "Server error. Try again." };
  }

  return { ok: true, message: "Quotation updated successfully" }
}

export async function createPackage(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string, fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const parsed = packageCreateSchema.safeParse({
    heading: formData.get('heading'),
    subheading: formData.get('subheading'),
    route: formData.get('route'),
    duration: formData.get('duration'),
    misc_text: formData.get('misc_text'),
    pdf_url: formData.get('pdf_url'),
    poster_url: formData.get('poster_url'),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase.from('packages').insert({
    heading: parsed.data.heading,
    subheading: parsed.data.subheading,
    route: parsed.data.route,
    duration: parsed.data.duration,
    misc_text: parsed.data.misc_text,
    pdf_url: parsed.data.pdf_url,
    poster_url: parsed.data.poster_url,
  });

  if (error) {
    console.log(error);
    return {
      ok: false,
      error: "Server error. Try again.",
    };
  }

  return { ok: true, message: "package added successfully" };
}

export async function updatePackage(id: string, formData: FormData): Promise<{ ok: true; message: string } | { ok: false; error: string; fieldErrors?: FieldErrorType }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const parsed = packageCreateSchema.safeParse({
    heading: formData.get('heading'),
    subheading: formData.get('subheading'),
    route: formData.get('route'),
    duration: formData.get('duration'),
    misc_text: formData.get('misc_text'),
    pdf_url: formData.get('pdf_url'),
    poster_url: formData.get('poster_url'),
  });

  if (!parsed.success) {
    console.log(z.treeifyError(parsed.error));
    return {
      ok: false,
      error: "Invalid data.",
      fieldErrors: z.treeifyError(parsed.error),
    };
  }

  const { error } = await supabase
    .from("packages")
    .update({
      heading: parsed.data.heading,
      subheading: parsed.data.subheading,
      route: parsed.data.route,
      duration: parsed.data.duration,
      misc_text: parsed.data.misc_text,
      pdf_url: parsed.data.pdf_url,
      poster_url: parsed.data.poster_url,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { ok: false, error: "Server error. Try again." };
  }

  return { ok: true, message: "package updated successfully" };
}