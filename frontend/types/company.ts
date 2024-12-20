import * as v from "valibot";
import { Product } from "./product";

export enum CompanyType {
  manufacturer = "manufacturer",
  supplier = "supplier",
  customer = "customer",
}

export const CompanySchema = v.object({
  id: v.pipe(v.number(), v.integer()), 
  code: v.pipe(v.string(), v.maxLength(15)),
  company_type: v.array(v.enum(CompanyType)),
  name: v.pipe(v.string(), v.maxLength(255)),
  short_name: v.pipe(v.string(), v.maxLength(255)),
  kana_name: v.pipe(v.string(), v.maxLength(255)),
  representative: v.pipe(v.string(), v.maxLength(100)),
  postal_code: v.pipe(v.string(), v.maxLength(10)),
  address: v.pipe(v.string(), v.maxLength(255)),
  phone: v.pipe(v.string(), v.maxLength(20)),
  fax: v.pipe(v.string(), v.maxLength(20)),
  email: v.pipe(v.string(), v.maxLength(255)),
  url: v.pipe(v.string(), v.maxLength(255)),
  description: v.string(),
});

export type Company = v.InferInput<typeof CompanySchema> & { id: number };

export type Supplier = Company & { supply_products: Product[] };