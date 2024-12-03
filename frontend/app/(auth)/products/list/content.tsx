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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";
import { ProductCategorySelect } from "@/components/ProductCategorySelect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { numberFormatter } from "@/lib/utils";
import { createProduct, updateProduct } from "@/actions/products";

type NewProduct = Omit<Product, "id" | "created_at" | "updated_at"> &
  Partial<{ id: number }>;

export function ProductListContent({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<NewProduct>({
    id: undefined,
    name: "",
    unit_price: "",
    description: "",
    category_id: undefined,
  });

  return (
    <div className="flex flex-col col-span-2">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="self-end">
        {/* 商品追加・編集ダイアログ */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                setProduct({
                  id: undefined,
                  name: "",
                  unit_price: "",
                  description: "",
                  category_id: undefined,
                })
              }
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogDescription hidden>
              商品の追加・編集を行います。
            </DialogDescription>
            <DialogHeader>
              <DialogTitle>商品{ product.id ? "編集" : "追加"}</DialogTitle>
            </DialogHeader>
            <form className="space-y-3">
              <div>
                <Label htmlFor="name">商品名</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="unit_price">定価</Label>
                <Input
                  id="unit_price"
                  value={product.unit_price}
                  onChange={(e) =>
                    setProduct({ ...product, unit_price: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">説明</Label>
                <Input
                  id="description"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <ProductCategorySelect
                  categories={categories}
                  onValueChange={(v) =>
                    setProduct({ ...product, category_id: Number.parseInt(v) })
                  }
                  value={product.category_id?.toString()}
                />
              </div>
            </form>
            <DialogFooter>
              <Button
                type="submit"
                onClick={async () => {
                  if (product.id !== undefined) {
                    const newProduct = {
                      id: product.id,
                      ...product,
                    };
                    await updateProduct(newProduct);
                  } else {
                    await createProduct(product);
                  }
                  setOpen(false);
                }}
              >
                {product.id !== undefined ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* 商品一覧 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>メーカー</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>種類</TableHead>
            <TableHead>定価</TableHead>
            <TableHead>説明</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow
              key={p.id}
              onClick={() => {
                setProduct(p);
                setOpen(true);
              }}
            >
              <TableCell>{p.manufacturer_id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category_id}</TableCell>
              <TableCell>
                {numberFormatter.format(Number.parseFloat(p.unit_price))}
              </TableCell>
              <TableCell>{p.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
