"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Warehouse } from "@/types/warehouse";
import { createWarehouse } from "@/actions/warehouse";

type NewWarehouse = Omit<Warehouse, 'id'> & { id?: number };

const initialWarehouse: NewWarehouse = {
  location: '',
  name: '',
  note: '',
}


export function WarehousePopover({
  defaultValue
}: {
  defaultValue?: NewWarehouse;
}) {
  const [open, setOpen] = useState(false);
  const [warehouse, setWarehouse] = useState<NewWarehouse>(defaultValue ?? initialWarehouse);
  
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="icon" onClick={() => setOpen(true)}>
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form id="create-new-warehouse" onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            createWarehouse(warehouse).then(() => {
              setWarehouse(initialWarehouse);
              setOpen(false);
            }).catch((err) => {
              console.error(err);
            });
          }}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">倉庫追加</h4>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="new-warehouse-name">名前</Label>
                  <Input
                    id="new-warehouse-name"
                    value={warehouse.name}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setWarehouse({
                        ...warehouse,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="new-warehouse-location">場所</Label>
                  <Input
                    id="new-warehouse-description"
                    value={warehouse.location}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setWarehouse({
                        ...warehouse,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="new-warehouse-description">説明</Label>
                  <Input
                    id="new-warehouse-description"
                    value={warehouse.note}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setWarehouse({
                        ...warehouse,
                        note: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-row justify-end">
                  <Button type="submit" form="create-new-warehouse">
                    追加
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
