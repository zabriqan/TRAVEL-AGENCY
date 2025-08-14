export type ExpenseType = {
   id: string;
   amount: number;
   expense_type: string;
   created_at: string;
   chart_of_account_id: string;
   actions?: string;
}

export type Quotation = {
   id: string;
   created_at: string;
   booking_no: string;
   stops: string[];
   prices_and_costs: Record<string, { id: string; price: number; cost: number }>;
   customer_id: string;
   actions?: string;
}

export type ChartOfAccount = {
   id: string;
   created_at: string;
   account_code: string;
   account_name: string;
   account_type: string;
   actions?: string;
}

export type Customer = {
   id: string;
   created_at: string;
   customer_name: string;
   contact_no: string;
   email_address: string;
   actions?: string;
}

type PackageType = 'domestic' | 'international' | 'umrah';

export type Package = {
   id: string;
   created_at: string;
   heading: string;
   subheading: string;
   route: string;
   duration: string;
   misc_text: string;
   pdf_url: string;
   poster_url: string;
   package_type: PackageType;
   actions?: string;
}