import * as v from 'valibot';
import { ProductCategorySchema } from './product-categories';
import { CompanySchema } from './company';

export const ProductResponseSchema = v.object({
  id: v.number(),
  name: v.string(),
  description: v.optional(v.string()),
  unit_price: v.string(),
  category: v.nullable(ProductCategorySchema),
  manufacturer: v.nullable(CompanySchema),
  total_inventory: v.union([v.number(), v.string()]),
  created_at: v.string(),
  updated_at: v.string()
});

export type ProductResponse = v.InferInput<typeof ProductResponseSchema>;

export const ProductSchema = v.object({
  name: v.pipe(v.string(), v.maxLength(255)),
  description: v.string(),
  unit_price: v.pipe(v.string(), v.decimal()),
  category_id: v.optional(v.number()),
  manufacturer_id: v.optional(v.number()),
});

export type Product = v.InferInput<typeof ProductSchema>;
