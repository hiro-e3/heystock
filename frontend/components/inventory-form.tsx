import { Inventory } from "@/types/inventory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectWarehouse } from "./select-warehouse";
import { Warehouse } from "@/types/warehouse";
import { Textarea } from "./ui/textarea";
import { WarehousePopover } from "./warehouse-popover";
import { useState } from "react";

type InventoryFormData =
  | Inventory
  | (Omit<Inventory, "id"> & Partial<{ id: number }>);

export function InventoryForm<T extends InventoryFormData>({
  formId,
  onSubmit,
  inventory,
  onInventoryChange,
  warehouses,
}: {
  formId?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  inventory: T;
  onInventoryChange: (inventory: T) => void;
  warehouses: Warehouse[];
}) {
  const [quantity, setQuantity] = useState("");
  return (
    <form id={formId} className="space-y-3" onSubmit={onSubmit}>
      <div>
        <Label htmlFor="warehouse">倉庫</Label>
        <div className="flex flex-row gap-2">
          <SelectWarehouse
            id="warehouse"
            warehouses={warehouses}
            value={inventory.warehouse_id.toString()}
            onValueChange={(v) =>
              onInventoryChange({
                ...inventory,
                warehouse_id: Number.parseInt(v),
              })
            }
          />
          <WarehousePopover />
        </div>
      </div>
      <div>
        <Label htmlFor="quantity">数量</Label>
        <Input
          type="text"
          id="quantity"
          value={quantity}
          pattern="-?[0-9]*(\.[0-9]+)?"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          onBlur={() => {
            const q = Number.parseInt(quantity);

            onInventoryChange({
              ...inventory,
              quantity: isNaN(q) ? 0 : q,
            });
          }}
        />
      </div>
      <div>
        <Label htmlFor="price">価格</Label>
        <Input
          type="text"
          id="price"
          value={inventory.price}
          onChange={(e) => {
            onInventoryChange({
              ...inventory,
              price: Number.parseFloat(e.target.value),
            });
          }}
        />
      </div>
      <div>
        <Label htmlFor="note">備考</Label>
        <Textarea
          id="note"
          value={inventory.note}
          onChange={(e) => {
            onInventoryChange({
              ...inventory,
              note: e.target.value,
            });
          }}
        />
      </div>
    </form>
  );
}
