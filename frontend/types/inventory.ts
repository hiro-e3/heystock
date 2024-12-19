import * as v from 'valibot';
import { ProductSchema } from './product';
import { WarehouseSchema } from './warehouse';

export const InventorySchema = v.object({
  product_id: v.pipe(v.number(), v.integer()),
  warehouse_id: v.pipe(v.number(), v.integer()),
  quantity: v.number(),
  price: v.number(),
  note: v.string(),
});

export type Inventory = v.InferInput<typeof InventorySchema> & { id: number };

export const InventoryResponseSchema = v.object({
  id: v.number(),
  product: ProductSchema,
  warehouse: WarehouseSchema,
  quantity: v.number(),
  price: v.pipe(v.string(), v.decimal()),
  note: v.string(),
  created_at: v.string(),
  updated_at: v.string(),
});

export type InventoryResponse = v.InferInput<typeof InventoryResponseSchema>;