import { z } from 'zod';

const coercedInt = (type: z.ZodInt) => z.preprocess((val) => {
   if (typeof val === "string") {
      return Number.parseInt(val);
   }
   return val;
}, type);

export const ExpenseBaseSchema = z.object({
   expense_type: z.enum(['internal', 'external']),
   amount: z.int().gt(-1),
});

export const ExpenseCreateSchema = ExpenseBaseSchema.omit({ amount: true }).extend({
   amount: coercedInt(z.int().gt(-1))
});

export const CustomerBaseSchema = z.object({
   customer_name: z.string().min(1, "Customer name is required").max(20, "Customer name is too long"),
   contact_no: z.string().regex(/^\d{11}$/, "Contact number must be a valid 10-digit number"),
   email_address: z.string().email("Invalid email address"),
});

export const CustomerCreateSchema = CustomerBaseSchema.omit({ email_address: true }).extend({
   email_address: z.string().email(), 
});

export const CoaBaseSchema = z.object({
   account_code: z.string().min(1, "Account code is required").max(20, "Account code is too long"),
   account_name: z.string().min(1, "Account name is required").max(20, "Account name is too long"),
   account_type: z.enum(['debit', 'credit'], "Account type must be either 'debit' or 'credit'"),
});

export const CoaCreateSchema = CoaBaseSchema.omit({}).extend({
   account_type: z.enum(['debit', 'credit'])
});