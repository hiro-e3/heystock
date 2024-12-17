'use server'
import { Company, CompanySchema, CompanyType } from "@/types/company";
import { PaginatorResponse } from "@/types/paginator-response";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import * as v from 'valibot';

export async function getCompanies(type?: CompanyType): Promise<PaginatorResponse<Company>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const res = await fetch(`${process.env.API_URL}/companies${ type ? `?type=${type}` : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["companies"]
    }
  });

  const result = await res.json();

  if (res.ok) {
    const data = v.safeParse(v.array(CompanySchema), result.data);
    if(!data.success) {
      console.log(result);
      console.log(data);
      throw new Error("Failed to fetch companies");
    }
    return {...result, data: data.output};
  } else {
    console.error(result);
    throw new Error("Failed to fetch companies");
  }
}

export async function getManufacturers(): Promise<Company[]> {
  return (await getCompanies(CompanyType.manufacturer)).data;
}

export async function getCompany(id: number): Promise<Company | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const res = await fetch(`${process.env.API_URL}/companies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["companies"]
    }
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
}

export async function createCompany(company: Omit<Company, "id">): Promise<Company | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${process.env.API_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(company),
  });

  if (res.ok) {
    revalidateTag("companies");
    return await res.json();
  } else {
    console.error(await res.json());
    return null;
  }
}

export async function updateCompany(company: Company | {id: number}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const res = await fetch(`${process.env.API_URL}/companies/${company.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(company),
  });

  if(res.ok) {
    revalidateTag("companies");
    return await res.json();
  } else {
    console.error(await res.json());
    throw new Error("Failed to update company");
  }
}

export async function deleteCompany(id: number): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${process.env.API_URL}/companies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    revalidateTag("companies");
  }

  return res.ok;
}