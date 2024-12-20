"use client";
import { PaginatorResourceResponse } from "@/types/paginator-response";
import { ProductResponse } from "@/types/product";
import { CreateProductDialog } from "./product-dialog";
import { ProductTable } from "./product-table";
import { useManufacturers, useProductCategories } from "./provider";

export function ProductPageClient({
  products,
}: {
  products: PaginatorResourceResponse<ProductResponse>;
}) {
  const categories = useProductCategories();
  const manufacturers = useManufacturers();
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-3">
        <h1 className="text-3xl">商品管理</h1>
        <CreateProductDialog categories={categories} manucaturers={manufacturers} />
      </div>

      <div className="border rounded p-3">
        <ProductTable products={products} categories={categories} manufacturers={manufacturers}/>
      </div>
    </div>
  );
}
