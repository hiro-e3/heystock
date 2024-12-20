"use client";
import { InventoryForm } from "@/components/inventory-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useWarehouses } from "./provider";
import { PlusSquare } from "lucide-react";
import { createInventory } from "@/actions/inventory";
import { ProductResponse } from "@/types/product";

const initialInventory = {
  warehouse_id: 0,
  product_id: 0,
  quantity: 0,
  price: 0,
  note: "",
};

export function InventoryCreateDialog({ product }: { product: ProductResponse }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [inventory, setInventory] = useState({
    ...initialInventory,
    product_id: product.id,
  });
  const warehouses = useWarehouses();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setDialogOpen(true);
          }}
          size="icon-sm"
          title="在庫追加"
        >
          <PlusSquare size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>在庫追加: {product.name}</DialogTitle>
        </DialogHeader>

        <InventoryForm
          formId="create-inventory-form"
          inventory={inventory}
          onInventoryChange={setInventory}
          warehouses={warehouses}
          onSubmit={async e => {
            e.preventDefault();
            e.stopPropagation();
            await createInventory(inventory);
            setInventory(initialInventory);
          }}
        />

        <DialogFooter>
          <Button title="追加" type="submit" variant="default" size="default" form="create-inventory-form">
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
