'use client';

import { createManufacturer } from "@/actions/manufacturer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Manufacturer } from "@/types/manufacturer";
import { Plus } from "lucide-react";
import { useState } from "react";

type NewManufacturer = Omit<{
  [K in keyof Required<Manufacturer>]: NonNullable<Required<Manufacturer>[K]>;
}, "id" | "created_at" | "updated_at"> & Partial<{ id: number }>;

export function ManufacturerPopover({ defaultValue }: { defaultValue?: NewManufacturer}) {
  const [open, setOpen] = useState(false);

  const [manufacturer, setManufacturer] = useState<NewManufacturer>(defaultValue ?? {
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    contact_person: "",
  });

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <form
          id="create-new-manufacturer"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            createManufacturer(manufacturer).then(() => {
              setOpen(false);
            }).catch((err) => {
              console.error(err);
            });;
          }}
          >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">メーカー追加</h4>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-name">Name</Label>
                <Input
                  id="new-manufacturer-name"
                  value={manufacturer.name}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-address">Address</Label>
                <Input
                  id="new-manufacturer-address"
                  value={manufacturer.address}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-phone">Phone</Label>
                <Input
                  id="new-manufacturer-phone"
                  value={manufacturer.phone}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-email">E-mail</Label>
                <Input
                  type="email"
                  id="new-manufacturer-email"
                  value={manufacturer.email}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-contact-person">
                  Contact Person
                </Label>
                <Input
                  id="new-manufacturer-contact-person"
                  value={manufacturer.contact_person}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      contact_person: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="new-manufacturer-description">
                  Description
                </Label>
                <Input
                  id="new-manufacturer-description"
                  value={manufacturer.description}
                  className="col-span-2 h-8"
                  onChange={(e) =>
                    setManufacturer({
                      ...manufacturer,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-row justify-end">
                <Button type="submit" form="create-new-manufacturer">
                  追加
                </Button>
              </div>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
