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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  return (
    <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
      <DialogTrigger asChild>
        <Button
          title="取引先登録"
          type="button"
          variant="default"
          size="default"
        >
          取引先登録
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogDescription hidden>
          取引先情報の新規登録を行います。
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>取引先登録</DialogTitle>
        </DialogHeader>
        <CompanyForm
          id="create-company-form"
          company={company}
          onChange={setCompany}
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const result = await createCompany(company);
            if (result.success) {
              toast({
                description: `${result.data.name} ${result.data.id} を登録しました`,
              });
              setCompany(initialCompany);
              setDialogOpen(false);
            } else {
              console.error(result.errors);
            }
          }}
        />
        <DialogFooter>
          <Button type="submit" form="create-company-form">
            登録
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
