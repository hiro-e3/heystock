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
import { ProductCategory } from "@/types/product-categories";
import { ProductForm } from "@/components/product-form";
import { Product } from "@/types/product";
import { useState } from "react";
import { Company } from "@/types/company";

type NewProduct = Omit<Product, "id" | "created_at" | "updated_at"> &
  Partial<{ id: number }>;

const initialProduct: NewProduct = {
  id: undefined,
  name: "",
  unit_price: "",
  description: "",
  category_id: undefined,
};

export function CreateProductDialog({
  categories,
  manucaturers,
}: {
  categories: ProductCategory[];
  manucaturers: Company[];
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setProduct(initialProduct);
              setDialogOpen(true);
            }}
            size="default"
          >
            商品登録
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
          <DialogDescription hidden>
            商品の追加・編集を行います。
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>商品{product?.id ? "編集" : "追加"}</DialogTitle>
          </DialogHeader>
          <ProductForm id="create-product-form" product={product} categories={categories} manucaturers={manucaturers} onChange={setProduct} />
          <DialogFooter>
            <Button type="submit" form="create-product-form">
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
