"use client";

import { Company } from "@/types/company";
import { FormEventHandler } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Product } from "@/types/product";
import { SelectManufacturer } from "./select-manufacturer";
import { ProductCategory } from "@/types/product-categories";
import { ManufacturerPopover } from "@/components/manufacturer-popover";
import { ProductCategorySelect } from "./select-category";
import { ProductCategoryPopover } from "@/components/category-popover";

type ProductFormData =
  | Product
  | (Omit<Product, "id"> & Partial<{ id: number }>);

export function ProductForm<T extends ProductFormData>({
  id,
  children,
  product,
  categories,
  manucaturers,
  onChange,
  onSubmit,
}: {
  id?: string;
  children?: React.ReactNode;
  product: T;
  onChange: (product: T) => void;
  categories: ProductCategory[];
  manucaturers: Company[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form
      id={id}
      className="space-y-3"
      onSubmit={onSubmit}
    >
      <div>
        <Label htmlFor="name">商品名</Label>
        <Input
          id="name"
          value={product?.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="manufacturer">メーカー</Label>
        <div className="flex flex-row gap-2">
          <SelectManufacturer
            manufacturers={manucaturers}
            onValueChange={(id) => {
              onChange({
                ...product,
                manufacturer_id: Number.parseInt(id),
              });
            }}
            value={product.manufacturer_id?.toString()}
          />
          {/* メーカー追加用ポップオーバー */}
          <ManufacturerPopover />
        </div>
      </div>
      <div>
        <Label htmlFor="category">種類</Label>
        <div className="flex flex-row gap-2">
          <ProductCategorySelect
            categories={categories}
            onValueChange={(v) =>
              onChange({
                ...product,
                category_id: Number.parseInt(v),
              })
            }
            value={product.category_id?.toString()}
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
            onChange({ ...product!, unit_price: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="description">説明</Label>
        <Textarea
          id="description"
          value={product!.description}
          onChange={(e) =>
            onChange({
              ...product,
              description: e.target.value,
            })
          }
        />
      </div>
      <div>{children}</div>
    </form>
  );
}
