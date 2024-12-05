"use client";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/actions/products";
import { ManufacturerSelect } from "@/components/ManufacturerSelect";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ManufacturerPopover } from "./manufacturer-popover";
import { ProductCategoryPopover } from "./category-popover";
import { ProductCategory } from "@/types/product-categories";
import { ProductCategorySelect } from "@/components/ProductCategorySelect";
import { Manufacturer } from "@/types/manufacturer";
import { useProduct, useProductDialog } from "./ProductContext";
import { Textarea } from "@/components/ui/textarea";


export function ProductDialog({
  categories,
  manucaturers,
}: {
  categories: ProductCategory[];
  manucaturers: Manufacturer[];
}) {
  const [isDialogOpen, dialogDispatch] = useProductDialog();
  const [product, productDispatch] = useProduct();

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={(o) => dialogDispatch(o ? 'open' : 'close')}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              productDispatch!({ type: "reset" });
              dialogDispatch!('open');
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
          <form
            id="create-product-form"
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (product === undefined) {
                return;
              }

              if (product?.id !== undefined) {
                const newProduct = {
                  id: product.id,
                  ...product,
                };
                await updateProduct(newProduct);
              } else {
                await createProduct(product!);
              }
              dialogDispatch!('close');
            }}
          >
            <div>
              <Label htmlFor="name">商品名</Label>
              <Input
                id="name"
                value={product?.name}
                onChange={(e) =>
                  productDispatch!({ type: 'set', product: { ...product!, name: e.target.value }})
                }
              />
            </div>
            <div>
              <Label htmlFor="manufacturer">メーカー</Label>
              <div className="flex flex-row gap-2">
                <ManufacturerSelect
                  manufacturers={manucaturers}
                  value={product!.manufacturer?.id.toString()}
                  onValueChange={(id) => {
                    productDispatch!({
                      type: "set",
                      product: {
                      ...product!,
                      manufacturer_id: Number.parseInt(id),
                    }});
                  }}
                />
                {/* メーカー追加用ポップオーバー */}
                <ManufacturerPopover />
              </div>
            </div>
            <div>
              <Label htmlFor="category">カテゴリ</Label>
              <div className="flex flex-row gap-2">
                <ProductCategorySelect
                  categories={categories}
                  onValueChange={(v) =>
                    productDispatch!({ type: 'set', product: {
                      ...product!,
                      category_id: Number.parseInt(v),
                    }})
                  }
                  value={product!.category_id?.toString()}
                />
                {/* カテゴリ追加用ポップオーバー */}
                <ProductCategoryPopover />
              </div>
            </div>
            <div>
              <Label htmlFor="unit_price">定価</Label>
              <Input
                id="unit_price"
                value={product!.unit_price}
                onChange={(e) =>
                  productDispatch!({ type: 'set', product: { ...product!, unit_price: e.target.value }})
                }
              />
            </div>
            <div>
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                value={product!.description}
                onChange={(e) =>
                  productDispatch!({ type: 'set', product: {
                    ...product!,
                    description: e.target.value,
                }})
                }
              />
            </div>
            
          </form>
          <DialogFooter>
            <Button type="submit" form="create-product-form">
              {product.id !== undefined ? "更新" : "作成"}
            </Button>
            {product.id !== undefined && (
              <Button
                type="button"
                onClick={async () => {
                  await deleteProduct(product.id!);
                  dialogDispatch('close');
                }}
                variant="destructive"
              >
                削除
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
