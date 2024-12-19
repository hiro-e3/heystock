"use client";

import { ProductSelectTable } from "@/components/product-select-table";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";

export function ProductSelectDialog({
  products,
  selectedIds,
  setSelectedIds,
}: {
  products: Product[];
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
      <DialogTrigger asChild>
        <Button title="商品選択" type="button" variant="default" size="default">
          商品選択
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px]">
        <DialogDescription hidden>
          発注する商品を選択してください。
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>商品選択</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto lg:max-h-[600px]">
          <ProductSelectTable
            products={products}
            selectedProductIds={selectedIds}
            onSelectChange={setSelectedIds}
          />
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
