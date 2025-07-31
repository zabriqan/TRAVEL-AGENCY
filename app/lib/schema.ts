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