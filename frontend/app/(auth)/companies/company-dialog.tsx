"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CompanyForm } from "@/components/company-form";
import { useState } from "react";
import { Company } from "@/types/company";
import { createCompany } from "@/actions/company";

type NewCompany = Omit<Company, "id"> & Partial<{ id: number }>;

const initialCompany: NewCompany = {
  id: undefined,
  code: "",
  company_type: [],
  name: "",
  short_name: "",
  kana_name: "",
  representative: "",
  postal_code: "",
  address: "",
  phone: "",
  fax: "",
  email: "",
  url: "",
  description: "",
};


export function CreateCompanyDialog() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [company, setCompany] = useState(initialCompany);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
      <DialogTrigger asChild>
        <Button title="新規作成" type="button" variant="default" size="default">
          新規作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogDescription hidden>
          取引先情報の新規作成を行います。
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>取引先新規作成</DialogTitle>
        </DialogHeader>
        <CompanyForm id="create-company-form" company={company} onChange={setCompany} />
        <DialogFooter>
          <Button
            type="submit"
            form="create-company-form"
            onClick={() => {
              createCompany(company);
            }}
          >
            作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}