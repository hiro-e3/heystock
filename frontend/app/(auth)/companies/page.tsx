import { CreateCompanyDialog } from "./company-dialog";
import { CompanyTable } from "./company-table";
import { getCompanies } from "@/actions/company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "heystock - 取引先管理",
};

export default async function Page() {
  const companies = await getCompanies();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-3">
        <h1 className="text-3xl">取引先管理</h1>
        <CreateCompanyDialog />
      </div>

      <div className="border rounded p-3">
        <CompanyTable companies={companies} />
      </div>
    </div>
  );
}
