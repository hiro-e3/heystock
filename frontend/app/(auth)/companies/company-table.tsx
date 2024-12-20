"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginatorResourceResponse } from "@/types/paginator-response";

import { deleteCompany, updateCompany } from "@/actions/company";
import { CompanyForm } from "@/components/company-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Company, CompanyType } from "@/types/company";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TablePaginator } from "@/components/table-paginator";

export function CompanyTable({
  companies,
}: {
  companies: PaginatorResourceResponse<Company>;
}) {
  return (
    <>
      <div className="h-[700px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">名前</TableHead>
              <TableHead>種別</TableHead>
              <TableHead>代表者</TableHead>
              <TableHead>住所</TableHead>
              <TableHead>連絡先</TableHead>
              <TableHead>説明</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.data.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.company_type.map((t) => {
                    let value: string;

                    switch (t) {
                      case CompanyType.manufacturer:
                        value = "メーカー";
                        break;
                      case CompanyType.supplier:
                        value = "仕入先";
                        break;
                      case CompanyType.customer:
                        value = "顧客";
                        break;
                    }

                    return <Badge key={t}>{value}</Badge>;
                  })}
                </TableCell>
                <TableCell>{company.representative}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Link href={`tel:${company.phone}`} className="text-xs">
                      {company.phone}
                    </Link>
                    <Link href={`mailto:${company.email}`} className="text-xs">
                      {company.email}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{company.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <EditDialog targetCompany={company} />
                    <Button
                      title="削除"
                      type="button"
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => {
                        deleteCompany(company.id!);
                      }}
                    >
                      <span>
                        <Trash2 />
                      </span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePaginator currentPage={companies.meta.current_page} lastPage={companies.meta.last_page} />
    </>
  );
}

function EditDialog({ targetCompany }: { targetCompany: Company }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [company, setCompany] = useState(targetCompany);
  const { toast } = useToast();

  return (
    <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
      <DialogTrigger asChild>
        <Button title="編集" type="button" variant="outline" size="icon-sm">
          <span>
            <Edit size={16} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogDescription hidden>
          取引先情報の編集を行います。
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>取引先編集</DialogTitle>
        </DialogHeader>
        <CompanyForm
          id="edit-company-form"
          company={company}
          onChange={setCompany}
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            updateCompany(company);
            setDialogOpen(false);
            toast({
              description: `${company.name}の更新に成功しました。`,
            });
          }}
        />
        <DialogFooter>
          <Button type="submit" form="edit-company-form">
            更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
