"use server";

import { Warehouse, WarehouseSchema } from "@/types/warehouse";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import * as v from 'valibot';

export async function getWarehouses(): Promise<Warehouse[]> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/warehouses`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["warehouses"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    const data = v.safeParse(v.array(WarehouseSchema), result);
    if (data.success) {
      result.data = data.output;
    }

    return result;
  } else {
    console.error(result);
    throw new Error("Failed to fetch warehouses");
  }
}

export async function getWarehouse(id: string | number): Promise<Warehouse> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/warehouses/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["warehouses"],
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

export async function createWarehouse(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/warehouses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(warehouse),
    next: {
      tags: ["warehouses"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    revalidateTag("warehouses");
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to create warehouse");
  }
}

export async function updateWarehouse(warehouse: Warehouse): Promise<Warehouse> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/warehouses/${warehouse.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(warehouse),
    next: {
      tags: ["warehouses"],
    },
  });

  const result = await response.json();

  if (response.ok) {
    revalidateTag("warehouses");
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to update warehouse");
  }
}

export async function deleteWarehouse(id: string | number): Promise<boolean> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/warehouses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["warehouses"],
    },
  });

  if (response.ok) {
    revalidateTag("warehouses");
    return true;
  } else {
    console.error(await response.json());
    return false;
  }
}