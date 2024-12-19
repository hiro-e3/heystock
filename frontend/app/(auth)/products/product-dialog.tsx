"use client";
import { createProduct } from "@/actions/products";
import { ProductForm } from "@/components/product-form";
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
import { useToast } from "@/hooks/use-toast";
import { Company } from "@/types/company";
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";

const initialProduct = {
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
  const { toast } = useToast();

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
            <DialogTitle>商品登録</DialogTitle>
          </DialogHeader>
          <ProductForm
            id="create-product-form"
            product={product}
            categories={categories}
            manucaturers={manucaturers}
            onChange={setProduct}
            onSubmit={async (o) => {
              o.preventDefault();
              o.stopPropagation();

              const result = await createProduct(product);
              if (result.success) {
                toast({
                  description: `${product.name} id:${result.data.id} を登録しました`,
                });
                setProduct(initialProduct);
              } else {
                console.error(result.errors);
              }
            }}
          />
          <DialogFooter>
            <Button type="submit" form="create-product-form">
              登録
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
