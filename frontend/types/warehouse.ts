import * as v from "valibot";
export const WarehouseSchema = v.object({
  name: v.pipe(v.string(), v.maxLength(255)),
  location: v.pipe(v.string(), v.maxLength(255)),
  note: v.string(),
}); 

export type Warehouse = v.InferInput<typeof WarehouseSchema> & { id: number };