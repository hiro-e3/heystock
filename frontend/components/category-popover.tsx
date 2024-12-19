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
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";
import { createProductCategory } from "@/actions/category";

type NewProductCategory = Omit<{
  [K in keyof Required<ProductCategory>]: NonNullable<Required<ProductCategory>[K]>;
}, 'id'> & { id?: number };

export function ProductCategoryPopover({
  defaultValue
}: {
  defaultValue?: NewProductCategory;
}) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<NewProductCategory>(defaultValue ?? {
    name: '',
    description: '',
  });
  
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="icon" onClick={() => setOpen(true)}>
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form id="create-new-category" onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            createProductCategory(category).then(() => {
              setCategory({
                name: '',
                description: '',
              });
              
              setOpen(false);
            }).catch((err) => {
              console.error(err);
            });
          }}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">商品種類追加</h4>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="new-category-name">商品種類名称</Label>
                  <Input
                    id="new-category-name"
                    value={category.name}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="new-category-description">説明</Label>
                  <Input
                    id="new-category-description"
                    value={category.description}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-row justify-end">
                  <Button type="submit" form="create-new-category">
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
