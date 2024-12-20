"use client";

import { createCompany } from "@/actions/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Company, CompanyType } from "@/types/company";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

type NewManufacturer = Omit<Company, "id">;

const initialManufacturer = {
  code: "",
  company_type: [CompanyType.manufacturer],
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

export function ManufacturerPopover({
  defaultValue,
}: {
  defaultValue?: NewManufacturer;
}) {
  const [open, setOpen] = useState(false);

  const [manufacturer, setManufacturer] = useState<NewManufacturer>(
    defaultValue ?? initialManufacturer
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] overflow-auto" side="right">
        <form
          id="create-new-manufacturer"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const result = await createCompany(manufacturer);
            if (result.success) {
              setManufacturer(initialManufacturer);
              setOpen(false);
            } else {
              console.error(result.errors);
            }
          }}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">メーカー追加</h4>
            </div>
            <div>
              <Label className="col-span-3 flex flex-col gap-1">
                コード
                <Input
                  type="text"
                  name="code"
                  value={manufacturer.code}
                  onChange={(e) => {
                    setManufacturer({ ...manufacturer, code: e.target.value });
                  }}
                />
              </Label>
            </div>

            {/* 取引先名 */}
            <div className="grid grid-cols-12 gap-1">
              <Label className="col-span-6 flex flex-col gap-1">
                名前
                <Input
                  id="name"
                  name="name"
                  value={manufacturer.name}
                  onChange={(e) =>
                    setManufacturer({ ...manufacturer, name: e.target.value })
                  }
                />
              </Label>
              <Label className="col-span-3 flex flex-col gap-1">
                かな
                <Input
                  type="text"
                  name="kana_name"
                  value={manufacturer.kana_name}
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      kana_name: e.target.value,
                    })
                  }
                />
              </Label>
              <Label className="col-span-3 flex flex-col gap-1">
                略称
                <Input
                  type="text"
                  name="short_name"
                  value={manufacturer.short_name}
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      short_name: e.target.value,
                    })
                  }
                />
              </Label>
            </div>

            <div>
              <Label className=" flex flex-col gap-1">
                代表者名
                <Input
                  type="text"
                  name="representative"
                  value={manufacturer.representative}
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      representative: e.target.value,
                    })
                  }
                />
              </Label>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <Label className="col-span-2 flex flex-col gap-1">
                郵便番号
                <Input
                  type="text"
                  name="postal_code"
                  value={manufacturer.postal_code}
                  onChange={(e) => {
                    setManufacturer({
                      ...manufacturer,
                      postal_code: e.target.value,
                    });
                  }}
                />
              </Label>
              <Label className="col-span-10 flex flex-col gap-1">
                住所
                <Input
                  type="text"
                  name="address"
                  value={manufacturer.address}
                  onChange={(e) => {
                    setManufacturer({
                      ...manufacturer,
                      address: e.target.value,
                    });
                  }}
                />
              </Label>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              <Label className="flex flex-col gap-1">
                Tel
                <Input
                  type="tel"
                  name="phone"
                  value={manufacturer.phone}
                  onChange={(e) => {
                    setManufacturer({ ...manufacturer, phone: e.target.value });
                  }}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Fax
                <Input
                  type="tel"
                  name="fax"
                  value={manufacturer.fax}
                  onChange={(e) => {
                    setManufacturer({ ...manufacturer, fax: e.target.value });
                  }}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                E-mail
                <Input
                  type="email"
                  name="email"
                  value={manufacturer.email}
                  onChange={(e) => {
                    setManufacturer({ ...manufacturer, email: e.target.value });
                  }}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Webサイト
                <Input
                  type="url"
                  name="url"
                  value={manufacturer.url}
                  onChange={(e) => {
                    setManufacturer({ ...manufacturer, url: e.target.value });
                  }}
                />
              </Label>
            </div>
            <div>
              <Label className="flex flex-col gap-1">
                説明
                <Textarea
                  name="description"
                  value={manufacturer.description}
                  onChange={(e) => {
                    setManufacturer({
                      ...manufacturer,
                      description: e.target.value,
                    });
                  }}
                />
              </Label>
            </div>
            <div className="flex flex-row justify-end">
              <Button type="submit" form="create-new-manufacturer">
                追加
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
