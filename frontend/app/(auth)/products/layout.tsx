import { ReactNode } from "react";
import { ProductDataProvider } from "./provider";
import { getProductCategories } from "@/actions/category";
import { getManufacturers } from "@/actions/company";

export default async function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, manufacturers] = await Promise.all([
    getProductCategories(),
    getManufacturers(),
  ]);

  return (
    <div className="container mx-auto">
      {/* ページ移動時、商品カテゴリとメーカー情報のfetchが走らないようにProvider経由で渡す */}
      <ProductDataProvider
        categories={categories}
        manufacturers={manufacturers}
      >
        {children}
      </ProductDataProvider>
    </div>
  );
}
