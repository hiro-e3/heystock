import { ReactNode } from "react";
import { ProductDataProvider } from "./provider";
import { getProductCategories } from "@/actions/category";
import { getManufacturers } from "@/actions/company";
import { getWarehouses } from "@/actions/warehouse";

export default async function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, manufacturers, warehouses] = await Promise.all([
    getProductCategories(),
    getManufacturers(),
    getWarehouses(),
  ]);

  return (
    <div className="container mx-auto">
      {/* ページ移動時、商品カテゴリとメーカー情報のfetchが走らないようにProvider経由で渡す */}
      <ProductDataProvider
        categories={categories}
        manufacturers={manufacturers}
        warehouses={warehouses}
      >
        {children}
      </ProductDataProvider>
    </div>
  );
}
