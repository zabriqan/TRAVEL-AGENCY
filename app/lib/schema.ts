import { z } from 'zod';

const coercedInt = (type: z.ZodInt) => z.preprocess((val) => {
   if (typeof val === "string") {
      return Number.parseInt(val);
   }
   return val;
}, type);

const ZeroOrPositive = z.int().gt(-1);

const NullableUuid = z.preprocess(
   (val) => val === '' ? null : val,
   z.uuid().nullable()
);

const PricesAndCostRowSchema = z.object({
   id: z.string(),
   price: coercedInt(ZeroOrPositive),
   cost: coercedInt(ZeroOrPositive),
})


export const ExpenseBaseSchema = z.object({
   chart_of_account_id: NullableUuid,
   expense_type: z.enum(['internal', 'external']),
   amount: ZeroOrPositive,
});

export const CustomerBaseSchema = z.object({
   customer_name: z.string().min(1, "Customer name is required").max(20, "Customer name is too long"),
   contact_no: z.string().regex(/^\d{11}$/, { error: "Contact number must be a valid 10-digit number" }),
   email_address: z.literal("").or(z.email({ error: "Invalid email address" })),
});

export const ChartOfAccountBaseSchema = z.object({
   account_code: z.string().min(1, "Account code is required").max(20, "Account code is too long"),
   account_name: z.string().min(1, "Account name is required").max(20, "Account name is too long"),
   account_type: z.enum(['debit', 'credit'], "Account type must be either 'debit' or 'credit'"),
});

export const QuotationBaseSchema = z.object({
   booking_no: z.string(),
   stops: z.array(z.string()),
   customer_id: NullableUuid,
   prices_and_costs: z.array(PricesAndCostRowSchema),
});

export const packagebaseSchema = z.object({
   heading: z.string().min(2, "Heading is required").max(50, "Heading is too long"),
   subheading: z.string().max(100, "Subheading is too long").optional(),
   route: z.string().min(1, "Route is required").max(100, "Route is too long"),
   duration: z.string().min(1, "Duration is required").max(50, "Duration is too long"),
   misc_text: z.string().max(500, "Miscellaneous text is too long").optional(),
   pdf_url: z.string().min(2,"PDF URL must be a valid URL"),
   poster_url: z.string().min(2,"Poster URL must be a valid URL"),
});

export const ExpenseCreateSchema = ExpenseBaseSchema.omit({ amount: true }).extend({
   amount: coercedInt(ZeroOrPositive)
});

export const ChartOfAccountCreateSchema = ChartOfAccountBaseSchema

export const CustomerCreateSchema = CustomerBaseSchema;
export const packageCreateSchema = packagebaseSchema;

export const QuotationCreateSchema = QuotationBaseSchema.omit({ stops: true }).extend({
   stops: z.string(),
});