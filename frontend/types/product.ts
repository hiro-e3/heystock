import * as v from 'valibot';
import { ProductCategorySchema } from './product-categories';
import { CompanySchema } from './company';
export const ProductSchema = v.object({
  id: v.number(),
  name: v.pipe(v.string(), v.maxLength(255)),
  description: v.optional(v.string()),
  unit_price: v.string(),
  category_id: v.optional(v.number()),
  manufacturer_id: v.optional(v.number()),
  category: v.optional(ProductCategorySchema),
  manufacturer: v.optional(CompanySchema)
});

export type Product = v.InferInput<typeof ProductSchema>;
