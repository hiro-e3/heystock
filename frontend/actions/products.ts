"use server";
import { cookies } from "next/headers";
import { PaginatorResponse } from "../types/paginator-response";
import { Product } from "@/types/product";
import { revalidateTag } from "next/cache";

export async function getProducts(
  page: string,
  perPage: number = 15,
): Promise<PaginatorResponse<Product>> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const products = await fetch(
    `${apiUrl}/products?&per_page=${perPage}&page=${page}&includes=category,manufacturer`,
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
  revalidateTag("products");

  return result;
}

export async function deleteProduct(id: number) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${apiUrl}/products/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if(response.ok) {
    revalidateTag("products");
  } else {
    console.error(result);
  }

  return result;
}