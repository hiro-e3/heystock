"use server";
import { cookies } from "next/headers";
import { SimplePaginatorResponse } from "../types/paginator-response";
import { Product } from "@/types/product";
import { revalidateTag } from "next/cache";

export async function getProducts(
  perPage: number = 15
): Promise<SimplePaginatorResponse<Product>> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const products = await fetch(
    `${apiUrl}/products?paginate=simple&perPage=${perPage}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products"],
      }
    }
  );
  
  const result = await products.json();
  console.log(result);

  // バリデーションいる？
  return result;
}

export async function createProduct(
  product: Omit<Product, 'id'| 'created_at' | 'updated_at'>
) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${apiUrl}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }
  );

  const result = await response.json();
  console.log(result);

  revalidateTag("products");

  return result;
}

export async function updateProduct(
  product: Omit<Product, 'created_at' | 'updated_at'>
) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${apiUrl}/products/${product.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }
  );

  const result = await response.json();
  console.log(result);

  revalidateTag("products");

  return result;
}