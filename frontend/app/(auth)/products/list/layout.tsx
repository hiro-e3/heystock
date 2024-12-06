import { ReactNode } from "react";
import { ProductProvider } from "../ProductContext";
import { getProductCategories } from "@/actions/category";
import { getManufacturers } from "@/actions/manufacturer";
import { ProductDialog } from "../product-dialog";

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
      <div className="flex flex-col mt-5">
        <ProductProvider>
          <div className="flex justify-between mb-3">
            <h1 className="text-3xl">商品管理</h1>
            <ProductDialog
              categories={categories}
              manucaturers={manufacturers}
            />
          </div>
          {children}
        </ProductProvider>
      </div>
    </div>
  );
}
