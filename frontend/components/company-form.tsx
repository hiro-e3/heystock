"use client";

import { Company, CompanyType } from "@/types/company";
import { FormEventHandler } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

type CompanyFormData = Company | (Omit<Company, "id"> & Partial<{ id: number }>);

export function CompanyForm<T extends CompanyFormData>({
  id,
  children,
  company,
  onChange,
  onSubmit,
}: {
  id?: string;
  children?: React.ReactNode;
  company: T;
  onChange: (company: T) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form id={id} onSubmit={onSubmit} className="flex flex-col gap-2">
      {company.id && <input type="hidden" name="id" value={company.id} />}
      <div>
        <Label className="col-span-3">
          コード
          <Input
            type="text"
            name="code"
            value={company.code}
            onChange={(e) => {
              onChange({ ...company, code: e.target.value });
            }}
          />
        </Label>
      </div>

      { /* 取引先名 */}
      <div className="grid grid-cols-12 gap-1">
        <Label className="col-span-6">
          名前
          <Input
            id="name"
            name="name"
            value={company.name}
            onChange={(e) => onChange({ ...company, name: e.target.value })}
          />
        </Label>
        <Label className="col-span-3">
          かな
          <Input
            type="text"
            name="kana_name"
            value={company.kana_name}
            onChange={(e) =>
              onChange({ ...company, kana_name: e.target.value })
            }
          />
        </Label>
        <Label className="col-span-3">
          略称
          <Input
            type="text"
            name="short_name"
            value={company.short_name}
            onChange={(e) =>
              onChange({ ...company, short_name: e.target.value })
            }
          />
        </Label>
      </div>

      <div>
        <Label>
          代表者名
          <Input
            type="text"
            name="representative"
            value={company.representative}
            onChange={(e) =>
              onChange({ ...company, representative: e.target.value })
            }
          />
        </Label>
      </div>
      <fieldset name="company-type" className="my-1">
        <Label asChild>
          <legend className="mb-2">取引先種別</legend>
        </Label>
        <div className="flex gap-3">
          <div>
            <Checkbox
              id="company-type-customer"
              name="company_type"
              checked={company.company_type.includes(CompanyType.customer)}
              onCheckedChange={(c) => {
                if (c === "indeterminate") {
                  return;
                }
                const checked = company.company_type.includes(
                  CompanyType.customer
                );
                onChange({
                  ...company,
                  company_type: checked
                    ? company.company_type.filter(
                        (t) => t !== CompanyType.customer
                      )
                    : [...company.company_type, CompanyType.customer],
                });
              }}
            />
            <Label htmlFor="company-type-customer">顧客</Label>
          </div>
          <div>
            <Checkbox
              id="company-type-manufacturer"
              name="company_type"
              checked={company.company_type.includes(CompanyType.manufacturer)}
              onCheckedChange={(c) => {
                if (c === "indeterminate") {
                  return;
                }
                const checked = company.company_type.includes(
                  CompanyType.manufacturer
                );
                onChange({
                  ...company,
                  company_type: checked
                    ? company.company_type.filter(
                        (t) => t !== CompanyType.manufacturer
                      )
                    : [...company.company_type, CompanyType.manufacturer],
                });
              }}
            />
            <Label htmlFor="company-type-manufacturer">メーカー</Label>
          </div>
          <div>
            <Checkbox
              id="company-type-supplier"
              name="company_type"
              checked={company.company_type.includes(CompanyType.supplier)}
              onCheckedChange={(c) => {
                if (c === "indeterminate") {
                  return;
                }
                const checked = company.company_type.includes(
                  CompanyType.supplier
                );
                onChange({
                  ...company,
                  company_type: checked
                    ? company.company_type.filter(
                        (t) => t !== CompanyType.supplier
                      )
                    : [...company.company_type, CompanyType.supplier],
                });
              }}
            />
            <Label htmlFor="company-type-supplier">仕入先</Label>
          </div>
        </div>
      </fieldset>
      <div className="grid grid-cols-12 gap-1">
        <Label className="col-span-2">
          郵便番号
          <Input
            type="text"
            name="postal_code"
            value={company.postal_code}
            onChange={(e) => {
              onChange({ ...company, postal_code: e.target.value });
            }}
          />
        </Label>
        <Label className="col-span-10">
          住所
          <Input
            type="text"
            name="address"
            value={company.address}
            onChange={(e) => {
              onChange({ ...company, address: e.target.value });
            }}
          />
        </Label>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        <Label>
          Tel
          <Input
            type="tel"
            name="phone"
            value={company.phone}
            onChange={(e) => {
              onChange({ ...company, phone: e.target.value });
            }}
          />
        </Label>
        <Label>
          Fax
          <Input
            type="tel"
            name="fax"
            value={company.fax}
            onChange={(e) => {
              onChange({ ...company, fax: e.target.value });
            }}
          />
        </Label>
        <Label>
          E-mail
          <Input
            type="email"
            name="email"
            value={company.email}
            onChange={(e) => {
              onChange({ ...company, email: e.target.value });
            }}
          />
        </Label>
        <Label>
          Webサイト
          <Input
            type="url"
            name="url"
            value={company.url}
            onChange={(e) => {
              onChange({ ...company, url: e.target.value });
            }}
          />
        </Label>
      </div>
      <div>
        <Label>
          説明
          <Textarea
            name="description"
            value={company.description}
            onChange={(e) => {
              onChange({ ...company, description: e.target.value });
            }}
          />
        </Label>
      </div>
      <div>{children}</div>
    </form>
  );
}
