import * as v from 'valibot';
import { ProductSchema } from './product';

export const PurchaseOrderDetailSchema = v.object({
  id: v.number(),
  purchase_order_id: v.number(),
  product_id: v.number(),
  quantity: v.number(),
  price: v.number(),
  note: v.string(),
  product: v.nullish(ProductSchema)
});

export type PurchaseOrderDetail = v.InferInput<typeof PurchaseOrderDetailSchema>;