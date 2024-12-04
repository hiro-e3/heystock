import * as v from 'valibot';
export const ManufacturerSchema = v.object({
  id: v.number(),
  name: v.pipe(v.string(), v.maxLength(255)),
  address: v.pipe(v.string(), v.maxLength(65535)),
  phone: v.nullish(v.pipe(v.string(), v.maxLength(20))),
  email: v.nullish(v.pipe(v.string(), v.email(), v.maxLength(255))),
  contact_person: v.nullish(v.pipe(v.string(), v.maxLength(255))),
  description: v.string(),
  created_at: v.nullish(v.string()),
  updated_at: v.nullish(v.string()),
});

export type Manufacturer = v.InferInput<typeof ManufacturerSchema>;