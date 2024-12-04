import * as v from 'valibot';
import { ProductCategorySchema } from './product-categories';
import { ManufacturerSchema } from './manufacturer';
export const ProductSchema = v.object({
  id: v.number(),
  name: v.pipe(v.string(), v.maxLength(255)),
  description: v.optional(v.string()),
  unit_price: v.string(),
  category_id: v.optional(v.number()),
  manufacturer_id: v.optional(v.number()),
  created_at: v.date(),
  updated_at: v.date(),
  category: v.optional(ProductCategorySchema),
  manufacturer: v.optional(ManufacturerSchema)
});

export type Product = v.InferInput<typeof ProductSchema>;
