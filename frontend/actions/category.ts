"use server";
import { cookies } from "next/headers";
import { ProductCategory, ProductCategorySchema } from "@/types/product-categories";
import * as v from 'valibot';
const CategoriesSchema = v.array(ProductCategorySchema);

export async function getProductCategories(): Promise<ProductCategory[]> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const categories = await fetch(
    `${apiUrl}/products/categories`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  const result = v.safeParse(CategoriesSchema, await categories.json());
  console.log(result);

  if(result.success) {
    return result.output;
  } else {
    console.error(result);
    return [];
  }
}