export type ExpenseType = {
   id: string;
   amount: number;
   expense_type: string;
   created_at: string;
   chart_of_account_id: string;
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