"use server";
import { cookies } from "next/headers";
import {
  PaginatorLinksSchema,
  PaginatorMetaSchema,
} from "../types/paginator-response";
import { Product, ProductResponseSchema, ProductSchema } from "@/types/product";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { ActionResult } from "@/types/action-result";

const ProductPaginatorSchema = v.pipe(
  v.object({
    data: v.array(ProductResponseSchema),
    meta: PaginatorMetaSchema,
    links: PaginatorLinksSchema,
  })
);

// type ProductPaginatorResponse = v.InferInput<typeof ProductPaginatorSchema>;

export async function getProducts(
  page: string,
  perPage: number = 15,
  fields: (keyof Product)[] = []
) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const fieldsJoined = fields.join(",");

  const products = await fetch(
    `${apiUrl}/products?per_page=${perPage}&page=${page}&includes=category,manufacturer${
      fieldsJoined ? `&fields=${fieldsJoined}` : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products", `products?page=${page}`],
      },
    }
  );

  const json = await products.json();

  const parseResult = await v.safeParseAsync(ProductPaginatorSchema, json);

  if (parseResult.success) {
    return parseResult.output;
  } else {
    const flattenIssues = v.flatten(parseResult.issues);
    return flattenIssues;
  }
}

export async function createProduct(
  product: Product
): Promise<ActionResult<Product & { id: number }, unknown>> {
  const parsedProduct = v.safeParse(ProductSchema, product);

  if (!parsedProduct.success) {
    console.error("validation issues", parsedProduct.issues);
    const flattenIssues = v.flatten(parsedProduct.issues);

    return {
      success: false,
      errors: flattenIssues,
    };
  }

  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parsedProduct.output),
  });

  const result = await response.json();
  if (response.ok) {
    revalidateTag("products");
    return {
      success: true,
      data: result as Product & { id: number },
    };
  } else {
    console.error(result);
    return {
      success: false,
      errors: result,
    };
  }
}

export async function updateProduct(
  product: Product & { id: number }
): Promise<ActionResult<Product, unknown>> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const result = await response.json();
  if (response.ok) {
    revalidateTag("products");
    return {
      success: true,
      data: result as Product,
    };
  } else {
    console.error(result);
    return {
      success: false,
      errors: result,
    };
  }
}

export async function deleteProduct(id: number) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (response.ok) {
    revalidateTag("products");
  } else {
    console.error(result);
  }

  return result;
}
