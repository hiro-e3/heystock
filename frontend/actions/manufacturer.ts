"use server"
import { Manufacturer, ManufacturerSchema } from "@/types/manufacturer";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import * as v from 'valibot';

export async function getManufacturers(): Promise<Manufacturer[]> {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const categories = await fetch(
    `${apiUrl}/manufacturers`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["manufacturers"],
      }
    }
  );
  
  const result = v.safeParse(v.array(ManufacturerSchema), await categories.json());

  if(result.success) {
    return result.output;
  } else {
    console.error(result);
    return [];
  }
}

export async function createManufacturer(
  manufacturer: Omit<Manufacturer, 'id'| 'created_at' | 'updated_at'>
) {
  const cookieStore = await cookies();
  const apiUrl = process.env.API_URL;
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${apiUrl}/manufacturers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(manufacturer),
    }
  );

  const result = await response.json();

  revalidateTag("manufacturers");

  return result;
}