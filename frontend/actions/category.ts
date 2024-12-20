"use server";
import { cookies } from "next/headers";
import { ProductCategory, ProductCategorySchema } from "@/types/product-categories";
import * as v from 'valibot';
import { revalidateTag } from "next/cache";
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
      next: {
        tags: ["categories"],
      }
    }
  );
  
  const result = v.safeParse(CategoriesSchema, await categories.json());

  if(result.success) {
    return result.output;
  } else {
    console.error(result);
    return [];
  }
}

export async function createProductCategory(category: Omit<ProductCategory, 'id'>): Promise<ProductCategory> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${apiUrl}/products/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  );

  const result = await response.json();
  if(response.ok) {
    
    revalidateTag("categories");
    return result;
  } else {
    console.error(result);
    return result;
  }
}