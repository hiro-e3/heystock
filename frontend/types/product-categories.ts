import * as v from 'valibot';

export const ProductCategorySchema = v.object({
  id: v.number(),
  name: v.pipe(v.string(), v.nonEmpty(), v.maxLength(255)),
  description: v.nullable(v.optional(v.pipe(v.string(), v.maxLength(65535)))),
})

export type ProductCategory = v.InferInput<typeof ProductCategorySchema>;
