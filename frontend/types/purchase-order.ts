import * as v from 'valibot';
import { CompanySchema } from './company';

export const PurchaseOrder = v.object({
  id: v.number(),
  supplier: CompanySchema,
  user_id: v.number(),
  order_date: v.string(),
  delivery_date: v.nullish(v.string()),
  total_price: v.number(),
  note: v.string(),
});

export type PurchaseOrder = v.InferInput<typeof PurchaseOrder>;