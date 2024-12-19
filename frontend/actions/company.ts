'use server'
import { ActionResult } from "@/types/action-result";
import { Company, CompanySchema, CompanyType, Supplier } from "@/types/company";
import { PaginatorLinksSchema, PaginatorMetaSchema, PaginatorResourceResponse } from "@/types/paginator-response";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import * as v from "valibot";

const CompanyPaginatorSchema = v.pipe(
  v.object({
    data: v.array(CompanySchema),
    meta: PaginatorMetaSchema,
    links: PaginatorLinksSchema,
  })
);

export async function getCompanies(type?: CompanyType): Promise<PaginatorResourceResponse<Company>> {
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
    const parseResult = v.safeParse(CompanyPaginatorSchema, result);
    if(parseResult.success) {
      return parseResult.output;
    } else {
      const issues = v.flatten(parseResult.issues);
      console.error(issues);
      console.error(result);
      throw new Error("Failed to parse companies");
    }
  } else {
    console.error(result);
    throw new Error("Failed to fetch companies");
  }
}

export async function getManufacturers(): Promise<Company[]> {
  return (await getCompanies(CompanyType.manufacturer)).data;
}

export async function getSuppliers(): Promise<PaginatorResourceResponse<Supplier>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const res = await fetch(`${process.env.API_URL}/suppliers`, {
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

  return result;
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

export async function createCompany(company: Omit<Company, "id">): Promise<ActionResult<Company, unknown>> {
  const parsedCompany = v.safeParse(v.omit(CompanySchema, ['id']), company);
  if (!parsedCompany.success) {
    const flattenIssues = v.flatten(parsedCompany.issues);
    console.error("validation issues", flattenIssues);
    return {
      success: false,
      errors: flattenIssues,
    };
  }

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

  const result = await res.json();

  if (res.ok) {
    revalidateTag("companies");
    return {
      success: true,
      data: result,
    };
  } else {
    console.error(result);
    return {
      success: false,
      errors: result
    };
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