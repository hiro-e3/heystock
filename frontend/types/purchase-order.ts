import * as v from 'valibot';

export const PurchaseOrder = v.object({
  id: v.number(),
  supplier_id: v.number(),
  user_id: v.number(),
  order_date: v.string(),
  delivery_date: v.nullish(v.string()),
  note: v.string(),
});

export type PurchaseOrder = v.InferInput<typeof PurchaseOrder>;