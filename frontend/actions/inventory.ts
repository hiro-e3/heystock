"use server";

import { Inventory, InventoryResponse, InventoryResponseSchema, InventorySchema } from "@/types/inventory";
import { PaginatorLinksSchema, PaginatorMetaSchema, PaginatorResourceResponse } from "@/types/paginator-response";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import * as v from 'valibot';

const InventoryPaginatorSchema = v.pipe(
  v.object({
    data: v.array(InventoryResponseSchema),
    meta: PaginatorMetaSchema,
    links: PaginatorLinksSchema
  }),
)

export async function getInventories(page: string | number = 1, ): Promise<PaginatorResourceResponse<InventoryResponse>> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/inventories?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["inventories"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    const parseResult = v.safeParse(InventoryPaginatorSchema, result);
    if (parseResult.success) {
      return parseResult.output;
    } else {
      for (const issue of parseResult.issues) {
        console.error('parse error issues', issue.path, issue.message);
      }
      console.error('parse error issues', parseResult.issues.map(issue => issue.message).join(','));
      throw new Error("Failed to parse inventories");
    }
  } else {
    console.error(result);
    throw new Error("Failed to fetch inventories");
  }
}

export async function getInventory(id: string | number): Promise<InventoryResponse> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/inventories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["inventories"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to fetch warehouse");
  }
}

export async function createInventory(inventoryData: Omit<Inventory, 'id'>): Promise<Inventory> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const parseResult = v.safeParse(InventorySchema, inventoryData);
  if(!parseResult.success) {
    console.error(parseResult.issues);
    throw new Error("Invalid inventory data");
  }

  const response = await fetch(`${apiUrl}/inventories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inventoryData),
    next: {
      tags: ["inventories"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    revalidateTag("inventories");
    return result;
  } else {
    console.error(inventoryData);
    console.error(result);
    throw new Error("Failed to create inventory");
  }
}

export async function updateInventory(warehouse: Inventory): Promise<Inventory> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/inventories/${warehouse.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(warehouse),
    next: {
      tags: ["inventories"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    revalidateTag("inventories");
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to update warehouse");
  }
}

export async function deleteInventory(id: string | number): Promise<boolean> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/inventories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["inventories"],
    },
  });

  if (response.ok) {
    revalidateTag("inventories");
    return true;
  } else {
    console.error(await response.json());
    return false;
  }
}