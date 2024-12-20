import { Inventory } from "@/types/inventory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectWarehouse } from "./select-warehouse";
import { Warehouse } from "@/types/warehouse";
import { Textarea } from "./ui/textarea";

type InventoryFormData = Inventory | (Omit<Inventory, "id"> & Partial<{ id: number }>);

export function InventoryForm<T extends InventoryFormData>({
  formId,
  onSubmit,
  inventory,
  onInventoryChange,
  warehouses,
}: {
  formId?: string
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  inventory: T;
  onInventoryChange: (inventory: T) => void;
  warehouses: Warehouse[];
}) {

  return (
    <form id={formId} className="space-y-3" onSubmit={onSubmit}>
      <div>
        <SelectWarehouse warehouses={warehouses} value={inventory.warehouse_id.toString()} onValueChange={v => onInventoryChange({
          ...inventory,
          warehouse_id: Number.parseInt(v),
        })} />
      </div>
      <div>
        <Label htmlFor="quantity">数量</Label>
        <Input
          type="text"
          id="quantity"
          value={inventory.quantity}
          onChange={(e) => {
            onInventoryChange({
              ...inventory,
              quantity: Number.parseInt(e.target.value),
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