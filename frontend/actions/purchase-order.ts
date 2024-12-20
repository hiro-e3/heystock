'use server';

import { PaginatorResourceResponse } from "@/types/paginator-response";
import { PurchaseOrder } from "@/types/purchase-order";
import { PurchaseOrderDetail } from "@/types/purchase-order-detail";
import { cookies } from "next/headers";
import * as v from 'valibot';

export async function getPurchaseOrders(): Promise<PaginatorResourceResponse<PurchaseOrder>> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/purchase-orders`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["purchase-orders"],
    }
  });

  const result = await response.json();

  if(response.ok) {
    console.log(result);
    const data = v.safeParse(v.array(PurchaseOrder), result.data);
    if(data.success) {
      result.data = data.output;
    }

    
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to fetch purchase orders");
  }
}

export async function getPurchaseOrder(id: string | number): Promise<PurchaseOrder & { details: PurchaseOrderDetail[] }> {
  const apiUrl = process.env.API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${apiUrl}/purchase-orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if(response.ok) {
    return result;
  } else {
    console.error(result);
    throw new Error("Failed to fetch purchase order");
  }
}